import { Outlet, useNavigate } from 'react-router-dom'
import Button from '../components/atoms/Button'
import Footer from '../components/organisms/Footer'
import Header from '../components/organisms/Header'
import {
  clientHeaderLinks,
  footerColumns,
  footerContactLines,
} from '../data/siteConfig'

function ClientLayout() {
  const navigate = useNavigate()

  return (
    <>
      <Header
        logoText="Mil Sabores"
        links={clientHeaderLinks}
        actions={
          <div className="header__actions">
            <Button variant="pink" onClick={() => navigate('/login')}>
              Iniciar sesión
            </Button>
            <Button onClick={() => navigate('/registro')}>Registrarse</Button>
          </div>
        }
      />

      <main>
        <Outlet />
      </main>

      <Footer contactLines={footerContactLines} columns={footerColumns} />
    </>
  )
}

export default ClientLayout
