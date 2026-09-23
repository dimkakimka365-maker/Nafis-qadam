import React from 'react';

interface GraphicProps {
  className?: string;
}

export const SeaAndInsectGraphics: Record<string, React.FC<GraphicProps>> = {
  // ----------------------------------------------------
  // KIT (Whale) - Friendly blue whale with water spout
  // ----------------------------------------------------
  'sea-whale': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="whaleSkin" cx="40%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="60%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#0369A1" />
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="106" rx="42" ry="8" fill="#0C4A6E" fillOpacity="0.2" />
      {/* Fountain Spout of Water */}
      <path d="M48 38 C42 20 28 22 24 28 M48 38 C48 14 52 14 56 24 M48 38 C56 18 68 20 72 26" stroke="#7DD3FC" strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* Whale Big Friendly Body */}
      <path d="M18 70 C18 42 55 42 90 62 C104 60 110 52 112 50 C110 65 106 72 96 74 C86 92 40 92 20 80 Z" fill="url(#whaleSkin)" />
      {/* White Grooved Belly */}
      <path d="M30 76 C50 88 80 82 88 74 C78 92 42 90 30 76 Z" fill="#F0F9FF" />
      <line x1="45" y1="80" x2="45" y2="87" stroke="#BAE6FD" strokeWidth="1.5" />
      <line x1="55" y1="82" x2="55" y2="88" stroke="#BAE6FD" strokeWidth="1.5" />
      <line x1="65" y1="80" x2="65" y2="86" stroke="#BAE6FD" strokeWidth="1.5" />
      {/* Cute Whale Eye & Smile */}
      <circle cx="36" cy="64" r="3.5" fill="#0F172A" />
      <circle cx="37" cy="63" r="1.2" fill="white" />
      <path d="M28 72 Q36 78 44 72" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Whale Flipper */}
      <ellipse cx="60" cy="74" rx="12" ry="6" transform="rotate(25 60 74)" fill="#0369A1" />
    </svg>
  ),

  // ----------------------------------------------------
  // DELFIN (Dolphin) - Jumping through sparkling turquoise waves
  // ----------------------------------------------------
  'sea-dolphin': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="dolphinSkin" cx="40%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="60%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </radialGradient>
      </defs>
      {/* Frothy Ocean Wave */}
      <path d="M10 100 Q35 85 60 100 T110 100" stroke="#38BDF8" strokeWidth="6" strokeLinecap="round" fill="none" />
      <circle cx="30" cy="94" r="2.5" fill="#E0F2FE" />
      <circle cx="75" cy="92" r="3" fill="#E0F2FE" />
      {/* Leaping Curved Dolphin Body */}
      <path d="M20 72 C32 35 78 30 104 65 C92 68 84 66 78 62 C55 45 35 55 20 72 Z" fill="url(#dolphinSkin)" />
      {/* Cute Snout Beak */}
      <path d="M18 72 C12 73 14 78 22 77 Z" fill="url(#dolphinSkin)" />
      {/* Dorsal Fin */}
      <path d="M60 38 Q66 22 76 34 Z" fill="#1D4ED8" />
      {/* Tail Fluke */}
      <path d="M104 65 L116 54 L110 68 L116 80 Z" fill="#1D4ED8" />
      {/* White Dolphin Belly */}
      <path d="M30 68 C45 52 65 52 78 62 C60 62 45 68 30 68 Z" fill="#EFF6FF" />
      {/* Smiling Eye */}
      <circle cx="28" cy="65" r="2.5" fill="#0F172A" />
      <circle cx="29" cy="64" r="0.8" fill="white" />
    </svg>
  ),

  // ----------------------------------------------------
  // AKULA (Shark) - Cool slate-blue shark with dorsal fin
  // ----------------------------------------------------
  'sea-shark': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sharkSkin" cx="40%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#94A3B8" />
          <stop offset="60%" stopColor="#475569" />
          <stop offset="100%" stopColor="#1E293B" />
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="106" rx="42" ry="8" fill="#0F172A" fillOpacity="0.25" />
      {/* Iconic Dorsal Fin */}
      <path d="M50 48 Q56 22 72 42 Z" fill="#334155" />
      {/* Sleek Shark Body */}
      <path d="M15 65 C30 46 80 46 102 62 L116 48 L110 65 L116 80 L102 68 C80 82 30 82 15 65 Z" fill="url(#sharkSkin)" />
      {/* White Belly */}
      <path d="M22 68 C40 76 75 76 96 66 C80 80 40 80 22 68 Z" fill="#F8FAFC" />
      {/* Gill slits */}
      <line x1="48" y1="58" x2="46" y2="68" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
      <line x1="53" y1="58" x2="51" y2="68" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
      <line x1="58" y1="58" x2="56" y2="68" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
      {/* Friendly Shark Eye */}
      <circle cx="30" cy="58" r="3.5" fill="#0F172A" />
      <circle cx="31" cy="57" r="1.2" fill="white" />
      {/* Cute Grin with little clean teeth */}
      <path d="M26 68 Q34 74 42 68" stroke="#0F172A" strokeWidth="2" fill="none" />
      <polygon points="30,68 32,71 34,68" fill="white" />
      <polygon points="35,69 37,72 39,69" fill="white" />
    </svg>
  ),

  // ----------------------------------------------------
  // DENGIZ TOSHBAQASI (Sea Turtle) - Patterned green shell
  // ----------------------------------------------------
  'sea-turtle': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="turtleShell" cx="45%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#4ADE80" />
          <stop offset="60%" stopColor="#16A34A" />
          <stop offset="100%" stopColor="#14532D" />
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="106" rx="38" ry="8" fill="#14532D" fillOpacity="0.25" />
      {/* Front Paddle Flippers */}
      <ellipse cx="32" cy="46" rx="16" ry="7" transform="rotate(-35 32 46)" fill="#86EFAC" />
      <ellipse cx="88" cy="46" rx="16" ry="7" transform="rotate(35 88 46)" fill="#86EFAC" />
      {/* Rear Flippers */}
      <ellipse cx="40" cy="85" rx="10" ry="5" transform="rotate(25 40 85)" fill="#86EFAC" />
      <ellipse cx="80" cy="85" rx="10" ry="5" transform="rotate(-25 80 85)" fill="#86EFAC" />
      {/* Head */}
      <circle cx="60" cy="30" r="12" fill="#86EFAC" />
      <circle cx="55" cy="27" r="2.5" fill="#14532D" />
      <circle cx="65" cy="27" r="2.5" fill="#14532D" />
      {/* Big Beautiful Patterned Shell */}
      <ellipse cx="60" cy="64" rx="28" ry="26" fill="url(#turtleShell)" stroke="#14532D" strokeWidth="2" />
      {/* Geometric Shell Scutes */}
      <polygon points="60,46 72,54 72,68 60,76 48,68 48,54" fill="#22C55E" stroke="#14532D" strokeWidth="1.5" />
      <line x1="60" y1="46" x2="60" y2="38" stroke="#14532D" strokeWidth="1.5" />
      <line x1="72" y1="54" x2="84" y2="50" stroke="#14532D" strokeWidth="1.5" />
      <line x1="72" y1="68" x2="84" y2="72" stroke="#14532D" strokeWidth="1.5" />
      <line x1="60" y1="76" x2="60" y2="88" stroke="#14532D" strokeWidth="1.5" />
      <line x1="48" y1="68" x2="36" y2="72" stroke="#14532D" strokeWidth="1.5" />
      <line x1="48" y1="54" x2="36" y2="50" stroke="#14532D" strokeWidth="1.5" />
    </svg>
  ),

  // ----------------------------------------------------
  // SAKKIZOYOQ (Octopus) - Purple-magenta with curly tentacles
  // ----------------------------------------------------
  'sea-octopus': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="octoGrad" cx="45%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#F472B6" />
          <stop offset="60%" stopColor="#C026D3" />
          <stop offset="100%" stopColor="#86198F" />
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="106" rx="38" ry="8" fill="#701A75" fillOpacity="0.25" />
      {/* 8 Curled Wavy Tentacles */}
      <path d="M35 70 Q15 80 18 95 Q26 95 32 85" stroke="#C026D3" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M45 74 Q32 90 38 102 Q46 102 48 88" stroke="#C026D3" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M55 76 Q52 95 56 104 Q62 104 62 88" stroke="#C026D3" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M68 76 Q72 95 68 104 Q74 104 74 88" stroke="#C026D3" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M78 74 Q90 90 84 102 Q78 102 76 88" stroke="#C026D3" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M85 70 Q105 80 102 95 Q94 95 88 85" stroke="#C026D3" strokeWidth="5" strokeLinecap="round" fill="none" />
      {/* Round Bulbous Head */}
      <circle cx="60" cy="48" r="28" fill="url(#octoGrad)" />
      {/* Huge Kawaii Eyes */}
      <circle cx="48" cy="50" r="7" fill="#0F172A" />
      <circle cx="50" cy="48" r="3" fill="white" />
      <circle cx="72" cy="50" r="7" fill="#0F172A" />
      <circle cx="74" cy="48" r="3" fill="white" />
      {/* Cute Mouth & Pink Cheeks */}
      <ellipse cx="38" cy="58" rx="4" ry="2" fill="#F472B6" />
      <ellipse cx="82" cy="58" rx="4" ry="2" fill="#F472B6" />
      <circle cx="60" cy="62" r="3" fill="#86198F" />
    </svg>
  ),

  // ----------------------------------------------------
  // DENGIZ OTI (Seahorse) - Golden-coral with curled tail
  // ----------------------------------------------------
  'sea-seahorse': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="seahorseSkin" cx="40%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#FDBA74" />
          <stop offset="60%" stopColor="#FB923C" />
          <stop offset="100%" stopColor="#C2410C" />
        </radialGradient>
      </defs>
      {/* Bubbles */}
      <circle cx="85" cy="30" r="4" fill="#38BDF8" fillOpacity="0.6" />
      <circle cx="92" cy="45" r="2.5" fill="#38BDF8" fillOpacity="0.6" />
      {/* Dorsal Fin */}
      <path d="M42 55 Q32 62 42 72 Z" fill="#FDE047" />
      {/* Seahorse Head & Snout */}
      <circle cx="60" cy="32" r="14" fill="url(#seahorseSkin)" />
      <path d="M60 22 Q54 14 62 16 Q64 24 66 22" stroke="#EA580C" strokeWidth="2.5" fill="#FDE047" />
      <rect x="66" y="32" width="16" height="6" rx="3" fill="url(#seahorseSkin)" />
      {/* Eye */}
      <circle cx="58" cy="30" r="3.5" fill="#431407" />
      <circle cx="59" cy="29" r="1" fill="white" />
      {/* Plump Belly */}
      <path d="M52 42 C44 54 46 72 58 75 C68 72 68 54 58 42 Z" fill="url(#seahorseSkin)" />
      <ellipse cx="58" cy="58" rx="8" ry="12" fill="#FEF08A" />
      {/* Spiral Curled Tail */}
      <path d="M56 75 C56 88 48 98 42 94 C36 90 42 82 48 84" stroke="#EA580C" strokeWidth="6" strokeLinecap="round" fill="none" />
    </svg>
  ),

  // ----------------------------------------------------
  // QISQICHBAQA (Crab) - Radiant red with two big pincers
  // ----------------------------------------------------
  'sea-crab': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="crabRed" cx="45%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#F87171" />
          <stop offset="60%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#991B1B" />
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="106" rx="38" ry="8" fill="#7F1D1D" fillOpacity="0.25" />
      {/* Walking Legs */}
      <path d="M30 75 Q15 82 18 96 M32 82 Q18 90 24 102 M36 88 Q25 98 32 106" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M90 75 Q105 82 102 96 M88 82 Q102 90 96 102 M84 88 Q95 98 88 106" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* Two Big Pincers Claws */}
      <path d="M38 52 C22 45 16 28 26 22 C34 16 42 32 38 52 Z" fill="url(#crabRed)" />
      <path d="M22 28 Q30 20 34 32" stroke="#991B1B" strokeWidth="2" fill="none" />
      <path d="M82 52 C98 45 104 28 94 22 C86 16 78 32 82 52 Z" fill="url(#crabRed)" />
      {/* Main Oval Shell Body */}
      <ellipse cx="60" cy="74" rx="28" ry="20" fill="url(#crabRed)" />
      {/* Stalk Eyes */}
      <circle cx="48" cy="50" r="7" fill="white" stroke="#DC2626" strokeWidth="2" />
      <circle cx="48" cy="50" r="3.5" fill="#0F172A" />
      <circle cx="49" cy="49" r="1.2" fill="white" />
      <circle cx="72" cy="50" r="7" fill="white" stroke="#DC2626" strokeWidth="2" />
      <circle cx="72" cy="50" r="3.5" fill="#0F172A" />
      <circle cx="73" cy="49" r="1.2" fill="white" />
      {/* Happy Smile */}
      <path d="M50 78 Q60 86 70 78" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </svg>
  ),

  // ----------------------------------------------------
  // MEDUZA (Jellyfish) - Translucent glowing dome & tendrils
  // ----------------------------------------------------
  'sea-jellyfish': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="jellyDome" cx="45%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#E879F9" />
          <stop offset="60%" stopColor="#C084FC" />
          <stop offset="100%" stopColor="#7E22CE" />
        </radialGradient>
      </defs>
      {/* Glowing Floating Dome */}
      <path d="M25 55 C25 25 95 25 95 55 C85 62 75 58 60 60 C45 58 35 62 25 55 Z" fill="url(#jellyDome)" fillOpacity="0.85" />
      {/* Cute Eyes inside dome */}
      <circle cx="48" cy="44" r="3" fill="#3B0764" />
      <circle cx="72" cy="44" r="3" fill="#3B0764" />
      <path d="M56 48 Q60 52 64 48" stroke="#3B0764" strokeWidth="1.5" fill="none" />
      {/* Wavy Flowing Tentacles */}
      <path d="M35 58 Q30 75 36 90 Q42 105 34 115" stroke="#C084FC" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M48 60 Q56 75 50 92 Q44 108 52 118" stroke="#E879F9" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M62 60 Q70 78 64 94 Q58 110 66 118" stroke="#E879F9" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M75 60 Q82 75 76 90 Q70 105 78 116" stroke="#C084FC" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M85 58 Q92 75 86 90 Q80 105 88 115" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  ),

  // ----------------------------------------------------
  // ASALARI (Bee) - Fuzzy bumblebee with yellow/black stripes
  // ----------------------------------------------------
  'ins-bee': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="beeWing" cx="40%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#E0F2FE" />
          <stop offset="100%" stopColor="#BAE6FD" stopOpacity="0.7" />
        </radialGradient>
      </defs>
      {/* Translucent Gossamer Wings */}
      <ellipse cx="44" cy="34" rx="14" ry="24" transform="rotate(-30 44 34)" fill="url(#beeWing)" stroke="#38BDF8" strokeWidth="1.5" />
      <ellipse cx="76" cy="34" rx="14" ry="24" transform="rotate(30 76 34)" fill="url(#beeWing)" stroke="#38BDF8" strokeWidth="1.5" />
      {/* Plump Fuzzy Striped Body */}
      <ellipse cx="60" cy="68" rx="28" ry="24" fill="#FACC15" />
      {/* Black Stripes */}
      <path d="M42 56 Q60 62 78 56 L78 64 Q60 70 42 64 Z" fill="#18181B" />
      <path d="M44 72 Q60 78 76 72 L74 80 Q60 86 46 80 Z" fill="#18181B" />
      {/* Cute Stinger */}
      <polygon points="57,91 63,91 60,98" fill="#18181B" />
      {/* Head */}
      <circle cx="60" cy="46" r="18" fill="#18181B" />
      {/* Antennae */}
      <path d="M52 32 Q46 20 40 22" stroke="#18181B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="40" cy="22" r="3" fill="#FACC15" />
      <path d="M68 32 Q74 20 80 22" stroke="#18181B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="80" cy="22" r="3" fill="#FACC15" />
      {/* Big Kawaii Eyes */}
      <circle cx="52" cy="44" r="5" fill="white" />
      <circle cx="52" cy="44" r="2.5" fill="#0F172A" />
      <circle cx="68" cy="44" r="5" fill="white" />
      <circle cx="68" cy="44" r="2.5" fill="#0F172A" />
      {/* Rosy Cheeks */}
      <ellipse cx="45" cy="52" rx="3" ry="1.5" fill="#FB7185" />
      <ellipse cx="75" cy="52" rx="3" ry="1.5" fill="#FB7185" />
    </svg>
  ),

  // ----------------------------------------------------
  // NINACHI (Dragonfly) - Slender turquoise body, 4 crystal wings
  // ----------------------------------------------------
  'ins-dragonfly': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="wingGrad" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#CCFBF1" />
          <stop offset="100%" stopColor="#5EEAD4" stopOpacity="0.5" />
        </radialGradient>
      </defs>
      {/* 4 Crystal Gossamer Wings */}
      <ellipse cx="32" cy="42" rx="26" ry="7" transform="rotate(-15 32 42)" fill="url(#wingGrad)" stroke="#14B8A6" strokeWidth="1" />
      <ellipse cx="88" cy="42" rx="26" ry="7" transform="rotate(15 88 42)" fill="url(#wingGrad)" stroke="#14B8A6" strokeWidth="1" />
      <ellipse cx="34" cy="58" rx="24" ry="6" transform="rotate(-5 34 58)" fill="url(#wingGrad)" stroke="#14B8A6" strokeWidth="1" />
      <ellipse cx="86" cy="58" rx="24" ry="6" transform="rotate(5 86 58)" fill="url(#wingGrad)" stroke="#14B8A6" strokeWidth="1" />
      {/* Slender Long Abdomen */}
      <rect x="57" y="44" width="6" height="64" rx="3" fill="#0D9488" />
      {/* Thorax */}
      <ellipse cx="60" cy="46" rx="6" ry="8" fill="#14B8A6" />
      {/* Head & Huge Dragonfly Eyes */}
      <circle cx="54" cy="34" r="7" fill="#06B6D4" stroke="#0891B2" strokeWidth="1" />
      <circle cx="55" cy="33" r="2" fill="white" />
      <circle cx="66" cy="34" r="7" fill="#06B6D4" stroke="#0891B2" strokeWidth="1" />
      <circle cx="67" cy="33" r="2" fill="white" />
    </svg>
  ),

  // ----------------------------------------------------
  // XONQIZI (Ladybug) - Glossy red shell with 7 black spots
  // ----------------------------------------------------
  'ins-ladybug': ({ className = 'w-24 h-24' }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="ladybugShell" cx="38%" cy="32%" r="62%">
          <stop offset="0%" stopColor="#FFA0B2" />
          <stop offset="25%" stopColor="#FF2E56" />
          <stop offset="65%" stopColor="#D90429" />
          <stop offset="100%" stopColor="#8A0014" />
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="106" rx="36" ry="8" fill="#500724" fillOpacity="0.25" />
      {/* Little legs */}
      <line x1="36" y1="56" x2="20" y2="48" stroke="#18181B" strokeWidth="3" strokeLinecap="round" />
      <line x1="32" y1="70" x2="16" y2="70" stroke="#18181B" strokeWidth="3" strokeLinecap="round" />
      <line x1="36" y1="84" x2="20" y2="92" stroke="#18181B" strokeWidth="3" strokeLinecap="round" />
      <line x1="84" y1="56" x2="100" y2="48" stroke="#18181B" strokeWidth="3" strokeLinecap="round" />
      <line x1="88" y1="70" x2="104" y2="70" stroke="#18181B" strokeWidth="3" strokeLinecap="round" />
      <line x1="84" y1="84" x2="100" y2="92" stroke="#18181B" strokeWidth="3" strokeLinecap="round" />
      {/* Head */}
      <circle cx="60" cy="38" r="16" fill="#18181B" />
      {/* Antennae */}
      <path d="M54 26 Q46 16 38 18" stroke="#18181B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="38" cy="18" r="2.5" fill="#18181B" />
      <path d="M66 26 Q74 16 82 18" stroke="#18181B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="82" cy="18" r="2.5" fill="#18181B" />
      {/* Eyes */}
      <circle cx="52" cy="34" r="3" fill="white" />
      <circle cx="52" cy="34" r="1.5" fill="#0F172A" />
      <circle cx="68" cy="34" r="3" fill="white" />
      <circle cx="68" cy="34" r="1.5" fill="#0F172A" />
      {/* Glossy Red Round Shell */}
      <circle cx="60" cy="70" r="32" fill="url(#ladybugShell)" />
      {/* Center wing line */}
      <line x1="60" y1="38" x2="60" y2="102" stroke="#18181B" strokeWidth="3" />
      {/* Iconic Black Spots */}
      <circle cx="44" cy="56" r="5" fill="#18181B" />
      <circle cx="76" cy="56" r="5" fill="#18181B" />
      <circle cx="38" cy="74" r="4.5" fill="#18181B" />
      <circle cx="82" cy="74" r="4.5" fill="#18181B" />
      <circle cx="46" cy="90" r="4" fill="#18181B" />
      <circle cx="74" cy="90" r="4" fill="#18181B" />
      {/* Specular White Highlight */}
      <ellipse cx="48" cy="54" rx="8" ry="4" transform="rotate(-30 48 54)" fill="white" fillOpacity="0.6" />
    </svg>
  ),
};
