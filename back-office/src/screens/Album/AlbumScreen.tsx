import { Button, Stack, Chip } from '@mui/material';
import {
  BreadCrumb,
  ListViewHeader,
  CustomDataGrid,
  Pagination,
  type GridColDef,
  DialogButton,
  AddAlbumDialog,
  BoxLink,
} from '@components';
import { useState } from 'react';
import { albumRepository } from '@repositories';
import { gradients, useQuery } from '@libs';
import { format } from '@libs';
import type { AlbumModel } from '@models';

export function AlbumScreen() {
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
    {
      field: 'id',
      headerName: 'ID',
      width: 80,
      renderCell: ({ value }) => <BoxLink to={`/albums/${value}`}>{value}</BoxLink>,
    },
    { field: 'title', headerName: '앨범명', width: 120 },
    { field: 'subTitle', headerName: '부재', width: 120 },
    { field: 'publisher', headerName: '발매사', width: 120 },
    {
      field: 'isOpen',
      headerName: '공개 여부',
      width: 120,
      renderCell: ({ value }) => <Chip label={value ? '공개' : '비공개'} color={value ? 'success' : 'error'} />,
    },
    {
      field: 'createdAt',
      headerName: '생성일',
      width: 120,
      flex: 1,
      valueFormatter: (value) => format(value, 'YYYY-MM-DD HH:mm:ss'),
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
          searchItems={[
            { searchKey: 'title', label: '앨범명' },
            { searchKey: 'subTitle', label: '부재' },
            { searchKey: 'publisher', label: '발매사' },
          ]}
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
