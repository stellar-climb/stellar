import { Stack, Chip, Box } from '@mui/material';
import {
  BreadCrumb,
  ListViewHeader,
  DialogButton,
  CustomDataGrid,
  type GridColDef,
  Pagination,
  BoxLink,
} from '@components';
import { gradients, useQuery, format } from '@libs';
import { useState } from 'react';
import { seriesRepository } from '@repositories';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { type SeriesModel, getSeriesMakingTypeLabel, getSeriesStatus } from '@models';

export function SeriesScreen() {
  // 1. destructure props
  // 2. lib hooks
  // 3. state hooks
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState<{ key: string; value: string }>();

  // 4. query hooks
  const { data: seriesList, loading } = useQuery(seriesRepository.list, {
    variables: { page, limit, filter: search && search.value ? { search: search.key, searchValue: search.value } : {} },
  });

  // 5. form hooks
  // 6. calculate values
  const columns: GridColDef<SeriesModel[]>[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 80,
      renderCell: ({ value }) => <BoxLink to={`/contents/series/${value}`}>{value}</BoxLink>,
    },
    { field: 'name', headerName: '시리즈명', width: 120 },
    { field: 'writer', headerName: '작가', width: 120 },
    { field: 'illustrator', headerName: '그림작가', width: 120 },
    { field: 'publisher', headerName: '발매사', width: 120 },
    {
      field: 'status',
      headerName: '상태',
      width: 100,
      renderCell: ({ value }) => getSeriesStatus(value),
    },
    {
      field: 'isAdultContent',
      headerName: '성인용 여부',
      width: 120,
      renderCell: ({ value }) =>
        value ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              height: '100%',
            }}
          >
            <CheckCircleIcon color="success" />
          </Box>
        ) : (
          ''
        ),
    },
    {
      field: 'isOpen',
      headerName: '공개 여부',
      width: 120,
      renderCell: ({ value }) => <Chip label={value ? '공개' : '비공개'} color={value ? 'success' : 'error'} />,
    },
    {
      field: 'publishOn',
      headerName: '발매일',
      width: 120,
      valueFormatter: (value) => (value ? format(value, 'YYYY-MM-DD HH:mm:ss') : '-'),
    },
    {
      field: 'completedOn',
      headerName: '완결일',
      width: 120,
      valueFormatter: (value) => (value ? format(value, 'YYYY-MM-DD HH:mm:ss') : '-'),
    },
    {
      field: 'makingType',
      headerName: '제작 유형',
      width: 120,
      valueFormatter: (value) => getSeriesMakingTypeLabel(value),
    },
    {
      field: 'createdAt',
      headerName: '생성일',
      width: 120,
      flex: 1,
      valueFormatter: (value) => format(value, 'YYYY-MM-DD HH:mm:ss'),
    },
  ];
  const rows = seriesList?.items ?? [];
  const total = seriesList?.total ?? 0;

  // 7. effect hooks
  // 8. handlers
  // 9. render
  return (
    <Stack direction="column" spacing={2}>
      <BreadCrumb items={[{ label: '시리즈', path: '/contents/series' }]} />
      <Stack direction="row" spacing={2} css={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <ListViewHeader
          title="시리즈 목록 조회"
          searchItems={[
            { searchKey: 'name', label: '시리즈명' },
            { searchKey: 'writer', label: '작가' },
            { searchKey: 'illustrator', label: '그림작가' },
            { searchKey: 'publisher', label: '발매사' },
          ]}
          onSearch={({ searchKey, searchValue }) => {
            setPage(1);
            setSearch({ key: searchKey, value: searchValue });
          }}
        />
      </Stack>
      <CustomDataGrid loading={loading} columns={columns} rows={rows} />
      <Pagination totalCount={total} page={page} limit={limit} onChange={setPage} onLimitChange={setLimit} />
    </Stack>
  );
}
