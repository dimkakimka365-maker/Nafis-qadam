import React from 'react';

interface GraphicProps {
  className?: string;
}

export const ShapeGraphics: Record<string, React.FC<GraphicProps>> = {
  // 1. DOIRA (Circle)
  's-circle': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="torusGrad2" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#93C5FD" />
          <stop offset="25%" stopColor="#3B82F6" />
          <stop offset="65%" stopColor="#1D4ED8" />
          <stop offset="90%" stopColor="#1E3A8A" />
          <stop offset="100%" stopColor="#0F172A" />
        </radialGradient>
        <filter id="torusShadow2" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#1E3A8A" floodOpacity="0.4" />
        </filter>
      </defs>
      <ellipse cx="60" cy="102" rx="42" ry="11" fill="#0F172A" fillOpacity="0.25" />
      <circle cx="60" cy="58" r="44" fill="url(#torusGrad2)" filter="url(#torusShadow2)" />
      <circle cx="60" cy="58" r="21" fill="#0F172A" fillOpacity="0.5" />
      <circle cx="60" cy="57" r="20" fill="#E0F2FE" />
      <ellipse cx="60" cy="74" rx="17" ry="4" fill="#93C5FD" fillOpacity="0.6" />
      <path d="M32 40 C40 25, 80 25, 88 40 C80 30, 40 30, 32 40 Z" fill="white" fillOpacity="0.85" />
      <ellipse cx="40" cy="34" rx="8" ry="4" transform="rotate(-25 40 34)" fill="white" fillOpacity="0.95" />
    </svg>
  ),

  // 2. KVADRAT (Square)
  's-square': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sqFront" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="60%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="sqTop" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#6EE7B7" />
          <stop offset="100%" stopColor="#D1FAE5" />
        </linearGradient>
        <filter id="sqShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#064E3B" floodOpacity="0.4" />
        </filter>
      </defs>
      <rect x="22" y="96" width="76" height="14" rx="7" fill="#064E3B" fillOpacity="0.25" />
      <rect x="24" y="24" width="72" height="72" rx="18" fill="url(#sqFront)" filter="url(#sqShadow)" />
      <rect x="28" y="28" width="64" height="64" rx="14" fill="none" stroke="url(#sqTop)" strokeWidth="3" strokeOpacity="0.7" />
      <path d="M28 34 C28 29, 31 26, 36 26 L84 26 C89 26, 92 29, 92 34" stroke="white" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.85" />
      <ellipse cx="40" cy="38" rx="10" ry="5" transform="rotate(-15 40 38)" fill="white" fillOpacity="0.75" />
    </svg>
  ),

  // 3. UCHBURCHAK (Triangle)
  's-triangle': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="triLeft2" x1="20%" y1="20%" x2="80%" y2="90%">
          <stop offset="0%" stopColor="#FCA5A5" />
          <stop offset="40%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#B91C1C" />
        </linearGradient>
        <linearGradient id="triRight2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DC2626" />
          <stop offset="70%" stopColor="#991B1B" />
          <stop offset="100%" stopColor="#450A0A" />
        </linearGradient>
        <filter id="triShadow2" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#7F1D1D" floodOpacity="0.4" />
        </filter>
      </defs>
      <ellipse cx="60" cy="102" rx="42" ry="10" fill="#7F1D1D" fillOpacity="0.25" />
      <path
        d="M60 18 C64 18, 67 21, 69 25 L99 82 C102 87, 98 94, 92 94 L28 94 C22 94, 18 87, 21 82 L51 25 C53 21, 56 18, 60 18 Z"
        fill="url(#triLeft2)"
        filter="url(#triShadow2)"
      />
      <path
        d="M60 20 L60 94 L92 94 C98 94, 102 87, 99 82 L69 25 C67 21, 64 18, 60 20 Z"
        fill="url(#triRight2)"
        fillOpacity="0.75"
      />
      <path d="M60 22 L60 92" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.8" />
      <path d="M52 35 L30 78" stroke="white" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.7" />
      <circle cx="60" cy="24" r="3" fill="white" fillOpacity="0.95" />
    </svg>
  ),

  // 4. TO'G'RI TO'RTBURCHAK (Rectangle)
  's-rectangle': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="recGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
        <filter id="recShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="7" stdDeviation="6" floodColor="#78350F" floodOpacity="0.38" />
        </filter>
      </defs>
      <rect x="18" y="98" width="84" height="12" rx="6" fill="#78350F" fillOpacity="0.25" />
      <rect x="18" y="32" width="84" height="58" rx="14" fill="url(#recGrad)" filter="url(#recShadow)" />
      <rect x="22" y="36" width="76" height="50" rx="10" stroke="#FEF3C7" strokeWidth="2.5" strokeOpacity="0.6" fill="none" />
      <path d="M22 42 C22 38, 25 36, 30 36 L90 36" stroke="white" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.85" />
      <ellipse cx="38" cy="46" rx="12" ry="5" transform="rotate(-10 38 46)" fill="white" fillOpacity="0.75" />
    </svg>
  ),

  // 5. YULDUZCHA (Star)
  's-star': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="starGrad2" cx="45%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="30%" stopColor="#FDE047" />
          <stop offset="70%" stopColor="#EAB308" />
          <stop offset="100%" stopColor="#A16207" />
        </radialGradient>
        <filter id="starShadow2" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="7" stdDeviation="6" floodColor="#713F12" floodOpacity="0.4" />
        </filter>
      </defs>
      <ellipse cx="60" cy="104" rx="38" ry="9" fill="#713F12" fillOpacity="0.25" />
      <path
        d="M60 16 C61.5 16, 64 21, 65.5 24 L72 38 C73.5 41, 78 44, 82 44.5 L97 46.5 C101.5 47, 103 52, 100 55 L88.5 65.5 C85.5 68, 84 73, 85 77 L88 92 C89 96.5, 84.5 100, 81 97.5 L67.5 90 C64 88, 56 88, 52.5 90 L39 97.5 C35.5 100, 31 96.5, 32 92 L35 77 C36 73, 34.5 68, 31.5 65.5 L20 55 C17 52, 18.5 47, 23 46.5 L38 44.5 C42 44, 46.5 41, 48 38 L54.5 24 C56 21, 58.5 16, 60 16 Z"
        fill="url(#starGrad2)"
        filter="url(#starShadow2)"
      />
      <circle cx="60" cy="62" r="6" fill="#FFFBEB" fillOpacity="0.8" />
      <ellipse cx="60" cy="26" rx="4" ry="6" fill="white" fillOpacity="0.9" />
    </svg>
  ),

  // 6. YURAKCHA (Heart)
  's-heart': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="heartGrad2" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#FBCFE8" />
          <stop offset="35%" stopColor="#EC4899" />
          <stop offset="75%" stopColor="#DB2777" />
          <stop offset="100%" stopColor="#831843" />
        </radialGradient>
        <filter id="heartShadow2" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="7" stdDeviation="6" floodColor="#831843" floodOpacity="0.4" />
        </filter>
      </defs>
      <ellipse cx="60" cy="104" rx="38" ry="9" fill="#831843" fillOpacity="0.25" />
      <path
        d="M60 36 C50 18, 20 20, 20 48 C20 74, 52 94, 60 98 C68 94, 100 74, 100 48 C100 20, 70 18, 60 36 Z"
        fill="url(#heartGrad2)"
        filter="url(#heartShadow2)"
      />
      <ellipse cx="40" cy="38" rx="8" ry="4" transform="rotate(-30 40 38)" fill="white" fillOpacity="0.85" />
      <ellipse cx="36" cy="46" rx="4" ry="2" transform="rotate(-30 36 46)" fill="white" fillOpacity="0.7" />
    </svg>
  ),

  // 7. OVAL (Oval)
  's-oval': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="ovalGrad2" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#DDD6FE" />
          <stop offset="35%" stopColor="#8B5CF6" />
          <stop offset="75%" stopColor="#6D28D9" />
          <stop offset="100%" stopColor="#3B0764" />
        </radialGradient>
        <filter id="ovalShadow2" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="7" stdDeviation="6" floodColor="#3B0764" floodOpacity="0.4" />
        </filter>
      </defs>
      <ellipse cx="60" cy="104" rx="36" ry="9" fill="#3B0764" fillOpacity="0.25" />
      <ellipse cx="60" cy="58" rx="36" ry="46" fill="url(#ovalGrad2)" filter="url(#ovalShadow2)" />
      <ellipse cx="50" cy="38" rx="14" ry="7" transform="rotate(-25 50 38)" fill="white" fillOpacity="0.85" />
      <ellipse cx="46" cy="32" rx="6" ry="3" transform="rotate(-25 46 32)" fill="white" fillOpacity="0.95" />
    </svg>
  ),

  // 8. ROMB (Rhombus)
  's-rhombus': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="rhombGrad" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#A5F3FC" />
          <stop offset="35%" stopColor="#06B6D4" />
          <stop offset="75%" stopColor="#0891B2" />
          <stop offset="100%" stopColor="#164E63" />
        </radialGradient>
        <filter id="rhombShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="7" stdDeviation="6" floodColor="#164E63" floodOpacity="0.4" />
        </filter>
      </defs>
      <ellipse cx="60" cy="104" rx="36" ry="8" fill="#164E63" fillOpacity="0.25" />
      <polygon points="60,16 100,58 60,100 20,58" fill="url(#rhombGrad)" filter="url(#rhombShadow)" />
      <polygon points="60,22 92,58 60,94 28,58" stroke="#CFFAFE" strokeWidth="2.5" fill="none" strokeOpacity="0.6" />
      <line x1="60" y1="20" x2="60" y2="96" stroke="white" strokeWidth="2" strokeOpacity="0.5" />
      <line x1="24" y1="58" x2="96" y2="58" stroke="white" strokeWidth="2" strokeOpacity="0.5" />
      <ellipse cx="50" cy="42" rx="10" ry="4" transform="rotate(-30 50 42)" fill="white" fillOpacity="0.85" />
    </svg>
  ),

  // 9. BESBURCHAK (Pentagon)
  's-pentagon': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="pentaGrad2" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#C4B5FD" />
          <stop offset="35%" stopColor="#8B5CF6" />
          <stop offset="75%" stopColor="#6D28D9" />
          <stop offset="100%" stopColor="#4C1D95" />
        </radialGradient>
        <filter id="pentaShadow2" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="7" stdDeviation="6" floodColor="#4C1D95" floodOpacity="0.4" />
        </filter>
      </defs>
      <ellipse cx="60" cy="104" rx="38" ry="9" fill="#4C1D95" fillOpacity="0.25" />
      <polygon points="60,16 102,46 86,94 34,94 18,46" fill="url(#pentaGrad2)" filter="url(#pentaShadow2)" />
      <polygon points="60,22 96,48 82,88 38,88 24,48" stroke="#EDE9FE" strokeWidth="2" fill="none" strokeOpacity="0.6" />
      <ellipse cx="50" cy="36" rx="10" ry="5" transform="rotate(-25 50 36)" fill="white" fillOpacity="0.75" />
    </svg>
  ),

  // 10. OLTIBURCHAK (Hexagon)
  's-hexagon': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="hexaGrad2" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="35%" stopColor="#EAB308" />
          <stop offset="75%" stopColor="#CA8A04" />
          <stop offset="100%" stopColor="#854D0E" />
        </radialGradient>
        <filter id="hexaShadow2" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="7" stdDeviation="6" floodColor="#713F12" floodOpacity="0.38" />
        </filter>
      </defs>
      <ellipse cx="60" cy="104" rx="40" ry="9" fill="#713F12" fillOpacity="0.25" />
      <polygon points="60,15 98,37 98,81 60,103 22,81 22,37" fill="url(#hexaGrad2)" filter="url(#hexaShadow2)" />
      <polygon points="60,21 92,39 92,77 60,95 28,77 28,39" stroke="#FEF9C3" strokeWidth="2" fill="none" strokeOpacity="0.6" />
      <ellipse cx="48" cy="35" rx="10" ry="5" transform="rotate(-20 48 35)" fill="white" fillOpacity="0.8" />
    </svg>
  ),

  // 11. TRAPETSIYA (Trapezoid)
  's-trapezoid': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="trapGrad2" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#99F6E4" />
          <stop offset="35%" stopColor="#14B8A6" />
          <stop offset="75%" stopColor="#0F766E" />
          <stop offset="100%" stopColor="#134E4A" />
        </radialGradient>
        <filter id="trapShadow2" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="7" stdDeviation="6" floodColor="#134E4A" floodOpacity="0.4" />
        </filter>
      </defs>
      <ellipse cx="60" cy="104" rx="42" ry="9" fill="#134E4A" fillOpacity="0.25" />
      <polygon points="35,26 85,26 104,90 16,90" fill="url(#trapGrad2)" filter="url(#trapShadow2)" />
      <ellipse cx="50" cy="40" rx="12" ry="5" fill="white" fillOpacity="0.75" />
    </svg>
  ),

  // 12. SAKKIZBURCHAK (Octagon)
  's-octagon': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="octaGrad" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#FCA5A5" />
          <stop offset="35%" stopColor="#EF4444" />
          <stop offset="75%" stopColor="#B91C1C" />
          <stop offset="100%" stopColor="#7F1D1D" />
        </radialGradient>
        <filter id="octaShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="7" stdDeviation="6" floodColor="#7F1D1D" floodOpacity="0.4" />
        </filter>
      </defs>
      <ellipse cx="60" cy="104" rx="42" ry="9" fill="#7F1D1D" fillOpacity="0.25" />
      <polygon points="40,16 80,16 104,40 104,80 80,104 40,104 16,80 16,40" fill="url(#octaGrad)" filter="url(#octaShadow)" />
      <polygon points="42,20 78,20 100,42 100,78 78,100 42,100 20,78 20,42" stroke="white" strokeWidth="2.5" fill="none" strokeOpacity="0.8" />
      <ellipse cx="48" cy="34" rx="10" ry="4" transform="rotate(-20 48 34)" fill="white" fillOpacity="0.8" />
    </svg>
  ),

  // 13. YARIM DOIRA (Semicircle)
  's-semicircle': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="semiGrad" cx="45%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#FED7AA" />
          <stop offset="35%" stopColor="#FB923C" />
          <stop offset="75%" stopColor="#EA580C" />
          <stop offset="100%" stopColor="#9A3412" />
        </radialGradient>
        <filter id="semiShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="7" stdDeviation="6" floodColor="#9A3412" floodOpacity="0.4" />
        </filter>
      </defs>
      <ellipse cx="60" cy="102" rx="42" ry="9" fill="#9A3412" fillOpacity="0.25" />
      <path d="M16 88 A44 44 0 0 1 104 88 Z" fill="url(#semiGrad)" filter="url(#semiShadow)" />
      <line x1="20" y1="88" x2="100" y2="88" stroke="#FFEDD5" strokeWidth="3" strokeLinecap="round" />
      <path d="M30 65 A36 36 0 0 1 90 65" stroke="white" strokeWidth="2.5" strokeOpacity="0.7" fill="none" />
      <ellipse cx="46" cy="52" rx="10" ry="5" transform="rotate(-30 46 52)" fill="white" fillOpacity="0.85" />
    </svg>
  ),

  // 14. KUB (Cube) - True 3D Isometric Cube
  's-cube': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cubeTop3D" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#93C5FD" />
          <stop offset="100%" stopColor="#60A5FA" />
        </linearGradient>
        <linearGradient id="cubeLeft3D" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
        <linearGradient id="cubeRight3D" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E40AF" />
          <stop offset="100%" stopColor="#172554" />
        </linearGradient>
        <filter id="cube3DShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#172554" floodOpacity="0.45" />
        </filter>
      </defs>
      <ellipse cx="60" cy="106" rx="42" ry="10" fill="#172554" fillOpacity="0.25" />
      {/* Top Face */}
      <polygon points="60,22 96,40 60,58 24,40" fill="url(#cubeTop3D)" filter="url(#cube3DShadow)" />
      {/* Left Face */}
      <polygon points="24,40 60,58 60,98 24,80" fill="url(#cubeLeft3D)" />
      {/* Right Face */}
      <polygon points="60,58 96,40 96,80 60,98" fill="url(#cubeRight3D)" />
      {/* Highlight Edges */}
      <line x1="60" y1="22" x2="60" y2="58" stroke="white" strokeWidth="2.5" strokeOpacity="0.8" />
      <line x1="24" y1="40" x2="60" y2="58" stroke="white" strokeWidth="2.5" strokeOpacity="0.8" />
      <line x1="96" y1="40" x2="60" y2="58" stroke="white" strokeWidth="1.5" strokeOpacity="0.5" />
      <line x1="60" y1="58" x2="60" y2="98" stroke="white" strokeWidth="2.5" strokeOpacity="0.8" />
    </svg>
  ),

  // 15. PIRAMIDA (Pyramid) - True 3D Pyramid
  's-pyramid': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pyrLeft" x1="20%" y1="20%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id="pyrRight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B45309" />
          <stop offset="70%" stopColor="#92400E" />
          <stop offset="100%" stopColor="#451A03" />
        </linearGradient>
        <filter id="pyrShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#451A03" floodOpacity="0.4" />
        </filter>
      </defs>
      <ellipse cx="60" cy="104" rx="44" ry="10" fill="#451A03" fillOpacity="0.25" />
      {/* Left Sunlit Face */}
      <polygon points="60,18 20,86 64,98" fill="url(#pyrLeft)" filter="url(#pyrShadow)" />
      {/* Right Shaded Face */}
      <polygon points="60,18 64,98 102,82" fill="url(#pyrRight)" />
      {/* Center Spine Ridge Highlight */}
      <line x1="60" y1="18" x2="64" y2="98" stroke="#FEF3C7" strokeWidth="3" strokeLinecap="round" />
      {/* Apex Sunlit Gleam */}
      <circle cx="60" cy="20" r="3.5" fill="white" />
    </svg>
  ),

  // 16. SILINDR (Cylinder) - True 3D Cylinder
  's-cylinder': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cylGrad3D" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4338CA" />
          <stop offset="25%" stopColor="#6366F1" />
          <stop offset="60%" stopColor="#C7D2FE" />
          <stop offset="85%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#3730A3" />
        </linearGradient>
        <filter id="cylShadow3D" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="7" stdDeviation="6" floodColor="#312E81" floodOpacity="0.4" />
        </filter>
      </defs>
      <ellipse cx="60" cy="104" rx="38" ry="9" fill="#312E81" fillOpacity="0.25" />
      <rect x="25" y="32" width="70" height="58" fill="url(#cylGrad3D)" filter="url(#cylShadow3D)" />
      <ellipse cx="60" cy="90" rx="35" ry="14" fill="#4338CA" />
      <ellipse cx="60" cy="32" rx="35" ry="14" fill="#E0E7FF" stroke="#EEF2FF" strokeWidth="2" />
      <ellipse cx="52" cy="28" rx="10" ry="4" fill="white" fillOpacity="0.85" />
    </svg>
  ),

  // 17. KONUS (Cone) - True 3D Cone
  's-cone': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="coneGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#BE185D" />
          <stop offset="35%" stopColor="#EC4899" />
          <stop offset="65%" stopColor="#FCE7F3" />
          <stop offset="85%" stopColor="#DB2777" />
          <stop offset="100%" stopColor="#9D174D" />
        </linearGradient>
        <filter id="coneShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="7" stdDeviation="6" floodColor="#831843" floodOpacity="0.4" />
        </filter>
      </defs>
      <ellipse cx="60" cy="102" rx="40" ry="9" fill="#831843" fillOpacity="0.25" />
      {/* Cone Body */}
      <path d="M60 18 L22 86 C22 96, 98 96, 98 86 Z" fill="url(#coneGrad)" filter="url(#coneShadow)" />
      {/* Base Ellipse Rim */}
      <ellipse cx="60" cy="86" rx="38" ry="12" fill="#DB2777" />
      <ellipse cx="60" cy="86" rx="38" ry="12" fill="none" stroke="#FCE7F3" strokeWidth="1.5" strokeOpacity="0.6" />
      {/* Highlight Ray */}
      <line x1="60" y1="18" x2="68" y2="86" stroke="white" strokeWidth="3" strokeOpacity="0.8" strokeLinecap="round" />
      <circle cx="60" cy="20" r="3" fill="white" />
    </svg>
  ),

  // 18. SFERA / SHAR (Sphere) - True 3D Glossy Sphere
  's-sphere': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sphereGrad3D" cx="38%" cy="32%" r="62%">
          <stop offset="0%" stopColor="#A5F3FC" />
          <stop offset="25%" stopColor="#22D3EE" />
          <stop offset="65%" stopColor="#0891B2" />
          <stop offset="90%" stopColor="#164E63" />
          <stop offset="100%" stopColor="#083344" />
        </radialGradient>
        <radialGradient id="sphereBounce" cx="65%" cy="85%" r="35%">
          <stop offset="0%" stopColor="#67E8F9" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#0891B2" stopOpacity="0" />
        </radialGradient>
        <filter id="sphereShadow3D" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#083344" floodOpacity="0.45" />
        </filter>
      </defs>
      <ellipse cx="60" cy="104" rx="42" ry="10" fill="#083344" fillOpacity="0.3" />
      <circle cx="60" cy="56" r="44" fill="url(#sphereGrad3D)" filter="url(#sphereShadow3D)" />
      <circle cx="60" cy="56" r="44" fill="url(#sphereBounce)" />
      <ellipse cx="46" cy="38" rx="14" ry="8" transform="rotate(-30 46 38)" fill="white" fillOpacity="0.85" />
      <ellipse cx="42" cy="32" rx="6" ry="3.5" transform="rotate(-30 42 32)" fill="white" fillOpacity="0.95" />
    </svg>
  ),
};
