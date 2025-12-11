import { Dialog, DialogContent, TextField, Button, DialogActions, Stack } from '@mui/material';
import { DialogTitleGroup } from '@components';
import { useForm } from 'react-hook-form';
import { useMutation } from '@libs';
import { useSnackbar } from 'notistack';
import { rolePolicyRepository } from '@repositories';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const yupSchema = yup.object({
  name: yup.string().required('이름을 입력해주세요.'),
  description: yup.string().required('설명을 입력해주세요.'),
});

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
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: 'error' });
    },
  });

  // 5. form hooks
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
    },
    resolver: yupResolver(yupSchema),
  });

  // 6. calculate values
  const isDisabled = !isDirty || !isValid;

  // 7. effect hooks
  // 8. handlers
  // 9. render
  return (
    <Dialog open onKeyDown={onKeyDown}>
      <DialogTitleGroup title="Add Role Policy" onClose={onClose} />
      <DialogContent css={{ width: '500px' }}>
        <Stack direction="column" spacing={2}>
          <TextField {...register('name')} label="이름" error={!!errors.name} />
          <TextField
            {...register('description')}
            label="설명"
            error={!!errors.description}
            helperText={errors.description?.message}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          loading={loading}
          disabled={isDisabled}
          type="submit"
          onClick={handleSubmit(async ({ name, description }) => {
            await createRolePolicy({ variables: { name, description } });
          })}
        >
          저장
        </Button>
      </DialogActions>
    </Dialog>
  );
}
