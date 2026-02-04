import { useMutation, getDirtyValues } from '@libs';
import { seriesRepository } from '@repositories';
import { Stack, Typography, Chip, Switch, Button, IconButton, Box } from '@mui/material';
import { useState } from 'react';
import { ConfirmDialog, DialogButton, DeleteConfirmDialog, FormRow, FileUploadButton } from '@components';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import type { SeriesMakingType, SeriesModel } from '@models';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

type SeriesFormValues = {
  coverImageUrl?: string;
  name?: string;
  writer?: string;
  illustrator?: string;
  publisher?: string;
  isAdultContent?: boolean;
  description?: string;
  makingType?: SeriesMakingType;
};

export function SeriesBasicInfoSection(props: { series: SeriesModel }) {
  // 1. destructure props
  const { series } = props;

  // 2. lib hooks
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  // 3. state hooks
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // 4. query hooks
  const [changeIsOpen] = useMutation(seriesRepository.changeOpen, {
    onSuccess: () => {
      enqueueSnackbar('시리즈 공개/비공개가 변경되었습니다.', { variant: 'success' });
      setIsConfirmDialogOpen(false);
    },
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: 'error' });
    },
  });
  const [removeSeries] = useMutation(seriesRepository.remove, {
    onSuccess: () => {
      enqueueSnackbar('시리즈가 삭제되었습니다.', { variant: 'success' });
      setIsConfirmDialogOpen(false);
      navigate('/contents/series', { replace: true });
    },
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: 'error' });
    },
  });
  const [updateSeries, { loading: updateLoading }] = useMutation(seriesRepository.update, {
    onSuccess: () => {
      enqueueSnackbar('시리즈가 수정되었습니다.', { variant: 'success' });
      setIsEditing(false);
    },
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: 'error' });
    },
  });

  // 5. form hooks
  const {
    reset,
    register,
    handleSubmit,
    formState: { isValid, isDirty, errors, dirtyFields },
    setValue,
  } = useForm<SeriesFormValues>({
    defaultValues: {
      coverImageUrl: series.coverImageUrl,
      name: series.name,
      writer: series.writer,
      illustrator: series.illustrator,
      publisher: series.publisher,
      isAdultContent: series.isAdultContent,
      description: series.description,
      makingType: series.makingType,
    },
    mode: 'onChange',
  });

  // 6. calculate values
  const isSubmittable = !isDirty || !isValid;

  // 7. effect hooks
  // 8. handlers
  const handleSwitchClick = () => {
    setIsConfirmDialogOpen(true);
  };

  // 9. render
  return (
    <Stack spacing={1}>
      <Stack direction="row" spacing={1} css={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Stack direction="row" spacing={3} css={{ alignItems: 'center' }}>
          <Typography>기본 정보</Typography>
          <Stack direction="row" spacing={1} css={{ alignItems: 'center' }}>
            <Chip label={series.isOpen ? '공개' : '비공개'} color={series.isOpen ? 'success' : 'error'} />
            <Switch checked={series.isOpen} onChange={handleSwitchClick} />
          </Stack>
        </Stack>

        {isEditing ? (
          <Stack direction="row" spacing={1}>
            <Button
              loading={updateLoading}
              disabled={isSubmittable}
              onClick={handleSubmit(async (data) => {
                const dirtyValues = getDirtyValues(dirtyFields, data);

                await updateSeries({ variables: { id: series.id, ...dirtyValues } });
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
          <Stack direction="row" spacing={1}>
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
                  onDelete={() => removeSeries({ variables: { id: series.id } })}
                  onClose={onClose}
                  onKeyDown={onKeyDown}
                />
              )}
            </DialogButton>
          </Stack>
        )}
      </Stack>

      <FormRow
        label="커버 사진"
        required
        input={
          isEditing ? (
            <FileUploadButton
              maxFiles={1}
              initialFiles={[series.coverImageUrl]}
              onUploadComplete={(urls) => {
                if (urls.length > 0) {
                  setValue('coverImageUrl', urls[0], { shouldDirty: true, shouldValidate: true });
                }
              }}
            />
          ) : (
            <Box
              component="img"
              src={series.coverImageUrl}
              alt="Series Cover"
              css={{
                width: '244px',
                height: '244px',
                objectFit: 'cover',
                border: '1px solid #e0e0e0',
              }}
            />
          )
        }
      />

      {/* ConfirmDialog */}
      <ConfirmDialog
        open={isConfirmDialogOpen}
        handleClose={() => setIsConfirmDialogOpen(false)}
        handleConfirm={() => changeIsOpen({ variables: { id: series.id, isOpen: !series.isOpen } })}
      >
        <Stack css={{ width: '480px' }}>
          <Typography>
            시리즈가{' '}
            <span css={{ textDecoration: 'underline', fontWeight: 'bold', color: series.isOpen ? 'red' : 'green' }}>
              {series.isOpen ? '비공개' : '공개'}
            </span>{' '}
            상태로 변경되면 해당 시리즈에 포함된 모든 에피소드 중 예상 오픈일자가 오늘보다 이전인 에피소드가{' '}
            <span css={{ textDecoration: 'underline', fontWeight: 'bold', color: series.isOpen ? 'red' : 'green' }}>
              {series.isOpen ? '비공개' : '공개'}
            </span>{' '}
            상태로 변경됩니다.
          </Typography>
          <br />
          <Typography>변경하시겠습니까?</Typography>
        </Stack>
      </ConfirmDialog>
    </Stack>
  );
}
