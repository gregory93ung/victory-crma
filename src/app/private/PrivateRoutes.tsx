import { lazy } from 'react';
import withSuspense from '@/hocs/withSuspense';
import { Navigate, Route, Routes } from 'react-router-dom';

import { RootLayout } from '@/layout/RootLayout';

import { routes as r } from '@/config/routes';

const Settings = withSuspense(lazy(() => import('./Settings')));
const ClientsPage = withSuspense(lazy(() => import('./ClientsPage')));
const ClientPage = withSuspense(lazy(() => import('./ClientPage')));

export const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<RootLayout />}>
        <Route path={r.home.path} element={<Navigate to={r.clients.path} />} />
        <Route path={r.clients.path}>
          <Route index element={<ClientsPage />} />
          <Route path={r.clients.createPath()} element={<ClientPage />} />
        </Route>
        <Route path={r.settings.path} element={<Settings />} />
        <Route path='*' element={<Navigate to={r.home.path} />} />
      </Route>
    </Routes>
  );
};
