import { Box, Button, Stack } from '@mui/material';
import { CustomDataGrid, DialogButton, ListViewHeader, Pagination, AddRolePolicyDialog } from '@components';
import { useQuery } from '@libs';
import { rolePolicyRepository } from '@repositories';
import { useState } from 'react';
import type { GridColDef } from '@mui/x-data-grid';
import { format, gradients } from '@libs';

export function RolePolicyScreen() {
  // 1. destructure props
  // 2. lib hooks
  // 3. state hooks
  const [search, setSearch] = useState<{ key: string; value: string }>();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // 4. query hooks
  const { data: rolePolicies } = useQuery(rolePolicyRepository.list, {
    variables: { page, limit, filter: search && search.value ? { search: search.key, searchValue: search.value } : {} },
  });

  // 5. form hooks
  // 6. calculate values

  const columns: GridColDef[] = [
    { field: 'name', headerName: '이름', width: 100 },
    { field: 'description', headerName: '설명', width: 100 },
    { field: 'createdAt', headerName: '생성일', width: 120, flex: 1, valueFormatter: (value) => format(value) },
  ];

  const rows = rolePolicies?.items ?? [];
  const total = rolePolicies?.total ?? 0;

  // 7. effect hooks
  // 8. handlers
  // 9. render
  return (
    <Box>
      <Stack direction="column" spacing={2}>
        <Stack direction="row" spacing={2} css={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <ListViewHeader
            searchItems={[{ searchKey: 'name', label: '이름' }]}
            onSearch={({ searchKey, searchValue }) => {
              setPage(1);
              setSearch({ key: searchKey, value: searchValue });
            }}
          />
          <DialogButton
            render={({ onOpen }) => (
              <Button onClick={onOpen} css={{ background: gradients.primary, color: 'white' }}>
                + ADD
              </Button>
            )}
          >
            {({ onClose, onKeyDown }) => <AddRolePolicyDialog onClose={onClose} onKeyDown={onKeyDown} />}
          </DialogButton>
        </Stack>
        <CustomDataGrid columns={columns} rows={rows} />
        <Pagination totalCount={total} page={page} limit={limit} onChange={setPage} onLimitChange={setLimit} />
      </Stack>
    </Box>
  );
}
