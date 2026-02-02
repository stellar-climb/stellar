import { Stack } from '@mui/material';
import { BreadCrumb, ListViewHeader } from '@components';

export function HeroScreen() {
  // 1. destructure props
  // 2. lib hooks
  // 3. state hooks
  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  // 9. render
  return (
    <Stack direction="column" spacing={2}>
      <BreadCrumb items={[{ label: '배너', path: '/sections/heroes' }]} />
      <Stack direction="row" spacing={2} css={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <ListViewHeader
          title="배너 목록 조회"
          searchItems={[
            { searchKey: 'name', label: '이름' },
            { searchKey: 'category', label: '카테고리' },
          ]}
        />
      </Stack>
    </Stack>
  );
}
