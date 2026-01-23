import React from 'react';
import { Grid, Typography } from '@mui/material';

const tableInputStyle = {
  '& .MuiOutlinedInput-notchedOutline': {
    borderRadius: '0px 4px 4px 0px',
    borderWidth: '1px 1px 1px 0',
  },

  '& .MuiInputBase-input': {
    padding: '10px 12px',
  },
};

export function FormRow(props: { label: string; input: React.ReactNode; required?: boolean }) {
  // 1. destructure props
  const { label, input, required = false } = props;

  // 2. lib hooks
  // 3. state hooks
  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  // 9. render
  return (
    <Grid container>
      {/* 왼쪽 라벨 영역 */}
      <Grid
        size={{ xs: 3, sm: 3 }}
        css={{
          backgroundColor: '#efefef',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '4px 0 0 4px',
          borderColor: 'rgba(0, 0, 0, 0.23)',
        }}
      >
        {required && <Typography css={{ color: 'red', marginRight: '4px' }}>*</Typography>}
        <Typography variant="subtitle2" css={{ color: 'black', textAlign: 'center' }}>
          {label}
        </Typography>
      </Grid>

      {/* 오른쪽 입력 영역 */}
      <Grid
        size={{ xs: 9, sm: 9 }}
        css={{
          ...tableInputStyle,
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {input}
      </Grid>
    </Grid>
  );
}
