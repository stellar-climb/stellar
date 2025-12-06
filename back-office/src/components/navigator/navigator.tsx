import { Box, Drawer, List, ListItem, ListItemButton, ListItemText, Divider } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSignOut, useUser } from '@libs';

const menuItems = [
  { path: '/', label: '홈' },
  { path: '/users', label: '사용자 관리' },
  { path: '/settings', label: '설정' },
];

export function Navigator(props: { drawerWidth: number }) {
  // 1. destructure props
  const { drawerWidth } = props;

  // 2. lib hooks
  const navigate = useNavigate();
  const location = useLocation();
  const signOut = useSignOut();
  const [user] = useUser();

  // 3. state hooks
  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  return (
    <Drawer
      variant="permanent"
      css={{
        'width': drawerWidth,
        'flexShrink': 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', mt: 8 }}>
        <Box sx={{ overflow: 'auto', flex: 1 }}>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.path} disablePadding>
                <ListItemButton selected={location.pathname === item.path} onClick={() => navigate(item.path)}>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={signOut}>
                <ListItemText primary={user.name} secondary={user.email} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Box>
    </Drawer>
  );
}
