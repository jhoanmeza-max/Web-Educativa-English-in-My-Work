import React, { useState } from 'react';
import {
  LineChart,
  BookOpenCheck,
  Award,
  Sparkles,
  CheckCircle2,
  Clock,
  Compass,
  ShoppingBag,
  MapPin,
  MessageSquare,
  HelpCircle,
  Plus,
  Send,
  UserCheck
} from 'lucide-react';
import { useVLE } from '../context/VLEContext';
import { LEARNING_UNITS } from '../data/curriculumData';

export const ProgressTracker: React.FC = () => {
  const {
    profile,
    reflections,
    addReflection,
    creativeProjects,
    forumPosts,
    setActiveSection
  } = useVLE();

  const [selectedUnitForRefl, setSelectedUnitForRefl] = useState('unit-1');
  const [newDiscovery, setNewDiscovery] = useState('');
  const [connectionToLife, setConnectionToLife] = useState('');
  const [challengesFaced, setChallengesFaced] = useState('');
  const [nextGoal, setNextGoal] = useState('');

  const handleSaveReflection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDiscovery.trim() || !connectionToLife.trim()) return;

    addReflection({
      unitId: selectedUnitForRefl,
      newDiscovery,
      connectionToLife,
      challengesFaced: challengesFaced || 'Practiced pronunciation without anxiety!',
      nextGoal: nextGoal || 'Master the next unit task and give feedback to friends.'
    });

    setNewDiscovery('');
    setConnectionToLife('');
    setChallengesFaced('');
    setNextGoal('');
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
            Metacognition & Continuous Growth
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">Progress & Reflection Journal</h2>
          <p className="text-xs text-slate-400">
            Constructivist learning requires reflecting on your journey: what you discovered, how it links to your life, and where you want to grow.
          </p>
        </div>
      </div>

      {/* Progress Metric Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400">Tasks Completed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white">{profile.completedTasks.length} Activities</div>
          <p className="text-[11px] text-slate-500 mt-1">Across Units 1, 2, and 3</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400">Creative Projects</span>
            <Sparkles className="w-4 h-4 text-fuchsia-400" />
          </div>
          <div className="text-2xl font-black text-white">{creativeProjects.length} Created</div>
          <p className="text-[11px] text-slate-500 mt-1">Comics, tours, & budget sheets</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400">Social Peer Comments</span>
            <MessageSquare className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-white">Active Participant</div>
          <p className="text-[11px] text-slate-500 mt-1">Vygotskian peer collaboration</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400">Reflection Entries</span>
            <BookOpenCheck className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white">{reflections.length} Entries</div>
          <p className="text-[11px] text-slate-500 mt-1">Self-evaluation portfolio</p>
        </div>
      </div>

      {/* Teacher Facilitator's Constructive Feedback Corner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-indigo-500/30 mb-8">
        <div className="flex items-start gap-4">
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80"
            alt="Teacher Elena"
            className="w-14 h-14 rounded-2xl object-cover ring-2 ring-indigo-400/50 shrink-0"
          />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Teacher Guide & Facilitator
              </span>
              <span className="text-xs text-slate-400 font-semibold">Teacher Elena</span>
            </div>
            <h3 className="text-base font-bold text-white mb-2">
              Feedback on Your Everyday English Progress
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans mb-3">
              "Great work engaging with the authentic tasks! Remember: making mistakes with prepositions or verb endings is an essential part of active discovery. When giving directions in your town, focus on using landmarks your classmates recognize. Keep up the peer reviews—you learn just as much from reading your friends' schedules as from writing your own!"
            </p>
            <div className="text-[11px] text-indigo-400 font-semibold">
              Pedagogic Focus: Learner autonomy & communicative competence.
            </div>
          </div>
        </div>
      </div>

      {/* Metacognitive Reflection Journal Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Reflection Form */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400">
              <BookOpenCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Log Today's Reflection</h3>
              <p className="text-xs text-slate-400">Think critically about what you constructed today</p>
            </div>
          </div>

          <form onSubmit={handleSaveReflection} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Select Related Unit:
              </label>
              <select
                value={selectedUnitForRefl}
                onChange={(e) => setSelectedUnitForRefl(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value="unit-1">Unit 1: My Daily Routine & Present Simple</option>
                <option value="unit-2">Unit 2: Shopping, Prices & Wants vs Needs</option>
                <option value="unit-3">Unit 3: Getting Around Town & Directions</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                1. What new English concept or phrase did you discover today?
              </label>
              <textarea
                rows={2}
                value={newDiscovery}
                onChange={(e) => setNewDiscovery(e.target.value)}
                required
                placeholder="e.g. I figured out that 'across from' means the opposite side of the street..."
                className="w-full bg-slate-800/80 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                2. How does this connect to your real everyday life in your town?
              </label>
              <textarea
                rows={2}
                value={connectionToLife}
                onChange={(e) => setConnectionToLife(e.target.value)}
                required
                placeholder="e.g. I can now guide foreign tourists at the plaza to the nearest bakery..."
                className="w-full bg-slate-800/80 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                3. What was challenging and how did you solve it?
              </label>
              <input
                type="text"
                value={challengesFaced}
                onChange={(e) => setChallengesFaced(e.target.value)}
                placeholder="e.g. Distinguishing between 'want' and 'need' in my budget"
                className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                4. What is your next learning goal?
              </label>
              <input
                type="text"
                value={nextGoal}
                onChange={(e) => setNextGoal(e.target.value)}
                placeholder="e.g. Create a 4-stop tour of my neighborhood in the Creative Corner"
                className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs shadow-md transition cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Save Reflection (+50 XP)</span>
            </button>
          </form>
        </div>

        {/* Reflection History Portfolio */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Compass className="w-4 h-4 text-cyan-400" />
            Your Reflection Journal History ({reflections.length})
          </h3>

          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
            {reflections.map((refl) => (
              <div
                key={refl.id}
                className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-indigo-500/20 text-indigo-300">
                    {refl.unitId.toUpperCase()}
                  </span>
                  <span className="text-[11px] text-slate-500">{refl.date}</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="font-bold text-amber-300 block">Discovery:</span>
                    <p className="text-slate-300 italic">"{refl.newDiscovery}"</p>
                  </div>
                  <div>
                    <span className="font-bold text-cyan-300 block">Life Connection:</span>
                    <p className="text-slate-300">"{refl.connectionToLife}"</p>
                  </div>
                  {refl.challengesFaced && (
                    <div>
                      <span className="font-bold text-slate-400 block">Overcoming Challenge:</span>
                      <p className="text-slate-400">"{refl.challengesFaced}"</p>
                    </div>
                  )}
                  {refl.nextGoal && (
                    <div className="pt-2 border-t border-slate-800/80 text-[11px] text-emerald-400 font-semibold">
                      Next Goal: {refl.nextGoal}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
