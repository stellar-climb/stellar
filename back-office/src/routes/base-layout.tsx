import { Box, AppBar, Toolbar, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Navigator } from '@components';

const drawerWidth = 240;

export function Layout() {
  // 1. destructure props
  // 2. lib hooks
  // 3. state hooks
  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers

  return (
    <Box sx={{ display: 'flex' }}>
      {/* 상단 AppBar */}
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Stellar Back Office
          </Typography>
        </Toolbar>
      </AppBar>

      {/* 왼쪽 사이드바 */}
      <Navigator drawerWidth={drawerWidth} />

      {/* 메인 콘텐츠 영역 */}
      <Box
        component="main"
        css={{
          flexGrow: 1,
          width: `calc(100% - ${drawerWidth}px)`,
          height: '100%',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Box sx={{ padding: '16px' }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
