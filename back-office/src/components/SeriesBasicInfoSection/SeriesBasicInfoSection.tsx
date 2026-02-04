import { useQuery, useMutation } from '@libs';
import { seriesRepository } from '@repositories';
import { CircularProgress, Stack, Typography, Chip, Switch } from '@mui/material';
import { useState } from 'react';
import { ConfirmDialog } from '@components';
import { useSnackbar } from 'notistack';

export function SeriesBasicInfoSection(props: { seriesId: number }) {
  // 1. destructure props
  const { seriesId } = props;

  // 2. lib hooks
  const { enqueueSnackbar } = useSnackbar();

  // 3. state hooks
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  // 4. query hooks
  const { data: series, loading } = useQuery(seriesRepository.retrieve, { variables: { id: seriesId } });
  const [changeIsOpen] = useMutation(seriesRepository.changeOpen, {
    onSuccess: () => {
      enqueueSnackbar('시리즈 공개/비공개가 변경되었습니다.', { variant: 'success' });
      setIsConfirmDialogOpen(false);
    },
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: 'error' });
    },
  });

  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  const handleSwitchClick = () => {
    setIsConfirmDialogOpen(true);
  };

  // 9. render
  return (
    <>
      {loading || !series ? (
        <CircularProgress />
      ) : (
        <Stack spacing={1}>
          <Stack direction="row" spacing={1} css={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Stack direction="row" spacing={3} css={{ alignItems: 'center' }}>
              <Typography css={{ width: '80px' }}>기본 정보</Typography>
            </Stack>
            <Stack direction="row" spacing={1} css={{ alignItems: 'center' }}>
              <Chip
                label={series.isOpen ? '공개' : '비공개'}
                color={series.isOpen ? 'success' : 'error'}
                css={{ width: '64px' }}
              />
              <Switch checked={series.isOpen} onChange={handleSwitchClick} />
            </Stack>
          </Stack>

          {/* ConfirmDialog */}
          <ConfirmDialog
            open={isConfirmDialogOpen}
            handleClose={() => setIsConfirmDialogOpen(false)}
            handleConfirm={() => changeIsOpen({ variables: { id: seriesId, isOpen: !series.isOpen } })}
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
      )}
    </>
  );
}
