import { Stack, Button, Box } from '@mui/material';
import { BreadCrumb, ListViewHeader, CustomDataGrid, Pagination } from '@components';
import { useHeroList } from '@features/hero/hooks';
import { useState } from 'react';

export function HeroScreen() {
  // 1. destructure props
  // 2. lib hooks
  // 3. state hooks
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // 4. query hooks
  const { heroes } = useHeroList({ page, limit, filter: {} });

  // 5. form hooks
  // 6. calculate values
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'type', headerName: '타입', width: 100 },
  ];
  const rows = heroes?.items ?? [];
  const total = heroes?.total ?? 0;

  // 7. effect hooks
  // 8. handlers
  // 9. render
  return (
    <Box>
      <Stack direction="column" spacing={2}>
        <BreadCrumb items={[{ label: '배너', path: '/sections/heroes' }]} />
        <Stack direction="row" spacing={2} css={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <ListViewHeader title="배너 목록 조회" addButton={<Button>배너 추가</Button>} />
        </Stack>
        <CustomDataGrid columns={columns} rows={rows} />
        <Pagination totalCount={total} page={page} limit={limit} onChange={setPage} onLimitChange={setLimit} />
      </Stack>
    </Box>
  );
}
