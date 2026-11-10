import { NavLink, Outlet } from 'react-router-dom'
import Header from '../components/organisms/Header'
import { ADMIN_BASE_PATH, adminHeaderLinks } from '../data/adminConfig'
import '../styles/admin/adminLayout.css'

function AdminLayout() {
  return (
    <>
      <Header
        logoText="Mil Sabores · Admin"
        logoHref={ADMIN_BASE_PATH}
        links={[]}
        actions={
          <a
            className="adminDashboard__preview"
            href="/"
            target="_blank"
            rel="noreferrer"
          >
            <span>Ver tienda</span>
            <span aria-hidden="true">↗</span>
          </a>
        }
      />

      <div className="adminDashboard">
        <aside className="adminDashboard__sidebar">
          <div className="adminDashboard__heading">
            <span className="adminDashboard__eyebrow">MENÚ PRINCIPAL</span>
          </div>

          <nav className="adminDashboard__nav" aria-label="Administración">
            {adminHeaderLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  `adminDashboard__link${isActive ? ' adminDashboard__link--active' : ''}`
                }
              >
                <span className="adminDashboard__linkIcon" aria-hidden="true">
                  <svg viewBox="0 0 20 20" fill="none">
                    <rect
                      x="2.5"
                      y="2.5"
                      width="6"
                      height="6"
                      rx="1.2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <rect
                      x="11.5"
                      y="2.5"
                      width="6"
                      height="6"
                      rx="1.2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <rect
                      x="2.5"
                      y="11.5"
                      width="6"
                      height="6"
                      rx="1.2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <rect
                      x="11.5"
                      y="11.5"
                      width="6"
                      height="6"
                      rx="1.2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </span>
                <span>{link.label}</span>
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="adminDashboard__main">
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default AdminLayout
