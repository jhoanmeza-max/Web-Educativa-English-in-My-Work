import React from 'react';
import {
  Trophy,
  Sparkles,
  Flame,
  Award,
  CheckCircle2,
  Clock,
  Compass,
  ShoppingBag,
  MapPin,
  MessageSquareHeart,
  BookOpenCheck,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { useVLE } from '../context/VLEContext';
import { ALL_BADGES } from '../data/curriculumData';

export const MissionRewards: React.FC = () => {
  const {
    profile,
    missions,
    setActiveSection,
    triggerConfetti
  } = useVLE();

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return <Compass className="w-6 h-6" />;
      case 'Clock':
        return <Clock className="w-6 h-6" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-6 h-6" />;
      case 'MapPin':
        return <MapPin className="w-6 h-6" />;
      case 'MessageSquareHeart':
        return <MessageSquareHeart className="w-6 h-6" />;
      case 'BookOpenCheck':
        return <BookOpenCheck className="w-6 h-6" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6" />;
      default:
        return <Trophy className="w-6 h-6" />;
    }
  };

  // Level thresholds
  const LEVEL_TIERS = [
    { title: "A1 (Beginner Pioneer)", minXp: 0, maxXp: 150 },
    { title: "A2 (Curious Explorer)", minXp: 150, maxXp: 350 },
    { title: "A2+ (Urban Navigator)", minXp: 350, maxXp: 600 },
    { title: "B1 (Fluent Pathfinder)", minXp: 600, maxXp: 1000 }
  ];

  const currentTier = LEVEL_TIERS.find(
    (t) => profile.xp >= t.minXp && profile.xp < t.maxXp
  ) || LEVEL_TIERS[LEVEL_TIERS.length - 1];

  const progressPercent = Math.min(
    100,
    Math.round(((profile.xp - currentTier.minXp) / (currentTier.maxXp - currentTier.minXp)) * 100)
  );

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
            Gamified Constructivist Progression
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">Missions & Badges Showcase</h2>
          <p className="text-xs text-slate-400">
            Level up by completing authentic tasks, helping classmates, and discovering real-world English!
          </p>
        </div>

        <button
          onClick={triggerConfetti}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold hover:bg-amber-500/30 transition cursor-pointer self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4" />
          <span>Celebrate Progress!</span>
        </button>
      </div>

      {/* Level & XP Progression Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-950/30 via-slate-900 to-indigo-950/40 border border-amber-500/30 mb-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 p-0.5 shadow-lg shadow-amber-500/30 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Trophy className="w-8 h-8 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-black text-white">{profile.level}</h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Active Rank
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {profile.name} • {profile.hometown} • Joined {profile.joinedDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div>
              <span className="text-xs text-slate-400 block font-semibold">Total XP Earned</span>
              <span className="text-2xl font-black text-amber-300">{profile.xp} XP</span>
            </div>
            <div className="h-10 w-px bg-slate-800" />
            <div>
              <span className="text-xs text-slate-400 block font-semibold">Active Streak</span>
              <span className="text-2xl font-black text-orange-400 flex items-center gap-1">
                <Flame className="w-5 h-5 fill-orange-400" />
                {profile.streakDays} Days
              </span>
            </div>
          </div>
        </div>

        {/* Progress bar to next level */}
        <div>
          <div className="flex items-center justify-between text-xs font-semibold mb-2">
            <span className="text-slate-300">Level Progress</span>
            <span className="text-amber-400 font-mono">
              {profile.xp} / {currentTier.maxXp} XP ({progressPercent}%)
            </span>
          </div>
          <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            <div
              style={{ width: `${progressPercent}%` }}
              className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-cyan-400 transition-all duration-500 rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Weekly Missions Grid */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            Educational Missions & Quests
          </h3>
          <span className="text-xs text-slate-400">Refreshed Weekly</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {missions.map((mission) => {
            const isCompleted = profile.completedTasks.includes(mission.id) || mission.completed;
            return (
              <div
                key={mission.id}
                className={`p-5 rounded-3xl border transition-all flex flex-col justify-between ${
                  isCompleted
                    ? 'bg-emerald-950/20 border-emerald-500/30 opacity-90'
                    : 'bg-slate-900/60 border-slate-800 hover:border-indigo-500/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase ${
                        mission.category === 'daily'
                          ? 'bg-cyan-500/20 text-cyan-300'
                          : mission.category === 'weekly'
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-indigo-500/20 text-indigo-300'
                      }`}
                    >
                      {mission.category} Mission
                    </span>
                    <span className="text-xs font-black text-amber-300">
                      +{mission.xpReward} XP
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white mb-1">{mission.title}</h4>
                  <p className="text-xs text-slate-400 mb-4">{mission.description}</p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                  {isCompleted ? (
                    <span className="text-xs text-emerald-400 font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Mission Completed</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => setActiveSection(mission.actionSection)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition cursor-pointer"
                    >
                      <span>Go to Activity</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {mission.badgeReward && (
                    <span className="text-[10px] text-slate-400 bg-slate-950 px-2 py-0.5 rounded-md">
                      Unlocks Badge
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badges Trophy Showcase */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            Trophy Showcase: Constructivist Milestones
          </h3>
          <span className="text-xs text-indigo-400 font-semibold">
            {profile.badges.length} / {ALL_BADGES.length} Badges Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ALL_BADGES.map((badge) => {
            const isUnlocked = profile.badges.includes(badge.id);
            return (
              <div
                key={badge.id}
                className={`p-5 rounded-3xl border transition-all text-center flex flex-col items-center justify-between min-h-[220px] ${
                  isUnlocked
                    ? 'bg-slate-900 border-amber-500/40 shadow-lg shadow-amber-500/10'
                    : 'bg-slate-950/60 border-slate-800/80 opacity-40'
                }`}
              >
                <div className="w-full flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    {badge.category}
                  </span>
                  {isUnlocked && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  )}
                </div>

                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-3 transition-transform ${
                    isUnlocked
                      ? 'bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 shadow-md shadow-amber-500/30'
                      : 'bg-slate-800 text-slate-600'
                  }`}
                >
                  {getBadgeIcon(badge.icon)}
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white mb-1">{badge.title}</h4>
                  <p className="text-[11px] text-slate-400 leading-snug line-clamp-2">
                    {badge.description}
                  </p>
                </div>

                <div className="pt-2 text-[10px] text-slate-500 font-mono">
                  {isUnlocked ? 'Unlocked' : 'Locked'}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
