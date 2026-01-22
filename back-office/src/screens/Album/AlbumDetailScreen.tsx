import { Stack, TextField, Typography } from '@mui/material';
import { BreadCrumb, FormRow, FromTypography, ListViewHeader, Section } from '../../components';

export function AlbumDetailScreen(props: { albumId: number }) {
  // 1. destructure props
  const { albumId } = props;

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
      <BreadCrumb
        items={[
          { label: '앨범', path: '/albums' },
          { label: '앨범 상세 정보', path: `/albums/${albumId}` },
        ]}
      />
      <Stack direction="row" spacing={2} css={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <ListViewHeader title="앨범 상세 정보" />
      </Stack>

      <Section css={{ width: '480px' }}>
        <FormRow label="앨범명" input={<FromTypography>앨범명</FromTypography>} />
      </Section>
    </Stack>
  );
}
