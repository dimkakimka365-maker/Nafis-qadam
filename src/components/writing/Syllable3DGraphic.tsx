import React, { useState } from 'react';
import { AnimalCharacterGraphic } from '../common/AnimalCharacterGraphic';

interface Syllable3DGraphicProps {
  wordId: string;
  emoji: string;
  className?: string;
  allowChildToggle?: boolean;
}

export const Syllable3DGraphic: React.FC<Syllable3DGraphicProps> = ({
  wordId,
  emoji,
  className = 'w-36 h-36 sm:w-44 sm:h-44',
  allowChildToggle = true,
}) => {
  // For 'syl_bola', allow toggling between cheerful boy and lovely girl
  const [childVariant, setChildVariant] = useState<'boy' | 'girl'>('boy');

  const renderGraphic = () => {
    switch (wordId) {
      // ----------------------------------------------------
      // 1. BOLA (3D Pixar-Style Cheerful Boy or Girl)
      // ----------------------------------------------------
      case 'syl_bola':
        return (
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            <svg
              viewBox="0 0 160 160"
              className="w-full h-full filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.22)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Skin Gradient - Warm Peach 3D Lit */}
                <radialGradient id="childSkinGrad" cx="42%" cy="36%" r="65%">
                  <stop offset="0%" stopColor="#FFF1E6" />
                  <stop offset="35%" stopColor="#FFDFC7" />
                  <stop offset="75%" stopColor="#F9BC94" />
                  <stop offset="100%" stopColor="#E08B5D" />
                </radialGradient>

                {/* Boy Hair Gradient - Rich Glossy Chestnut */}
                <radialGradient id="boyHairGrad3D" cx="45%" cy="30%" r="65%">
                  <stop offset="0%" stopColor="#8D5524" />
                  <stop offset="50%" stopColor="#663A14" />
                  <stop offset="100%" stopColor="#3D2008" />
                </radialGradient>

                {/* Girl Hair Gradient - Warm Golden Amber */}
                <radialGradient id="girlHairGrad3D" cx="45%" cy="30%" r="65%">
                  <stop offset="0%" stopColor="#FFA726" />
                  <stop offset="60%" stopColor="#E65100" />
                  <stop offset="100%" stopColor="#BF360C" />
                </radialGradient>

                {/* 3D Cap Gradient - Electric Royal Blue */}
                <radialGradient id="boyCapGrad3D" cx="40%" cy="30%" r="65%">
                  <stop offset="0%" stopColor="#60A5FA" />
                  <stop offset="50%" stopColor="#2563EB" />
                  <stop offset="85%" stopColor="#1D4ED8" />
                  <stop offset="100%" stopColor="#172554" />
                </radialGradient>

                {/* Girl Ribbons - Glowing Ruby Pink */}
                <radialGradient id="girlRibbonGrad" cx="35%" cy="30%" r="65%">
                  <stop offset="0%" stopColor="#FF69B4" />
                  <stop offset="60%" stopColor="#FF1493" />
                  <stop offset="100%" stopColor="#C2185B" />
                </radialGradient>

                {/* Shirt Gradient */}
                <radialGradient id="boyShirtGrad" cx="45%" cy="30%" r="65%">
                  <stop offset="0%" stopColor="#34D399" />
                  <stop offset="65%" stopColor="#059669" />
                  <stop offset="100%" stopColor="#064E3B" />
                </radialGradient>
                <radialGradient id="girlShirtGrad" cx="45%" cy="30%" r="65%">
                  <stop offset="0%" stopColor="#F472B6" />
                  <stop offset="65%" stopColor="#DB2777" />
                  <stop offset="100%" stopColor="#831843" />
                </radialGradient>

                {/* Soft Ground Contact Shadow */}
                <radialGradient id="contactShadowGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#000000" stopOpacity="0.35" />
                  <stop offset="70%" stopColor="#000000" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Ground Shadow */}
              <ellipse cx="80" cy="150" rx="55" ry="9" fill="url(#contactShadowGrad)" />

              {childVariant === 'boy' ? (
                /* =================== 3D CHEERFUL BOY =================== */
                <g>
                  {/* Torso / Striped Bright Shirt */}
                  <path
                    d="M44 135 C44 116, 56 108, 80 108 C104 108, 116 116, 116 135 L122 152 C122 154, 38 154, 38 152 Z"
                    fill="url(#boyShirtGrad)"
                  />
                  {/* Shirt Stripes */}
                  <path d="M46 126 Q80 134 114 126" stroke="#FEF08A" strokeWidth="4" strokeLinecap="round" />
                  <path d="M40 140 Q80 148 120 140" stroke="#FEF08A" strokeWidth="4.5" strokeLinecap="round" />

                  {/* Little Cheerful Hand Waving */}
                  <g className="animate-bounce-gentle origin-bottom-left">
                    <circle cx="128" cy="115" r="9" fill="url(#childSkinGrad)" />
                    <circle cx="134" cy="110" r="3.5" fill="#F9BC94" />
                    <circle cx="136" cy="115" r="3" fill="#F9BC94" />
                    <circle cx="134" cy="120" r="3" fill="#F9BC94" />
                  </g>

                  {/* Neck */}
                  <rect x="72" y="98" width="16" height="16" rx="6" fill="#E08B5D" />

                  {/* Ears with 3D Depth */}
                  <circle cx="38" cy="74" r="11" fill="url(#childSkinGrad)" />
                  <circle cx="39" cy="74" r="6" fill="#E08B5D" fillOpacity="0.4" />
                  <circle cx="122" cy="74" r="11" fill="url(#childSkinGrad)" />
                  <circle cx="121" cy="74" r="6" fill="#E08B5D" fillOpacity="0.4" />

                  {/* 3D Head */}
                  <ellipse cx="80" cy="74" rx="42" ry="39" fill="url(#childSkinGrad)" />

                  {/* Rosy Blush Cheeks */}
                  <circle cx="52" cy="85" r="9" fill="#FF5722" fillOpacity="0.32" />
                  <circle cx="108" cy="85" r="9" fill="#FF5722" fillOpacity="0.32" />

                  {/* Big Disney/Pixar Expressive Eyes */}
                  {/* Eye Sockets */}
                  <ellipse cx="61" cy="69" rx="8.5" ry="11" fill="#0F172A" />
                  <ellipse cx="59" cy="65" rx="4" ry="5.5" fill="#FFFFFF" />
                  <circle cx="64" cy="73" r="1.8" fill="#FFFFFF" />

                  <ellipse cx="99" cy="69" rx="8.5" ry="11" fill="#0F172A" />
                  <ellipse cx="97" cy="65" rx="4" ry="5.5" fill="#FFFFFF" />
                  <circle cx="102" cy="73" r="1.8" fill="#FFFFFF" />

                  {/* Cute Eyebrows */}
                  <path d="M51 54 Q61 49 71 55" stroke="#4A2609" strokeWidth="3" strokeLinecap="round" fill="none" />
                  <path d="M89 55 Q99 49 109 54" stroke="#4A2609" strokeWidth="3" strokeLinecap="round" fill="none" />

                  {/* 3D Button Nose */}
                  <ellipse cx="80" cy="79" rx="5" ry="3.5" fill="#E08B5D" />
                  <ellipse cx="79" cy="78" rx="2" ry="1.2" fill="#FFFFFF" fillOpacity="0.6" />

                  {/* Radiant Happy Grin */}
                  <path d="M66 88 Q80 105 94 88 Z" fill="#D90429" />
                  <path d="M70 89 Q80 95 90 89" fill="#FFFFFF" />
                  <path d="M74 97 Q80 101 86 97" fill="#FF758F" />

                  {/* 3D Cool Baseball Cap */}
                  {/* Cap Dome */}
                  <path
                    d="M36 60 C36 28, 60 20, 80 20 C100 20, 124 28, 124 60 Z"
                    fill="url(#boyCapGrad3D)"
                  />
                  {/* Cap Crown Button & Golden Star */}
                  <circle cx="80" cy="20" r="4.5" fill="#FBBF24" />
                  <path
                    d="M80 34 L82.5 39.5 L88 40 L84 44 L85 49.5 L80 46.5 L75 49.5 L76 44 L72 40 L77.5 39.5 Z"
                    fill="#FDE047"
                    filter="drop-shadow(0 2px 2px rgba(0,0,0,0.3))"
                  />
                  {/* Cap Visor Curved Brim */}
                  <path
                    d="M32 60 C52 54, 108 54, 128 60 C118 71, 42 71, 32 60 Z"
                    fill="#1D4ED8"
                  />
                  <ellipse cx="80" cy="62" rx="42" ry="4" fill="#60A5FA" fillOpacity="0.4" />
                </g>
              ) : (
                /* =================== 3D CHEERFUL GIRL =================== */
                <g>
                  {/* Torso / Pretty Pink Dress */}
                  <path
                    d="M44 135 C44 116, 56 108, 80 108 C104 108, 116 116, 116 135 L122 152 C122 154, 38 154, 38 152 Z"
                    fill="url(#girlShirtGrad)"
                  />
                  {/* Dress Lace Collar */}
                  <path d="M64 108 Q80 120 96 108" fill="#FFFFFF" stroke="#FCE7F3" strokeWidth="2" />
                  <circle cx="80" cy="116" r="3.5" fill="#FEF08A" />

                  {/* Golden Pigtails */}
                  <circle cx="28" cy="58" r="18" fill="url(#girlHairGrad3D)" />
                  <circle cx="132" cy="58" r="18" fill="url(#girlHairGrad3D)" />

                  {/* Bright Ribbons & Bows */}
                  <circle cx="38" cy="52" r="7" fill="url(#girlRibbonGrad)" />
                  <circle cx="122" cy="52" r="7" fill="url(#girlRibbonGrad)" />
                  <polygon points="34,52 24,44 26,58" fill="#FF1493" />
                  <polygon points="126,52 136,44 134,58" fill="#FF1493" />

                  {/* Neck */}
                  <rect x="72" y="98" width="16" height="16" rx="6" fill="#E08B5D" />

                  {/* Ears */}
                  <circle cx="40" cy="74" r="10" fill="url(#childSkinGrad)" />
                  <circle cx="120" cy="74" r="10" fill="url(#childSkinGrad)" />

                  {/* 3D Head */}
                  <ellipse cx="80" cy="74" rx="41" ry="38" fill="url(#childSkinGrad)" />

                  {/* Soft Hair Bangs / Front Fringe */}
                  <path
                    d="M42 58 C50 38, 110 38, 118 58 C100 52, 80 60, 80 60 C80 60, 60 52, 42 58 Z"
                    fill="url(#girlHairGrad3D)"
                  />

                  {/* Cheerful Rosy Cheeks */}
                  <circle cx="52" cy="85" r="9.5" fill="#FF1493" fillOpacity="0.35" />
                  <circle cx="108" cy="85" r="9.5" fill="#FF1493" fillOpacity="0.35" />

                  {/* Big Disney Eyes with Eyelashes */}
                  <ellipse cx="61" cy="69" rx="8.5" ry="11" fill="#0F172A" />
                  <ellipse cx="59" cy="65" rx="4" ry="5.5" fill="#FFFFFF" />
                  <circle cx="64" cy="73" r="1.8" fill="#FFFFFF" />
                  {/* Cute Eyelashes */}
                  <path d="M53 60 L57 63 M60 58 L62 62" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />

                  <ellipse cx="99" cy="69" rx="8.5" ry="11" fill="#0F172A" />
                  <ellipse cx="97" cy="65" rx="4" ry="5.5" fill="#FFFFFF" />
                  <circle cx="102" cy="73" r="1.8" fill="#FFFFFF" />
                  <path d="M107 60 L103 63 M100 58 L98 62" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />

                  {/* Eyebrows */}
                  <path d="M52 53 Q61 48 70 54" stroke="#8D5524" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <path d="M90 54 Q99 48 108 53" stroke="#8D5524" strokeWidth="2.5" strokeLinecap="round" fill="none" />

                  {/* 3D Button Nose */}
                  <ellipse cx="80" cy="79" rx="4.5" ry="3.2" fill="#E08B5D" />

                  {/* Radiant Smile */}
                  <path d="M68 88 Q80 102 92 88" stroke="#C2185B" strokeWidth="3.5" strokeLinecap="round" fill="none" />

                  {/* Golden Sparkle Flower Hairclip */}
                  <circle cx="108" cy="44" r="6" fill="#FBBF24" />
                  <circle cx="108" cy="44" r="3" fill="#EC4899" />
                </g>
              )}
            </svg>

            {/* Boy / Girl Switcher Pills */}
            {allowChildToggle && (
              <div className="mt-2 flex items-center gap-1.5 bg-white/90 backdrop-blur-xs p-1 rounded-2xl border-2 border-amber-300 shadow-sm z-10">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setChildVariant('boy');
                  }}
                  className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    childVariant === 'boy'
                      ? 'bg-blue-500 text-white shadow-xs scale-105'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  👦 Bolakay
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setChildVariant('girl');
                  }}
                  className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    childVariant === 'girl'
                      ? 'bg-pink-500 text-white shadow-xs scale-105'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  👧 Qizaloq
                </button>
              </div>
            )}
          </div>
        );

      // ----------------------------------------------------
      // 2. OLMA (3D Juicy Glossy Red Apple)
      // ----------------------------------------------------
      case 'syl_olma':
        return (
          <svg
            viewBox="0 0 160 160"
            className="w-full h-full filter drop-shadow-[0_10px_20px_rgba(217,4,41,0.3)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id="appleBodyGrad" cx="38%" cy="34%" r="65%">
                <stop offset="0%" stopColor="#FFA0B2" />
                <stop offset="25%" stopColor="#FF2E56" />
                <stop offset="65%" stopColor="#D90429" />
                <stop offset="90%" stopColor="#8A0014" />
                <stop offset="100%" stopColor="#4A000A" />
              </radialGradient>
              <radialGradient id="appleBounce" cx="65%" cy="85%" r="35%">
                <stop offset="0%" stopColor="#FF94A8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#D90429" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="leafGrad" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#86EFAC" />
                <stop offset="50%" stopColor="#22C55E" />
                <stop offset="100%" stopColor="#14532D" />
              </radialGradient>
            </defs>
            {/* Ground Shadow */}
            <ellipse cx="80" cy="148" rx="50" ry="10" fill="#4A000A" fillOpacity="0.3" />
            {/* Curved Stem */}
            <path d="M80 46 Q84 20 96 16" stroke="#5D4037" strokeWidth="6.5" strokeLinecap="round" fill="none" />
            {/* Glossy Green Leaf */}
            <path d="M84 36 C105 20, 126 28, 122 46 C106 52, 90 44, 84 36 Z" fill="url(#leafGrad)" />
            <path d="M84 36 Q103 36 122 46" stroke="#BBF7D0" strokeWidth="1.8" fill="none" />
            {/* Apple Main Body (Heart / Round Shape) */}
            <path
              d="M80 50 C46 36, 26 62, 26 94 C26 126, 52 144, 80 144 C108 144, 134 126, 134 94 C134 62, 114 36, 80 50 Z"
              fill="url(#appleBodyGrad)"
            />
            {/* Bounce Light */}
            <ellipse cx="80" cy="128" rx="40" ry="14" fill="url(#appleBounce)" />
            {/* Specular 3D Reflection */}
            <ellipse cx="56" cy="68" rx="16" ry="10" transform="rotate(-35 56 68)" fill="#FFFFFF" fillOpacity="0.85" />
            <ellipse cx="50" cy="62" rx="7" ry="4" transform="rotate(-35 50 62)" fill="#FFFFFF" fillOpacity="0.95" />
          </svg>
        );

      // ----------------------------------------------------
      // 3. DADA (3D Kind & Handsome Father)
      // ----------------------------------------------------
      case 'syl_dada':
        return (
          <svg
            viewBox="0 0 160 160"
            className="w-full h-full filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.24)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id="dadSkin" cx="42%" cy="36%" r="65%">
                <stop offset="0%" stopColor="#FFF1E6" />
                <stop offset="40%" stopColor="#FED7AA" />
                <stop offset="85%" stopColor="#FDBA74" />
                <stop offset="100%" stopColor="#EA580C" />
              </radialGradient>
              <radialGradient id="dadHair" cx="45%" cy="30%" r="65%">
                <stop offset="0%" stopColor="#475569" />
                <stop offset="50%" stopColor="#1E293B" />
                <stop offset="100%" stopColor="#0F172A" />
              </radialGradient>
              <radialGradient id="dadShirt" cx="40%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="60%" stopColor="#0284C7" />
                <stop offset="100%" stopColor="#0369A1" />
              </radialGradient>
            </defs>
            <ellipse cx="80" cy="150" rx="55" ry="9" fill="#0F172A" fillOpacity="0.25" />
            {/* Shirt & Tie */}
            <path d="M42 135 C42 114, 56 106, 80 106 C104 106, 118 114, 118 135 L124 154 H36 Z" fill="url(#dadShirt)" />
            {/* White Collar */}
            <polygon points="80,116 68,106 80,102 92,106" fill="#FFFFFF" />
            <polygon points="80,116 75,140 80,146 85,140" fill="#EF4444" />
            {/* Neck */}
            <rect x="72" y="96" width="16" height="16" rx="6" fill="#EA580C" />
            {/* Ears */}
            <circle cx="36" cy="74" r="11" fill="url(#dadSkin)" />
            <circle cx="124" cy="74" r="11" fill="url(#dadSkin)" />
            {/* Head */}
            <ellipse cx="80" cy="74" rx="42" ry="40" fill="url(#dadSkin)" />
            {/* Modern Neat Hair */}
            <path
              d="M34 60 C34 26, 55 18, 80 18 C105 18, 126 26, 126 60 C116 46, 96 40, 80 42 C64 40, 44 46, 34 60 Z"
              fill="url(#dadHair)"
            />
            {/* Glasses Frame with 3D Shine */}
            <rect x="46" y="58" width="28" height="22" rx="7" stroke="#1E293B" strokeWidth="4" fill="#FFFFFF" fillOpacity="0.25" />
            <rect x="86" y="58" width="28" height="22" rx="7" stroke="#1E293B" strokeWidth="4" fill="#FFFFFF" fillOpacity="0.25" />
            <path d="M74 68 L86 68" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
            {/* Eyes */}
            <circle cx="60" cy="69" r="4.5" fill="#0F172A" />
            <circle cx="58.5" cy="67.5" r="1.8" fill="#FFFFFF" />
            <circle cx="100" cy="69" r="4.5" fill="#0F172A" />
            <circle cx="98.5" cy="67.5" r="1.8" fill="#FFFFFF" />
            {/* Friendly Smile */}
            <path d="M68 88 Q80 100 92 88" stroke="#9A3412" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            {/* Cheerful Blush */}
            <circle cx="48" cy="84" r="7" fill="#F97316" fillOpacity="0.3" />
            <circle cx="112" cy="84" r="7" fill="#F97316" fillOpacity="0.3" />
          </svg>
        );

      // ----------------------------------------------------
      // 4. ONA (3D Radiant Loving Mother)
      // ----------------------------------------------------
      case 'syl_ona':
        return (
          <svg
            viewBox="0 0 160 160"
            className="w-full h-full filter drop-shadow-[0_10px_20px_rgba(219,39,119,0.25)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id="momSkin" cx="42%" cy="36%" r="65%">
                <stop offset="0%" stopColor="#FFF1E6" />
                <stop offset="40%" stopColor="#FED7AA" />
                <stop offset="85%" stopColor="#FDBA74" />
                <stop offset="100%" stopColor="#EA580C" />
              </radialGradient>
              <radialGradient id="momHair" cx="40%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#854D0E" />
                <stop offset="60%" stopColor="#713F12" />
                <stop offset="100%" stopColor="#3F2206" />
              </radialGradient>
              <radialGradient id="momDress" cx="40%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#F472B6" />
                <stop offset="60%" stopColor="#DB2777" />
                <stop offset="100%" stopColor="#9D174D" />
              </radialGradient>
            </defs>
            <ellipse cx="80" cy="150" rx="55" ry="9" fill="#831843" fillOpacity="0.22" />
            {/* Flowing Hair Back */}
            <path d="M30 64 C26 110, 40 140, 50 150 L110 150 C120 140, 134 110, 130 64 Z" fill="url(#momHair)" />
            {/* Elegant Dress */}
            <path d="M44 135 C44 115, 58 106, 80 106 C102 106, 116 115, 116 135 L122 154 H38 Z" fill="url(#momDress)" />
            {/* Pearl Necklace */}
            <path d="M66 112 Q80 124 94 112" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" strokeDasharray="1 8" />
            {/* Head */}
            <ellipse cx="80" cy="72" rx="39" ry="38" fill="url(#momSkin)" />
            {/* Hair Front Styling */}
            <path
              d="M34 60 C38 30, 60 20, 80 20 C100 20, 122 30, 126 60 C110 46, 92 42, 80 48 C68 42, 50 46, 34 60 Z"
              fill="url(#momHair)"
            />
            {/* Big Expressive Loving Eyes */}
            <ellipse cx="62" cy="68" rx="7.5" ry="9.5" fill="#1E293B" />
            <ellipse cx="60" cy="65" rx="3.5" ry="4.5" fill="#FFFFFF" />
            <circle cx="64" cy="71" r="1.5" fill="#FFFFFF" />
            <path d="M54 60 L57 63" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />

            <ellipse cx="98" cy="68" rx="7.5" ry="9.5" fill="#1E293B" />
            <ellipse cx="96" cy="65" rx="3.5" ry="4.5" fill="#FFFFFF" />
            <circle cx="100" cy="71" r="1.5" fill="#FFFFFF" />
            <path d="M106 60 L103 63" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />

            {/* Rosy Cheeks */}
            <circle cx="50" cy="80" r="8.5" fill="#F43F5E" fillOpacity="0.35" />
            <circle cx="110" cy="80" r="8.5" fill="#F43F5E" fillOpacity="0.35" />
            {/* Warm Loving Smile */}
            <path d="M68 86 Q80 98 92 86" stroke="#BE123C" strokeWidth="3.2" strokeLinecap="round" fill="none" />
            {/* Pearl Earring */}
            <circle cx="38" cy="78" r="4.5" fill="#FFFFFF" filter="drop-shadow(0 2px 2px rgba(0,0,0,0.2))" />
            <circle cx="122" cy="78" r="4.5" fill="#FFFFFF" filter="drop-shadow(0 2px 2px rgba(0,0,0,0.2))" />
          </svg>
        );

      // ----------------------------------------------------
      // 5. BALIQ (3D Glossy Ocean Goldfish)
      // ----------------------------------------------------
      case 'syl_baliq':
        return (
          <svg
            viewBox="0 0 160 160"
            className="w-full h-full filter drop-shadow-[0_10px_20px_rgba(14,165,233,0.3)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id="fishBody" cx="40%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#FDBA74" />
                <stop offset="40%" stopColor="#FB923C" />
                <stop offset="75%" stopColor="#EA580C" />
                <stop offset="100%" stopColor="#C2410C" />
              </radialGradient>
              <radialGradient id="fishFin" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#FED7AA" />
                <stop offset="60%" stopColor="#F97316" />
                <stop offset="100%" stopColor="#C2410C" />
              </radialGradient>
            </defs>
            <ellipse cx="80" cy="148" rx="46" ry="9" fill="#0C4A6E" fillOpacity="0.25" />
            {/* Tail Fin */}
            <path d="M42 80 C18 52, 10 70, 16 80 C10 90, 18 108, 42 80 Z" fill="url(#fishFin)" />
            {/* Top Dorsal Fin */}
            <path d="M72 48 C82 30, 106 32, 112 52 Z" fill="url(#fishFin)" />
            {/* Fish Oval 3D Body */}
            <ellipse cx="88" cy="80" rx="44" ry="34" fill="url(#fishBody)" />
            {/* White Stripes with Black Borders */}
            <path d="M82 48 Q88 80 82 112" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" />
            {/* Pectoral Fin */}
            <ellipse cx="78" cy="88" rx="14" ry="8" transform="rotate(-20 78 88)" fill="url(#fishFin)" />
            {/* Big Cute Eye */}
            <ellipse cx="114" cy="74" rx="8" ry="10" fill="#0F172A" />
            <ellipse cx="112" cy="71" rx="4" ry="5" fill="#FFFFFF" />
            <circle cx="116" cy="76" r="1.5" fill="#FFFFFF" />
            {/* Cute Smile / Mouth */}
            <path d="M128 84 Q124 90 120 86" stroke="#9A3412" strokeWidth="3" strokeLinecap="round" fill="none" />
            {/* Water Bubbles */}
            <circle cx="138" cy="62" r="6" fill="#38BDF8" fillOpacity="0.5" stroke="#FFFFFF" strokeWidth="1.5" />
            <circle cx="144" cy="46" r="4" fill="#38BDF8" fillOpacity="0.6" stroke="#FFFFFF" strokeWidth="1.2" />
          </svg>
        );

      // ----------------------------------------------------
      // 6. KITOB (3D Fairytale Glowing Book)
      // ----------------------------------------------------
      case 'syl_kitob':
        return (
          <svg
            viewBox="0 0 160 160"
            className="w-full h-full filter drop-shadow-[0_10px_20px_rgba(99,102,241,0.3)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id="bookCover" cx="40%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#818CF8" />
                <stop offset="60%" stopColor="#4F46E5" />
                <stop offset="100%" stopColor="#312E81" />
              </radialGradient>
              <radialGradient id="bookPages" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="80%" stopColor="#F1F5F9" />
                <stop offset="100%" stopColor="#CBD5E1" />
              </radialGradient>
            </defs>
            <ellipse cx="80" cy="148" rx="55" ry="9" fill="#1E1B4B" fillOpacity="0.25" />
            {/* Book Base Cover */}
            <path d="M22 118 Q80 134 138 118 L142 128 Q80 144 18 128 Z" fill="#312E81" />
            {/* 3D Curved Open Pages */}
            <path d="M22 114 Q80 128 138 114 L138 68 Q80 82 22 68 Z" fill="url(#bookCover)" />
            {/* Left Page Wing */}
            <path d="M24 64 Q52 74 78 72 L78 118 Q52 120 24 110 Z" fill="url(#bookPages)" stroke="#E2E8F0" strokeWidth="2" />
            {/* Right Page Wing */}
            <path d="M82 72 Q108 74 136 64 L136 110 Q108 120 82 118 Z" fill="url(#bookPages)" stroke="#E2E8F0" strokeWidth="2" />
            {/* Golden Ribbon Bookmark */}
            <path d="M80 72 Q82 108 74 134 L80 128 L86 134 Q82 108 80 72 Z" fill="#FBBF24" />
            {/* Magic Sparkles from Book */}
            <polygon points="52,48 54,42 60,40 54,38 52,32 50,38 44,40 50,42" fill="#FDE047" />
            <polygon points="106,44 107.5,39 112,38 107.5,37 106,32 104.5,37 100,38 104.5,39" fill="#FDE047" />
            <circle cx="80" cy="40" r="3" fill="#38BDF8" />
          </svg>
        );

      // ----------------------------------------------------
      // 7. MUSHUK (3D Cute Ginger Fluffy Cat)
      // ----------------------------------------------------
      case 'syl_mushuk':
        return (
          <svg
            viewBox="0 0 160 160"
            className="w-full h-full filter drop-shadow-[0_10px_20px_rgba(234,88,12,0.3)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id="catFur" cx="42%" cy="36%" r="65%">
                <stop offset="0%" stopColor="#FDBA74" />
                <stop offset="50%" stopColor="#FB923C" />
                <stop offset="85%" stopColor="#EA580C" />
                <stop offset="100%" stopColor="#C2410C" />
              </radialGradient>
            </defs>
            <ellipse cx="80" cy="148" rx="50" ry="9" fill="#7C2D12" fillOpacity="0.25" />
            {/* Cat Ears */}
            <polygon points="34,54 54,16 72,50" fill="url(#catFur)" />
            <polygon points="42,48 54,26 64,46" fill="#F472B6" />
            <polygon points="126,54 106,16 88,50" fill="url(#catFur)" />
            <polygon points="118,48 106,26 96,46" fill="#F472B6" />
            {/* Body */}
            <ellipse cx="80" cy="120" rx="38" ry="28" fill="url(#catFur)" />
            {/* Head */}
            <ellipse cx="80" cy="74" rx="44" ry="38" fill="url(#catFur)" />
            {/* Big Emerald Sparkling Cat Eyes */}
            <ellipse cx="60" cy="68" rx="8" ry="11" fill="#10B981" />
            <ellipse cx="60" cy="68" rx="3.5" ry="9" fill="#064E3B" />
            <circle cx="58" cy="64" r="2.8" fill="#FFFFFF" />
            <ellipse cx="100" cy="68" rx="8" ry="11" fill="#10B981" />
            <ellipse cx="100" cy="68" rx="3.5" ry="9" fill="#064E3B" />
            <circle cx="98" cy="64" r="2.8" fill="#FFFFFF" />
            {/* Pink Button Nose */}
            <polygon points="76,78 84,78 80,83" fill="#F43F5E" />
            {/* White Whisker Pads */}
            <circle cx="72" cy="85" r="7" fill="#FFFFFF" />
            <circle cx="88" cy="85" r="7" fill="#FFFFFF" />
            <path d="M74 88 Q80 94 86 88" stroke="#7C2D12" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* Whiskers */}
            <path d="M64 84 L38 80 M64 88 L36 92" stroke="#7C2D12" strokeWidth="2" strokeLinecap="round" />
            <path d="M96 84 L122 80 M96 88 L124 92" stroke="#7C2D12" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );

      // ----------------------------------------------------
      // 8. QUYOSH (3D Cheerful Smiling Sun)
      // ----------------------------------------------------
      case 'syl_quyosh':
        return (
          <svg
            viewBox="0 0 160 160"
            className="w-full h-full filter drop-shadow-[0_10px_20px_rgba(245,158,11,0.35)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id="sunCenter" cx="40%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#FEF08A" />
                <stop offset="40%" stopColor="#FBBF24" />
                <stop offset="80%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#D97706" />
              </radialGradient>
              <radialGradient id="sunRayGrad" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#FDE047" />
                <stop offset="100%" stopColor="#EA580C" />
              </radialGradient>
            </defs>
            {/* 3D Dimensional Rays */}
            <g className="animate-spin-slow origin-center">
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                <polygon
                  key={deg}
                  points="80,14 88,38 72,38"
                  transform={`rotate(${deg} 80 80)`}
                  fill="url(#sunRayGrad)"
                />
              ))}
            </g>
            {/* Sun Central Sphere */}
            <circle cx="80" cy="80" r="44" fill="url(#sunCenter)" />
            {/* Cheerful Rosy Cheeks */}
            <circle cx="56" cy="90" r="9" fill="#EF4444" fillOpacity="0.4" />
            <circle cx="104" cy="90" r="9" fill="#EF4444" fillOpacity="0.4" />
            {/* Big Friendly Eyes */}
            <ellipse cx="64" cy="74" rx="7.5" ry="10" fill="#451A03" />
            <ellipse cx="62" cy="70" rx="3.5" ry="4.5" fill="#FFFFFF" />
            <circle cx="66" cy="77" r="1.5" fill="#FFFFFF" />
            <ellipse cx="96" cy="74" rx="7.5" ry="10" fill="#451A03" />
            <ellipse cx="94" cy="70" rx="3.5" ry="4.5" fill="#FFFFFF" />
            <circle cx="98" cy="77" r="1.5" fill="#FFFFFF" />
            {/* Sun Smile */}
            <path d="M68 92 Q80 106 92 92 Z" fill="#B91C1C" />
            <path d="M72 93 Q80 97 88 93" fill="#FFFFFF" />
          </svg>
        );

      case 'syl_qiz':
        return (
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            <AnimalCharacterGraphic idOrEmoji="girl" className={className} showBackgroundDisc={false} />
          </div>
        );

      case 'syl_kuchuk':
        return (
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            <AnimalCharacterGraphic idOrEmoji="puppy" className={className} showBackgroundDisc={false} />
          </div>
        );

      case 'syl_fil':
        return (
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            <AnimalCharacterGraphic idOrEmoji="elephant" className={className} showBackgroundDisc={false} />
          </div>
        );

      case 'syl_sher':
        return (
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            <AnimalCharacterGraphic idOrEmoji="lion" className={className} showBackgroundDisc={false} />
          </div>
        );

      case 'syl_quyon':
        return (
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            <AnimalCharacterGraphic idOrEmoji="bunny" className={className} showBackgroundDisc={false} />
          </div>
        );

      case 'syl_ayiq':
        return (
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            <AnimalCharacterGraphic idOrEmoji="panda" className={className} showBackgroundDisc={false} />
          </div>
        );

      case 'syl_tulki':
        return (
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            <AnimalCharacterGraphic idOrEmoji="kitty" className={className} showBackgroundDisc={false} />
          </div>
        );

      default:
        return (
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-white/35 backdrop-blur-xs shadow-inner flex items-center justify-center p-3 border-2 border-white/60">
            <span className="text-6xl sm:text-7xl drop-shadow-[0_8px_14px_rgba(0,0,0,0.25)] select-none animate-gentle-wiggle">
              {emoji}
            </span>
          </div>
        );
    }
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      {renderGraphic()}
    </div>
  );
};
