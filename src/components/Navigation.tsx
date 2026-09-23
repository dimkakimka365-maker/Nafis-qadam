import React from 'react';
import { SectionType } from '../types';
import { soundFx, speakUzbek } from '../utils/audio';

interface NavigationProps {
  currentSection: SectionType;
  onSelectSection: (section: SectionType) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentSection,
  onSelectSection,
}) => {
  const tabs = [
    {
      id: 'lessons' as SectionType,
      title: 'Rasmlar',
      subtitle: "Bo'yash & Chizish",
      emoji: '🎨',
      voicePrompt: "Rasmlar va bo'yash bo'limi!",
      activeStyle:
        'bg-gradient-to-b from-rose-400 via-pink-500 to-rose-600 border-2 border-rose-300 border-b-[6px] border-b-rose-700 shadow-[0_6px_0_#9f1239,0_10px_20px_rgba(225,29,72,0.35)] text-white',
      inactiveStyle:
        'bg-gradient-to-b from-white to-slate-100 hover:from-rose-50/50 hover:to-white border-2 border-slate-200/90 border-b-[5px] border-b-slate-300 shadow-[0_4px_0_#cbd5e1] text-slate-800 hover:border-rose-300',
    },
    {
      id: 'writing' as SectionType,
      title: 'Harf & Son',
      subtitle: "Yozuv & Bo'g'in",
      emoji: '✍️',
      voicePrompt: "Harflar, sonlar va bo'g'inlab o'qish!",
      activeStyle:
        'bg-gradient-to-b from-indigo-400 via-purple-500 to-violet-600 border-2 border-indigo-300 border-b-[6px] border-b-indigo-800 shadow-[0_6px_0_#3730a3,0_10px_20px_rgba(79,70,229,0.35)] text-white',
      inactiveStyle:
        'bg-gradient-to-b from-white to-slate-100 hover:from-indigo-50/50 hover:to-white border-2 border-slate-200/90 border-b-[5px] border-b-slate-300 shadow-[0_4px_0_#cbd5e1] text-slate-800 hover:border-indigo-300',
    },
    {
      id: 'games' as SectionType,
      title: "O'yinlar",
      subtitle: 'Viktorina & Pazl',
      emoji: '🎮',
      voicePrompt: "Qiziqarli o'yinlar va viktorinalar!",
      activeStyle:
        'bg-gradient-to-b from-amber-400 via-orange-500 to-amber-600 border-2 border-amber-300 border-b-[6px] border-b-amber-800 shadow-[0_6px_0_#9a3412,0_10px_20px_rgba(249,115,22,0.35)] text-white',
      inactiveStyle:
        'bg-gradient-to-b from-white to-slate-100 hover:from-amber-50/50 hover:to-white border-2 border-slate-200/90 border-b-[5px] border-b-slate-300 shadow-[0_4px_0_#cbd5e1] text-slate-800 hover:border-amber-300',
    },
  ];

  const handleTabClick = (tab: (typeof tabs)[0]) => {
    soundFx.playClick();
    onSelectSection(tab.id);
    speakUzbek(tab.voicePrompt);
  };

  return (
    <nav className="max-w-3xl mx-auto px-3 sm:px-4 py-2 sm:py-3.5">
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        {tabs.map((tab) => {
          const isActive =
            currentSection === tab.id ||
            (tab.id === 'games' && currentSection === 'tests');

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab)}
              className={`relative overflow-hidden py-2 sm:py-3 px-2 sm:px-4 rounded-3xl flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-3 text-center cursor-pointer transition-transform active:translate-y-1 active:border-b-2 active:shadow-none select-none ${
                isActive ? tab.activeStyle : tab.inactiveStyle
              }`}
            >
              {/* Top Gloss Highlight Effect for 3D look */}
              <div className="absolute inset-x-0 top-0 h-1/2 bg-white/20 rounded-t-3xl pointer-events-none" />

              {/* 3D Embossed Icon Container */}
              <div
                className={`w-9 h-9 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center text-xl sm:text-2xl shadow-xs transition-transform ${
                  isActive
                    ? 'bg-white/25 border border-white/40 scale-105 animate-bounce-gentle'
                    : 'bg-slate-100/80 border border-slate-200'
                }`}
              >
                {tab.emoji}
              </div>

              {/* Title & Subtitle */}
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left leading-tight">
                <span className="font-black text-xs sm:text-lg tracking-tight drop-shadow-xs">
                  {tab.title}
                </span>
                <span
                  className={`hidden sm:inline-block text-[11px] font-bold ${
                    isActive ? 'text-white/90' : 'text-slate-500'
                  }`}
                >
                  {tab.subtitle}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
