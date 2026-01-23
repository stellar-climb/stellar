import { Dialog, DialogContent, TextField, Button, DialogActions, Stack } from '@mui/material';
import { DialogTitleGroup, FormRow } from '@components';
import { useForm } from 'react-hook-form';
import { useMutation } from '@libs';
import { useSnackbar } from 'notistack';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { albumRepository } from '@repositories';

const yupSchema = yup
  .object({
    coverImageUrl: yup.string().required('커버 이미지를 입력해주세요.'),
    bannerImageUrl: yup.string().optional(),
    title: yup.string().required('앨범명을 입력해주세요.'),
    subTitle: yup.string().required('부재를 입력해주세요.'),
    publisher: yup.string().required('발매사를 입력해주세요.'),
  })
  .required();

export function AddAlbumDialog(props: { onClose: () => void; onKeyDown: React.KeyboardEventHandler }) {
  // 1. destructure props
  const { onClose, onKeyDown } = props;

  // 2. lib hooks
  const { enqueueSnackbar } = useSnackbar();

  // 3. state hooks
  // 4. query hooks
  const [createAlbum, { loading }] = useMutation(albumRepository.create, {
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
    formState: { isDirty, isValid },
  } = useForm({
    defaultValues: {
      coverImageUrl: 'temp',
      bannerImageUrl: 'temp',
      title: '',
      subTitle: '',
      publisher: '',
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
      <DialogTitleGroup title="앨범 등록" onClose={onClose} />
      <DialogContent css={{ width: '520px' }}>
        <Stack direction="column" spacing={1}>
          <FormRow required label="앨범명" input={<TextField {...register('title')} />} />
          <FormRow required label="부재" input={<TextField {...register('subTitle')} />} />
          <FormRow required label="발매사" input={<TextField {...register('publisher')} />} />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          loading={loading}
          disabled={isDisabled}
          type="submit"
          onClick={handleSubmit(async ({ title, subTitle, publisher, coverImageUrl, bannerImageUrl }) => {
            await createAlbum({ variables: { title, subTitle, publisher, coverImageUrl, bannerImageUrl } });
          })}
        >
          저장
        </Button>
      </DialogActions>
    </Dialog>
  );
}
