import { useEffect, useState } from 'react';
import { useQuery, useMutation, getDirtyValues } from '@libs';
import { albumRepository } from '@repositories';
import { ConfirmDialog, FileUploadButton, FormRow, FromTypography } from '@components';
import { Button, CircularProgress, IconButton, Stack, TextField, Typography, Chip, Switch, Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import EditIcon from '@mui/icons-material/Edit';
import { useSnackbar } from 'notistack';

const yupSchema = yup.object({
  coverImageUrl: yup.string().required('커버 이미지는 필수입니다'),
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
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
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
  const [changeIsOpen] = useMutation(albumRepository.changeOpen, {
    onSuccess: () => {
      setIsConfirmDialogOpen(false);
      enqueueSnackbar('앨범 공개/비공개가 변경되었습니다.', { variant: 'success' });
    },
    onError: () => {
      enqueueSnackbar('앨범 공개/비공개 변경에 실패했습니다.', { variant: 'error' });
    },
  });

  // 5. form hooks
  const {
    reset,
    register,
    handleSubmit,
    formState: { isValid, isDirty, errors, dirtyFields },
    setValue,
  } = useForm({
    defaultValues: {
      title: '',
      subTitle: '',
      publisher: '',
      coverImageUrl: '',
    },
    resolver: yupResolver(yupSchema),
    mode: 'onChange',
  });

  // 6. calculate values
  const isSubmittable = !isDirty || !isValid;

  // 7. effect hooks
  useEffect(() => {
    if (album) {
      reset({
        title: album.title,
        subTitle: album.subTitle,
        publisher: album.publisher,
        coverImageUrl: album.coverImageUrl,
      });
    }
  }, [album, reset]);

  // 8. handlers
  const handleSwitchClick = () => {
    setIsConfirmDialogOpen(true);
  };

  // 9. render
  return (
    <>
      {loading || !album ? (
        <CircularProgress />
      ) : (
        <Stack spacing={1}>
          <Stack direction="row" spacing={1} css={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Stack direction="row" spacing={3} css={{ alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="h6" css={{ width: '80px' }}>
                앨범 정보
              </Typography>
              <Stack direction="row" spacing={1} css={{ alignItems: 'center' }}>
                <Chip
                  label={album.isOpen ? '공개' : '비공개'}
                  color={album.isOpen ? 'success' : 'error'}
                  css={{ width: '64px' }}
                />
                <Switch checked={album.isOpen} onChange={handleSwitchClick} />
              </Stack>
            </Stack>
            {isEditing ? (
              <Stack direction="row" spacing={1}>
                <Button
                  loading={updateLoading}
                  disabled={isSubmittable}
                  onClick={handleSubmit(async ({ title, subTitle, publisher, coverImageUrl }) => {
                    const dirtyValues = getDirtyValues(dirtyFields, { title, subTitle, publisher, coverImageUrl });

                    await updateAlbum({ variables: { albumId, ...dirtyValues } });
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
                  css={{ backgroundColor: 'red' }}
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
            label="커버 사진"
            required
            input={
              isEditing ? (
                <FileUploadButton
                  maxFiles={1}
                  initialFiles={[album.coverImageUrl]}
                  onUploadComplete={(urls) => {
                    if (urls.length > 0) {
                      setValue('coverImageUrl', urls[0], { shouldDirty: true, shouldValidate: true });
                    } else {
                      setValue('coverImageUrl', '', { shouldDirty: true, shouldValidate: true });
                    }
                  }}
                />
              ) : (
                <Box
                  component="img"
                  src={album.coverImageUrl}
                  alt="Album Cover"
                  css={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    border: '1px solid #e0e0e0',
                  }}
                />
              )
            }
          />
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

          {/* ConfirmDialog Open */}
          <ConfirmDialog
            open={isConfirmDialogOpen}
            handleClose={() => setIsConfirmDialogOpen(false)}
            handleConfirm={() => changeIsOpen({ variables: { albumId, isOpen: !album.isOpen } })}
          >
            <Stack css={{ width: '480px' }}>
              <Typography>
                앨범이{' '}
                <span css={{ textDecoration: 'underline', fontWeight: 'bold', color: album.isOpen ? 'red' : 'green' }}>
                  {album.isOpen ? '비공개' : '공개'}
                </span>{' '}
                상태로 변경되면 해당 앨범에 포함된 모든 노래 중 예상 오픈일자가 오늘보다 이전인 노래가{' '}
                <span css={{ textDecoration: 'underline', fontWeight: 'bold', color: album.isOpen ? 'red' : 'green' }}>
                  {album.isOpen ? '비공개' : '공개'}
                </span>{' '}
                상태로 변경됩니다.
              </Typography>
              <br />
              <Typography>변경하시겠습니까?</Typography>
            </Stack>
          </ConfirmDialog>
        </Stack>
      )}
    </>
  );
}
