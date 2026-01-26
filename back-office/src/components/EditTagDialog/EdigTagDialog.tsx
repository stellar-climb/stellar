import type { TagModel } from '@models';
import { Dialog, DialogContent, DialogActions, TextField, Button, Stack } from '@mui/material';
import { Form, useForm } from 'react-hook-form';
import { DialogTitleGroup } from '../DialogTitleGroup';
import { getDirtyValues, useMutation } from '@libs';
import { tagRepository } from '@repositories';
import { useSnackbar } from 'notistack';
import { FormRow } from 'components/FormRow';

export function EditTagDialog(props: {
  tag: TagModel;
  onClose: () => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
}) {
  // 1. destructure props
  const { tag, onClose, onKeyDown } = props;

  // 2. lib hooks
  const { enqueueSnackbar } = useSnackbar();

  // 3. state hooks
  // 4. query hooks
  const [updateTag, { loading }] = useMutation(tagRepository.update, {
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
  } = useForm({
    defaultValues: {
      category: tag.category,
      name: tag.name,
    },
  });

  // 6. calculate values
  const isDisabled = !isDirty || !isValid;

  // 7. effect hooks
  // 8. handlers
  // 9. render
  return (
    <Dialog open onKeyDown={onKeyDown}>
      <DialogTitleGroup title="태그 수정" onClose={onClose} />
      <DialogContent>
        <Stack spacing={2} css={{ width: '520px' }}>
          <FormRow label="카테고리" input={<TextField {...register('category')} />} />
          <FormRow label="이름" input={<TextField {...register('name')} />} />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          loading={loading}
          disabled={isDisabled}
          onClick={handleSubmit(async (data) => {
            const changedFields = getDirtyValues(dirtyFields, data);

            await updateTag({
              variables: { id: tag.id, ...changedFields },
            });
          })}
        >
          저장
        </Button>
      </DialogActions>
    </Dialog>
  );
}
