import { Box, Stack } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { ListViewHeader, Pagination } from '@components';
import { format, useQuery } from '@libs';
import { adminRepository } from '@repositories';
import { useState } from 'react';

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
  const columns: GridColDef[] = [
    { field: 'name', headerName: '이름', width: 100, headerClassName: 'super-app-theme--header' },
    { field: 'email', headerName: '이메일', width: 100, flex: 1, headerClassName: 'super-app-theme--header' },
    {
      field: 'createdAt',
      headerName: '가입일',
      width: 120,
      valueFormatter: (value) => format(value),
      headerClassName: 'super-app-theme--header',
    },
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
          searchItems={[
            { searchKey: 'name', label: '이름' },
            { searchKey: 'email', label: '이메일' },
          ]}
          onSearch={({ searchKey, searchValue }) => {
            setPage(1);
            setSearch({ key: searchKey, value: searchValue });
          }}
        />
        <DataGrid
          rows={rows}
          loading={loading}
          columns={columns}
          hideFooterPagination
          hideFooter
          showCellVerticalBorder
          disableColumnMenu
          disableColumnSorting
          sx={{
            '& .super-app-theme--header': {
              backgroundColor: 'rgba(225, 230, 235, 0.55)',
            },
          }}
        />
        <Pagination page={page} limit={limit} totalCount={totalCount} onLimitChange={setLimit} onChange={setPage} />
      </Stack>
    </Box>
  );
}
