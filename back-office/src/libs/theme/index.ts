import { createTheme } from '@mui/material';

// 그라데이션 색상 상수
export const gradients = {
  primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  // 필요시 다른 그라데이션도 추가 가능
  // secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
} as const;

export const theme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        color: 'primary',
        variant: 'contained',
      },
      styleOverrides: {
        root: {
          '&:disabled': {
            backgroundColor: '#e0e0e0',
          },
        },
      },
    },
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
    MuiDialog: {
      defaultProps: {
        fullWidth: false,
      },
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
        slotProps: {
          inputLabel: {
            shrink: true,
          },
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '20px 24px',
        },
      },
    },
  },
});
