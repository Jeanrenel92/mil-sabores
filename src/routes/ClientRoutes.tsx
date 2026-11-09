import { Navigate, Route, Routes } from 'react-router-dom'
import BlogPage from '../pages/client/BlogPage'
import ComingSoon from '../pages/client/ComingSoon'
import ContactPage from '../pages/client/ContactPage'
import Home from '../pages/client/Home'
import Login from '../components/Login'
import Register from '../components/Register'
import ClientLayout from '../templates/ClientLayout'

function ClientRoutes() {
  return (
    <Routes>
      <Route element={<ClientLayout />}>
        <Route index element={<Home />} />
        <Route path="nosotros" element={<ComingSoon title="Sobre nosotros" />} />
        <Route path="productos" element={<ComingSoon title="Productos" />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="contacto" element={<ContactPage />} />
        <Route path="login" element={<Login />} />
        <Route path="registro" element={<Register />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default ClientRoutes
