import { Box } from '@mui/material';
import type { ReactNode } from 'react';

export function Section(props: { children: ReactNode; className?: string }) {
  // 1. destructure props
  const { children, className } = props;

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
        flexDirection: 'column',
        gap: '16px',
        backgroundColor: 'white',
        padding: '24px',
        borderRadius: '12px',
        border: '1px solid #eef2f6',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      }}
      className={className}
    >
      {children}
    </Box>
  );
}
