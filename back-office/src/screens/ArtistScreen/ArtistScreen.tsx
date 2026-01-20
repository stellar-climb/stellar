import { Box, Stack } from '@mui/material';
import { CustomDataGrid, ListViewHeader, Pagination } from '@components';
import { useState } from 'react';

export function ArtistScreen() {
  // 1. destructure props
  // 2. lib hooks
  // 3. state hooks
  const [search, setSearch] = useState<{ key: string; value: string }>();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  // 9. render
  return (
    <Stack direction="column" spacing={2}>
      <Stack direction="row" spacing={2} css={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <ListViewHeader
          title="아티스트"
          searchItems={[{ searchKey: 'name', label: '이름' }]}
          onSearch={({ searchKey, searchValue }) => {
            setPage(1);
            setSearch({ key: searchKey, value: searchValue });
          }}
        />
      </Stack>
      {/* <CustomDataGrid columns={columns} rows={[]} /> */}
      <Pagination totalCount={100} page={page} limit={limit} onChange={setPage} onLimitChange={setLimit} />
    </Stack>
  );
}
