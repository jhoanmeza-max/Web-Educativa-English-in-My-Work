import React, { useState } from 'react';
import {
  Globe,
  BookOpen,
  Gamepad2,
  Users,
  Palette,
  Trophy,
  LineChart,
  Flame,
  Sparkles,
  UserCheck,
  CheckCircle2,
  X
} from 'lucide-react';
import { useVLE, NavSection } from '../context/VLEContext';

export const Navbar: React.FC = () => {
  const { profile, activeSection, setActiveSection, updateProfile } = useVLE();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [tempName, setTempName] = useState(profile.name);
  const [tempLevel, setTempLevel] = useState(profile.level);
  const [tempTown, setTempTown] = useState(profile.hometown);
  const [tempAvatar, setTempAvatar] = useState(profile.avatar);

  const navItems: { id: NavSection; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'welcome', label: 'Welcome', icon: <Globe className="w-4 h-4" /> },
    { id: 'modules', label: 'Learning Units', icon: <BookOpen className="w-4 h-4" />, badge: '3 Units' },
    { id: 'games', label: 'Interactive Games', icon: <Gamepad2 className="w-4 h-4" /> },
    { id: 'collab', label: 'Collaborative Hub', icon: <Users className="w-4 h-4" /> },
    { id: 'creative', label: 'Creative Studio', icon: <Palette className="w-4 h-4" /> },
    { id: 'missions', label: 'Missions & Badges', icon: <Trophy className="w-4 h-4" /> },
    { id: 'tracker', label: 'Progress & Journal', icon: <LineChart className="w-4 h-4" /> },
  ];

  const AVATARS = [
    { url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80", label: "Tech Explorer" },
    { url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80", label: "Gamer" },
    { url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80", label: "Creative Artist" },
    { url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80", label: "Urban Adventurer" },
    { url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80", label: "Music Fan" }
  ];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: tempName,
      level: tempLevel,
      hometown: tempTown,
      avatar: tempAvatar
    });
    setShowProfileModal(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 shadow-lg shadow-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            {/* Logo and Brand */}
            <div
              onClick={() => setActiveSection('welcome')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-violet-500 to-cyan-400 p-0.5 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-all">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <Globe className="w-6 h-6 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-indigo-100 to-cyan-300 bg-clip-text text-transparent">
                    English in My World
                  </span>
                  <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                    Constructivist VLE
                  </span>
                </div>
                <p className="text-xs text-slate-400 hidden sm:block">
                  Everyday Life, Everyday English • Ages 12–17
                </p>
              </div>
            </div>

            {/* Middle Nav Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm shadow-indigo-500/20'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Profile & XP Status */}
            <div className="flex items-center gap-3">
              {/* Daily Streak */}
              <div
                title="Continuous Learning Streak"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold"
              >
                <Flame className="w-4 h-4 fill-orange-400 animate-pulse" />
                <span>{profile.streakDays}d Streak</span>
              </div>

              {/* XP Pill */}
              <div
                onClick={() => setActiveSection('missions')}
                title="Your Experience Points & Missions"
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-950/60 border border-indigo-500/30 hover:border-indigo-400/60 cursor-pointer transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <div className="text-left">
                  <div className="text-xs font-bold text-amber-300">{profile.xp} XP</div>
                  <div className="text-[10px] text-indigo-300 font-medium leading-none">
                    {profile.level.split(' ')[0]}
                  </div>
                </div>
              </div>

              {/* User Avatar Button */}
              <button
                onClick={() => setShowProfileModal(true)}
                className="relative group cursor-pointer focus:outline-none"
                title="Edit your Student Profile"
              >
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-10 h-10 rounded-xl object-cover ring-2 ring-indigo-500/40 group-hover:ring-indigo-400 transition-all"
                />
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-slate-950" />
              </button>
            </div>
          </div>

          {/* Mobile Bottom Navigation Bar */}
          <div className="lg:hidden flex items-center justify-between py-2 border-t border-slate-800/60 overflow-x-auto gap-2 scrollbar-none">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex flex-col items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-semibold whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Student Profile Customizer Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-indigo-500/30 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowProfileModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
                <UserCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Student Profile Settings</h3>
                <p className="text-xs text-slate-400">Personalize your constructivist learner identity</p>
              </div>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              {/* Avatar selection */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wide">
                  Select Your Teen Avatar
                </label>
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  {AVATARS.map((av, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setTempAvatar(av.url)}
                      className={`relative rounded-xl p-1 transition-all ${
                        tempAvatar === av.url
                          ? 'ring-2 ring-cyan-400 scale-105 bg-cyan-500/20'
                          : 'opacity-70 hover:opacity-100 hover:scale-100'
                      }`}
                    >
                      <img
                        src={av.url}
                        alt={av.label}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      {tempAvatar === av.url && (
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 absolute top-0 right-0 bg-slate-900 rounded-full" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Your Nickname / Display Name
                </label>
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  required
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                  placeholder="e.g. Alex, Mateo, Valentina"
                />
              </div>

              {/* English Level */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Self-Assessed English Level
                </label>
                <select
                  value={tempLevel}
                  onChange={(e) => setTempLevel(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="A1 (Beginner Explorer)">A1 (Beginner Explorer - Basic phrases)</option>
                  <option value="A2 (Explorer)">A2 (Explorer - Everyday conversations)</option>
                  <option value="A2+ (Urban Navigator)">A2+ (Urban Navigator - Routines & directions)</option>
                  <option value="B1 (Fluent Pathfinder)">B1 (Fluent Pathfinder - Autonomous projects)</option>
                </select>
              </div>

              {/* Hometown */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Your Hometown / Municipality
                </label>
                <input
                  type="text"
                  value={tempTown}
                  onChange={(e) => setTempTown(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                  placeholder="e.g. Medellín, Tunja, Bogotá, Cali"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  This connects your real-world surroundings to Unit 3 town mini-tours!
                </p>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowProfileModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 shadow-md shadow-indigo-500/20 transition cursor-pointer"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
