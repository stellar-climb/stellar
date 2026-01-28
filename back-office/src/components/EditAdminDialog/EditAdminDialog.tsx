import { Dialog, DialogActions, DialogContent, Button, Stack, TextField } from '@mui/material';
import { DialogTitleGroup } from '../DialogTitleGroup';
import type { AdminModel } from '@models';
import { format } from '@libs';
import { FormRow } from '../FormRow';

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
        <Stack direction="column" spacing={1}>
          <FormRow label="이름" input={<TextField value={admin.name} disabled />} />
          <FormRow label="이메일" input={<TextField value={admin.email} disabled />} />
          <FormRow label="퇴사일" input={<TextField value={admin.exitOn ? format(admin.exitOn) : '-'} disabled />} />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button color="primary">수정</Button>
      </DialogActions>
    </Dialog>
  );
}
