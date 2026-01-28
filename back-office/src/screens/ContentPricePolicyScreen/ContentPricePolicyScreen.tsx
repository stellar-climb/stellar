import { Box, Stack, Button } from '@mui/material';
import { ListViewHeader, DialogButton, CustomDataGrid, type GridColDef, Pagination } from '@components';
import { gradients } from '@libs';
import { useState } from 'react';

export function ContentPricePolicyScreen() {
  // 1. destructure props
  // 2. lib hooks
  // 3. state hooks
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState<{ key: string; value: string }>();

  // 4. query hooks
  // 5. form hooks
  // 6. calculate values

  // 7. effect hooks
  // 8. handlers
  // 9. render
  return (
    <Box>
      <Stack direction="column" spacing={2}>
        <Stack direction="row" spacing={2} css={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <ListViewHeader
            title="콘텐츠 가격 정책 목록 조회"
            searchItems={[{ searchKey: 'name', label: '이름' }]}
            onSearch={({ searchKey, searchValue }) => {
              setPage(1);
              setSearch({ key: searchKey, value: searchValue });
            }}
          />
        </Stack>
        {/* <CustomDataGrid columns={columns} rows={rows} /> */}
        {/* <Pagination totalCount={total} page={page} limit={limit} onChange={setPage} onLimitChange={setLimit} /> */}
      </Stack>
    </Box>
  );
}
