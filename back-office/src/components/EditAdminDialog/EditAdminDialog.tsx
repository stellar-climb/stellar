import { Dialog, DialogActions, DialogContent, TextField, Stack } from '@mui/material';
import { DialogTitleGroup } from '../DialogTitleGroup';
import type { AdminModel } from '@models';
import { format } from '@libs';

export function EditAdminDialog(props: {
  admin: AdminModel;
  onClose: () => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
}) {
  // 1. destructure props
  const { admin, onClose, onKeyDown } = props;

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
      <DialogTitleGroup title="관리자 수정" onClose={onClose} />
      <DialogContent css={{ width: '520px' }}>
        <Stack direction="column" spacing={2}>
          <TextField label="이름" value={admin.name} disabled />
          <TextField label="이메일" value={admin.email} disabled />
          <TextField label="퇴사일" value={admin.exitOn ? format(admin.exitOn) : ''} disabled />
        </Stack>
      </DialogContent>
      <DialogActions>fda</DialogActions>
    </Dialog>
  );
}
