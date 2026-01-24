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

export function FormRow(props: { label: string; input: React.ReactNode; required?: boolean; className?: string }) {
  // 1. destructure props
  const { label, input, required = false, className } = props;

  // 2. lib hooks
  // 3. state hooks
  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  // 9. render
  return (
    <Grid container className={className}>
      {/* 왼쪽 라벨 영역 */}
      <Grid
        css={{
          width: '120px', // ⭐ 고정 너비 설정
          // minWidth: LABEL_WIDTH,   // 화면이 줄어들어도 찌그러지지 않게 방지
          backgroundColor: '#efefef',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '4px 0 0 4px',
        }}
      >
        {required && <Typography css={{ color: 'red', marginRight: '4px' }}>*</Typography>}
        <Typography variant="subtitle2" css={{ color: 'black', textAlign: 'center' }}>
          {label}
        </Typography>
      </Grid>

      {/* 오른쪽 입력 영역 */}
      <Grid
        css={{
          flex: 1,
          ...tableInputStyle,
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
          minWidth: 0,
        }}
      >
        {input}
      </Grid>
    </Grid>
  );
}
