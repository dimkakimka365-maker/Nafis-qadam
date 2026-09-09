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
import {
  DailyTasksState,
  DailyTaskId,
  getDailyTasksState,
  incrementDailyTask,
  getDailyTasksProgress,
} from './utils/dailyTasks';
import { soundFx, speakUzbek } from './utils/audio';
import confetti from 'canvas-confetti';
import bgImage from './assets/images/kids_magical_sky_1788786010838.jpg';

const STORAGE_KEY = 'nafish_qadam_kids_v2';
const PROFILE_KEY = 'nafas_qadam_profile_v2';

export default function App() {
  const [currentSection, setCurrentSection] = useState<SectionType>('games');
  const [userName, setUserName] = useState<string>('Bolajon');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isInitialSetup, setIsInitialSetup] = useState<boolean>(false);
  const [stars, setStars] = useState<number>(5);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isCertificateOpen, setIsCertificateOpen] = useState<boolean>(false);
  const [lastScore, setLastScore] = useState<number>(7);
  const [dailyTasksState, setDailyTasksState] = useState<DailyTasksState>(getDailyTasksState);
  const [isDailyTasksModalOpen, setIsDailyTasksModalOpen] = useState<boolean>(false);

  const dailyProgress = getDailyTasksProgress(dailyTasksState);

  // Load progress and user profile from localStorage
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem(STORAGE_KEY);
      if (savedProgress) {
        const parsed = JSON.parse(savedProgress);
        if (typeof parsed.stars === 'number') setStars(parsed.stars);
        if (parsed.userName) setUserName(parsed.userName);
        if (typeof parsed.lastScore === 'number') setLastScore(parsed.lastScore);
      }

      const savedProfile = localStorage.getItem(PROFILE_KEY);
      if (savedProfile) {
        const parsed = JSON.parse(savedProfile) as UserProfile;
        setUserProfile(parsed);
        if (parsed.firstName) setUserName(parsed.firstName);
      } else {
        // First entry: Ask for name, age, bio/info to tailor tests!
        setIsInitialSetup(true);
        setIsProfileModalOpen(true);
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
    setUserProfile(profile);
    setUserName(profile.firstName);
    setIsProfileModalOpen(false);
    setIsInitialSetup(false);
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    } catch {
      // LocalStorage fallback
    }
  };

  const handleEarnStars = (amount: number) => {
    if (soundEnabled) soundFx.playStar();
    setStars((prev) => prev + amount);
  };

  const handleDailyTaskProgress = (taskId: DailyTaskId, amount: number = 1) => {
    const { state, justUnlocked } = incrementDailyTask(taskId, amount);
    setDailyTasksState({ ...state });
    if (justUnlocked) {
      soundFx.playSuccess();
      confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
      speakUzbek("Barakalla! Bugungi barcha vazifalarni bajardingiz! Sizning faxriy diplomingiz tayyor!");
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
  };

  const handleToggleSound = () => {
    setSoundEnabled((prev) => !prev);
    soundFx.playClick();
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden font-sans select-none">
      {/* 
        ANIMATED BACKGROUND IMAGE 
        Moving slowly (animate-bg-pan), partially blurred (blur-[3px]), 
        with soft joyful gradient overlay for clear contrast 
      */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <img
          src={bgImage}
          alt="Kids Background"
          className="w-full h-full object-cover animate-bg-pan filter blur-[3px] scale-110 opacity-75"
          referrerPolicy="no-referrer"
        />
        {/* Soft pastel overlay to ensure readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-100/60 via-amber-50/50 to-white/70" />
      </div>

      {/* Cheerful Kid Header */}
      <Header
        stars={stars}
        userName={userName}
        userProfile={userProfile}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenProfile={() => {
          setIsInitialSetup(false);
          setIsProfileModalOpen(true);
        }}
        dailyCompletedCount={dailyProgress.completedCount}
        dailyTotalCount={dailyProgress.totalCount}
        isDiplomaUnlocked={dailyProgress.isAllCompleted}
        onOpenDailyTasks={handleOpenDiplomaOrTasks}
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
          />
        )}

        {currentSection === 'writing' && (
          <LetterNumberWritingView
            onEarnStars={handleEarnStars}
            onTaskProgress={(taskId) => handleDailyTaskProgress(taskId, 1)}
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
    </div>
  );
}
