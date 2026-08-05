import { useNavigate } from 'react-router'
import { useEffect, useMemo, useState } from 'react'
import api from '../lib/api'
import { PlusIcon, SearchIcon } from '../components/Icons'

const selectClass =
  'py-2.5 px-3 rounded-[9px] border border-border bg-bg text-sm text-text-h focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_var(--color-accent-bg)]'

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

export default function Invoices() {
  const navigate = useNavigate()
  const [invoices, setInvoices] = useState([])
  const [services, setServices] = useState([])
  const [query, setQuery] = useState('')
  const [clientFilter, setClientFilter] = useState('')
  const [serviceFilter, setServiceFilter] = useState('')

  const clientOptions = useMemo(() => {
    const map = new Map()
    invoices.forEach((i) => map.set(i.client.id, i.client.name))
    return Array.from(map, ([id, name]) => ({ id, name })).sort((a, b) => a.name.localeCompare(b.name))
  }, [invoices])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return invoices.filter((i) => {
      if (q && !i.client.name.toLowerCase().includes(q)) return false
      if (clientFilter && String(i.client.id) !== clientFilter) return false
      if (serviceFilter && !i.lines.some((l) => String(l.service_id) === serviceFilter)) return false
      return true
    })
  }, [invoices, query, clientFilter, serviceFilter])

  useEffect(() => {
    api('/invoices').then(setInvoices)
    api('/services').then(setServices)
  }, [])

  return (
    <div className="w-full">
      <div className="flex items-start justify-between gap-6 mb-5.5 max-[720px]:flex-col max-[720px]:items-stretch max-[720px]:gap-4">
        <div>
          <h1 className="text-[26px] max-[720px]:text-[22px]">Facturas</h1>
        </div>
        <button
          className="inline-flex items-center gap-2 border-none bg-accent-gradient text-white font-semibold text-sm py-2.5 px-4.5 rounded-[9px] cursor-pointer shadow-[0_6px_16px_-6px_rgba(37,99,235,0.55)] whitespace-nowrap transition-[transform,box-shadow] duration-150 hover:-translate-y-px hover:shadow-[0_10px_20px_-6px_rgba(37,99,235,0.6)] max-[720px]:justify-center"
          type="button"
          onClick={() => navigate('/facturas/nueva')}
        >
          <PlusIcon className="w-4 h-4" />
          Nueva factura
        </button>
      </div>

      <div className="bg-surface border border-border rounded-[14px] shadow-card p-4.5 max-[720px]:p-3.5 max-[720px]:rounded-xl">
        <div className="flex items-center gap-3 mb-4 max-[720px]:flex-col max-[720px]:items-stretch">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              className="w-full py-2.5 pr-3.5 pl-9.5 rounded-[9px] border border-border bg-bg text-sm text-text-h focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_var(--color-accent-bg)]"
              placeholder="Buscar por cliente"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <select
            className={`${selectClass} max-[720px]:w-full`}
            value={clientFilter}
            onChange={(e) => setClientFilter(e.target.value)}
            aria-label="Filtrar por cliente"
          >
            <option value="">Todos los clientes</option>
            {clientOptions.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <select
            className={`${selectClass} max-[720px]:w-full`}
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            aria-label="Filtrar por servicio"
          >
            <option value="">Todos los servicios</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
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
            {filtered.map((invoice) => (
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
            {filtered.length === 0 && (
              <tr className="max-[560px]:block">
                <td colSpan={3} className="text-center text-text-muted py-8 px-3 max-[560px]:block max-[560px]:w-full">
                  No se han encontrado facturas que coincidan con la búsqueda.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="mt-3.5 text-[13px] text-text-muted max-[560px]:text-center">
          {filtered.length} factura{filtered.length === 1 ? '' : 's'} de {invoices.length}
        </div>
      </div>
    </div>
  )
}
