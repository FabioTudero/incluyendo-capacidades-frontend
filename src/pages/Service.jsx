import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import api from '../lib/api'
import EditServiceModal from '../components/EditServiceModal'
import AddClientPriceModal from '../components/AddClientPriceModal'
import EditClientPriceModal from '../components/EditClientPriceModal'
import ClientPricesTable from '../components/ClientPricesTable'
import { PlusIcon } from '../components/Icons'

export default function Service() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showAddPriceModal, setShowAddPriceModal] = useState(false)
  const [editingPriceClient, setEditingPriceClient] = useState(null)

  function handleDeletePrice(client) {
    if (!window.confirm(`¿Eliminar el precio de ${client.name} para este servicio?`)) return

    api(`/services/${service.id}/clients/${client.id}`, { method: 'DELETE' }).then(() => {
      setService((prev) => ({
        ...prev,
        clients: (prev.clients || []).filter((c) => c.id !== client.id),
      }))
    })
  }

  useEffect(() => {
    setLoading(true)
    api(`/services/${id}`).then((data) => {
      setService(data)
      setLoading(false)
    })
  }, [id])

  if (loading) {
    return (
      <div className="w-full">
        <button className="inline-flex items-center gap-1.5 border-none bg-transparent text-text-muted text-[13px] font-semibold p-0 mb-4.5 cursor-pointer hover:text-accent" type="button" onClick={() => navigate('/servicios')}>
          <BackIcon className="w-3.5 h-3.5" /> Volver a servicios
        </button>
        <p className="text-text-muted">Cargando servicio…</p>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="w-full">
        <button className="inline-flex items-center gap-1.5 border-none bg-transparent text-text-muted text-[13px] font-semibold p-0 mb-4.5 cursor-pointer hover:text-accent" type="button" onClick={() => navigate('/servicios')}>
          <BackIcon className="w-3.5 h-3.5" /> Volver a servicios
        </button>
        <p className="text-text-muted">No se ha encontrado ningún servicio con ese identificador.</p>
      </div>
    )
  }

  return (
    <div className="w-full">
      <button className="inline-flex items-center gap-1.5 border-none bg-transparent text-text-muted text-[13px] font-semibold p-0 mb-4.5 cursor-pointer hover:text-accent" type="button" onClick={() => navigate('/servicios')}>
        <BackIcon className="w-3.5 h-3.5" /> Volver a servicios
      </button>

      <div className="flex items-start justify-between gap-6 mb-5.5 max-[600px]:flex-col max-[600px]:items-stretch max-[600px]:gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-accent-gradient text-white font-bold text-base flex items-center justify-center shrink-0">
            {initials(service.name)}
          </div>
          <div>
            <h1 className="text-[22px]">{service.name}</h1>
          </div>
        </div>
        <button
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold py-1.75 px-3 rounded-lg cursor-pointer border-[1.5px] border-accent bg-surface text-accent whitespace-nowrap hover:bg-accent hover:text-white"
          type="button"
          onClick={() => setShowEditModal(true)}
        >
          <EditIcon className="w-3.5 h-3.5" /> Editar servicio
        </button>
      </div>

      {showEditModal && (
        <EditServiceModal
          service={service}
          onClose={() => setShowEditModal(false)}
          onSubmit={(updated) => {
            setService(updated)
            setShowEditModal(false)
          }}
        />
      )}

      <div className="bg-surface border border-border rounded-[14px] shadow-card p-5.5">
        <h2 className="text-[15px] mb-3.5">Datos del servicio</h2>
        <dl className="grid grid-cols-2 gap-4.5 m-0 max-[600px]:grid-cols-1">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.4px] text-text-muted mb-1">Nombre</dt>
            <dd className="m-0 text-sm text-text-h">{service.name}</dd>
          </div>
        </dl>
      </div>

      <div className="bg-surface border border-border rounded-[14px] shadow-card p-5.5 mt-4.5">
        <div className="flex items-center justify-between gap-4 mb-3.5">
          <h2 className="text-[15px]">Precios por cliente</h2>
          <button
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold py-1.75 px-3 rounded-lg cursor-pointer border-[1.5px] border-accent bg-surface text-accent whitespace-nowrap hover:bg-accent hover:text-white"
            type="button"
            onClick={() => setShowAddPriceModal(true)}
          >
            <PlusIcon className="w-3.5 h-3.5" /> Añadir precio
          </button>
        </div>

        {showAddPriceModal && (
          <AddClientPriceModal
            serviceId={service.id}
            excludeClientIds={(service.clients || []).map((c) => c.id)}
            onClose={() => setShowAddPriceModal(false)}
            onSubmit={(client) => {
              setService((prev) => ({
                ...prev,
                clients: [...(prev.clients || []).filter((c) => c.id !== client.id), client],
              }))
              setShowAddPriceModal(false)
            }}
          />
        )}

        {editingPriceClient && (
          <EditClientPriceModal
            serviceId={service.id}
            client={editingPriceClient}
            onClose={() => setEditingPriceClient(null)}
            onSubmit={(client) => {
              setService((prev) => ({
                ...prev,
                clients: (prev.clients || []).map((c) => (c.id === client.id ? client : c)),
              }))
              setEditingPriceClient(null)
            }}
          />
        )}

        <ClientPricesTable
          clients={service.clients || []}
          onEdit={setEditingPriceClient}
          onDelete={handleDeletePrice}
        />
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
