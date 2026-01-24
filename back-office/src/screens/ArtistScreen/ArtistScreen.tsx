import { Button, Stack } from '@mui/material';
import { BreadCrumb, CustomDataGrid, DialogButton, ListViewHeader, Pagination, AddArtistDialog } from '@components';
import { useState } from 'react';
import { format, gradients, useQuery } from '@libs';
import { artistRepository } from '@repositories';
import type { GridColDef } from '@mui/x-data-grid';
import type { ArtistModel } from '@models';

export function ArtistScreen() {
  // 1. destructure props
  // 2. lib hooks

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
      <BreadCrumb items={[{ label: '아티스트', path: '/artists' }]} />
      <Stack direction="row" spacing={2} css={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <ListViewHeader
          title="아티스트"
          searchItems={[{ searchKey: 'name', label: '이름' }]}
          onSearch={({ searchKey, searchValue }) => {
            setPage(1);
            setSearch({ key: searchKey, value: searchValue });
          }}
          addButton={
            <DialogButton
              render={({ onOpen }) => (
                <Button onClick={onOpen} css={{ background: gradients.primary }}>
                  + 추가
                </Button>
              )}
            >
              {({ onClose, onKeyDown }) => <AddArtistDialog onClose={onClose} onKeyDown={onKeyDown} />}
            </DialogButton>
          }
        />
      </Stack>
      <CustomDataGrid columns={columns} rows={rows} />
      <Pagination totalCount={total} page={page} limit={limit} onChange={setPage} onLimitChange={setLimit} />
    </Stack>
  );
}
