import { Button, Stack } from '@mui/material';
import { CustomDataGrid, ListViewHeader, Pagination } from '@components';
import { useState } from 'react';
import { gradients, useQuery } from '@libs';
import { artistRepository } from '@repositories';
import type { GridColDef } from '@mui/x-data-grid';
import type { ArtistModel } from '@models';
import { useNavigate } from 'react-router-dom';

export function ArtistScreen() {
  // 1. destructure props
  // 2. lib hooks
  const navigate = useNavigate();
  // 3. state hooks
  const [search, setSearch] = useState<{ key: string; value: string }>();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // 4. query hooks
  const { data: artists } = useQuery(artistRepository.list, {
    variables: { page, limit, filter: search && search.value ? { search: search.key, searchValue: search.value } : {} },
  });

  // 5. form hooks
  // 6. calculate values
  const columns: GridColDef<ArtistModel>[] = [
    { field: 'name', headerName: '이름', width: 100 },
    { field: 'description', headerName: '설명', width: 100 },
    { field: 'createdAt', headerName: '생성일', width: 120, flex: 1, valueFormatter: (value) => format(value) },
  ];
  const rows = artists?.items ?? [];
  const total = artists?.total ?? 0;

  // 7. effect hooks
  // 8. handlers
  // 9. render
  return (
    <Stack direction="column" spacing={2}>
      <Stack direction="row" spacing={2} css={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <ListViewHeader
          title="아티스트"
          searchItems={[{ searchKey: 'name', label: '이름' }]}
          onSearch={({ searchKey, searchValue }) => {
            setPage(1);
            setSearch({ key: searchKey, value: searchValue });
          }}
          addButton={
            <Button onClick={() => navigate('add')} css={{ background: gradients.primary, color: 'white' }}>
              + 추가
            </Button>
          }
        />
      </Stack>
      <CustomDataGrid columns={columns} rows={rows} />
      <Pagination totalCount={total} page={page} limit={limit} onChange={setPage} onLimitChange={setLimit} />
    </Stack>
  );
}
