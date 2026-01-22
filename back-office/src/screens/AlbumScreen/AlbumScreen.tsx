import { Button, Stack } from '@mui/material';
import {
  BreadCrumb,
  ListViewHeader,
  CustomDataGrid,
  Pagination,
  type GridColDef,
  DialogButton,
  AddAlbumDialog,
} from '@components';
import { useState } from 'react';
import { albumRepository } from '@repositories';
import { gradients, useQuery } from '@libs';
import { format } from '@libs';
import type { AlbumModel } from '@models';

export function AlbumSreen() {
  // 1. destructure props
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
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'title', headerName: '앨범명', width: 120 },
    { field: 'subTitle', headerName: '부재', width: 120 },
    { field: 'publisher', headerName: '발매사', width: 120 },
    {
      field: 'createdAt',
      headerName: '생성일',
      width: 120,
      flex: 1,
      valueFormatter: (value) => format(value),
    },
  ];
  const rows = albums?.items ?? [];
  const total = albums?.total ?? 0;

  // 7. effect hooks
  // 8. handlers
  // 9. render
  return (
    <Stack direction="column" spacing={2}>
      <BreadCrumb items={[{ label: '앨범', path: '/albums' }]} />
      <Stack direction="row" spacing={2} css={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <ListViewHeader
          title="앨범 목록"
          searchItems={[{ searchKey: 'name', label: '이름' }]}
          onSearch={({ searchKey, searchValue }) => {
            setPage(1);
            setSearch({ key: searchKey, value: searchValue });
          }}
          addButton={
            <DialogButton
              render={({ onOpen }) => (
                <Button onClick={onOpen} css={{ background: gradients.primary, color: 'white' }}>
                  + 추가
                </Button>
              )}
            >
              {({ onClose, onKeyDown }) => <AddAlbumDialog onClose={onClose} onKeyDown={onKeyDown} />}
            </DialogButton>
          }
        />
      </Stack>
      <CustomDataGrid columns={columns} rows={rows} />
      <Pagination totalCount={total} page={page} limit={limit} onChange={setPage} onLimitChange={setLimit} />
    </Stack>
  );
}
