import { ListItemButton, ListItemText, Collapse, ListItemIcon, Typography, Stack } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

export function MenuList(props: {
  title: string;
  icon?: React.ReactNode;
  menuItems?: { path: string; label: string }[];
}) {
  // 1. destructure props
  const { title, icon, menuItems } = props;

  // 2. lib hooks
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  // 3. state hooks
  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  const isSubMenuSelected = menuItems?.some((item) => location.pathname === item.path) || false;

  // 7. effect hooks
  useEffect(() => {
    if (isSubMenuSelected) {
      setTimeout(() => {
        setOpen(true);
      }, 0);
    }
  }, [isSubMenuSelected, setOpen]);

  // 8. handlers
  // 9. render
  return (
    <React.Fragment>
      <ListItemButton onClick={() => setOpen(!open)}>
        {icon && <ListItemIcon css={{ minWidth: '32px', color: '#000000' }}>{icon}</ListItemIcon>}
        <ListItemText primary={title} />
        {menuItems && menuItems.length > 0 && (open ? <ExpandLess /> : <ExpandMore />)}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {menuItems &&
          menuItems.map((item) => (
            <ListItemButton
              key={item.path}
              onClick={() => navigate(item.path)}
              selected={location.pathname === item.path}
              css={{ paddingLeft: '48px' }}
            >
              <Stack direction="row" spacing={1} css={{ justifyContent: 'center', alignItems: 'center' }}>
                <Typography>●</Typography>
                <ListItemText primary={item.label} />
              </Stack>
            </ListItemButton>
          ))}
      </Collapse>
    </React.Fragment>
  );
}
