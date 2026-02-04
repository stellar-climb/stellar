import {
  Dialog,
  DialogContent,
  DialogActions,
  Stack,
  Button,
  Grid,
  TextField,
  Checkbox,
  Select,
  MenuItem,
} from '@mui/material';
import { DialogTitleGroup } from '../DialogTitleGroup';
import { useSnackbar } from 'notistack';
import { FormRow } from '../FormRow';
import { FileUploadButton } from '../FileUploadButton';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SeriesMakingType } from '@models';
import { useMutation } from '@libs';
import { seriesRepository } from '@repositories';

type SeriesFormValues = {
  coverImageUrl: string;
  name: string;
  writer: string;
  illustrator: string;
  publisher: string;
  isAdultContent: boolean;
  makingType: SeriesMakingType;
  description: string;
};

const yupSchema = yup.object({
  coverImageUrl: yup.string().required('썸네일은 필수입니다.'),
  name: yup.string().required('시리즈명은 필수입니다.'),
  writer: yup.string().required('작가명은 필수입니다.'),
  illustrator: yup.string().required('그림작가명은 필수입니다.'),
  publisher: yup.string().required('발매사는 필수입니다.'),
  isAdultContent: yup.boolean().required('성인용 여부는 필수입니다.'),
  makingType: yup.mixed<SeriesMakingType>().required('제작 유형은 필수입니다.'),
  description: yup.string().required('줄거리은 필수입니다.'),
});

export function AddSeriesDialog(props: { onClose: () => void; onKeydown: React.KeyboardEventHandler }) {
  // 1. destructure props
  const { onClose, onKeydown } = props;

  // 2. lib hooks
  const { enqueueSnackbar } = useSnackbar();

  // 3. state hooks
  // 4. query hooks
  const [createSeries, { loading }] = useMutation(seriesRepository.create, {
    onSuccess: () => {
      enqueueSnackbar('시리즈가 성공적으로 추가되었습니다.', { variant: 'success' });
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
    setValue,
    control,
    formState: { isValid, isDirty },
  } = useForm<SeriesFormValues>({
    defaultValues: {
      coverImageUrl: '',
      name: '',
      writer: '',
      illustrator: '',
      publisher: '',
      isAdultContent: false,
      makingType: SeriesMakingType.GENERAL,
      description: '',
    },
    mode: 'onChange',
    resolver: yupResolver(yupSchema),
  });

  // 6. calculate values
  const isDisabled = !isValid || !isDirty;

  // 7. effect hooks
  // 8. handlers
  // 9. render
  return (
    <Dialog open onKeyDown={onKeydown}>
      <DialogTitleGroup title="시리즈 추가" onClose={onClose} />
      <DialogContent>
        <Stack css={{ width: '720px' }} spacing={1}>
          <FormRow
            required
            label="썸네일"
            input={
              <FileUploadButton
                maxFiles={1}
                description="이미지 파일만 업로드 가능"
                onUploadComplete={(urls) => {
                  if (urls.length > 0) {
                    setValue('coverImageUrl', urls[0], { shouldDirty: true, shouldValidate: true });
                  }
                }}
              />
            }
          />
          <Grid container spacing={1}>
            <Grid size={{ md: 6 }}>
              <FormRow required label="시리즈명" input={<TextField {...register('name')} />} />
            </Grid>
            <Grid size={{ md: 6 }}>
              <FormRow required label="작가" input={<TextField {...register('writer')} />} />
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid size={{ md: 6 }}>
              <FormRow required label="그림작가" input={<TextField {...register('illustrator')} />} />
            </Grid>
            <Grid size={{ md: 6 }}>
              <FormRow required label="발매사" input={<TextField {...register('publisher')} />} />
            </Grid>

            <Grid size={{ md: 6 }}>
              <FormRow required label="성인 여부" input={<Checkbox {...register('isAdultContent')} />} />
            </Grid>

            <Grid size={{ md: 6 }}>
              <FormRow
                required
                label="독점 여부"
                input={
                  <Controller
                    name="makingType"
                    control={control}
                    render={({ field }) => (
                      <Select fullWidth {...field}>
                        <MenuItem value="monopoly">독점</MenuItem>
                        <MenuItem value="general">일반</MenuItem>
                      </Select>
                    )}
                  />
                }
              />
            </Grid>
            <Grid size={{ md: 12 }}>
              <FormRow required label="줄거리" input={<TextField {...register('description')} multiline rows={4} />} />
            </Grid>
          </Grid>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          loading={loading}
          disabled={isDisabled}
          onClick={handleSubmit(async (data) => {
            await createSeries({ variables: data });
          })}
        >
          추가
        </Button>
      </DialogActions>
    </Dialog>
  );
}
