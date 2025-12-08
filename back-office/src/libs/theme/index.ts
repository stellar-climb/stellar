import { createTheme } from '@mui/material';

// 그라데이션 색상 상수
export const gradients = {
  primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  // 필요시 다른 그라데이션도 추가 가능
  // secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
} as const;

export const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          padding: '12px 14px',
        },
      },
    },
    MuiIconButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          color: '#000000',
        },
      },
    },
  },
});
