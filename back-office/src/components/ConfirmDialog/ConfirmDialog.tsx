import { Dialog, DialogActions, DialogContent, Button } from '@mui/material';
import { DialogTitleGroup } from 'components/DialogTitleGroup';

export function ConfirmDialog(props: {
  children: React.ReactNode;
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
  className?: string;
}) {
  // 1. destructure props
  const { children, open, handleClose, handleConfirm, className } = props;

  // 2. lib hooks
  // 3. state hooks
  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  // 9. render
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitleGroup title="상태를 변경하시겠습니까?" onClose={handleClose} />
      <DialogContent css={{ width: '480px' }} className={className}>
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleConfirm}>확인</Button>
      </DialogActions>
    </Dialog>
  );
}
