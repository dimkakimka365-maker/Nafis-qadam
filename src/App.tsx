/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SectionType, UserProfile } from './types';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { LessonViewer } from './components/LessonViewer';
import { GamesHub } from './components/GamesHub';
import { LetterNumberWritingView } from './components/writing/LetterNumberWritingView';
import { CertificateModal } from './components/CertificateModal';
import { UserProfileModal } from './components/UserProfileModal';
import { DailyTasksModal } from './components/DailyTasksModal';
import { GiftRewardModal } from './components/GiftRewardModal';
import { GiftChestModal } from './components/GiftChestModal';
import {
  DailyTasksState,
  DailyTaskId,
  getDailyTasksState,
  incrementDailyTask,
  getDailyTasksProgress,
} from './utils/dailyTasks';
import { GiftItem, AwardResult, awardKidGift, getTotalGiftsCount } from './utils/gifts';
import { soundFx, speakUzbek } from './utils/audio';
import { playProfileWelcomeVoice, playAchievementVoice } from './utils/encouragementAudio';
import { getActiveProfile, saveProfile, switchActiveProfile } from './utils/profileStorage';
import confetti from 'canvas-confetti';
import candyBg from './assets/images/fairytale_candy_castle_1788798177338.jpg';
import skyBg from './assets/images/kids_magical_sky_1788786010838.jpg';

const STORAGE_KEY = 'nafish_qadam_kids_v2';
const PROFILE_KEY = 'nafas_qadam_profile_v2';
const THEME_KEY = 'nafas_qadam_bg_theme_v2';

