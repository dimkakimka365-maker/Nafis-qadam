import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  X,
  User,
  Calendar,
  Heart,
  Check,
  Smile,
  Camera,
  Upload,
  Trash2,
  Volume2,
  Plus,
  CheckCircle2,
  Users,
} from 'lucide-react';
import { UserProfile, getAgeGroup } from '../types';
import { soundFx } from '../utils/audio';
import confetti from 'canvas-confetti';
import { AnimalCharacterGraphic } from './common/AnimalCharacterGraphic';
import { processGalleryImage } from '../utils/imageUtils';
import { playProfileWelcomeVoice, playAchievementVoice } from '../utils/encouragementAudio';
import {
  getAllProfiles,
  saveProfile,
  switchActiveProfile,
  deleteProfile,
} from '../utils/profileStorage';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose?: () => void;
  currentProfile: UserProfile | null;
  onSave: (profile: UserProfile) => void;
  onSwitchProfile?: (profile: UserProfile) => void;
  isInitialSetup?: boolean;
}

const AVATARS = [
  { emoji: '🐰', id: 'quyoncha', label: 'Quyoncha' },
  { emoji: '🦁', id: 'shercha', label: 'Shercha' },
  { emoji: '🐻', id: 'ayiqcha', label: 'Ayiqcha' },
  { emoji: '🐼', id: 'panda', label: 'Pandacha' },
  { emoji: '🦊', id: 'tulkicha', label: 'Tulkicha' },
  { emoji: '🐶', id: 'kuchukcha', label: 'Kuchukcha' },
  { emoji: '🐱', id: 'mushukcha', label: 'Mushukcha' },
  { emoji: '🐘', id: 'filvoy', label: 'Filvoy' },
  { emoji: '👦', id: 'bolakay', label: 'Bolakay' },
  { emoji: '👧', id: 'qizaloq', label: 'Qizaloq' },
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
  onSwitchProfile,
  isInitialSetup = false,
}) => {
  const [profilesList, setProfilesList] = useState<UserProfile[]>([]);
  const [activeTab, setActiveTab] = useState<'profiles' | 'form'>(
    isInitialSetup ? 'form' : 'profiles'
  );
  const [editingProfileId, setEditingProfileId] = useState<string | null>(null);

  const [firstName, setFirstName] = useState<string>(currentProfile?.firstName || '');
  const [lastName, setLastName] = useState<string>(currentProfile?.lastName || '');
  const [age, setAge] = useState<number>(currentProfile?.age || 5);
  const [bio, setBio] = useState<string>(currentProfile?.bio || PRESET_BIOS[0]);
  const [avatar, setAvatar] = useState<string>(currentProfile?.avatar || '🐰');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isProcessingImg, setIsProcessingImg] = useState<boolean>(false);
  const [isPlayingVoice, setIsPlayingVoice] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isCustomPhoto =
    avatar.startsWith('data:') ||
    avatar.startsWith('blob:') ||
    avatar.startsWith('http://') ||
    avatar.startsWith('https://');

  // Load profiles list on open
  useEffect(() => {
    if (isOpen) {
      const all = getAllProfiles();
      setProfilesList(all);
      if (all.length > 0 && !isInitialSetup) {
        setActiveTab('profiles');
      } else {
        setActiveTab('form');
      }

      if (currentProfile) {
        setFirstName(currentProfile.firstName || '');
        setLastName(currentProfile.lastName || '');
        setAge(currentProfile.age || 5);
        setBio(currentProfile.bio || PRESET_BIOS[0]);
        setAvatar(currentProfile.avatar || '🐰');
        setEditingProfileId(currentProfile.id || null);
      } else {
        setFirstName('');
        setLastName('');
        setAge(5);
        setBio(PRESET_BIOS[0]);
        setAvatar('🐰');
        setEditingProfileId(null);
      }
      setErrorMsg('');
    }
  }, [isOpen, currentProfile, isInitialSetup]);

  if (!isOpen) return null;

  const ageGroup = getAgeGroup(age);

  const handleProcessFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMsg("Faqat rasm fayllarini yuklash mumkin (JPG, PNG, WEBP va h.k.)");
      soundFx.playGentleRetry();
      return;
    }
    setErrorMsg('');
    setIsProcessingImg(true);
    try {
      const compressed = await processGalleryImage(file);
      setAvatar(compressed);
      soundFx.playSuccess();
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      await playAchievementVoice('general', firstName || 'Bolajon');
    } catch (err: any) {
      setErrorMsg(err?.message || "Rasmni yuklashda xatolik bo'ldi");
      soundFx.playGentleRetry();
    } finally {
      setIsProcessingImg(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleProcessFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleProcessFile(file);
  };

  const handleSelectBioPreset = (preset: string) => {
    soundFx.playClick();
    setBio(preset);
  };

  // Har bir profilga kirilganda aytiladigan ovozli qutlov
  const handleEnterProfile = async (profile: UserProfile) => {
    soundFx.playClick();
    const switched = switchActiveProfile(profile.id || '');
    const active = switched || profile;

    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    if (onSwitchProfile) {
      onSwitchProfile(active);
    } else {
      onSave(active);
    }

    // Bolajonning ismini aytib, rag'batlantiruvchi ovozli xabar
    await playProfileWelcomeVoice(active.firstName);
    if (onClose) onClose();
  };

  const handleStartAddNewKid = () => {
    soundFx.playClick();
    setFirstName('');
    setLastName('');
    setAge(5);
    setBio(PRESET_BIOS[0]);
    setAvatar('🐰');
    setEditingProfileId(null);
    setActiveTab('form');
  };

  const handleStartEditProfile = (p: UserProfile) => {
    soundFx.playClick();
    setFirstName(p.firstName || '');
    setLastName(p.lastName || '');
    setAge(p.age || 5);
    setBio(p.bio || PRESET_BIOS[0]);
    setAvatar(p.avatar || '🐰');
    setEditingProfileId(p.id || null);
    setActiveTab('form');
  };

  const handleDeleteProfile = (e: React.MouseEvent, pId?: string) => {
    e.stopPropagation();
    if (!pId) return;
    soundFx.playClick();
    const { remainingProfiles, newActive } = deleteProfile(pId);
    setProfilesList(remainingProfiles);
    if (newActive) {
      onSave(newActive);
    }
  };

  const handleListenEncouragement = async (nameToUse?: string) => {
    const targetName = (nameToUse || firstName || currentProfile?.firstName || 'Bolajon').trim();
    setIsPlayingVoice(true);
    await playProfileWelcomeVoice(targetName);
    setIsPlayingVoice(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim()) {
      setErrorMsg("Iltimos, bolajonning ismini kiriting!");
      soundFx.playGentleRetry();
      return;
    }

    const newProfile: UserProfile = {
      id: editingProfileId || 'kid-' + Date.now(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      age: Number(age),
      bio: bio.trim() || "Aqliy rivojlanish mashqlari",
      avatar,
      createdAt: currentProfile?.createdAt || new Date().toISOString(),
    };

    const { activeProfile, allProfiles } = saveProfile(newProfile);
    setProfilesList(allProfiles);

    soundFx.playSuccess();
    confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });

    // Profilga kirilganda rag'batlantiruvchi ovoz
    await playProfileWelcomeVoice(newProfile.firstName);

    onSave(activeProfile);
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in overflow-y-auto select-none">
      <div className="bg-white w-full max-w-xl rounded-3xl p-5 sm:p-7 shadow-2xl border-4 border-amber-300 relative my-4 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        {!isInitialSetup && onClose && (
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="absolute top-4 right-4 p-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Modal Top Tabs (If multiple profiles exist or when switching) */}
        {!isInitialSetup && profilesList.length > 0 && (
          <div className="flex items-center justify-center gap-2 mb-4">
            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                setActiveTab('profiles');
              }}
              className={`px-4 py-2 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'profiles'
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Bolajonlarim ({profilesList.length})</span>
            </button>
            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                if (activeTab !== 'form') {
                  handleStartAddNewKid();
                }
              }}
              className={`px-4 py-2 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'form' && !editingProfileId
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>Yangi profil qo'shish</span>
            </button>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 1: BOLAJONLAR PROFILLARI RO'YXATI (PROFILGA KIRISH) */}
        {/* ======================================================== */}
        {activeTab === 'profiles' && !isInitialSetup && (
          <div className="space-y-4">
            <div className="text-center">
              <span className="text-3xl">🌟</span>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
                Bolajon profiliga kirish
              </h2>
              <p className="text-xs sm:text-sm font-bold text-slate-600 mt-0.5">
                Profilni tanlang — bolajon ismini aytib, quvnoq ovozli xabar bilan kutib oladi!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              {profilesList.map((p) => {
                const isActive = currentProfile?.id === p.id || (!currentProfile?.id && currentProfile?.firstName === p.firstName);
                return (
                  <div
                    key={p.id || p.firstName}
                    onClick={() => handleEnterProfile(p)}
                    className={`relative p-3.5 rounded-2xl border-3 text-left cursor-pointer transition-all active:scale-98 flex items-center gap-3 ${
                      isActive
                        ? 'border-amber-500 bg-amber-50 shadow-md ring-3 ring-amber-300'
                        : 'border-slate-200 bg-white hover:border-amber-300 hover:bg-amber-50/40'
                    }`}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-400 to-rose-400 border-2 border-white shadow-sm flex items-center justify-center shrink-0 overflow-hidden">
                      <AnimalCharacterGraphic
                        idOrEmoji={p.avatar}
                        className="w-full h-full"
                        showBackgroundDisc={false}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-black text-slate-900 text-sm sm:text-base truncate">
                          {p.firstName} {p.lastName || ''}
                        </h4>
                        {isActive && (
                          <span className="shrink-0 px-1.5 py-0.5 rounded-full bg-emerald-500 text-white text-[9px] font-black">
                            Faol
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-bold text-amber-800 mt-0.5">
                        {p.age} yosh • {getAgeGroup(p.age) === 'junior' ? '3-4 yosh' : getAgeGroup(p.age) === 'middle' ? '5-6 yosh' : '7+ yosh'}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEnterProfile(p);
                          }}
                          className="px-2.5 py-1 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs flex items-center gap-1 shadow-xs active:scale-95 cursor-pointer"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Kirish</span>
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStartEditProfile(p);
                          }}
                          className="px-2 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                        >
                          Tahrirlash
                        </button>
                        {profilesList.length > 1 && (
                          <button
                            type="button"
                            onClick={(e) => handleDeleteProfile(e, p.id)}
                            className="p-1 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs cursor-pointer ml-auto"
                            title="Profilni o'chirish"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Add Another Child button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleStartAddNewKid}
                className="w-full py-3 rounded-2xl border-2 border-dashed border-amber-400 bg-amber-50/60 hover:bg-amber-100/80 text-amber-900 font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer"
              >
                <Plus className="w-4 h-4 text-amber-600" />
                <span>Boshqa bolajon uchun yangi profil ochish</span>
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: PROFIL QO'SHISH YOKI TAHRIRLASH FORMASI           */}
        {/* ======================================================== */}
        {(activeTab === 'form' || isInitialSetup) && (
          <div>
            {/* Header */}
            <div className="text-center mb-4">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 via-orange-400 to-rose-400 border-4 border-white shadow-xl flex items-center justify-center p-1 mb-2 overflow-hidden cursor-pointer group"
                title="Galereyadan rasm tanlash yoki almashtirish"
              >
                <AnimalCharacterGraphic
                  idOrEmoji={avatar}
                  className="w-full h-full"
                  showBackgroundDisc={false}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-opacity">
                  <Camera className="w-5 h-5 mb-0.5" />
                  <span className="text-[10px] font-black">Rasm qo'yish</span>
                </div>
                <div className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-amber-500 border-2 border-white text-white flex items-center justify-center shadow-xs">
                  <Camera className="w-3 h-3" />
                </div>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {isInitialSetup
                  ? "Xush kelibsiz! 👋"
                  : editingProfileId
                  ? "Profilni Tahrirlash ✏️"
                  : "Yangi Bolajon Qo'shish 👶"}
              </h2>
              <p className="text-xs sm:text-sm font-bold text-slate-600 mt-1">
                Bolajon ismi har bir kirilganda va yutuqqa erishilganda mehr bilan aytiladi!
              </p>

              {/* Instant Audio Encouragement Preview Button */}
              {firstName.trim() && (
                <div className="mt-2.5">
                  <button
                    type="button"
                    onClick={() => handleListenEncouragement()}
                    disabled={isPlayingVoice}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-100 hover:bg-amber-200 border border-amber-300 text-amber-900 font-black text-xs shadow-xs active:scale-95 transition-all cursor-pointer"
                    title="Bolajon ismini ovozda eshitib ko'ring"
                  >
                    <Volume2 className={`w-3.5 h-3.5 text-amber-700 ${isPlayingVoice ? 'animate-bounce' : ''}`} />
                    <span>"{firstName}" uchun ovozli xabarni tinglash</span>
                  </button>
                </div>
              )}
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
                      className={`px-3 sm:px-4 py-2 rounded-2xl font-black text-xs sm:text-sm border-2 transition-all active:scale-95 cursor-pointer ${
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

                <div className="flex flex-wrap gap-1.5 mb-2">
                  {PRESET_BIOS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectBioPreset(preset)}
                      className={`text-left text-xs px-2.5 py-1.5 rounded-xl border transition-all cursor-pointer ${
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

              {/* Profile Picture / Avatar Selection */}
              <div className="p-4 rounded-3xl bg-amber-50/80 border-2 border-amber-200">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-black uppercase text-slate-800 flex items-center gap-1.5">
                    <Camera className="w-4 h-4 text-amber-600" />
                    <span>Profil rasmi (Galereyadan yoki qahramon)</span>
                  </label>
                  {isCustomPhoto && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black border border-emerald-300">
                      Galereyadagi rasm tanlangan ✨
                    </span>
                  )}
                </div>

                {/* Hidden native file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileInputChange}
                />

                {/* Interactive Drag & Drop / Click to Upload Box */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all ${
                    isDragging
                      ? 'border-amber-500 bg-amber-100 scale-[1.01]'
                      : 'border-amber-300 bg-white hover:border-amber-500 hover:bg-amber-50/50'
                  }`}
                >
                  {isProcessingImg ? (
                    <div className="py-4 flex flex-col items-center justify-center gap-2">
                      <div className="w-8 h-8 border-3 border-amber-500 border-t-transparent rounded-full animate-spin" />
                      <p className="text-xs font-black text-amber-800">
                        Rasm qayta ishlanmoqda...
                      </p>
                    </div>
                  ) : isCustomPhoto ? (
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-white shadow-md shrink-0">
                        <img
                          src={avatar}
                          alt="Yuklangan profil rasmi"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="text-center sm:text-left">
                        <p className="text-xs font-black text-slate-900">
                          Sizning galereyangizdagi shaxsiy rasm tanlandi!
                        </p>
                        <p className="text-[11px] font-bold text-slate-500 mt-0.5">
                          Rasmni almashtirish uchun bosing yoki boshqasini tashlang
                        </p>
                        <div className="flex items-center gap-2 mt-2 justify-center sm:justify-start">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              fileInputRef.current?.click();
                            }}
                            className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs flex items-center gap-1 shadow-xs active:scale-95 cursor-pointer"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>Rasmni almashtirish</span>
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              soundFx.playClick();
                              setAvatar('🐰');
                            }}
                            className="px-3 py-1.5 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-700 font-black text-xs flex items-center gap-1 border border-rose-200 active:scale-95 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>O'chirish</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-2">
                      <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-2 shadow-inner">
                        <Camera className="w-6 h-6" />
                      </div>
                      <p className="text-xs sm:text-sm font-black text-slate-900">
                        Galereyadan shaxsiy rasm tanlash / yuklash
                      </p>
                      <p className="text-[11px] font-bold text-slate-500 mt-1">
                        Rasmni bu yerga tashlang yoki telefon/kompyuter galereyasidan tanlang
                      </p>
                      <span className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-amber-500 text-white text-xs font-black shadow-xs">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Galereyani ochish</span>
                      </span>
                    </div>
                  )}
                </div>

                {/* Cartoon Mascot Option */}
                <div className="mt-3 pt-3 border-t border-amber-200/60">
                  <p className="text-[11px] font-black uppercase text-slate-600 mb-2">
                    Yoki sevimli qahramonni tanlang:
                  </p>
                  <div className="grid grid-cols-5 sm:grid-cols-5 gap-2">
                    {AVATARS.map((av) => (
                      <button
                        key={av.emoji}
                        type="button"
                        onClick={() => {
                          soundFx.playClick();
                          setAvatar(av.emoji);
                        }}
                        className={`p-1.5 rounded-2xl flex flex-col items-center justify-center border-2 transition-all cursor-pointer active:scale-95 ${
                          avatar === av.emoji
                            ? 'bg-amber-200/90 border-amber-500 shadow-md scale-105 ring-3 ring-amber-400'
                            : 'bg-white border-slate-200 hover:bg-amber-50/50 hover:border-amber-300'
                        }`}
                        title={av.label}
                      >
                        <AnimalCharacterGraphic
                          idOrEmoji={av.emoji}
                          className="w-10 h-10 sm:w-12 sm:h-12"
                          showBackgroundDisc={true}
                        />
                        <span className="text-[9px] sm:text-[10px] font-black text-slate-700 mt-1 truncate max-w-full text-center">
                          {av.label}
                        </span>
                      </button>
                    ))}
                  </div>
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
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-black text-base shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-yellow-200" />
                <span>
                  {isInitialSetup
                    ? "Testlarni Boshlash & Ovozli Kutib Olish"
                    : "Profilga Kirish & Ovozli Qutlov"}
                </span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
