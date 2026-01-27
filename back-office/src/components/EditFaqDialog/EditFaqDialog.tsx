import { Button, Dialog, DialogActions, DialogContent, Stack, TextField } from '@mui/material';
import type { Faq } from '@models';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { DialogTitleGroup } from '../DialogTitleGroup';
import { getDirtyValues, useMutation } from '@libs';
import { faqRepository } from '@repositories';
import { FormRow } from '../FormRow';

export function EditFaqDialog(props: { faq: Faq; onClose: () => void; onKeyDown: React.KeyboardEventHandler }) {
  // 1. destructure props
  const { faq, onClose, onKeyDown } = props;

  // 2. lib hooks
  const { enqueueSnackbar } = useSnackbar();

  // 3. state hooks
  // 4. query hooks
  const [updateFaq, { loading }] = useMutation(faqRepository.update, {
    onSuccess: () => {
      enqueueSnackbar('FAQ가 수정되었습니다.');
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
    formState: { isDirty, isValid, dirtyFields },
  } = useForm({
    defaultValues: {
      type: faq.type,
      question: faq.question,
      answer: faq.answer,
    },
    mode: 'onChange',
  });

  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  // 9. render
  return (
    <Dialog open onKeyDown={onKeyDown}>
      <DialogTitleGroup title="FAQ 수정" onClose={onClose} />
      <DialogContent>
        <Stack spacing={1} css={{ width: '560px' }}>
          <FormRow label="질문" required input={<TextField />} />
          <FormRow label="답변" required input={<TextField />} />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          loading={loading}
          disabled={!isDirty || !isValid}
          onClick={handleSubmit(async (data) => {
            const values = getDirtyValues(dirtyFields, data);

            await updateFaq({ variables: { id: faq.id, ...values } });
          })}
        >
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
}
