import { Outlet } from 'react-router-dom'
import Header from '../components/organisms/Header'
import { ADMIN_BASE_PATH, adminHeaderLinks } from '../data/adminConfig'

function AdminLayout() {
  return (
    <>
      <Header
        logoText="Mil Sabores · Admin"
        logoHref={ADMIN_BASE_PATH}
        links={adminHeaderLinks}
      />

      <main>
        <Outlet />
      </main>
    </>
  )
}

export default AdminLayout
