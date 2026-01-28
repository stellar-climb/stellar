import { Box, Button, Stack } from '@mui/material';
import {
  CustomDataGrid,
  DialogButton,
  ListViewHeader,
  Pagination,
  AddRolePolicyDialog,
  DeleteConfirmDialog,
  EditRolePolicyDialog,
} from '@components';
import { useMutation, useQuery, format, gradients } from '@libs';
import { rolePolicyRepository } from '@repositories';
import { useState } from 'react';
import type { GridColDef } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import type { RolePolicyModel } from '@models';

export function RolePolicyScreen() {
  // 1. destructure props
  // 2. lib hooks
  const { enqueueSnackbar } = useSnackbar();

  // 3. state hooks
  const [search, setSearch] = useState<{ key: string; value: string }>();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // 4. query hooks
  const { data: rolePolicies } = useQuery(rolePolicyRepository.list, {
    variables: { page, limit, filter: search && search.value ? { search: search.key, searchValue: search.value } : {} },
  });
  const [removeRolePolicy, { loading }] = useMutation(rolePolicyRepository.remove, {
    onSuccess: () => {
      enqueueSnackbar('삭제되었습니다.', { variant: 'success' });
    },
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: 'error' });
    },
  });

  // 5. form hooks
  // 6. calculate values
  const columns: GridColDef<RolePolicyModel>[] = [
    { field: 'name', headerName: '이름', width: 100 },
    { field: 'description', headerName: '설명', width: 100 },
    { field: 'createdAt', headerName: '생성일', width: 120, flex: 1, valueFormatter: (value) => format(value) },
    {
      field: 'id',
      headerName: '',
      align: 'center',
      headerAlign: 'center',
      width: 160,
      renderCell: ({ row }) => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            width: '100%',
            height: '100%',
          }}
        >
          <DialogButton
            render={({ onOpen }) => (
              <Button color="primary" size="small" onClick={onOpen}>
                수정
              </Button>
            )}
          >
            {({ onClose, onKeyDown }) => (
              <EditRolePolicyDialog rolePolicy={row} onClose={onClose} onKeyDown={onKeyDown} />
            )}
          </DialogButton>
          <DialogButton
            render={({ onOpen }) => (
              <Button color="error" size="small" onClick={onOpen} loading={loading}>
                삭제
              </Button>
            )}
          >
            {({ onClose, onKeyDown }) => (
              <DeleteConfirmDialog
                onClose={onClose}
                onKeyDown={onKeyDown}
                onDelete={() => removeRolePolicy({ variables: { id: row.id } })}
              />
            )}
          </DialogButton>
        </Box>
      ),
    },
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
            title="권한 정책 목록 조회"
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
                {({ onClose, onKeyDown }) => <AddRolePolicyDialog onClose={onClose} onKeyDown={onKeyDown} />}
              </DialogButton>
            }
          />
        </Stack>
        <CustomDataGrid columns={columns} rows={rows} />
        <Pagination totalCount={total} page={page} limit={limit} onChange={setPage} onLimitChange={setLimit} />
      </Stack>
    </Box>
  );
}
