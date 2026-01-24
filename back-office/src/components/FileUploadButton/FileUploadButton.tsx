// components/FileUploadButton.tsx
import { useCallback, useEffect, useState, useRef } from 'react';
import { useDropzone, ErrorCode } from 'react-dropzone'; // ErrorCode import 추가
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
import { useFileUpload } from '@libs';

// ... (인터페이스 및 헬퍼 함수 기존과 동일) ...
interface UploadFileState {
  file: File;
  preview?: string;
  status: 'pending' | 'uploading' | 'success' | 'error';
  s3Url?: string;
}

interface FileUploadButtonProps {
  onUploadComplete: (urls: string[]) => void;
  maxFiles?: number; // 부모에서 설정 가능 (기본값 5)
  maxSize?: number;
  accept?: Record<string, string[]>;
  width?: string;
}

// ... (formatBytes 함수 동일) ...

export function FileUploadButton(props: FileUploadButtonProps) {
  const {
    onUploadComplete,
    maxFiles = 5, // 기본값 5개
    maxSize = 5242880,
    accept = { 'image/*': ['.png', '.jpg', '.jpeg'] },
    width = '100%',
  } = props;

  const theme = useTheme();
  const { uploadFile } = useFileUpload();
  const [fileList, setFileList] = useState<UploadFileState[]>([]);
  const prevUrlsRef = useRef<string[]>([]);

  // ⭐ [핵심 1] 현재 제한 도달 여부 계산
  const isLimitReached = fileList.length >= maxFiles;

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      // (기존 업로드 로직 동일)
      const newFiles: UploadFileState[] = acceptedFiles.map((file) => ({
        file,
        preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
        status: 'uploading',
      }));

      setFileList((prev) => {
        // 여기서도 slice를 통해 최대 개수를 한 번 더 방어
        const combined = [...prev, ...newFiles].slice(0, maxFiles);
        return combined;
      });

      for (const fileState of newFiles) {
        // ... (업로드 로직 동일)
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
    [maxFiles, uploadFile]
  );

  // ... (useEffect 및 handleRemove 동일) ...
  useEffect(() => {
    const currentSuccessUrls = fileList
      .filter((item) => item.status === 'success' && item.s3Url)
      .map((item) => item.s3Url!);
    const isChanged = JSON.stringify(prevUrlsRef.current) !== JSON.stringify(currentSuccessUrls);
    if (isChanged) {
      prevUrlsRef.current = currentSuccessUrls;
      onUploadComplete(currentSuccessUrls);
    }
  }, [fileList, onUploadComplete]);

  const handleRemove = (index: number) => {
    setFileList((prev) => {
      const target = prev[index];
      if (target.preview) URL.revokeObjectURL(target.preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    maxFiles: maxFiles - fileList.length, // 남은 개수만큼만 허용
    maxSize,
    accept,
    disabled: isLimitReached, // ⭐ [핵심 2] 제한 도달 시 클릭/드래그 비활성화
  });

  // 스타일 설정
  const activeStyle = {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.action.hover,
  };

  const defaultStyle = {
    // ... 기존 스타일 동일 ...
    border: '2px dashed',
    borderColor: isLimitReached ? theme.palette.grey[300] : theme.palette.grey[400], // 비활성 시 연하게
    padding: theme.spacing(2),
    textAlign: 'center' as const,
    cursor: isLimitReached ? 'not-allowed' : 'pointer', // 마우스 커서 변경
    backgroundColor: isLimitReached ? theme.palette.action.disabledBackground : theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '150px',
    position: 'relative' as const,
  };

  // ... (renderSingleFileContent 동일) ...
  // 단일 파일 렌더링을 위한 헬퍼 컴포넌트
  const renderSingleFileContent = (item: UploadFileState) => (
    <Stack alignItems="center" spacing={1} sx={{ width: '100%', p: 1 }}>
      {/* 1. 미리보기 이미지 또는 아이콘 */}
      {item.preview ? (
        <Box
          component="img"
          src={item.preview}
          alt="preview"
          sx={{
            width: '100%',
            maxHeight: 200,
            objectFit: 'contain',
            borderRadius: 1,
            mb: 0.5,
          }}
        />
      ) : (
        <InsertDriveFileIcon sx={{ fontSize: 60, color: 'action.active', mb: 1 }} />
      )}

      {/* 2. 파일 이름 */}
      <Typography variant="subtitle2" noWrap sx={{ maxWidth: '90%', fontWeight: 600 }}>
        {item.file.name}
      </Typography>

      {/* 3. [사이즈] - [상태] - [삭제버튼] 한 줄 정렬 */}
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 1 }}>
        {/* 상태 표시 (구분선 | 추가) */}
        <Box sx={{ width: '1px', height: '12px', bgcolor: 'grey.300' }} />

        {/* 상태 아이콘 및 텍스트 */}
        {item.status === 'uploading' && (
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <CircularProgress size={14} />
            <Typography variant="caption" color="primary" fontWeight="bold">
              업로드 중
            </Typography>
          </Stack>
        )}
        {item.status === 'success' && (
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <CheckCircleIcon color="success" sx={{ fontSize: 18 }} />
            <Typography variant="caption" color="success.main" fontWeight="bold">
              완료
            </Typography>
          </Stack>
        )}
        {item.status === 'error' && (
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <ErrorIcon color="error" sx={{ fontSize: 18 }} />
            <Typography variant="caption" color="error" fontWeight="bold">
              실패
            </Typography>
          </Stack>
        )}

        {/* ⭐ 삭제 버튼: 완료 아이콘 바로 옆으로 이동 */}
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            handleRemove(0);
          }}
          disabled={item.status === 'uploading'} // 업로드 중엔 삭제 방지
          sx={{
            'ml': 1, // 상태 텍스트와 약간 간격 두기
            'padding': 0.5,
            'border': `1px solid ${theme.palette.grey[300]}`, // 테두리 추가해서 버튼처럼 보이게
            '&:hover': { bgcolor: 'grey.100' },
          }}
        >
          <DeleteIcon color="error" css={{ borderRadius: '50%', backgroundColor: '#FFFFFF', padding: '4px' }} />
        </IconButton>
      </Stack>
    </Stack>
  );

  return (
    <Box width={width}>
      <Box {...getRootProps()} sx={{ ...defaultStyle, ...(isDragActive ? activeStyle : {}) }}>
        <input {...getInputProps()} />

        {/* 1개 파일 미리보기 모드 */}
        {fileList.length === 1 && maxFiles === 1 ? (
          renderSingleFileContent(fileList[0])
        ) : (
          <>
            <CloudUploadIcon
              sx={{
                fontSize: 48,
                color: isLimitReached ? 'text.disabled' : isDragActive ? 'primary.main' : 'grey.500',
                mb: 1,
              }}
            />
            <Typography variant="subtitle1" color={isLimitReached ? 'text.disabled' : 'textPrimary'}>
              {isLimitReached
                ? '최대 업로드 개수 도달'
                : isDragActive
                ? '여기에 파일을 놓으세요'
                : '파일 선택 또는 드래그'}
            </Typography>

            {/* ⭐ [핵심 3] 사용자에게 현재 상태/최대 개수 알려주기 */}
            <Typography variant="caption" color="textSecondary" sx={{ mt: 0.5 }}>
              {isLimitReached
                ? `더 이상 업로드할 수 없습니다 (최대 ${maxFiles}개)`
                : `(현재 ${fileList.length}개 / 최대 ${maxFiles}개)`}
            </Typography>
          </>
        )}
      </Box>

      {/* 에러 메시지: 개수 초과 시 메시지 표시 */}
      {fileRejections.length > 0 && (
        <Box mt={2}>
          {fileRejections.map(({ file, errors }) => {
            // ⭐ 개수 초과 에러 메시지 커스텀
            const errorMsg = errors.find((e) => e.code === ErrorCode.TooManyFiles)
              ? `최대 ${maxFiles}개까지만 업로드 가능합니다.`
              : errors[0].message;

            return (
              <Alert severity="error" key={file.name} sx={{ mb: 1 }}>
                {file.name}: {errorMsg}
              </Alert>
            );
          })}
        </Box>
      )}

      {/* 리스트 렌더링 (단일 파일 모드(maxFiles=1)가 아닐 때만 표시) */}
      {!(maxFiles === 1 && fileList.length === 1) && fileList.length > 0 && (
        <List sx={{ mt: 2 }}>
          {/* ... 기존 리스트 렌더링 로직 동일 ... */}
          {fileList.map((item, index) => (
            <Paper key={index} variant="outlined" sx={{ mb: 1 }}>
              <ListItem
                secondaryAction={
                  <IconButton edge="end" onClick={() => handleRemove(index)} disabled={item.status === 'uploading'}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                {/* 썸네일/아이콘 렌더링 */}
                {item.preview ? (
                  <Box
                    component="img"
                    src={item.preview}
                    alt="preview"
                    sx={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 1, mr: 2 }}
                  />
                ) : (
                  <InsertDriveFileIcon sx={{ mr: 2, fontSize: 40, color: 'action.active' }} />
                )}

                <ListItemText
                  primary={item.file.name}
                  secondary={
                    <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {item.status === 'uploading' && (
                        <Typography variant="caption" color="primary" sx={{ display: 'flex', alignItems: 'center' }}>
                          <CircularProgress size={12} sx={{ mr: 0.5 }} /> 업로드 중...
                        </Typography>
                      )}
                      {item.status === 'success' && (
                        <Typography
                          variant="caption"
                          color="success.main"
                          sx={{ display: 'flex', alignItems: 'center' }}
                        >
                          <CheckCircleIcon sx={{ fontSize: 14, mr: 0.5 }} /> 완료
                        </Typography>
                      )}
                      {item.status === 'error' && (
                        <Typography variant="caption" color="error" sx={{ display: 'flex', alignItems: 'center' }}>
                          <ErrorIcon sx={{ fontSize: 14, mr: 0.5 }} /> 실패
                        </Typography>
                      )}
                    </Box>
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
