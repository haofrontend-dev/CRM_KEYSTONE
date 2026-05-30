type IconName =
  | 'spark' | 'compass' | 'shield' | 'brain' | 'chart' | 'users'
  | 'flag' | 'layers' | 'cpu' | 'arrow-right' | 'phone' | 'mail'
  | 'pin' | 'clock' | 'star' | 'chevron-left' | 'chevron-right'
  | 'check' | 'menu' | 'close' | 'facebook' | 'youtube' | 'linkedin'
  | 'message'

const paths: Record<IconName, React.ReactNode> = {
  spark: <path d="M12 2l2.39 6.95L21 12l-6.61 3.05L12 22l-2.39-6.95L3 12l6.61-3.05L12 2z" />,
  compass: <><circle cx="12" cy="12" r="9" /><path d="M16 8l-3 6-6 2 3-6 6-2z" /></>,
  shield: <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" />,
  brain: <path d="M8 4a4 4 0 00-4 4v8a4 4 0 004 4M16 4a4 4 0 014 4v8a4 4 0 01-4 4M8 12h8M10 8v8M14 8v8" />,
  chart: <path d="M3 21V3M3 21h18M7 17V9M12 17v-6M17 17v-3" />,
  users: <><circle cx="9" cy="8" r="3.5" /><circle cx="17" cy="9" r="2.5" /><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M14 20c0-2.5 2-4.5 4.5-4.5S23 17.5 23 20" /></>,
  flag: <path d="M5 21V4h11l-2 3 2 3H5" />,
  layers: <path d="M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5M3 17l9 5 9-5" />,
  cpu: <><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" /><rect x="10" y="10" width="4" height="4" /></>,
  'arrow-right': <path d="M5 12h14M13 5l7 7-7 7" />,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>,
  pin: <><path d="M12 22s7-7.5 7-13a7 7 0 10-14 0c0 5.5 7 13 7 13z" /><circle cx="12" cy="9" r="2.5" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  star: <path d="M12 2l3 7 7 .8-5.3 4.8L18 22l-6-3.5L6 22l1.3-7.4L2 9.8 9 9l3-7z" />,
  'chevron-left': <path d="M15 6l-6 6 6 6" />,
  'chevron-right': <path d="M9 6l6 6-6 6" />,
  check: <path d="M5 12l5 5L20 7" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  facebook: <path d="M14 9V7a2 2 0 012-2h2V2h-3a4 4 0 00-4 4v3H8v3h3v9h3v-9h2.5l.5-3H14z" />,
  youtube: <><rect x="2" y="6" width="20" height="12" rx="3" /><path d="M10 9l5 3-5 3V9z" /></>,
  linkedin: <><rect x="2" y="2" width="20" height="20" rx="3" /><path d="M7 10v7M7 7v.5M11 17v-7M11 13c0-2 1-3 2.5-3S16 11 16 13v4" /></>,
  message: <path d="M21 12a8 8 0 11-3.5-6.6L21 4l-1.4 3.5A8 8 0 0121 12z" />,
}

export function Icon({
  name,
  size = 20,
  className = '',
  strokeWidth = 1.8,
}: {
  name: IconName
  size?: number
  className?: string
  strokeWidth?: number
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {paths[name]}
    </svg>
  )
}
