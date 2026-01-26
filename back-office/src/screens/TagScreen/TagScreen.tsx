import { Stack, Button, MenuItem } from '@mui/material';
import {
  ListViewHeader,
  DialogButton,
  Pagination,
  CustomDataGrid,
  type GridColDef,
  BreadCrumb,
  AddTagDialog,
  MoreIconButton,
  EditTagDialog,
} from '@components';
import { gradients, useQuery, format } from '@libs';
import { useState } from 'react';
import { tagRepository } from '@repositories';
import type { TagModel } from '@models';

export function TagScreen() {
  // 1. destructure props
  // 2. lib hooks
  // 3. state hooks
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState<{ key: string; value: string } | null>(null);

  // 4. query hooks
  const { data: tags, loading } = useQuery(tagRepository.list, {
    variables: { page, limit, filter: search && search.value ? { search: search.key, searchValue: search.value } : {} },
  });

  // 5. form hooks
  // 6. calculate values
  const columns: GridColDef<TagModel>[] = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 1,
    },
    {
      field: 'category',
      headerName: '카테고리',
      flex: 1,
    },
    {
      field: 'name',
      headerName: '이름',
      flex: 1,
    },
    {
      field: 'createdAt',
      headerName: '생성일',
      flex: 1,
      valueFormatter: (value) => format(value, 'YYYY-MM-DD HH:mm:ss'),
    },
    {
      field: 'updatedAt',
      headerName: '수정일',
      flex: 1,
      valueFormatter: (value) => format(value, 'YYYY-MM-DD HH:mm:ss'),
    },
    {
      field: '',
      headerName: '',
      width: 60,
      renderCell: ({ row }) => (
        <MoreIconButton
          editButton={
            <DialogButton render={({ onOpen }) => <Button onClick={onOpen}>수정</Button>}>
              {({ onClose, onKeyDown }) => <EditTagDialog tag={row} onClose={onClose} onKeyDown={onKeyDown} />}
            </DialogButton>
          }
        />
      ),
    },
  ];
  const rows = tags?.items ?? [];
  const total = tags?.total ?? 0;

  // 7. effect hooks
  // 8. handlers
  // 9. render
  return (
    <Stack direction="column" spacing={2}>
      <BreadCrumb items={[{ label: '태그', path: '/tags' }]} />
      <Stack direction="row" spacing={2} css={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <ListViewHeader
          title="태그 목록 조회"
          searchItems={[
            { searchKey: 'name', label: '이름' },
            { searchKey: 'category', label: '카테고리' },
          ]}
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
              {({ onClose, onKeyDown }) => <AddTagDialog onClose={onClose} onKeyDown={onKeyDown} />}
            </DialogButton>
          }
        />
      </Stack>
      <CustomDataGrid loading={loading} columns={columns} rows={rows} />
      <Pagination totalCount={total} page={page} limit={limit} onChange={setPage} onLimitChange={setLimit} />
    </Stack>
  );
}
