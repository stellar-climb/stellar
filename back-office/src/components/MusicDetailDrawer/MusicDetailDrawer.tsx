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
} from '@mui/material';
import { musicRepository } from '@repositories';
import { gradients, useQuery } from '@libs';
import EditIcon from '@mui/icons-material/Edit';
import { FileUploadButton, FormRow, FromTypography } from '@components';
import { Controller, useForm } from 'react-hook-form';

export function MusicDetailDrawer(props: { albumId: number; musicId: number | null; onClose: () => void }) {
  // 1. destructure props
  const { albumId, musicId, onClose } = props;

  // 2. lib hooks
  // 3. state hooks
  const [isEditing, setIsEditing] = useState(false);

  // 4. query hooks
  const { data: music, loading } = useQuery(musicRepository.retrieve, {
    variables: { id: musicId!, albumId },
    enabled: !!musicId,
  });

  // 5. form hooks
  const { setValue, register, reset, control } = useForm({
    defaultValues: {
      thumbnailImageUrl: '',
      title: '',
      lyricist: '',
      songwriter: '',
      lyrics: '',
      isAdultContent: false,
      isMain: false,
    },
    mode: 'onChange',
  });

  // 6. calculate values
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
                  <Button css={{ background: gradients.primary }}>저장</Button>
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
                <IconButton onClick={() => setIsEditing(true)}>
                  <EditIcon />
                </IconButton>
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
                input={
                  isEditing ? <TextField {...register('title')} /> : <FromTypography> {music.title}</FromTypography>
                }
              />
              <FormRow
                label="작사가"
                required
                input={
                  isEditing ? (
                    <TextField {...register('lyricist')} />
                  ) : (
                    <FromTypography> {music.lyricist}</FromTypography>
                  )
                }
              />
              <FormRow
                label="작곡가 "
                required
                input={
                  isEditing ? (
                    <TextField {...register('songwriter')} />
                  ) : (
                    <FromTypography> {music.songwriter}</FromTypography>
                  )
                }
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
