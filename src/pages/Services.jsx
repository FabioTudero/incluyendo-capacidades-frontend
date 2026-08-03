import React from 'react'
import { PlusIcon } from '../components/Icons'

export default function Services() {
  return (
        <div className="max-w-275 w-full">
            <div className="flex items-start justify-between gap-6 mb-5.5 max-[720px]:flex-col max-[720px]:items-stretch max-[720px]:gap-4">
                <div>
                    <h1 className="text-[26px] max-[720px]:text-[22px]">Servicios</h1>
                </div>
                <button
                    className="inline-flex items-center gap-2 border-none bg-accent-gradient text-white font-semibold text-sm py-2.5 px-4.5 rounded-[9px] cursor-pointer shadow-[0_6px_16px_-6px_rgba(37,99,235,0.55)] whitespace-nowrap transition-[transform,box-shadow] duration-150 hover:-translate-y-px hover:shadow-[0_10px_20px_-6px_rgba(37,99,235,0.6)] max-[720px]:justify-center"
                    type="button"
                    onClick={() => {}}
                >
                    <PlusIcon className="w-4 h-4" />
                    Nuevo servicio
                </button>
            </div>
        </div>
  )
}
