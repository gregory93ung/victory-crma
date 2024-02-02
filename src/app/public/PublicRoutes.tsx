import { Route, Routes, Navigate } from 'react-router-dom'
import { routes } from '@/config/routes'
import { Login } from '@/app/public/Login'

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path={routes.login.path} element={<Login />} />
      <Route path='*' element={<Navigate to={routes.login.path} />} />
    </Routes>
  )
}
