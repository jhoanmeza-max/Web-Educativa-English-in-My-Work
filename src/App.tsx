/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { VLEProvider, useVLE } from './context/VLEContext';
import { Navbar } from './components/Navbar';
import { WelcomeHero } from './components/WelcomeHero';
import { LearningModules } from './components/LearningModules';
import { InteractiveGames } from './components/InteractiveGames';
import { CollaborativeSpace } from './components/CollaborativeSpace';
import { CreativeCorner } from './components/CreativeCorner';
import { MissionRewards } from './components/MissionRewards';
import { ProgressTracker } from './components/ProgressTracker';
import { Globe, Heart, Sparkles, BookOpen, Layers } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeSection, toastMessage } = useVLE();

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white font-sans">
      <Navbar />

      <main className="flex-1">
        {activeSection === 'welcome' && <WelcomeHero />}
        {activeSection === 'modules' && <LearningModules />}
        {activeSection === 'games' && <InteractiveGames />}
        {activeSection === 'collab' && <CollaborativeSpace />}
        {activeSection === 'creative' && <CreativeCorner />}
        {activeSection === 'missions' && <MissionRewards />}
        {activeSection === 'tracker' && <ProgressTracker />}
      </main>

      {/* Floating Constructivist Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
          <div className="px-4 py-3 rounded-2xl bg-slate-900 border border-cyan-500/40 text-cyan-300 text-xs font-bold shadow-2xl shadow-cyan-500/20 flex items-center gap-2 backdrop-blur-xl">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Footer with Pedagogic Attribution */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-10 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-cyan-400">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <span className="text-sm font-extrabold text-white">English in My World</span>
              <p className="text-[11px] text-slate-400">
                Constructivist Virtual Learning Environment (VLE) • Everyday Life, Everyday English
              </p>
            </div>
          </div>

          <div className="text-center sm:text-right text-xs text-slate-400">
            <p className="font-semibold text-slate-300">
              Curricular Design: Sebastian Meza, Samuel Perez & Juan Esteban
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Constructivist Model • Task-Based & Learner-Centered • High School Ages 12–17
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <VLEProvider>
      <MainContent />
    </VLEProvider>
  );
}
