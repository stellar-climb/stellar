import { Dialog, DialogContent, TextField, Button, DialogActions, Stack, Typography, Grid } from '@mui/material';
import { DialogTitleGroup, FormRow, FileUploadButton } from '@components';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export function AddArtistDialog(props: { onClose: () => void; onKeyDown: React.KeyboardEventHandler }) {
  // 1. destructure props
  const { onClose, onKeyDown } = props;

  // 2. lib hooks
  const { enqueueSnackbar } = useSnackbar();

  // 3. state hooks
  // 4. query hooks

  // 5. form hooks
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isDirty, isValid },
  } = useForm({
    defaultValues: {
      profileImageUrl: '',
      name: '',
      nickname: '',
      status: '',
      type: '',
      expectedActivatedOn: '',
      phoneNumber: null,
      email: null,
    },
  });

  // 6. calculate values
  const isDisabled = !isDirty || !isValid;

  // 7. effect hooks
  // 8. handlers
  // 9. render
  return (
    <Dialog open onKeyDown={onKeyDown}>
      <DialogTitleGroup title="아티스트 등록" onClose={onClose} />
      <DialogContent css={{ width: '640px' }}>
        <Stack direction="column" spacing={1}>
          <FormRow
            required
            label="프로필 사진"
            input={
              <FileUploadButton
                maxFiles={1}
                description="이미지 파일만 업로드 가능"
                onUploadComplete={(urls) => {
                  if (urls.length > 0) {
                    setValue('profileImageUrl', urls[0], { shouldDirty: true, shouldValidate: true });
                  }
                }}
              />
            }
          />

          <Grid container spacing={1}>
            <Grid size={{ xs: 6 }}>
              <FormRow required label="이름" input={<TextField {...register('name')} />} />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <FormRow required label="활동명" input={<TextField {...register('nickname')} />} />
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid size={{ xs: 6 }}>
              <FormRow required label="타입" input={<TextField {...register('type')} />} />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <FormRow required label="상태" input={<TextField {...register('status')} />} />
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid size={{ xs: 6 }}>
              <FormRow required label="연락처" input={<TextField {...register('phoneNumber')} />} />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <FormRow required label="이메일" input={<TextField {...register('email')} />} />
            </Grid>
          </Grid>

          <FormRow required label="예정 활동일" input={<TextField {...register('expectedActivatedOn')} />} />
        </Stack>
      </DialogContent>
      <DialogActions>
        {/* <Button
          loading={loading}
          disabled={isDisabled}
          type="submit"
          onClick={handleSubmit(async ({ title, subTitle, publisher, coverImageUrl }) => {
            await createAlbum({ variables: { title, subTitle, publisher, coverImageUrl } });
          })}
        >
          저장
        </Button> */}
      </DialogActions>
    </Dialog>
  );
}
