import React from 'react';
import { AnimalCharacterGraphic } from '../common/AnimalCharacterGraphic';
import { BirdGraphics } from './graphics/BirdGraphics';
import { WildAnimalGraphics } from './graphics/WildAnimalGraphics';
import { SeaAndInsectGraphics } from './graphics/SeaAndInsectGraphics';
import { ConceptGraphics } from './graphics/ConceptGraphics';

interface ThreeDCardGraphicProps {
  cardId: string;
  emoji?: string;
  className?: string;
}

export const ThreeDCardGraphic: React.FC<ThreeDCardGraphicProps> = ({ cardId, emoji, className = 'w-24 h-24 sm:w-28 sm:h-28' }) => {
  // 1. Check dedicated high-definition vector graphics first
  if (BirdGraphics[cardId]) {
    const BirdComp = BirdGraphics[cardId];
    return <BirdComp className={className} />;
  }
  if (WildAnimalGraphics[cardId]) {
    const WildComp = WildAnimalGraphics[cardId];
    return <WildComp className={className} />;
  }
  if (SeaAndInsectGraphics[cardId]) {
    const SeaComp = SeaAndInsectGraphics[cardId];
    return <SeaComp className={className} />;
  }
  if (ConceptGraphics[cardId]) {
    const ConceptComp = ConceptGraphics[cardId];
    return <ConceptComp className={className} />;
  }

  switch (cardId) {
    // ----------------------------------------------------
    // 1. QIZIL (3D Glossy Red Sphere)
    // ----------------------------------------------------
    case 'c-red':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="redSphereGrad" cx="38%" cy="32%" r="62%">
              <stop offset="0%" stopColor="#FFA0B2" />
              <stop offset="25%" stopColor="#FF2E56" />
              <stop offset="65%" stopColor="#D90429" />
              <stop offset="90%" stopColor="#8A0014" />
              <stop offset="100%" stopColor="#5E000C" />
            </radialGradient>
            <radialGradient id="redBounceLight" cx="65%" cy="85%" r="35%">
              <stop offset="0%" stopColor="#FF7A95" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#D90429" stopOpacity="0" />
            </radialGradient>
            <filter id="shadowRed" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#800010" floodOpacity="0.45" />
            </filter>
          </defs>
          {/* Ground Contact Shadow */}
          <ellipse cx="60" cy="104" rx="42" ry="10" fill="#6B000E" fillOpacity="0.3" />
          {/* Main 3D Sphere */}
          <circle cx="60" cy="56" r="44" fill="url(#redSphereGrad)" filter="url(#shadowRed)" />
          {/* Bottom Bounce Reflection */}
          <circle cx="60" cy="56" r="44" fill="url(#redBounceLight)" />
          {/* Specular White Highlights */}
          <ellipse cx="46" cy="38" rx="14" ry="8" transform="rotate(-30 46 38)" fill="white" fillOpacity="0.85" />
          <ellipse cx="42" cy="32" rx="6" ry="3.5" transform="rotate(-30 42 32)" fill="white" fillOpacity="0.95" />
        </svg>
      );

    // ----------------------------------------------------
    // 2. SARIQ (3D Glossy Yellow Sphere)
    // ----------------------------------------------------
    case 'c-yellow':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="yellowSphereGrad" cx="38%" cy="32%" r="62%">
              <stop offset="0%" stopColor="#FFF9B3" />
              <stop offset="30%" stopColor="#FFD000" />
              <stop offset="70%" stopColor="#FF9E00" />
              <stop offset="92%" stopColor="#C76B00" />
              <stop offset="100%" stopColor="#8A4500" />
            </radialGradient>
            <radialGradient id="yellowBounceLight" cx="65%" cy="85%" r="35%">
              <stop offset="0%" stopColor="#FFE066" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#FF9E00" stopOpacity="0" />
            </radialGradient>
            <filter id="shadowYellow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#8A4A00" floodOpacity="0.4" />
            </filter>
          </defs>
          <ellipse cx="60" cy="104" rx="42" ry="10" fill="#703B00" fillOpacity="0.3" />
          <circle cx="60" cy="56" r="44" fill="url(#yellowSphereGrad)" filter="url(#shadowYellow)" />
          <circle cx="60" cy="56" r="44" fill="url(#yellowBounceLight)" />
          <ellipse cx="46" cy="38" rx="14" ry="8" transform="rotate(-30 46 38)" fill="white" fillOpacity="0.9" />
          <ellipse cx="42" cy="32" rx="6" ry="3.5" transform="rotate(-30 42 32)" fill="white" fillOpacity="0.98" />
        </svg>
      );

    // ----------------------------------------------------
    // 3. YASHIL (3D Glossy Green Sphere)
    // ----------------------------------------------------
    case 'c-green':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="greenSphereGrad" cx="38%" cy="32%" r="62%">
              <stop offset="0%" stopColor="#B3FFC2" />
              <stop offset="25%" stopColor="#3CD070" />
              <stop offset="65%" stopColor="#13A648" />
              <stop offset="90%" stopColor="#0B6B2B" />
              <stop offset="100%" stopColor="#05451B" />
            </radialGradient>
            <radialGradient id="greenBounceLight" cx="65%" cy="85%" r="35%">
              <stop offset="0%" stopColor="#86EFAC" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#13A648" stopOpacity="0" />
            </radialGradient>
            <filter id="shadowGreen" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#06481E" floodOpacity="0.45" />
            </filter>
          </defs>
          <ellipse cx="60" cy="104" rx="42" ry="10" fill="#063D19" fillOpacity="0.32" />
          <circle cx="60" cy="56" r="44" fill="url(#greenSphereGrad)" filter="url(#shadowGreen)" />
          <circle cx="60" cy="56" r="44" fill="url(#greenBounceLight)" />
          <ellipse cx="46" cy="38" rx="14" ry="8" transform="rotate(-30 46 38)" fill="white" fillOpacity="0.85" />
          <ellipse cx="42" cy="32" rx="6" ry="3.5" transform="rotate(-30 42 32)" fill="white" fillOpacity="0.95" />
        </svg>
      );

    // ----------------------------------------------------
    // 4. KO'K (3D Glossy Blue Sphere)
    // ----------------------------------------------------
    case 'c-blue':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="blueSphereGrad" cx="38%" cy="32%" r="62%">
              <stop offset="0%" stopColor="#BCE0FD" />
              <stop offset="25%" stopColor="#3B82F6" />
              <stop offset="65%" stopColor="#1D4ED8" />
              <stop offset="90%" stopColor="#172554" />
              <stop offset="100%" stopColor="#0B1333" />
            </radialGradient>
            <radialGradient id="blueBounceLight" cx="65%" cy="85%" r="35%">
              <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0" />
            </radialGradient>
            <filter id="shadowBlue" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#0F172A" floodOpacity="0.45" />
            </filter>
          </defs>
          <ellipse cx="60" cy="104" rx="42" ry="10" fill="#0B1C40" fillOpacity="0.32" />
          <circle cx="60" cy="56" r="44" fill="url(#blueSphereGrad)" filter="url(#shadowBlue)" />
          <circle cx="60" cy="56" r="44" fill="url(#blueBounceLight)" />
          <ellipse cx="46" cy="38" rx="14" ry="8" transform="rotate(-30 46 38)" fill="white" fillOpacity="0.85" />
          <ellipse cx="42" cy="32" rx="6" ry="3.5" transform="rotate(-30 42 32)" fill="white" fillOpacity="0.95" />
        </svg>
      );

    // ----------------------------------------------------
    // 5. MUSHUKCHA (Cute 3D Tabby Kitten Face)
    // ----------------------------------------------------
    case 'a-cat':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="catHeadGrad" cx="45%" cy="40%" r="55%">
              <stop offset="0%" stopColor="#FFA64D" />
              <stop offset="70%" stopColor="#F57C00" />
              <stop offset="100%" stopColor="#BF5000" />
            </radialGradient>
            <radialGradient id="catCheekWhite" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="80%" stopColor="#FFF0E0" />
              <stop offset="100%" stopColor="#FFE0C2" />
            </radialGradient>
            <filter id="catShadow" x="-10%" y="-10%" width="130%" height="130%">
              <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#703600" floodOpacity="0.35" />
            </filter>
          </defs>
          {/* Shadow */}
          <ellipse cx="60" cy="104" rx="38" ry="9" fill="#6B3400" fillOpacity="0.25" />
          {/* Ears */}
          <g filter="url(#catShadow)">
            {/* Left Ear */}
            <path d="M26 44 C22 22, 34 10, 44 20 C42 32, 36 40, 26 44 Z" fill="#F57C00" />
            <path d="M29 38 C27 24, 34 16, 40 23 C38 31, 35 36, 29 38 Z" fill="#FF8DA1" />
            {/* Right Ear */}
            <path d="M94 44 C98 22, 86 10, 76 20 C78 32, 84 40, 94 44 Z" fill="#F57C00" />
            <path d="M91 38 C93 24, 86 16, 80 23 C82 31, 85 36, 91 38 Z" fill="#FF8DA1" />
          </g>
          {/* Head Base */}
          <ellipse cx="60" cy="58" rx="42" ry="36" fill="url(#catHeadGrad)" filter="url(#catShadow)" />
          {/* Forehead Stripes */}
          <path d="M57 26 C57 32, 60 36, 60 36 C60 36, 63 32, 63 26 Z" fill="#9E4000" />
          <path d="M48 28 C50 33, 53 36, 53 36" stroke="#9E4000" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M72 28 C70 33, 67 36, 67 36" stroke="#9E4000" strokeWidth="2.5" strokeLinecap="round" />
          {/* Big White Cheeks / Muzzle */}
          <ellipse cx="48" cy="68" rx="14" ry="11" fill="url(#catCheekWhite)" />
          <ellipse cx="72" cy="68" rx="14" ry="11" fill="url(#catCheekWhite)" />
          {/* Eyes with Big Anime Catchlights */}
          <ellipse cx="44" cy="52" rx="7" ry="8.5" fill="#211206" />
          <ellipse cx="42" cy="49" rx="3" ry="4" fill="white" />
          <circle cx="46" cy="55" r="1.5" fill="white" />

          <ellipse cx="76" cy="52" rx="7" ry="8.5" fill="#211206" />
          <ellipse cx="74" cy="49" rx="3" ry="4" fill="white" />
          <circle cx="78" cy="55" r="1.5" fill="white" />
          {/* Nose */}
          <path d="M56 61 L64 61 C64 61, 60 67, 60 67 Z" fill="#FF5277" />
          {/* Smiling Mouth */}
          <path d="M54 67 Q60 72 60 67 Q60 72 66 67" stroke="#9E4000" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          {/* Whiskers */}
          <path d="M34 65 L18 62 M34 69 L16 70 M34 73 L20 77" stroke="#9E4000" strokeWidth="2" strokeLinecap="round" />
          <path d="M86 65 L102 62 M86 69 L104 70 M86 73 L100 77" stroke="#9E4000" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    // ----------------------------------------------------
    // 6. KUCHUKCHA (Cute 3D Floppy-eared Puppy Face)
    // ----------------------------------------------------
    case 'a-dog':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="dogFaceGrad" cx="45%" cy="40%" r="55%">
              <stop offset="0%" stopColor="#F7C48D" />
              <stop offset="65%" stopColor="#E09852" />
              <stop offset="100%" stopColor="#B36B2B" />
            </radialGradient>
            <radialGradient id="dogEarGrad" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#9C5821" />
              <stop offset="80%" stopColor="#693710" />
              <stop offset="100%" stopColor="#4A2408" />
            </radialGradient>
            <filter id="dogShadow" x="-15%" y="-15%" width="130%" height="130%">
              <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#5C2D07" floodOpacity="0.35" />
            </filter>
          </defs>
          <ellipse cx="60" cy="104" rx="40" ry="9" fill="#592E08" fillOpacity="0.25" />
          {/* Big Floppy Ears on Sides */}
          <path d="M30 32 C14 36, 12 70, 24 82 C32 88, 38 78, 36 60 Z" fill="url(#dogEarGrad)" filter="url(#dogShadow)" />
          <path d="M90 32 C106 36, 108 70, 96 82 C88 88, 82 78, 84 60 Z" fill="url(#dogEarGrad)" filter="url(#dogShadow)" />
          {/* Head */}
          <ellipse cx="60" cy="58" rx="36" ry="34" fill="url(#dogFaceGrad)" filter="url(#dogShadow)" />
          {/* White Blaze Forehead & Muzzle */}
          <path d="M55 24 C55 24, 60 38, 52 50 C44 60, 48 76, 60 76 C72 76, 76 60, 68 50 C60 38, 65 24, 65 24 Z" fill="#FFFFFF" fillOpacity="0.95" />
          {/* Big Puppy Eyes */}
          <ellipse cx="44" cy="52" rx="6.5" ry="8" fill="#1C1008" />
          <ellipse cx="42" cy="49" rx="2.8" ry="3.8" fill="white" />
          <circle cx="46" cy="55" r="1.3" fill="white" />

          <ellipse cx="76" cy="52" rx="6.5" ry="8" fill="#1C1008" />
          <ellipse cx="74" cy="49" rx="2.8" ry="3.8" fill="white" />
          <circle cx="78" cy="55" r="1.3" fill="white" />
          {/* Big Shiny Black Nose */}
          <ellipse cx="60" cy="63" rx="7.5" ry="5.5" fill="#1A1512" />
          <ellipse cx="58" cy="61.5" rx="3" ry="1.8" fill="white" fillOpacity="0.8" />
          {/* Open Mouth with Tongue */}
          <path d="M54 69 Q60 75 66 69" stroke="#5C2D07" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M56 71 C56 77, 64 77, 64 71 Z" fill="#FF5277" />
          <path d="M60 71 L60 76" stroke="#D81B60" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );

    // ----------------------------------------------------
    // 7. SIGIR (Cute 3D Cartoon Cow Face)
    // ----------------------------------------------------
    case 'a-cow':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="cowHeadGrad" cx="45%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="80%" stopColor="#EDE9E3" />
              <stop offset="100%" stopColor="#D4CDC3" />
            </radialGradient>
            <radialGradient id="cowSnoutGrad" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#FFC2D1" />
              <stop offset="85%" stopColor="#FFA6BC" />
              <stop offset="100%" stopColor="#F57C98" />
            </radialGradient>
            <filter id="cowShadow" x="-15%" y="-15%" width="130%" height="130%">
              <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#2E2319" floodOpacity="0.3" />
            </filter>
          </defs>
          <ellipse cx="60" cy="104" rx="40" ry="9" fill="#1C150E" fillOpacity="0.22" />
          {/* Horns */}
          <path d="M38 32 C32 18, 22 20, 24 28 C26 34, 34 38, 38 38 Z" fill="#9C6B3D" />
          <path d="M82 32 C88 18, 98 20, 96 28 C94 34, 86 38, 82 38 Z" fill="#9C6B3D" />
          {/* Ears */}
          <ellipse cx="22" cy="46" rx="14" ry="7" transform="rotate(-20 22 46)" fill="#FFFFFF" filter="url(#cowShadow)" />
          <ellipse cx="22" cy="46" rx="10" ry="4.5" transform="rotate(-20 22 46)" fill="#FFA6BC" />
          <ellipse cx="98" cy="46" rx="14" ry="7" transform="rotate(20 98 46)" fill="#543A27" filter="url(#cowShadow)" />
          <ellipse cx="98" cy="46" rx="10" ry="4.5" transform="rotate(20 98 46)" fill="#FFA6BC" />
          {/* Head Base */}
          <ellipse cx="60" cy="54" rx="35" ry="30" fill="url(#cowHeadGrad)" filter="url(#cowShadow)" />
          {/* Brown Spot on Right Eye / Forehead */}
          <path d="M66 32 C78 28, 92 36, 90 54 C88 64, 76 60, 72 50 C68 44, 62 38, 66 32 Z" fill="#6B4931" />
          {/* Sweet Eyes */}
          <ellipse cx="44" cy="48" rx="6" ry="7.5" fill="#1F1610" />
          <ellipse cx="42" cy="46" rx="2.5" ry="3.5" fill="white" />
          <circle cx="46" cy="51" r="1.2" fill="white" />

          <ellipse cx="76" cy="48" rx="6" ry="7.5" fill="#1F1610" />
          <ellipse cx="74" cy="46" rx="2.5" ry="3.5" fill="white" />
          <circle cx="78" cy="51" r="1.2" fill="white" />
          {/* Big Soft Pink Snout */}
          <ellipse cx="60" cy="74" rx="26" ry="17" fill="url(#cowSnoutGrad)" filter="url(#cowShadow)" />
          {/* Nostrils */}
          <ellipse cx="50" cy="72" rx="4" ry="5.5" fill="#C24968" />
          <ellipse cx="70" cy="72" rx="4" ry="5.5" fill="#C24968" />
          {/* Smile */}
          <path d="M54 82 Q60 86 66 82" stroke="#A83250" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </svg>
      );

    // ----------------------------------------------------
    // 8. QO'ZICHOQ (Cute 3D Fluffy Cloud Lamb)
    // ----------------------------------------------------
    case 'a-sheep':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="woolPuffGrad" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="75%" stopColor="#F0F4F8" />
              <stop offset="100%" stopColor="#D9E2EC" />
            </radialGradient>
            <radialGradient id="sheepSkinGrad" cx="45%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#627D98" />
              <stop offset="80%" stopColor="#486581" />
              <stop offset="100%" stopColor="#334E68" />
            </radialGradient>
            <filter id="sheepShadow" x="-15%" y="-15%" width="130%" height="130%">
              <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#102A43" floodOpacity="0.3" />
            </filter>
          </defs>
          <ellipse cx="60" cy="104" rx="40" ry="9" fill="#102A43" fillOpacity="0.22" />
          {/* Fluffy Wool Puffs around Body */}
          <g fill="url(#woolPuffGrad)" filter="url(#sheepShadow)">
            <circle cx="34" cy="56" r="18" />
            <circle cx="86" cy="56" r="18" />
            <circle cx="38" cy="78" r="16" />
            <circle cx="82" cy="78" r="16" />
            <circle cx="60" cy="84" r="17" />
            <circle cx="44" cy="38" r="15" />
            <circle cx="76" cy="38" r="15" />
            <circle cx="60" cy="30" r="16" />
          </g>
          {/* Droopy Soft Ears */}
          <ellipse cx="26" cy="52" rx="12" ry="6" transform="rotate(30 26 52)" fill="url(#sheepSkinGrad)" />
          <ellipse cx="94" cy="52" rx="12" ry="6" transform="rotate(-30 94 52)" fill="url(#sheepSkinGrad)" />
          {/* Sheep Face */}
          <ellipse cx="60" cy="58" rx="22" ry="24" fill="url(#sheepSkinGrad)" filter="url(#sheepShadow)" />
          {/* Wool Cap on Forehead */}
          <circle cx="52" cy="38" r="9" fill="url(#woolPuffGrad)" />
          <circle cx="68" cy="38" r="9" fill="url(#woolPuffGrad)" />
          <circle cx="60" cy="34" r="10" fill="url(#woolPuffGrad)" />
          {/* Big Gentle Eyes */}
          <ellipse cx="50" cy="56" rx="5.5" ry="7" fill="#0B132B" />
          <ellipse cx="48.5" cy="54" rx="2.5" ry="3.5" fill="white" />
          <circle cx="52" cy="59" r="1" fill="white" />

          <ellipse cx="70" cy="56" rx="5.5" ry="7" fill="#0B132B" />
          <ellipse cx="68.5" cy="54" rx="2.5" ry="3.5" fill="white" />
          <circle cx="72" cy="59" r="1" fill="white" />
          {/* Soft Nose & Smile */}
          <ellipse cx="60" cy="68" rx="3.5" ry="2.5" fill="#334E68" />
          <path d="M56 73 Q60 76 64 73" stroke="#F0F4F8" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* Little Front Hooves */}
          <ellipse cx="46" cy="94" rx="7" ry="5" fill="#334E68" />
          <ellipse cx="74" cy="94" rx="7" ry="5" fill="#334E68" />
        </svg>
      );

    // ----------------------------------------------------
    // 9. DOIRA (DUMALOQ) - 3D Red Torus Ring / Donut
    // ----------------------------------------------------
    case 's-circle':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="torusGrad" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#FFA6B7" />
              <stop offset="25%" stopColor="#FF2E56" />
              <stop offset="65%" stopColor="#D90429" />
              <stop offset="90%" stopColor="#8A0014" />
              <stop offset="100%" stopColor="#57000B" />
            </radialGradient>
            <filter id="torusShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#5C000D" floodOpacity="0.4" />
            </filter>
          </defs>
          {/* Cast Shadow */}
          <ellipse cx="60" cy="102" rx="42" ry="11" fill="#47000B" fillOpacity="0.28" />
          {/* Outer Ring */}
          <circle cx="60" cy="58" r="44" fill="url(#torusGrad)" filter="url(#torusShadow)" />
          {/* Inner Cutout Hole Shadow & Depth */}
          <circle cx="60" cy="58" r="21" fill="#52000D" fillOpacity="0.5" />
          <circle cx="60" cy="57" r="20" fill="#9884FF" />
          {/* Inner Rim Light */}
          <ellipse cx="60" cy="74" rx="17" ry="4" fill="#FFA6B7" fillOpacity="0.6" />
          {/* Glossy Upper Specular Crescent Gleam */}
          <path
            d="M32 40 C40 25, 80 25, 88 40 C80 30, 40 30, 32 40 Z"
            fill="white"
            fillOpacity="0.85"
          />
          <ellipse cx="40" cy="34" rx="8" ry="4" transform="rotate(-25 40 34)" fill="white" fillOpacity="0.95" />
        </svg>
      );

    // ----------------------------------------------------
    // 10. KVADRAT - 3D Green Beveled Cube
    // ----------------------------------------------------
    case 's-square':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="cubeFront" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#25D366" />
              <stop offset="60%" stopColor="#12A84E" />
              <stop offset="100%" stopColor="#0B7334" />
            </linearGradient>
            <linearGradient id="cubeTop" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#5AF58A" />
              <stop offset="100%" stopColor="#B6FFCD" />
            </linearGradient>
            <linearGradient id="cubeBevel" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#43E879" />
              <stop offset="100%" stopColor="#065926" />
            </linearGradient>
            <filter id="cubeShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#06481E" floodOpacity="0.4" />
            </filter>
          </defs>
          {/* Contact Shadow */}
          <rect x="22" y="96" width="76" height="14" rx="7" fill="#063817" fillOpacity="0.28" />
          {/* Main Rounded Cube Body */}
          <rect x="24" y="24" width="72" height="72" rx="18" fill="url(#cubeFront)" filter="url(#cubeShadow)" />
          {/* Inner Bevel Border */}
          <rect x="28" y="28" width="64" height="64" rx="14" fill="none" stroke="url(#cubeTop)" strokeWidth="3" strokeOpacity="0.7" />
          {/* Top Light Rim */}
          <path d="M28 34 C28 29, 31 26, 36 26 L84 26 C89 26, 92 29, 92 34" stroke="white" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.85" />
          {/* Glossy Specular Hotspot */}
          <ellipse cx="40" cy="38" rx="10" ry="5" transform="rotate(-15 40 38)" fill="white" fillOpacity="0.75" />
        </svg>
      );

    // ----------------------------------------------------
    // 11. UCHBURCHAK - 3D Red Triangular Prism
    // ----------------------------------------------------
    case 's-triangle':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="triLeft" x1="20%" y1="20%" x2="80%" y2="90%">
              <stop offset="0%" stopColor="#FF7A95" />
              <stop offset="40%" stopColor="#FF2E56" />
              <stop offset="100%" stopColor="#D90429" />
            </linearGradient>
            <linearGradient id="triRight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D90429" />
              <stop offset="70%" stopColor="#990014" />
              <stop offset="100%" stopColor="#5E000C" />
            </linearGradient>
            <filter id="triShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#61000E" floodOpacity="0.4" />
            </filter>
          </defs>
          <ellipse cx="60" cy="102" rx="42" ry="10" fill="#54000C" fillOpacity="0.25" />
          {/* Main Triangle Body with Rounded Apex and Corners */}
          <path
            d="M60 18 C64 18, 67 21, 69 25 L99 82 C102 87, 98 94, 92 94 L28 94 C22 94, 18 87, 21 82 L51 25 C53 21, 56 18, 60 18 Z"
            fill="url(#triLeft)"
            filter="url(#triShadow)"
          />
          {/* Shaded Right Facet */}
          <path
            d="M60 20 L60 94 L92 94 C98 94, 102 87, 99 82 L69 25 C67 21, 64 18, 60 20 Z"
            fill="url(#triRight)"
            fillOpacity="0.75"
          />
          {/* Center Spine Ridge Highlight */}
          <path d="M60 22 L60 92" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.8" />
          {/* Left Edge Specular Gleam */}
          <path d="M52 35 L30 78" stroke="white" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.7" />
          {/* Top Point Hotspot */}
          <circle cx="60" cy="24" r="3" fill="white" fillOpacity="0.95" />
        </svg>
      );

    // ----------------------------------------------------
    // 12. YULDUZCHA - 3D Plump Golden Star
    // ----------------------------------------------------
    case 's-star':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="starGrad" cx="45%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#FFF9B3" />
              <stop offset="30%" stopColor="#FFD000" />
              <stop offset="70%" stopColor="#FF9E00" />
              <stop offset="100%" stopColor="#C76B00" />
            </radialGradient>
            <filter id="starShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="7" stdDeviation="6" floodColor="#824600" floodOpacity="0.4" />
            </filter>
          </defs>
          <ellipse cx="60" cy="104" rx="38" ry="9" fill="#6B3A00" fillOpacity="0.25" />
          {/* Plump 5-pointed Star with Rounded Corners */}
          <path
            d="M60 16 
               C61.5 16, 64 21, 65.5 24 
               L72 38 
               C73.5 41, 78 44, 82 44.5 
               L97 46.5 
               C101.5 47, 103 52, 100 55 
               L88.5 65.5 
               C85.5 68, 84 73, 85 77 
               L88 92 
               C89 96.5, 84.5 100, 81 97.5 
               L67.5 90 
               C64 88, 56 88, 52.5 90 
               L39 97.5 
               C35.5 100, 31 96.5, 32 92 
               L35 77 
               C36 73, 34.5 68, 31.5 65.5 
               L20 55 
               C17 52, 18.5 47, 23 46.5 
               L38 44.5 
               C42 44, 46.5 41, 48 38 
               L54.5 24 
               C56 21, 58.5 16, 60 16 Z"
            fill="url(#starGrad)"
            filter="url(#starShadow)"
          />
          {/* Inner Facet / Ridge Highlights for 3D Volume */}
          <path d="M60 22 L60 62 M86 48 L60 62 M80 88 L60 62 M40 88 L60 62 M34 48 L60 62" stroke="white" strokeWidth="2" strokeOpacity="0.45" strokeLinecap="round" />
          {/* Center Point Gleam */}
          <circle cx="60" cy="62" r="6" fill="#FFF9C4" fillOpacity="0.8" />
          {/* Top Point Hotspot */}
          <ellipse cx="60" cy="26" rx="4" ry="6" fill="white" fillOpacity="0.9" />
          <ellipse cx="78" cy="46" rx="3.5" ry="5" transform="rotate(35 78 46)" fill="white" fillOpacity="0.75" />
        </svg>
      );

    // ----------------------------------------------------
    // 13. JASUR ARSLON (3D Royal Lion Cub)
    // ----------------------------------------------------
    case 'a-lion':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="lionManeGrad2" cx="50%" cy="40%" r="55%">
              <stop offset="0%" stopColor="#FFA000" />
              <stop offset="65%" stopColor="#FF6F00" />
              <stop offset="100%" stopColor="#D84315" />
            </radialGradient>
            <radialGradient id="lionFaceGrad2" cx="45%" cy="38%" r="60%">
              <stop offset="0%" stopColor="#FFF176" />
              <stop offset="50%" stopColor="#FFD54F" />
              <stop offset="100%" stopColor="#FFB300" />
            </radialGradient>
            <filter id="lionShadow2" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="7" stdDeviation="6" floodColor="#B71C1C" floodOpacity="0.4" />
            </filter>
          </defs>
          <ellipse cx="60" cy="104" rx="40" ry="9" fill="#7A2200" fillOpacity="0.25" />
          <circle cx="60" cy="58" r="44" fill="url(#lionManeGrad2)" filter="url(#lionShadow2)" />
          <g fill="#E65100">
            <circle cx="28" cy="38" r="13" />
            <circle cx="92" cy="38" r="13" />
            <circle cx="20" cy="58" r="13" />
            <circle cx="100" cy="58" r="13" />
            <circle cx="32" cy="80" r="12" />
            <circle cx="88" cy="80" r="12" />
          </g>
          <circle cx="34" cy="34" r="8" fill="#FFA000" />
          <circle cx="86" cy="34" r="8" fill="#FFA000" />
          <circle cx="60" cy="58" r="30" fill="url(#lionFaceGrad2)" />
          <ellipse cx="50" cy="68" rx="11" ry="8" fill="#FFFFFF" />
          <ellipse cx="70" cy="68" rx="11" ry="8" fill="#FFFFFF" />
          <ellipse cx="46" cy="52" rx="6" ry="7.5" fill="#1C1004" />
          <ellipse cx="44.5" cy="49" rx="2.8" ry="3.8" fill="#FFFFFF" />
          <ellipse cx="74" cy="52" rx="6" ry="7.5" fill="#1C1004" />
          <ellipse cx="72.5" cy="49" rx="2.8" ry="3.8" fill="#FFFFFF" />
          <polygon points="56,63 64,63 60,68" fill="#D81B60" />
          <path d="M52 69 Q60 75 68 69" stroke="#795548" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <polygon points="50,28 54,36 60,26 66,36 70,28 68,40 52,40" fill="#FFD700" stroke="#B8860B" strokeWidth="1.2" />
          <circle cx="60" cy="27" r="2.2" fill="#E91E63" />
        </svg>
      );

    // ----------------------------------------------------
    // 14. KATTA FIL (3D Cheerful Little Elephant)
    // ----------------------------------------------------
    case 'a-elephant':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="eleSkin" cx="45%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#90E0EF" />
              <stop offset="60%" stopColor="#48CAE4" />
              <stop offset="100%" stopColor="#0077B6" />
            </radialGradient>
            <filter id="eleShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="7" stdDeviation="6" floodColor="#023E8A" floodOpacity="0.4" />
            </filter>
          </defs>
          <ellipse cx="60" cy="104" rx="42" ry="9" fill="#03045E" fillOpacity="0.25" />
          <circle cx="28" cy="54" r="21" fill="url(#eleSkin)" filter="url(#eleShadow)" />
          <circle cx="28" cy="54" r="14" fill="#CAF0F8" />
          <circle cx="92" cy="54" r="21" fill="url(#eleSkin)" filter="url(#eleShadow)" />
          <circle cx="92" cy="54" r="14" fill="#CAF0F8" />
          <circle cx="60" cy="58" r="32" fill="url(#eleSkin)" filter="url(#eleShadow)" />
          <polygon points="52,30 55,22 60,28 65,22 68,30" fill="#FFD700" stroke="#B8860B" strokeWidth="1.2" />
          <ellipse cx="46" cy="50" rx="5.5" ry="7" fill="#03045E" />
          <ellipse cx="44.5" cy="48" rx="2.5" ry="3.5" fill="#FFFFFF" />
          <ellipse cx="74" cy="50" rx="5.5" ry="7" fill="#03045E" />
          <ellipse cx="72.5" cy="48" rx="2.5" ry="3.5" fill="#FFFFFF" />
          <path d="M56 60 Q54 82 62 84 Q72 84 74 74 Q76 66 66 66 Q62 66 64 72" stroke="url(#eleSkin)" strokeWidth="8" strokeLinecap="round" fill="none" />
          <circle cx="76" cy="62" r="2.5" fill="#38BDF8" />
          <circle cx="82" cy="58" r="1.8" fill="#38BDF8" />
        </svg>
      );

    // ----------------------------------------------------
    // 15. QUVNOQ MAYMUN (3D Cheerful Monkey)
    // ----------------------------------------------------
    case 'a-monkey':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="monkeyFur" cx="45%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#A0522D" />
              <stop offset="70%" stopColor="#8B4513" />
              <stop offset="100%" stopColor="#5C2E0B" />
            </radialGradient>
            <radialGradient id="monkeyPeach" cx="45%" cy="38%" r="60%">
              <stop offset="0%" stopColor="#FFE0B2" />
              <stop offset="70%" stopColor="#FFCC80" />
              <stop offset="100%" stopColor="#FFA726" />
            </radialGradient>
            <filter id="monkeyShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="7" stdDeviation="6" floodColor="#3E2723" floodOpacity="0.4" />
            </filter>
          </defs>
          <ellipse cx="60" cy="104" rx="38" ry="9" fill="#3E2723" fillOpacity="0.25" />
          <circle cx="28" cy="52" r="15" fill="url(#monkeyFur)" filter="url(#monkeyShadow)" />
          <circle cx="28" cy="52" r="9" fill="url(#monkeyPeach)" />
          <circle cx="92" cy="52" r="15" fill="url(#monkeyFur)" filter="url(#monkeyShadow)" />
          <circle cx="92" cy="52" r="9" fill="url(#monkeyPeach)" />
          <circle cx="60" cy="58" r="32" fill="url(#monkeyFur)" filter="url(#monkeyShadow)" />
          <ellipse cx="50" cy="52" rx="14" ry="12" fill="url(#monkeyPeach)" />
          <ellipse cx="70" cy="52" rx="14" ry="12" fill="url(#monkeyPeach)" />
          <ellipse cx="60" cy="70" rx="20" ry="14" fill="url(#monkeyPeach)" />
          <ellipse cx="48" cy="52" rx="5" ry="6.5" fill="#1C1008" />
          <ellipse cx="46.5" cy="50" rx="2.2" ry="3.2" fill="#FFFFFF" />
          <ellipse cx="72" cy="52" rx="5" ry="6.5" fill="#1C1008" />
          <ellipse cx="70.5" cy="50" rx="2.2" ry="3.2" fill="#FFFFFF" />
          <ellipse cx="56" cy="65" rx="2.5" ry="2" fill="#5C2E0B" />
          <ellipse cx="64" cy="65" rx="2.5" ry="2" fill="#5C2E0B" />
          <path d="M52 72 Q60 80 68 72" stroke="#5C2E0B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </svg>
      );

    // ----------------------------------------------------
    // 16. QUYONCHA (3D Fluffy White & Pink Bunny)
    // ----------------------------------------------------
    case 'a-rabbit':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="rabFur" cx="42%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="70%" stopColor="#F8FAFC" />
              <stop offset="100%" stopColor="#E2E8F0" />
            </radialGradient>
            <radialGradient id="rabPink" cx="40%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FF80AB" />
              <stop offset="70%" stopColor="#FF4081" />
              <stop offset="100%" stopColor="#C2185B" />
            </radialGradient>
            <filter id="rabShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="7" stdDeviation="6" floodColor="#880E4F" floodOpacity="0.35" />
            </filter>
          </defs>
          <ellipse cx="60" cy="104" rx="40" ry="9" fill="#880E4F" fillOpacity="0.22" />
          <path d="M42 45 C32 10, 40 4, 48 16 C53 25, 52 38, 48 45 Z" fill="url(#rabFur)" filter="url(#rabShadow)" />
          <path d="M42 40 C35 16, 41 12, 46 19 C50 26, 48 35, 45 40 Z" fill="url(#rabPink)" />
          <path d="M78 45 C88 10, 80 4, 72 16 C67 25, 68 38, 72 45 Z" fill="url(#rabFur)" filter="url(#rabShadow)" />
          <path d="M78 40 C85 16, 79 12, 74 19 C70 26, 72 35, 75 40 Z" fill="url(#rabPink)" />
          <ellipse cx="60" cy="62" rx="34" ry="32" fill="url(#rabFur)" filter="url(#rabShadow)" />
          <circle cx="38" cy="68" r="9" fill="#FF80AB" fillOpacity="0.5" />
          <circle cx="82" cy="68" r="9" fill="#FF80AB" fillOpacity="0.5" />
          <ellipse cx="46" cy="56" rx="6.5" ry="8.5" fill="#2E1B24" />
          <ellipse cx="44.5" cy="53" rx="3" ry="4.2" fill="#FFFFFF" />
          <ellipse cx="74" cy="56" rx="6.5" ry="8.5" fill="#2E1B24" />
          <ellipse cx="72.5" cy="53" rx="3" ry="4.2" fill="#FFFFFF" />
          <polygon points="56,66 64,66 60,71" fill="#FF4081" />
          <path d="M54 72 Q60 76 66 72" stroke="#4A154B" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <circle cx="74" cy="38" r="5" fill="#FFD600" />
        </svg>
      );

    // ----------------------------------------------------
    // 17. MITTI PINGVIN (3D Chubby Royal Baby Penguin Face)
    // ----------------------------------------------------
    case 'a-penguin':
    case 'penguin':
    case 'pingvin':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="penHeadGrad" cx="45%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="60%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0B132B" />
            </radialGradient>
            <radialGradient id="penFaceMask" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="75%" stopColor="#F0F9FF" />
              <stop offset="100%" stopColor="#E0F2FE" />
            </radialGradient>
            <radialGradient id="penBeakGrad" cx="45%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="40%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </radialGradient>
            <filter id="penShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="7" stdDeviation="6" floodColor="#0B132B" floodOpacity="0.4" />
            </filter>
          </defs>
          <ellipse cx="60" cy="104" rx="40" ry="9" fill="#0B132B" fillOpacity="0.25" />
          {/* Main Round 3D Penguin Head */}
          <ellipse cx="60" cy="58" rx="38" ry="36" fill="url(#penHeadGrad)" filter="url(#penShadow)" />
          {/* Cute Little Flapper Wings on Sides */}
          <ellipse cx="23" cy="66" rx="8" ry="16" transform="rotate(20 23 66)" fill="url(#penHeadGrad)" />
          <ellipse cx="97" cy="66" rx="8" ry="16" transform="rotate(-20 97 66)" fill="url(#penHeadGrad)" />
          {/* Heart / Oval Shaped White Face Mask */}
          <ellipse cx="49" cy="56" rx="14" ry="18" fill="url(#penFaceMask)" />
          <ellipse cx="71" cy="56" rx="14" ry="18" fill="url(#penFaceMask)" />
          <ellipse cx="60" cy="68" rx="20" ry="14" fill="url(#penFaceMask)" />
          {/* Cute Rosy Blushing Cheeks */}
          <circle cx="39" cy="68" r="8" fill="#FF6B8B" fillOpacity="0.5" />
          <circle cx="81" cy="68" r="8" fill="#FF6B8B" fillOpacity="0.5" />
          {/* Big Disney/Pixar Eyes */}
          <ellipse cx="47" cy="53" rx="6.5" ry="8.5" fill="#0F172A" />
          <ellipse cx="45.5" cy="50" rx="3" ry="4.2" fill="#FFFFFF" />
          <circle cx="49" cy="56" r="1.5" fill="#FFFFFF" />
          <ellipse cx="73" cy="53" rx="6.5" ry="8.5" fill="#0F172A" />
          <ellipse cx="71.5" cy="50" rx="3" ry="4.2" fill="#FFFFFF" />
          <circle cx="75" cy="56" r="1.5" fill="#FFFFFF" />
          {/* 3D Golden Beak */}
          <path
            d="M52 62 Q60 59 68 62 C68 68, 64 76, 60 76 C56 76, 52 68, 52 62 Z"
            fill="url(#penBeakGrad)"
            filter="drop-shadow(0 2px 3px rgba(0,0,0,0.3))"
          />
          <ellipse cx="60" cy="63" rx="4" ry="1.5" fill="#FFFFFF" fillOpacity="0.7" />
          {/* Adorable Golden Crown */}
          <polygon points="52,26 55,18 60,24 65,18 68,26" fill="#FBBF24" stroke="#D97706" strokeWidth="1.2" />
          <circle cx="60" cy="23" r="2" fill="#EF4444" />
        </svg>
      );

    // ----------------------------------------------------
    // 18. YURAKCHA (3D Ruby Glossy Heart)
    // ----------------------------------------------------
    case 's-heart':
    case 'heart':
    case 'yurak':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="heartGrad" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#FFAEC0" />
              <stop offset="25%" stopColor="#FF3366" />
              <stop offset="70%" stopColor="#E60039" />
              <stop offset="100%" stopColor="#8A0022" />
            </radialGradient>
            <filter id="heartShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#7A0020" floodOpacity="0.4" />
            </filter>
          </defs>
          <ellipse cx="60" cy="104" rx="38" ry="9" fill="#5C0016" fillOpacity="0.25" />
          <path
            d="M60 96 C36 78 16 58 16 38 C16 22 28 14 42 14 C51 14 58 20 60 26 C62 20 69 14 78 14 C92 14 104 22 104 38 C104 58 84 78 60 96 Z"
            fill="url(#heartGrad)"
            filter="url(#heartShadow)"
          />
          <ellipse cx="38" cy="30" rx="9" ry="5" transform="rotate(-30 38 30)" fill="white" fillOpacity="0.85" />
          <circle cx="44" cy="25" r="2.5" fill="white" fillOpacity="0.95" />
          <ellipse cx="78" cy="28" rx="6" ry="3.5" transform="rotate(25 78 28)" fill="white" fillOpacity="0.6" />
        </svg>
      );

    // ----------------------------------------------------
    // 19. ROMB (OLMOS) - 3D Sparkling Cyan Rhombus Gem
    // ----------------------------------------------------
    case 's-diamond':
    case 'diamond':
    case 'romb':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="diaMain" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A5F3FC" />
              <stop offset="40%" stopColor="#22D3EE" />
              <stop offset="80%" stopColor="#0891B2" />
              <stop offset="100%" stopColor="#164E63" />
            </linearGradient>
            <filter id="diaShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#083344" floodOpacity="0.4" />
            </filter>
          </defs>
          <ellipse cx="60" cy="104" rx="38" ry="9" fill="#083344" fillOpacity="0.25" />
          <polygon points="60,14 102,60 60,106 18,60" fill="url(#diaMain)" filter="url(#diaShadow)" />
          <polygon points="60,14 60,60 18,60" fill="#E0F2FE" fillOpacity="0.45" />
          <polygon points="60,14 102,60 60,60" fill="#BAE6FD" fillOpacity="0.3" />
          <polygon points="18,60 60,60 60,106" fill="#0369A1" fillOpacity="0.35" />
          <polygon points="60,60 102,60 60,106" fill="#075985" fillOpacity="0.5" />
          <line x1="60" y1="14" x2="18" y2="60" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.9" />
          <line x1="60" y1="14" x2="102" y2="60" stroke="white" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.7" />
          <circle cx="60" cy="22" r="3.5" fill="white" />
          <path d="M60 15 L60 29 M53 22 L67 22" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    // ----------------------------------------------------
    // 20. SONLAR (3D Sculpted Clay Numbers 1-10)
    // ----------------------------------------------------
    case 'n-1':
    case '1':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="num1Grad" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#FFF59D" />
              <stop offset="30%" stopColor="#FBBF24" />
              <stop offset="80%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#B45309" />
            </radialGradient>
            <filter id="num1Shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#78350F" floodOpacity="0.4" />
            </filter>
          </defs>
          <ellipse cx="60" cy="104" rx="36" ry="9" fill="#78350F" fillOpacity="0.25" />
          <rect x="22" y="16" width="76" height="84" rx="24" fill="url(#num1Grad)" filter="url(#num1Shadow)" />
          <rect x="26" y="20" width="68" height="76" rx="20" stroke="#FEF3C7" strokeWidth="2.5" fill="none" strokeOpacity="0.6" />
          <text x="60" y="74" textAnchor="middle" fill="#FFFFFF" fontSize="58" fontWeight="900" fontFamily="sans-serif" style={{ filter: 'drop-shadow(0 3px 4px rgba(180,83,9,0.7))' }}>
            1
          </text>
          <circle cx="38" cy="32" r="3.5" fill="white" fillOpacity="0.9" />
          <circle cx="82" cy="78" r="2.5" fill="white" fillOpacity="0.8" />
        </svg>
      );

    case 'n-2':
    case '2':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="num2Grad" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#E9D5FF" />
              <stop offset="30%" stopColor="#A855F7" />
              <stop offset="80%" stopColor="#7E22CE" />
              <stop offset="100%" stopColor="#581C87" />
            </radialGradient>
            <filter id="num2Shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#3B0764" floodOpacity="0.4" />
            </filter>
          </defs>
          <ellipse cx="60" cy="104" rx="36" ry="9" fill="#3B0764" fillOpacity="0.25" />
          <rect x="22" y="16" width="76" height="84" rx="24" fill="url(#num2Grad)" filter="url(#num2Shadow)" />
          <rect x="26" y="20" width="68" height="76" rx="20" stroke="#F3E8FF" strokeWidth="2.5" fill="none" strokeOpacity="0.6" />
          <text x="60" y="74" textAnchor="middle" fill="#FFFFFF" fontSize="58" fontWeight="900" fontFamily="sans-serif" style={{ filter: 'drop-shadow(0 3px 4px rgba(88,28,135,0.7))' }}>
            2
          </text>
          <circle cx="38" cy="32" r="3.5" fill="white" fillOpacity="0.9" />
        </svg>
      );

    case 'n-3':
    case '3':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="num3Grad" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#BAE6FD" />
              <stop offset="30%" stopColor="#0EA5E9" />
              <stop offset="80%" stopColor="#0284C7" />
              <stop offset="100%" stopColor="#0369A1" />
            </radialGradient>
            <filter id="num3Shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#082F49" floodOpacity="0.4" />
            </filter>
          </defs>
          <ellipse cx="60" cy="104" rx="36" ry="9" fill="#082F49" fillOpacity="0.25" />
          <rect x="22" y="16" width="76" height="84" rx="24" fill="url(#num3Grad)" filter="url(#num3Shadow)" />
          <rect x="26" y="20" width="68" height="76" rx="20" stroke="#E0F2FE" strokeWidth="2.5" fill="none" strokeOpacity="0.6" />
          <text x="60" y="74" textAnchor="middle" fill="#FFFFFF" fontSize="58" fontWeight="900" fontFamily="sans-serif" style={{ filter: 'drop-shadow(0 3px 4px rgba(3,105,161,0.7))' }}>
            3
          </text>
          <circle cx="38" cy="32" r="3.5" fill="white" fillOpacity="0.9" />
        </svg>
      );

    case 'n-4':
    case '4':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="num4Grad" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#A7F3D0" />
              <stop offset="30%" stopColor="#10B981" />
              <stop offset="80%" stopColor="#059669" />
              <stop offset="100%" stopColor="#047857" />
            </radialGradient>
            <filter id="num4Shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#064E3B" floodOpacity="0.4" />
            </filter>
          </defs>
          <ellipse cx="60" cy="104" rx="36" ry="9" fill="#064E3B" fillOpacity="0.25" />
          <rect x="22" y="16" width="76" height="84" rx="24" fill="url(#num4Grad)" filter="url(#num4Shadow)" />
          <rect x="26" y="20" width="68" height="76" rx="20" stroke="#D1FAE5" strokeWidth="2.5" fill="none" strokeOpacity="0.6" />
          <text x="60" y="74" textAnchor="middle" fill="#FFFFFF" fontSize="58" fontWeight="900" fontFamily="sans-serif" style={{ filter: 'drop-shadow(0 3px 4px rgba(4,120,87,0.7))' }}>
            4
          </text>
          <circle cx="38" cy="32" r="3.5" fill="white" fillOpacity="0.9" />
        </svg>
      );

    case 'n-5':
    case '5':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="num5Grad" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#FECDD3" />
              <stop offset="30%" stopColor="#F43F5E" />
              <stop offset="80%" stopColor="#E11D48" />
              <stop offset="100%" stopColor="#BE123C" />
            </radialGradient>
            <filter id="num5Shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#881337" floodOpacity="0.4" />
            </filter>
          </defs>
          <ellipse cx="60" cy="104" rx="36" ry="9" fill="#881337" fillOpacity="0.25" />
          <rect x="22" y="16" width="76" height="84" rx="24" fill="url(#num5Grad)" filter="url(#num5Shadow)" />
          <rect x="26" y="20" width="68" height="76" rx="20" stroke="#FFE4E6" strokeWidth="2.5" fill="none" strokeOpacity="0.6" />
          <text x="60" y="74" textAnchor="middle" fill="#FFFFFF" fontSize="58" fontWeight="900" fontFamily="sans-serif" style={{ filter: 'drop-shadow(0 3px 4px rgba(190,18,60,0.7))' }}>
            5
          </text>
          <circle cx="38" cy="32" r="3.5" fill="white" fillOpacity="0.9" />
        </svg>
      );

    case 'n-6':
    case '6':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="num6Grad" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#FED7AA" />
              <stop offset="30%" stopColor="#FB923C" />
              <stop offset="80%" stopColor="#EA580C" />
              <stop offset="100%" stopColor="#C2410C" />
            </radialGradient>
            <filter id="num6Shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#7C2D12" floodOpacity="0.4" />
            </filter>
          </defs>
          <ellipse cx="60" cy="104" rx="36" ry="9" fill="#7C2D12" fillOpacity="0.25" />
          <rect x="22" y="16" width="76" height="84" rx="24" fill="url(#num6Grad)" filter="url(#num6Shadow)" />
          <rect x="26" y="20" width="68" height="76" rx="20" stroke="#FFEDD5" strokeWidth="2.5" fill="none" strokeOpacity="0.6" />
          <text x="60" y="74" textAnchor="middle" fill="#FFFFFF" fontSize="58" fontWeight="900" fontFamily="sans-serif" style={{ filter: 'drop-shadow(0 3px 4px rgba(194,65,12,0.7))' }}>
            6
          </text>
        </svg>
      );

    case 'n-7':
    case '7':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="num7Grad" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#A5F3FC" />
              <stop offset="30%" stopColor="#06B6D4" />
              <stop offset="80%" stopColor="#0891B2" />
              <stop offset="100%" stopColor="#0E7490" />
            </radialGradient>
            <filter id="num7Shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#164E63" floodOpacity="0.4" />
            </filter>
          </defs>
          <ellipse cx="60" cy="104" rx="36" ry="9" fill="#164E63" fillOpacity="0.25" />
          <rect x="22" y="16" width="76" height="84" rx="24" fill="url(#num7Grad)" filter="url(#num7Shadow)" />
          <rect x="26" y="20" width="68" height="76" rx="20" stroke="#CFFAFE" strokeWidth="2.5" fill="none" strokeOpacity="0.6" />
          <text x="60" y="74" textAnchor="middle" fill="#FFFFFF" fontSize="58" fontWeight="900" fontFamily="sans-serif" style={{ filter: 'drop-shadow(0 3px 4px rgba(14,116,144,0.7))' }}>
            7
          </text>
        </svg>
      );

    case 'n-8':
    case '8':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="num8Grad" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#F5D0FE" />
              <stop offset="30%" stopColor="#D946EF" />
              <stop offset="80%" stopColor="#C026D3" />
              <stop offset="100%" stopColor="#A21CAF" />
            </radialGradient>
            <filter id="num8Shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#701A75" floodOpacity="0.4" />
            </filter>
          </defs>
          <ellipse cx="60" cy="104" rx="36" ry="9" fill="#701A75" fillOpacity="0.25" />
          <rect x="22" y="16" width="76" height="84" rx="24" fill="url(#num8Grad)" filter="url(#num8Shadow)" />
          <rect x="26" y="20" width="68" height="76" rx="20" stroke="#FAE8FF" strokeWidth="2.5" fill="none" strokeOpacity="0.6" />
          <text x="60" y="74" textAnchor="middle" fill="#FFFFFF" fontSize="58" fontWeight="900" fontFamily="sans-serif" style={{ filter: 'drop-shadow(0 3px 4px rgba(162,28,175,0.7))' }}>
            8
          </text>
        </svg>
      );

    case 'n-9':
    case '9':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="num9Grad" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#C7D2FE" />
              <stop offset="30%" stopColor="#6366F1" />
              <stop offset="80%" stopColor="#4F46E5" />
              <stop offset="100%" stopColor="#4338CA" />
            </radialGradient>
            <filter id="num9Shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#312E81" floodOpacity="0.4" />
            </filter>
          </defs>
          <ellipse cx="60" cy="104" rx="36" ry="9" fill="#312E81" fillOpacity="0.25" />
          <rect x="22" y="16" width="76" height="84" rx="24" fill="url(#num9Grad)" filter="url(#num9Shadow)" />
          <rect x="26" y="20" width="68" height="76" rx="20" stroke="#E0E7FF" strokeWidth="2.5" fill="none" strokeOpacity="0.6" />
          <text x="60" y="74" textAnchor="middle" fill="#FFFFFF" fontSize="58" fontWeight="900" fontFamily="sans-serif" style={{ filter: 'drop-shadow(0 3px 4px rgba(67,56,202,0.7))' }}>
            9
          </text>
        </svg>
      );

    case 'n-10':
    case '10':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="num10Grad" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="30%" stopColor="#EAB308" />
              <stop offset="80%" stopColor="#CA8A04" />
              <stop offset="100%" stopColor="#A16207" />
            </radialGradient>
            <filter id="num10Shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#713F12" floodOpacity="0.4" />
            </filter>
          </defs>
          <ellipse cx="60" cy="104" rx="42" ry="9" fill="#713F12" fillOpacity="0.25" />
          <rect x="14" y="16" width="92" height="84" rx="24" fill="url(#num10Grad)" filter="url(#num10Shadow)" />
          <polygon points="56,22 60,14 64,22 68,14 72,22" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />
          <text x="60" y="74" textAnchor="middle" fill="#FFFFFF" fontSize="50" fontWeight="900" fontFamily="sans-serif" style={{ filter: 'drop-shadow(0 3px 4px rgba(161,98,7,0.7))' }}>
            10
          </text>
        </svg>
      );

    // ----------------------------------------------------
    // 21. MEVALAR (3D Juicy Pixar Fruits)
    // ----------------------------------------------------
    case 'f-apple':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="appleGrad" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#FFA4B6" />
              <stop offset="25%" stopColor="#FF2E56" />
              <stop offset="70%" stopColor="#D90429" />
              <stop offset="100%" stopColor="#7A0012" />
            </radialGradient>
            <filter id="appleShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="7" stdDeviation="6" floodColor="#60000E" floodOpacity="0.35" />
            </filter>
          </defs>
          <ellipse cx="60" cy="104" rx="38" ry="9" fill="#50000C" fillOpacity="0.25" />
          {/* Stem & Leaf */}
          <path d="M60 36 C59 20, 68 14, 72 12" stroke="#5C3317" strokeWidth="4" strokeLinecap="round" />
          <path d="M68 16 C80 14, 88 22, 82 28 C74 28, 68 22, 68 16 Z" fill="#22C55E" />
          {/* Apple Body */}
          <path
            d="M60 40 C46 28 20 34 20 62 C20 86 42 100 60 98 C78 100 100 86 100 62 C100 34 74 28 60 40 Z"
            fill="url(#appleGrad)"
            filter="url(#appleShadow)"
          />
          <ellipse cx="42" cy="48" rx="8" ry="4" transform="rotate(-30 42 48)" fill="white" fillOpacity="0.8" />
        </svg>
      );

    case 'f-banana':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bananaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF9A6" />
              <stop offset="40%" stopColor="#FACC15" />
              <stop offset="85%" stopColor="#EAB308" />
              <stop offset="100%" stopColor="#A16207" />
            </linearGradient>
            <filter id="bananaShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="7" stdDeviation="6" floodColor="#713F12" floodOpacity="0.35" />
            </filter>
          </defs>
          <ellipse cx="60" cy="104" rx="40" ry="9" fill="#713F12" fillOpacity="0.22" />
          <path
            d="M24 38 C36 18, 86 24, 98 64 C104 84, 86 98, 72 96 C86 86, 92 68, 84 52 C74 34, 44 32, 28 44 L24 38 Z"
            fill="url(#bananaGrad)"
            filter="url(#bananaShadow)"
          />
          <path d="M22 36 L28 42 L24 46 L18 40 Z" fill="#65A30D" />
          <path d="M72 96 L76 100 L70 102 Z" fill="#854D0E" />
          <path d="M40 38 C60 38, 80 50, 84 68" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.75" />
        </svg>
      );

    case 'f-watermelon':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="wmFlesh" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#FF5C7A" />
              <stop offset="70%" stopColor="#E11D48" />
              <stop offset="100%" stopColor="#9F1239" />
            </radialGradient>
            <filter id="wmShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="7" stdDeviation="6" floodColor="#881337" floodOpacity="0.35" />
            </filter>
          </defs>
          <ellipse cx="60" cy="104" rx="42" ry="9" fill="#14532D" fillOpacity="0.25" />
          {/* Green Rind */}
          <path d="M16 48 C20 88, 100 88, 104 48 L94 48 C90 80, 30 80, 26 48 Z" fill="#15803D" filter="url(#wmShadow)" />
          {/* White inner rind */}
          <path d="M22 48 C26 78, 94 78, 98 48 L92 48 C88 74, 32 74, 28 48 Z" fill="#DCFCE7" />
          {/* Red Flesh Wedge */}
          <path d="M26 48 C30 74, 90 74, 94 48 Z" fill="url(#wmFlesh)" />
          {/* Seeds */}
          <ellipse cx="44" cy="56" rx="2" ry="3.5" transform="rotate(20 44 56)" fill="#1F2937" />
          <ellipse cx="60" cy="62" rx="2" ry="3.5" fill="#1F2937" />
          <ellipse cx="76" cy="56" rx="2" ry="3.5" transform="rotate(-20 76 56)" fill="#1F2937" />
          <ellipse cx="52" cy="52" rx="1.8" ry="3" fill="#1F2937" />
          <ellipse cx="68" cy="52" rx="1.8" ry="3" fill="#1F2937" />
        </svg>
      );

    case 'f-grape':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="grapeGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#C084FC" />
              <stop offset="40%" stopColor="#9333EA" />
              <stop offset="100%" stopColor="#581C87" />
            </radialGradient>
            <filter id="grapeShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="7" stdDeviation="5" floodColor="#3B0764" floodOpacity="0.35" />
            </filter>
          </defs>
          <ellipse cx="60" cy="104" rx="34" ry="8" fill="#3B0764" fillOpacity="0.22" />
          <path d="M60 22 C60 14, 68 12, 72 10" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
          <path d="M64 16 C76 16, 82 24, 76 28 C68 28, 64 22, 64 16 Z" fill="#22C55E" />
          <g filter="url(#grapeShadow)">
            <circle cx="46" cy="38" r="12" fill="url(#grapeGrad)" />
            <circle cx="74" cy="38" r="12" fill="url(#grapeGrad)" />
            <circle cx="60" cy="40" r="12" fill="url(#grapeGrad)" />
            <circle cx="40" cy="56" r="12" fill="url(#grapeGrad)" />
            <circle cx="60" cy="58" r="12" fill="url(#grapeGrad)" />
            <circle cx="80" cy="56" r="12" fill="url(#grapeGrad)" />
            <circle cx="50" cy="74" r="11" fill="url(#grapeGrad)" />
            <circle cx="70" cy="74" r="11" fill="url(#grapeGrad)" />
            <circle cx="60" cy="88" r="10" fill="url(#grapeGrad)" />
          </g>
          <circle cx="56" cy="54" r="3" fill="white" fillOpacity="0.6" />
        </svg>
      );

    case 'f-strawberry':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="strawGrad" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#FFA4B6" />
              <stop offset="30%" stopColor="#FF1E4B" />
              <stop offset="80%" stopColor="#D90429" />
              <stop offset="100%" stopColor="#800014" />
            </radialGradient>
            <filter id="strawShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="7" stdDeviation="6" floodColor="#5C000E" floodOpacity="0.35" />
            </filter>
          </defs>
          <ellipse cx="60" cy="104" rx="34" ry="8" fill="#5C000E" fillOpacity="0.22" />
          {/* Strawberry Body */}
          <path
            d="M60 98 C44 86 28 66 28 46 C28 32 44 26 60 30 C76 26 92 32 92 46 C92 66 76 86 60 98 Z"
            fill="url(#strawGrad)"
            filter="url(#strawShadow)"
          />
          {/* Green Calyx Leaf Crown */}
          <path d="M60 20 L60 28" stroke="#15803D" strokeWidth="3" strokeLinecap="round" />
          <path d="M38 28 C48 34, 54 36, 60 36 C66 36, 72 34, 82 28 C74 38, 68 40, 60 38 C52 40, 46 38, 38 28 Z" fill="#22C55E" />
          {/* Seeds */}
          <circle cx="48" cy="46" r="1.5" fill="#FEF08A" />
          <circle cx="60" cy="48" r="1.5" fill="#FEF08A" />
          <circle cx="72" cy="46" r="1.5" fill="#FEF08A" />
          <circle cx="42" cy="58" r="1.5" fill="#FEF08A" />
          <circle cx="54" cy="62" r="1.5" fill="#FEF08A" />
          <circle cx="66" cy="62" r="1.5" fill="#FEF08A" />
          <circle cx="78" cy="58" r="1.5" fill="#FEF08A" />
          <circle cx="50" cy="74" r="1.5" fill="#FEF08A" />
          <circle cx="62" cy="76" r="1.5" fill="#FEF08A" />
          <circle cx="70" cy="74" r="1.5" fill="#FEF08A" />
          <circle cx="60" cy="88" r="1.3" fill="#FEF08A" />
        </svg>
      );

    case 'f-orange':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="orangeGrad" cx="35%" cy="32%" r="65%">
              <stop offset="0%" stopColor="#FED7AA" />
              <stop offset="30%" stopColor="#FB923C" />
              <stop offset="75%" stopColor="#EA580C" />
              <stop offset="100%" stopColor="#9A3412" />
            </radialGradient>
            <filter id="orangeShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="7" stdDeviation="6" floodColor="#7C2D12" floodOpacity="0.35" />
            </filter>
          </defs>
          <ellipse cx="60" cy="104" rx="40" ry="9" fill="#7C2D12" fillOpacity="0.25" />
          {/* Leaf */}
          <path d="M60 24 C58 14, 68 12, 74 10" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
          <path d="M66 14 C78 14, 84 22, 78 26 C70 26, 66 20, 66 14 Z" fill="#22C55E" />
          <circle cx="60" cy="60" r="42" fill="url(#orangeGrad)" filter="url(#orangeShadow)" />
          <ellipse cx="44" cy="42" rx="10" ry="5" transform="rotate(-30 44 42)" fill="white" fillOpacity="0.8" />
        </svg>
      );

    case 'f-pineapple':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="pineGrad" cx="35%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="40%" stopColor="#EAB308" />
              <stop offset="85%" stopColor="#CA8A04" />
              <stop offset="100%" stopColor="#854D0E" />
            </radialGradient>
            <filter id="pineShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="7" stdDeviation="6" floodColor="#713F12" floodOpacity="0.35" />
            </filter>
          </defs>
          <ellipse cx="60" cy="104" rx="36" ry="9" fill="#713F12" fillOpacity="0.22" />
          {/* Green Crown Leaves */}
          <path d="M60 10 L54 36 L66 36 Z" fill="#16A34A" />
          <path d="M46 16 L50 36 L40 28 Z" fill="#22C55E" />
          <path d="M74 16 L70 36 L80 28 Z" fill="#22C55E" />
          {/* Pineapple Oval */}
          <ellipse cx="60" cy="68" rx="30" ry="34" fill="url(#pineGrad)" filter="url(#pineShadow)" />
          {/* Crosshatch Diamond Texture */}
          <path d="M40 50 L80 86 M40 64 L74 94 M46 42 L80 72" stroke="#A16207" strokeWidth="2" strokeOpacity="0.6" strokeLinecap="round" />
          <path d="M80 50 L40 86 M80 64 L46 94 M74 42 L40 72" stroke="#A16207" strokeWidth="2" strokeOpacity="0.6" strokeLinecap="round" />
        </svg>
      );

    case 's-pentagon':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="pentaGrad" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#C4B5FD" />
              <stop offset="35%" stopColor="#8B5CF6" />
              <stop offset="75%" stopColor="#6D28D9" />
              <stop offset="100%" stopColor="#4C1D95" />
            </radialGradient>
            <filter id="pentaShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="7" stdDeviation="6" floodColor="#4C1D95" floodOpacity="0.4" />
            </filter>
          </defs>
          <ellipse cx="60" cy="104" rx="38" ry="9" fill="#4C1D95" fillOpacity="0.25" />
          <polygon points="60,16 102,46 86,94 34,94 18,46" fill="url(#pentaGrad)" filter="url(#pentaShadow)" />
          <polygon points="60,22 96,48 82,88 38,88 24,48" stroke="#E0E7FF" strokeWidth="2" fill="none" strokeOpacity="0.6" />
          <ellipse cx="50" cy="36" rx="10" ry="5" transform="rotate(-25 50 36)" fill="white" fillOpacity="0.75" />
        </svg>
      );

    case 's-hexagon':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="hexaGrad" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="35%" stopColor="#EAB308" />
              <stop offset="75%" stopColor="#CA8A04" />
              <stop offset="100%" stopColor="#854D0E" />
            </radialGradient>
            <filter id="hexaShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="7" stdDeviation="6" floodColor="#713F12" floodOpacity="0.38" />
            </filter>
          </defs>
          <ellipse cx="60" cy="104" rx="40" ry="9" fill="#713F12" fillOpacity="0.25" />
          <polygon points="60,15 98,37 98,81 60,103 22,81 22,37" fill="url(#hexaGrad)" filter="url(#hexaShadow)" />
          <polygon points="60,21 92,39 92,77 60,95 28,77 28,39" stroke="#FEF9C3" strokeWidth="2" fill="none" strokeOpacity="0.6" />
          <ellipse cx="48" cy="35" rx="10" ry="5" transform="rotate(-20 48 35)" fill="white" fillOpacity="0.8" />
        </svg>
      );

    case 's-trapezoid':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="trapGrad" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#99F6E4" />
              <stop offset="35%" stopColor="#14B8A6" />
              <stop offset="75%" stopColor="#0F766E" />
              <stop offset="100%" stopColor="#134E4A" />
            </radialGradient>
            <filter id="trapShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="7" stdDeviation="6" floodColor="#134E4A" floodOpacity="0.4" />
            </filter>
          </defs>
          <ellipse cx="60" cy="104" rx="42" ry="9" fill="#134E4A" fillOpacity="0.25" />
          <polygon points="35,26 85,26 104,90 16,90" fill="url(#trapGrad)" filter="url(#trapShadow)" />
          <ellipse cx="50" cy="40" rx="12" ry="5" fill="white" fillOpacity="0.75" />
        </svg>
      );

    case 's-cylinder':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="cylGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4338CA" />
              <stop offset="25%" stopColor="#6366F1" />
              <stop offset="60%" stopColor="#A5B4FC" />
              <stop offset="85%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#3730A3" />
            </linearGradient>
            <filter id="cylShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="7" stdDeviation="6" floodColor="#312E81" floodOpacity="0.4" />
            </filter>
          </defs>
          <ellipse cx="60" cy="104" rx="38" ry="9" fill="#312E81" fillOpacity="0.25" />
          {/* Cylinder Body */}
          <rect x="25" y="32" width="70" height="58" fill="url(#cylGrad)" filter="url(#cylShadow)" />
          <ellipse cx="60" cy="90" rx="35" ry="14" fill="#4338CA" />
          {/* Cylinder Top Cap */}
          <ellipse cx="60" cy="32" rx="35" ry="14" fill="#C7D2FE" stroke="#EEF2FF" strokeWidth="2" />
          <ellipse cx="52" cy="28" rx="10" ry="4" fill="white" fillOpacity="0.8" />
        </svg>
      );

    // Fallback: Dynamic 2-digit numbers, animals, birds, big words, emojis
    default: {
      // 1. Check if cardId represents ANY 1-digit, 2-digit, or 3-digit number (e.g. 'num-15', 'n-12', '25')
      const numMatch = cardId.match(/(?:num-|n-)?(\d+)/);
      if (numMatch) {
        const val = numMatch[1];
        return (
          <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id={`dynNumGrad_${val}`} cx="35%" cy="30%" r="65%">
                <stop offset="0%" stopColor="#FEF08A" />
                <stop offset="35%" stopColor="#F59E0B" />
                <stop offset="75%" stopColor="#D97706" />
                <stop offset="100%" stopColor="#78350F" />
              </radialGradient>
              <filter id={`dynNumShadow_${val}`} x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#78350F" floodOpacity="0.4" />
              </filter>
            </defs>
            <ellipse cx="60" cy="104" rx="42" ry="9" fill="#78350F" fillOpacity="0.25" />
            <rect x="12" y="16" width="96" height="84" rx="26" fill={`url(#dynNumGrad_${val})`} filter={`url(#dynNumShadow_${val})`} />
            <rect x="16" y="20" width="88" height="38" rx="20" fill="white" fillOpacity="0.25" />
            <text
              x="60"
              y={val.length > 2 ? '70' : '74'}
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize={val.length > 2 ? '42' : '48'}
              fontWeight="900"
              fontFamily="sans-serif"
              style={{ filter: 'drop-shadow(0 3px 4px rgba(120,53,15,0.75))' }}
            >
              {val}
            </text>
          </svg>
        );
      }

      // 2. Check if it's an animal handled specifically by AnimalCharacterGraphic
      const rawTarget = (emoji || cardId).toLowerCase();
      const isKnownAnimalGraphic =
        rawTarget.includes('sher') || rawTarget.includes('lion') || rawTarget.includes('🦁') ||
        rawTarget.includes('ayiq') || rawTarget.includes('bear') || rawTarget.includes('🐻') ||
        rawTarget.includes('tulki') || rawTarget.includes('fox') || rawTarget.includes('🦊') ||
        rawTarget.includes('kuchuk') || rawTarget.includes('dog') || rawTarget.includes('🐶') ||
        rawTarget.includes('mushuk') || rawTarget.includes('cat') || rawTarget.includes('🐱') ||
        rawTarget.includes('fil') || rawTarget.includes('elephant') || rawTarget.includes('🐘') ||
        rawTarget.includes('maymun') || rawTarget.includes('monkey') || rawTarget.includes('🐵') ||
        rawTarget.includes('panda') || rawTarget.includes('🐼') ||
        rawTarget.includes('sigir') || rawTarget.includes('cow') || rawTarget.includes('🐮') ||
        rawTarget.includes('qo\'y') || rawTarget.includes('sheep') || rawTarget.includes('🐑') ||
        rawTarget.includes('pingvin') || rawTarget.includes('penguin') || rawTarget.includes('🐧') ||
        rawTarget.includes('quyon') || rawTarget.includes('rabbit') || rawTarget.includes('bunny') || rawTarget.includes('🐰');

      if (isKnownAnimalGraphic) {
        return <AnimalCharacterGraphic idOrEmoji={emoji || cardId} className={className} showBackgroundDisc={false} />;
      }

      // 3. Render a Glossy 3D Medallion with the card's real emoji/icon
      const displayEmoji = emoji || '✨';
      return (
        <div className={`relative flex items-center justify-center select-none ${className}`}>
          {/* Circular 3D Base Podium */}
          <div className="w-full h-full rounded-full bg-gradient-to-tr from-white/20 via-white/40 to-white/10 p-2 flex items-center justify-center shadow-inner relative overflow-hidden">
            <div className="absolute inset-x-2 top-1 h-1/2 bg-white/40 rounded-t-full pointer-events-none" />
            <span className="text-5xl sm:text-6xl filter drop-shadow-[0_6px_10px_rgba(0,0,0,0.3)]">
              {displayEmoji}
            </span>
          </div>
        </div>
      );
    }
  }
};
