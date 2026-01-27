import { Button, Dialog, DialogActions, DialogContent, MenuItem, Select, Stack, TextField } from '@mui/material';
import { DialogTitleGroup } from '../DialogTitleGroup';
import { FormRow } from '../FormRow';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FaqType, getFaqTypeLabelList } from '@models';
import { useMutation } from '@libs';
import { faqRepository } from '@repositories';
import { useSnackbar } from 'notistack';

const yupSchema = yup.object({
  type: yup.mixed<FaqType>().oneOf(Object.values(FaqType)).required('유형은 필수입니다.'),
  question: yup.string().required('질문은 필수입니다.'),
  answer: yup.string().required('답변은 필수입니다.'),
});

export function AddFaqDialog(props: { onClose: () => void; onKeyDown: React.KeyboardEventHandler }) {
  // 1. destructure props
  const { onClose, onKeyDown } = props;

  // 2. lib hooks
  const { enqueueSnackbar } = useSnackbar();

  // 3. state hooks
  // 4. query hooks
  const [createFaq, { loading }] = useMutation(faqRepository.create, {
    onSuccess: () => {
      enqueueSnackbar('FAQ가 등록되었습니다.', { variant: 'success' });
      onClose();
    },
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: 'error' });
    },
  });

  // 5. form hooks
  const {
    control,
    register,
    handleSubmit,
    formState: { isValid, isDirty },
  } = useForm<{ type: FaqType; question: string; answer: string }>({
    defaultValues: {
      type: FaqType.ACCOUNT,
      question: '',
      answer: '',
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
      <DialogTitleGroup title="FAQ 등록" onClose={onClose} />
      <DialogContent>
        <Stack spacing={1} css={{ width: '560px' }}>
          <FormRow
            required
            label="유형"
            input={
              <Select fullWidth {...register('type')}>
                {getFaqTypeLabelList().map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            }
          />
          <FormRow required label="질문" input={<TextField multiline rows={2} {...register('question')} />} />
          <FormRow required label="답변" input={<TextField multiline rows={6} {...register('answer')} />} />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          loading={loading}
          disabled={!isValid || !isDirty}
          onClick={handleSubmit(async ({ type, question, answer }) => {
            await createFaq({ variables: { type, question, answer } });
          })}
        >
          등록
        </Button>
      </DialogActions>
    </Dialog>
  );
}
