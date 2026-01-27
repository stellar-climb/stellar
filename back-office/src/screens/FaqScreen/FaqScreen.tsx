import { Stack, Button, MenuItem } from '@mui/material';
import {
  ListViewHeader,
  BreadCrumb,
  DialogButton,
  CustomDataGrid,
  Pagination,
  type GridColDef,
  AddFaqDialog,
  MoreIconButton,
  DeleteConfirmDialog,
} from '@components';
import { format, gradients, useMutation, useQuery } from '@libs';
import { useState } from 'react';
import { faqRepository } from '@repositories';
import { type Faq, getFaqStatusLabelList, getFaqTypeLabel } from '@models';
import { EditFaqDialog } from '../../components/EditFaqDialog/EditFaqDialog';
import { enqueueSnackbar } from 'notistack';

export function FaqScreen() {
  // 1. destructure props
  // 2. lib hooks
  // 3. state hooks
  const [search, setSearch] = useState<{ key: string; value: string }>();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // 4. query hooks
  const { data: faqs, loading } = useQuery(faqRepository.list, {
    variables: { page, limit, filter: { searchKey: search?.key, searchValue: search?.value } },
  });
  const [removeFaq] = useMutation(faqRepository.remove, {
    onSuccess: () => {
      enqueueSnackbar('FAQ가 삭제되었습니다.', { variant: 'success' });
    },
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: 'error' });
    },
  });

  // 5. form hooks
  // 6. calculate values
  const columns: GridColDef<Faq>[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'type', headerName: '유형', width: 150, valueFormatter: (value) => getFaqTypeLabel(value) },
    { field: 'question', headerName: '질문', width: 150 },
    {
      field: 'status',
      headerName: '상태',
      width: 150,
      renderCell: ({ value }) => getFaqStatusLabelList(value),
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
      field: 'actions',
      headerName: '',
      width: 60,
      renderCell: ({ row }) => (
        <MoreIconButton
          editButton={
            <DialogButton render={({ onOpen }) => <MenuItem onClick={onOpen}>수정</MenuItem>}>
              {({ onClose, onKeyDown }) => <EditFaqDialog faq={row} onClose={onClose} onKeyDown={onKeyDown} />}
            </DialogButton>
          }
          deleteButton={
            <DialogButton render={({ onOpen }) => <MenuItem onClick={onOpen}>삭제</MenuItem>}>
              {({ onClose, onKeyDown }) => (
                <DeleteConfirmDialog
                  onDelete={() => removeFaq({ variables: { id: row.id } })}
                  onClose={onClose}
                  onKeyDown={onKeyDown}
                />
              )}
            </DialogButton>
          }
        />
      ),
    },
  ];
  const rows = faqs?.items || [];
  const total = faqs?.total || 0;

  // 7. effect hooks
  // 8. handlers
  // 9. render
  return (
    <Stack direction="column" spacing={2}>
      <BreadCrumb items={[{ label: 'FAQ', path: '/faqs' }]} />
      <Stack direction="row" spacing={2} css={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <ListViewHeader
          title="FAQ 목록 조회"
          searchItems={[
            { searchKey: 'question', label: '질문' },
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
              {({ onClose, onKeyDown }) => <AddFaqDialog onClose={onClose} onKeyDown={onKeyDown} />}
            </DialogButton>
          }
        />
      </Stack>
      <CustomDataGrid loading={loading} columns={columns} rows={rows} />
      <Pagination totalCount={total} page={page} limit={limit} onChange={setPage} onLimitChange={setLimit} />
    </Stack>
  );
}
