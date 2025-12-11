import { IconButton, Menu, Stack, MenuItem, TextField, Typography } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useState } from 'react';

export function ListViewHeader(props: {
  title: string;
  searchItems?: { searchKey: string; label: string }[];
  onSearch?: (search: { searchKey: string; searchValue: string }) => void;
  addButton?: React.ReactNode;
}) {
  // 1. destructure props
  const { title, searchItems, onSearch, addButton } = props;

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
    <Stack direction="column" spacing={2} css={{ width: '100%' }}>
      {/* 섹션 타이틀 */}
      {title && (
        <Typography variant="h4" fontWeight={500}>
          {title}
        </Typography>
      )}

      {/* 검색 및 버튼 영역 */}
      <Stack
        direction="row"
        spacing={2}
        css={{
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        {/* 왼쪽: 검색 영역 */}
        {searchItems && (
          <Stack
            direction="row"
            spacing={2}
            css={{
              alignItems: 'center',
            }}
          >
            {/* 검색 아이콘 및 검색 옵션 메뉴 */}
            {searchItems.length > 1 && (
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

            {/* 검색 영역 */}
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
              placeholder="검색어를 입력하세요."
              css={{ 'width': '340px', '& .MuiOutlinedInput-root': { borderRadius: '16px', paddingLeft: '4px' } }}
            />
          </Stack>
        )}

        {/* 오른쪽 끝: 추가 버튼 */}
        <Stack direction="row" spacing={2} css={{ marginLeft: 'auto' }}>
          {addButton}
        </Stack>
      </Stack>
    </Stack>
  );
}
