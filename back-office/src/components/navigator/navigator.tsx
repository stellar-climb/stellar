import { Box, Drawer, List, ListItem, ListItemButton, ListItemText, Divider } from '@mui/material';
import { useSignOut, useUser } from '@libs';
import { MenuList } from './MenuList';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import GavelIcon from '@mui/icons-material/Gavel';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';

export function Navigator(props: { drawerWidth: number }) {
  // 1. destructure props
  const { drawerWidth } = props;

  // 2. lib hooks
  const signOut = useSignOut();
  const [user] = useUser();

  // 3. state hooks
  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  // 9. render
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
          <List component="nav">
            <MenuList title="홈" icon={<HomeIcon />} />
            <MenuList
              title="사용자 관리"
              icon={<AccountCircleIcon />}
              menuItems={[
                { path: '/users', label: '사용자' },
                { path: '/artists', label: '아티스트' },
              ]}
            />
            <MenuList
              title="콘텐츠 관리"
              icon={<AudiotrackIcon />}
              menuItems={[
                { path: '/albums', label: '앨범' },
                { path: '/tags', label: '태그' },
              ]}
            />
            <MenuList title="정책 관리" icon={<GavelIcon />} menuItems={[{ path: '/policies/roles', label: '권한' }]} />
            <MenuList title="커뮤니티 글 관리" />
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
