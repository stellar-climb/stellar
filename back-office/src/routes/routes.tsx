import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useUser } from '@libs';
import { HomeScreen, LoginScreen, GoogleLoginCallbackScreen } from '@screens';
import { Layout } from './base-layout';

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
  return user ? <Outlet /> : <Navigate to="/login" replace />;
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
  return !user ? <Outlet /> : <Navigate to="/" replace />;
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route element={<AuthorizedRoute />}> */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomeScreen />} />
        </Route>
        {/* </Route> */}

        {/* <Route element={<UnauthorizedRoute />}> */}
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/auth/google/callback" element={<GoogleLoginCallbackScreen />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}
