import { Box, Stack, Chip, Button } from '@mui/material';
import { ListViewHeader, Pagination, CustomDataGrid, type GridColDef, DialogButton } from '@components';
import { format, useQuery } from '@libs';
import { adminRepository } from '@repositories';
import { useState } from 'react';
import { type AdminModel, AdminStatus, getAdminStatus } from '@models';
import { EditAdminDialog } from 'components/EditAdminDialog';

export function AdminScreen() {
  // 1. destructure props
  // 2. lib hooks
  const [search, setSearch] = useState<{ key: string; value: string }>();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // 3. state hooks
  // 4. query hooks
  const { data: admins, loading } = useQuery(adminRepository.list, {
    variables: {
      page,
      limit,
      filter: search && search.value ? { search: search.key, searchValue: search.value } : {},
    },
  });

  // 5. form hooks
  // 6. calculate values
  const columns: GridColDef<AdminModel>[] = [
    { field: 'name', headerName: '이름', width: 100 },
    { field: 'email', headerName: '이메일', width: 100, flex: 1 },
    {
      field: 'createdAt',
      headerName: '입사일',
      width: 120,
      valueFormatter: (value) => format(value),
    },
    {
      field: 'status',
      headerName: '상태',
      width: 120,
      renderCell: ({ value }) => {
        return <Chip label={getAdminStatus(value)} color={value === AdminStatus.ACTIVE ? 'success' : 'error'} />;
      },
    },
    {
      field: 'exitOn',
      headerName: '퇴사일',
      width: 120,
      valueFormatter: (value) => (value ? format(value) : '-'),
    },
    // {
    //   field: 'id',
    //   headerName: '',
    //   align: 'center',
    //   width: 100,
    //   renderCell: ({ row }) => (
    //     <DialogButton
    //       render={({ onOpen }) => (
    //         <Button color="primary" size="small" onClick={onOpen}>
    //           수정
    //         </Button>
    //       )}
    //     >
    //       {({ onClose, onKeyDown }) => <EditAdminDialog admin={row} onClose={onClose} onKeyDown={onKeyDown} />}
    //     </DialogButton>
    //   ),
    // },
  ];
  const rows = admins?.items || [];
  const totalCount = admins?.total || 0;

  // 7. effect hooks
  // 8. handlers
  // 9. render
  return (
    <Box>
      <Stack direction="column" spacing={2}>
        <ListViewHeader
          title="관리자 목록 조회"
          searchItems={[
            { searchKey: 'name', label: '이름' },
            { searchKey: 'email', label: '이메일' },
          ]}
          onSearch={({ searchKey, searchValue }) => {
            setPage(1);
            setSearch({ key: searchKey, value: searchValue });
          }}
        />
        <CustomDataGrid rows={rows} loading={loading} columns={columns} />
        <Pagination page={page} limit={limit} totalCount={totalCount} onLimitChange={setLimit} onChange={setPage} />
      </Stack>
    </Box>
  );
}
