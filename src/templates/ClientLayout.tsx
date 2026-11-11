import { Outlet } from 'react-router-dom'
import Footer from '../components/organisms/Footer'
import Header from '../components/organisms/Header'
import {
  clientHeaderLinks,
  footerColumns,
  footerContactLines,
} from '../data/siteConfig'
import CartPreview from '../components/organisms/CartPreview'
import { CartProvider } from '../context/CartProvider'

function ClientLayout() {
  return (
    <CartProvider>
      <Header
        logoText="Mil Sabores"
        links={clientHeaderLinks}
      />
      <CartPreview />

      <main>
        <Outlet />
      </main>

      <Footer contactLines={footerContactLines} columns={footerColumns} />
    </CartProvider>
  )
}

export default ClientLayout
