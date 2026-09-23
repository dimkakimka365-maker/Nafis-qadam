import React from 'react';

export interface AnimalCharacterGraphicProps {
  idOrEmoji: string;
  className?: string;
  badgeSize?: 'sm' | 'md' | 'lg' | 'xl';
  showBackgroundDisc?: boolean;
}

/**
 * 3D Fairytale Animal & Child Character Graphic.
 * Crafted to match the 3D animated fairytale animals in the magical background,
 * with vibrant, high-contrast, punchy colors that pop with clarity ("rangi ajralib tursin").
 */
export const AnimalCharacterGraphic: React.FC<AnimalCharacterGraphicProps> = ({
  idOrEmoji,
  className = 'w-12 h-12',
  showBackgroundDisc = true,
}) => {
  const rawValue = (idOrEmoji || '').trim();

  // If user uploaded a custom photo from device gallery (data URL or web URL)
  if (
    rawValue.startsWith('data:') ||
    rawValue.startsWith('blob:') ||
    rawValue.startsWith('http://') ||
    rawValue.startsWith('https://')
  ) {
    return (
      <div
        className={`relative inline-flex items-center justify-center select-none overflow-hidden rounded-2xl ${className}`}
      >
        <img
          src={rawValue}
          alt="Bolajon profil rasmi"
          className="w-full h-full object-cover rounded-2xl border-2 border-white shadow-xs"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  const normalized = rawValue.toLowerCase();

  // Mapping from emoji or alias to character type
  let charType = 'bunny';
  if (normalized.includes('🦁') || normalized.includes('sher') || normalized.includes('arslon') || normalized.includes('lion')) {
    charType = 'lion';
  } else if (normalized.includes('🐻') || normalized.includes('ayiq') || normalized.includes('bear')) {
    charType = 'bear';
  } else if (normalized.includes('🦊') || normalized.includes('tulki') || normalized.includes('fox')) {
    charType = 'fox';
  } else if (normalized.includes('🐶') || normalized.includes('kuchuk') || normalized.includes('it') || normalized.includes('dog')) {
    charType = 'puppy';
  } else if (normalized.includes('🐼') || normalized.includes('panda')) {
    charType = 'panda';
  } else if (normalized.includes('🐱') || normalized.includes('mushuk') || normalized.includes('cat')) {
    charType = 'kitty';
  } else if (normalized.includes('🐘') || normalized.includes('fil') || normalized.includes('elephant')) {
    charType = 'elephant';
  } else if (normalized.includes('🐵') || normalized.includes('maymun') || normalized.includes('monkey')) {
    charType = 'monkey';
  } else if (normalized.includes('👦') || normalized.includes('bola') || normalized.includes('o\'g\'il') || normalized.includes('boy')) {
    charType = 'boy';
  } else if (normalized.includes('👧') || normalized.includes('qiz') || normalized.includes('girl')) {
    charType = 'girl';
  } else if (normalized.includes('🐮') || normalized.includes('sigir') || normalized.includes('cow')) {
    charType = 'cow';
  } else if (normalized.includes('🐑') || normalized.includes('qo\'y') || normalized.includes('sheep')) {
    charType = 'sheep';
  } else if (normalized.includes('🐧') || normalized.includes('pingvin') || normalized.includes('penguin')) {
    charType = 'penguin';
  } else {
    // Default to cute bunny
    charType = 'bunny';
  }

  // Common SVG rendering with 3D Pixar Disney style
  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 120 120"
        className="w-full h-full filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.28)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Universal 3D White Rim Light / Drop Shadow */}
          <filter id="charDropShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#0F172A" floodOpacity="0.32" />
          </filter>

          {/* 1. LION (SHERCHA) GRADIENTS - Bright Radiant Amber & Sunshine Gold */}
          <radialGradient id="lionManeGrad" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#FFA000" />
            <stop offset="65%" stopColor="#FF6F00" />
            <stop offset="100%" stopColor="#D84315" />
          </radialGradient>
          <radialGradient id="lionFaceGrad" cx="45%" cy="38%" r="60%">
            <stop offset="0%" stopColor="#FFF176" />
            <stop offset="50%" stopColor="#FFD54F" />
            <stop offset="100%" stopColor="#FFB300" />
          </radialGradient>

          {/* 2. BUNNY (QUYONCHA) GRADIENTS - Pearlescent White & Soft Ruby Pink */}
          <radialGradient id="bunnyFurGrad" cx="42%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#F8FAFC" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </radialGradient>
          <radialGradient id="bunnyPinkGrad" cx="40%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FF94A8" />
            <stop offset="70%" stopColor="#FF4D6D" />
            <stop offset="100%" stopColor="#C9184A" />
          </radialGradient>

          {/* 3. BEAR (AYIQCHA) GRADIENTS - Rich Caramel & Warm Honey */}
          <radialGradient id="bearFurGrad" cx="42%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#B06526" />
            <stop offset="65%" stopColor="#874312" />
            <stop offset="100%" stopColor="#5E2A06" />
          </radialGradient>
          <radialGradient id="bearSnoutGrad" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FFE4B5" />
            <stop offset="85%" stopColor="#F5CD90" />
            <stop offset="100%" stopColor="#D99E52" />
          </radialGradient>

          {/* 4. FOX (TULKICHA) GRADIENTS - Electric Tangerine Orange */}
          <radialGradient id="foxFurGrad" cx="45%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#FF8533" />
            <stop offset="65%" stopColor="#FF5722" />
            <stop offset="100%" stopColor="#D83B01" />
          </radialGradient>

          {/* 5. PUPPY (KUCHUKCHA) GRADIENTS - Golden Honey & Soft White */}
          <radialGradient id="puppyFurGrad" cx="45%" cy="38%" r="60%">
            <stop offset="0%" stopColor="#FFD285" />
            <stop offset="60%" stopColor="#F5A742" />
            <stop offset="100%" stopColor="#C97514" />
          </radialGradient>
          <radialGradient id="puppyEarGrad" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#B86927" />
            <stop offset="80%" stopColor="#8A430B" />
            <stop offset="100%" stopColor="#572803" />
          </radialGradient>

          {/* 6. PANDA GRADIENTS - Pure White & Velvety Onyx */}
          <radialGradient id="pandaWhiteGrad" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="75%" stopColor="#F1F5F9" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </radialGradient>
          <radialGradient id="pandaBlackGrad" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="70%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </radialGradient>

          {/* 7. KITTY (MUSHUKCHA) GRADIENTS - Warm Apricot & Coral */}
          <radialGradient id="kittyFurGrad" cx="45%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#FFAB40" />
            <stop offset="70%" stopColor="#FF6D00" />
            <stop offset="100%" stopColor="#D50000" />
          </radialGradient>

          {/* 8. ELEPHANT (FILVOY) GRADIENTS - Sky Cyan & Lavender */}
          <radialGradient id="elephantSkinGrad" cx="45%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#90E0EF" />
            <stop offset="60%" stopColor="#48CAE4" />
            <stop offset="100%" stopColor="#0077B6" />
          </radialGradient>

          {/* 9. BOY (BOLAKAY) GRADIENTS - Warm Skin & Royal Blue Cap */}
          <radialGradient id="skinGrad" cx="42%" cy="38%" r="60%">
            <stop offset="0%" stopColor="#FFE0B2" />
            <stop offset="70%" stopColor="#FFCC80" />
            <stop offset="100%" stopColor="#FFA726" />
          </radialGradient>
          <radialGradient id="capGrad" cx="45%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="65%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </radialGradient>

          {/* 10. GIRL (QIZALOQ) GRADIENTS - Warm Amber Hair & Pink Flower */}
          <radialGradient id="girlHairGrad" cx="45%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="70%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#B45309" />
          </radialGradient>
        </defs>

        {/* Optional Glossy 3D Backplate Disc for MAXIMUM Contrast ("rangi ajralib tursin") */}
        {showBackgroundDisc && (
          <g filter="url(#charDropShadow)">
            <circle cx="60" cy="60" r="56" fill="#FFFFFF" fillOpacity="0.95" />
            <circle cx="60" cy="60" r="52" fill="url(#lionManeGrad)" fillOpacity="0.12" />
            <circle cx="60" cy="60" r="52" stroke="#FFFFFF" strokeWidth="4" />
          </g>
        )}

        {/* ----------------------------------------------------------- */}
        {/* CHARACTER: LION CUB (SHERCHA)                               */}
        {/* ----------------------------------------------------------- */}
        {charType === 'lion' && (
          <g filter="url(#charDropShadow)">
            {/* Big Fluffy Sunny 3D Mane */}
            <circle cx="60" cy="58" r="46" fill="url(#lionManeGrad)" />
            {/* Mane Petals / Tuffs for 3D Volume */}
            <g fill="#FF8F00">
              <circle cx="28" cy="38" r="14" />
              <circle cx="92" cy="38" r="14" />
              <circle cx="20" cy="58" r="14" />
              <circle cx="100" cy="58" r="14" />
              <circle cx="32" cy="80" r="13" />
              <circle cx="88" cy="80" r="13" />
              <circle cx="60" cy="94" r="14" />
            </g>
            {/* Inner Ears */}
            <circle cx="34" cy="34" r="9" fill="#FFA000" />
            <circle cx="34" cy="34" r="5.5" fill="#FFE082" />
            <circle cx="86" cy="34" r="9" fill="#FFA000" />
            <circle cx="86" cy="34" r="5.5" fill="#FFE082" />
            {/* Lion Head */}
            <circle cx="60" cy="58" r="32" fill="url(#lionFaceGrad)" />
            {/* White Cheeks */}
            <ellipse cx="50" cy="68" rx="12" ry="9" fill="#FFFFFF" fillOpacity="0.95" />
            <ellipse cx="70" cy="68" rx="12" ry="9" fill="#FFFFFF" fillOpacity="0.95" />
            {/* Big Catchlight Anime Eyes */}
            <ellipse cx="46" cy="52" rx="6.5" ry="8" fill="#1C1004" />
            <ellipse cx="44.5" cy="49" rx="3" ry="4" fill="#FFFFFF" />
            <circle cx="48" cy="55" r="1.3" fill="#FFFFFF" />
            <ellipse cx="74" cy="52" rx="6.5" ry="8" fill="#1C1004" />
            <ellipse cx="72.5" cy="49" rx="3" ry="4" fill="#FFFFFF" />
            <circle cx="76" cy="55" r="1.3" fill="#FFFFFF" />
            {/* Cute Pink Heart Nose */}
            <path d="M56 62 Q60 59 64 62 Q60 69 60 69 Q60 69 56 62 Z" fill="#D81B60" />
            {/* Smiling Mouth */}
            <path d="M52 69 Q60 76 60 69 Q60 76 68 69" stroke="#795548" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            {/* Tiny Golden Crown on Forehead */}
            <path d="M50 28 L54 36 L60 26 L66 36 L70 28 L68 40 L52 40 Z" fill="#FFD700" stroke="#B8860B" strokeWidth="1.2" />
            <circle cx="60" cy="27" r="2" fill="#E91E63" />
          </g>
        )}

        {/* ----------------------------------------------------------- */}
        {/* CHARACTER: BUNNY (QUYONCHA)                                 */}
        {/* ----------------------------------------------------------- */}
        {charType === 'bunny' && (
          <g filter="url(#charDropShadow)">
            {/* Long Velvety 3D Ears */}
            <path d="M42 45 C32 10, 40 4, 48 16 C53 25, 52 38, 48 45 Z" fill="url(#bunnyFurGrad)" />
            <path d="M42 40 C35 16, 41 12, 46 19 C50 26, 48 35, 45 40 Z" fill="url(#bunnyPinkGrad)" />
            <path d="M78 45 C88 10, 80 4, 72 16 C67 25, 68 38, 72 45 Z" fill="url(#bunnyFurGrad)" />
            <path d="M78 40 C85 16, 79 12, 74 19 C70 26, 72 35, 75 40 Z" fill="url(#bunnyPinkGrad)" />
            {/* Head */}
            <ellipse cx="60" cy="62" rx="34" ry="32" fill="url(#bunnyFurGrad)" />
            {/* Rosy Glowing Cheeks */}
            <circle cx="38" cy="68" r="9" fill="#FF80AB" fillOpacity="0.5" />
            <circle cx="82" cy="68" r="9" fill="#FF80AB" fillOpacity="0.5" />
            {/* Sparkle Big Eyes */}
            <ellipse cx="46" cy="56" rx="6.5" ry="8.5" fill="#2E1B24" />
            <ellipse cx="44.5" cy="53" rx="3" ry="4.2" fill="#FFFFFF" />
            <circle cx="48" cy="59" r="1.3" fill="#FFFFFF" />
            <ellipse cx="74" cy="56" rx="6.5" ry="8.5" fill="#2E1B24" />
            <ellipse cx="72.5" cy="53" rx="3" ry="4.2" fill="#FFFFFF" />
            <circle cx="76" cy="59" r="1.3" fill="#FFFFFF" />
            {/* Little Pink Triangle Nose */}
            <polygon points="56,66 64,66 60,71" fill="#FF4081" />
            {/* Bunny Smile & Whiskers */}
            <path d="M54 72 Q60 76 60 72 Q60 76 66 72" stroke="#4A154B" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            <path d="M34 68 L22 66 M34 72 L20 74" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
            <path d="M86 68 L98 66 M86 72 L100 74" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
            {/* Cute Flower Pin */}
            <circle cx="74" cy="38" r="5" fill="#FFD600" />
            <circle cx="74" cy="38" r="2" fill="#FF6D00" />
          </g>
        )}

        {/* ----------------------------------------------------------- */}
        {/* CHARACTER: BEAR (AYIQCHA)                                   */}
        {/* ----------------------------------------------------------- */}
        {charType === 'bear' && (
          <g filter="url(#charDropShadow)">
            {/* Round 3D Ears */}
            <circle cx="34" cy="36" r="14" fill="url(#bearFurGrad)" />
            <circle cx="34" cy="36" r="8" fill="#F5CD90" />
            <circle cx="86" cy="36" r="14" fill="url(#bearFurGrad)" />
            <circle cx="86" cy="36" r="8" fill="#F5CD90" />
            {/* Head */}
            <circle cx="60" cy="60" r="34" fill="url(#bearFurGrad)" />
            {/* Big Honey Snout */}
            <ellipse cx="60" cy="69" rx="18" ry="14" fill="url(#bearSnoutGrad)" />
            {/* Eyes */}
            <ellipse cx="46" cy="52" rx="6" ry="7.5" fill="#26150B" />
            <ellipse cx="44.5" cy="50" rx="2.8" ry="3.5" fill="#FFFFFF" />
            <ellipse cx="74" cy="52" rx="6" ry="7.5" fill="#26150B" />
            <ellipse cx="72.5" cy="50" rx="2.8" ry="3.5" fill="#FFFFFF" />
            {/* Big Hearty Black Nose */}
            <ellipse cx="60" cy="64" rx="7" ry="5" fill="#1C1008" />
            <ellipse cx="58.5" cy="62.5" rx="2.5" ry="1.5" fill="#FFFFFF" fillOpacity="0.75" />
            {/* Smile */}
            <path d="M54 71 Q60 76 66 71" stroke="#5E2A06" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* Cheerful Red Bowtie */}
            <polygon points="52,90 60,86 68,90 60,84" fill="#FF1744" />
            <circle cx="60" cy="87" r="3" fill="#D50000" />
          </g>
        )}

        {/* ----------------------------------------------------------- */}
        {/* CHARACTER: FOX (TULKICHA)                                   */}
        {/* ----------------------------------------------------------- */}
        {charType === 'fox' && (
          <g filter="url(#charDropShadow)">
            {/* Tall Pointy Fox Ears */}
            <polygon points="28,48 40,12 54,40" fill="url(#foxFurGrad)" />
            <polygon points="32,44 40,18 50,38" fill="#FFFFFF" />
            <polygon points="92,48 80,12 66,40" fill="url(#foxFurGrad)" />
            <polygon points="88,44 80,18 70,38" fill="#FFFFFF" />
            {/* Fox Head Shape */}
            <path d="M26 50 C26 40, 44 32, 60 32 C76 32, 94 40, 94 50 C94 66, 84 84, 60 90 C36 84, 26 66, 26 50 Z" fill="url(#foxFurGrad)" />
            {/* White Fox Cheeks & Bib */}
            <path d="M30 58 C38 52, 50 64, 60 70 C70 64, 82 52, 90 58 C88 78, 76 88, 60 89 C44 88, 32 78, 30 58 Z" fill="#FFFFFF" />
            {/* Clever Shiny Almond Eyes */}
            <ellipse cx="44" cy="52" rx="6" ry="7.5" fill="#261005" />
            <ellipse cx="42.5" cy="50" rx="2.5" ry="3.5" fill="#FFFFFF" />
            <ellipse cx="76" cy="52" rx="6" ry="7.5" fill="#261005" />
            <ellipse cx="74.5" cy="50" rx="2.5" ry="3.5" fill="#FFFFFF" />
            {/* Black Fox Nose */}
            <circle cx="60" cy="72" r="5" fill="#1C0D02" />
            <circle cx="58.5" cy="70.5" r="1.5" fill="#FFFFFF" fillOpacity="0.8" />
            {/* Smile */}
            <path d="M55 78 Q60 82 65 78" stroke="#D83B01" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          </g>
        )}

        {/* ----------------------------------------------------------- */}
        {/* CHARACTER: PUPPY (KUCHUKCHA)                                */}
        {/* ----------------------------------------------------------- */}
        {charType === 'puppy' && (
          <g filter="url(#charDropShadow)">
            {/* Big Floppy 3D Ears */}
            <path d="M30 36 C16 40, 14 74, 26 84 C34 90, 40 78, 38 60 Z" fill="url(#puppyEarGrad)" />
            <path d="M90 36 C104 40, 106 74, 94 84 C86 90, 80 78, 82 60 Z" fill="url(#puppyEarGrad)" />
            {/* Head */}
            <ellipse cx="60" cy="58" rx="34" ry="32" fill="url(#puppyFurGrad)" />
            {/* White Blaze Forehead & Muzzle */}
            <path d="M55 26 Q60 38 52 50 C44 60, 48 76, 60 76 C72 76, 76 60, 68 50 Q60 38 65 26 Z" fill="#FFFFFF" />
            {/* Puppy Eyes */}
            <ellipse cx="44" cy="52" rx="6.5" ry="8" fill="#1A0D03" />
            <ellipse cx="42.5" cy="49" rx="2.8" ry="3.8" fill="#FFFFFF" />
            <ellipse cx="76" cy="52" rx="6.5" ry="8" fill="#1A0D03" />
            <ellipse cx="74.5" cy="49" rx="2.8" ry="3.8" fill="#FFFFFF" />
            {/* Shiny Wet Button Nose */}
            <ellipse cx="60" cy="63" rx="7" ry="5" fill="#120801" />
            <ellipse cx="58" cy="61.5" rx="2.5" ry="1.5" fill="#FFFFFF" fillOpacity="0.8" />
            {/* Happy Open Tongue */}
            <path d="M54 70 Q60 76 66 70" stroke="#5C2D07" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            <path d="M56 72 C56 78, 64 78, 64 72 Z" fill="#FF5277" />
          </g>
        )}

        {/* ----------------------------------------------------------- */}
        {/* CHARACTER: PANDA                                            */}
        {/* ----------------------------------------------------------- */}
        {charType === 'panda' && (
          <g filter="url(#charDropShadow)">
            {/* Black Velvety Ears */}
            <circle cx="34" cy="34" r="13" fill="url(#pandaBlackGrad)" />
            <circle cx="86" cy="34" r="13" fill="url(#pandaBlackGrad)" />
            {/* White Head */}
            <circle cx="60" cy="60" r="34" fill="url(#pandaWhiteGrad)" />
            {/* Black Eye Patches (Angled) */}
            <ellipse cx="44" cy="54" rx="10" ry="13" transform="rotate(-18 44 54)" fill="url(#pandaBlackGrad)" />
            <ellipse cx="76" cy="54" rx="10" ry="13" transform="rotate(18 76 54)" fill="url(#pandaBlackGrad)" />
            {/* Sparkling Catchlight Eyes */}
            <ellipse cx="45" cy="54" rx="4.5" ry="5.5" fill="#FFFFFF" />
            <circle cx="46" cy="53" r="2.8" fill="#000000" />
            <circle cx="45" cy="52" r="1.2" fill="#FFFFFF" />
            <ellipse cx="75" cy="54" rx="4.5" ry="5.5" fill="#FFFFFF" />
            <circle cx="74" cy="53" r="2.8" fill="#000000" />
            <circle cx="75" cy="52" r="1.2" fill="#FFFFFF" />
            {/* Soft Triangular Nose */}
            <ellipse cx="60" cy="67" rx="6" ry="4" fill="#0F172A" />
            {/* Gentle Smile */}
            <path d="M54 72 Q60 76 66 72" stroke="#334155" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            {/* Green Bamboo Leaf Headband */}
            <path d="M38 30 Q60 22 82 30" stroke="#10B981" strokeWidth="4" strokeLinecap="round" fill="none" />
            <ellipse cx="60" cy="24" rx="8" ry="4" transform="rotate(-20 60 24)" fill="#34D399" />
          </g>
        )}

        {/* ----------------------------------------------------------- */}
        {/* CHARACTER: BOY (BOLAKAY) - 3D Pixar Style Child Portrait    */}
        {/* ----------------------------------------------------------- */}
        {charType === 'boy' && (
          <g filter="url(#charDropShadow)">
            {/* Cheerful Ears */}
            <circle cx="28" cy="60" r="8" fill="url(#skinGrad)" />
            <circle cx="92" cy="60" r="8" fill="url(#skinGrad)" />
            {/* Head */}
            <ellipse cx="60" cy="60" rx="32" ry="32" fill="url(#skinGrad)" />
            {/* Rosy Cheeks */}
            <circle cx="40" cy="66" r="6" fill="#FF8A65" fillOpacity="0.45" />
            <circle cx="80" cy="66" r="6" fill="#FF8A65" fillOpacity="0.45" />
            {/* Big Friendly Anime Eyes */}
            <ellipse cx="46" cy="54" rx="6" ry="7.5" fill="#1E293B" />
            <ellipse cx="44.5" cy="51" rx="2.8" ry="3.8" fill="#FFFFFF" />
            <circle cx="48" cy="57" r="1.2" fill="#FFFFFF" />
            <ellipse cx="74" cy="54" rx="6" ry="7.5" fill="#1E293B" />
            <ellipse cx="72.5" cy="51" rx="2.8" ry="3.8" fill="#FFFFFF" />
            <circle cx="76" cy="57" r="1.2" fill="#FFFFFF" />
            {/* Button Nose */}
            <ellipse cx="60" cy="62" rx="3.5" ry="2.5" fill="#F57C00" />
            {/* Big Happy Grin */}
            <path d="M50 68 Q60 80 70 68 Z" fill="#E11D48" />
            <path d="M52 69 Q60 74 68 69" fill="#FFFFFF" />
            {/* Royal Blue 3D Baseball Cap with Sun Yellow Star */}
            <path d="M26 50 C26 28, 44 22, 60 22 C76 22, 94 28, 94 50 Z" fill="url(#capGrad)" />
            {/* Cap Visor with 3D Depth */}
            <path d="M22 50 C38 46, 82 46, 98 50 C90 58, 30 58, 22 50 Z" fill="#1D4ED8" />
            <circle cx="60" cy="36" r="5" fill="#FBBF24" />
          </g>
        )}

        {/* ----------------------------------------------------------- */}
        {/* CHARACTER: GIRL (QIZALOQ) - 3D Pixar Style Child Portrait   */}
        {/* ----------------------------------------------------------- */}
        {charType === 'girl' && (
          <g filter="url(#charDropShadow)">
            {/* Golden Honey Pigtails on Sides */}
            <circle cx="24" cy="46" r="14" fill="url(#girlHairGrad)" />
            <circle cx="96" cy="46" r="14" fill="url(#girlHairGrad)" />
            {/* Pink Ribbon Bows on Pigtails */}
            <circle cx="32" cy="42" r="5" fill="#FF1493" />
            <circle cx="88" cy="42" r="5" fill="#FF1493" />
            {/* Head */}
            <ellipse cx="60" cy="60" rx="31" ry="30" fill="url(#skinGrad)" />
            {/* Soft Bangs / Hair Fringe */}
            <path d="M30 46 C36 30, 84 30, 90 46 C76 42, 60 48, 60 48 C60 48, 44 42, 30 46 Z" fill="url(#girlHairGrad)" />
            {/* Cheerful Rosy Cheeks */}
            <circle cx="38" cy="66" r="7" fill="#FF4081" fillOpacity="0.45" />
            <circle cx="82" cy="66" r="7" fill="#FF4081" fillOpacity="0.45" />
            {/* Big Sparkle Eyes with Eyelashes */}
            <ellipse cx="46" cy="54" rx="6" ry="7.5" fill="#1E293B" />
            <ellipse cx="44.5" cy="51" rx="2.8" ry="3.8" fill="#FFFFFF" />
            <circle cx="48" cy="57" r="1.2" fill="#FFFFFF" />
            <path d="M40 47 L43 50 M46 45 L47 49" stroke="#0F172A" strokeWidth="1.8" strokeLinecap="round" />
            <ellipse cx="74" cy="54" rx="6" ry="7.5" fill="#1E293B" />
            <ellipse cx="72.5" cy="51" rx="2.8" ry="3.8" fill="#FFFFFF" />
            <circle cx="76" cy="57" r="1.2" fill="#FFFFFF" />
            <path d="M80 47 L77 50 M74 45 L73 49" stroke="#0F172A" strokeWidth="1.8" strokeLinecap="round" />
            {/* Cute Smile */}
            <path d="M52 68 Q60 76 68 68" stroke="#BE123C" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* Glowing Tiara / Flower */}
            <circle cx="60" cy="30" r="5" fill="#FFD700" />
            <circle cx="60" cy="30" r="2.5" fill="#FF1493" />
          </g>
        )}

        {/* ----------------------------------------------------------- */}
        {/* CHARACTER: ELEPHANT (FILVOY)                                */}
        {/* ----------------------------------------------------------- */}
        {charType === 'elephant' && (
          <g filter="url(#charDropShadow)">
            {/* Big 3D Flapping Ears */}
            <circle cx="28" cy="54" r="20" fill="url(#elephantSkinGrad)" />
            <circle cx="28" cy="54" r="13" fill="#BEE3F8" />
            <circle cx="92" cy="54" r="20" fill="url(#elephantSkinGrad)" />
            <circle cx="92" cy="54" r="13" fill="#BEE3F8" />
            {/* Head */}
            <circle cx="60" cy="58" r="30" fill="url(#elephantSkinGrad)" />
            {/* Little Crown */}
            <polygon points="52,32 55,24 60,30 65,24 68,32" fill="#FFD700" />
            {/* Big Eyes */}
            <ellipse cx="46" cy="50" rx="5.5" ry="7" fill="#0C2340" />
            <ellipse cx="44.5" cy="48" rx="2.5" ry="3.5" fill="#FFFFFF" />
            <ellipse cx="74" cy="50" rx="5.5" ry="7" fill="#0C2340" />
            <ellipse cx="72.5" cy="48" rx="2.5" ry="3.5" fill="#FFFFFF" />
            {/* Playful Curled Up Trunk */}
            <path d="M56 60 Q54 80 62 82 Q70 82 72 74 Q74 66 66 66 Q62 66 64 72" stroke="url(#elephantSkinGrad)" strokeWidth="8" strokeLinecap="round" fill="none" />
            {/* Water Drops */}
            <circle cx="76" cy="62" r="2.5" fill="#38BDF8" />
            <circle cx="82" cy="58" r="1.8" fill="#38BDF8" />
          </g>
        )}

        {/* ----------------------------------------------------------- */}
        {/* CHARACTER: KITTY (MUSHUKCHA)                                */}
        {/* ----------------------------------------------------------- */}
        {charType === 'kitty' && (
          <g filter="url(#charDropShadow)">
            {/* Pointy Tabby Ears */}
            <polygon points="26,44 42,16 54,42" fill="url(#kittyFurGrad)" />
            <polygon points="32,40 42,22 50,38" fill="#FF80AB" />
            <polygon points="94,44 78,16 66,42" fill="url(#kittyFurGrad)" />
            <polygon points="88,40 78,22 70,38" fill="#FF80AB" />
            {/* Head */}
            <ellipse cx="60" cy="58" rx="34" ry="30" fill="url(#kittyFurGrad)" />
            {/* Forehead Stripes */}
            <path d="M57 32 L60 38 L63 32" stroke="#BF360C" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* Cheeks */}
            <ellipse cx="50" cy="66" rx="10" ry="7" fill="#FFFFFF" />
            <ellipse cx="70" cy="66" rx="10" ry="7" fill="#FFFFFF" />
            {/* Big Anime Eyes */}
            <ellipse cx="44" cy="52" rx="6.5" ry="8" fill="#1A0A02" />
            <ellipse cx="42.5" cy="49" rx="3" ry="4" fill="#FFFFFF" />
            <ellipse cx="76" cy="52" rx="6.5" ry="8" fill="#1A0A02" />
            <ellipse cx="74.5" cy="49" rx="3" ry="4" fill="#FFFFFF" />
            {/* Nose & Smile */}
            <polygon points="57,62 63,62 60,66" fill="#FF1744" />
            <path d="M54 67 Q60 71 66 67" stroke="#BF360C" strokeWidth="2" strokeLinecap="round" fill="none" />
            {/* Whiskers */}
            <path d="M34 64 L18 62 M34 68 L16 70" stroke="#BF360C" strokeWidth="2" strokeLinecap="round" />
            <path d="M86 64 L102 62 M86 68 L104 70" stroke="#BF360C" strokeWidth="2" strokeLinecap="round" />
          </g>
        )}

        {/* ----------------------------------------------------------- */}
        {/* CHARACTER: COW (SIGIRVOY)                                   */}
        {/* ----------------------------------------------------------- */}
        {charType === 'cow' && (
          <g filter="url(#charDropShadow)">
            <ellipse cx="22" cy="46" rx="12" ry="6" transform="rotate(-20 22 46)" fill="#FFFFFF" />
            <ellipse cx="98" cy="46" rx="12" ry="6" transform="rotate(20 98 46)" fill="#543A27" />
            <ellipse cx="60" cy="54" rx="34" ry="28" fill="#FFFFFF" />
            <path d="M66 32 C78 28, 92 36, 90 54 C88 64, 76 60, 72 50 Z" fill="#6B4931" />
            <ellipse cx="44" cy="48" rx="5.5" ry="7" fill="#1F1610" />
            <ellipse cx="42.5" cy="46" rx="2.5" ry="3.5" fill="#FFFFFF" />
            <ellipse cx="76" cy="48" rx="5.5" ry="7" fill="#1F1610" />
            <ellipse cx="74.5" cy="46" rx="2.5" ry="3.5" fill="#FFFFFF" />
            <ellipse cx="60" cy="72" rx="24" ry="15" fill="#FF80AB" />
            <ellipse cx="52" cy="70" rx="3.5" ry="4.5" fill="#C2185B" />
            <ellipse cx="68" cy="70" rx="3.5" ry="4.5" fill="#C2185B" />
          </g>
        )}

        {/* ----------------------------------------------------------- */}
        {/* CHARACTER: SHEEP (QO'ZICHOQ)                                */}
        {/* ----------------------------------------------------------- */}
        {charType === 'sheep' && (
          <g filter="url(#charDropShadow)">
            {/* Fluffy Wool */}
            <g fill="#FFFFFF">
              <circle cx="36" cy="52" r="16" />
              <circle cx="84" cy="52" r="16" />
              <circle cx="42" cy="74" r="15" />
              <circle cx="78" cy="74" r="15" />
              <circle cx="60" cy="78" r="15" />
              <circle cx="46" cy="36" r="14" />
              <circle cx="74" cy="36" r="14" />
              <circle cx="60" cy="30" r="15" />
            </g>
            <ellipse cx="60" cy="58" rx="20" ry="22" fill="#475569" />
            <ellipse cx="52" cy="56" rx="4.5" ry="6" fill="#0F172A" />
            <ellipse cx="50.5" cy="54" rx="2" ry="3" fill="#FFFFFF" />
            <ellipse cx="68" cy="56" rx="4.5" ry="6" fill="#0F172A" />
            <ellipse cx="66.5" cy="54" rx="2" ry="3" fill="#FFFFFF" />
            <ellipse cx="60" cy="68" rx="3" ry="2" fill="#1E293B" />
          </g>
        )}

        {/* ----------------------------------------------------------- */}
        {/* CHARACTER: PENGUIN (PINGVIN)                                */}
        {/* ----------------------------------------------------------- */}
        {charType === 'penguin' && (
          <g filter="url(#charDropShadow)">
            <ellipse cx="60" cy="58" rx="36" ry="34" fill="#1E293B" />
            <ellipse cx="26" cy="66" rx="7" ry="14" transform="rotate(20 26 66)" fill="#1E293B" />
            <ellipse cx="94" cy="66" rx="7" ry="14" transform="rotate(-20 94 66)" fill="#1E293B" />
            <ellipse cx="49" cy="56" rx="13" ry="16" fill="#FFFFFF" />
            <ellipse cx="71" cy="56" rx="13" ry="16" fill="#FFFFFF" />
            <ellipse cx="60" cy="68" rx="18" ry="13" fill="#FFFFFF" />
            <circle cx="40" cy="68" r="7" fill="#FF80AB" fillOpacity="0.5" />
            <circle cx="80" cy="68" r="7" fill="#FF80AB" fillOpacity="0.5" />
            <ellipse cx="48" cy="54" rx="5.5" ry="7.5" fill="#0F172A" />
            <ellipse cx="46.5" cy="51" rx="2.5" ry="3.5" fill="#FFFFFF" />
            <ellipse cx="72" cy="54" rx="5.5" ry="7.5" fill="#0F172A" />
            <ellipse cx="70.5" cy="51" rx="2.5" ry="3.5" fill="#FFFFFF" />
            <polygon points="53,62 67,62 60,74" fill="#F59E0B" />
            <polygon points="53,28 56,20 60,26 64,20 67,28" fill="#FBBF24" />
          </g>
        )}
      </svg>
    </div>
  );
};
