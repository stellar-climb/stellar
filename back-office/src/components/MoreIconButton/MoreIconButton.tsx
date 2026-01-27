import { IconButton, Menu } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { useState } from 'react';

export function MoreIconButton(props: { editButton?: React.ReactNode; deleteButton?: React.ReactNode }) {
  // 1. destructure props
  const { editButton, deleteButton } = props;

  // 2. lib hooks
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // 3. state hooks
  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // 9. render
  return (
    <>
      <IconButton onClick={handleOpen}>
        <MoreVertIcon />
      </IconButton>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {editButton}
        {deleteButton}
      </Menu>
    </>
  );
}
