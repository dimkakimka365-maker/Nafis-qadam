import React, { useState } from 'react';
import { Sparkles, X, User, Calendar, Heart, Check, Smile } from 'lucide-react';
import { UserProfile, getAgeGroup } from '../types';
import { soundFx, speakUzbek } from '../utils/audio';
import confetti from 'canvas-confetti';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose?: () => void;
  currentProfile: UserProfile | null;
  onSave: (profile: UserProfile) => void;
  isInitialSetup?: boolean;
}

const AVATARS = [
  { emoji: '🐰', label: 'Quyoncha' },
  { emoji: '🦁', label: 'Shercha' },
  { emoji: '🐻', label: 'Ayiqcha' },
  { emoji: '🐼', label: 'Panda' },
  { emoji: '🦊', label: 'Tulkicha' },
  { emoji: '🐶', label: 'Kuchukcha' },
  { emoji: '🚀', label: 'Raketa' },
  { emoji: '🦄', label: 'Sehrli ot' },
];

const PRESET_BIOS = [
  "🧸 Hali o'qishni bilmaydi (faqat shakllar va rasmlar)",
  "🔢 Sanash va raqamlarni o'rganmoqda",
  "🧠 Xotira va diqqatni mustahkamlash kerak",
  "🎨 Ranglar va shakllarni yaxshi ko'radi",
  "🌈 O'ziga xos rivojlanish / Maxsus yondashuv",
];

