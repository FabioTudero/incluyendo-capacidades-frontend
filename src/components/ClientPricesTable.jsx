import { useMemo, useState } from 'react'
import { SearchIcon, EditIcon, TrashIcon } from './Icons'

const tdClass =
  'border-b border-border py-3.5 px-3 text-text align-middle ' +
  'max-[560px]:block max-[560px]:w-full max-[560px]:border-b-0 max-[560px]:py-0.75 max-[560px]:px-0 ' +
  'max-[560px]:before:content-[attr(data-label)] max-[560px]:before:block max-[560px]:before:text-[11px] ' +
  'max-[560px]:before:font-semibold max-[560px]:before:uppercase max-[560px]:before:tracking-[0.4px] ' +
  'max-[560px]:before:text-text-muted max-[560px]:before:mb-0.5'

const PAGE_SIZE = 5

export default function ClientPricesTable({ clients, onEdit, onDelete }) {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return clients
    return clients.filter((c) => c.name.toLowerCase().includes(q))
  }, [clients, query])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  function handleQueryChange(value) {
    setQuery(value)
    setPage(1)
  }

  return (
    <div>
      <div className="relative mb-4">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
        <input
          type="text"
          className="w-full py-2.5 pr-3.5 pl-9.5 rounded-[9px] border border-border bg-bg text-sm text-text-h focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_var(--color-accent-bg)]"
          placeholder="Buscar por nombre"
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
        />
      </div>

      <table className="w-full border-collapse text-sm max-[560px]:block">
        <thead className="max-[560px]:hidden">
          <tr>
            <th className="text-left text-xs font-semibold uppercase tracking-[0.4px] text-text-muted py-2.5 px-3 border-b border-border">Cliente</th>
            <th className="text-left text-xs font-semibold uppercase tracking-[0.4px] text-text-muted py-2.5 px-3 border-b border-border">Precio</th>
            <th className="text-right text-xs font-semibold uppercase tracking-[0.4px] text-text-muted py-2.5 px-3 border-b border-border">Acciones</th>
          </tr>
        </thead>
        <tbody className="max-[560px]:block [&>tr:last-child>td]:border-b-0">
          {paged.map((client) => (
            <tr
              key={client.id}
              className="max-[560px]:block max-[560px]:w-full max-[560px]:border-b max-[560px]:border-border max-[560px]:py-2.5 max-[560px]:px-1 max-[560px]:last:border-b-0"
            >
              <td className={tdClass} data-label="Cliente">
                <div className="font-semibold text-text-h">{client.name}</div>
              </td>
              <td className={tdClass} data-label="Precio">
                <div className="text-text-muted">{formatPrice(client.pivot.price)}</div>
              </td>
              <td className={tdClass} data-label="Acciones">
                <div className="flex items-center gap-1.5 max-[560px]:justify-start justify-end">
                  <button
                    className="inline-flex items-center justify-center w-7.5 h-7.5 rounded-lg cursor-pointer border-none bg-transparent text-text-muted hover:bg-neutral-bg hover:text-text-h"
                    type="button"
                    onClick={() => onEdit(client)}
                    aria-label={`Editar precio de ${client.name}`}
                  >
                    <EditIcon className="w-3.5 h-3.5" />
                  </button>
                  <button
                    className="inline-flex items-center justify-center w-7.5 h-7.5 rounded-lg cursor-pointer border-none bg-transparent text-text-muted hover:bg-danger-bg hover:text-danger"
                    type="button"
                    onClick={() => onDelete(client)}
                    aria-label={`Eliminar precio de ${client.name}`}
                  >
                    <TrashIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr className="max-[560px]:block">
              <td colSpan={3} className="text-center text-text-muted py-8 px-3 max-[560px]:block max-[560px]:w-full">
                {clients.length === 0
                  ? 'Este servicio todavía no tiene precios asignados a clientes.'
                  : 'No se han encontrado clientes que coincidan con la búsqueda.'}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {filtered.length > 0 && (
        <div className="flex items-center justify-between gap-4 mt-3.5 text-[13px] text-text-muted max-[560px]:flex-col">
          <span>
            {filtered.length} cliente{filtered.length === 1 ? '' : 's'} de {clients.length}
          </span>
          <div className="flex items-center gap-2.5">
            <button
              className="inline-flex items-center justify-center w-7.5 h-7.5 rounded-lg cursor-pointer border border-border bg-surface text-text-muted disabled:cursor-not-allowed disabled:opacity-40 hover:not-disabled:bg-neutral-bg hover:not-disabled:text-text-h"
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              aria-label="Página anterior"
            >
              <ChevronLeftIcon className="w-3.5 h-3.5" />
            </button>
            <span>
              Página {currentPage} de {totalPages}
            </span>
            <button
              className="inline-flex items-center justify-center w-7.5 h-7.5 rounded-lg cursor-pointer border border-border bg-surface text-text-muted disabled:cursor-not-allowed disabled:opacity-40 hover:not-disabled:bg-neutral-bg hover:not-disabled:text-text-h"
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              aria-label="Página siguiente"
            >
              <ChevronRightIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function formatPrice(price) {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(price)
}

function ChevronLeftIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChevronRightIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
