import React from 'react';
import { CheckCircle2, Lock, ArrowRight, X, Sparkles, Trophy } from 'lucide-react';
import { soundFx, speakUzbek } from '../utils/audio';
import { DailyTasksState, getDailyTasksProgress, DailyTaskId } from '../utils/dailyTasks';
import { SectionType } from '../types';

interface DailyTasksModalProps {
  isOpen: boolean;
  onClose: () => void;
  tasksState: DailyTasksState;
  onNavigateSection: (section: SectionType) => void;
  onOpenCertificate: () => void;
  userName: string;
}

export const DailyTasksModal: React.FC<DailyTasksModalProps> = ({
  isOpen,
  onClose,
  tasksState,
  onNavigateSection,
  onOpenCertificate,
  userName,
}) => {
  if (!isOpen) return null;

  const progress = getDailyTasksProgress(tasksState);

  const handleActionClick = (section: 'lessons' | 'writing' | 'games') => {
    soundFx.playClick();
    onClose();
    onNavigateSection(section);
  };

  const handleOpenDiploma = () => {
    soundFx.playSuccess();
    onClose();
    onOpenCertificate();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white w-full max-w-lg rounded-3xl p-5 sm:p-7 shadow-2xl border-4 border-amber-300 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => {
            soundFx.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-5">
          <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 to-orange-400 border-2 border-white shadow-md flex items-center justify-center text-3xl mb-3">
            {progress.isAllCompleted ? '🏆' : '📋'}
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            {progress.isAllCompleted
              ? "Barakalla, Bolajon! 🏆"
              : 'Bugungi Kunlik Vazifalar 📋'}
          </h2>
          <p className="text-xs sm:text-sm font-bold text-slate-500 mt-1 max-w-sm mx-auto">
            {progress.isAllCompleted
              ? `Ajoyib! Bugungi barcha vazifalarni a'lo darajada bajardingiz! Endi faxriy diplomni olishingiz mumkin!`
              : `Diplomni qo'lga kiritish uchun bugungi barcha vazifalarni bajaring!`}
          </p>
        </div>

        {/* Progress Bar Banner */}
        <div className="p-3.5 bg-amber-50 rounded-2xl border-2 border-amber-200 mb-5">
          <div className="flex items-center justify-between text-xs sm:text-sm font-black text-amber-900 mb-1.5">
            <span>Bugungi natija:</span>
            <span>
              {progress.completedCount} / {progress.totalCount} ({progress.percent}%)
            </span>
          </div>
          <div className="w-full h-4 bg-amber-200/70 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${progress.percent}%` }}
            />
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-2.5 mb-5">
          {progress.items.map((task) => {
            const isDone = task.current >= task.target;
            return (
              <div
                key={task.id}
                className={`p-3 rounded-2xl border-2 flex items-center justify-between gap-3 transition-all ${
                  isDone
                    ? 'bg-emerald-50/70 border-emerald-300'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-2xl shrink-0">{task.emoji}</span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs sm:text-sm font-black text-slate-900 truncate">
                        {task.title}
                      </h4>
                      {isDone && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] sm:text-xs font-bold text-slate-500">
                      {isDone ? (
                        <span className="text-emerald-700 font-black">
                          Bajarildi! ({task.target} {task.unit})
                        </span>
                      ) : (
                        <span>
                          {task.current} / {task.target} {task.unit}
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                {isDone ? (
                  <span className="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-800 font-black text-xs shrink-0">
                    Tayyor ✅
                  </span>
                ) : (
                  <button
                    onClick={() => handleActionClick(task.section)}
                    className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs flex items-center gap-1 shrink-0 transition-transform active:scale-95 cursor-pointer shadow-xs"
                  >
                    <span>Bajarish</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Call to Action / Status Banner */}
        {progress.isAllCompleted ? (
          <div className="text-center">
            <button
              onClick={handleOpenDiploma}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-black text-base sm:text-lg flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 cursor-pointer animate-bounce-gentle"
            >
              <Trophy className="w-6 h-6" />
              <span>Diplomni Ochish 📜</span>
            </button>
            <p className="text-xs font-bold text-amber-700 mt-2">
              Siz bugungi faxriy diplomga to'liq loyiqsiz!
            </p>
          </div>
        ) : (
          <div className="p-3.5 rounded-2xl bg-slate-100 border border-slate-200 flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-600 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs sm:text-sm font-black text-slate-800">
                Diplom hali qulflangan 🔒
              </h5>
              <p className="text-[11px] sm:text-xs font-bold text-slate-500">
                Diplomni olish uchun qolgan {progress.totalCount - progress.completedCount} ta vazifani yakunlang!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
