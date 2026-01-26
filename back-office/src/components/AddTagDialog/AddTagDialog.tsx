import { Button, Dialog, DialogActions, DialogContent, Stack, TextField } from '@mui/material';
import { DialogTitleGroup, FormRow } from '@components';
import type React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@libs';
import { tagRepository } from '@repositories';
import { useSnackbar } from 'notistack';

const yupSchema = yup
  .object({
    category: yup.string().required('카테고리를 선택해주세요'),
    name: yup.string().required('이름을 입력해주세요'),
  })
  .required();

export function AddTagDialog(props: { onClose: () => void; onKeyDown: React.KeyboardEventHandler }) {
  // 1. destructure props
  const { onClose, onKeyDown } = props;

  // 2. lib hooks
  const { enqueueSnackbar } = useSnackbar();

  // 3. state hooks
  // 4. query hooks
  const [createTag, { loading }] = useMutation(tagRepository.create, {
    onSuccess: () => {
      onClose();
      enqueueSnackbar('태그가 추가되었습니다.', { variant: 'success' });
    },
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: 'error' });
    },
  });

  // 5. form hooks
  const { register, handleSubmit } = useForm({
    defaultValues: {
      category: '',
      name: '',
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
      <DialogTitleGroup title="태그 추가" onClose={onClose} />
      <DialogContent>
        <Stack spacing={1} css={{ width: '360px' }}>
          <FormRow required label="카테고리" input={<TextField {...register('category')} />} />
          <FormRow required label="이름" input={<TextField {...register('name')} />} />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          loading={loading}
          onClick={handleSubmit(async ({ category, name }) => {
            await createTag({ variables: { category, name } });
          })}
        >
          추가
        </Button>
      </DialogActions>
    </Dialog>
  );
}
