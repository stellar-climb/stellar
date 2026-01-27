import { Box, AppBar, Toolbar, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Navigator } from '@components';

export const drawerWidth = 240;
export const headerHeight = 64;

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
          width: '100%', // 전체 너비로 변경
          zIndex: (theme) => theme.zIndex.drawer + 1, // Drawer 위로 올라오도록
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          boxShadow: 'none',
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
