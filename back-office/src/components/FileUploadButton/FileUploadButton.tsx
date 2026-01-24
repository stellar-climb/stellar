// components/FileUploadButton.tsx
import { useCallback, useEffect, useState, useRef } from 'react'; // ⭐ useRef 추가
import { useDropzone } from 'react-dropzone';
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
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { useFileUpload } from '@libs';

interface UploadFileState {
  file: File;
  preview?: string;
  status: 'pending' | 'uploading' | 'success' | 'error';
  s3Url?: string;
}

interface FileUploadButtonProps {
  onUploadComplete: (urls: string[]) => void;
  maxFiles?: number;
  maxSize?: number;
  accept?: Record<string, string[]>;
}

const formatBytes = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
};

export function FileUploadButton(props: FileUploadButtonProps) {
  const {
    onUploadComplete,
    maxFiles = 5,
    maxSize = 5242880,
    accept = { 'image/*': ['.png', '.jpg', '.jpeg'] },
  } = props;

  const theme = useTheme();
  const { uploadFile } = useFileUpload();
  const [fileList, setFileList] = useState<UploadFileState[]>([]);

  const prevUrlsRef = useRef<string[]>([]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
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
          console.error('File upload failed:', error);
        }
      }
    },
    [maxFiles, uploadFile]
  );

  useEffect(() => {
    const currentSuccessUrls = fileList
      .filter((item) => item.status === 'success' && item.s3Url)
      .map((item) => item.s3Url!);
    const isChanged = JSON.stringify(prevUrlsRef.current) !== JSON.stringify(currentSuccessUrls);

    // 3. 값이 "진짜로" 바뀌었을 때만 부모 함수 호출
    if (isChanged) {
      prevUrlsRef.current = currentSuccessUrls; // Ref 업데이트
      onUploadComplete(currentSuccessUrls); // 부모 함수 호출
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
    maxFiles: maxFiles - fileList.length,
    maxSize,
    accept,
  });

  const activeStyle = {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.action.hover,
  };

  const defaultStyle = {
    border: '2px dashed',
    borderColor: theme.palette.grey[400],
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(3),
    textAlign: 'center' as const,
    cursor: 'pointer',
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '150px',
  };

  return (
    <Box>
      <Box {...getRootProps()} sx={{ ...defaultStyle, ...(isDragActive ? activeStyle : {}) }}>
        <input {...getInputProps()} />
        <CloudUploadIcon sx={{ fontSize: 48, color: isDragActive ? 'primary.main' : 'grey.500', mb: 1 }} />
        <Typography variant="subtitle1" color="textPrimary">
          {isDragActive ? '여기에 파일을 놓으세요' : '파일 선택 또는 드래그'}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          (자동으로 업로드 됩니다)
        </Typography>
      </Box>

      {fileRejections.length > 0 && (
        <Box mt={2}>
          {fileRejections.map(({ file, errors }) => (
            <Alert severity="error" key={file.name} sx={{ mb: 1 }}>
              {file.name}: {errors[0].message}
            </Alert>
          ))}
        </Box>
      )}

      {fileList.length > 0 && (
        <List sx={{ mt: 2 }}>
          {fileList.map((item, index) => (
            <Paper key={index} variant="outlined" sx={{ mb: 1 }}>
              <ListItem
                secondaryAction={
                  <IconButton edge="end" onClick={() => handleRemove(index)} disabled={item.status === 'uploading'}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
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
                      {formatBytes(item.file.size)}
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
