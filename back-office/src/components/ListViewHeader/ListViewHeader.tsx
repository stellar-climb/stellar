import { IconButton, Menu, Stack, MenuItem, TextField } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useState } from 'react';

export function ListViewHeader(props: {
  searchItems?: { searchKey: string; label: string }[];
  onSearch?: (search: { searchKey: string; searchValue: string }) => void;
}) {
  // 1. destructure props
  const { searchItems, onSearch } = props;

  // 2. lib hooks
  // 3. state hooks
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchKey, setSearchKey] = useState(searchItems?.[0]?.searchKey);
  const [searchValue, setSearchValue] = useState('');

  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  const label = searchKey ? searchItems?.find((item) => item.searchKey === searchKey)?.label : '';

  // 7. effect hooks
  // 8. handlers
  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack spacing={2} direction="row" css={{ alignItems: 'center' }}>
      {searchItems && searchItems.length > 1 && (
        <IconButton onClick={handleOpen} css={{ backgroundColor: '#f1f3f5' }}>
          <FilterListIcon />
        </IconButton>
      )}
      {searchItems && (
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          {searchItems.map((item) => (
            <MenuItem
              key={item.searchKey}
              onClick={() => {
                setSearchKey(item.searchKey);
                handleClose();
              }}
            >
              {item.label}
            </MenuItem>
          ))}
        </Menu>
      )}
      <TextField
        label={label}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            if (searchKey) {
              onSearch?.({ searchKey, searchValue });
            } else {
              onSearch?.({ searchKey: '', searchValue });
            }
          }
        }}
        placeholder={label ?? '검색어를 입력하세요.'}
        css={{ 'width': '340px', '& .MuiOutlinedInput-root': { borderRadius: '16px', paddingLeft: '4px' } }}
      />
    </Stack>
  );
}
