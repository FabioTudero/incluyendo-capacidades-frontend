import { useEffect, useMemo, useState } from 'react'
import Modal from './Modal'
import api from '../lib/api'
import { SearchIcon } from './Icons'

const inputClass =
  'font-normal py-2.5 px-3 rounded-[9px] border border-border bg-bg text-sm text-text-h focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_var(--color-accent-bg)]'

export default function AddServicePriceModal({ clientId, excludeServiceIds, onClose, onSubmit }) {
  const [services, setServices] = useState([])
  const [serviceId, setServiceId] = useState('')
  const [query, setQuery] = useState('')
  const [showOptions, setShowOptions] = useState(false)
  const [price, setPrice] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    api('/services').then(setServices)
  }, [])

  const availableServices = services.filter((s) => !excludeServiceIds.includes(s.id))

  const filteredServices = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return availableServices
    return availableServices.filter((s) => s.name.toLowerCase().includes(q))
  }, [availableServices, query])

  function selectService(service) {
    setServiceId(service.id)
    setQuery(service.name)
    setShowOptions(false)
  }

  function handleQueryChange(value) {
    setQuery(value)
    setServiceId('')
    setShowOptions(true)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!serviceId) {
      setError('Selecciona un servicio.')
      return
    }
    if (!price || Number(price) < 0) {
      setError('Introduce un precio válido.')
      return
    }

    api(`/services/${serviceId}/clients/${clientId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ price: Number(price) }),
    })
      .then(() => {
        const service = services.find((s) => s.id === serviceId)
        onSubmit({ ...service, pivot: { price: Number(price) } })
      })
      .catch((err) => {
        setError('Error al guardar el precio. Inténtalo de nuevo.')
        console.error(err)
      })
  }

  return (
    <Modal title="Añadir precio por servicio" onClose={onClose}>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <label className="flex flex-col gap-1.5 text-[13px] font-semibold text-text-h">
          Servicio
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
            <input
              type="text"
              className={`${inputClass} w-full pl-9.5`}
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              onFocus={() => setShowOptions(true)}
              onBlur={() => setTimeout(() => setShowOptions(false), 120)}
              placeholder="Busca un servicio por nombre"
              autoComplete="off"
              autoFocus
            />
            {showOptions && (
              <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-10 max-h-48 overflow-y-auto rounded-[9px] border border-border bg-surface shadow-panel">
                {filteredServices.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    className="w-full text-left text-sm py-2 px-3 cursor-pointer border-none bg-transparent text-text-h hover:bg-accent-bg"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => selectService(s)}
                  >
                    {s.name}
                  </button>
                ))}
                {filteredServices.length === 0 && (
                  <p className="text-[13px] text-text-muted py-2 px-3 m-0">No se han encontrado servicios.</p>
                )}
              </div>
            )}
          </div>
        </label>
        <label className="flex flex-col gap-1.5 text-[13px] font-semibold text-text-h">
          Precio
          <input
            type="number"
            min="0"
            step="0.01"
            className={inputClass}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Ej. 49.90"
          />
        </label>

        {error && <p className="text-danger text-[13px] m-0">{error}</p>}

        <div className="flex justify-end gap-2.5 mt-1">
          <button
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold py-1.75 px-3 rounded-lg cursor-pointer border-none bg-transparent text-text-muted whitespace-nowrap hover:bg-neutral-bg hover:text-text-h"
            type="button"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="inline-flex items-center gap-2 border-none bg-accent-gradient text-white font-semibold text-sm py-2.5 px-4.5 rounded-[9px] cursor-pointer shadow-[0_6px_16px_-6px_rgba(37,99,235,0.55)] whitespace-nowrap transition-[transform,box-shadow] duration-150 hover:-translate-y-px hover:shadow-[0_10px_20px_-6px_rgba(37,99,235,0.6)]"
            type="submit"
          >
            Guardar precio
          </button>
        </div>
      </form>
    </Modal>
  )
}
