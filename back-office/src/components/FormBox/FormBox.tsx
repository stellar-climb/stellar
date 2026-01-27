import { Box } from '@mui/material';

export function FormBox(props: { children: React.ReactNode }) {
  // 1. destructure props
  const { children } = props;

  // 2. lib hooks
  // 3. state hooks
  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  // 9. render
  return (
    <Box
      css={{
        display: 'flex',
        width: '100%',
        padding: '10px 12px',
        border: '1px solid rgba(0, 0, 0, 0.23)',
        borderLeft: 'none',
        borderRadius: '0 4px 4px 0',
        backgroundColor: 'white',
        height: '21px',
        alignItems: 'center',
      }}
    >
      {children}
    </Box>
  );
}
