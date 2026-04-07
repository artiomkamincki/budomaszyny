// Custom SVG icons for equipment categories — designed to be instantly recognizable
// as construction equipment silhouettes

interface IconProps {
  className?: string;
}

/** Excavator — Maszyny ziemne (Earthmoving machines) */
export function ExcavatorIcon({ className = "h-12 w-12" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Tracks */}
      <rect x="4" y="48" width="32" height="8" rx="4" fill="currentColor" opacity="0.9" />
      <rect x="6" y="50" width="28" height="4" rx="2" fill="currentColor" opacity="0.15" />
      {/* Body */}
      <rect x="6" y="36" width="28" height="12" rx="3" fill="currentColor" opacity="0.8" />
      {/* Cabin */}
      <rect x="22" y="28" width="12" height="10" rx="2" fill="currentColor" opacity="0.7" />
      <rect x="24" y="30" width="8" height="5" rx="1" fill="currentColor" opacity="0.15" />
      {/* Boom (arm) */}
      <path d="M20 34 L40 14" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.85" />
      {/* Stick */}
      <path d="M40 14 L54 26" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" opacity="0.85" />
      {/* Bucket */}
      <path d="M54 26 L60 24 L58 32 L50 30 Z" fill="currentColor" opacity="0.9" />
      {/* Bucket teeth */}
      <path d="M58 32 L60 35 M55 31 L57 34 M52 30 L54 33" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      {/* Hydraulic cylinder */}
      <path d="M14 36 L32 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

/** Wheel Loader — Ładowarki i transport */
export function WheelLoaderIcon({ className = "h-12 w-12" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Rear wheel */}
      <circle cx="14" cy="50" r="9" fill="currentColor" opacity="0.85" />
      <circle cx="14" cy="50" r="4" fill="currentColor" opacity="0.15" />
      {/* Front wheel */}
      <circle cx="46" cy="50" r="7" fill="currentColor" opacity="0.85" />
      <circle cx="46" cy="50" r="3" fill="currentColor" opacity="0.15" />
      {/* Body */}
      <rect x="6" y="30" width="24" height="16" rx="3" fill="currentColor" opacity="0.8" />
      {/* Engine hood */}
      <rect x="4" y="34" width="6" height="8" rx="2" fill="currentColor" opacity="0.7" />
      {/* Cabin */}
      <rect x="18" y="22" width="12" height="12" rx="2" fill="currentColor" opacity="0.7" />
      <rect x="20" y="24" width="8" height="7" rx="1" fill="currentColor" opacity="0.15" />
      {/* Boom arms */}
      <path d="M30 32 L48 24" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" opacity="0.85" />
      <path d="M30 38 L48 30" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" opacity="0.85" />
      {/* Bucket */}
      <path d="M48 22 L56 20 L58 36 L48 32 Z" fill="currentColor" opacity="0.9" />
      {/* Bucket edge */}
      <path d="M56 20 L60 18 L60 22 L58 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
    </svg>
  );
}

