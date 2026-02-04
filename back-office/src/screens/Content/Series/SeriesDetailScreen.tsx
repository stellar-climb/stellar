import { CircularProgress, Grid, Stack } from '@mui/material';
import { ListViewHeader, BreadCrumb, Section, SeriesBasicInfoSection } from '@components';
import { useParams } from 'react-router-dom';
import { useQuery } from '@libs';
import { seriesRepository } from '@repositories';

export function SeriesDetailScreen() {
  // 1. destructure props
  // 2. lib hooks
  const { id } = useParams<{ id: string }>();

  // 3. state hooks
  // 4. query hooks
  const { data: series, loading } = useQuery(seriesRepository.retrieve, { variables: { id: Number(id) } });
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  // 9. render
  return (
    <Stack direction="column" spacing={2}>
      <BreadCrumb
        items={[
          { label: '시리즈', path: '/contents/series' },
          { label: '시리즈 상세 정보', path: `/contents/series/${id}` },
        ]}
      />
      <Stack direction="row" css={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <ListViewHeader title="시리즈 상세 정보" />
      </Stack>

      {loading || !series ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={4} gap={2}>
          <Grid size={{ xs: 12, md: 3 }}>
            <Section>
              <SeriesBasicInfoSection series={series} />
            </Section>
          </Grid>
          <Grid size={{ xs: 12, md: 9 }}>
            {/* <Section>
            <MusicListSection albumId={Number(id)} />
          </Section> */}
          </Grid>
        </Grid>
      )}
    </Stack>
  );
}
