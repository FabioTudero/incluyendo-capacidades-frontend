import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import api from '../lib/api'

function formatPrice(price) {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(price)
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('es-ES')
}

export default function Invoice() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [invoice, setInvoice] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    api(`/invoices/${id}`).then((data) => {
      setInvoice(data)
      setLoading(false)
    })
  }, [id])

  if (loading) {
    return (
      <div className="w-full">
        <button className="inline-flex items-center gap-1.5 border-none bg-transparent text-text-muted text-[13px] font-semibold p-0 mb-4.5 cursor-pointer hover:text-accent" type="button" onClick={() => navigate('/facturas')}>
          <BackIcon className="w-3.5 h-3.5" /> Volver a facturas
        </button>
        <p className="text-text-muted">Cargando factura…</p>
      </div>
    )
  }

  if (!invoice) {
    return (
      <div className="w-full">
        <button className="inline-flex items-center gap-1.5 border-none bg-transparent text-text-muted text-[13px] font-semibold p-0 mb-4.5 cursor-pointer hover:text-accent" type="button" onClick={() => navigate('/facturas')}>
          <BackIcon className="w-3.5 h-3.5" /> Volver a facturas
        </button>
        <p className="text-text-muted">No se ha encontrado ninguna factura con ese identificador.</p>
      </div>
    )
  }

  return (
    <div className="w-full">
      <button className="inline-flex items-center gap-1.5 border-none bg-transparent text-text-muted text-[13px] font-semibold p-0 mb-4.5 cursor-pointer hover:text-accent" type="button" onClick={() => navigate('/facturas')}>
        <BackIcon className="w-3.5 h-3.5" /> Volver a facturas
      </button>

      <div className="mb-5.5">
        <h1 className="text-[22px]">Factura #{invoice.id}</h1>
        <p className="text-text-muted mt-1.5 text-sm leading-normal">
          {invoice.client.name} · {formatDate(invoice.date)}
        </p>
      </div>

      <div className="bg-surface border border-border rounded-[14px] shadow-card p-5.5">
        <h2 className="text-[15px] mb-3.5">Datos de la factura</h2>
        <dl className="grid grid-cols-2 gap-4.5 m-0 max-[600px]:grid-cols-1">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.4px] text-text-muted mb-1">Cliente</dt>
            <dd className="m-0 text-sm text-text-h">{invoice.client.name}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.4px] text-text-muted mb-1">Fecha</dt>
            <dd className="m-0 text-sm text-text-h">{formatDate(invoice.date)}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.4px] text-text-muted mb-1">Horas</dt>
            <dd className="m-0 text-sm text-text-h">{invoice.total_hours}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.4px] text-text-muted mb-1">Total</dt>
            <dd className="m-0 text-sm text-text-h font-semibold">{formatPrice(invoice.total)}</dd>
          </div>
        </dl>
      </div>

      <div className="bg-surface border border-border rounded-[14px] shadow-card p-5.5 mt-4.5">
        <h2 className="text-[15px] mb-3.5">Servicios facturados</h2>
        <table className="w-full border-collapse text-sm max-[560px]:block">
          <thead className="max-[560px]:hidden">
            <tr>
              <th className="text-left text-xs font-semibold uppercase tracking-[0.4px] text-text-muted py-2.5 px-3 border-b border-border">Servicio</th>
              <th className="text-left text-xs font-semibold uppercase tracking-[0.4px] text-text-muted py-2.5 px-3 border-b border-border">Horas</th>
              <th className="text-left text-xs font-semibold uppercase tracking-[0.4px] text-text-muted py-2.5 px-3 border-b border-border">Precio</th>
            </tr>
          </thead>
          <tbody className="max-[560px]:block [&>tr:last-child>td]:border-b-0">
            {invoice.lines.map((line) => (
              <tr
                key={line.id}
                className="max-[560px]:block max-[560px]:w-full max-[560px]:border-b max-[560px]:border-border max-[560px]:py-2.5 max-[560px]:px-1 max-[560px]:last:border-b-0"
              >
                <td className="border-b border-border py-3.5 px-3 text-text align-middle max-[560px]:block max-[560px]:w-full max-[560px]:border-b-0 max-[560px]:py-0.75 max-[560px]:px-0" data-label="Servicio">
                  <div className="font-semibold text-text-h">{line.service.name}</div>
                </td>
                <td className="border-b border-border py-3.5 px-3 text-text align-middle max-[560px]:block max-[560px]:w-full max-[560px]:border-b-0 max-[560px]:py-0.75 max-[560px]:px-0" data-label="Horas">
                  <div className="text-text-muted">{line.hours}</div>
                </td>
                <td className="border-b border-border py-3.5 px-3 text-text align-middle max-[560px]:block max-[560px]:w-full max-[560px]:border-b-0 max-[560px]:py-0.75 max-[560px]:px-0" data-label="Precio">
                  <div className="text-text-muted">{formatPrice(line.price)}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end gap-4 text-sm font-semibold text-text-h mt-3.5">
          <span>Horas: {invoice.total_hours}</span>
          <span>Total: {formatPrice(invoice.total)}</span>
        </div>
      </div>
    </div>
  )
}

function BackIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
