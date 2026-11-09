import { Outlet } from 'react-router-dom'
import Footer from '../components/organisms/Footer'
import Header from '../components/organisms/Header'
import {
  clientHeaderLinks,
  footerColumns,
  footerContactLines,
} from '../data/siteConfig'

function ClientLayout() {
  return (
    <>
      <Header logoText="Mil Sabores" links={clientHeaderLinks} />

      <main>
        <Outlet />
      </main>

      <Footer contactLines={footerContactLines} columns={footerColumns} />
    </>
  )
}

export default ClientLayout
