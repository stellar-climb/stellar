import { Breadcrumbs as MuiBreadcrumbs, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link } from 'react-router-dom';

export function BreadCrumb(props: { items: { label: string; path?: string }[] }) {
  // 1. destructure props
  const { items } = props;

  // 2. lib hooks
  // 3. state hooks
  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  // 9. render
  return (
    <MuiBreadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      css={{ '& .MuiBreadcrumbs-separator': { margin: '0 4px' } }}
    >
      {items.map((item, index) =>
        index !== items.length - 1 ? (
          <Link key={item.path} to={item.path ?? ''} css={{ textDecoration: 'none' }}>
            <Typography
              css={{
                ...(index !== items.length - 1
                  ? { textDecoration: 'underline', color: '#015dee' }
                  : { textDecoration: 'none', color: 'gray' }),
              }}
            >
              {item.label}
            </Typography>
          </Link>
        ) : (
          <Typography key={item.path} css={{ textDecoration: 'none', color: 'gray' }}>
            {item.label}
          </Typography>
        )
      )}
    </MuiBreadcrumbs>
  );
}
