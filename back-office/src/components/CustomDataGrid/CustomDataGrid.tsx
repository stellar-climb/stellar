import { forwardRef } from 'react';
import { DataGrid as MuiDataGrid, type DataGridProps, type GridColDef } from '@mui/x-data-grid';

export type CustomDataGridProps = Omit<DataGridProps, 'rows' | 'columns' | 'loading'> & {
  rows: DataGridProps['rows'];
  columns: GridColDef[];
  loading?: boolean;
  headerClassName?: string;
};

export const CustomDataGrid = forwardRef<HTMLDivElement, CustomDataGridProps>(
  ({ rows, columns, loading = false, headerClassName = 'super-app-theme--header', sx, ...props }, ref) => {
    // headerClassName을 모든 컬럼에 자동 적용
    const columnsWithHeaderClass = columns.map((col) => ({
      ...col,
      headerClassName: col.headerClassName || headerClassName,
    }));

    return (
      <MuiDataGrid
        ref={ref}
        rows={rows}
        columns={columnsWithHeaderClass}
        loading={loading}
        hideFooterPagination
        hideFooter
        showCellVerticalBorder
        disableColumnMenu
        disableColumnSorting
        sx={{
          '& .super-app-theme--header': {
            backgroundColor: 'rgba(225, 230, 235, 0.55)',
          },
          ...sx,
        }}
        {...props}
      />
    );
  }
);

CustomDataGrid.displayName = 'CustomDataGrid';
