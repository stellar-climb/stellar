import { ListItemButton, ListItemText, Collapse, ListItemIcon } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function MenuList(props: {
  title: string;
  icon?: React.ReactNode;
  menuItems: { path: string; label: string }[];
}) {
  // 1. destructure props
  const { title, icon, menuItems } = props;

  // 2. lib hooks
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // 3. state hooks
  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  return (
    <>
      <ListItemButton onClick={() => setOpen(!open)}>
        {icon && <ListItemIcon css={{ minWidth: '32px', color: 'inherit' }}>{icon}</ListItemIcon>}
        <ListItemText primary={title} />
        {menuItems.length > 0 && (open ? <ExpandLess /> : <ExpandMore />)}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {menuItems.map((item) => (
          <ListItemButton key={item.path} onClick={() => navigate(item.path)} css={{ paddingLeft: '40px' }}>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </Collapse>
    </>
  );
}
