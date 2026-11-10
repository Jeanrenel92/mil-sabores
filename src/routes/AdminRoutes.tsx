import { Navigate, Route, Routes } from 'react-router-dom'
import UserAdministration from '../components/UserAdministration'
import { ADMIN_BASE_PATH } from '../data/adminConfig'
import AdminDashboardPage from '../pages/admin/AdminDashboardPage'
import CatalogAdminPage from '../pages/admin/CatalogAdminPage'
import AdminLayout from '../templates/AdminLayout'

function AdminRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<Navigate to="resumen" replace />} />
        <Route path="resumen" element={<AdminDashboardPage />} />
        <Route path="catalogo" element={<CatalogAdminPage />} />
        <Route path="usuarios" element={<UserAdministration />} />
        <Route
          path="*"
          element={<Navigate to={`${ADMIN_BASE_PATH}/resumen`} replace />}
        />
      </Route>
    </Routes>
  )
}

export default AdminRoutes
