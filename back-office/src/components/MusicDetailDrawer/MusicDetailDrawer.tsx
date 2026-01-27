import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Drawer,
  IconButton,
  Stack,
  TextField,
  Typography,
  Checkbox,
  Grid,
  MenuItem,
  Select,
  Chip,
} from '@mui/material';
import { musicRepository, tagRepository } from '@repositories';
import { getDirtyValues, useQuery, useMutation } from '@libs';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DeleteConfirmDialog, DialogButton, FileUploadButton, FormRow, FormBox } from '@components';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';

export function MusicDetailDrawer(props: { albumId: number; musicId: number | null; onClose: () => void }) {
  // 1. destructure props
  const { albumId, musicId, onClose } = props;

  // 2. lib hooks
  const { enqueueSnackbar } = useSnackbar();

  // 3. state hooks
  const [isEditing, setIsEditing] = useState(false);

  // 4. query hooks
  const { data: music, loading } = useQuery(musicRepository.retrieve, {
    variables: { id: musicId!, albumId },
    enabled: !!musicId,
  });
  const { data: tags } = useQuery(tagRepository.list);
  const [updateMusic, { loading: updateLoading }] = useMutation(musicRepository.update, {
    onSuccess: () => {
      enqueueSnackbar('수정되었습니다.', { variant: 'success' });
      setIsEditing(false);
    },
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: 'error' });
    },
  });
  const [removeMusic] = useMutation(musicRepository.remove, {
    onSuccess: () => {
      enqueueSnackbar('삭제되었습니다.', { variant: 'success' });
      onClose();
    },
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: 'error' });
    },
  });

  // 5. form hooks
  const {
    setValue,
    handleSubmit,
    register,
    reset,
    control,
    formState: { isDirty, isValid, dirtyFields },
  } = useForm({
    defaultValues: {
      thumbnailImageUrl: '',
      title: '',
      lyricist: '',
      songwriter: '',
      lyrics: '',
      isAdultContent: false,
      isMain: false,
      tagIds: [] as number[],
    },
    mode: 'onChange',
  });

  // 6. calculate values
  const isSubmittable = !isDirty || !isValid;

  // 7. effect hooks
  useEffect(() => {
    if (music) {
      reset({
        thumbnailImageUrl: music.thumbnailImageUrl,
        title: music.title,
        lyricist: music.lyricist,
        songwriter: music.songwriter,
        lyrics: music.lyrics,
        isAdultContent: music.isAdultContent,
        isMain: music.isMain,
        tagIds: music.tags.map((tag) => Number(tag.id)),
      });
    }
  }, [music, reset, setIsEditing]);

  // 8. handlers
  const handleClose = () => {
    onClose();
    setIsEditing(false);
  };

  // 9. render
  return (
    <Drawer open={!!musicId} anchor="right" onClose={handleClose} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Box css={{ width: '480px', padding: '16px' }}>
        {loading || !music ? (
          <CircularProgress />
        ) : (
          <Stack spacing={2}>
            <Stack direction="row" css={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">상세 정보</Typography>
              {isEditing ? (
                <Stack direction="row" spacing={2} css={{ justifyContent: 'space-between', alignItems: 'center' }}>
                  <Button
                    disabled={isSubmittable || updateLoading}
                    onClick={handleSubmit(async (data) => {
                      const values = getDirtyValues(dirtyFields, data);

                      if (musicId) {
                        await updateMusic({
                          variables: {
                            id: musicId,
                            albumId,
                            ...values,
                          },
                        });
                      }
                    })}
                  >
                    저장
                  </Button>
                  <Button
                    color="error"
                    onClick={() => {
                      setIsEditing(false);
                    }}
                  >
                    취소
                  </Button>
                </Stack>
              ) : (
                <Stack direction="row">
                  <IconButton onClick={() => setIsEditing(true)}>
                    <EditIcon />
                  </IconButton>
                  <DialogButton
                    render={({ onOpen }) => (
                      <IconButton onClick={onOpen}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    )}
                  >
                    {({ onClose, onKeyDown }) => (
                      <DeleteConfirmDialog
                        onClose={onClose}
                        onKeyDown={onKeyDown}
                        onDelete={async () => {
                          await removeMusic({ variables: { id: musicId!, albumId } });
                          setIsEditing(false);
                          onClose();
                        }}
                      />
                    )}
                  </DialogButton>
                </Stack>
              )}
            </Stack>
            <Divider css={{ padding: '4px 0' }} />

            <FormRow
              label="대표 이미지"
              required
              input={
                isEditing ? (
                  <FileUploadButton
                    maxFiles={1}
                    initialFiles={[music.thumbnailImageUrl]}
                    description="이미지 파일만 업로드 가능합니다."
                    onUploadComplete={(urls) => {
                      if (urls.length > 0) {
                        setValue('thumbnailImageUrl', urls[0], { shouldDirty: true, shouldValidate: true });
                      }
                    }}
                  />
                ) : (
                  <Box
                    component="img"
                    src={music.thumbnailImageUrl}
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

            <Stack spacing={1}>
              <FormRow
                label="제목"
                required
                input={isEditing ? <TextField {...register('title')} /> : <FormBox> {music.title}</FormBox>}
              />
              <FormRow
                label="작사가"
                required
                input={isEditing ? <TextField {...register('lyricist')} /> : <FormBox> {music.lyricist}</FormBox>}
              />
              <FormRow
                label="작곡가 "
                required
                input={isEditing ? <TextField {...register('songwriter')} /> : <FormBox> {music.songwriter}</FormBox>}
              />

              <Grid container spacing={2}>
                <Grid size={{ md: 6 }}>
                  <FormRow
                    label="성인여부"
                    required
                    input={
                      <Controller
                        control={control}
                        name="isAdultContent"
                        render={({ field: { onChange, value } }) => (
                          <Checkbox checked={!!value} onChange={onChange} disabled={!isEditing} />
                        )}
                      />
                    }
                  />
                </Grid>
                <Grid size={{ md: 6 }}>
                  <FormRow
                    label="타이틀곡"
                    required
                    input={
                      <Controller
                        control={control}
                        name="isMain"
                        render={({ field: { onChange, value } }) => (
                          <Checkbox checked={!!value} onChange={onChange} disabled={!isEditing} />
                        )}
                      />
                    }
                  />
                </Grid>
              </Grid>

              <FormRow
                required
                label="태그"
                input={
                  isEditing ? (
                    <Controller
                      control={control}
                      name="tagIds"
                      render={({ field: { onChange, value } }) => (
                        <Select
                          fullWidth
                          multiple
                          value={value}
                          onChange={onChange}
                          renderValue={(selected) => (
                            <Stack direction="row" spacing={1}>
                              {selected.map((id) => {
                                const tag = tags?.items.find((tag) => Number(tag.id) === Number(id));
                                return <Chip key={id} label={tag?.name} />;
                              })}
                            </Stack>
                          )}
                        >
                          {tags &&
                            tags?.items.map((tag) => (
                              <MenuItem key={tag.id} value={tag.id}>
                                {tag.name}
                              </MenuItem>
                            ))}
                        </Select>
                      )}
                    />
                  ) : (
                    <FormBox>
                      <Stack direction="row" spacing={1} css={{ width: '100%' }}>
                        {music.tags.map((tag) => {
                          return <Chip key={tag.id} label={tag.name} />;
                        })}
                      </Stack>
                    </FormBox>
                  )
                }
              />

              <FormRow
                label="가사"
                input={
                  <TextField
                    {...register('lyrics')}
                    multiline
                    rows={4}
                    slotProps={{ input: { readOnly: !isEditing } }}
                  />
                }
              />
            </Stack>
          </Stack>
        )}
      </Box>
    </Drawer>
  );
}
