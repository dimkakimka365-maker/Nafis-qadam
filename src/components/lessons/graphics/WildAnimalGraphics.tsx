import React from 'react';

interface GraphicProps {
  className?: string;
}

export const WildAnimalGraphics: Record<string, React.FC<GraphicProps>> = {
  // ----------------------------------------------------
  // AYIQ (Bear) - Cute cuddly brown bear with round ears
  // ----------------------------------------------------
  'a-bear': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bearBody" cx="45%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#A16207" />
          <stop offset="70%" stopColor="#78350F" />
          <stop offset="100%" stopColor="#451A03" />
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="106" rx="36" ry="8" fill="#451A03" fillOpacity="0.3" />
      {/* Big Round Fuzzy Ears */}
      <circle cx="36" cy="32" r="14" fill="#78350F" />
      <circle cx="36" cy="32" r="8" fill="#FDE68A" />
      <circle cx="84" cy="32" r="14" fill="#78350F" />
      <circle cx="84" cy="32" r="8" fill="#FDE68A" />
      {/* Head */}
      <circle cx="60" cy="55" r="32" fill="url(#bearBody)" />
      {/* Snout Muzzle */}
      <ellipse cx="60" cy="65" rx="16" ry="12" fill="#FEF3C7" />
      <ellipse cx="60" cy="60" rx="7" ry="5" fill="#1C1917" />
      <path d="M60 65 L60 70 M54 70 Q60 74 66 70" stroke="#1C1917" strokeWidth="2.5" strokeLinecap="round" />
      {/* Shiny Eyes */}
      <circle cx="48" cy="50" r="4.5" fill="#1C1917" />
      <circle cx="49.5" cy="48.5" r="1.5" fill="white" />
      <circle cx="72" cy="50" r="4.5" fill="#1C1917" />
      <circle cx="73.5" cy="48.5" r="1.5" fill="white" />
      {/* Paws */}
      <circle cx="34" cy="85" r="10" fill="#78350F" />
      <circle cx="86" cy="85" r="10" fill="#78350F" />
    </svg>
  ),

  // ----------------------------------------------------
  // TULKI (Fox) - Radiant orange fox with white cheeks & bushy tail
  // ----------------------------------------------------
  'a-fox': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="foxGrad" cx="45%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#FB923C" />
          <stop offset="70%" stopColor="#EA580C" />
          <stop offset="100%" stopColor="#9A3412" />
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="106" rx="36" ry="8" fill="#7C2D12" fillOpacity="0.25" />
      {/* Pointed Fox Ears */}
      <polygon points="28,45 36,16 52,38" fill="url(#foxGrad)" />
      <polygon points="34,40 38,24 48,36" fill="#1C1917" />
      <polygon points="92,45 84,16 68,38" fill="url(#foxGrad)" />
      <polygon points="86,40 82,24 72,36" fill="#1C1917" />
      {/* Fox Head */}
      <polygon points="25,50 60,94 95,50 60,35" fill="url(#foxGrad)" />
      {/* White Fluffy Cheeks */}
      <path d="M25 50 Q42 78 60 94 Q40 85 28 65 Z" fill="#FFFFFF" />
      <path d="M95 50 Q78 78 60 94 Q80 85 92 65 Z" fill="#FFFFFF" />
      {/* Black button nose */}
      <circle cx="60" cy="91" r="4.5" fill="#18181B" />
      {/* Clever sly eyes */}
      <ellipse cx="46" cy="56" rx="4" ry="3" transform="rotate(-15 46 56)" fill="#18181B" />
      <circle cx="47" cy="55" r="1.2" fill="white" />
      <ellipse cx="74" cy="56" rx="4" ry="3" transform="rotate(15 74 56)" fill="#18181B" />
      <circle cx="73" cy="55" r="1.2" fill="white" />
    </svg>
  ),

  // ----------------------------------------------------
  // BO'RI (Wolf) - Cool grey wolf with amber eyes
  // ----------------------------------------------------
  'a-wolf': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="wolfGrad" cx="45%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#94A3B8" />
          <stop offset="70%" stopColor="#475569" />
          <stop offset="100%" stopColor="#1E293B" />
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="106" rx="36" ry="8" fill="#0F172A" fillOpacity="0.3" />
      {/* Tall Pointed Wolf Ears */}
      <polygon points="28,45 34,16 52,38" fill="url(#wolfGrad)" />
      <polygon points="34,40 37,24 47,36" fill="#F1F5F9" />
      <polygon points="92,45 86,16 68,38" fill="url(#wolfGrad)" />
      <polygon points="86,40 83,24 73,36" fill="#F1F5F9" />
      {/* Wolf Head */}
      <polygon points="24,52 60,94 96,52 60,35" fill="url(#wolfGrad)" />
      {/* Silver muzzle and cheeks */}
      <path d="M26 52 Q44 76 60 94 Q42 82 30 65 Z" fill="#E2E8F0" />
      <path d="M94 52 Q76 76 60 94 Q78 82 90 65 Z" fill="#E2E8F0" />
      <circle cx="60" cy="91" r="4.5" fill="#0F172A" />
      {/* Glowing Amber Eyes */}
      <ellipse cx="46" cy="55" rx="4.5" ry="3.5" transform="rotate(-15 46 55)" fill="#F59E0B" />
      <circle cx="46.5" cy="55" r="2" fill="#0F172A" />
      <circle cx="47" cy="54" r="0.8" fill="white" />
      <ellipse cx="74" cy="55" rx="4.5" ry="3.5" transform="rotate(15 74 55)" fill="#F59E0B" />
      <circle cx="73.5" cy="55" r="2" fill="#0F172A" />
      <circle cx="73" cy="54" r="0.8" fill="white" />
    </svg>
  ),

  // ----------------------------------------------------
  // JIRAFA (Giraffe) - Long neck with spots & cute horns
  // ----------------------------------------------------
  'a-giraffe': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="giraffeGrad" cx="40%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="70%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="108" rx="36" ry="7" fill="#78350F" fillOpacity="0.25" />
      {/* Long Neck */}
      <path d="M48 105 L52 50 L68 50 L72 105 Z" fill="url(#giraffeGrad)" />
      {/* Giraffe Brown Spots */}
      <rect x="54" y="58" width="10" height="9" rx="3" fill="#B45309" />
      <rect x="52" y="74" width="12" height="10" rx="3.5" fill="#B45309" />
      <rect x="55" y="90" width="11" height="9" rx="3" fill="#B45309" />
      {/* Little Horns (Ossicones) */}
      <line x1="53" y1="28" x2="51" y2="16" stroke="#92400E" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="51" cy="15" r="3.5" fill="#78350F" />
      <line x1="67" y1="28" x2="69" y2="16" stroke="#92400E" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="69" cy="15" r="3.5" fill="#78350F" />
      {/* Big Perked Ears */}
      <ellipse cx="40" cy="34" rx="8" ry="4" transform="rotate(-30 40 34)" fill="url(#giraffeGrad)" />
      <ellipse cx="80" cy="34" rx="8" ry="4" transform="rotate(30 80 34)" fill="url(#giraffeGrad)" />
      {/* Giraffe Head */}
      <ellipse cx="60" cy="36" rx="18" ry="16" fill="url(#giraffeGrad)" />
      {/* Snout Muzzle */}
      <ellipse cx="60" cy="46" rx="14" ry="9" fill="#FEF3C7" />
      <circle cx="56" cy="45" r="1.8" fill="#78350F" />
      <circle cx="64" cy="45" r="1.8" fill="#78350F" />
      {/* Big gentle eyes */}
      <circle cx="52" cy="33" r="3.5" fill="#451A03" />
      <circle cx="53" cy="32" r="1.2" fill="white" />
      <circle cx="68" cy="33" r="3.5" fill="#451A03" />
      <circle cx="69" cy="32" r="1.2" fill="white" />
    </svg>
  ),

  // ----------------------------------------------------
  // KARKIDON (Rhino) - Sturdy grey rhino with curved horn
  // ----------------------------------------------------
  'a-rhino': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="rhinoGrad" cx="45%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#94A3B8" />
          <stop offset="70%" stopColor="#64748B" />
          <stop offset="100%" stopColor="#334155" />
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="106" rx="38" ry="8" fill="#1E293B" fillOpacity="0.3" />
      {/* Sturdy Body */}
      <ellipse cx="60" cy="70" rx="34" ry="26" fill="url(#rhinoGrad)" />
      {/* Rhino Head */}
      <circle cx="60" cy="46" r="24" fill="url(#rhinoGrad)" />
      {/* Ears */}
      <circle cx="42" cy="28" r="6" fill="#475569" />
      <circle cx="78" cy="28" r="6" fill="#475569" />
      {/* Powerful White Rhino Horn */}
      <path d="M56 50 Q60 22 60 22 Q64 22 64 50 Z" fill="#F8FAFC" />
      <path d="M58 54 Q60 40 60 40 Q62 40 62 54 Z" fill="#E2E8F0" />
      {/* Eyes on sides */}
      <circle cx="44" cy="46" r="3.5" fill="#0F172A" />
      <circle cx="45" cy="45" r="1" fill="white" />
      <circle cx="76" cy="46" r="3.5" fill="#0F172A" />
      <circle cx="77" cy="45" r="1" fill="white" />
      {/* Big Muzzle */}
      <ellipse cx="60" cy="62" rx="16" ry="8" fill="#475569" />
      <circle cx="54" cy="62" r="2" fill="#1E293B" />
      <circle cx="66" cy="62" r="2" fill="#1E293B" />
    </svg>
  ),

  // ----------------------------------------------------
  // BEGEMOT (Hippo) - Cute purple-slate hippo floating
  // ----------------------------------------------------
  'a-hippo': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="hippoGrad" cx="45%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#A5B4FC" />
          <stop offset="60%" stopColor="#818CF8" />
          <stop offset="100%" stopColor="#4F46E5" />
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="106" rx="38" ry="8" fill="#312E81" fillOpacity="0.25" />
      {/* Tiny Rounded Ears */}
      <circle cx="36" cy="30" r="7" fill="#6366F1" />
      <circle cx="36" cy="30" r="4" fill="#F472B6" />
      <circle cx="84" cy="30" r="7" fill="#6366F1" />
      <circle cx="84" cy="30" r="4" fill="#F472B6" />
      {/* Chubby Head */}
      <ellipse cx="60" cy="48" rx="28" ry="22" fill="url(#hippoGrad)" />
      {/* Huge Friendly Muzzle */}
      <ellipse cx="60" cy="72" rx="34" ry="24" fill="url(#hippoGrad)" />
      {/* Big Nostrils */}
      <circle cx="48" cy="68" r="5" fill="#312E81" />
      <circle cx="72" cy="68" r="5" fill="#312E81" />
      {/* Happy Smile */}
      <path d="M48 85 Q60 92 72 85" stroke="#312E81" strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* Friendly Eyes */}
      <circle cx="46" cy="42" r="4" fill="#1E1B4B" />
      <circle cx="47" cy="41" r="1.2" fill="white" />
      <circle cx="74" cy="42" r="4" fill="#1E1B4B" />
      <circle cx="75" cy="41" r="1.2" fill="white" />
    </svg>
  ),

  // ----------------------------------------------------
  // GEPARD (Cheetah) - Golden with black spots & tear tracks
  // ----------------------------------------------------
  'a-cheetah': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="cheetahGrad" cx="45%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="70%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="106" rx="36" ry="8" fill="#78350F" fillOpacity="0.25" />
      {/* Rounded Ears */}
      <circle cx="36" cy="32" r="10" fill="#F59E0B" />
      <circle cx="36" cy="32" r="6" fill="#18181B" />
      <circle cx="84" cy="32" r="10" fill="#F59E0B" />
      <circle cx="84" cy="32" r="6" fill="#18181B" />
      {/* Cheetah Head */}
      <circle cx="60" cy="54" r="28" fill="url(#cheetahGrad)" />
      {/* Solid Black Cheetah Spots */}
      <circle cx="42" cy="40" r="2.5" fill="#18181B" />
      <circle cx="78" cy="40" r="2.5" fill="#18181B" />
      <circle cx="60" cy="34" r="2.2" fill="#18181B" />
      <circle cx="34" cy="56" r="2" fill="#18181B" />
      <circle cx="86" cy="56" r="2" fill="#18181B" />
      {/* White Muzzle */}
      <ellipse cx="60" cy="66" rx="14" ry="10" fill="#FEF3C7" />
      <ellipse cx="60" cy="62" rx="5" ry="3.5" fill="#18181B" />
      {/* Iconic Cheetah Black Tear Stripes */}
      <path d="M48 54 Q46 64 52 70" stroke="#18181B" strokeWidth="2.5" fill="none" />
      <path d="M72 54 Q74 64 68 70" stroke="#18181B" strokeWidth="2.5" fill="none" />
      {/* Amber Cheetah Eyes */}
      <circle cx="48" cy="50" r="4" fill="#D97706" />
      <circle cx="48" cy="50" r="2.5" fill="#18181B" />
      <circle cx="49" cy="49" r="0.8" fill="white" />
      <circle cx="72" cy="50" r="4" fill="#D97706" />
      <circle cx="72" cy="50" r="2.5" fill="#18181B" />
      <circle cx="73" cy="49" r="0.8" fill="white" />
    </svg>
  ),

  // ----------------------------------------------------
  // SHIMPANZE (Chimpanzee) - Playful monkey face with big ears
  // ----------------------------------------------------
  'a-chimp': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="chimpFur" cx="45%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#44403C" />
          <stop offset="70%" stopColor="#292524" />
          <stop offset="100%" stopColor="#1C1917" />
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="106" rx="36" ry="8" fill="#1C1917" fillOpacity="0.3" />
      {/* Big Round Ears */}
      <circle cx="28" cy="50" r="14" fill="#D6D3D1" stroke="#292524" strokeWidth="3" />
      <circle cx="28" cy="50" r="8" fill="#FCA5A5" fillOpacity="0.4" />
      <circle cx="92" cy="50" r="14" fill="#D6D3D1" stroke="#292524" strokeWidth="3" />
      <circle cx="92" cy="50" r="8" fill="#FCA5A5" fillOpacity="0.4" />
      {/* Head */}
      <circle cx="60" cy="52" r="30" fill="url(#chimpFur)" />
      {/* Light tan face mask */}
      <ellipse cx="48" cy="45" rx="12" ry="14" fill="#E7E5E4" />
      <ellipse cx="72" cy="45" rx="12" ry="14" fill="#E7E5E4" />
      <ellipse cx="60" cy="65" rx="20" ry="14" fill="#E7E5E4" />
      {/* Eyes */}
      <circle cx="48" cy="44" r="4.5" fill="#44403C" />
      <circle cx="49.5" cy="42.5" r="1.5" fill="white" />
      <circle cx="72" cy="44" r="4.5" fill="#44403C" />
      <circle cx="73.5" cy="42.5" r="1.5" fill="white" />
      {/* Nose and Big Smile */}
      <circle cx="56" cy="58" r="2" fill="#292524" />
      <circle cx="64" cy="58" r="2" fill="#292524" />
      <path d="M46 68 Q60 78 74 68" stroke="#292524" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  ),

  // ----------------------------------------------------
  // KENGURU (Kangaroo) - Perked ears and joey pouch
  // ----------------------------------------------------
  'a-kangaroo': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="rooGrad" cx="45%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#D97706" />
          <stop offset="70%" stopColor="#B45309" />
          <stop offset="100%" stopColor="#78350F" />
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="106" rx="36" ry="8" fill="#78350F" fillOpacity="0.25" />
      {/* Tall Perked-up Ears */}
      <ellipse cx="44" cy="22" rx="7" ry="16" transform="rotate(-15 44 22)" fill="url(#rooGrad)" />
      <ellipse cx="44" cy="22" rx="4" ry="12" transform="rotate(-15 44 22)" fill="#FED7AA" />
      <ellipse cx="76" cy="22" rx="7" ry="16" transform="rotate(15 76 22)" fill="url(#rooGrad)" />
      <ellipse cx="76" cy="22" rx="4" ry="12" transform="rotate(15 76 22)" fill="#FED7AA" />
      {/* Head */}
      <ellipse cx="60" cy="44" rx="20" ry="18" fill="url(#rooGrad)" />
      {/* Long Muzzle */}
      <polygon points="48,46 72,46 60,68" fill="url(#rooGrad)" />
      <ellipse cx="60" cy="66" rx="6" ry="4" fill="#1C1917" />
      {/* Friendly Eyes */}
      <circle cx="50" cy="42" r="3.5" fill="#1C1917" />
      <circle cx="51" cy="41" r="1.2" fill="white" />
      <circle cx="70" cy="42" r="3.5" fill="#1C1917" />
      <circle cx="71" cy="41" r="1.2" fill="white" />
      {/* Pouch in body */}
      <ellipse cx="60" cy="85" rx="26" ry="20" fill="url(#rooGrad)" />
      <path d="M46 80 Q60 92 74 80" stroke="#78350F" strokeWidth="2.5" fill="#FED7AA" />
    </svg>
  ),

  // ----------------------------------------------------
  // KOALA - Fluffy grey with large fuzzy ears and eucalyptus
  // ----------------------------------------------------
  'a-koala': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="koalaFur" cx="45%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#CBD5E1" />
          <stop offset="70%" stopColor="#94A3B8" />
          <stop offset="100%" stopColor="#64748B" />
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="106" rx="36" ry="8" fill="#334155" fillOpacity="0.25" />
      {/* Eucalyptus leaf */}
      <ellipse cx="24" cy="85" rx="14" ry="6" transform="rotate(-30 24 85)" fill="#22C55E" />
      {/* Big Fluffy Ears */}
      <circle cx="30" cy="38" r="18" fill="url(#koalaFur)" />
      <circle cx="30" cy="38" r="11" fill="#F8FAFC" />
      <circle cx="90" cy="38" r="18" fill="url(#koalaFur)" />
      <circle cx="90" cy="38" r="11" fill="#F8FAFC" />
      {/* Head */}
      <circle cx="60" cy="56" r="30" fill="url(#koalaFur)" />
      {/* Big Iconic Black Oval Nose */}
      <ellipse cx="60" cy="58" rx="10" ry="15" fill="#0F172A" />
      <ellipse cx="58" cy="54" rx="3" ry="5" fill="#334155" />
      {/* Little Button Eyes */}
      <circle cx="44" cy="48" r="3.5" fill="#0F172A" />
      <circle cx="45" cy="47" r="1" fill="white" />
      <circle cx="76" cy="48" r="3.5" fill="#0F172A" />
      <circle cx="77" cy="47" r="1" fill="white" />
    </svg>
  ),

  // ----------------------------------------------------
  // PANTERA (Panther) - Sleek midnight black with piercing emerald eyes
  // ----------------------------------------------------
  'a-panther': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="pantherSkin" cx="45%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="70%" stopColor="#0F172A" />
          <stop offset="100%" stopColor="#020617" />
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="106" rx="36" ry="8" fill="#020617" fillOpacity="0.4" />
      {/* Sleek Ears */}
      <polygon points="34,42 40,18 56,36" fill="#0F172A" />
      <polygon points="86,42 80,18 64,36" fill="#0F172A" />
      {/* Head */}
      <circle cx="60" cy="54" r="30" fill="url(#pantherSkin)" />
      {/* Whiskers */}
      <line x1="32" y1="68" x2="16" y2="66" stroke="#64748B" strokeWidth="1.5" />
      <line x1="32" y1="72" x2="14" y2="74" stroke="#64748B" strokeWidth="1.5" />
      <line x1="88" y1="68" x2="104" y2="66" stroke="#64748B" strokeWidth="1.5" />
      <line x1="88" y1="72" x2="106" y2="74" stroke="#64748B" strokeWidth="1.5" />
      {/* Glowing Piercing Emerald Eyes */}
      <ellipse cx="46" cy="48" rx="5" ry="4" transform="rotate(-10 46 48)" fill="#10B981" />
      <ellipse cx="46" cy="48" rx="2" ry="3.5" fill="#020617" />
      <circle cx="47" cy="47" r="0.8" fill="white" />
      <ellipse cx="74" cy="48" rx="5" ry="4" transform="rotate(10 74 48)" fill="#10B981" />
      <ellipse cx="74" cy="48" rx="2" ry="3.5" fill="#020617" />
      <circle cx="75" cy="47" r="0.8" fill="white" />
      {/* Black Nose */}
      <polygon points="56,64 64,64 60,70" fill="#020617" />
    </svg>
  ),

  // ----------------------------------------------------
  // TIPRATIKAN (Hedgehog) - Spiky cute brown with red apple
  // ----------------------------------------------------
  'a-hedgehog': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="106" rx="36" ry="8" fill="#451A03" fillOpacity="0.25" />
      {/* Red Apple on Back */}
      <circle cx="70" cy="40" r="10" fill="#EF4444" />
      <path d="M70 30 Q74 24 78 26" stroke="#78350F" strokeWidth="2" fill="none" />
      <circle cx="74" cy="26" r="3" fill="#22C55E" />
      {/* Spiky Spines all over back */}
      <path d="M30 65 Q40 25 80 40 Q95 70 70 95 Q40 95 30 65 Z" fill="#78350F" />
      <polygon points="35,42 40,30 46,45" fill="#542508" />
      <polygon points="50,35 55,22 62,38" fill="#542508" />
      <polygon points="65,35 72,25 78,40" fill="#542508" />
      {/* Soft Snout */}
      <polygon points="40,65 14,80 42,90" fill="#FED7AA" />
      <circle cx="14" cy="80" r="4" fill="#1C1917" />
      {/* Cute Little Eye */}
      <circle cx="34" cy="72" r="3" fill="#1C1917" />
      <circle cx="35" cy="71" r="1" fill="white" />
    </svg>
  ),

  // ----------------------------------------------------
  // XAMELEON (Chameleon) - Spiral tail, big swivel eye, rainbow
  // ----------------------------------------------------
  'a-chameleon': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="chamRainbow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="50%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      {/* Branch */}
      <rect x="15" y="90" width="90" height="8" rx="4" fill="#78350F" />
      {/* Curled Spiral Tail */}
      <path d="M30 75 Q15 75 18 60 Q22 50 32 55 Q35 62 30 68" stroke="#10B981" strokeWidth="6" strokeLinecap="round" fill="none" />
      {/* Chameleon Body */}
      <ellipse cx="60" cy="70" rx="26" ry="18" fill="url(#chamRainbow)" />
      {/* Head with Crest */}
      <ellipse cx="80" cy="62" rx="16" ry="14" fill="url(#chamRainbow)" />
      {/* Big Bulging Swivel Eye */}
      <circle cx="82" cy="58" r="8" fill="#FDE047" stroke="#059669" strokeWidth="2" />
      <circle cx="84" cy="58" r="3" fill="#0F172A" />
      <circle cx="85" cy="57" r="1" fill="white" />
      {/* Cute curling tongue */}
      <path d="M96 66 Q106 66 104 60" stroke="#F43F5E" strokeWidth="2.5" fill="none" />
    </svg>
  ),

  // ----------------------------------------------------
  // LAMA / ALPACA - Fluffy fleece with smiling face
  // ----------------------------------------------------
  'a-llama': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="108" rx="36" ry="7" fill="#0F172A" fillOpacity="0.2" />
      {/* Long fluffy neck */}
      <rect x="50" y="45" width="20" height="55" rx="10" fill="#F8FAFC" />
      {/* Fluffy ears */}
      <ellipse cx="44" cy="24" rx="5" ry="12" transform="rotate(-15 44 24)" fill="#F1F5F9" />
      <ellipse cx="76" cy="24" rx="5" ry="12" transform="rotate(15 76 24)" fill="#F1F5F9" />
      {/* Head */}
      <circle cx="60" cy="38" r="18" fill="#FFFFFF" />
      {/* Cute Fluffy bangs */}
      <circle cx="54" cy="26" r="6" fill="#F1F5F9" />
      <circle cx="60" cy="24" r="7" fill="#FFFFFF" />
      <circle cx="66" cy="26" r="6" fill="#F1F5F9" />
      {/* Face & Smile */}
      <circle cx="52" cy="36" r="2.5" fill="#0F172A" />
      <circle cx="68" cy="36" r="2.5" fill="#0F172A" />
      <ellipse cx="60" cy="44" rx="6" ry="4" fill="#FED7AA" />
      <path d="M57 44 Q60 48 63 44" stroke="#78350F" strokeWidth="1.5" fill="none" />
      {/* Colorful Andean halter necklace */}
      <rect x="49" y="55" width="22" height="6" rx="3" fill="#EC4899" />
      <circle cx="54" cy="58" r="2" fill="#FACC15" />
      <circle cx="60" cy="58" r="2" fill="#3B82F6" />
      <circle cx="66" cy="58" r="2" fill="#10B981" />
    </svg>
  ),

  // ----------------------------------------------------
  // TYULEN (Seal) - Cute grey seal with whiskers
  // ----------------------------------------------------
  'a-seal': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sealSkin" cx="45%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#94A3B8" />
          <stop offset="70%" stopColor="#64748B" />
          <stop offset="100%" stopColor="#334155" />
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="106" rx="40" ry="8" fill="#1E293B" fillOpacity="0.25" />
      {/* Rounded Chubby Body */}
      <ellipse cx="60" cy="74" rx="34" ry="24" fill="url(#sealSkin)" />
      {/* Flippers */}
      <ellipse cx="32" cy="88" rx="14" ry="7" transform="rotate(20 32 88)" fill="#475569" />
      <ellipse cx="88" cy="88" rx="14" ry="7" transform="rotate(-20 88 88)" fill="#475569" />
      {/* Round Head */}
      <circle cx="60" cy="46" r="22" fill="url(#sealSkin)" />
      {/* Big Puppy Eyes */}
      <circle cx="50" cy="42" r="4.5" fill="#0F172A" />
      <circle cx="51.5" cy="40.5" r="1.5" fill="white" />
      <circle cx="70" cy="42" r="4.5" fill="#0F172A" />
      <circle cx="71.5" cy="40.5" r="1.5" fill="white" />
      {/* White Muzzle & Whiskers */}
      <ellipse cx="60" cy="54" rx="10" ry="6" fill="#F8FAFC" />
      <ellipse cx="60" cy="51" rx="4" ry="2.5" fill="#0F172A" />
      <line x1="48" y1="53" x2="34" y2="52" stroke="#475569" strokeWidth="1.5" />
      <line x1="48" y1="56" x2="34" y2="58" stroke="#475569" strokeWidth="1.5" />
      <line x1="72" y1="53" x2="86" y2="52" stroke="#475569" strokeWidth="1.5" />
      <line x1="72" y1="56" x2="86" y2="58" stroke="#475569" strokeWidth="1.5" />
    </svg>
  ),

  // ----------------------------------------------------
  // MORJ (Walrus) - Big white tusks and whiskered snout
  // ----------------------------------------------------
  'a-walrus': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="walrusSkin" cx="45%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#A16207" />
          <stop offset="70%" stopColor="#78350F" />
          <stop offset="100%" stopColor="#451A03" />
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="106" rx="40" ry="8" fill="#451A03" fillOpacity="0.3" />
      {/* Plump Heavy Body */}
      <ellipse cx="60" cy="74" rx="36" ry="25" fill="url(#walrusSkin)" />
      {/* Head */}
      <circle cx="60" cy="46" r="24" fill="url(#walrusSkin)" />
      {/* Eyes */}
      <circle cx="48" cy="40" r="3.5" fill="#1C1917" />
      <circle cx="49" cy="39" r="1" fill="white" />
      <circle cx="72" cy="40" r="3.5" fill="#1C1917" />
      <circle cx="73" cy="39" r="1" fill="white" />
      {/* Large Whiskered Muzzle */}
      <ellipse cx="60" cy="56" rx="16" ry="10" fill="#FED7AA" />
      <ellipse cx="60" cy="51" rx="5" ry="3.5" fill="#1C1917" />
      {/* Two Big White Tusks */}
      <polygon points="52,60 55,78 50,78" fill="#FFFFFF" />
      <polygon points="68,60 65,78 70,78" fill="#FFFFFF" />
    </svg>
  ),
};
