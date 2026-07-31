import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import api from '../lib/api'
import './Clients.css'
import './Client.css'

export default function Client() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [client, setClient] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    api(`/clients/${id}`).then((data) => {
      setClient(data)
      setLoading(false)
    })
  }, [id])

  if (loading) {
    return (
      <div className="client-page">
        <button className="back-link" type="button" onClick={() => navigate('/clientes')}>
          <BackIcon /> Volver a clientes
        </button>
        <p className="not-found">Cargando cliente…</p>
      </div>
    )
  }

  if (!client) {
    return (
      <div className="client-page">
        <button className="back-link" type="button" onClick={() => navigate('/clientes')}>
          <BackIcon /> Volver a clientes
        </button>
        <p className="not-found">No se ha encontrado ningún cliente con ese identificador.</p>
      </div>
    )
  }

  return (
    <div className="client-page">
      <button className="back-link" type="button" onClick={() => navigate('/clientes')}>
        <BackIcon /> Volver a clientes
      </button>

      <div className="page-header">
        <div className="client-heading">
          <div className="client-avatar">{initials(client.name)}</div>
          <div>
            <h1>{client.name}</h1>
            <p className="page-subtitle">{client.email}</p>
          </div>
        </div>
        <button className="btn-outline" type="button">
          <EditIcon /> Editar cliente
        </button>
      </div>

      <div className="client-card">
        <h2>Datos de contacto</h2>
        <dl className="client-details">
          <div>
            <dt>Nombre / razón social</dt>
            <dd>{client.name}</dd>
          </div>
          <div>
            <dt>Correo electrónico</dt>
            <dd>{client.email}</dd>
          </div>
        </dl>
      </div>
    </div>
  )
}

function initials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

function BackIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function EditIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M4 20h4l10.5-10.5a2.1 2.1 0 0 0-3-3L5 17v3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  )
}
