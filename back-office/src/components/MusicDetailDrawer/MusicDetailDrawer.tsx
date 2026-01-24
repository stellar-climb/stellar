import { Box, Drawer } from '@mui/material';

export function MusicDetailDrawer(props: { musicId: number | null; onClose: () => void }) {
  // 1. destructure props
  const { musicId, onClose } = props;

  // 2. lib hooks
  // 3. state hooks
  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  // 9. render
  return (
    <Drawer open={!!musicId} anchor="right" onClose={onClose} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Box css={{ width: '480px', padding: '16px' }}>MusicDetailDrawer</Box>
    </Drawer>
  );
}
