import { Box, Stack } from '@mui/material';
import { ListViewHeader, BreadCrumb } from '@components';

export function AddArtistScreen() {
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
    <Stack spacing={2}>
      <BreadCrumb
        items={[
          { label: '아티스트', path: '/artists' },
          { label: '등록', path: '/artists/add' },
        ]}
      />

      <Stack direction="row" spacing={2} css={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <ListViewHeader title="아티스트 등록" />
      </Stack>
    </Stack>
  );
}
