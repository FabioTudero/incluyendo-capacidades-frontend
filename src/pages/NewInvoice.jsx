import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import api from '../lib/api'
import { SearchIcon, PlusIcon } from '../components/Icons'

const inputClass =
  'font-normal py-2.5 px-3 rounded-[9px] border border-border bg-bg text-sm text-text-h focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_var(--color-accent-bg)]'

function today() {
  return new Date().toISOString().slice(0, 10)
}

function formatPrice(price) {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(price)
}

export default function NewInvoice() {
  const navigate = useNavigate()
  const [clients, setClients] = useState([])
  const [clientId, setClientId] = useState('')
  const [query, setQuery] = useState('')
  const [showOptions, setShowOptions] = useState(false)
  const [clientServices, setClientServices] = useState([])
  const [lines, setLines] = useState([])
  const [serviceToAdd, setServiceToAdd] = useState('')
  const [hoursToAdd, setHoursToAdd] = useState(1)
  const [date, setDate] = useState(today())
  const [error, setError] = useState('')

  useEffect(() => {
    api('/clients').then(setClients)
  }, [])

  const filteredClients = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return clients
    return clients.filter((c) => c.name.toLowerCase().includes(q))
  }, [clients, query])

  const availableServices = clientServices.filter((s) => !lines.some((l) => l.service_id === s.id))
  const total = lines.reduce((sum, l) => sum + Number(l.price), 0)
  const totalHours = lines.reduce((sum, l) => sum + Number(l.hours), 0)

  function selectClient(client) {
    setClientId(client.id)
    setQuery(client.name)
    setShowOptions(false)
    setLines([])
    setServiceToAdd('')
    api(`/clients/${client.id}`).then((data) => setClientServices(data.services || []))
  }

  function handleQueryChange(value) {
    setQuery(value)
    setClientId('')
    setClientServices([])
    setLines([])
    setShowOptions(true)
  }

  function addLine() {
    if (!serviceToAdd) return
    const service = clientServices.find((s) => s.id === Number(serviceToAdd))
    if (!service) return
    setLines((prev) => [
      ...prev,
      { service_id: service.id, name: service.name, price: service.pivot.price, hours: hoursToAdd },
    ])
    setServiceToAdd('')
    setHoursToAdd(1)
  }

  function updateLinePrice(serviceId, price) {
    setLines((prev) => prev.map((l) => (l.service_id === serviceId ? { ...l, price } : l)))
  }

  function updateLineHours(serviceId, hours) {
    setLines((prev) => prev.map((l) => (l.service_id === serviceId ? { ...l, hours } : l)))
  }

  function removeLine(serviceId) {
    setLines((prev) => prev.filter((l) => l.service_id !== serviceId))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!clientId) {
      setError('Selecciona un cliente.')
      return
    }
    if (lines.length === 0) {
      setError('Añade al menos un servicio a la factura.')
      return
    }
    if (lines.some((l) => l.price === '' || Number(l.price) < 0)) {
      setError('Introduce un precio válido en todas las líneas.')
      return
    }
    if (lines.some((l) => l.hours === '' || Number(l.hours) < 0)) {
      setError('Introduce un tiempo válido en todas las líneas.')
      return
    }

    api('/invoices', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        date,
        lines: lines.map((l) => ({ service_id: l.service_id, price: Number(l.price), hours: Number(l.hours) })),
      }),
    })
      .then((data) => {
        navigate(`/facturas/${data.id}`)
      })
      .catch((err) => {
        setError('Error al guardar la factura. Inténtalo de nuevo.')
        console.error(err)
      })
  }

  return (
    <div className="w-full">
      <button className="inline-flex items-center gap-1.5 border-none bg-transparent text-text-muted text-[13px] font-semibold p-0 mb-4.5 cursor-pointer hover:text-accent" type="button" onClick={() => navigate('/facturas')}>
        <BackIcon className="w-3.5 h-3.5" /> Volver a facturas
      </button>

      <h1 className="text-[22px] mb-5.5">Nueva factura</h1>

      <div className="bg-surface border border-border rounded-[14px] shadow-card p-5.5">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <label className="flex flex-col gap-1.5 text-[13px] font-semibold text-text-h">
            Cliente
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
              <input
                type="text"
                className={`${inputClass} w-full pl-9.5`}
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                onFocus={() => setShowOptions(true)}
                onBlur={() => setTimeout(() => setShowOptions(false), 120)}
                placeholder="Busca un cliente por nombre"
                autoComplete="off"
                autoFocus
              />
              {showOptions && (
                <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-10 max-h-48 overflow-y-auto rounded-[9px] border border-border bg-surface shadow-panel">
                  {filteredClients.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      className="w-full text-left text-sm py-2 px-3 cursor-pointer border-none bg-transparent text-text-h hover:bg-accent-bg"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => selectClient(c)}
                    >
                      {c.name}
                    </button>
                  ))}
                  {filteredClients.length === 0 && (
                    <p className="text-[13px] text-text-muted py-2 px-3 m-0">No se han encontrado clientes.</p>
                  )}
                </div>
              )}
            </div>
          </label>

          <label className="flex flex-col gap-1.5 text-[13px] font-semibold text-text-h">
            Fecha
            <input type="date" className={inputClass} value={date} onChange={(e) => setDate(e.target.value)} />
          </label>

          {clientId && (
            <div className="flex flex-col gap-2">
              <span className="text-[13px] font-semibold text-text-h">Servicios</span>

              {clientServices.length === 0 ? (
                <p className="text-[13px] text-text-muted m-0">
                  Este cliente no tiene servicios con precio asignado. Añade precios en la ficha del servicio primero.
                </p>
              ) : (
                <div className="flex gap-2">
                  <select className={`${inputClass} flex-1`} value={serviceToAdd} onChange={(e) => setServiceToAdd(e.target.value)}>
                    <option value="">Selecciona un servicio</option>
                    {availableServices.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({formatPrice(s.pivot.price)})
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    min="0"
                    step="0.25"
                    className={`${inputClass} w-24`}
                    value={hoursToAdd}
                    onChange={(e) => setHoursToAdd(e.target.value)}
                    aria-label="Horas"
                    title="Horas"
                  />
                  <button
                    className="inline-flex items-center gap-1.5 text-[13px] font-semibold py-1.75 px-3 rounded-lg cursor-pointer border-[1.5px] border-accent bg-surface text-accent whitespace-nowrap hover:bg-accent hover:text-white"
                    type="button"
                    onClick={addLine}
                    disabled={!serviceToAdd}
                  >
                    <PlusIcon className="w-3.5 h-3.5" /> Añadir
                  </button>
                </div>
              )}

              {lines.length > 0 && (
                <div className="flex flex-col gap-2 mt-1">
                  <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.4px] text-text-muted">
                    <span className="flex-1">Servicio</span>
                    <span className="w-24">Horas</span>
                    <span className="w-28">Precio</span>
                    <span className="w-7.5" />
                  </div>
                  {lines.map((line) => (
                    <div key={line.service_id} className="flex items-center gap-2">
                      <span className="flex-1 text-sm text-text-h">{line.name}</span>
                      <input
                        type="number"
                        min="0"
                        step="0.25"
                        className={`${inputClass} w-24`}
                        value={line.hours}
                        onChange={(e) => updateLineHours(line.service_id, e.target.value)}
                        aria-label={`Horas de ${line.name}`}
                        title="Horas"
                      />
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        className={`${inputClass} w-28`}
                        value={line.price}
                        onChange={(e) => updateLinePrice(line.service_id, e.target.value)}
                        aria-label={`Precio de ${line.name}`}
                        title="Precio"
                      />
                      <button
                        className="inline-flex items-center justify-center w-7.5 h-7.5 rounded-lg cursor-pointer border-none bg-transparent text-text-muted hover:bg-danger-bg hover:text-danger"
                        type="button"
                        onClick={() => removeLine(line.service_id)}
                        aria-label={`Quitar ${line.name}`}
                      >
                        <RemoveIcon className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                  <div className="flex justify-end gap-4 text-sm font-semibold text-text-h mt-1">
                    <span>Horas: {totalHours}</span>
                    <span>Total: {formatPrice(total)}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {error && <p className="text-danger text-[13px] m-0">{error}</p>}

          <div className="flex justify-end gap-2.5 mt-1">
            <button
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold py-1.75 px-3 rounded-lg cursor-pointer border-none bg-transparent text-text-muted whitespace-nowrap hover:bg-neutral-bg hover:text-text-h"
              type="button"
              onClick={() => navigate('/facturas')}
            >
              Cancelar
            </button>
            <button
              className="inline-flex items-center gap-2 border-none bg-accent-gradient text-white font-semibold text-sm py-2.5 px-4.5 rounded-[9px] cursor-pointer shadow-[0_6px_16px_-6px_rgba(37,99,235,0.55)] whitespace-nowrap transition-[transform,box-shadow] duration-150 hover:-translate-y-px hover:shadow-[0_10px_20px_-6px_rgba(37,99,235,0.6)]"
              type="submit"
            >
              Guardar factura
            </button>
          </div>
        </form>
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

function RemoveIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}
