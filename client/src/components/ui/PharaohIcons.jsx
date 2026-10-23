export function PyramidIcon({ className = "w-6 h-6", color = "currentColor" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 20H22L12 2Z" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 2V20" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M7 11L12 7L17 11" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <path d="M4.5 15.5L12 12.5L19.5 15.5" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function ScarabIcon({ className = "w-6 h-6", color = "currentColor" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="5" r="2.5" stroke={color} strokeWidth="1.5" />
      <ellipse cx="12" cy="14" rx="4.5" ry="6" stroke={color} strokeWidth="1.5" />
      <path d="M12 8V20" stroke={color} strokeWidth="1.4" />
      <path d="M7.5 14C5 12 4 8 4 6" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M16.5 14C19 12 20 8 20 6" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M7.5 16C5 18 3.5 20 3 21" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M16.5 16C19 18 20.5 20 21 21" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function EyeOfHorusIcon({ className = "w-6 h-6", color = "currentColor" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 10C5.5 6 9.5 4 13 4C17 4 20.5 6 22 10C20 14 16 16 12 16C7 16 4 12 3 10Z" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12.5" cy="10" r="3" stroke={color} strokeWidth="1.6" />
      <path d="M12.5 16V21" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12.5 18C15 18 17 19.5 18 21" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M7 10C6 12 5.5 15 5 18" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function AnkhIcon({ className = "w-6 h-6", color = "currentColor" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="12" cy="7" rx="3.5" ry="4" stroke={color} strokeWidth="1.6" />
      <path d="M12 11V21" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M6 13H18" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function LotusIcon({ className = "w-6 h-6", color = "currentColor" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3C10.5 7 10.5 14 12 19C13.5 14 13.5 7 12 3Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 19C8 16 4 11 5 7C8 9 10 14 12 19Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 19C16 16 20 11 19 7C16 9 14 14 12 19Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M4 19C8 20 16 20 20 19" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function PharaohPatternBackground({ className = "opacity-5" }) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: `radial-gradient(#c9952a 1px, transparent 1px), radial-gradient(#c9952a 1px, transparent 1px)`,
        backgroundSize: "28px 28px",
        backgroundPosition: "0 0, 14px 14px",
      }}
    />
  );
}
