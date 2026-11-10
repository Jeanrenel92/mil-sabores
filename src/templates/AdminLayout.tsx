import { NavLink, Outlet } from 'react-router-dom'
import Header from '../components/organisms/Header'
import {
  ADMIN_BASE_PATH,
  ADMIN_EMAIL,
  adminHeaderLinks,
} from '../data/adminConfig'
import '../styles/admin/adminLayout.css'

function AdminLayout() {
  return (
    <>
      <Header
        logoText="Mil Sabores · Admin"
        logoHref={ADMIN_BASE_PATH}
        links={[]}
        accountEmail={ADMIN_EMAIL}
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
                  {link.label === 'Vista tienda' ? (
                    <svg viewBox="0 0 20 20" fill="none">
                      <path
                        d="M3 8.5 4.5 3.8h11L17 8.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4 8.5v7.7h12V8.5M7 16.2v-4.8h6v4.8"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3 8.5a2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 2 0"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : link.label === 'Catálogo' ? (
                    <svg viewBox="0 0 20 20" fill="none">
                      <path
                        d="M3 6.5 10 3l7 3.5v8L10 18l-7-3.5v-8Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                      <path
                        d="m3.5 6.8 6.5 3.4 6.5-3.4M10 10.5V18"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
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
                  )}
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
