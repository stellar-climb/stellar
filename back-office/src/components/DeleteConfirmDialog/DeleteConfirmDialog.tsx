import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Stack,
  Typography,
  IconButton,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

export function DeleteConfirmDialog(props: {
  onClose: () => void;
  onDelete: () => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
}) {
  // 1. destructure props
  const { onClose, onKeyDown, onDelete } = props;

  // 2. lib hooks
  // 3. state hooks
  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  // 9. render
  return (
    <Dialog open onKeyDown={onKeyDown}>
      <DialogTitle>
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
          <Typography variant="h6">삭제 확인</Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>정말로 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDelete} color="error" variant="contained">
          삭제
        </Button>
      </DialogActions>
    </Dialog>
  );
}
