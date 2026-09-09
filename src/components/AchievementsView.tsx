import React from 'react';
import { Award, Star, Lock, Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';
import { AchievementBadge } from '../types';
import { soundFx, speakUzbek } from '../utils/audio';

interface AchievementsViewProps {
  badges: AchievementBadge[];
  stars: number;
  completedLessonsCount: number;
  userName: string;
  onOpenCertificate: () => void;
}

export const AchievementsView: React.FC<AchievementsViewProps> = ({
  badges,
  stars,
  completedLessonsCount,
  userName,
  onOpenCertificate,
}) => {
  const unlockedCount = badges.filter((b) => b.unlocked).length;

  const handleBadgeClick = (badge: AchievementBadge) => {
    soundFx.playClick();
    if (badge.unlocked) {
      speakUzbek(`Medal: ${badge.title}. ${badge.description}`);
    } else {
      speakUzbek(`Ushbu medalni ochish uchun yana ${badge.requiredStars - stars} ta yulduzcha to'plashingiz kerak!`);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-2 sm:px-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden my-4">
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-wider backdrop-blur-xs">
              Mening Natijalarim
            </span>
            <h2 className="text-2xl sm:text-4xl font-black mt-2 tracking-tight">
              Barakalla, {userName || 'Kichik Qahramon'}! 🌟
            </h2>
            <p className="text-white/90 text-sm sm:text-base mt-1 max-w-lg leading-relaxed">
              Siz har kuni yangi bilimlarni qunt bilan o'rganmoqdasiz. Qanchalik ko'p dars va o'yin o'ynasangiz, shuncha ko'p yulduzlar sizniki bo'ladi!
            </p>
          </div>

          {/* Large Star Badge */}
          <div className="p-4 sm:p-5 rounded-3xl bg-white/20 backdrop-blur-md border border-white/30 text-center shrink-0 min-w-[150px]">
            <div className="text-4xl animate-gentle-wiggle mb-1">⭐</div>
            <div className="text-3xl sm:text-4xl font-black">{stars}</div>
            <div className="text-xs font-bold text-white/80">To'plangan Yulduzlar</div>
          </div>
        </div>
      </div>

      {/* Stats Quick Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 my-6">
        <div className="bg-white p-5 rounded-3xl border-2 border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-2xl font-black">
            📚
          </div>
          <div>
            <div className="text-xs text-slate-500 font-bold">O'rganilgan Darslar</div>
            <div className="text-2xl font-black text-slate-900">{completedLessonsCount} ta</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border-2 border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-2xl font-black">
            🏅
          </div>
          <div>
            <div className="text-xs text-slate-500 font-bold">Ochilgan Medallar</div>
            <div className="text-2xl font-black text-slate-900">
              {unlockedCount} / {badges.length}
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border-2 border-slate-200 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl">
              📜
            </div>
            <div>
              <div className="text-xs text-slate-500 font-bold">Maxsus Diplom</div>
              <div className="text-sm font-black text-slate-900">Tayyor</div>
            </div>
          </div>
          <button
            onClick={onOpenCertificate}
            className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs transition-transform active:scale-95"
          >
            Ko'rish
          </button>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="my-6">
        <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
          <Award className="w-6 h-6 text-amber-500" />
          <span>Mening Faxriy Medallarim</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {badges.map((badge) => {
            const isUnlocked = badge.unlocked;
            return (
              <button
                key={badge.id}
                id={`badge-${badge.id}`}
                onClick={() => handleBadgeClick(badge)}
                className={`p-5 rounded-3xl border-2 text-left transition-all active:scale-95 relative flex flex-col justify-between ${
                  isUnlocked
                    ? 'bg-white border-amber-300 shadow-sm hover:border-amber-400'
                    : 'bg-slate-50/70 border-slate-200 opacity-60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-4xl">{badge.emoji}</span>
                    {isUnlocked ? (
                      <span className="p-1.5 rounded-full bg-emerald-100 text-emerald-700">
                        <CheckCircle2 className="w-4 h-4" />
                      </span>
                    ) : (
                      <span className="p-1.5 rounded-full bg-slate-200 text-slate-600">
                        <Lock className="w-4 h-4" />
                      </span>
                    )}
                  </div>

                  <h4 className="text-base font-black text-slate-900">
                    {badge.title}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {badge.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-black">
                  <span className="text-slate-400">{badge.category}</span>
                  <span className={isUnlocked ? 'text-amber-600' : 'text-slate-500'}>
                    ⭐ {badge.requiredStars} yulduz
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
