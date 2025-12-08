import { DialogTitle, IconButton, Stack } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

export function DialogTitleGroup(props: { title: string; onClose: () => void }) {
  // 1. destructure props
  const { title, onClose } = props;

  // 2. lib hooks
  // 3. state hooks
  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  // 9. render
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" css={{ padding: '20px 24px' }}>
      <DialogTitle css={{ padding: 0 }}>{title}</DialogTitle>
      <IconButton onClick={onClose} css={{ color: 'black', width: '24px', height: '24px' }}>
        <CloseIcon />
      </IconButton>
    </Stack>
  );
}
