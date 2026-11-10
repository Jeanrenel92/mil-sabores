import { Route, Routes } from 'react-router-dom'
import { ADMIN_BASE_PATH } from './data/adminConfig'
import AdminRoutes from './routes/AdminRoutes'
import ClientRoutes from './routes/ClientRoutes'

function App() {
  return (
    <Routes>
      <Route path={`${ADMIN_BASE_PATH}/*`} element={<AdminRoutes />} />
      <Route path="/*" element={<ClientRoutes />} />
    </Routes>
  )
}

export default App
