import React from 'react';

interface GraphicProps {
  className?: string;
}

export const BirdGraphics: Record<string, React.FC<GraphicProps>> = {
  // ----------------------------------------------------
  // BURGUT (Eagle) - Majestic golden-brown eagle
  // ----------------------------------------------------
  'bird-eagle': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="eagleBody" cx="45%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#A16207" />
          <stop offset="70%" stopColor="#78350F" />
          <stop offset="100%" stopColor="#451A03" />
        </radialGradient>
        <radialGradient id="eagleHead" cx="45%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="80%" stopColor="#F1F5F9" />
          <stop offset="100%" stopColor="#CBD5E1" />
        </radialGradient>
        <radialGradient id="eagleBeak" cx="30%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="60%" stopColor="#EAB308" />
          <stop offset="100%" stopColor="#CA8A04" />
        </radialGradient>
        <filter id="eagleShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#451A03" floodOpacity="0.35" />
        </filter>
      </defs>
      {/* Ground shadow */}
      <ellipse cx="60" cy="106" rx="38" ry="8" fill="#451A03" fillOpacity="0.25" />
      {/* Brown Body & Wings */}
      <ellipse cx="60" cy="74" rx="34" ry="28" fill="url(#eagleBody)" filter="url(#eagleShadow)" />
      {/* Left Wing feather */}
      <path d="M26 65 C12 75 16 95 38 88 Z" fill="#78350F" />
      {/* Right Wing feather */}
      <path d="M94 65 C108 75 104 95 82 88 Z" fill="#78350F" />
      {/* White Majestic Head */}
      <circle cx="60" cy="44" r="24" fill="url(#eagleHead)" filter="url(#eagleShadow)" />
      {/* Crown feathers */}
      <path d="M54 20 L60 14 L66 20 Z" fill="#F8FAFC" />
      <path d="M46 24 L52 17 L56 25 Z" fill="#F1F5F9" />
      <path d="M74 24 L68 17 L64 25 Z" fill="#F1F5F9" />
      {/* Fierce Eyes */}
      <ellipse cx="50" cy="42" rx="4.5" ry="4.5" fill="#FEF08A" />
      <circle cx="51" cy="42" r="2.5" fill="#0F172A" />
      <circle cx="52" cy="41" r="1" fill="white" />
      <ellipse cx="70" cy="42" rx="4.5" ry="4.5" fill="#FEF08A" />
      <circle cx="69" cy="42" r="2.5" fill="#0F172A" />
      <circle cx="68" cy="41" r="1" fill="white" />
      {/* Golden Hooked Beak */}
      <path d="M54 46 Q60 48 66 46 Q62 64 60 65 Q58 64 54 46 Z" fill="url(#eagleBeak)" />
      {/* Beak nostrils */}
      <circle cx="58" cy="49" r="0.8" fill="#854D0E" />
      <circle cx="62" cy="49" r="0.8" fill="#854D0E" />
      {/* Golden Talons */}
      <ellipse cx="48" cy="98" rx="7" ry="4" fill="#F59E0B" />
      <ellipse cx="72" cy="98" rx="7" ry="4" fill="#F59E0B" />
    </svg>
  ),

  // ----------------------------------------------------
  // TOVUS (Peacock) - Radiant turquoise with jewel fan tail
  // ----------------------------------------------------
  'bird-peacock': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="peacockBody" cx="45%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#2DD4BF" />
          <stop offset="50%" stopColor="#0D9488" />
          <stop offset="100%" stopColor="#115E59" />
        </radialGradient>
        <linearGradient id="peacockFan" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#047857" />
          <stop offset="60%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#34D399" />
        </linearGradient>
      </defs>
      <ellipse cx="60" cy="106" rx="38" ry="8" fill="#042F2E" fillOpacity="0.25" />
      {/* Big Fan Tail in background */}
      <path d="M20 75 Q60 0 100 75 Z" fill="url(#peacockFan)" />
      {/* Jewel Feather Eyes in Fan */}
      <circle cx="36" cy="45" r="7" fill="#0284C7" />
      <circle cx="36" cy="45" r="4" fill="#F59E0B" />
      <circle cx="36" cy="45" r="2" fill="#1E3A8A" />

      <circle cx="60" cy="30" r="8" fill="#0284C7" />
      <circle cx="60" cy="30" r="5" fill="#F59E0B" />
      <circle cx="60" cy="30" r="2.5" fill="#1E3A8A" />

      <circle cx="84" cy="45" r="7" fill="#0284C7" />
      <circle cx="84" cy="45" r="4" fill="#F59E0B" />
      <circle cx="84" cy="45" r="2" fill="#1E3A8A" />

      {/* Royal Head Crest Toj */}
      <circle cx="56" cy="34" r="2.5" fill="#F59E0B" />
      <circle cx="60" cy="31" r="3" fill="#F59E0B" />
      <circle cx="64" cy="34" r="2.5" fill="#F59E0B" />
      <line x1="60" y1="34" x2="60" y2="42" stroke="#0F766E" strokeWidth="2" />
      <line x1="56" y1="36" x2="59" y2="42" stroke="#0F766E" strokeWidth="1.5" />
      <line x1="64" y1="36" x2="61" y2="42" stroke="#0F766E" strokeWidth="1.5" />

      {/* Peacock Body & Slender Neck */}
      <ellipse cx="60" cy="80" rx="22" ry="24" fill="url(#peacockBody)" />
      <ellipse cx="60" cy="52" rx="14" ry="16" fill="url(#peacockBody)" />

      {/* Cute face & Beak */}
      <ellipse cx="55" cy="50" rx="2.5" ry="3.5" fill="#0F172A" />
      <circle cx="55.5" cy="49" r="1" fill="white" />
      <ellipse cx="65" cy="50" rx="2.5" ry="3.5" fill="#0F172A" />
      <circle cx="65.5" cy="49" r="1" fill="white" />

      <polygon points="56,54 64,54 60,63" fill="#FBBF24" />
      {/* Golden Feet */}
      <ellipse cx="53" cy="102" rx="5" ry="3" fill="#F59E0B" />
      <ellipse cx="67" cy="102" rx="5" ry="3" fill="#F59E0B" />
    </svg>
  ),

  // ----------------------------------------------------
  // BOYQUSH (Owl) - Wise owl with big round eyes
  // ----------------------------------------------------
  'bird-owl': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="owlBody" cx="45%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#92400E" />
          <stop offset="70%" stopColor="#78350F" />
          <stop offset="100%" stopColor="#451A03" />
        </radialGradient>
        <radialGradient id="owlBelly" cx="50%" cy="45%" r="50%">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="100%" stopColor="#FDE68A" />
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="106" rx="36" ry="7" fill="#451A03" fillOpacity="0.25" />
      {/* Tree Branch */}
      <rect x="15" y="96" width="90" height="9" rx="4.5" fill="#78350F" />
      <circle cx="24" cy="94" r="5" fill="#15803D" />
      {/* Plump Owl Body */}
      <ellipse cx="60" cy="65" rx="34" ry="35" fill="url(#owlBody)" />
      {/* Feathered Ear Tufts */}
      <polygon points="34,35 44,20 48,36" fill="#78350F" />
      <polygon points="86,35 76,20 72,36" fill="#78350F" />
      {/* Cream Belly with feather markings */}
      <ellipse cx="60" cy="74" rx="20" ry="22" fill="url(#owlBelly)" />
      <path d="M52 68 Q56 72 60 68" stroke="#B45309" strokeWidth="2" fill="none" />
      <path d="M60 68 Q64 72 68 68" stroke="#B45309" strokeWidth="2" fill="none" />
      <path d="M55 78 Q60 82 65 78" stroke="#B45309" strokeWidth="2" fill="none" />
      {/* Huge Round Eyes (Owl trademark) */}
      <circle cx="46" cy="46" r="14" fill="#FEF08A" stroke="#B45309" strokeWidth="3" />
      <circle cx="46" cy="46" r="8" fill="#1E293B" />
      <circle cx="48" cy="44" r="3" fill="white" />

      <circle cx="74" cy="46" r="14" fill="#FEF08A" stroke="#B45309" strokeWidth="3" />
      <circle cx="74" cy="46" r="8" fill="#1E293B" />
      <circle cx="76" cy="44" r="3" fill="white" />
      {/* Small orange beak between eyes */}
      <polygon points="56,50 64,50 60,60" fill="#F97316" />
      {/* Cute claws gripping branch */}
      <circle cx="48" cy="98" r="3" fill="#F59E0B" />
      <circle cx="54" cy="98" r="3" fill="#F59E0B" />
      <circle cx="66" cy="98" r="3" fill="#F59E0B" />
      <circle cx="72" cy="98" r="3" fill="#F59E0B" />
    </svg>
  ),

  // ----------------------------------------------------
  // QALDIRG'OCH (Swallow) - Forked tail, navy & ruby throat
  // ----------------------------------------------------
  'bird-swallow': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="swallowBlue" cx="40%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="60%" stopColor="#1E3A8A" />
          <stop offset="100%" stopColor="#0F172A" />
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="106" rx="34" ry="7" fill="#0F172A" fillOpacity="0.2" />
      {/* Iconic V-forked swallow tail */}
      <path d="M52 80 L38 108 L55 96 L60 85 L65 96 L82 108 L68 80 Z" fill="#1E3A8A" />
      {/* Sleek Aerodynamic Wings */}
      <path d="M12 48 Q40 50 56 60 Q28 65 12 48 Z" fill="url(#swallowBlue)" />
      <path d="M108 48 Q80 50 64 60 Q92 65 108 48 Z" fill="url(#swallowBlue)" />
      {/* Body */}
      <ellipse cx="60" cy="58" rx="20" ry="24" fill="url(#swallowBlue)" />
      {/* White Belly */}
      <ellipse cx="60" cy="65" rx="14" ry="16" fill="#F8FAFC" />
      {/* Ruby / Rust Throat */}
      <path d="M50 44 Q60 52 70 44 Q65 38 60 38 Q55 38 50 44 Z" fill="#DC2626" />
      {/* Head */}
      <circle cx="60" cy="35" r="14" fill="url(#swallowBlue)" />
      <circle cx="55" cy="33" r="2.5" fill="#0F172A" />
      <circle cx="55.5" cy="32" r="0.8" fill="white" />
      <circle cx="65" cy="33" r="2.5" fill="#0F172A" />
      <circle cx="65.5" cy="32" r="0.8" fill="white" />
      {/* Tiny Sharp Beak */}
      <polygon points="57,36 63,36 60,42" fill="#F59E0B" />
    </svg>
  ),

  // ----------------------------------------------------
  // KAKKU (Cuckoo) - Ash grey plumage with musical notes
  // ----------------------------------------------------
  'bird-cuckoo': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="cuckooBody" cx="45%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#94A3B8" />
          <stop offset="70%" stopColor="#475569" />
          <stop offset="100%" stopColor="#1E293B" />
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="106" rx="36" ry="8" fill="#1E293B" fillOpacity="0.25" />
      {/* Long tail */}
      <rect x="54" y="80" width="12" height="28" rx="6" fill="#334155" transform="rotate(15 60 94)" />
      {/* Round Body */}
      <ellipse cx="60" cy="62" rx="26" ry="25" fill="url(#cuckooBody)" />
      {/* Striped Cuckoo Belly */}
      <ellipse cx="60" cy="68" rx="17" ry="18" fill="#F1F5F9" />
      <line x1="48" y1="62" x2="72" y2="62" stroke="#475569" strokeWidth="2" strokeDasharray="3 2" />
      <line x1="46" y1="68" x2="74" y2="68" stroke="#475569" strokeWidth="2" strokeDasharray="3 2" />
      <line x1="48" y1="74" x2="72" y2="74" stroke="#475569" strokeWidth="2" strokeDasharray="3 2" />
      <line x1="52" y1="80" x2="68" y2="80" stroke="#475569" strokeWidth="2" strokeDasharray="3 2" />
      {/* Cute Head */}
      <circle cx="60" cy="38" r="18" fill="url(#cuckooBody)" />
      {/* Yellow Eye Ring */}
      <circle cx="53" cy="36" r="6" fill="#FACC15" />
      <circle cx="53" cy="36" r="3.5" fill="#0F172A" />
      <circle cx="54" cy="35" r="1" fill="white" />

      <circle cx="67" cy="36" r="6" fill="#FACC15" />
      <circle cx="67" cy="36" r="3.5" fill="#0F172A" />
      <circle cx="68" cy="35" r="1" fill="white" />
      {/* Beak open singing "kuk-ku!" */}
      <polygon points="56,41 64,41 60,49" fill="#EAB308" />
      {/* Musical notes floating */}
      <text x="78" y="28" fontSize="16" fill="#EC4899" fontWeight="bold">🎵</text>
      <text x="88" y="44" fontSize="12" fill="#8B5CF6" fontWeight="bold">🎶</text>
      {/* Yellow Feet */}
      <ellipse cx="52" cy="98" rx="5" ry="3" fill="#EAB308" />
      <ellipse cx="68" cy="98" rx="5" ry="3" fill="#EAB308" />
    </svg>
  ),

  // ----------------------------------------------------
  // LAYLAK (Stork) - Tall white bird with long red beak
  // ----------------------------------------------------
  'bird-stork': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="storkHead" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="85%" stopColor="#F8FAFC" />
          <stop offset="100%" stopColor="#E2E8F0" />
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="108" rx="34" ry="7" fill="#0F172A" fillOpacity="0.2" />
      {/* Long Red Stork Legs */}
      <line x1="52" y1="84" x2="52" y2="108" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
      <line x1="68" y1="84" x2="68" y2="108" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
      {/* White Body with Black wing feathers */}
      <ellipse cx="60" cy="74" rx="26" ry="20" fill="url(#storkHead)" />
      <path d="M72 66 Q88 74 84 86 Q72 84 66 74 Z" fill="#0F172A" />
      {/* Long Slender Neck */}
      <path d="M54 70 C54 50 56 38 58 32 C62 38 64 50 64 70 Z" fill="url(#storkHead)" />
      {/* Stork Head */}
      <circle cx="59" cy="30" r="12" fill="url(#storkHead)" />
      <circle cx="56" cy="28" r="2.5" fill="#0F172A" />
      <circle cx="56.5" cy="27" r="0.8" fill="white" />
      {/* Long Iconic Coral Red Beak */}
      <polygon points="50,30 50,35 18,34" fill="#EF4444" />
      <line x1="50" y1="32.5" x2="20" y2="33.5" stroke="#B91C1C" strokeWidth="1" />
    </svg>
  ),

  // ----------------------------------------------------
  // FLAMINGO - Vibrant Pink, curved graceful neck
  // ----------------------------------------------------
  'bird-flamingo': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="pinkFlamingo" cx="45%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#F472B6" />
          <stop offset="60%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#BE185D" />
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="108" rx="34" ry="7" fill="#831843" fillOpacity="0.2" />
      {/* Long Pink Legs (one standing, one bent) */}
      <line x1="56" y1="84" x2="56" y2="108" stroke="#DB2777" strokeWidth="3" strokeLinecap="round" />
      <path d="M64 84 L64 94 L76 94" stroke="#DB2777" strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* Fluffy Pink Body */}
      <ellipse cx="60" cy="74" rx="25" ry="18" fill="url(#pinkFlamingo)" />
      <path d="M42 70 Q34 76 45 84 Z" fill="#F472B6" />
      {/* S-curve Neck */}
      <path d="M66 70 C72 50 68 34 56 28 C50 24 52 18 60 18 C74 18 78 45 72 70 Z" fill="url(#pinkFlamingo)" />
      {/* Flamingo Head & Beak with Black Tip */}
      <circle cx="56" cy="22" r="10" fill="url(#pinkFlamingo)" />
      <circle cx="58" cy="20" r="2" fill="#0F172A" />
      <circle cx="58.5" cy="19.5" r="0.6" fill="white" />
      {/* Distinctive curved beak: pink base + black tip */}
      <path d="M50 21 Q44 23 42 30 Q46 32 52 25 Z" fill="#FBCFE8" />
      <path d="M44 26 Q42 28 42 30 Q45 31 46 28 Z" fill="#1E293B" />
    </svg>
  ),

  // ----------------------------------------------------
  // TO'TIQUSH (Parrot) - Emerald green, scarlet red & yellow
  // ----------------------------------------------------
  'bird-parrot': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="parrotGreen" cx="40%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#86EFAC" />
          <stop offset="50%" stopColor="#22C55E" />
          <stop offset="100%" stopColor="#15803D" />
        </radialGradient>
        <radialGradient id="parrotRed" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#F87171" />
          <stop offset="60%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#B91C1C" />
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="106" rx="36" ry="8" fill="#14532D" fillOpacity="0.25" />
      {/* Long Rainbow Tail */}
      <rect x="52" y="80" width="10" height="30" rx="5" fill="#3B82F6" transform="rotate(10 57 95)" />
      <rect x="58" y="80" width="8" height="28" rx="4" fill="#EAB308" transform="rotate(-5 62 94)" />
      {/* Plump Emerald Body */}
      <ellipse cx="60" cy="65" rx="24" ry="26" fill="url(#parrotGreen)" />
      {/* Scarlet Wing */}
      <ellipse cx="70" cy="65" rx="12" ry="18" fill="url(#parrotRed)" transform="rotate(-15 70 65)" />
      {/* Golden Chest patch */}
      <ellipse cx="54" cy="68" rx="10" ry="14" fill="#FACC15" />
      {/* Head with feather crest */}
      <circle cx="56" cy="38" r="18" fill="url(#parrotGreen)" />
      <path d="M52 20 Q56 12 60 20 Z" fill="#EF4444" />
      <path d="M58 20 Q64 14 66 22 Z" fill="#FACC15" />
      {/* White Eye Patch & Eye */}
      <circle cx="50" cy="36" r="6" fill="#FFFFFF" />
      <circle cx="50" cy="36" r="3" fill="#0F172A" />
      <circle cx="51" cy="35" r="1" fill="white" />
      {/* Powerful Curved Hooked Beak */}
      <path d="M42 35 C32 40 34 52 40 52 C42 46 44 42 44 38 Z" fill="#F59E0B" />
      {/* Perch Feet */}
      <ellipse cx="50" cy="94" rx="5" ry="3" fill="#64748B" />
      <ellipse cx="64" cy="94" rx="5" ry="3" fill="#64748B" />
    </svg>
  ),

  // ----------------------------------------------------
  // TUYAQUSH (Ostrich) - Long neck, big lashes
  // ----------------------------------------------------
  'bird-ostrich': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="108" rx="36" ry="7" fill="#1C1917" fillOpacity="0.25" />
      {/* Long strong running legs */}
      <line x1="52" y1="84" x2="48" y2="108" stroke="#D97706" strokeWidth="4" strokeLinecap="round" />
      <line x1="68" y1="84" x2="72" y2="108" stroke="#D97706" strokeWidth="4" strokeLinecap="round" />
      {/* Big fluffy dark body */}
      <ellipse cx="60" cy="74" rx="28" ry="20" fill="#292524" />
      <ellipse cx="78" cy="72" rx="10" ry="8" fill="#F5F5F4" />
      {/* Tall curved pink neck */}
      <path d="M46 72 C44 45 48 30 52 24" stroke="#FBCFE8" strokeWidth="8" strokeLinecap="round" fill="none" />
      {/* Cute Head with huge curious eyes and lashes */}
      <circle cx="53" cy="20" r="10" fill="#FBCFE8" />
      <circle cx="56" cy="18" r="3.5" fill="#1C1917" />
      <circle cx="57" cy="17" r="1" fill="white" />
      {/* Lashes */}
      <line x1="56" y1="14" x2="56" y2="12" stroke="#1C1917" strokeWidth="1" />
      <line x1="58" y1="15" x2="60" y2="13" stroke="#1C1917" strokeWidth="1" />
      {/* Wide flat beak */}
      <ellipse cx="44" cy="22" rx="6" ry="3" fill="#FBBF24" />
    </svg>
  ),

  // ----------------------------------------------------
  // OQUSH (Swan) - Pure white, graceful curve on water
  // ----------------------------------------------------
  'bird-swan': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="swanWater" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#0284C7" />
        </radialGradient>
      </defs>
      {/* Water Ripple Base */}
      <ellipse cx="60" cy="98" rx="46" ry="12" fill="url(#swanWater)" fillOpacity="0.4" />
      <ellipse cx="60" cy="98" rx="36" ry="8" stroke="#BAE6FD" strokeWidth="2" fill="none" />
      {/* Swan Pure White Body */}
      <ellipse cx="62" cy="80" rx="30" ry="18" fill="#FFFFFF" />
      <path d="M78 70 Q92 74 88 82 Z" fill="#F1F5F9" />
      {/* Graceful S-Neck */}
      <path d="M48 80 C40 60 44 42 54 34 C60 28 58 20 48 20" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" fill="none" />
      {/* Swan Head */}
      <circle cx="48" cy="20" r="8" fill="#FFFFFF" />
      <circle cx="46" cy="19" r="2" fill="#0F172A" />
      {/* Orange Beak with black knob */}
      <polygon points="42,20 42,24 34,22" fill="#F97316" />
      <circle cx="43" cy="20" r="1.5" fill="#0F172A" />
    </svg>
  ),

  // ----------------------------------------------------
  // KABUTAR (Dove) - Gentle white peace dove
  // ----------------------------------------------------
  'bird-dove': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="106" rx="34" ry="7" fill="#0F172A" fillOpacity="0.2" />
      {/* Wings spread gently */}
      <path d="M60 60 Q30 30 18 45 Q36 65 52 68 Z" fill="#FFFFFF" />
      <path d="M60 60 Q90 30 102 45 Q84 65 68 68 Z" fill="#F1F5F9" />
      {/* Dove Body */}
      <ellipse cx="60" cy="68" rx="22" ry="24" fill="#FFFFFF" />
      {/* Tail feathers */}
      <path d="M52 88 L60 106 L68 88 Z" fill="#E2E8F0" />
      {/* Dove Head */}
      <circle cx="60" cy="42" r="14" fill="#FFFFFF" />
      <circle cx="55" cy="40" r="2.5" fill="#0F172A" />
      <circle cx="55.5" cy="39" r="0.8" fill="white" />
      <circle cx="65" cy="40" r="2.5" fill="#0F172A" />
      <circle cx="65.5" cy="39" r="0.8" fill="white" />
      {/* Gentle Beak holding green olive twig */}
      <polygon points="58,45 62,45 60,52" fill="#FBBF24" />
      <path d="M60 48 Q72 44 76 52" stroke="#16A34A" strokeWidth="2" fill="none" />
      <circle cx="74" cy="47" r="2.5" fill="#22C55E" />
    </svg>
  ),

  // ----------------------------------------------------
  // KOLIBRI (Hummingbird) - Sparkling tiny jewel with nectar
  // ----------------------------------------------------
  'bird-hummingbird': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="hummingBody" cx="40%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#67E8F9" />
          <stop offset="50%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#0E7490" />
        </radialGradient>
      </defs>
      {/* Fast Motion Flutter Wings */}
      <ellipse cx="44" cy="36" rx="22" ry="7" transform="rotate(-35 44 36)" fill="#A855F7" fillOpacity="0.75" />
      <ellipse cx="76" cy="36" rx="22" ry="7" transform="rotate(35 76 36)" fill="#EC4899" fillOpacity="0.75" />
      {/* Tiny Plump Iridescent Body */}
      <ellipse cx="60" cy="65" rx="18" ry="22" fill="url(#hummingBody)" />
      {/* Ruby throat */}
      <circle cx="60" cy="52" r="8" fill="#F43F5E" />
      {/* Cute Head */}
      <circle cx="60" cy="42" r="12" fill="url(#hummingBody)" />
      <circle cx="56" cy="40" r="2" fill="#0F172A" />
      <circle cx="64" cy="40" r="2" fill="#0F172A" />
      {/* Needle-sharp long beak for flower nectar */}
      <line x1="60" y1="46" x2="60" y2="76" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
      {/* Flower below */}
      <circle cx="60" cy="85" r="7" fill="#FB7185" />
      <circle cx="60" cy="85" r="3" fill="#FDE047" />
    </svg>
  ),

  // ----------------------------------------------------
  // PELIKAN (Pelican) - Huge pouch beak
  // ----------------------------------------------------
  'bird-pelican': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="106" rx="36" ry="8" fill="#0284C7" fillOpacity="0.25" />
      {/* White Body */}
      <ellipse cx="65" cy="74" rx="28" ry="22" fill="#FFFFFF" />
      {/* Head */}
      <circle cx="58" cy="38" r="16" fill="#FFFFFF" />
      <circle cx="55" cy="35" r="2.5" fill="#0F172A" />
      <circle cx="55.5" cy="34" r="0.8" fill="white" />
      {/* Big Yellow Expandable Pouch Beak */}
      <path d="M50 38 L20 40 Q25 65 52 55 Z" fill="#FBBF24" />
      <line x1="50" y1="38" x2="20" y2="40" stroke="#D97706" strokeWidth="2" />
      {/* Webbed Feet */}
      <ellipse cx="55" cy="98" rx="7" ry="4" fill="#F59E0B" />
      <ellipse cx="72" cy="98" rx="7" ry="4" fill="#F59E0B" />
    </svg>
  ),
};
