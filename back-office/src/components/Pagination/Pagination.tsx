import {
  Stack,
  Pagination as MuiPagination,
  Typography,
  Select,
  MenuItem,
  type SelectChangeEvent,
} from '@mui/material';
import { useEffect, useMemo } from 'react';

export function Pagination(props: {
  page: number;
  limit: number;
  totalCount?: number;
  onLimitChange: (limit: number) => void;
  onChange: (page: number) => void;
  limitOptions?: number[];
}) {
  // 1. destructure props
  const { page = 1, limit, totalCount, onChange, onLimitChange, limitOptions = [10, 25, 50, 100] } = props;

  // 2. lib hooks
  // 3. state hooks
  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  const count = useMemo(() => {
    if (totalCount !== undefined) {
      return Math.ceil(totalCount / limit);
    }
    return 1;
  }, [totalCount, limit]);

  // 7. effect hooks
  useEffect(() => {
    onChange(1);
  }, [limit, onChange]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  // 8. handlers
  const handleLimitChange = (event: SelectChangeEvent<number>) => {
    onLimitChange(Number(event.target.value));
  };
  return (
    <Stack spacing={4} css={{ width: '100%', alignItems: 'center' }}>
      <MuiPagination size="large" page={page} count={count} onChange={(_, page) => onChange(page)} />
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography sx={{ color: 'text.secondary', fontSize: '14px' }}>Rows per page:</Typography>
        <Select value={limit} onChange={handleLimitChange} size="small">
          {limitOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </Stack>
    </Stack>
  );
}
