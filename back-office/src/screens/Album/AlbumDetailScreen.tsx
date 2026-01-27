import { Grid, IconButton, Stack } from '@mui/material';
import { BreadCrumb, ListViewHeader, Section, AlbumBasicInfoSection, MusicListSection } from '@components';
import { useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

export function AlbumDetailScreen() {
  // 1. destructure props
  // 2. lib hooks
  const { id } = useParams<{ id: string }>();

  // 3. state hooks
  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  // 9. render
  return (
    <Stack direction="column" spacing={2}>
      <BreadCrumb
        items={[
          { label: '앨범', path: '/albums' },
          { label: '앨범 상세 정보', path: `/albums/${id}` },
        ]}
      />
      <Stack direction="row" css={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <ListViewHeader title="앨범 상세 정보" />
      </Stack>

      <Grid container spacing={4} gap={2}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Section>
            <AlbumBasicInfoSection albumId={Number(id)} />
          </Section>
        </Grid>
        <Grid size={{ xs: 12, md: 9 }}>
          <Section>
            <MusicListSection albumId={Number(id)} />
          </Section>
        </Grid>
      </Grid>
    </Stack>
  );
}
