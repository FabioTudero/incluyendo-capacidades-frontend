import { useNavigate } from "react-router";
import { useEffect, useMemo, useState } from 'react'
import api from '../lib/api'
import AddServiceModal from '../components/AddServiceModal'
import { PlusIcon, SearchIcon } from '../components/Icons'

const tdClass =
  'border-b border-border py-3.5 px-3 text-text align-middle ' +
  'max-[560px]:block max-[560px]:w-full max-[560px]:border-b-0 max-[560px]:py-0.75 max-[560px]:px-0 ' +
  'max-[560px]:before:content-[attr(data-label)] max-[560px]:before:block max-[560px]:before:text-[11px] ' +
  'max-[560px]:before:font-semibold max-[560px]:before:uppercase max-[560px]:before:tracking-[0.4px] ' +
  'max-[560px]:before:text-text-muted max-[560px]:before:mb-0.5'

export default function Services() {
    const navigate = useNavigate()
    const [services, setServices] = useState([])
    const [query, setQuery] = useState('')
    const [showAddModal, setShowAddModal] = useState(false)

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase()
        if (!q) return services
        return services.filter((s) => s.name.toLowerCase().includes(q))
    }, [services, query])

    function handleAddService(service) {
        setServices((prev) => [...prev, service])
        setShowAddModal(false)
    }

    useEffect(() => {
        api('/services').then(setServices)
    }, [])

    return (
        <div className="w-full">
            <div className="flex items-start justify-between gap-6 mb-5.5 max-[720px]:flex-col max-[720px]:items-stretch max-[720px]:gap-4">
                <div>
                    <h1 className="text-[26px] max-[720px]:text-[22px]">Servicios</h1>
                </div>
                <button
                    className="inline-flex items-center gap-2 border-none bg-accent-gradient text-white font-semibold text-sm py-2.5 px-4.5 rounded-[9px] cursor-pointer shadow-[0_6px_16px_-6px_rgba(37,99,235,0.55)] whitespace-nowrap transition-[transform,box-shadow] duration-150 hover:-translate-y-px hover:shadow-[0_10px_20px_-6px_rgba(37,99,235,0.6)] max-[720px]:justify-center"
                    type="button"
                    onClick={() => setShowAddModal(true)}
                >
                    <PlusIcon className="w-4 h-4" />
                    Nuevo servicio
                </button>
            </div>

            {showAddModal && (
                <AddServiceModal onClose={() => setShowAddModal(false)} onSubmit={handleAddService} />
            )}

            <div className="bg-surface border border-border rounded-[14px] shadow-card p-4.5 max-[720px]:p-3.5 max-[720px]:rounded-xl">
                <div className="relative mb-4">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <input
                        type="text"
                        className="w-full py-2.5 pr-3.5 pl-9.5 rounded-[9px] border border-border bg-bg text-sm text-text-h focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_var(--color-accent-bg)]"
                        placeholder="Buscar por nombre"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>

                <table className="w-full border-collapse text-sm max-[560px]:block">
                    <thead className="max-[560px]:hidden">
                        <tr>
                            <th className="text-left text-xs font-semibold uppercase tracking-[0.4px] text-text-muted py-2.5 px-3 border-b border-border">Nombre</th>
                        </tr>
                    </thead>
                    <tbody className="max-[560px]:block [&>tr:last-child>td]:border-b-0">
                        {filtered.map((service) => (
                            <tr
                                key={service.id}
                                onClick={() => navigate(`/servicios/${service.id}`)}
                                className="cursor-pointer hover:bg-accent-bg max-[560px]:block max-[560px]:w-full max-[560px]:border-b max-[560px]:border-border max-[560px]:py-2.5 max-[560px]:px-1 max-[560px]:last:border-b-0"
                            >
                                <td className={tdClass} data-label="Nombre">
                                    <div className="font-semibold text-text-h">{service.name}</div>
                                </td>
                            </tr>
                        ))}
                        {filtered.length === 0 && (
                            <tr className="max-[560px]:block">
                                <td className="text-center text-text-muted py-8 px-3 max-[560px]:block max-[560px]:w-full">
                                    No se han encontrado servicios que coincidan con la búsqueda.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className="mt-3.5 text-[13px] text-text-muted max-[560px]:text-center">
                    {filtered.length} servicio{filtered.length === 1 ? '' : 's'} de {services.length}
                </div>
            </div>
        </div>
    )
}
