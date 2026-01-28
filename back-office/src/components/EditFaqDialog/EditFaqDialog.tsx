import { Button, Dialog, DialogActions, DialogContent, MenuItem, Select, Stack, TextField } from '@mui/material';
import { type Faq, FaqType, getFaqTypeLabelList } from '@models';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { DialogTitleGroup } from '../DialogTitleGroup';
import { getDirtyValues, useMutation } from '@libs';
import { faqRepository } from '@repositories';
import { FormRow } from '../FormRow';

const yupSchema = yup.object({
  type: yup.mixed<FaqType>().oneOf(Object.values(FaqType)).optional(),
  question: yup.string().optional().min(1, '빈 문자열은 허용되지 않습니다.'),
  answer: yup.string().optional().min(1, '빈 문자열은 허용되지 않습니다.'),
});

export function EditFaqDialog(props: { faq: Faq; onClose: () => void; onKeyDown: React.KeyboardEventHandler }) {
  // 1. destructure props
  const { faq, onClose, onKeyDown } = props;

  // 2. lib hooks
  const { enqueueSnackbar } = useSnackbar();

  // 3. state hooks
  // 4. query hooks
  const [updateFaq, { loading }] = useMutation(faqRepository.update, {
    onSuccess: () => {
      enqueueSnackbar('FAQ가 수정되었습니다.', { variant: 'success' });
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
    resolver: yupResolver(yupSchema),
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
          <FormRow
            required
            label="유형"
            input={
              <Select fullWidth defaultValue={faq.type} {...register('type')}>
                {getFaqTypeLabelList().map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            }
          />

          <FormRow label="질문" required input={<TextField {...register('question')} />} />
          <FormRow label="답변" required input={<TextField {...register('answer')} />} />
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
