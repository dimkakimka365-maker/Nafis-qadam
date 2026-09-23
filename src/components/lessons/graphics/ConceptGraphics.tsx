import React from 'react';

interface GraphicProps {
  className?: string;
}

export const ConceptGraphics: Record<string, React.FC<GraphicProps>> = {
  // ----------------------------------------------------
  // KITOB (Book) - Open 3D glowing magical book
  // ----------------------------------------------------
  'w-kitob': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bookCover" cx="40%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="70%" stopColor="#1D4ED8" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="106" rx="42" ry="8" fill="#1E3A8A" fillOpacity="0.25" />
      {/* Book Cover Base */}
      <path d="M12 78 Q60 88 60 88 Q60 88 108 78 L104 88 Q60 98 60 98 Q60 98 16 88 Z" fill="url(#bookCover)" />
      {/* Left Pages */}
      <path d="M18 42 Q58 50 58 84 Q38 80 18 74 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
      <path d="M22 45 Q56 52 56 82 Q38 78 22 72 Z" fill="#F8FAFC" />
      {/* Text lines on left page */}
      <line x1="26" y1="52" x2="50" y2="55" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
      <line x1="26" y1="58" x2="48" y2="61" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
      <line x1="26" y1="64" x2="46" y2="67" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
      {/* Right Pages */}
      <path d="M102 42 Q62 50 62 84 Q82 80 102 74 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
      <path d="M98 45 Q64 52 64 82 Q82 78 98 72 Z" fill="#F8FAFC" />
      {/* Text lines on right page */}
      <line x1="70" y1="55" x2="94" y2="52" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
      <line x1="72" y1="61" x2="94" y2="58" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
      <line x1="74" y1="67" x2="94" y2="64" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
      {/* Golden Bookmark Ribbon */}
      <path d="M60 48 L60 88 L64 84 L68 88 L68 50 Z" fill="#F59E0B" />
      {/* Sparkles */}
      <text x="52" y="32" fontSize="16" fill="#FACC15">✨</text>
    </svg>
  ),

  // ----------------------------------------------------
  // MAKTAB (School) - Cheerful school building with clock
  // ----------------------------------------------------
  'w-maktab': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="106" rx="44" ry="8" fill="#0F172A" fillOpacity="0.2" />
      {/* Main Building Facade */}
      <rect x="22" y="52" width="76" height="52" rx="4" fill="#FDE047" stroke="#EAB308" strokeWidth="2" />
      {/* Red Pitched Roof */}
      <polygon points="16,52 60,20 104,52" fill="#EF4444" />
      {/* Clock Tower / Belfry */}
      <rect x="48" y="24" width="24" height="24" fill="#FFFFFF" stroke="#DC2626" strokeWidth="2" />
      {/* Clock Face */}
      <circle cx="60" cy="36" r="8" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.5" />
      <line x1="60" y1="36" x2="60" y2="31" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="60" y1="36" x2="64" y2="36" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" />
      {/* School Flag */}
      <line x1="60" y1="20" x2="60" y2="8" stroke="#64748B" strokeWidth="2" />
      <polygon points="60,8 72,13 60,18" fill="#3B82F6" />
      {/* Windows */}
      <rect x="30" y="62" width="14" height="16" rx="2" fill="#60A5FA" stroke="#1E40AF" strokeWidth="1.5" />
      <line x1="37" y1="62" x2="37" y2="78" stroke="#FFFFFF" strokeWidth="1" />
      <line x1="30" y1="70" x2="44" y2="70" stroke="#FFFFFF" strokeWidth="1" />
      <rect x="76" y="62" width="14" height="16" rx="2" fill="#60A5FA" stroke="#1E40AF" strokeWidth="1.5" />
      <line x1="83" y1="62" x2="83" y2="78" stroke="#FFFFFF" strokeWidth="1" />
      <line x1="76" y1="70" x2="90" y2="70" stroke="#FFFFFF" strokeWidth="1" />
      {/* Front Entrance Door */}
      <rect x="52" y="78" width="16" height="26" rx="2" fill="#92400E" />
      <circle cx="64" cy="92" r="2" fill="#FACC15" />
    </svg>
  ),

  // ----------------------------------------------------
  // QALAM (Pencil) - Yellow hexagon pencil with pink eraser
  // ----------------------------------------------------
  'w-qalam': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pencilShaft" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FACC15" />
          <stop offset="50%" stopColor="#EAB308" />
          <stop offset="100%" stopColor="#CA8A04" />
        </linearGradient>
      </defs>
      <ellipse cx="60" cy="106" rx="36" ry="7" fill="#713F12" fillOpacity="0.2" />
      {/* Angled Pencil */}
      <g transform="rotate(45 60 60)">
        {/* Pink Rubber Eraser */}
        <rect x="50" y="16" width="20" height="18" rx="4" fill="#F472B6" />
        {/* Silver Ferrule Band */}
        <rect x="50" y="32" width="20" height="10" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1" />
        <line x1="50" y1="37" x2="70" y2="37" stroke="#64748B" strokeWidth="1" />
        {/* Yellow Pencil Wood Shaft */}
        <rect x="50" y="42" width="20" height="46" fill="url(#pencilShaft)" />
        <line x1="57" y1="42" x2="57" y2="88" stroke="#FDE047" strokeWidth="1.5" />
        <line x1="64" y1="42" x2="64" y2="88" stroke="#A16207" strokeWidth="1.5" />
        {/* Sharpened Wood Cone Tip */}
        <polygon points="50,88 70,88 60,108" fill="#FED7AA" />
        {/* Graphite Lead Tip */}
        <polygon points="56,98 64,98 60,108" fill="#1E293B" />
      </g>
    </svg>
  ),

  // ----------------------------------------------------
  // DO'STLIK (Friendship) - High-five / Hug with glowing heart
  // ----------------------------------------------------
  'w-dostlik': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="heartGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FDA4AF" />
          <stop offset="60%" stopColor="#F43F5E" />
          <stop offset="100%" stopColor="#BE123C" />
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="106" rx="40" ry="8" fill="#BE123C" fillOpacity="0.2" />
      {/* Big Radiant Heart between them */}
      <path d="M60 40 C60 26 40 24 40 38 C40 54 60 68 60 68 C60 68 80 54 80 38 C80 24 60 26 60 40 Z" fill="url(#heartGrad)" />
      {/* Left Friend (Boy) */}
      <circle cx="36" cy="54" r="16" fill="#FED7AA" />
      <path d="M22 52 C22 38 48 38 48 48" fill="#78350F" />
      <circle cx="32" cy="54" r="2.5" fill="#0F172A" />
      <circle cx="42" cy="54" r="2.5" fill="#0F172A" />
      <path d="M34 60 Q37 64 40 60" stroke="#0F172A" strokeWidth="1.5" fill="none" />
      <path d="M20 102 C20 80 50 80 50 102 Z" fill="#3B82F6" />
      {/* Right Friend (Girl) */}
      <circle cx="84" cy="54" r="16" fill="#FED7AA" />
      <path d="M70 52 C70 38 98 38 98 52 Z" fill="#F59E0B" />
      <circle cx="70" cy="46" r="4" fill="#F59E0B" />
      <circle cx="98" cy="46" r="4" fill="#F59E0B" />
      <circle cx="78" cy="54" r="2.5" fill="#0F172A" />
      <circle cx="88" cy="54" r="2.5" fill="#0F172A" />
      <path d="M80 60 Q83 64 86 60" stroke="#0F172A" strokeWidth="1.5" fill="none" />
      <path d="M70 102 C70 80 100 80 100 102 Z" fill="#EC4899" />
    </svg>
  ),

  // ----------------------------------------------------
  // QUYOSH (Sun) - Radiant glowing 3D sun with joyful smile
  // ----------------------------------------------------
  'w-quyosh': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sunCore" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="50%" stopColor="#FACC15" />
          <stop offset="100%" stopColor="#EA580C" />
        </radialGradient>
      </defs>
      {/* 12 Radiant Triangular Beams */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
        <polygon
          key={i}
          points="56,12 64,12 60,0"
          fill="#F59E0B"
          transform={`rotate(${deg} 60 60)`}
        />
      ))}
      {/* Golden Round Smiling Face */}
      <circle cx="60" cy="60" r="38" fill="url(#sunCore)" stroke="#F59E0B" strokeWidth="2" />
      {/* Rosy Cheeks */}
      <ellipse cx="44" cy="66" rx="6" ry="3" fill="#FB7185" />
      <ellipse cx="76" cy="66" rx="6" ry="3" fill="#FB7185" />
      {/* Joyful Eyes */}
      <path d="M42 54 Q48 48 54 54" stroke="#78350F" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <path d="M66 54 Q72 48 78 54" stroke="#78350F" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      {/* Warm Smile */}
      <path d="M48 68 Q60 80 72 68" stroke="#78350F" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    </svg>
  ),

  // ----------------------------------------------------
  // O'QITUVCHI (Teacher) - Friendly teacher with glasses and pointer
  // ----------------------------------------------------
  'w-oqituvchi': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Green Blackboard */}
      <rect x="15" y="25" width="90" height="55" rx="4" fill="#14532D" stroke="#78350F" strokeWidth="4" />
      <text x="24" y="45" fontSize="11" fill="#FEF08A" fontWeight="bold">A B C 1 2 3</text>
      <text x="24" y="62" fontSize="9" fill="#86EFAC">✨ Ilm — baxt</text>
      {/* Teacher Head & Glasses */}
      <circle cx="60" cy="68" r="18" fill="#FED7AA" />
      <path d="M42 66 C42 46 78 46 78 66 Z" fill="#78350F" />
      {/* Glasses */}
      <circle cx="53" cy="68" r="5" fill="none" stroke="#0F172A" strokeWidth="1.5" />
      <circle cx="67" cy="68" r="5" fill="none" stroke="#0F172A" strokeWidth="1.5" />
      <line x1="58" y1="68" x2="62" y2="68" stroke="#0F172A" strokeWidth="1.5" />
      <circle cx="53" cy="68" r="1.5" fill="#0F172A" />
      <circle cx="67" cy="68" r="1.5" fill="#0F172A" />
      {/* Smile */}
      <path d="M56 76 Q60 80 64 76" stroke="#9A3412" strokeWidth="1.5" fill="none" />
      {/* Professional Suit */}
      <path d="M38 108 C38 88 82 88 82 108 Z" fill="#0284C7" />
    </svg>
  ),

  // ----------------------------------------------------
  // KOSMONAVT (Astronaut) - Shiny space helmet with gold visor
  // ----------------------------------------------------
  'w-kosmonavt': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="visorGold" cx="40%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#78350F" />
        </radialGradient>
      </defs>
      {/* Deep Space Background Stars */}
      <circle cx="20" cy="30" r="1.5" fill="#FFFFFF" />
      <circle cx="100" cy="25" r="2" fill="#FDE047" />
      <circle cx="95" cy="80" r="1.5" fill="#FFFFFF" />
      {/* Suit Shoulders */}
      <path d="M28 108 C28 85 92 85 92 108 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="3" />
      <rect x="52" y="90" width="16" height="8" rx="2" fill="#3B82F6" />
      {/* White Helmet */}
      <circle cx="60" cy="54" r="34" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
      {/* Gold Reflective Visor */}
      <ellipse cx="60" cy="54" rx="24" ry="18" fill="url(#visorGold)" stroke="#1E293B" strokeWidth="2" />
      {/* White Specular Glare Reflection on Visor */}
      <path d="M46 44 Q56 40 68 44" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  ),

  // ----------------------------------------------------
  // SAMOLYOT (Airplane) - Sleek jet banking in blue sky
  // ----------------------------------------------------
  'w-samolyot': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Fluffy Clouds */}
      <circle cx="30" cy="85" r="14" fill="#E2E8F0" fillOpacity="0.8" />
      <circle cx="45" cy="80" r="18" fill="#F1F5F9" fillOpacity="0.8" />
      <circle cx="65" cy="85" r="16" fill="#E2E8F0" fillOpacity="0.8" />
      {/* Airplane Fuselage */}
      <g transform="rotate(-25 60 60)">
        <ellipse cx="60" cy="60" rx="38" ry="12" fill="#FFFFFF" stroke="#3B82F6" strokeWidth="2" />
        {/* Cockpit Window */}
        <path d="M84 56 Q94 60 84 64 Z" fill="#0284C7" />
        {/* Passenger Windows */}
        <circle cx="70" cy="60" r="2.5" fill="#38BDF8" />
        <circle cx="60" cy="60" r="2.5" fill="#38BDF8" />
        <circle cx="50" cy="60" r="2.5" fill="#38BDF8" />
        <circle cx="40" cy="60" r="2.5" fill="#38BDF8" />
        {/* Wings */}
        <polygon points="50,60 30,22 45,22 66,60" fill="#2563EB" />
        <polygon points="50,60 30,98 45,98 66,60" fill="#1D4ED8" />
        {/* Tail Fin */}
        <polygon points="26,60 14,40 24,40 32,60" fill="#DC2626" />
      </g>
    </svg>
  ),

  // ----------------------------------------------------
  // ASTRONOMIYA (Astronomy) - Brass telescope pointed at stars
  // ----------------------------------------------------
  'w-astronomiya': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Crescent Moon & Stars in corner */}
      <path d="M96 20 C90 20 84 26 84 34 C84 42 90 48 96 48 C91 48 87 40 88 34 C89 28 92 22 96 20 Z" fill="#FACC15" />
      <polygon points="76,18 78,22 82,22 79,25 80,29 76,26 72,29 73,25 70,22 74,22" fill="#FDE047" />
      {/* Tripod Stand */}
      <line x1="55" y1="70" x2="35" y2="108" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
      <line x1="55" y1="70" x2="55" y2="108" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
      <line x1="55" y1="70" x2="75" y2="108" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
      {/* Telescope Tube (angled upwards) */}
      <g transform="rotate(-35 55 60)">
        <rect x="25" y="52" width="60" height="16" rx="4" fill="#0284C7" stroke="#0369A1" strokeWidth="2" />
        <rect x="75" y="50" width="16" height="20" rx="3" fill="#F59E0B" />
        <rect x="18" y="55" width="10" height="10" rx="2" fill="#F59E0B" />
      </g>
    </svg>
  ),

  // ----------------------------------------------------
  // KAMALAK (Rainbow) - 7 vibrant arched colors between clouds
  // ----------------------------------------------------
  'w-kamalak': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Arched Rainbow Bands */}
      <path d="M20 90 A45 45 0 0 1 100 90" stroke="#EF4444" strokeWidth="6" fill="none" />
      <path d="M24 90 A41 41 0 0 1 96 90" stroke="#F97316" strokeWidth="6" fill="none" />
      <path d="M28 90 A37 37 0 0 1 92 90" stroke="#FACC15" strokeWidth="6" fill="none" />
      <path d="M32 90 A33 33 0 0 1 88 90" stroke="#22C55E" strokeWidth="6" fill="none" />
      <path d="M36 90 A29 29 0 0 1 84 90" stroke="#3B82F6" strokeWidth="6" fill="none" />
      <path d="M40 90 A25 25 0 0 1 80 90" stroke="#8B5CF6" strokeWidth="6" fill="none" />
      {/* Left Fluffy White Cloud */}
      <circle cx="24" cy="90" r="14" fill="#FFFFFF" />
      <circle cx="36" cy="85" r="16" fill="#FFFFFF" />
      <circle cx="16" cy="94" r="10" fill="#FFFFFF" />
      {/* Right Fluffy White Cloud */}
      <circle cx="96" cy="90" r="14" fill="#FFFFFF" />
      <circle cx="84" cy="85" r="16" fill="#FFFFFF" />
      <circle cx="104" cy="94" r="10" fill="#FFFFFF" />
    </svg>
  ),

  // ----------------------------------------------------
  // KAPALAK (Butterfly) - Symmetrical vibrant monarch wings
  // ----------------------------------------------------
  'w-kapalak': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="butterWingL" cx="60%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#F43F5E" />
          <stop offset="60%" stopColor="#FB923C" />
          <stop offset="100%" stopColor="#FBBF24" />
        </radialGradient>
      </defs>
      {/* Top Left Wing */}
      <path d="M60 55 C45 20 10 20 18 55 C22 70 50 65 60 55 Z" fill="url(#butterWingL)" stroke="#18181B" strokeWidth="2" />
      <circle cx="32" cy="38" r="4" fill="#FFFFFF" />
      <circle cx="24" cy="50" r="3" fill="#FFFFFF" />
      {/* Top Right Wing */}
      <path d="M60 55 C75 20 110 20 102 55 C98 70 70 65 60 55 Z" fill="url(#butterWingL)" stroke="#18181B" strokeWidth="2" />
      <circle cx="88" cy="38" r="4" fill="#FFFFFF" />
      <circle cx="96" cy="50" r="3" fill="#FFFFFF" />
      {/* Bottom Left Wing */}
      <path d="M60 65 C45 65 24 75 32 94 C42 105 58 85 60 65 Z" fill="#FB923C" stroke="#18181B" strokeWidth="2" />
      {/* Bottom Right Wing */}
      <path d="M60 65 C75 65 96 75 88 94 C78 105 62 85 60 65 Z" fill="#FB923C" stroke="#18181B" strokeWidth="2" />
      {/* Slender Body & Antennae */}
      <rect x="58" y="44" width="4" height="40" rx="2" fill="#18181B" />
      <circle cx="60" cy="42" r="4" fill="#18181B" />
      <path d="M58 38 Q50 26 44 28" stroke="#18181B" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M62 38 Q70 26 76 28" stroke="#18181B" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  ),

  // ----------------------------------------------------
  // SAYYORA (Planet) - Ringed Saturn planet in cosmos
  // ----------------------------------------------------
  'w-sayyora': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="planetGrad" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="50%" stopColor="#EA580C" />
          <stop offset="100%" stopColor="#7C2D12" />
        </radialGradient>
      </defs>
      {/* Cosmic Ring Back */}
      <ellipse cx="60" cy="60" rx="55" ry="18" transform="rotate(-25 60 60)" stroke="#FDE68A" strokeWidth="8" strokeOpacity="0.4" fill="none" />
      {/* Spherical Planet */}
      <circle cx="60" cy="60" r="32" fill="url(#planetGrad)" />
      {/* Planet Surface Atmospheric Stripes */}
      <path d="M34 52 Q60 65 86 52" stroke="#FED7AA" strokeWidth="3" strokeOpacity="0.7" fill="none" />
      <path d="M32 64 Q60 77 88 64" stroke="#9A3412" strokeWidth="4" strokeOpacity="0.8" fill="none" />
      {/* Cosmic Ring Front */}
      <path d="M12 78 C25 95 85 68 108 42" stroke="#FBBF24" strokeWidth="7" strokeLinecap="round" fill="none" />
    </svg>
  ),

  // ----------------------------------------------------
  // SHARSHARA (Waterfall) - Cascading turquoise water
  // ----------------------------------------------------
  'w-sharshara': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Cliffs on sides */}
      <polygon points="10,20 40,30 35,105 10,105" fill="#334155" />
      <polygon points="110,20 80,30 85,105 110,105" fill="#334155" />
      {/* Green moss on rocks */}
      <ellipse cx="25" cy="40" rx="10" ry="6" fill="#16A34A" />
      <ellipse cx="95" cy="50" rx="10" ry="6" fill="#16A34A" />
      {/* Cascading Water Fall */}
      <rect x="35" y="25" width="50" height="70" rx="4" fill="#38BDF8" />
      <line x1="45" y1="28" x2="45" y2="92" stroke="#FFFFFF" strokeWidth="2.5" strokeDasharray="6 3" />
      <line x1="60" y1="26" x2="60" y2="94" stroke="#FFFFFF" strokeWidth="3" strokeDasharray="8 4" />
      <line x1="75" y1="28" x2="75" y2="92" stroke="#FFFFFF" strokeWidth="2.5" strokeDasharray="6 3" />
      {/* Foamy Misty Pool Base */}
      <ellipse cx="60" cy="98" rx="48" ry="12" fill="#E0F2FE" />
      <ellipse cx="60" cy="96" rx="40" ry="8" fill="#FFFFFF" />
    </svg>
  ),

  // ----------------------------------------------------
  // VULQON (Volcano) - Fiery glowing red lava
  // ----------------------------------------------------
  'w-vulqon': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="106" rx="46" ry="8" fill="#1C1917" fillOpacity="0.3" />
      {/* Smoke plume */}
      <circle cx="50" cy="22" r="12" fill="#78716C" fillOpacity="0.6" />
      <circle cx="68" cy="18" r="14" fill="#78716C" fillOpacity="0.7" />
      <circle cx="60" cy="28" r="10" fill="#A8A29E" fillOpacity="0.8" />
      {/* Mountain Body */}
      <polygon points="18,102 46,45 74,45 102,102" fill="#44403C" />
      {/* Crater Caldera */}
      <ellipse cx="60" cy="45" rx="14" ry="6" fill="#DC2626" />
      {/* Fiery Lava Rivers Cascading Down */}
      <path d="M52 48 Q50 68 44 85 Q40 98 38 102" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M52 48 Q50 68 44 85 Q40 98 38 102" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M64 48 Q68 65 72 82 Q76 96 78 102" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M64 48 Q68 65 72 82 Q76 96 78 102" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  ),

  // ----------------------------------------------------
  // OKEAN (Ocean) - Deep rolling waves with rising sun
  // ----------------------------------------------------
  'w-okean': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Rising Sun */}
      <circle cx="60" cy="55" r="22" fill="#FACC15" />
      {/* Back Wave */}
      <path d="M10 70 Q35 55 60 70 T110 70 L110 110 L10 110 Z" fill="#0284C7" />
      {/* Mid Wave */}
      <path d="M10 80 Q35 68 60 80 T110 80 L110 110 L10 110 Z" fill="#0369A1" />
      {/* Front Cresting Wave */}
      <path d="M10 92 Q35 80 60 92 T110 92 L110 110 L10 110 Z" fill="#075985" />
      <path d="M10 92 Q35 80 60 92 T110 92" stroke="#FFFFFF" strokeWidth="3" fill="none" />
    </svg>
  ),

  // ----------------------------------------------------
  // VATAN (Homeland) - Beautiful dome & minaret in morning sun
  // ----------------------------------------------------
  'w-vatan': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Sunshine Rays */}
      <circle cx="60" cy="50" r="38" fill="#FEF08A" fillOpacity="0.4" />
      {/* Traditional Turquoise Mosaic Dome */}
      <path d="M40 70 C40 38 80 38 80 70 Z" fill="#06B6D4" stroke="#0891B2" strokeWidth="2" />
      <polygon points="60,32 63,38 57,38" fill="#F59E0B" />
      {/* Building Base */}
      <rect x="36" y="70" width="48" height="35" fill="#FED7AA" stroke="#FDBA74" strokeWidth="2" />
      <path d="M50 105 L50 85 C50 78 70 78 70 85 L70 105 Z" fill="#0891B2" />
      {/* Elegant Minaret on Left */}
      <rect x="22" y="45" width="10" height="60" fill="#FED7AA" />
      <polygon points="20,45 34,45 27,30" fill="#06B6D4" />
    </svg>
  ),

  // ----------------------------------------------------
  // OILA (Family) - Cozy loving family under roof
  // ----------------------------------------------------
  'w-oila': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Cozy Roof sheltering them */}
      <polygon points="60,18 16,50 24,50 60,24 96,50 104,50" fill="#EF4444" />
      {/* Glowing Heart above */}
      <path d="M60 40 C60 30 46 28 46 38 C46 50 60 58 60 58 C60 58 74 50 74 38 C74 28 60 30 60 40 Z" fill="#F43F5E" />
      {/* Father */}
      <circle cx="38" cy="65" r="11" fill="#FED7AA" />
      <path d="M28 62 C28 52 48 52 48 62 Z" fill="#1E293B" />
      <path d="M26 102 C26 84 50 84 50 102 Z" fill="#3B82F6" />
      {/* Mother */}
      <circle cx="82" cy="65" r="11" fill="#FED7AA" />
      <path d="M72 62 C72 50 92 50 92 62 Z" fill="#78350F" />
      <path d="M70 102 C70 84 94 84 94 102 Z" fill="#EC4899" />
      {/* Child */}
      <circle cx="60" cy="78" r="9" fill="#FED7AA" />
      <path d="M52 76 C52 68 68 68 68 76 Z" fill="#B45309" />
      <path d="M50 102 C50 90 70 90 70 102 Z" fill="#FACC15" />
    </svg>
  ),

  // ----------------------------------------------------
  // ODOB (Good Manners) - Polite child with hand on chest greeting
  // ----------------------------------------------------
  'w-odob': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="48" fill="#ECFDF5" />
      {/* Polite Child Head */}
      <circle cx="60" cy="46" r="20" fill="#FED7AA" />
      <path d="M40 44 C40 26 80 26 80 44 Z" fill="#78350F" />
      <circle cx="53" cy="46" r="2.5" fill="#0F172A" />
      <circle cx="67" cy="46" r="2.5" fill="#0F172A" />
      <path d="M55 54 Q60 58 65 54" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Hand on heart/chest in respectful Uzbek greeting "Assalomu alaykum" */}
      <path d="M36 104 C36 82 84 82 84 104 Z" fill="#10B981" />
      <ellipse cx="60" cy="88" rx="8" ry="6" fill="#FED7AA" />
      <text x="52" y="24" fontSize="16">🌸</text>
    </svg>
  ),

  // ----------------------------------------------------
  // TINCHLIK (Peace) - White peace dove with laurel
  // ----------------------------------------------------
  'w-tinchlik': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="48" fill="#E0F2FE" />
      {/* Wings */}
      <path d="M60 55 Q35 25 20 40 Q40 60 54 62 Z" fill="#FFFFFF" />
      <path d="M60 55 Q85 25 100 40 Q80 60 66 62 Z" fill="#F8FAFC" />
      {/* Dove Body */}
      <ellipse cx="60" cy="65" rx="20" ry="22" fill="#FFFFFF" />
      <circle cx="60" cy="40" r="13" fill="#FFFFFF" />
      <circle cx="56" cy="38" r="2" fill="#0F172A" />
      <polygon points="58,43 62,43 60,49" fill="#F59E0B" />
      {/* Green Olive Branch */}
      <path d="M60 46 Q74 42 80 50" stroke="#16A34A" strokeWidth="2.5" fill="none" />
      <circle cx="78" cy="46" r="3" fill="#22C55E" />
      <circle cx="72" cy="42" r="3" fill="#22C55E" />
    </svg>
  ),

  // ----------------------------------------------------
  // MUHANDIS (Engineer) - Yellow safety helmet & gear
  // ----------------------------------------------------
  'w-muhandis': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Industrial Gear in background */}
      <circle cx="60" cy="60" r="40" stroke="#94A3B8" strokeWidth="8" strokeDasharray="14 12" fill="none" />
      <circle cx="60" cy="60" r="24" fill="#F1F5F9" />
      {/* Bright Yellow Hardhat Helmet */}
      <path d="M26 62 C26 34 94 34 94 62 Z" fill="#FACC15" stroke="#EAB308" strokeWidth="2" />
      <rect x="22" y="62" width="76" height="8" rx="4" fill="#EAB308" />
      <rect x="54" y="36" width="12" height="26" rx="3" fill="#FDE047" />
      {/* Blueprint Ruler */}
      <rect x="35" y="80" width="50" height="12" rx="2" fill="#3B82F6" />
      <line x1="42" y1="80" x2="42" y2="86" stroke="#FFFFFF" strokeWidth="1.5" />
      <line x1="50" y1="80" x2="50" y2="88" stroke="#FFFFFF" strokeWidth="1.5" />
      <line x1="58" y1="80" x2="58" y2="86" stroke="#FFFFFF" strokeWidth="1.5" />
      <line x1="66" y1="80" x2="66" y2="88" stroke="#FFFFFF" strokeWidth="1.5" />
      <line x1="74" y1="80" x2="74" y2="86" stroke="#FFFFFF" strokeWidth="1.5" />
    </svg>
  ),

  // ----------------------------------------------------
  // DONOLIK (Wisdom) - Graduation cap on gold books
  // ----------------------------------------------------
  'w-donolik': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="106" rx="42" ry="8" fill="#0F172A" fillOpacity="0.25" />
      {/* Stack of books below */}
      <rect x="24" y="82" width="72" height="12" rx="3" fill="#DC2626" />
      <rect x="28" y="84" width="64" height="8" rx="2" fill="#FEF2F2" />
      <rect x="20" y="94" width="80" height="12" rx="3" fill="#2563EB" />
      <rect x="24" y="96" width="72" height="8" rx="2" fill="#EFF6FF" />
      {/* Graduation Cap (Mortarboard) */}
      <polygon points="60,25 106,45 60,65 14,45" fill="#1E293B" />
      <path d="M38 56 L38 68 C38 78 82 78 82 68 L82 56 Z" fill="#0F172A" />
      {/* Golden Tassel */}
      <circle cx="60" cy="45" r="3" fill="#F59E0B" />
      <path d="M60 45 L88 56 L88 72" stroke="#F59E0B" strokeWidth="2.5" fill="none" />
      <rect x="85" y="70" width="6" height="8" rx="2" fill="#F59E0B" />
    </svg>
  ),

  // ----------------------------------------------------
  // SAXOVAT (Generosity) - Hands offering a glowing heart/gift
  // ----------------------------------------------------
  'w-saxovat': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Golden Glow */}
      <circle cx="60" cy="45" r="28" fill="#FEF08A" fillOpacity="0.5" />
      {/* Glowing Gift Heart */}
      <path d="M60 30 C60 16 42 14 42 26 C42 40 60 52 60 52 C60 52 78 40 78 26 C78 14 60 16 60 30 Z" fill="#EF4444" />
      {/* Two open, offering hands */}
      <path d="M18 95 Q38 80 50 78 Q56 86 48 94 Q36 98 22 104 Z" fill="#FED7AA" stroke="#FDBA74" strokeWidth="2" />
      <path d="M102 95 Q82 80 70 78 Q64 86 72 94 Q84 98 98 104 Z" fill="#FED7AA" stroke="#FDBA74" strokeWidth="2" />
      <text x="52" y="22" fontSize="16">✨</text>
    </svg>
  ),

  // ----------------------------------------------------
  // MA'RIFAT (Enlightenment) - Radiant golden lantern
  // ----------------------------------------------------
  'w-marifat': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Beaming Beams of Light */}
      <circle cx="60" cy="62" r="44" fill="#FEF08A" fillOpacity="0.35" />
      {/* Lantern Top Loop & Cap */}
      <circle cx="60" cy="18" r="8" fill="none" stroke="#D97706" strokeWidth="3" />
      <polygon points="40,36 80,36 68,26 52,26" fill="#B45309" />
      {/* Glass Chamber with Burning Candle Flame */}
      <rect x="42" y="36" width="36" height="46" rx="4" fill="#FEF3C7" stroke="#92400E" strokeWidth="3" />
      {/* Candle Flame */}
      <path d="M60 50 C54 62 66 62 60 50 Z" fill="#F97316" />
      <circle cx="60" cy="64" r="5" fill="#EF4444" />
      <circle cx="60" cy="64" r="2.5" fill="#FDE047" />
      {/* Lantern Base */}
      <rect x="36" y="82" width="48" height="12" rx="4" fill="#B45309" stroke="#78350F" strokeWidth="2" />
    </svg>
  ),

  // ----------------------------------------------------
  // GALAKTIKA (Galaxy) - Swirling cosmic spiral
  // ----------------------------------------------------
  'w-galaktika': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="galCore" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="40%" stopColor="#F472B6" />
          <stop offset="80%" stopColor="#818CF8" />
          <stop offset="100%" stopColor="#0F172A" />
        </radialGradient>
      </defs>
      {/* Cosmic background disc */}
      <circle cx="60" cy="60" r="48" fill="#0F172A" />
      {/* Spiral Arms */}
      <path d="M60 60 Q80 40 95 60 Q105 85 75 95 Q40 100 25 75 Q15 45 45 25 Q85 10 102 45" stroke="#C084FC" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M60 60 Q40 80 25 60 Q15 35 45 25 Q80 20 95 45 Q105 75 75 95" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" fill="none" />
      {/* Radiant Glowing Core */}
      <circle cx="60" cy="60" r="14" fill="url(#galCore)" />
      {/* Stars */}
      <circle cx="45" cy="45" r="1.5" fill="#FFFFFF" />
      <circle cx="78" cy="72" r="1.5" fill="#FFFFFF" />
      <circle cx="82" cy="38" r="2" fill="#FDE047" />
      <circle cx="34" cy="76" r="1.5" fill="#FFFFFF" />
    </svg>
  ),

  // ----------------------------------------------------
  // HAMKORLIK (Cooperation) - Colorful interlocking puzzle pieces
  // ----------------------------------------------------
  'w-hamkorlik': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Top Left Puzzle Piece (Blue) */}
      <rect x="25" y="25" width="34" height="34" rx="4" fill="#3B82F6" />
      <circle cx="59" cy="42" r="6" fill="#3B82F6" />
      {/* Top Right Puzzle Piece (Yellow) */}
      <rect x="61" y="25" width="34" height="34" rx="4" fill="#FACC15" />
      <circle cx="78" cy="59" r="6" fill="#FACC15" />
      {/* Bottom Left Puzzle Piece (Red) */}
      <rect x="25" y="61" width="34" height="34" rx="4" fill="#EF4444" />
      <circle cx="42" cy="61" r="6" fill="#EF4444" />
      {/* Bottom Right Puzzle Piece (Green) */}
      <rect x="61" y="61" width="34" height="34" rx="4" fill="#22C55E" />
      <circle cx="61" cy="78" r="6" fill="#22C55E" />
      {/* Sparkles of teamwork */}
      <text x="52" y="65" fontSize="16">🤝</text>
    </svg>
  ),

  // ----------------------------------------------------
  // TABIATSHUNOS (Naturalist) - Magnifying glass over green sprout
  // ----------------------------------------------------
  'w-tabiatshunos': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Soil Mound */}
      <ellipse cx="55" cy="98" rx="35" ry="10" fill="#78350F" />
      {/* Fresh Green Sprout */}
      <path d="M55 98 Q52 75 50 60" stroke="#16A34A" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M50 72 C35 65 32 50 48 55 Z" fill="#22C55E" />
      <path d="M52 64 C68 55 70 42 54 48 Z" fill="#4ADE80" />
      {/* Ladybug on leaf */}
      <circle cx="42" cy="58" r="3.5" fill="#EF4444" />
      <circle cx="42" cy="58" r="1.5" fill="#0F172A" />
      {/* Big Magnifying Glass focusing on it */}
      <g transform="rotate(-30 65 55)">
        <circle cx="65" cy="55" r="24" fill="#BAE6FD" fillOpacity="0.3" stroke="#0284C7" strokeWidth="5" />
        <line x1="82" y1="72" x2="104" y2="94" stroke="#78350F" strokeWidth="8" strokeLinecap="round" />
        <path d="M50 42 Q60 38 72 44" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  ),

  // ----------------------------------------------------
  // SHAPES: Cone, Pyramid, Parallelogram
  // ----------------------------------------------------
  's-cone': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="100" rx="38" ry="12" fill="#9333EA" fillOpacity="0.3" />
      <path d="M60 15 L22 96 C35 106 85 106 98 96 Z" fill="#A855F7" />
      <path d="M60 15 L60 102 C85 102 98 96 98 96 Z" fill="#7E22CE" />
      <ellipse cx="60" cy="96" rx="38" ry="10" fill="none" stroke="#C084FC" strokeWidth="2" />
    </svg>
  ),

  's-pyramid': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="104" rx="42" ry="8" fill="#78350F" fillOpacity="0.3" />
      {/* Left Lit Facet */}
      <polygon points="60,20 18,94 66,102" fill="#FDE047" />
      {/* Right Shadow Facet */}
      <polygon points="60,20 66,102 104,88" fill="#D97706" />
    </svg>
  ),

  's-parallelogram': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="104" rx="40" ry="8" fill="#0369A1" fillOpacity="0.25" />
      <polygon points="38,28 102,28 82,92 18,92" fill="#0EA5E9" stroke="#0284C7" strokeWidth="3" />
      <line x1="42" y1="34" x2="96" y2="34" stroke="#7DD3FC" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),
};