/** Tower Crane — Dźwigi i podnośniki */
export function CraneIcon({ className = "h-12 w-12" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Base */}
      <rect x="22" y="54" width="20" height="6" rx="2" fill="currentColor" opacity="0.85" />
      {/* Tower */}
      <rect x="29" y="10" width="6" height="44" fill="currentColor" opacity="0.8" />
      {/* Cross bracing on tower */}
      <path d="M29 20 L35 30 M35 20 L29 30 M29 34 L35 44 M35 34 L29 44" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      {/* Jib (horizontal arm) */}
      <rect x="4" y="8" width="52" height="4" rx="1" fill="currentColor" opacity="0.85" />
      {/* Counter-jib weight */}
      <rect x="4" y="6" width="10" height="8" rx="1" fill="currentColor" opacity="0.7" />
      {/* Operator cabin */}
      <rect x="28" y="12" width="8" height="6" rx="1" fill="currentColor" opacity="0.65" />
      <rect x="30" y="13" width="4" height="3" rx="0.5" fill="currentColor" opacity="0.15" />
      {/* Hook cable */}
      <line x1="48" y1="12" x2="48" y2="36" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
      {/* Hook */}
      <path d="M45 36 L51 36 L50 40 C50 42 46 42 46 40 Z" fill="currentColor" opacity="0.8" />
      {/* Top mast */}
      <path d="M32 8 L32 2 L8 8 M32 2 L52 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

/** Road Roller — Maszyny drogowe */
export function RoadRollerIcon({ className = "h-12 w-12" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Front drum/roller */}
      <rect x="4" y="42" width="22" height="14" rx="7" fill="currentColor" opacity="0.85" />
      <rect x="6" y="45" width="18" height="8" rx="4" fill="currentColor" opacity="0.15" />
      {/* Drum lines */}
      <line x1="10" y1="43" x2="10" y2="55" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
      <line x1="15" y1="43" x2="15" y2="55" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
      <line x1="20" y1="43" x2="20" y2="55" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
      {/* Rear wheel */}
      <circle cx="50" cy="50" r="8" fill="currentColor" opacity="0.85" />
      <circle cx="50" cy="50" r="3.5" fill="currentColor" opacity="0.15" />
      {/* Body / frame */}
      <rect x="20" y="30" width="32" height="14" rx="3" fill="currentColor" opacity="0.75" />
      {/* Engine */}
      <rect x="38" y="26" width="14" height="8" rx="2" fill="currentColor" opacity="0.7" />
      {/* Cabin */}
      <rect x="22" y="18" width="14" height="14" rx="2" fill="currentColor" opacity="0.7" />
      <rect x="24" y="20" width="10" height="8" rx="1" fill="currentColor" opacity="0.15" />
      {/* ROPS frame */}
      <path d="M22 18 L22 14 L36 14 L36 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      {/* Steering frame connecting front and rear */}
      <path d="M26 38 L16 42" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

/** Generator — Zasilanie i ogrzewanie */
export function GeneratorIcon({ className = "h-12 w-12" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Generator body */}
      <rect x="6" y="20" width="52" height="28" rx="4" fill="currentColor" opacity="0.8" />
      {/* Ventilation grille */}
      <line x1="12" y1="24" x2="12" y2="44" stroke="currentColor" strokeWidth="2" opacity="0.2" />
      <line x1="18" y1="24" x2="18" y2="44" stroke="currentColor" strokeWidth="2" opacity="0.2" />
      <line x1="24" y1="24" x2="24" y2="44" stroke="currentColor" strokeWidth="2" opacity="0.2" />
      <line x1="30" y1="24" x2="30" y2="44" stroke="currentColor" strokeWidth="2" opacity="0.2" />
      {/* Control panel */}
      <rect x="38" y="24" width="16" height="12" rx="2" fill="currentColor" opacity="0.5" />
      <circle cx="42" cy="30" r="2" fill="currentColor" opacity="0.25" />
      <circle cx="50" cy="30" r="2" fill="currentColor" opacity="0.25" />
      <rect x="40" y="33" width="12" height="1.5" rx="0.5" fill="currentColor" opacity="0.25" />
      {/* Power outlets */}
      <rect x="40" y="40" width="4" height="4" rx="1" fill="currentColor" opacity="0.4" />
      <rect x="48" y="40" width="4" height="4" rx="1" fill="currentColor" opacity="0.4" />
      {/* Lightning bolt */}
      <path d="M32 6 L28 18 L34 18 L30 30 L38 14 L32 14 Z" fill="currentColor" opacity="0.9" />
      {/* Legs/skid */}
      <rect x="8" y="48" width="48" height="4" rx="1.5" fill="currentColor" opacity="0.85" />
      {/* Lifting eye */}
      <circle cx="32" cy="16" r="0" fill="none" />
      <path d="M28 20 L28 18 C28 15 36 15 36 18 L36 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

/** Concrete Mixer — Lekki sprzęt budowlany */
export function ConcreteMixerIcon({ className = "h-12 w-12" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Drum */}
      <ellipse cx="32" cy="30" rx="18" ry="16" fill="currentColor" opacity="0.8" transform="rotate(-15 32 30)" />
      {/* Drum opening */}
      <ellipse cx="44" cy="22" rx="6" ry="8" fill="currentColor" opacity="0.2" transform="rotate(-15 44 22)" />
      {/* Drum stripes */}
      <path d="M18 22 C24 36, 40 40, 48 28" stroke="currentColor" strokeWidth="1.5" opacity="0.3" fill="none" />
      <path d="M20 18 C26 32, 42 36, 50 24" stroke="currentColor" strokeWidth="1.5" opacity="0.3" fill="none" />
      {/* Stand / frame */}
      <path d="M22 44 L18 56 M42 44 L46 56" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.85" />
      {/* Cross brace */}
      <path d="M20 50 L44 50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
      {/* Wheels */}
      <circle cx="18" cy="56" r="5" fill="currentColor" opacity="0.85" />
      <circle cx="18" cy="56" r="2" fill="currentColor" opacity="0.15" />
      <circle cx="46" cy="56" r="5" fill="currentColor" opacity="0.85" />
      <circle cx="46" cy="56" r="2" fill="currentColor" opacity="0.15" />
      {/* Handle */}
      <path d="M14 38 L6 34 L6 30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
      {/* Motor */}
      <rect x="26" y="42" width="12" height="6" rx="2" fill="currentColor" opacity="0.65" />
    </svg>
  );
}

/** Scaffolding — Wyposażenie budowy */
export function ScaffoldingIcon({ className = "h-12 w-12" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Vertical poles */}
      <rect x="10" y="4" width="4" height="52" rx="1" fill="currentColor" opacity="0.85" />
      <rect x="30" y="4" width="4" height="52" rx="1" fill="currentColor" opacity="0.85" />
      <rect x="50" y="4" width="4" height="52" rx="1" fill="currentColor" opacity="0.85" />
      {/* Horizontal platforms */}
      <rect x="8" y="14" width="48" height="3" rx="1" fill="currentColor" opacity="0.7" />
      <rect x="8" y="30" width="48" height="3" rx="1" fill="currentColor" opacity="0.7" />
      <rect x="8" y="46" width="48" height="3" rx="1" fill="currentColor" opacity="0.7" />
      {/* Cross braces */}
      <path d="M14 17 L30 30 M30 17 L14 30" stroke="currentColor" strokeWidth="1.5" opacity="0.45" />
      <path d="M34 17 L50 30 M50 17 L34 30" stroke="currentColor" strokeWidth="1.5" opacity="0.45" />
      <path d="M14 33 L30 46 M30 33 L14 46" stroke="currentColor" strokeWidth="1.5" opacity="0.45" />
      <path d="M34 33 L50 46 M50 33 L34 46" stroke="currentColor" strokeWidth="1.5" opacity="0.45" />
      {/* Base plates */}
      <rect x="6" y="56" width="12" height="3" rx="1" fill="currentColor" opacity="0.6" />
      <rect x="26" y="56" width="12" height="3" rx="1" fill="currentColor" opacity="0.6" />
      <rect x="46" y="56" width="12" height="3" rx="1" fill="currentColor" opacity="0.6" />
      {/* Guard rail on top */}
      <path d="M8 8 L56 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}
