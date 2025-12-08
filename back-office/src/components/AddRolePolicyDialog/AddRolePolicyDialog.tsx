import { Dialog, DialogContent, TextField, Button, DialogActions, Stack } from '@mui/material';
import { DialogTitleGroup } from '@components';
import { useForm } from 'react-hook-form';
import { gradients, useMutation } from '@libs';
import { useSnackbar } from 'notistack';
import { rolePolicyRepository } from '../../repositories';

export function AddRolePolicyDialog(props: { onClose: () => void; onKeyDown: React.KeyboardEventHandler }) {
  // 1. destructure props
  const { onClose, onKeyDown } = props;

  // 2. lib hooks
  const { enqueueSnackbar } = useSnackbar();

  // 4. query hooks
  const [createRolePolicy, { loading }] = useMutation(rolePolicyRepository.create, {
    onSuccess: () => {
      enqueueSnackbar('권한 정책이 생성되었습니다.', { variant: 'success' });
      onClose();
    },
    onError: () => {
      enqueueSnackbar('권한 정책 생성에 실패했습니다.', { variant: 'error' });
    },
  });

  // 5. form hooks
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      description: '',
    },
  });

  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  // 9. render
  return (
    <Dialog open onKeyDown={onKeyDown}>
      <DialogTitleGroup title="Add Role Policy" onClose={onClose} />
      <DialogContent css={{ width: '500px' }}>
        <Stack direction="column" spacing={2}>
          <TextField {...register('name')} label="권한 이름" />
          <TextField {...register('description')} label="설명" />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          loading={loading}
          type="submit"
          css={{ background: gradients.primary, color: 'white' }}
          onClick={handleSubmit(async ({ name, description }) => {
            await createRolePolicy({ variables: { name, description } });
          })}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
