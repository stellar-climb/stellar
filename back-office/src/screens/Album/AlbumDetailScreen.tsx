import { CircularProgress, Stack } from '@mui/material';
import { BreadCrumb, FormRow, FromTypography, ListViewHeader, Section } from '../../components';
import { useQuery } from '../../libs';
import { albumRepository } from '../../repositories';
import { useParams } from 'react-router-dom';

export function AlbumDetailScreen() {
  // 1. destructure props
  // 2. lib hooks
  const { id } = useParams<{ id: string }>();

  // 3. state hooks
  // 4. query hooks
  const { data: album, loading } = useQuery(albumRepository.retrieve, { variables: { albumId: Number(id) } });

  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  // 9. render
  console.log(album);
  return (
    <Stack direction="column" spacing={2}>
      <BreadCrumb
        items={[
          { label: '앨범', path: '/albums' },
          { label: '앨범 상세 정보', path: `/albums/${id}` },
        ]}
      />
      <Stack direction="row" spacing={2} css={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <ListViewHeader title="앨범 상세 정보" />
      </Stack>

      {loading || !album ? (
        <CircularProgress />
      ) : (
        <Section css={{ width: '480px' }}>
          <Stack spacing={1}>
            <FormRow label="앨범명" input={<FromTypography>{album.title}</FromTypography>} />
            <FormRow label="부재" input={<FromTypography>{album.subTitle}</FromTypography>} />
            <FormRow label="발매사" input={<FromTypography>{album.publisher}</FromTypography>} />
          </Stack>
        </Section>
      )}
    </Stack>
  );
}
