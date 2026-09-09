import React, { useState } from 'react';
import { X, Heart, BookOpen, Lightbulb, User, Settings2, RotateCcw, CheckCircle2 } from 'lucide-react';
import { AccessibilitySettings } from '../types';
import { soundFx } from '../utils/audio';

interface ParentGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  onUpdateUserName: (name: string) => void;
  settings: AccessibilitySettings;
  onUpdateSettings: (settings: Partial<AccessibilitySettings>) => void;
  totalStars: number;
  completedLessonsCount: number;
  onResetProgress: () => void;
}

export const ParentGuideModal: React.FC<ParentGuideModalProps> = ({
  isOpen,
  onClose,
  userName,
  onUpdateUserName,
  settings,
  onUpdateSettings,
  totalStars,
  completedLessonsCount,
  onResetProgress,
}) => {
  const [nameInput, setNameInput] = useState<string>(userName);
  const [savedNotice, setSavedNotice] = useState<boolean>(false);
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playClick();
    onUpdateUserName(nameInput.trim() || 'Kichkintoy');
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-indigo-200 relative my-8">
        {/* Close Button */}
        <button
          onClick={() => {
            soundFx.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-2xl font-black">
            👨‍👩‍👧
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Ota-onalar va Murabbiylar Bo'limi
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Maxsus ta'lim, metodik tavsiyalar va sozlamalar
            </p>
          </div>
        </div>

        {/* Body Content */}
        <div className="mt-5 space-y-6 max-h-[70vh] overflow-y-auto pr-1">
          {/* 1. Student Name Setting */}
          <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100">
            <h3 className="text-sm font-black text-indigo-950 flex items-center gap-2 mb-2">
              <User className="w-4 h-4 text-indigo-600" />
              <span>O'quvchi (bola)ning ismi</span>
            </h3>
            <form onSubmit={handleSaveName} className="flex gap-2">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Masalan: Ali, Jasur, Madina..."
                className="flex-1 px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-sm font-bold text-slate-800 focus:outline-hidden focus:border-indigo-500"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs transition-colors shrink-0"
              >
                Saqlash
              </button>
            </form>
            {savedNotice && (
              <p className="text-xs font-bold text-emerald-600 mt-2 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Ism muvaffaqiyatli saqlandi!
              </p>
            )}
          </div>

          {/* 2. Voice & Accessibility Settings */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2 mb-3">
              <Settings2 className="w-4 h-4 text-amber-500" />
              <span>Ovozli Yordamchi va Qulaylik Sozlamalari</span>
            </h3>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700">Ovoz tezligi (Nutq sur'ati):</span>
                <div className="flex items-center gap-1">
                  {[
                    { label: 'Sekin', val: 0.7 },
                    { label: 'O\'rtacha', val: 0.85 },
                    { label: 'Oddiy', val: 1.0 },
                  ].map((speed) => (
                    <button
                      key={speed.val}
                      onClick={() => onUpdateSettings({ speechRate: speed.val })}
                      className={`px-2.5 py-1 rounded-lg font-bold text-xs ${
                        settings.speechRate === speed.val
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white text-slate-700 border border-slate-300'
                      }`}
                    >
                      {speed.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700">Shrift kattaligi:</span>
                <div className="flex items-center gap-1">
                  {[
                    { label: 'Oddiy', val: 'normal' },
                    { label: 'Katta', val: 'large' },
                    { label: 'Juda Katta', val: 'extra-large' },
                  ].map((sz) => (
                    <button
                      key={sz.val}
                      onClick={() => onUpdateSettings({ fontSize: sz.val as any })}
                      className={`px-2.5 py-1 rounded-lg font-bold text-xs ${
                        settings.fontSize === sz.val
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white text-slate-700 border border-slate-300'
                      }`}
                    >
                      {sz.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 3. Methodological Advice (Tavsiyalar) */}
          <div>
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2 mb-3">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              <span>Aqliy Rivojlanishda Defektologik Tavsiyalar</span>
            </h3>

            <div className="space-y-2.5">
              <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200">
                <h4 className="font-black text-amber-950 text-xs sm:text-sm">
                  1. Doimiy ijobiy rag'batlantirish va mehr
                </h4>
                <p className="text-xs text-amber-900/80 mt-1 leading-relaxed">
                  Bola xato qilgan taqdirda ham hech qachon "yomon", "noto'g'ri" demang. Faqatgina "Yana bir bor urinib ko'ramiz, sen albatta uddalaysan!" deb dalda bering.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                <h4 className="font-black text-emerald-950 text-xs sm:text-sm">
                  2. Qisqa vaqt oralig'ida mashg'ulot (10-15 daqiqa)
                </h4>
                <p className="text-xs text-emerald-900/80 mt-1 leading-relaxed">
                  Aqliy rivojlanishida kechikish bo'lgan bolalar tez toliqadi. Kuniga 2-3 marta 10-15 daqiqadan shug'ullanish, 1 soatlik uzluksiz darsdan ancha samaraliroq.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-blue-50/70 border border-blue-200">
                <h4 className="font-black text-blue-950 text-xs sm:text-sm">
                  3. Darslarni kundalik hayot bilan bog'lang
                </h4>
                <p className="text-xs text-blue-900/80 mt-1 leading-relaxed">
                  Masalan, platformada "Qizil olma" mavzusini o'rganganingizdan so'ng, oshxonadan haqiqiy olmani olib, qo'liga bering, hidlatib ko'ring va rangini takrorlang.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-purple-50/70 border border-purple-200">
                <h4 className="font-black text-purple-950 text-xs sm:text-sm">
                  4. Sensor va eshitish yordami
                </h4>
                <p className="text-xs text-purple-900/80 mt-1 leading-relaxed">
                  Har bir dars va savolda "Ovozli tinglash" tugmasi mavjud. Bolaning so'zlarni eshitishi va talaffuzini eslab qolishi uchun tugmalardan faol foydalaning.
                </p>
              </div>
            </div>
          </div>

          {/* 4. Reset & Data Management */}
          <div className="pt-4 border-t border-slate-200">
            {!showResetConfirm ? (
              <button
                onClick={() => setShowResetConfirm(true)}
                className="text-xs font-bold text-slate-500 hover:text-rose-600 flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Natijalar va yulduzchalarni yangidan boshlash</span>
              </button>
            ) : (
              <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200">
                <p className="text-xs font-bold text-rose-800">
                  Haqiqatan ham barcha natijalarni tozalab, yangidan boshlamoqchimisiz?
                </p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => {
                      onResetProgress();
                      setShowResetConfirm(false);
                      onClose();
                    }}
                    className="px-3 py-1.5 rounded-xl bg-rose-600 text-white font-bold text-xs"
                  >
                    Ha, tozalansin
                  </button>
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className="px-3 py-1.5 rounded-xl bg-slate-200 text-slate-700 font-bold text-xs"
                  >
                    Bekor qilish
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm"
          >
            Tushundim, Rahmat
          </button>
        </div>
      </div>
    </div>
  );
};
