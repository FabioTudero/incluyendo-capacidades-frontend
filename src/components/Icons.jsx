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

function TrashIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m-8 0 1 13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1l1-13"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export { PlusIcon, SearchIcon, EyeIcon, EditIcon, TrashIcon }