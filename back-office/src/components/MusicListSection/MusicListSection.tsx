import { useState } from 'react';
import { CustomDataGrid } from '../CustomDataGrid';
import { Stack, Typography, Chip } from '@mui/material';
import { albumRepository } from '@repositories';
import { type AlbumModel } from '@models';
import { useQuery } from '@libs';
import type { GridColDef } from '../CustomDataGrid';
import { Pagination } from '../Pagination';

export function MusicListSection(props: { albumId: number }) {
  // 1. destructure props
  const { albumId } = props;

  // 2. lib hooks
  // 3. state hooks
  const [search, setSearch] = useState<{ key: string; value: string }>();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // 4. query hooks
  const { data: albums } = useQuery(albumRepository.list, {
    variables: { page, limit, filter: search && search.value ? { search: search.key, searchValue: search.value } : {} },
  });

  // 5. form hooks
  // 6. calculate values
  const columns: GridColDef<AlbumModel>[] = [
    { field: 'title', headerName: '앨범명', width: 120 },
    { field: 'subTitle', headerName: '부재', width: 120 },
    { field: 'publisher', headerName: '발매사', width: 120 },
    {
      field: 'isOpen',
      headerName: '공개 여부',
      width: 120,
    },
  ];
  const rows = albums?.items ?? [];
  const total = albums?.total ?? 0;
  // 7. effect hooks
  // 8. handlers
  // 9. render
  return (
    <Stack spacing={2} css={{ maxHeight: '720px', overflow: 'auto' }}>
      <Stack direction="row" spacing={1} css={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Stack direction="row" spacing={3} css={{ alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="h6" css={{ width: '120px' }}>
            음악 리스트
          </Typography>
        </Stack>
      </Stack>
      <CustomDataGrid rows={rows} columns={columns} />
      <Pagination totalCount={total} page={page} limit={limit} onChange={setPage} onLimitChange={setLimit} />
    </Stack>
  );
}
