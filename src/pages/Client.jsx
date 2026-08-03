import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import api from '../lib/api'

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
      <div className="w-full">
        <button className="inline-flex items-center gap-1.5 border-none bg-transparent text-text-muted text-[13px] font-semibold p-0 mb-4.5 cursor-pointer hover:text-accent" type="button" onClick={() => navigate('/clientes')}>
          <BackIcon className="w-3.5 h-3.5" /> Volver a clientes
        </button>
        <p className="text-text-muted">Cargando cliente…</p>
      </div>
    )
  }

  if (!client) {
    return (
      <div className="w-full">
        <button className="inline-flex items-center gap-1.5 border-none bg-transparent text-text-muted text-[13px] font-semibold p-0 mb-4.5 cursor-pointer hover:text-accent" type="button" onClick={() => navigate('/clientes')}>
          <BackIcon className="w-3.5 h-3.5" /> Volver a clientes
        </button>
        <p className="text-text-muted">No se ha encontrado ningún cliente con ese identificador.</p>
      </div>
    )
  }

  return (
    <div className="w-full">
      <button className="inline-flex items-center gap-1.5 border-none bg-transparent text-text-muted text-[13px] font-semibold p-0 mb-4.5 cursor-pointer hover:text-accent" type="button" onClick={() => navigate('/clientes')}>
        <BackIcon className="w-3.5 h-3.5" /> Volver a clientes
      </button>

      <div className="flex items-start justify-between gap-6 mb-5.5 max-[600px]:flex-col max-[600px]:items-stretch max-[600px]:gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-accent-gradient text-white font-bold text-base flex items-center justify-center shrink-0">
            {initials(client.name)}
          </div>
          <div>
            <h1 className="text-[22px]">{client.name}</h1>
            <p className="text-text-muted mt-1.5 text-sm leading-normal">{client.email}</p>
          </div>
        </div>
        <button className="inline-flex items-center gap-1.5 text-[13px] font-semibold py-1.75 px-3 rounded-lg cursor-pointer border-[1.5px] border-accent bg-surface text-accent whitespace-nowrap hover:bg-accent hover:text-white" type="button">
          <EditIcon className="w-3.5 h-3.5" /> Editar cliente
        </button>
      </div>

      <div className="bg-surface border border-border rounded-[14px] shadow-card p-5.5">
        <h2 className="text-[15px] mb-3.5">Datos de contacto</h2>
        <dl className="grid grid-cols-2 gap-4.5 m-0 max-[600px]:grid-cols-1">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.4px] text-text-muted mb-1">Nombre / razón social</dt>
            <dd className="m-0 text-sm text-text-h">{client.name}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.4px] text-text-muted mb-1">Correo electrónico</dt>
            <dd className="m-0 text-sm text-text-h">{client.email}</dd>
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
