import { Routes, Route, Navigate } from 'react-router'
import AppLayout from './layout/AppLayout'
import Clients from './pages/Clients'
import Client from './pages/Client'
import PlaceholderPage from './pages/PlaceholderPage'
import Services from './pages/Services'
import Service from './pages/Service'
import Invoices from './pages/Invoices'
import Invoice from './pages/Invoice'
import NewInvoice from './pages/NewInvoice'

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate to="/clientes" replace />} />
        <Route path="clientes" element={<Clients />} />
        <Route path="clientes/:id" element={<Client />} />
        <Route path="servicios" element={<Services />} />
        <Route path="servicios/:id" element={<Service />} />
        <Route path="facturas" element={<Invoices />} />
        <Route path="facturas/nueva" element={<NewInvoice />} />
        <Route path="facturas/:id" element={<Invoice />} />
      </Route>
    </Routes>
  )
}

export default App
