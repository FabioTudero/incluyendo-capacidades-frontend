import { useState } from 'react'
import Modal from './Modal'
import '../pages/Clients.css'

export default function AddClientModal({ onClose, onSubmit }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim() || !email.trim()) {
      setError('Nombre y correo electrónico son obligatorios.')
      return
    }
    onSubmit({ name: name.trim(), email: email.trim() })
  }

  return (
    <Modal title="Nuevo cliente" onClose={onClose}>
      <form className="add-client-form" onSubmit={handleSubmit}>
        <label>
          Nombre
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej. Limpiezas Norte S.L."
            autoFocus
          />
        </label>
        <label>
          Correo electrónico
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ej. contacto@empresa.com"
          />
        </label>

        {error && <p className="form-error">{error}</p>}

        <div className="form-actions">
          <button className="btn-ghost" type="button" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn-primary" type="submit">
            Guardar cliente
          </button>
        </div>
      </form>
    </Modal>
  )
}
