import { Navigate, Route, Routes } from 'react-router-dom'
import AboutPage from '../pages/client/AboutPage'
import BlogPage from '../pages/client/BlogPage'
import BlogStoryPage from '../pages/client/BlogStoryPage'
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
        <Route path="nosotros" element={<AboutPage />} />
        <Route path="productos" element={<ComingSoon title="Productos" />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="blog/:storyId" element={<BlogStoryPage />} />
        <Route path="contacto" element={<ContactPage />} />
        <Route path="login" element={<Login />} />
        <Route path="registro" element={<Register />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default ClientRoutes
