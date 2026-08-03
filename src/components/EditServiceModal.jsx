import { useState } from 'react'
import Modal from './Modal'
import api from '../lib/api'

const inputClass =
  'font-normal py-2.5 px-3 rounded-[9px] border border-border bg-bg text-sm text-text-h focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_var(--color-accent-bg)]'

export default function EditServiceModal({ service, onClose, onSubmit }) {
  const [name, setName] = useState(service.name)
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) {
      setError('El nombre es obligatorio.')
      return
    }

    api(`/services/${service.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name.trim() }),
    })
      .then((data) => {
        onSubmit(data)
      })
      .catch((err) => {
        setError('Error al guardar el servicio. Inténtalo de nuevo.')
        console.error(err)
      })
  }

  return (
    <Modal title="Editar servicio" onClose={onClose}>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <label className="flex flex-col gap-1.5 text-[13px] font-semibold text-text-h">
          Nombre
          <input
            type="text"
            className={inputClass}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej. Limpieza de oficinas"
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
