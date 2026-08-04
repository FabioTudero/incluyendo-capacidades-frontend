import { useNavigate } from 'react-router'
import { useEffect, useMemo, useState } from 'react'
import api from '../lib/api'

const tdClass =
  'border-b border-border py-3.5 px-3 text-text align-middle ' +
  'max-[560px]:block max-[560px]:w-full max-[560px]:border-b-0 max-[560px]:py-0.75 max-[560px]:px-0 ' +
  'max-[560px]:before:content-[attr(data-label)] max-[560px]:before:block max-[560px]:before:text-[11px] ' +
  'max-[560px]:before:font-semibold max-[560px]:before:uppercase max-[560px]:before:tracking-[0.4px] ' +
  'max-[560px]:before:text-text-muted max-[560px]:before:mb-0.5'

function formatPrice(price) {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(price)
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('es-ES')
}

export default function Home() {
  const navigate = useNavigate()
  const [clients, setClients] = useState([])
  const [services, setServices] = useState([])
  const [invoices, setInvoices] = useState([])

  useEffect(() => {
    api('/clients').then(setClients)
    api('/services').then(setServices)
    api('/invoices').then(setInvoices)
  }, [])

  const totalBilled = useMemo(() => invoices.reduce((sum, i) => sum + i.total, 0), [invoices])

  const recentInvoices = useMemo(
    () =>
      [...invoices]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5),
    [invoices],
  )

  const stats = [
    { label: 'Clientes', value: clients.length, icon: UsersIcon, to: '/clientes' },
    { label: 'Servicios', value: services.length, icon: BriefcaseIcon, to: '/servicios' },
    { label: 'Facturas', value: invoices.length, icon: InvoiceIcon, to: '/facturas' },
  ]

  return (
    <div className="w-full">
      <div className="mb-5.5">
        <h1 className="text-[26px] max-[720px]:text-[22px]">Inicio</h1>
        <p className="text-sm text-text-muted mt-1">Resumen general de tu actividad.</p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6 max-[900px]:grid-cols-2 max-[480px]:grid-cols-1">
        {stats.map(({ label, value, icon: Icon, to }) => (
          <button
            key={label}
            type="button"
            onClick={() => navigate(to)}
            className="text-left bg-surface border border-border rounded-[14px] shadow-card p-4.5 flex items-center gap-3.5 cursor-pointer transition-[transform,box-shadow] duration-150 hover:-translate-y-px hover:shadow-[0_10px_20px_-6px_rgba(37,99,235,0.25)]"
          >
            <div className="w-10.5 h-10.5 shrink-0 rounded-[11px] bg-accent-gradient text-white flex items-center justify-center">
              <Icon className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-xl font-semibold text-text-h truncate">{value}</div>
              <div className="text-xs font-medium text-text-muted uppercase tracking-[0.4px]">{label}</div>
            </div>
          </button>
        ))}
      </div>

      <div className="bg-surface border border-border rounded-[14px] shadow-card p-4.5 max-[720px]:p-3.5 max-[720px]:rounded-xl">
        <div className="flex items-center justify-between gap-4 mb-4">
          <h2 className="text-base font-semibold text-text-h m-0">Facturas recientes</h2>
          <button
            type="button"
            onClick={() => navigate('/facturas')}
            className="text-sm font-semibold text-accent bg-transparent border-none cursor-pointer hover:underline"
          >
            Ver todas
          </button>
        </div>

        <table className="w-full border-collapse text-sm max-[560px]:block">
          <thead className="max-[560px]:hidden">
            <tr>
              <th className="text-left text-xs font-semibold uppercase tracking-[0.4px] text-text-muted py-2.5 px-3 border-b border-border">Cliente</th>
              <th className="text-left text-xs font-semibold uppercase tracking-[0.4px] text-text-muted py-2.5 px-3 border-b border-border">Fecha</th>
              <th className="text-left text-xs font-semibold uppercase tracking-[0.4px] text-text-muted py-2.5 px-3 border-b border-border">Total</th>
            </tr>
          </thead>
          <tbody className="max-[560px]:block [&>tr:last-child>td]:border-b-0">
            {recentInvoices.map((invoice) => (
              <tr
                key={invoice.id}
                className="cursor-pointer hover:bg-accent-bg max-[560px]:block max-[560px]:w-full max-[560px]:border-b max-[560px]:border-border max-[560px]:py-2.5 max-[560px]:px-1 max-[560px]:last:border-b-0"
                onClick={() => navigate(`/facturas/${invoice.id}`)}
              >
                <td className={tdClass} data-label="Cliente">
                  <div className="font-semibold text-text-h">{invoice.client.name}</div>
                </td>
                <td className={tdClass} data-label="Fecha">
                  <div className="text-text-muted">{formatDate(invoice.date)}</div>
                </td>
                <td className={tdClass} data-label="Total">
                  <div className="text-text-muted">{formatPrice(invoice.total)}</div>
                </td>
              </tr>
            ))}
            {recentInvoices.length === 0 && (
              <tr className="max-[560px]:block">
                <td colSpan={3} className="text-center text-text-muted py-8 px-3 max-[560px]:block max-[560px]:w-full">
                  Todavía no hay facturas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function UsersIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M16 11a4 4 0 1 0-4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M8 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M2 20c.5-3.5 3-5.5 6-5.5s5.5 2 6 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M14 14.7c2.6.4 4.6 2.3 5 5.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function BriefcaseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="7" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 12h18" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  )
}

function InvoiceIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9 8h6M9 12h6M9 16h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function CoinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7v10M9.5 9.3c0-1.1 1.1-1.8 2.5-1.8s2.5.7 2.5 1.6c0 2.2-5 1.1-5 3.3 0 .9 1.1 1.6 2.5 1.6s2.5-.7 2.5-1.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}
