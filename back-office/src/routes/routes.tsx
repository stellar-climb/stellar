import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useUser } from '@libs';

function AuthorizedRoute() {
  // 1. destructure props
  // 2. lib hooks
  const [user] = useUser();

  // 3. state hooks
  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  return user ? <Navigate to="/" /> : <Outlet />;
}

function UnauthorizedRoute() {
  // 1. destructure props
  // 2. lib hooks
  const [user] = useUser();

  // 3. state hooks
  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  return user ? <Navigate to="/" /> : <Outlet />;
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthorizedRoute />}>
          <Route path="/" element={<div>Home</div>} />
        </Route>

        <Route element={<UnauthorizedRoute />}>
          <Route path="/login" element={<div>fdasfsafdsafdsafdsafdas</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