const AGE_OPTIONS = [3, 4, 5, 6, 7, 8, 9, 10];

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  currentProfile,
  onSave,
  isInitialSetup = false,
}) => {
  const [firstName, setFirstName] = useState<string>(currentProfile?.firstName || '');
  const [lastName, setLastName] = useState<string>(currentProfile?.lastName || '');
  const [age, setAge] = useState<number>(currentProfile?.age || 5);
  const [bio, setBio] = useState<string>(currentProfile?.bio || PRESET_BIOS[0]);
  const [avatar, setAvatar] = useState<string>(currentProfile?.avatar || '🐰');
  const [errorMsg, setErrorMsg] = useState<string>('');

  if (!isOpen) return null;

  const ageGroup = getAgeGroup(age);

  const handleSelectBioPreset = (preset: string) => {
    soundFx.playClick();
    setBio(preset);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim()) {
      setErrorMsg("Iltimos, bolajonning ismini kiriting!");
      soundFx.playGentleRetry();
      return;
    }

    const newProfile: UserProfile = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      age: Number(age),
      bio: bio.trim() || "Aqliy rivojlanish mashqlari",
      avatar,
      createdAt: currentProfile?.createdAt || new Date().toISOString(),
    };

    soundFx.playSuccess();
    confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
    speakUzbek(`Salom, ${newProfile.firstName}! Sening yoshing uchun maxsus aqliy testlar tayyorlandi!`);
    onSave(newProfile);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in overflow-y-auto">
      <div className="bg-white w-full max-w-xl rounded-3xl p-5 sm:p-7 shadow-2xl border-4 border-amber-300 relative my-4">
        {/* Close Button (if not strictly initial mandatory setup) */}
        {!isInitialSetup && onClose && (
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="absolute top-4 right-4 p-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Header */}
        <div className="text-center mb-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 to-rose-400 border-3 border-white shadow-lg flex items-center justify-center text-3xl sm:text-4xl mb-3 animate-bounce-gentle">
            {avatar}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {isInitialSetup ? "Xush kelibsiz! 👋" : "Bolajon profili 📝"}
          </h2>
          <p className="text-xs sm:text-sm font-bold text-slate-600 mt-1">
            Yoshi va qiziqishiga qarab aqliy testlar maxsus moslashtiriladi
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {/* First & Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-black uppercase text-slate-600 mb-1 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-amber-500" />
                <span>Ismi *</span>
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder="Masalan: Ali"
                className="w-full px-4 py-2.5 rounded-2xl border-2 border-slate-200 focus:border-amber-500 focus:outline-hidden font-bold text-slate-800 text-sm bg-slate-50 focus:bg-white"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-black uppercase text-slate-600 mb-1 flex items-center gap-1">
                <Smile className="w-3.5 h-3.5 text-amber-500" />
                <span>Familiyasi</span>
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Masalan: Valiyev"
                className="w-full px-4 py-2.5 rounded-2xl border-2 border-slate-200 focus:border-amber-500 focus:outline-hidden font-bold text-slate-800 text-sm bg-slate-50 focus:bg-white"
              />
            </div>
          </div>

          {/* Age Selection */}
          <div>
            <label className="block text-xs font-black uppercase text-slate-600 mb-1 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-amber-500" />
              <span>Yoshi ({age} yosh)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {AGE_OPTIONS.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    setAge(a);
                  }}
                  className={`px-3 sm:px-4 py-2 rounded-2xl font-black text-xs sm:text-sm border-2 transition-all active:scale-95 ${
                    age === a
                      ? 'bg-amber-500 text-white border-amber-600 shadow-md scale-105'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
                  }`}
                >
                  {a} yosh
                </button>
              ))}
            </div>

            {/* Age Group Indicator */}
            <div className="mt-2 p-2.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs font-bold text-amber-900 flex items-center gap-2">
              <span className="text-lg">
                {ageGroup === 'junior' ? '🧸' : ageGroup === 'middle' ? '🎨' : '🚀'}
              </span>
              <span>
                {ageGroup === 'junior' && "3-4 yosh: Sodda shakllar, ranglar, ovozli va vizual oson testlar"}
                {ageGroup === 'middle' && "5-6 yosh: Sanash, fazoviy naqshlar, xotira va mantiqiy ketma-ketliklar"}
                {ageGroup === 'senior' && "7+ yosh: Murakkab naqshli matritsalar, xotira va fikrlash testlari"}
              </span>
            </div>
          </div>

          {/* About / Bio / Special Info */}
          <div>
            <label className="block text-xs font-black uppercase text-slate-600 mb-1 flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              <span>Bolajon haqida qisqacha ma'lumot</span>
            </label>

            {/* Fast selection chips */}
            <div className="flex flex-wrap gap-1.5 mb-2">
              {PRESET_BIOS.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectBioPreset(preset)}
                  className={`text-left text-xs px-2.5 py-1.5 rounded-xl border transition-all ${
                    bio === preset
                      ? 'bg-rose-100 text-rose-800 border-rose-300 font-black'
                      : 'bg-slate-50 text-slate-600 border-slate-200 font-medium hover:bg-slate-100'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>

            <textarea
              rows={2}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Qo'shimcha ma'lumot (qiziqishlari, o'ziga xos xususiyatlari...)"
              className="w-full px-3 py-2 rounded-2xl border-2 border-slate-200 focus:border-amber-500 focus:outline-hidden text-xs sm:text-sm font-medium text-slate-800 bg-slate-50 focus:bg-white resize-none"
            />
          </div>

          {/* Avatar Selection */}
          <div>
            <label className="block text-xs font-black uppercase text-slate-600 mb-1.5">
              Sevimli qahramon / avatar
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {AVATARS.map((av) => (
                <button
                  key={av.emoji}
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    setAvatar(av.emoji);
                  }}
                  className={`aspect-square rounded-2xl text-2xl sm:text-3xl flex items-center justify-center border-2 transition-all active:scale-90 ${
                    avatar === av.emoji
                      ? 'bg-amber-100 border-amber-500 shadow-sm scale-110 ring-2 ring-amber-300'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                  }`}
                  title={av.label}
                >
                  {av.emoji}
                </button>
              ))}
            </div>
          </div>

          {errorMsg && (
            <p className="text-xs font-black text-rose-600 text-center animate-pulse">
              {errorMsg}
            </p>
          )}

          {/* Action Button */}
          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-black text-base shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 transition-transform active:scale-95"
          >
            <Sparkles className="w-5 h-5 text-yellow-200" />
            <span>Testlarni Boshlash & Moslashtirish</span>
          </button>
        </form>
      </div>
    </div>
  );
};
