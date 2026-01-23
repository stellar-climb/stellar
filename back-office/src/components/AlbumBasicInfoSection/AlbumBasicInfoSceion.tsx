import { useEffect, useState } from 'react';
import { useQuery } from '@libs';
import { albumRepository } from '@repositories';
import { FormRow, FromTypography } from '@components';
import { Button, CircularProgress, IconButton, Stack, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const yupSchema = yup.object({
  title: yup.string().optional(),
  subTitle: yup.string().optional(),
  publisher: yup.string().optional(),
});

export function AlbumBasicInfoSection(props: { albumId: number }) {
  // 1. destructure props
  const { albumId } = props;

  // 2. lib hooks
  // 3. state hooks
  const [isEditing, setIsEditing] = useState(false);

  // 4. query hooks
  const { data: album, loading } = useQuery(albumRepository.retrieve, { variables: { albumId } });

  // 5. form hooks
  const { reset, register, handleSubmit } = useForm({
    defaultValues: {
      title: '',
      subTitle: '',
      publisher: '',
    },
    resolver: yupResolver(yupSchema),
  });

  // 6. calculate values
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
              <Button onClick={() => setIsEditing(false)} css={{ backgroundColor: 'red' }}>
                취소
              </Button>
            ) : (
              <Button onClick={() => setIsEditing(true)} variant="contained">
                수정
              </Button>
            )}
          </Stack>
          <FormRow
            label="앨범명"
            input={isEditing ? <TextField {...register('title')} /> : <FromTypography>{album.title}</FromTypography>}
          />
          <FormRow
            label="부재"
            input={
              isEditing ? <TextField {...register('subTitle')} /> : <FromTypography>{album.subTitle}</FromTypography>
            }
          />
          <FormRow
            label="발매사"
            input={
              isEditing ? <TextField {...register('publisher')} /> : <FromTypography>{album.publisher}</FromTypography>
            }
          />
        </Stack>
      )}
    </>
  );
}
