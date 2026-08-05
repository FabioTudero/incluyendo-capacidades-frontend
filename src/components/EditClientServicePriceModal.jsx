import { useState } from 'react'
import Modal from './Modal'
import api from '../lib/api'

const inputClass =
  'font-normal py-2.5 px-3 rounded-[9px] border border-border bg-bg text-sm text-text-h focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_var(--color-accent-bg)]'

export default function EditClientServicePriceModal({ clientId, service, onClose, onSubmit }) {
  const [price, setPrice] = useState(service.pivot.price)
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (price === '' || Number(price) < 0) {
      setError('Introduce un precio válido.')
      return
    }

    api(`/services/${service.id}/clients/${clientId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ price: Number(price) }),
    })
      .then(() => {
        onSubmit({ ...service, pivot: { ...service.pivot, price: Number(price) } })
      })
      .catch((err) => {
        setError('Error al guardar el precio. Inténtalo de nuevo.')
        console.error(err)
      })
  }

  return (
    <Modal title="Editar precio" onClose={onClose}>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <label className="flex flex-col gap-1.5 text-[13px] font-semibold text-text-h">
          Servicio
          <input type="text" className={`${inputClass} text-text-muted`} value={service.name} disabled />
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
            autoFocus
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
            Guardar cambios
          </button>
        </div>
      </form>
    </Modal>
  )
}
