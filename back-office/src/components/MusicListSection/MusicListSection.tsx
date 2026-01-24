import { useState } from 'react';
import { CustomDataGrid } from '../CustomDataGrid';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { musicRepository } from '@repositories';
import { type MusicModel, getMusicStatusLabel } from '@models';
import { format, useQuery } from '@libs';
import type { GridColDef } from '../CustomDataGrid';
import { Pagination } from '../Pagination';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { MusicDetailDrawer } from '../MusicDetailDrawer';
import PageviewIcon from '@mui/icons-material/Pageview';

export function MusicListSection(props: { albumId: number }) {
  // 1. destructure props
  const { albumId } = props;

  // 2. lib hooks
  // 3. state hooks
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedMusicId, setSelectedMusicId] = useState<number | null>(null);

  // 4. query hooks
  const { data: musics, loading } = useQuery(musicRepository.getMusicsByAlbumId, {
    variables: { albumId, page, limit },
  });

  // 5. form hooks
  // 6. calculate values
  const columns: GridColDef<MusicModel>[] = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'title', headerName: '곡명', width: 120 },
    { field: 'lyricist', headerName: '작사가', width: 120 },
    { field: 'songwriter', headerName: '작곡가', width: 120 },
    { field: 'status', headerName: '상태', width: 80, renderCell: ({ value }) => getMusicStatusLabel(value) },
    {
      field: 'expectedPublishOn',
      headerName: '공개 일자',
      width: 120,
      valueFormatter: (value) => (value ? format(value, 'YYYY-MM-DD') : '-'),
    },
    {
      field: 'isAdultContent',
      headerName: '성인 여부',
      width: 120,
      renderCell: ({ value }) =>
        value ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              height: '100%',
            }}
          >
            <CheckCircleIcon color="success" />
          </Box>
        ) : (
          ''
        ),
    },
    {
      field: 'isMain',
      headerName: '대표곡 여부',
      align: 'center',
      width: 120,
      renderCell: ({ value }) =>
        value ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              height: '100%',
            }}
          >
            <CheckCircleIcon color="success" />
          </Box>
        ) : (
          ''
        ),
    },
    {
      field: 'createdAt',
      flex: 1,
      headerName: '생성일',
      valueFormatter: (value) => format(value, 'YYYY-MM-DD HH:mm:ss'),
    },
    {
      field: 'actions',
      headerName: '조회',
      width: 80,
      renderCell: ({ row: { id } }) => (
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            setSelectedMusicId(id);
          }}
          css={{ width: '48px', height: '48px' }}
        >
          <PageviewIcon css={{ width: '48px', height: '48px' }} color="primary" />
        </IconButton>
      ),
    },
  ];
  const rows = musics?.items ?? [];
  const total = musics?.total ?? 0;

  // 7. effect hooks
  // 8. handlers
  // 9. render
  return (
    <Stack spacing={2} css={{ overflow: 'hidden' }}>
      <Stack direction="row" spacing={1} css={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Stack direction="row" spacing={3} css={{ alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="h6" css={{ width: '240px' }}>
            음악 리스트 (총 {total}곡)
          </Typography>
        </Stack>
      </Stack>
      <CustomDataGrid rows={rows} columns={columns} loading={loading} />
      <Pagination totalCount={total} page={page} limit={limit} onChange={setPage} onLimitChange={setLimit} />

      {/* Drawer 영역 */}
      <MusicDetailDrawer musicId={selectedMusicId} onClose={() => setSelectedMusicId(null)} />
    </Stack>
  );
}
