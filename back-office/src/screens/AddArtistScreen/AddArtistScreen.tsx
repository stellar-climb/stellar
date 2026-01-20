import { Box, Stack, TextField } from '@mui/material';
import { ListViewHeader, BreadCrumb, Section, FormRow } from '@components';
import { Form, useForm } from 'react-hook-form';
import FileUploadButton from '../../components/FileUploadButton/FileUploadButton';

export function AddArtistScreen() {
  // 1. destructure props
  // 2. lib hooks
  // 3. state hooks
  // 4. query hooks
  // 5. form hooks
  const { register } = useForm({
    defaultValues: {
      name: '',
      nickname: '',
      expectedActivatedOn: '',
      phoneNumber: '',
      email: '',
      description: '',
    },
  });

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
      <Section css={{ width: '720px' }}>
        <Stack spacing={1}>
          <FormRow
            label="프로필 사진"
            input={
              <Box css={{ width: '100%', height: '120px', border: '1px solid #ccc' }}>
                <FileUploadButton />
              </Box>
            }
          />
          <FormRow label="이름" input={<TextField {...register('name')} />} />
          <FormRow label="활동명" input={<TextField {...register('nickname')} />} />
          <FormRow label="예상 활동 개시일" input={<TextField {...register('expectedActivatedOn')} />} />
          <FormRow label="핸드폰번호" input={<TextField {...register('phoneNumber')} />} />
          <FormRow label="이메일" input={<TextField {...register('email')} />} />
          <FormRow label="소개글" input={<TextField multiline rows={4} {...register('description')} />} />
        </Stack>
      </Section>
    </Stack>
  );
}
