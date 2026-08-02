import { useEffect } from 'react'

export default function Modal({ title, onClose, children }) {
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return (
    <div className="fixed inset-0 bg-[rgba(15,23,42,0.45)] flex items-center justify-center p-5 z-100" onClick={onClose}>
      <div
        className="bg-surface rounded-[14px] shadow-panel w-full max-w-110 max-h-[calc(100svh-40px)] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between py-4.5 px-5 border-b border-border">
          <h2 className="text-[17px]">{title}</h2>
          <button
            className="border-none bg-transparent text-text-muted w-7.5 h-7.5 rounded-lg flex items-center justify-center cursor-pointer hover:bg-neutral-bg hover:text-text-h"
            type="button"
            aria-label="Cerrar"
            onClick={onClose}
          >
            <CloseIcon className="w-4 h-4" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  )
}

function CloseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}
