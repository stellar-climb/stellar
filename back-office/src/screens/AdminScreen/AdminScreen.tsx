import { Box } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

export function AdminScreen() {
  // 1. destructure props
  // 2. lib hooks
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100, flex: 1 },
    { field: 'name', headerName: 'Name', width: 100, flex: 1 },
    { field: 'email', headerName: 'Email', width: 100, flex: 1 },
    { field: 'phone', headerName: 'Phone', width: 100, flex: 1 },
    { field: 'address', headerName: 'Address', width: 100, flex: 1 },
  ];

  // 3. state hooks
  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  // 9. render
  return (
    <Box>
      <DataGrid rows={[]} columns={columns} hideFooterPagination />
    </Box>
  );
}
