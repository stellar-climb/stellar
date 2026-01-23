import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@libs';
import { albumRepository } from '@repositories';
import { FormRow, FromTypography } from '@components';
import { Button, CircularProgress, IconButton, Stack, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import EditIcon from '@mui/icons-material/Edit';
import { useSnackbar } from 'notistack';

const yupSchema = yup.object({
  title: yup.string().min(1, '앨범명은 최소 1글자 이상이어야 합니다').optional(),
  subTitle: yup.string().min(1, '부재는 최소 1글자 이상이어야 합니다').optional(),
  publisher: yup.string().min(1, '발매사는 최소 1글자 이상이어야 합니다').optional(),
});

export function AlbumBasicInfoSection(props: { albumId: number }) {
  // 1. destructure props
  const { albumId } = props;

  // 2. lib hooks
  const { enqueueSnackbar } = useSnackbar();

  // 3. state hooks
  const [isEditing, setIsEditing] = useState(false);

  // 4. query hooks
  const { data: album, loading } = useQuery(albumRepository.retrieve, { variables: { albumId } });
  const [updateAlbum, { loading: updateLoading }] = useMutation(albumRepository.update, {
    onSuccess: () => {
      enqueueSnackbar('앨범 정보가 저장되었습니다.', { variant: 'success' });
      setIsEditing(false);
    },
    onError: () => {
      enqueueSnackbar('앨범 정보 저장에 실패했습니다.', { variant: 'error' });
    },
  });

  // 5. form hooks
  const {
    reset,
    register,
    handleSubmit,
    formState: { isValid, isDirty, errors },
  } = useForm({
    defaultValues: {
      title: '',
      subTitle: '',
      publisher: '',
    },
    resolver: yupResolver(yupSchema),
    mode: 'onChange',
  });

  // 6. calculate values
  const isSumittable = !isDirty || !isValid;

  // 7. effect hooks
  useEffect(() => {
    if (album) {
      reset({
        title: album.title,
        subTitle: album.subTitle,
        publisher: album.publisher,
      });
    }
  }, [album, reset]);

  // 8. handlers
  // 9. render
  return (
    <>
      {loading || !album ? (
        <CircularProgress />
      ) : (
        <Stack spacing={1}>
          <Stack direction="row" spacing={1} css={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">앨범 기본 정보</Typography>
            {isEditing ? (
              <Stack direction="row" spacing={1}>
                <Button
                  loading={updateLoading}
                  disabled={isSumittable}
                  onClick={handleSubmit(async ({ title, subTitle, publisher }) => {
                    updateAlbum({ variables: { albumId, title, subTitle, publisher } });
                  })}
                  css={{ height: '40px' }}
                >
                  저장
                </Button>
                <Button
                  onClick={() => {
                    setIsEditing(false);
                    reset();
                  }}
                  css={{ backgroundColor: 'red', height: '40px' }}
                >
                  취소
                </Button>
              </Stack>
            ) : (
              <IconButton onClick={() => setIsEditing(true)}>
                <EditIcon />
              </IconButton>
            )}
          </Stack>
          <FormRow
            label="앨범명"
            required
            input={
              isEditing ? (
                <TextField {...register('title')} error={!!errors.title?.message} />
              ) : (
                <FromTypography>{album.title}</FromTypography>
              )
            }
          />
          <FormRow
            label="부재"
            required
            input={
              isEditing ? (
                <TextField {...register('subTitle')} error={!!errors.subTitle?.message} />
              ) : (
                <FromTypography>{album.subTitle}</FromTypography>
              )
            }
          />
          <FormRow
            label="발매사"
            required
            input={
              isEditing ? (
                <TextField {...register('publisher')} error={!!errors.publisher?.message} />
              ) : (
                <FromTypography>{album.publisher}</FromTypography>
              )
            }
          />
        </Stack>
      )}
    </>
  );
}
