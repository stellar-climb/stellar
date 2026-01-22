import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export function BoxLink(props: { children: React.ReactNode; to: string; replace?: boolean }) {
  // 1. destructure props
  const { children, to, replace } = props;

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
      component={Link}
      to={to}
      replace={replace}
      css={{
        'width': '100%',
        'height': '100%',
        'display': 'flex',
        'textDecoration': 'none',
        'color': '#015dee',
        '&:hover': { textDecoration: 'underline' },
        'fontWeight': 'bold',
      }}
    >
      {children}
    </Box>
  );
}
