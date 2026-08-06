import { useNavigate } from 'react-router'

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

export default function ClientInvoicesTable({ invoices }) {
  const navigate = useNavigate()

  return (
    <table className="w-full border-collapse text-sm max-[560px]:block">
      <thead className="max-[560px]:hidden">
        <tr>
          <th className="text-left text-xs font-semibold uppercase tracking-[0.4px] text-text-muted py-2.5 px-3 border-b border-border">Fecha</th>
          <th className="text-left text-xs font-semibold uppercase tracking-[0.4px] text-text-muted py-2.5 px-3 border-b border-border">Total</th>
        </tr>
      </thead>
      <tbody className="max-[560px]:block [&>tr:last-child>td]:border-b-0">
        {invoices.map((invoice) => (
          <tr
            key={invoice.id}
            className="cursor-pointer hover:bg-accent-bg max-[560px]:block max-[560px]:w-full max-[560px]:border-b max-[560px]:border-border max-[560px]:py-2.5 max-[560px]:px-1 max-[560px]:last:border-b-0"
            onClick={() => navigate(`/facturas/${invoice.id}`)}
          >
            <td className={tdClass} data-label="Fecha">
              <div className="font-semibold text-text-h">{formatDate(invoice.date)}</div>
            </td>
            <td className={tdClass} data-label="Total">
              <div className="text-text-muted">{formatPrice(invoice.total)}</div>
            </td>
          </tr>
        ))}
        {invoices.length === 0 && (
          <tr className="max-[560px]:block">
            <td colSpan={2} className="text-center text-text-muted py-8 px-3 max-[560px]:block max-[560px]:w-full">
              Este cliente todavía no tiene facturas.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}
