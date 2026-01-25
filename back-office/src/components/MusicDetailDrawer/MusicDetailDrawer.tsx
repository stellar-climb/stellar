import { Box, Drawer, Typography } from '@mui/material';
import { musicRepository } from '../../repositories';
import { useQuery } from '../../libs';

export function MusicDetailDrawer(props: { albumId: number; musicId: number | null; onClose: () => void }) {
  // 1. destructure props
  const { albumId, musicId, onClose } = props;

  // 2. lib hooks
  // 3. state hooks
  // 4. query hooks
  const { data: music } = useQuery(musicRepository.retrieve, {
    variables: { id: musicId!, albumId },
    enabled: !!musicId,
  });
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  // 9. render
  return (
    <Drawer open={!!musicId} anchor="right" onClose={onClose} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Box css={{ width: '480px', padding: '16px' }}>
        <Typography variant="h6">{music?.title}</Typography>
      </Box>
    </Drawer>
  );
}
