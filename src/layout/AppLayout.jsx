import { NavLink, Outlet } from 'react-router'

const NAV_ITEMS = [
  { to: '/', label: 'Inicio', icon: HomeIcon },
  { to: '/clientes', label: 'Clientes', icon: UsersIcon },
  { to: '/servicios', label: 'Servicios', icon: BriefcaseIcon },
  { to: '/facturas', label: 'Facturas', icon: InvoiceIcon },
]

export default function AppLayout() {
  return (
    <div className="flex min-h-svh bg-bg">
      <aside className="w-60 max-[900px]:w-19 shrink-0 bg-accent-gradient text-white flex flex-col py-5 px-3.5 print:hidden">
        <div className="flex items-center gap-2.5 pt-1 px-2 pb-5">
          <div className="font-semibold text-sm leading-[1.3] max-[900px]:hidden">
            INCLUYENDO CAPACIDADES
          </div>
        </div>

        <nav className="flex-1">
          <ul className="list-none m-0 p-0 flex flex-col gap-0.5">
            {NAV_ITEMS.map(({ to, label, icon: Icon, badge }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    'flex items-center gap-2.5 py-2.25 px-3 rounded-lg text-white/90 no-underline text-sm font-medium transition-colors duration-150 hover:bg-white/12 max-[900px]:justify-center' +
                    (isActive ? ' bg-white/24 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.3)]' : '')
                  }
                >
                  <Icon className="w-4.5 h-4.5 shrink-0" />
                  <span className="max-[900px]:hidden">{label}</span>
                  {badge != null && (
                    <span className="ml-auto bg-white/90 text-accent-strong text-[11px] font-bold rounded-full px-1.75 py-px max-[900px]:hidden">
                      {badge}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="flex items-center gap-4 py-3.5 px-7 bg-surface border-b border-border print:hidden">
          <button
            className="w-8.5 h-8.5 rounded-lg border border-border bg-transparent text-text-muted flex items-center justify-center cursor-pointer hover:bg-accent-bg hover:text-accent hover:border-accent-border"
            aria-label="Contraer menú"
            type="button"
          >
            <MenuIcon className="w-4.5 h-4.5" />
          </button>
        </header>

        <main className="flex-1 py-7 px-8 max-[720px]:px-4 max-[720px]:py-5">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

function UsersIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M16 11a4 4 0 1 0-4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M8 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M2 20c.5-3.5 3-5.5 6-5.5s5.5 2 6 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M14 14.7c2.6.4 4.6 2.3 5 5.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function BriefcaseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="7" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 12h18" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  )
}

function InvoiceIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9 8h6M9 12h6M9 16h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function GearIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 3.5v2M12 18.5v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M3.5 12h2M18.5 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

function MenuIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M4 5h16M4 12h10M4 19h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function HomeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M3 12l9-9 9 9v9a3 3 0 0 1-3 3h-12a3 3 0 0 1-3-3v-9z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
