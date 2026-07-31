import { Routes, Route, Navigate } from 'react-router'
import AppLayout from './layout/AppLayout'
import Clients from './pages/Clients'
import PlaceholderPage from './pages/PlaceholderPage'

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate to="/clientes" replace />} />
        <Route path="clientes" element={<Clients />} />
        <Route
          path="trabajos"
          element={<PlaceholderPage title="Trabajos" description="Próximamente." />}
        />
        <Route
          path="facturas"
          element={<PlaceholderPage title="Facturas" description="Próximamente." />}
        />
        <Route
          path="ajustes"
          element={<PlaceholderPage title="Ajustes" description="Próximamente." />}
        />
      </Route>
    </Routes>
  )
}

export default App
