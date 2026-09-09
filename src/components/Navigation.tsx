import React from 'react';
import { SectionType } from '../types';
import { soundFx } from '../utils/audio';

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
      emoji: '🎨',
      bgActive: 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg scale-102 border-rose-400',
      bgInactive: 'bg-white/85 hover:bg-white text-slate-800 border-slate-200 shadow-xs',
    },
    {
      id: 'writing' as SectionType,
      title: 'Harf & Son',
      emoji: '✍️',
      bgActive: 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg scale-102 border-indigo-400',
      bgInactive: 'bg-white/85 hover:bg-white text-slate-800 border-slate-200 shadow-xs',
    },
    {
      id: 'games' as SectionType,
      title: "O'yinlar",
      emoji: '🎮',
      bgActive: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg scale-102 border-amber-400',
      bgInactive: 'bg-white/85 hover:bg-white text-slate-800 border-slate-200 shadow-xs',
    },
  ];

  return (
    <nav className="max-w-3xl mx-auto px-3 sm:px-4 py-2 sm:py-3">
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        {tabs.map((tab) => {
          const isActive = currentSection === tab.id || (tab.id === 'games' && currentSection === 'tests');
          return (
            <button
              key={tab.id}
              onClick={() => {
                soundFx.playClick();
                onSelectSection(tab.id);
              }}
              className={`py-2.5 sm:py-3 px-2 sm:px-4 rounded-3xl border-3 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2.5 transition-all active:scale-95 text-center cursor-pointer ${
                isActive ? tab.bgActive : tab.bgInactive
              }`}
            >
              <span className="text-2xl sm:text-3xl animate-bounce-gentle">
                {tab.emoji}
              </span>
              <span className="font-black text-xs sm:text-lg tracking-tight">
                {tab.title}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
