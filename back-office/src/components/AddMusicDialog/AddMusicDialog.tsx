import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Stack,
  TextField,
  Checkbox,
  Select,
  MenuItem,
  Box,
  Chip,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { FileUploadButton, DialogTitleGroup, FormRow } from '@components';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@libs';
import { musicRepository, tagRepository } from '@repositories';
import { useSnackbar } from 'notistack';

const yupSchema = yup.object({
  thumbnailImageUrl: yup.string().required('커버 사진은 필수입니다.'),
  title: yup.string().required('앨범명은 필수입니다.'),
  expectedPublishOn: yup.string().required('발매일은 필수입니다.'),
  lyricist: yup.string().required('작사가는 필수입니다.'),
  songwriter: yup.string().required('작곡가는 필수입니다.'),
  lyrics: yup.string().optional(),
  isAdultContent: yup.boolean().required('성인 여부는 필수입니다.'),
  isMain: yup.boolean().required('타이틀곡 여부는 필수입니다.'),
  albumId: yup.number().required('앨범 ID는 필수입니다.'),
  tagIds: yup.array().of(yup.number()).required('태그는 필수입니다.'),
});

export function AddMusicDialog(props: { albumId: number; onClose: () => void; onKeyDown: React.KeyboardEventHandler }) {
  // 1. destructure props
  const { albumId, onClose, onKeyDown } = props;

  // 2. lib hooks
  const { enqueueSnackbar } = useSnackbar();

  // 3. state hooks
  // 4. query hooks
  const { data: tags } = useQuery(tagRepository.list);
  const [createMusic, { loading }] = useMutation(musicRepository.create, {
    onSuccess: () => {
      enqueueSnackbar('음악이 등록되었습니다.', { variant: 'success' });
      onClose();
    },
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: 'error' });
    },
  });

  // 5. form hooks
  const { control, setValue, register, handleSubmit } = useForm({
    defaultValues: {
      thumbnailImageUrl: '',
      title: '',
      expectedPublishOn: '',
      lyricist: '',
      songwriter: '',
      lyrics: '',
      isAdultContent: false,
      isMain: false,
      albumId,
      tagIds: [],
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
      <DialogTitleGroup onClose={onClose} title="음악 등록" />
      <DialogContent>
        <Stack spacing={1} css={{ width: '720px' }}>
          <Grid container>
            <Grid size={{ md: 12 }}>
              <FormRow
                required
                label="커버 사진"
                input={
                  <FileUploadButton
                    maxFiles={1}
                    description="이미지 파일만 업로드 가능"
                    onUploadComplete={(urls) => {
                      if (urls.length > 0) {
                        setValue('thumbnailImageUrl', urls[0], { shouldDirty: true, shouldValidate: true });
                      }
                    }}
                  />
                }
                css={{ marginBottom: '8px' }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid size={{ md: 6 }}>
              <FormRow required label="노래명" input={<TextField {...register('title')} />} />
            </Grid>
            <Grid size={{ md: 6 }}>
              <FormRow required label="예상 발매일" input={<TextField {...register('expectedPublishOn')} />} />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid size={{ md: 6 }}>
              <FormRow required label="작곡가" input={<TextField {...register('songwriter')} />} />
            </Grid>
            <Grid size={{ md: 6 }}>
              <FormRow required label="작사가" input={<TextField {...register('lyricist')} />} />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid size={{ md: 6 }}>
              <FormRow required label="성인 여부" input={<Checkbox {...register('isAdultContent')} />} />
            </Grid>
            <Grid size={{ md: 6 }}>
              <FormRow required label="타이틀곡" input={<Checkbox {...register('isMain')} />} />
            </Grid>
          </Grid>

          <FormRow
            required
            label="태그"
            input={
              <Controller
                control={control}
                name="tagIds"
                render={({ field: { onChange, value } }) => (
                  <Select
                    fullWidth
                    multiple
                    value={value || []}
                    onChange={onChange}
                    renderValue={(selected) => (
                      <Box>
                        {selected.map((id) => {
                          const tag = tags?.items.find((tag) => Number(tag.id) === Number(id));
                          return <Chip key={id} label={tag?.name} />;
                        })}
                      </Box>
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
            }
          />

          <Grid container spacing={2}>
            <Grid size={{ md: 12 }}>
              <FormRow label="가사" input={<TextField {...register('lyrics')} multiline rows={4} />} />
            </Grid>
          </Grid>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          loading={loading}
          onClick={handleSubmit(async (data) => {
            await createMusic({ variables: data });
          })}
        >
          등록
        </Button>
      </DialogActions>
    </Dialog>
  );
}
