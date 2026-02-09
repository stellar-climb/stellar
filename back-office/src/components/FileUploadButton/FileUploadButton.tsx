import { useCallback, useEffect, useState, useRef } from 'react';
import { useDropzone, ErrorCode } from 'react-dropzone';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
  useTheme,
  CircularProgress,
  Alert,
  Stack,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { useFileUpload } from '@libs'; // 실제 프로젝트 경로에 맞게 유지

interface UploadFileState {
  file: File;
  preview?: string;
  status: 'pending' | 'uploading' | 'success' | 'error';
  s3Url?: string;
}

interface FileUploadButtonProps {
  onUploadComplete?: (urls: string[]) => void;
  initialFiles?: string[];
  maxFiles?: number;
  maxSize?: number;
  accept?: Record<string, string[]>;
  width?: string | number;
  height?: string | number;
  description?: string;
  readOnly?: boolean;
}

export function FileUploadButton(props: FileUploadButtonProps) {
  const {
    onUploadComplete,
    initialFiles = [],
    maxFiles = 5,
    maxSize = 5242880,
    accept = { 'image/*': ['.png', '.jpg', '.jpeg'] },
    width = '100%',
    height = '200px',
    description = '',
    readOnly = false,
  } = props;

  const theme = useTheme();
  const { uploadFile } = useFileUpload();

  // [수정 1] 초기화 시 빈 문자열 필터링 (회색 아이콘 이슈 해결)
  const [fileList, setFileList] = useState<UploadFileState[]>(() => {
    const validFiles = initialFiles.filter((url) => url && url.trim() !== '');
    if (validFiles.length > 0) {
      return validFiles.map((url) => ({
        file: new File([], '기존 이미지'),
        preview: url,
        status: 'success',
        s3Url: url,
      }));
    }
    return [];
  });

  const prevUrlsRef = useRef<string[]>([]);

  useEffect(() => {
    const validInitialFiles = initialFiles.filter((url) => url && url.trim() !== '');
    const currentFiles = fileList;

    // 1. 개수가 다르면 무조건 동기화해야 함
    // 2. 개수가 같아도 내용이 다르면 동기화해야 함
    const isSame =
      validInitialFiles.length === currentFiles.length &&
      validInitialFiles.every((url, index) => url === currentFiles[index].s3Url);

    if (!isSame) {
      setFileList((prev) => {
        // [핵심 해결책]
        // 무조건 새로운 객체로 덮어쓰지 말고,
        // 기존에 이미 가지고 있는 파일(URL이 같은 것)이라면 '기존 상태(preview blob)'를 유지합니다.

        return validInitialFiles.map((url) => {
          // 현재 로컬 리스트에서 동일한 s3Url을 가진 항목을 찾음
          const existingItem = prev.find((item) => item.s3Url === url);

          if (existingItem) {
            // 이미 로컬에 있다면, 미리보기(blob)가 살아있는 그 객체를 그대로 씀 (깜빡임 X)
            return existingItem;
          }

          // 로컬에 없다면(새로 DB에서 불러온 것), 새로 만듦
          return {
            file: new File([], '기존 이미지'),
            preview: url,
            status: 'success',
            s3Url: url,
          };
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialFiles]);

  const isLimitReached = fileList.length >= maxFiles;

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (readOnly) return;

      const newFiles: UploadFileState[] = acceptedFiles.map((file) => ({
        file,
        preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
        status: 'uploading',
      }));

      // [수정 3] maxFiles가 1개일 때 새 파일로 '교체'되도록 수정
      setFileList((prev) => {
        if (maxFiles === 1) {
          // 기존 파일 미리보기 해제 (메모리 누수 방지)
          prev.forEach((item) => {
            if (item.preview && !initialFiles.includes(item.preview)) {
              URL.revokeObjectURL(item.preview);
            }
          });
          return newFiles; // 덮어쓰기
        }
        // 여러 개일 때는 기존 로직 (추가)
        return [...prev, ...newFiles].slice(0, maxFiles);
      });

      for (const fileState of newFiles) {
        try {
          const s3Url = await uploadFile(fileState.file);
          setFileList((prev) =>
            prev.map((item) => (item.file === fileState.file ? { ...item, status: 'success', s3Url } : item))
          );
        } catch (error) {
          setFileList((prev) =>
            prev.map((item) => (item.file === fileState.file ? { ...item, status: 'error' } : item))
          );
        }
      }
    },
    [maxFiles, uploadFile, readOnly, initialFiles]
  );

  // [수정 4] 업로드 완료 콜백 처리 (핵심: uploading 상태일 땐 콜백 안 보냄)
  useEffect(() => {
    if (readOnly || !onUploadComplete) return;

    // 업로드 중인 파일이 하나라도 있으면 대기 (URL이 아직 없으므로)
    const isUploading = fileList.some((item) => item.status === 'uploading');
    if (isUploading) return;

    const currentSuccessUrls = fileList
      .filter((item) => item.status === 'success' && item.s3Url)
      .map((item) => item.s3Url!);

    const isChanged = JSON.stringify(prevUrlsRef.current) !== JSON.stringify(currentSuccessUrls);

    if (isChanged) {
      prevUrlsRef.current = currentSuccessUrls;
      onUploadComplete(currentSuccessUrls);
    }
  }, [fileList, onUploadComplete, readOnly]);

  const handleRemove = (index: number) => {
    if (readOnly) return;

    setFileList((prev) => {
      const target = prev[index];
      if (target.preview && !initialFiles.includes(target.preview)) {
        URL.revokeObjectURL(target.preview);
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    // maxFiles가 1개일 때는 항상 드롭 가능하게 함 (교체를 위해)
    maxFiles: maxFiles === 1 ? 1 : maxFiles - fileList.length,
    maxSize,
    accept,
    disabled: (maxFiles !== 1 && isLimitReached) || readOnly,
  });

  // 스타일 정의
  const defaultStyle = {
    border: readOnly ? '1px solid' : '2px dashed',
    borderColor: readOnly
      ? theme.palette.grey[300]
      : isLimitReached && maxFiles !== 1
        ? theme.palette.grey[300]
        : theme.palette.grey[400],
    padding: readOnly ? 0 : theme.spacing(2),
    textAlign: 'center' as const,
    cursor: readOnly ? 'default' : isLimitReached && maxFiles !== 1 ? 'not-allowed' : 'pointer',
    backgroundColor: readOnly
      ? 'transparent'
      : isLimitReached && maxFiles !== 1
        ? theme.palette.action.disabledBackground
        : theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    transition: 'all 0.2s ease-in-out',
    boxSizing: 'border-box' as const,
    overflow: 'hidden',
    position: 'relative' as const,
  };

  const activeStyle = {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.action.hover,
  };

  const renderSingleFileContent = (item: UploadFileState) => (
    <Stack
      alignItems="center"
      justifyContent="center"
      spacing={1}
      sx={{ width: '100%', height: '100%', position: 'relative' }}
    >
      {item.preview ? (
        <Box
          component="img"
          src={item.preview}
          alt="preview"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            borderRadius: readOnly ? 0 : 1,
          }}
        />
      ) : (
        <InsertDriveFileIcon sx={{ fontSize: 48, color: 'action.active' }} />
      )}

      {!readOnly && (
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{
            position: 'absolute',
            top: 5,
            right: 5,
            bgcolor: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(2px)',
            px: 0.5,
            py: 0.5,
            borderRadius: 1,
            boxShadow: 1,
            zIndex: 10,
          }}
        >
          {item.status === 'uploading' && <CircularProgress size={14} />}
          {item.status === 'success' && <CheckCircleIcon color="success" sx={{ fontSize: 18 }} />}
          {item.status === 'error' && <ErrorIcon color="error" sx={{ fontSize: 18 }} />}

          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              handleRemove(0);
            }}
            disabled={item.status === 'uploading'}
            sx={{
              'padding': 0.5,
              '&:hover': { bgcolor: 'rgba(0,0,0,0.05)' },
            }}
          >
            <DeleteIcon fontSize="small" color="error" />
          </IconButton>
        </Stack>
      )}
    </Stack>
  );

  return (
    <Box sx={{ width, display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Box sx={{ height, width: '100%', position: 'relative' }}>
        <Box
          {...getRootProps()}
          sx={{
            ...defaultStyle,
            ...(isDragActive && !readOnly ? activeStyle : {}),
          }}
        >
          <input {...getInputProps()} />

          {/* 단일 파일 모드: 파일이 1개 있고, maxFiles가 1일 때 */}
          {fileList.length === 1 && maxFiles === 1 ? (
            renderSingleFileContent(fileList[0])
          ) : (
            // 파일이 없거나(0개), 여러 개일 때(List형태)의 UI
            <>
              {readOnly ? (
                <Stack alignItems="center" spacing={1}>
                  <InsertDriveFileIcon sx={{ fontSize: 40, color: 'text.disabled', opacity: 0.5 }} />
                  <Typography variant="body2" color="text.secondary">
                    등록된 이미지가 없습니다.
                  </Typography>
                </Stack>
              ) : (
                <>
                  <CloudUploadIcon
                    sx={{
                      fontSize: 42,
                      color:
                        isLimitReached && maxFiles !== 1 ? 'text.disabled' : isDragActive ? 'primary.main' : 'grey.500',
                      mb: 1,
                    }}
                  />
                  <Typography
                    variant="body2"
                    color={isLimitReached && maxFiles !== 1 ? 'text.disabled' : 'textPrimary'}
                    fontWeight={500}
                  >
                    {isLimitReached && maxFiles !== 1
                      ? '최대 업로드 개수 도달'
                      : isDragActive
                        ? '여기에 파일을 놓으세요'
                        : '파일 선택 또는 드래그'}
                  </Typography>
                  {description && (
                    <Typography variant="caption" color="textSecondary" sx={{ mt: 0.5 }}>
                      {description}
                    </Typography>
                  )}
                  <Typography variant="caption" color="textSecondary" sx={{ mt: 0.5 }}>
                    {isLimitReached ? `(최대 ${maxFiles}개 완료)` : `(${fileList.length} / ${maxFiles}개)`}
                  </Typography>
                </>
              )}
            </>
          )}
        </Box>
      </Box>

      {/* 에러 메시지 */}
      {!readOnly && fileRejections.length > 0 && (
        <Box>
          {fileRejections.map(({ file, errors }) => {
            const errorMsg = errors.find((e) => e.code === ErrorCode.TooManyFiles)
              ? `최대 ${maxFiles}개까지만 업로드 가능합니다.`
              : errors[0].message;
            return (
              <Alert severity="error" key={file.name} sx={{ py: 0, px: 1, fontSize: '0.75rem', mb: 0.5 }}>
                {errorMsg}
              </Alert>
            );
          })}
        </Box>
      )}

      {/* 멀티 파일 리스트 (단일 파일 모드가 아닐 때 + 파일이 있을 때) */}
      {!(maxFiles === 1 && fileList.length === 1) && fileList.length > 0 && (
        <List sx={{ pt: 0 }}>
          {fileList.map((item, index) => (
            <Paper key={index} variant="outlined" sx={{ mb: 0.5, p: 0.5 }}>
              <ListItem
                disablePadding
                sx={{ px: 1 }}
                secondaryAction={
                  !readOnly && (
                    <IconButton
                      edge="end"
                      size="small"
                      onClick={() => handleRemove(index)}
                      disabled={item.status === 'uploading'}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  )
                }
              >
                {item.preview ? (
                  <Box
                    component="img"
                    src={item.preview}
                    alt="preview"
                    sx={{ width: 32, height: 32, objectFit: 'cover', borderRadius: 1, mr: 1.5 }}
                  />
                ) : (
                  <InsertDriveFileIcon sx={{ mr: 1.5, fontSize: 32, color: 'action.active' }} />
                )}
                <ListItemText
                  primary={item.file.name === '기존 이미지' ? '업로드된 파일' : item.file.name}
                  slotProps={{
                    primary: {
                      variant: 'caption',
                      noWrap: true,
                      sx: { maxWidth: '150px', display: 'block' },
                    },
                  }}
                  secondary={
                    !readOnly && (
                      <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                        {item.status === 'uploading' && <CircularProgress size={10} sx={{ mr: 0.5 }} />}
                        <Typography
                          variant="caption"
                          color={item.status === 'success' ? 'success.main' : 'textSecondary'}
                        >
                          {item.status === 'uploading' ? '업로드 중' : item.status === 'success' ? '완료' : '실패'}
                        </Typography>
                      </Box>
                    )
                  }
                />
              </ListItem>
            </Paper>
          ))}
        </List>
      )}
    </Box>
  );
}
