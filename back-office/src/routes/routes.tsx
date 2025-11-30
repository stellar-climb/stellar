import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './base-layout';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<div>Home</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
