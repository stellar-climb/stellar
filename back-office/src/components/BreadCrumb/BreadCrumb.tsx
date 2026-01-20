import { Breadcrumbs as MuiBreadcrumbs, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link, useLocation } from 'react-router-dom';

export function BreadCrumb(props: { items: { label: string; path: string }[] }) {
  // 1. destructure props
  const { items } = props;

  // 2. lib hooks
  const location = useLocation();

  // 3. state hooks
  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  const isCurrentPath = (path: string) => location.pathname === path;

  // 7. effect hooks
  // 8. handlers
  // 9. render
  return (
    <MuiBreadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      css={{ '& .MuiBreadcrumbs-separator': { margin: '0 4px' } }}
    >
      {items.map((item) => (
        <Link key={item.path} to={item.path} css={{ textDecoration: 'none' }}>
          <Typography css={{ color: isCurrentPath(item.path) ? '#015dee' : 'gray' }}>{item.label}</Typography>
        </Link>
      ))}
    </MuiBreadcrumbs>
  );
}
