import { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, List, ListItem, ListItemText, IconButton, Paper, useTheme } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

// --- 타입 정의 (TypeScript 사용 시) ---
// 1. 기본 File 객체에 preview 속성(URL 문자열)을 확장
interface FileWithPreview extends File {
  preview?: string;
}

interface FileUploaderProps {
  onFilesChange: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number;
  accept?: Record<string, string[]>;
  title?: string;
  description?: string;
}

// --- 파일 크기 포맷팅 헬퍼 함수 ---
const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export function FileUploadButton(props: FileUploaderProps) {
  // 1. destructure props
  const {
    onFilesChange,
    maxFiles = 5,
    maxSize = 5242880,
    accept = {
      'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
      'application/pdf': ['.pdf'],
    },
    title = '파일을 드래그하거나 클릭하여 업로드하세요',
    description = '최대 5MB의 파일을 업로드할 수 있습니다.',
  } = props;

  // 2. lib hooks
  const theme = useTheme();

  // 3. state hooks (확장된 타입 사용)
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  // 6. calculate values & handlers
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // 2. 파일 드롭 시 이미지인 경우에만 preview URL 생성
      const newFilesMapped = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
        })
      );

      setFiles((prevFiles) => {
        const newFiles = [...prevFiles, ...newFilesMapped];
        return newFiles.slice(0, maxFiles);
      });
    },
    [maxFiles]
  );

  // 7. effect hooks
  // 상위 컴포넌트로 파일 목록 전달
  useEffect(() => {
    onFilesChange(files);
  }, [files, onFilesChange]);

  // 3. 메모리 누수 방지 (Cleanup)
  // 컴포넌트가 사라지거나 파일 목록이 바뀔 때 URL 해제
  useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [files]);

  // 8. handlers
  const handleRemoveFile = (indexToRemove: number) => {
    setFiles((prevFiles) => {
      // 삭제 시 해당 파일의 URL 해제 (선택 사항이지만 권장)
      const targetFile = prevFiles[indexToRemove];
      if (targetFile?.preview) {
        URL.revokeObjectURL(targetFile.preview);
      }
      return prevFiles.filter((_, index) => index !== indexToRemove);
    });
  };

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    maxFiles: maxFiles - files.length,
    maxSize,
    accept,
  });

  // 9. render

  // --- 스타일 관련 ---
  const activeStyle = {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.action.hover,
  };

  const defaultStyle = {
    border: '2px dashed',
    borderColor: theme.palette.grey[400],
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(4),
    textAlign: 'center' as const,
    cursor: 'pointer',
    transition: 'border .24s ease-in-out',
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '200px',
  };

  return (
    <Box>
      {/* Dropzone 영역 */}
      <Box
        {...getRootProps()}
        sx={{
          ...defaultStyle,
          ...(isDragActive ? activeStyle : {}),
        }}
      >
        <input {...getInputProps()} />
        <CloudUploadIcon sx={{ fontSize: 60, color: isDragActive ? 'primary.main' : 'grey.500', mb: 2 }} />

        <Typography variant="h6" color="textPrimary" gutterBottom>
          {isDragActive ? '파일을 여기에 놓으세요!' : title}
        </Typography>

        <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
      </Box>

      {/* 에러 메시지 (용량 초과 등) */}
      {fileRejections.length > 0 && (
        <Box mt={2}>
          {fileRejections.map(({ file, errors }) => (
            <Typography key={file.name} color="error" variant="caption" display="block">
              {file.name} - {errors[0].message}
            </Typography>
          ))}
        </Box>
      )}

      {/* 업로드된 파일 목록 */}
      {files.length > 0 && (
        <List sx={{ mt: 2 }}>
          {files.map((file, index) => (
            <Paper key={index} variant="outlined" sx={{ mb: 1 }}>
              <ListItem
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveFile(index)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                }
              >
                {/* 4. 미리보기 이미지가 있으면 썸네일 표시, 없으면 파일 아이콘 표시 */}
                {file.preview ? (
                  <Box
                    component="img"
                    src={file.preview}
                    alt={file.name}
                    sx={{
                      width: 50,
                      height: 50,
                      objectFit: 'cover',
                      borderRadius: 1,
                      mr: 2,
                      border: '1px solid #eee',
                    }}
                    onLoad={() => {
                      // 메모리 최적화: 이미지가 로드된 후 URL 해제 (선택 사항)
                      // URL.revokeObjectURL(file.preview!)
                    }}
                  />
                ) : (
                  <InsertDriveFileIcon sx={{ mr: 2, color: 'action.active', fontSize: 40 }} />
                )}

                <ListItemText
                  primary={file.name}
                  secondary={formatBytes(file.size)}
                  primaryTypographyProps={{ noWrap: true, maxWidth: '300px' }}
                />
              </ListItem>
            </Paper>
          ))}
        </List>
      )}
    </Box>
  );
}
