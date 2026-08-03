const tdClass =
  'border-b border-border py-3.5 px-3 text-text align-middle max-[560px]:block max-[560px]:w-full max-[560px]:border-b-0 max-[560px]:py-0.75 max-[560px]:px-0'

function formatPrice(price) {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(price)
}

export default function ClientServicePricesTable({ services }) {
  return (
    <table className="w-full border-collapse text-sm max-[560px]:block">
      <thead className="max-[560px]:hidden">
        <tr>
          <th className="text-left text-xs font-semibold uppercase tracking-[0.4px] text-text-muted py-2.5 px-3 border-b border-border">Servicio</th>
          <th className="text-left text-xs font-semibold uppercase tracking-[0.4px] text-text-muted py-2.5 px-3 border-b border-border">Precio</th>
        </tr>
      </thead>
      <tbody className="max-[560px]:block [&>tr:last-child>td]:border-b-0">
        {services.map((service) => (
          <tr
            key={service.id}
            className="max-[560px]:block max-[560px]:w-full max-[560px]:border-b max-[560px]:border-border max-[560px]:py-2.5 max-[560px]:px-1 max-[560px]:last:border-b-0"
          >
            <td className={tdClass} data-label="Servicio">
              <div className="font-semibold text-text-h">{service.name}</div>
            </td>
            <td className={tdClass} data-label="Precio">
              <div className="text-text-muted">{formatPrice(service.pivot.price)}</div>
            </td>
          </tr>
        ))}
        {services.length === 0 && (
          <tr className="max-[560px]:block">
            <td colSpan={2} className="text-center text-text-muted py-8 px-3 max-[560px]:block max-[560px]:w-full">
              Este cliente todavía no tiene precios asignados a servicios.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}
