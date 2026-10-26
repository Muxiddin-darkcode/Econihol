import React from 'react';

// Kid-friendly animated vector mascot: EkoBotvoy (The Eco-Robot Seedling)
export const EkoBotMascot: React.FC<{
  mood?: 'happy' | 'thinking' | 'celebrating' | 'explaining' | 'sad';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}> = ({ mood = 'happy', size = 'md', className = '' }) => {
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };

  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${sizeMap[size]} ${className}`}>
      <svg
        viewBox="0 0 120 120"
        className="w-full h-full drop-shadow-md select-none transition-transform duration-300 hover:scale-105"
      >
        {/* Antenna / Seedling Leaf */}
        <path
          d="M60 30 C 60 12, 45 10, 42 16 C 40 22, 52 26, 60 30 Z"
          fill="#22c55e"
          stroke="#15803d"
          strokeWidth="2.5"
          className="animate-bounce origin-bottom"
          style={{ animationDuration: '2s' }}
        />
        <path
          d="M60 30 C 60 14, 75 12, 78 18 C 80 24, 68 28, 60 30 Z"
          fill="#4ade80"
          stroke="#15803d"
          strokeWidth="2.5"
          className="animate-bounce origin-bottom"
          style={{ animationDuration: '2.4s' }}
        />
        <line x1="60" y1="30" x2="60" y2="40" stroke="#15803d" strokeWidth="3" strokeLinecap="round" />

        {/* Head Shape */}
        <rect
          x="28"
          y="36"
          width="64"
          height="54"
          rx="22"
          fill="url(#botHeadGrad)"
          stroke="#10b981"
          strokeWidth="3.5"
        />

        {/* Shiny Head Highlight */}
        <path
          d="M 38 44 Q 60 38 82 44"
          stroke="#ffffff"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.7"
        />

        {/* Cheeks */}
        <circle cx="38" cy="68" r="6" fill="#f43f5e" opacity="0.45" />
        <circle cx="82" cy="68" r="6" fill="#f43f5e" opacity="0.45" />

        {/* Eyes based on mood */}
        {mood === 'celebrating' || mood === 'happy' ? (
          <>
            {/* Happy arch eyes */}
            <path
              d="M 40 58 Q 48 48 54 58"
              fill="none"
              stroke="#0f172a"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M 66 58 Q 72 48 80 58"
              fill="none"
              stroke="#0f172a"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </>
        ) : mood === 'thinking' ? (
          <>
            {/* Thinking big cartoon eyes */}
            <circle cx="48" cy="56" r="7" fill="#0f172a" />
            <circle cx="72" cy="56" r="7" fill="#0f172a" />
            <circle cx="50" cy="54" r="2.5" fill="#ffffff" />
            <circle cx="74" cy="54" r="2.5" fill="#ffffff" />
          </>
        ) : mood === 'sad' ? (
          <>
            {/* Encouraging gentle eyes */}
            <circle cx="48" cy="58" r="6" fill="#0f172a" />
            <circle cx="72" cy="58" r="6" fill="#0f172a" />
            <circle cx="46" cy="56" r="2" fill="#ffffff" />
            <circle cx="70" cy="56" r="2" fill="#ffffff" />
          </>
        ) : (
          <>
            {/* Standard cute eyes */}
            <circle cx="48" cy="56" r="7" fill="#0f172a" />
            <circle cx="72" cy="56" r="7" fill="#0f172a" />
            <circle cx="50" cy="54" r="2.5" fill="#ffffff" />
            <circle cx="74" cy="54" r="2.5" fill="#ffffff" />
          </>
        )}

        {/* Mouth */}
        {mood === 'celebrating' ? (
          <path
            d="M 48 68 Q 60 84 72 68 Z"
            fill="#e11d48"
            stroke="#0f172a"
            strokeWidth="2.5"
          />
        ) : mood === 'sad' ? (
          <path
            d="M 52 74 Q 60 68 68 74"
            fill="none"
            stroke="#0f172a"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        ) : (
          <path
            d="M 50 68 Q 60 78 70 68"
            fill="none"
            stroke="#0f172a"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        )}

        {/* Small Hands */}
        <circle cx="20" cy="65" r="7" fill="#34d399" stroke="#059669" strokeWidth="2" />
        <circle cx="100" cy="65" r="7" fill="#34d399" stroke="#059669" strokeWidth="2" />

        {/* Gradients */}
        <defs>
          <linearGradient id="botHeadGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#d1fae5" />
            <stop offset="50%" stopColor="#a7f3d0" />
            <stop offset="100%" stopColor="#6ee7b7" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

// 3D Cartoon Recycling Bin Vector Graphics
export const KidBinIcon: React.FC<{
  type: 'plastic' | 'paper' | 'organic' | 'glass' | 'hazardous';
  size?: 'md' | 'lg';
}> = ({ type, size = 'md' }) => {
  const configs = {
    plastic: {
      primary: '#f59e0b',
      shadow: '#b45309',
      light: '#fde68a',
      lid: '#d97706',
      emblem: '♻️',
      name: 'PLASTIK',
      textColor: 'text-amber-900'
    },
    paper: {
      primary: '#3b82f6',
      shadow: '#1d4ed8',
      light: '#bfdbfe',
      lid: '#2563eb',
      emblem: '📄',
      name: 'QOG‘OZ',
      textColor: 'text-blue-900'
    },
    organic: {
      primary: '#10b981',
      shadow: '#047857',
      light: '#a7f3d0',
      lid: '#059669',
      emblem: '🍏',
      name: 'ORGANIK',
      textColor: 'text-emerald-900'
    },
    glass: {
      primary: '#06b6d4',
      shadow: '#0e7490',
      light: '#cffafe',
      lid: '#0891b2',
      emblem: '🫙',
      name: 'SHISHA',
      textColor: 'text-cyan-900'
    },
    hazardous: {
      primary: '#f43f5e',
      shadow: '#be123c',
      light: '#fecdd3',
      lid: '#e11d48',
      emblem: '🔋',
      name: 'XAVFLI',
      textColor: 'text-rose-900'
    }
  };

  const c = configs[type];
  const isLg = size === 'lg';

  return (
    <div className={`relative flex flex-col items-center select-none ${isLg ? 'w-24 h-28' : 'w-16 h-20'}`}>
      <svg
        viewBox="0 0 100 120"
        className="w-full h-full drop-shadow-md transition-transform duration-200 group-hover:scale-105"
      >
        {/* Wheels */}
        <circle cx="28" cy="112" r="7" fill="#334155" stroke="#1e293b" strokeWidth="2" />
        <circle cx="72" cy="112" r="7" fill="#334155" stroke="#1e293b" strokeWidth="2" />
        <circle cx="28" cy="112" r="2.5" fill="#94a3b8" />
        <circle cx="72" cy="112" r="2.5" fill="#94a3b8" />

        {/* Bin Body (Trapezoid) */}
        <path
          d="M 22 36 L 28 108 C 28 111, 32 113, 36 113 L 64 113 C 68 113, 72 111, 72 108 L 78 36 Z"
          fill={c.primary}
          stroke={c.shadow}
          strokeWidth="3.5"
        />

        {/* Body Highlight stripe */}
        <path
          d="M 30 42 L 34 104"
          stroke={c.light}
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.8"
        />

        {/* Center Recycled/Category Badge */}
        <circle cx="50" cy="72" r="14" fill="#ffffff" stroke={c.shadow} strokeWidth="2" />
        <text
          x="50"
          y="77"
          fontSize="14"
          textAnchor="middle"
          dominantBaseline="central"
        >
          {c.emblem}
        </text>

        {/* Bin Lid */}
        <path
          d="M 16 32 C 16 26, 22 24, 28 24 L 72 24 C 78 24, 84 26, 84 32 L 88 38 C 88 40, 86 42, 82 42 L 18 42 C 14 42, 12 40, 12 38 Z"
          fill={c.lid}
          stroke={c.shadow}
          strokeWidth="3"
        />

        {/* Lid Handle */}
        <path
          d="M 38 24 L 38 18 C 38 15, 42 14, 50 14 C 58 14, 62 15, 62 18 L 62 24"
          fill="none"
          stroke={c.shadow}
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Cheerful Eyes on Bin */}
        <circle cx="43" cy="52" r="3" fill="#0f172a" />
        <circle cx="57" cy="52" r="3" fill="#0f172a" />
        <path
          d="M 46 58 Q 50 62 54 58"
          fill="none"
          stroke="#0f172a"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

// Kid-Friendly Illustrated Vector Card for Waste Items (Guaranteed 100% Reliable Render)
export const KidWasteItemGraphic: React.FC<{
  itemId: string;
  nameUz: string;
  className?: string;
}> = ({ itemId, nameUz, className = '' }) => {
  return (
    <div className={`relative w-full h-full flex items-center justify-center p-3 select-none ${className}`}>
      {itemId === 'w-1' && (
        // Plastic Water Bottle
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
          <defs>
            <linearGradient id="waterBottleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#bae6fd" />
              <stop offset="50%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
          </defs>
          {/* Cap */}
          <rect x="42" y="10" width="16" height="10" rx="3" fill="#2563eb" stroke="#1d4ed8" strokeWidth="2" />
          <rect x="44" y="20" width="12" height="6" fill="#0284c7" />
          {/* Bottle Body */}
          <path
            d="M 40 26 C 36 32, 34 38, 34 46 L 34 82 C 34 88, 38 90, 44 90 L 56 90 C 62 90, 66 88, 66 82 L 66 46 C 66 38, 64 32, 60 26 Z"
            fill="url(#waterBottleGrad)"
            stroke="#0369a1"
            strokeWidth="3"
          />
          {/* Label */}
          <rect x="34" y="50" width="32" height="20" fill="#ffffff" opacity="0.9" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="50" y="62" fontSize="9" textAnchor="middle" fill="#0284c7" fontWeight="bold">SUVKON</text>
          <path d="M 46 66 Q 50 68 54 66" stroke="#0284c7" strokeWidth="1" fill="none" />
          {/* Highlights */}
          <path d="M 38 34 L 38 82" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.75" />
          <circle cx="60" cy="38" r="2" fill="#ffffff" opacity="0.8" />
        </svg>
      )}

      {itemId === 'w-2' && (
        // Apple Core
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
          {/* Stem & Leaf */}
          <path d="M 50 25 Q 52 12 58 10" fill="none" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
          <path d="M 54 16 C 64 12, 68 18, 62 24 C 56 24, 54 20, 54 16 Z" fill="#22c55e" stroke="#15803d" strokeWidth="1.5" />
          {/* Apple Top */}
          <path d="M 32 34 C 36 26, 64 26, 68 34 C 62 40, 38 40, 32 34 Z" fill="#ef4444" stroke="#b91c1c" strokeWidth="2.5" />
          {/* Apple Bottom */}
          <path d="M 34 76 C 38 88, 62 88, 66 76 C 60 70, 40 70, 34 76 Z" fill="#ef4444" stroke="#b91c1c" strokeWidth="2.5" />
          {/* Core Flesh */}
          <path d="M 38 36 C 44 48, 44 64, 38 74 L 62 74 C 56 64, 56 48, 62 36 Z" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
          {/* Seeds */}
          <ellipse cx="48" cy="52" rx="2" ry="4" fill="#451a03" transform="rotate(-15 48 52)" />
          <ellipse cx="52" cy="58" rx="2" ry="4" fill="#451a03" transform="rotate(15 52 58)" />
        </svg>
      )}

      {itemId === 'w-3' && (
        // Old Newspaper & Book
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
          {/* Bottom Newspaper */}
          <rect x="22" y="32" width="56" height="52" rx="4" fill="#f8fafc" stroke="#64748b" strokeWidth="2.5" transform="rotate(-6 50 58)" />
          {/* Top Paper Page */}
          <rect x="26" y="26" width="54" height="52" rx="4" fill="#ffffff" stroke="#475569" strokeWidth="3" transform="rotate(3 50 52)" />
          {/* Headline Bar */}
          <rect x="32" y="34" width="30" height="6" fill="#0f172a" rx="1" transform="rotate(3 50 52)" />
          {/* Picture Box */}
          <rect x="32" y="44" width="18" height="14" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" transform="rotate(3 50 52)" />
          {/* Text lines */}
          <line x1="54" y1="45" x2="72" y2="45" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" transform="rotate(3 50 52)" />
          <line x1="54" y1="51" x2="72" y2="51" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" transform="rotate(3 50 52)" />
          <line x1="54" y1="57" x2="68" y2="57" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" transform="rotate(3 50 52)" />
          <line x1="32" y1="64" x2="72" y2="64" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" transform="rotate(3 50 52)" />
          <line x1="32" y1="70" x2="65" y2="70" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" transform="rotate(3 50 52)" />
        </svg>
      )}

      {itemId === 'w-4' && (
        // Glass Jar
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
          {/* Jar Lid */}
          <rect x="36" y="16" width="28" height="10" rx="3" fill="#e2e8f0" stroke="#64748b" strokeWidth="2.5" />
          <line x1="39" y1="21" x2="61" y2="21" stroke="#94a3b8" strokeWidth="1.5" />
          {/* Glass Jar Body */}
          <path
            d="M 38 26 L 30 36 C 28 42, 28 80, 28 84 C 28 88, 32 90, 38 90 L 62 90 C 68 90, 72 88, 72 84 C 72 80, 72 42, 70 36 L 62 26 Z"
            fill="#e0f2fe"
            fillOpacity="0.85"
            stroke="#0284c7"
            strokeWidth="3"
          />
          {/* Glass Reflections */}
          <path d="M 34 40 L 34 82" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" opacity="0.8" />
          <path d="M 40 42 L 40 76" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
          <circle cx="62" cy="50" r="3" fill="#ffffff" opacity="0.7" />
          <circle cx="60" cy="65" r="2" fill="#ffffff" opacity="0.6" />
        </svg>
      )}

      {itemId === 'w-5' && (
        // AA Battery
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
          {/* Top Pip (+) */}
          <rect x="44" y="12" width="12" height="6" rx="2" fill="#94a3b8" stroke="#475569" strokeWidth="2" />
          {/* Battery Body */}
          <rect x="32" y="18" width="36" height="70" rx="6" fill="#1e293b" stroke="#0f172a" strokeWidth="3" />
          {/* Gold Top Zone */}
          <path d="M 32 24 C 32 20, 36 18, 40 18 L 60 18 C 64 18, 68 20, 68 24 L 68 38 L 32 38 Z" fill="#f59e0b" />
          {/* Plus Sign */}
          <text x="50" y="32" fontSize="14" textAnchor="middle" fill="#78350f" fontWeight="black">+</text>
          {/* Lightning Bolt */}
          <polygon points="52,44 44,56 49,56 47,68 56,54 50,54" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
          {/* Minus Sign */}
          <text x="50" y="80" fontSize="16" textAnchor="middle" fill="#94a3b8" fontWeight="black">-</text>
          {/* Glossy line */}
          <line x1="36" y1="22" x2="36" y2="84" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
        </svg>
      )}

      {itemId === 'w-6' && (
        // Plastic Bag
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
          {/* Handles */}
          <path d="M 34 40 C 34 16, 44 16, 44 40" fill="none" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
          <path d="M 56 40 C 56 16, 66 16, 66 40" fill="none" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
          {/* Bag Body */}
          <path
            d="M 30 40 Q 24 64 26 84 C 27 88, 32 90, 40 88 Q 50 86 60 88 C 68 90, 73 88, 74 84 Q 76 64 70 40 Z"
            fill="#bae6fd"
            fillOpacity="0.85"
            stroke="#0284c7"
            strokeWidth="3"
          />
          {/* Creases */}
          <path d="M 40 44 Q 44 64 42 82" stroke="#38bdf8" strokeWidth="2" fill="none" />
          <path d="M 60 44 Q 56 64 58 82" stroke="#38bdf8" strokeWidth="2" fill="none" />
          <circle cx="50" cy="62" r="8" fill="#ffffff" opacity="0.6" />
          <text x="50" y="66" fontSize="10" textAnchor="middle" fill="#0284c7">♻️</text>
        </svg>
      )}

      {itemId === 'w-7' && (
        // Banana Peel
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
          {/* Stem */}
          <path d="M 50 30 L 50 20" stroke="#713f12" strokeWidth="4" strokeLinecap="round" />
          {/* Central Peel */}
          <path d="M 50 30 Q 54 55 58 85 Q 52 82 48 85 Q 46 55 50 30 Z" fill="#fde047" stroke="#ca8a04" strokeWidth="2.5" />
          {/* Left Flap */}
          <path d="M 48 32 Q 32 46 18 64 Q 28 64 38 52 Q 46 44 48 32 Z" fill="#facc15" stroke="#ca8a04" strokeWidth="2.5" />
          {/* Right Flap */}
          <path d="M 52 32 Q 68 46 82 64 Q 72 64 62 52 Q 54 44 52 32 Z" fill="#eab308" stroke="#ca8a04" strokeWidth="2.5" />
          {/* Brown tips */}
          <circle cx="18" cy="64" r="2.5" fill="#713f12" />
          <circle cx="82" cy="64" r="2.5" fill="#713f12" />
          <circle cx="53" cy="85" r="2.5" fill="#713f12" />
        </svg>
      )}

      {itemId === 'w-8' && (
        // Cardboard Box
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
          {/* 3D Box Main Body */}
          <path d="M 24 44 L 50 56 L 76 44 L 76 74 L 50 86 L 24 74 Z" fill="#d97706" stroke="#92400e" strokeWidth="3" />
          <path d="M 50 56 L 50 86" stroke="#92400e" strokeWidth="2.5" />
          {/* Left Face shading */}
          <path d="M 24 44 L 50 56 L 50 86 L 24 74 Z" fill="#b45309" opacity="0.25" />
          {/* Open Top Flaps */}
          <polygon points="24,44 14,32 40,24 50,36" fill="#f59e0b" stroke="#92400e" strokeWidth="2.5" />
          <polygon points="76,44 86,32 60,24 50,36" fill="#fbbf24" stroke="#92400e" strokeWidth="2.5" />
          {/* Tape stripe */}
          <line x1="38" y1="50" x2="62" y2="50" stroke="#fef3c7" strokeWidth="3" strokeDasharray="3 2" />
          {/* Recycle Stamp */}
          <circle cx="36" cy="64" r="6" fill="#78350f" opacity="0.4" />
          <text x="36" y="67" fontSize="8" textAnchor="middle" fill="#ffffff">♻️</text>
        </svg>
      )}
    </div>
  );
};