export default function App() {
  const [currentSection, setCurrentSection] = useState<SectionType>('games');
  
  // Persistent profile loaded immediately from storage
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => getActiveProfile());

  const [userName, setUserName] = useState<string>(() => {
    const active = getActiveProfile();
    if (active?.firstName) return active.firstName;
    try {
      const savedProfile = localStorage.getItem(PROFILE_KEY);
      if (savedProfile) {
        const parsed = JSON.parse(savedProfile) as UserProfile;
        if (parsed.firstName) return parsed.firstName;
      }
      const savedProgress = localStorage.getItem(STORAGE_KEY);
      if (savedProgress) {
        const parsed = JSON.parse(savedProgress);
        if (parsed.userName) return parsed.userName;
      }
    } catch {
      // LocalStorage fallback
    }
    return 'Bolajon';
  });

  // Prompt onboarding setup only if no profile exists in storage
  const [isInitialSetup, setIsInitialSetup] = useState<boolean>(() => {
    return !getActiveProfile();
  });

  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(() => {
    return !getActiveProfile();
  });

  const [stars, setStars] = useState<number>(() => {
    try {
      const savedProgress = localStorage.getItem(STORAGE_KEY);
      if (savedProgress) {
        const parsed = JSON.parse(savedProgress);
        if (typeof parsed.stars === 'number') return parsed.stars;
      }
    } catch {
      // LocalStorage fallback
    }
    return 5;
  });
  const [totalGifts, setTotalGifts] = useState<number>(() => getTotalGiftsCount());
  const [isGiftChestOpen, setIsGiftChestOpen] = useState<boolean>(false);
  const [currentAward, setCurrentAward] = useState<AwardResult | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isCertificateOpen, setIsCertificateOpen] = useState<boolean>(false);
  const [lastScore, setLastScore] = useState<number>(7);
  const [dailyTasksState, setDailyTasksState] = useState<DailyTasksState>(getDailyTasksState);
  const [isDailyTasksModalOpen, setIsDailyTasksModalOpen] = useState<boolean>(false);
  const [bgTheme, setBgTheme] = useState<'candy' | 'sky'>(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_KEY);
      if (savedTheme === 'candy' || savedTheme === 'sky') return savedTheme;
      if (savedTheme === 'animals') {
        localStorage.setItem(THEME_KEY, 'candy');
      }
    } catch {
      // fallback
    }
    return 'candy';
  });

  const dailyProgress = getDailyTasksProgress(dailyTasksState);

  // Load remaining state if any
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem(STORAGE_KEY);
      if (savedProgress) {
        const parsed = JSON.parse(savedProgress);
        if (typeof parsed.lastScore === 'number') setLastScore(parsed.lastScore);
      }
    } catch {
      // LocalStorage fallback
    }
  }, []);

  // Save progress
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ stars, userName, lastScore })
      );
    } catch {
      // LocalStorage fallback
    }
  }, [stars, userName, lastScore]);

  const handleSaveProfile = (profile: UserProfile) => {
    const { activeProfile } = saveProfile(profile);
    setUserProfile(activeProfile);
    setUserName(activeProfile.firstName);
    setIsProfileModalOpen(false);
    setIsInitialSetup(false);
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ stars, userName: activeProfile.firstName, lastScore })
      );
    } catch {
      // LocalStorage fallback
    }
  };

  const handleSwitchProfile = (profile: UserProfile) => {
    const switched = switchActiveProfile(profile.id || '');
    const active = switched || profile;
    setUserProfile(active);
    setUserName(active.firstName);
  };

  const handleUpdateAvatar = (newAvatar: string) => {
    const updated: UserProfile = userProfile
      ? { ...userProfile, avatar: newAvatar }
      : {
          firstName: userName,
          lastName: '',
          age: 5,
          bio: "Aqliy rivojlanish mashqlari",
          avatar: newAvatar,
          createdAt: new Date().toISOString(),
        };
    const { activeProfile } = saveProfile(updated);
    setUserProfile(activeProfile);
  };

  const handleEarnStars = (amount: number) => {
    if (soundEnabled) soundFx.playStar();
    setStars((prev) => {
      const next = prev + amount;
      const milestones = [10, 25, 50, 75, 100, 150, 200];
      const reached = milestones.find((m) => prev < m && next >= m);
      if (reached) {
        soundFx.playSuccess();
        confetti({ particleCount: 75, spread: 80, origin: { y: 0.6 } });
        playAchievementVoice('stars', userName, { starCount: next });
      }
      return next;
    });
  };

  const handleAwardGift = (preferredId?: string) => {
    const res = awardKidGift(preferredId);
    setTotalGifts(getTotalGiftsCount());
    setCurrentAward(res);
  };

  const handleOpenGiftChest = () => {
    soundFx.playClick();
    setIsGiftChestOpen(true);
  };

  const handleDailyTaskProgress = (taskId: DailyTaskId, amount: number = 1) => {
    const { state, justUnlocked } = incrementDailyTask(taskId, amount);
    setDailyTasksState({ ...state });
    if (justUnlocked) {
      soundFx.playSuccess();
      confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
      playAchievementVoice('certificate', userName);
      setIsCertificateOpen(true);
    }
  };

  const handleOpenDiplomaOrTasks = () => {
    soundFx.playClick();
    if (dailyProgress.isAllCompleted) {
      setIsCertificateOpen(true);
    } else {
      setIsDailyTasksModalOpen(true);
    }
  };

  const handleCompleteTest = (score: number) => {
    setLastScore(score);
    handleEarnStars(5);
    handleDailyTaskProgress('games', 1);
    playAchievementVoice('test', userName);
  };

  const handleToggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    soundFx.setSoundEnabled(nextState);
    soundFx.playClick();
  };

  const handleToggleBgTheme = () => {
    const next = bgTheme === 'candy' ? 'sky' : 'candy';
    setBgTheme(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // Ignore
    }
    speakUzbek(
      next === 'candy'
        ? "Shirinlik qasri foni tanlandi!"
        : "Sehrli havo sharlari foni tanlandi!"
    );
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden font-sans select-none">
      {/* 
        VIVID 3D FAIRYTALE BACKGROUND
        Rich, bright, cheerful colors visible with crystal clarity ("ranglari aniq korinsin").
        Smooth pan motion, minimal blur (blur-[0.5px]), and subtle clear overlay.
      */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden transition-opacity duration-700">
        <img
          key={bgTheme}
          src={bgTheme === 'candy' ? candyBg : skyBg}
          alt="Kids Magic Background"
          className="w-full h-full object-cover animate-bg-pan scale-105 opacity-100 transition-all duration-700"
          referrerPolicy="no-referrer"
        />
        {/* Transparent subtle gradient allowing the background colors to pop */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-amber-50/20" />
      </div>

      {/* Cheerful 3D Kid Header */}
      <Header
        stars={stars}
        totalGifts={totalGifts}
        onOpenGifts={handleOpenGiftChest}
        userName={userName}
        userProfile={userProfile}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenProfile={() => {
          setIsInitialSetup(false);
          setIsProfileModalOpen(true);
        }}
        onUpdateAvatar={handleUpdateAvatar}
        dailyCompletedCount={dailyProgress.completedCount}
        dailyTotalCount={dailyProgress.totalCount}
        isDiplomaUnlocked={dailyProgress.isAllCompleted}
        onOpenDailyTasks={handleOpenDiplomaOrTasks}
        currentBgTheme={bgTheme}
        onToggleBgTheme={handleToggleBgTheme}
      />

      {/* Main 3 Big Picture Navigation Tabs */}
      <Navigation
        currentSection={currentSection}
        onSelectSection={setCurrentSection}
      />

      {/* Main Picture Content Views */}
      <main className="flex-1">
        {currentSection === 'lessons' && (
          <LessonViewer
            onEarnStars={handleEarnStars}
            onTaskProgress={() => handleDailyTaskProgress('lessons', 1)}
            onAwardGift={() => handleAwardGift()}
            onBack={() => setCurrentSection('games')}
          />
        )}

        {currentSection === 'writing' && (
          <LetterNumberWritingView
            onEarnStars={handleEarnStars}
            onTaskProgress={(taskId) => handleDailyTaskProgress(taskId, 1)}
            onAwardGift={() => handleAwardGift()}
          />
        )}

        {(currentSection === 'games' || currentSection === 'tests') && (
          <GamesHub
            onEarnStars={handleEarnStars}
            stars={stars}
            onOpenCertificate={handleOpenDiplomaOrTasks}
            userName={userName}
            userProfile={userProfile}
            onTaskProgress={(taskId) => handleDailyTaskProgress(taskId, 1)}
            onAwardGift={() => handleAwardGift()}
            onOpenProfile={() => {
              setIsInitialSetup(false);
              setIsProfileModalOpen(true);
            }}
          />
        )}
      </main>

      {/* Cheerful Kid Footer */}
      <footer className="py-4 px-4 text-center mt-auto border-t border-amber-200/60 bg-white/70 backdrop-blur-xs">
        <div className="max-w-md mx-auto flex items-center justify-between text-xs sm:text-sm font-black text-slate-700">
          <div className="flex items-center gap-1.5">
            <span className="text-xl">🎈</span>
            <span>Nafis Qadam — Bolalar uchun quvnoq ta'lim</span>
          </div>
          <button
            onClick={handleOpenDiplomaOrTasks}
            className={`px-3 py-1.5 rounded-xl font-black text-xs flex items-center gap-1.5 shadow-xs transition-transform active:scale-95 cursor-pointer ${
              dailyProgress.isAllCompleted
                ? 'bg-amber-500 hover:bg-amber-600 text-white animate-bounce-gentle'
                : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
            }`}
            title={
              dailyProgress.isAllCompleted
                ? 'Diplom tayyor! Ochish uchun bosing'
                : `Kunlik vazifalar: ${dailyProgress.completedCount}/${dailyProgress.totalCount} (Diplom qulfi)`
            }
          >
            <span>Diplom</span>
            <span>{dailyProgress.isAllCompleted ? '📜' : '🔒'}</span>
          </button>
        </div>
      </footer>

      {/* Daily Tasks / Diploma Lock Modal */}
      <DailyTasksModal
        isOpen={isDailyTasksModalOpen}
        onClose={() => setIsDailyTasksModalOpen(false)}
        tasksState={dailyTasksState}
        onNavigateSection={(section) => {
          setCurrentSection(section);
        }}
        onOpenCertificate={() => {
          setIsCertificateOpen(true);
        }}
        userName={userName}
      />

      {/* Initial / Edit User Profile Onboarding Modal */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        currentProfile={userProfile}
        onSave={handleSaveProfile}
        onSwitchProfile={handleSwitchProfile}
        isInitialSetup={isInitialSetup}
      />

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        userName={userName}
        userProfile={userProfile}
        score={lastScore}
        totalQuestions={7}
        totalStars={stars}
      />

      {/* Gift Reward Modal (Earned for correct answers / milestones) */}
      <GiftRewardModal
        award={currentAward}
        isOpen={!!currentAward}
        onClose={() => setCurrentAward(null)}
        totalGiftsCount={totalGifts}
        childName={userProfile?.firstName || userName}
        onOpenChest={() => {
          setCurrentAward(null);
          setIsGiftChestOpen(true);
        }}
      />

      {/* Gift Chest Dashboard ("u sovgalar doim yigilib turusin nechtaligi aniq korsatilsin") */}
      <GiftChestModal
        isOpen={isGiftChestOpen}
        onClose={() => setIsGiftChestOpen(false)}
        onClaimBonusStar={() => handleEarnStars(1)}
      />
    </div>
  );
}
