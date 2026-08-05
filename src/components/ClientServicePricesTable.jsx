import { TrashIcon, EditIcon } from './Icons'

const tdClass =
  'border-b border-border py-3.5 px-3 text-text align-middle max-[560px]:block max-[560px]:w-full max-[560px]:border-b-0 max-[560px]:py-0.75 max-[560px]:px-0'

function formatPrice(price) {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(price)
}

export default function ClientServicePricesTable({ services, onEdit, onDelete }) {
  return (
    <table className="w-full border-collapse text-sm max-[560px]:block">
      <thead className="max-[560px]:hidden">
        <tr>
          <th className="text-left text-xs font-semibold uppercase tracking-[0.4px] text-text-muted py-2.5 px-3 border-b border-border">Servicio</th>
          <th className="text-left text-xs font-semibold uppercase tracking-[0.4px] text-text-muted py-2.5 px-3 border-b border-border">Precio</th>
          <th className="text-right text-xs font-semibold uppercase tracking-[0.4px] text-text-muted py-2.5 px-3 border-b border-border">Acciones</th>
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
            <td className={tdClass} data-label="Acciones">
              <div className="flex items-center gap-1.5 max-[560px]:justify-start justify-end">
                <button
                  className="inline-flex items-center justify-center w-7.5 h-7.5 rounded-lg cursor-pointer border-none bg-transparent text-text-muted hover:bg-neutral-bg hover:text-text-h"
                  type="button"
                  onClick={() => onEdit(service)}
                  aria-label={`Editar precio de ${service.name}`}
                >
                  <EditIcon className="w-3.5 h-3.5" />
                </button>
                <button
                  className="inline-flex items-center justify-center w-7.5 h-7.5 rounded-lg cursor-pointer border-none bg-transparent text-text-muted hover:bg-danger-bg hover:text-danger"
                  type="button"
                  onClick={() => onDelete(service)}
                  aria-label={`Eliminar precio de ${service.name}`}
                >
                  <TrashIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            </td>
          </tr>
        ))}
        {services.length === 0 && (
          <tr className="max-[560px]:block">
            <td colSpan={3} className="text-center text-text-muted py-8 px-3 max-[560px]:block max-[560px]:w-full">
              Este cliente todavía no tiene precios asignados a servicios.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}
