import { useNavigate } from "react-router";
import { useMemo, useState } from 'react'
import { CLIENTS } from '../data/clients'
import './Clients.css'

export default function Clients() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return CLIENTS
    return CLIENTS.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q),
    )
  }, [query])

  return (
    <div className="clients-page">
      <div className="page-header">
        <div>
          <h1>Clientes</h1>
          <p className="page-subtitle">
            Datos fiscales y tarifas de cada cliente. Los conceptos facturables definidos aquí son los que
            aparecerán al registrar trabajos.
          </p>
        </div>
        <button className="btn-primary" type="button">
          <PlusIcon />
          Nuevo cliente
        </button>
      </div>

      <div className="clients-card">
        <div className="search-bar">
          <SearchIcon className="search-icon" />
          <input
            type="text"
            placeholder="Buscar por nombre"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <table className="clients-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo Electrónico</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((client) => (
              <tr
                key={client.id}
                className="clickable-row"
                onClick={() => navigate(`/clientes/${client.id}`)}
              >
                <td>
                  <div className="client-name">{client.name}</div>
                </td>
                <td>
                  <div className="client-email">{client.email}</div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={2} className="empty-row">
                  No se han encontrado clientes que coincidan con la búsqueda.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="table-footer">
          {filtered.length} cliente{filtered.length === 1 ? '' : 's'} de {CLIENTS.length}
        </div>
      </div>
    </div>
  )
}

function PlusIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function SearchIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
      <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function EyeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
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
