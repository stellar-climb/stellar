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
  onUploadComplete?: (urls: string[]) => void; // readOnly일 때는 선택적일 수 있음
  initialFiles?: string[];
  maxFiles?: number;
  maxSize?: number;
  accept?: Record<string, string[]>;
  width?: string | number;
  height?: string | number;
  description?: string;
  readOnly?: boolean; // [추가] 읽기 전용 모드 (View 모드)
}

export function FileUploadButton(props: FileUploadButtonProps) {
  const {
    onUploadComplete,
    initialFiles = [],
    maxFiles = 5,
    maxSize = 5242880,
    accept = { 'image/*': ['.png', '.jpg', '.jpeg'] },
    width = '100%',
    height = '200px', // 기본 높이
    description = '',
    readOnly = false, // 기본값 false
  } = props;

  const theme = useTheme();
  const { uploadFile } = useFileUpload();

  // 초기 상태 설정
  const [fileList, setFileList] = useState<UploadFileState[]>(() => {
    if (initialFiles.length > 0) {
      return initialFiles.map((url) => ({
        file: new File([], '기존 이미지'),
        preview: url,
        status: 'success',
        s3Url: url,
      }));
    }
    return [];
  });

  const prevUrlsRef = useRef<string[]>([]);

  // [중요] 외부에서 initialFiles(DB 데이터)가 늦게 로드되거나 변경될 경우 동기화
  useEffect(() => {
    // 1. 이미 파일이 있고, 내용이 같다면 업데이트 스킵 (무한 루프 방지)
    const currentUrls = fileList.map((f) => f.s3Url).filter(Boolean);
    const isSame =
      initialFiles.length === currentUrls.length && initialFiles.every((url, index) => url === currentUrls[index]);

    if (!isSame) {
      setFileList(
        initialFiles.map((url) => ({
          file: new File([], '기존 이미지'),
          preview: url,
          status: 'success',
          s3Url: url,
        }))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialFiles]);

  const isLimitReached = fileList.length >= maxFiles;

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      // readOnly 상태면 드롭 무시
      if (readOnly) return;

      const newFiles: UploadFileState[] = acceptedFiles.map((file) => ({
        file,
        preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
        status: 'uploading',
      }));

      setFileList((prev) => {
        const combined = [...prev, ...newFiles].slice(0, maxFiles);
        return combined;
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
    [maxFiles, uploadFile, readOnly]
  );

  useEffect(() => {
    // readOnly거나 핸들러가 없으면 스킵
    if (readOnly || !onUploadComplete) return;

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
    if (readOnly) return; // readOnly 삭제 불가

    setFileList((prev) => {
      const target = prev[index];
      // 새로 올린 파일의 미리보기 URL 해제 (메모리 누수 방지)
      if (target.preview && !initialFiles.includes(target.preview)) {
        URL.revokeObjectURL(target.preview);
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    maxFiles: maxFiles - fileList.length,
    maxSize,
    accept,
    disabled: isLimitReached || readOnly, // readOnly일 때 드롭존 비활성화
  });

  // 스타일 정의
  const defaultStyle = {
    // readOnly일 때는 실선(View 모드), 편집 모드일 땐 점선(Dropzone 모드)
    border: readOnly ? '1px solid' : '2px dashed',
    borderColor: readOnly
      ? theme.palette.grey[300]
      : isLimitReached
        ? theme.palette.grey[300]
        : theme.palette.grey[400],
    padding: readOnly ? 0 : theme.spacing(2), // View 모드일 땐 padding 없이 꽉 채움
    textAlign: 'center' as const,
    cursor: readOnly ? 'default' : isLimitReached ? 'not-allowed' : 'pointer',
    backgroundColor: readOnly
      ? 'transparent'
      : isLimitReached
        ? theme.palette.action.disabledBackground
        : theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%', // 부모 Box를 꽉 채움
    transition: 'all 0.2s ease-in-out',
    boxSizing: 'border-box' as const,
    overflow: 'hidden', // 이미지가 둥근 모서리를 넘지 않도록
    position: 'relative' as const,
  };

  const activeStyle = {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.action.hover,
  };

  // 단일 파일 렌더링 (View 모드 겸용)
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

      {/* readOnly가 아닐 때만 하단 정보/삭제 버튼 표시 */}
      {!readOnly && (
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{
            position: 'absolute',
            top: 1,
            right: 1,
            bgcolor: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(2px)',
            px: 0.5,
            py: 0.5,
            borderRadius: 1,
            boxShadow: 1,
            zIndex: 10, // 이미지 위에 확실히 뜨도록
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
      {/* 메인 박스 영역 - width/height Props 적용 */}
      <Box sx={{ height, width: '100%', position: 'relative' }}>
        <Box
          {...getRootProps()}
          sx={{
            ...defaultStyle,
            ...(isDragActive && !readOnly ? activeStyle : {}),
          }}
        >
          <input {...getInputProps()} />

          {/* 1. 파일이 1개일 때 (단일 파일 모드) */}
          {fileList.length === 1 && maxFiles === 1 ? (
            renderSingleFileContent(fileList[0])
          ) : (
            // 2. 파일이 없거나, 여러 개일 때의 UI
            <>
              {readOnly ? (
                // [View 모드] 파일 없음
                <Stack alignItems="center" spacing={1}>
                  <InsertDriveFileIcon sx={{ fontSize: 40, color: 'text.disabled', opacity: 0.5 }} />
                  <Typography variant="body2" color="text.secondary">
                    등록된 이미지가 없습니다.
                  </Typography>
                </Stack>
              ) : (
                // [Edit 모드] 업로드 안내
                <>
                  <CloudUploadIcon
                    sx={{
                      fontSize: 42,
                      color: isLimitReached ? 'text.disabled' : isDragActive ? 'primary.main' : 'grey.500',
                      mb: 1,
                    }}
                  />
                  <Typography variant="body2" color={isLimitReached ? 'text.disabled' : 'textPrimary'} fontWeight={500}>
                    {isLimitReached
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

      {/* 에러 메시지 (readOnly 아닐 때만) */}
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
                  !readOnly && ( // readOnly일 땐 삭제 버튼 숨김
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
                    !readOnly && ( // readOnly일 땐 상태 텍스트 굳이 안 보여줘도 됨 (원하면 제거 가능)
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
