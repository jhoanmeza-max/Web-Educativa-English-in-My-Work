import React, { useState } from 'react';
import {
  Compass,
  Sparkles,
  ArrowRight,
  Lightbulb,
  Users2,
  Layers,
  CheckCircle2,
  HelpCircle,
  Play,
  RotateCcw,
  Zap,
  Award
} from 'lucide-react';
import { useVLE } from '../context/VLEContext';
import { COURSE_INFO } from '../data/curriculumData';
import { AudioSpeechButton } from './AudioSpeechButton';

export const WelcomeHero: React.FC = () => {
  const { setActiveSection, setSelectedUnitId, addXP, triggerConfetti } = useVLE();
  const [dailyAnswered, setDailyAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showPedagogyDetails, setShowPedagogyDetails] = useState(false);

  // Daily teen spark challenge (present simple routine question)
  const sparkQuestion = {
    prompt: "Mateo wakes up at 6:00 AM on school days, but on Sunday he ___ until 9:30 AM.",
    options: ["sleep", "sleeps", "sleeping", "slept"],
    correctIndex: 1,
    explanation: "Because the subject is 'he' (3rd person singular in present simple), we add '-s' -> 'sleeps'!"
  };

  const handleSparkAnswer = (idx: number) => {
    setSelectedAnswer(idx);
    if (!dailyAnswered) {
      setDailyAnswered(true);
      if (idx === sparkQuestion.correctIndex) {
        addXP(30, "Daily English Spark solved!");
        triggerConfetti();
      }
    }
  };

  const constructivistPillars = [
    {
      icon: <Zap className="w-5 h-5 text-amber-400" />,
      title: "Learning by Doing",
      desc: "Simulate real store checkout, record your personal morning schedule, and map real city routes.",
      badge: "Action-First"
    },
    {
      icon: <Lightbulb className="w-5 h-5 text-cyan-400" />,
      title: "Learning by Discovery",
      desc: "Uncover English grammar patterns through interactive scenarios rather than memorizing dry rules.",
      badge: "Inquiry"
    },
    {
      icon: <Users2 className="w-5 h-5 text-indigo-400" />,
      title: "Collaborative Social Learning",
      desc: "Exchange projects with classmates in the Forum, give helpful peer critique, and co-write dialogues.",
      badge: "Community"
    },
    {
      icon: <Compass className="w-5 h-5 text-emerald-400" />,
      title: "Real-World Experience",
      desc: "Connect English directly to your hometown in Colombia and everyday teen life.",
      badge: "Authenticity"
    }
  ];

  return (
    <div className="relative overflow-hidden py-10 lg:py-16">
      {/* Background Animated Glows & Cyber Dots */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[700px] h-72 bg-gradient-to-r from-violet-600/10 via-fuchsia-600/10 to-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Hero Header */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          {/* Top pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Constructivist Virtual Learning Environment (VLE)</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6 leading-tight">
            English in <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-fuchsia-400 bg-clip-text text-transparent">My World</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed mb-4">
            Everyday Life, Everyday English. Built for teenagers aged 12 to 17 to explore, build, and communicate without fear.
          </p>

          <p className="text-sm text-slate-400 max-w-xl mx-auto mb-8">
            You are the protagonist of your learning! Build your own vocabulary, solve authentic challenges with friends, and discover English in everyday situations.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                setSelectedUnitId('unit-1');
                setActiveSection('modules');
              }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 hover:shadow-indigo-500/50 hover:scale-105 transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Start Learning Adventure</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveSection('games')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600 font-semibold text-sm transition-all cursor-pointer"
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>Explore Interactive Games</span>
            </button>

            <button
              onClick={() => setShowPedagogyDetails(!showPedagogyDetails)}
              className="inline-flex items-center gap-1.5 px-4 py-3.5 rounded-2xl text-slate-400 hover:text-cyan-300 text-xs font-semibold transition cursor-pointer"
            >
              <HelpCircle className="w-4 h-4" />
              <span>How does this VLE work?</span>
            </button>
          </div>
        </div>

        {/* Constructivist Pedagogy Modal / Banner */}
        {showPedagogyDetails && (
          <div className="mb-12 p-6 rounded-3xl bg-slate-900/90 border border-indigo-500/30 backdrop-blur-xl animate-in fade-in duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-indigo-500/20 text-indigo-400">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">The Constructivist Pedagogy Behind This Platform</h3>
                  <p className="text-xs text-slate-400">Designed by Sebastian Meza, Samuel Perez, and Juan Esteban</p>
                </div>
              </div>
              <button
                onClick={() => setShowPedagogyDetails(false)}
                className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded-lg bg-slate-800"
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                <div className="font-bold text-cyan-400 mb-1 text-sm">1. Learner-Centered</div>
                <p>You don't just memorize tables; you create products: audio of your real day, budget sheets for things you actually care about, and mini-tours of your town.</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                <div className="font-bold text-indigo-400 mb-1 text-sm">2. Teacher as Facilitator</div>
                <p>Teachers guide your exploration and provide constructive rubrics and feedback, while students interact and learn from each other.</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                <div className="font-bold text-amber-400 mb-1 text-sm">3. Authentic Tasks</div>
                <p>Task-based learning: every unit ends with a tangible communicative artifact shared in the collaborative forum for peer review.</p>
              </div>
            </div>
          </div>
        )}

        {/* Quick Teen English Spark (Interactive Warm-up Widget) */}
        <div className="max-w-3xl mx-auto mb-14 p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-indigo-950/50 border border-cyan-500/30 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
                <Zap className="w-5 h-5 animate-pulse" />
              </span>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  Daily English Spark • Quick Discovery Challenge
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 font-semibold px-2 py-0.5 rounded-full border border-amber-500/30">
                    +30 XP
                  </span>
                </h3>
                <p className="text-xs text-slate-400">Can you deduce the right verb form by context?</p>
              </div>
            </div>
            <AudioSpeechButton text={sparkQuestion.prompt.replace("___", "blank")} size="sm" />
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 mb-4">
            <p className="text-sm sm:text-base text-slate-200 font-medium">
              "{sparkQuestion.prompt}"
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-3">
            {sparkQuestion.options.map((opt, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrect = idx === sparkQuestion.correctIndex;
              let btnClass = "bg-slate-800/80 hover:bg-slate-700 text-slate-300 border-slate-700";

              if (dailyAnswered) {
                if (isCorrect) {
                  btnClass = "bg-emerald-600/30 text-emerald-300 border-emerald-500/60 ring-2 ring-emerald-500/30";
                } else if (isSelected) {
                  btnClass = "bg-rose-600/30 text-rose-300 border-rose-500/60";
                } else {
                  btnClass = "opacity-40 bg-slate-800 text-slate-500 border-slate-800";
                }
              }

              return (
                <button
                  key={idx}
                  disabled={dailyAnswered}
                  onClick={() => handleSparkAnswer(idx)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${btnClass}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {dailyAnswered && (
            <div className="p-3 rounded-xl bg-slate-950/80 border border-indigo-500/20 text-xs text-slate-300 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{sparkQuestion.explanation}</span>
              </div>
              <button
                onClick={() => {
                  setDailyAnswered(false);
                  setSelectedAnswer(null);
                }}
                className="text-slate-400 hover:text-white p-1"
                title="Try again"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* 4 Constructivist Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {constructivistPillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/40 transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-xl bg-slate-800 group-hover:scale-110 transition-transform">
                  {pillar.icon}
                </div>
                <span className="text-[10px] font-bold text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-md">
                  {pillar.badge}
                </span>
              </div>
              <h3 className="font-bold text-white text-sm mb-1.5 group-hover:text-cyan-300 transition-colors">
                {pillar.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Preview of the 3 Learning Units */}
        <div className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-extrabold text-white">Three Authentic English Units</h2>
              <p className="text-xs text-slate-400">Structured around everyday communicative scenarios from your life</p>
            </div>
            <button
              onClick={() => setActiveSection('modules')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 cursor-pointer"
            >
              <span>View All Units & Rubrics</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Unit 1 Card */}
            <div
              onClick={() => {
                setSelectedUnitId('unit-1');
                setActiveSection('modules');
              }}
              className="p-5 rounded-2xl bg-gradient-to-b from-amber-950/20 to-slate-900 border border-amber-500/20 hover:border-amber-500/50 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 text-[10px] font-extrabold">
                  UNIT 1
                </span>
                <span className="text-xs text-slate-400">Habits & Time</span>
              </div>
              <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors mb-2">
                My Daily Routine
              </h4>
              <p className="text-xs text-slate-400 mb-4 line-clamp-2">
                Learn present simple verbs, compare your daily schedule with classmates, and record your 'My Day' audio journal.
              </p>
              <div className="flex items-center justify-between text-[11px] text-amber-400/80 font-semibold pt-3 border-t border-slate-800">
                <span>Task: Daily Schedule Comparison</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Unit 2 Card */}
            <div
              onClick={() => {
                setSelectedUnitId('unit-2');
                setActiveSection('modules');
              }}
              className="p-5 rounded-2xl bg-gradient-to-b from-emerald-950/20 to-slate-900 border border-emerald-500/20 hover:border-emerald-500/50 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold">
                  UNIT 2
                </span>
                <span className="text-xs text-slate-400">Stores & Budget</span>
              </div>
              <h4 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors mb-2">
                Shopping and Money
              </h4>
              <p className="text-xs text-slate-400 mb-4 line-clamp-2">
                Simulate shopping dialogues, ask about prices, differentiate wants vs needs, and design an illustrated budget list.
              </p>
              <div className="flex items-center justify-between text-[11px] text-emerald-400/80 font-semibold pt-3 border-t border-slate-800">
                <span>Task: Mini Shopping List & Justification</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Unit 3 Card */}
            <div
              onClick={() => {
                setSelectedUnitId('unit-3');
                setActiveSection('modules');
              }}
              className="p-5 rounded-2xl bg-gradient-to-b from-cyan-950/20 to-slate-900 border border-cyan-500/20 hover:border-cyan-500/50 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 text-[10px] font-extrabold">
                  UNIT 3
                </span>
                <span className="text-xs text-slate-400">Town & Directions</span>
              </div>
              <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                Getting Around Town
              </h4>
              <p className="text-xs text-slate-400 mb-4 line-clamp-2">
                Master prepositions of place and town landmarks, and build an interactive guided mini-tour of your neighborhood.
              </p>
              <div className="flex items-center justify-between text-[11px] text-cyan-400/80 font-semibold pt-3 border-t border-slate-800">
                <span>Task: My Neighborhood Tour</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
