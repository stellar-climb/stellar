import type { RolePolicyModel } from '@models';
import { Dialog, DialogContent, DialogActions, TextField, Button, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { DialogTitleGroup } from '../DialogTitleGroup';
import { getChangedFields, hasChangedFields, useMutation } from '@libs';
import { rolePolicyRepository } from '@repositories';
import { useSnackbar } from 'notistack';

export function EditRolePolicyDialog(props: {
  rolePolicy: RolePolicyModel;
  onClose: () => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
}) {
  // 1. destructure props
  const { rolePolicy, onClose, onKeyDown } = props;

  // 2. lib hooks
  const { enqueueSnackbar } = useSnackbar();

  // 3. state hooks
  // 4. query hooks
  const [updateRolePolicy, { loading }] = useMutation(rolePolicyRepository.update, {
    onSuccess: () => {
      enqueueSnackbar('수정되었습니다.', { variant: 'success' });
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
    formState: { dirtyFields, isDirty, isValid },
    getValues,
  } = useForm({
    defaultValues: {
      name: rolePolicy.name,
      description: rolePolicy.description,
    },
  });

  // 6. calculate values
  const isDisabled = !isDirty || !isValid;

  // 7. effect hooks
  // 8. handlers
  // 9. render
  return (
    <Dialog open onKeyDown={onKeyDown}>
      <DialogTitleGroup title="역할 정책 수정" onClose={onClose} />
      <DialogContent>
        <Stack spacing={2} css={{ width: '520px' }}>
          <TextField label="이름" {...register('name')} />
          <TextField label="설명" {...register('description')} />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          loading={loading}
          disabled={isDisabled}
          onClick={handleSubmit(async () => {
            if (!hasChangedFields(dirtyFields)) {
              enqueueSnackbar('변경된 내용이 없습니다.', { variant: 'info' });
              return;
            }

            const changedFields = getChangedFields(dirtyFields, getValues);
            await updateRolePolicy({
              variables: { id: rolePolicy.id, ...changedFields },
            });
          })}
        >
          저장
        </Button>
      </DialogActions>
    </Dialog>
  );
}
