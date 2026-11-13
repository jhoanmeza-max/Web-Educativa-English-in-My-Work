import React, { useState } from 'react';
import {
  Clock,
  ShoppingBag,
  MapPin,
  CheckCircle2,
  Sparkles,
  BookOpen,
  ArrowRight,
  Mic,
  Video,
  FileSpreadsheet,
  Award,
  Layers,
  Compass,
  MessageSquare,
  HelpCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useVLE } from '../context/VLEContext';
import { LEARNING_UNITS } from '../data/curriculumData';
import { AudioSpeechButton } from './AudioSpeechButton';
import { AudioRecorderModal } from './AudioRecorderModal';

export const LearningModules: React.FC = () => {
  const {
    selectedUnitId,
    setSelectedUnitId,
    setActiveSection,
    profile,
    completeTask,
    addXP
  } = useVLE();

  const [activeMoment, setActiveMoment] = useState<'presentation' | 'formative' | 'summative'>('presentation');
  const [showRecorderModal, setShowRecorderModal] = useState(false);
  const [personalConnection, setPersonalConnection] = useState('');
  const [savedPersonalConnection, setSavedPersonalConnection] = useState(false);

  // Active unit data
  const currentUnit = LEARNING_UNITS.find((u) => u.id === selectedUnitId) || LEARNING_UNITS[0];

  const handleSaveConnection = (e: React.FormEvent) => {
    e.preventDefault();
    if (personalConnection.trim()) {
      setSavedPersonalConnection(true);
      addXP(25, "Connected prior experience to unit");
    }
  };

  const getUnitIcon = (name: string) => {
    switch (name) {
      case 'Clock':
        return <Clock className="w-5 h-5 text-amber-400" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-5 h-5 text-emerald-400" />;
      case 'MapPin':
        return <MapPin className="w-5 h-5 text-cyan-400" />;
      default:
        return <BookOpen className="w-5 h-5 text-indigo-400" />;
    }
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Unit Selector Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
            Curriculum Sequence • Constructivist Learning Units
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">Interactive Learning Units</h2>
        </div>

        {/* 3 Unit Switcher Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {LEARNING_UNITS.map((unit) => {
            const isSelected = unit.id === selectedUnitId;
            return (
              <button
                key={unit.id}
                onClick={() => {
                  setSelectedUnitId(unit.id);
                  setSavedPersonalConnection(false);
                  setPersonalConnection('');
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 ring-2 ring-indigo-400/50'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {getUnitIcon(unit.iconName)}
                <span>Unit {unit.number}: {unit.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Unit Banner */}
      <div className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-r ${currentUnit.bannerGradient} border border-slate-800 backdrop-blur-xl mb-8 relative overflow-hidden`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/60 border border-white/10 text-xs font-bold text-white mb-3">
              <span>Unit {currentUnit.number}</span>
              <span className="w-1 h-1 rounded-full bg-indigo-400" />
              <span className="text-slate-300 font-normal">{currentUnit.subtitle}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">
              {currentUnit.title}
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              {currentUnit.realWorldConnection}
            </p>

            {/* Expected outcomes checklist */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Learning Outcomes:
              </span>
              {currentUnit.expectedOutcomes.map((outcome, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Constructivist Prior-Knowledge Activator Box */}
          <div className="w-full lg:w-96 p-5 rounded-2xl bg-slate-950/80 border border-indigo-500/30 shadow-xl">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wide mb-2">
              <Compass className="w-4 h-4" />
              <span>Connect to Your Life</span>
            </div>
            <p className="text-xs text-slate-300 italic mb-3">
              "{currentUnit.constructivistPrompt}"
            </p>

            {savedPersonalConnection ? (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300">
                <div className="font-bold flex items-center gap-1.5 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Prior Knowledge Connected!</span>
                </div>
                <p className="text-[11px] text-slate-300">"{personalConnection}"</p>
              </div>
            ) : (
              <form onSubmit={handleSaveConnection} className="space-y-2">
                <textarea
                  rows={2}
                  value={personalConnection}
                  onChange={(e) => setPersonalConnection(e.target.value)}
                  placeholder="Share your personal experience here..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
                <button
                  type="submit"
                  disabled={!personalConnection.trim()}
                  className="w-full py-2 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white transition cursor-pointer"
                >
                  Activate Knowledge (+25 XP)
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* 3-Moment Instructional Tabs */}
      <div className="flex items-center gap-2 mb-6 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveMoment('presentation')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeMoment === 'presentation'
              ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Video className="w-4 h-4 text-cyan-400" />
          <span>1. Presentation & Exploration</span>
        </button>

        <button
          onClick={() => setActiveMoment('formative')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeMoment === 'formative'
              ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Mic className="w-4 h-4 text-amber-400" />
          <span>2. Formative Practice Task</span>
        </button>

        <button
          onClick={() => setActiveMoment('summative')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeMoment === 'summative'
              ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Award className="w-4 h-4 text-emerald-400" />
          <span>3. Summative Project & Rubric</span>
        </button>
      </div>

      {/* MOMENT 1: PRESENTATION & STUDY MATERIALS */}
      {activeMoment === 'presentation' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentUnit.studyMaterials.map((material) => (
              <div
                key={material.id}
                className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[10px] font-bold uppercase tracking-wider">
                      {material.type}
                    </span>
                    <button
                      onClick={() => completeTask(material.id, 20)}
                      className={`text-[11px] font-semibold flex items-center gap-1 ${
                        profile.completedTasks.includes(material.id)
                          ? 'text-emerald-400'
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{profile.completedTasks.includes(material.id) ? 'Explored' : 'Mark Done'}</span>
                    </button>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2">{material.title}</h3>
                  <p className="text-xs text-slate-400 mb-4">{material.description}</p>

                  <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 mb-4 text-xs text-slate-300 leading-relaxed font-sans">
                    {material.content}
                  </div>

                  {/* Key Phrases with Audio Pronunciation */}
                  <div className="space-y-2 mb-4">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Authentic Phrases (Click to Listen):
                    </span>
                    {material.keyPhrases.map((phrase, pIdx) => (
                      <div
                        key={pIdx}
                        className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/30 flex items-center justify-between gap-3 transition"
                      >
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-white truncate">
                            {phrase.english}
                          </p>
                          <p className="text-[10px] text-slate-400 truncate">
                            {phrase.spanish} • <span className="text-cyan-400">{phrase.context}</span>
                          </p>
                        </div>
                        <AudioSpeechButton text={phrase.english} size="sm" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/80 text-[10px] text-slate-500 italic">
                  Ref: {material.attribution}
                </div>
              </div>
            ))}
          </div>

          {/* Quick jump to formative activity */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-950/40 to-slate-900 border border-indigo-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-white">Ready to put this into practice?</h4>
              <p className="text-xs text-slate-400">Test your speaking and language use in the low-stakes formative task.</p>
            </div>
            <button
              onClick={() => setActiveMoment('formative')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition cursor-pointer self-start sm:self-auto"
            >
              <span>Go to Formative Activity</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* MOMENT 2: FORMATIVE ACTIVITY */}
      {activeMoment === 'formative' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold">
              Formative Practice • Low-Stakes Feedback
            </span>
            <span className="text-xs text-slate-400 font-semibold">
              Estimated Time: {currentUnit.formativeTask.timeEstimate}
            </span>
          </div>

          <h3 className="text-2xl font-black text-white mb-3">
            {currentUnit.formativeTask.title}
          </h3>

          <p className="text-sm text-slate-300 leading-relaxed mb-6">
            {currentUnit.formativeTask.instructions}
          </p>

          {/* Requirements & Checklist */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 mb-6">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wide mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Activity Requirements:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {currentUnit.formativeTask.rubricRequirements.map((req, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{req}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action triggers */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setShowRecorderModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 transition cursor-pointer"
            >
              <Mic className="w-4 h-4" />
              <span>Launch Audio & Script Recorder</span>
            </button>

            <button
              onClick={() => setActiveSection('collab')}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs transition cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-cyan-400" />
              <span>View Classmates' Submissions in Forum</span>
            </button>
          </div>
        </div>
      )}

      {/* MOMENT 3: SUMMATIVE PRODUCTION & RUBRICS */}
      {activeMoment === 'summative' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
              Summative Final Product • Authentic Artifact
            </span>
            <span className="text-xs text-slate-400 font-semibold">
              Time: {currentUnit.summativeTask.timeEstimate}
            </span>
          </div>

          <h3 className="text-2xl font-black text-white mb-2">
            {currentUnit.summativeTask.title}
          </h3>

          <div className="inline-block px-3 py-1 rounded-xl bg-slate-800 text-cyan-300 text-xs font-semibold mb-4">
            Deliverable: {currentUnit.summativeTask.productType}
          </div>

          <p className="text-sm text-slate-300 leading-relaxed mb-6">
            {currentUnit.summativeTask.instructions}
          </p>

          {/* Rubric Matrix */}
          <div className="mb-6">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wide mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              Evaluation Rubric (100 Points Total):
            </h4>
            <div className="space-y-3">
              {currentUnit.summativeTask.rubricCriteria.map((crit, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <span className="text-xs font-bold text-white block mb-0.5">
                      {crit.category}
                    </span>
                    <span className="text-xs text-slate-400">
                      {crit.description}
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-extrabold whitespace-nowrap self-start sm:self-auto">
                    {crit.points} pts
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Launch to Creative Studio */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setActiveSection('creative')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 transition cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Create Artifact in Creative Studio</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveSection('tracker')}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs transition cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4 text-indigo-400" />
              <span>View Progress & Rubric Tracker</span>
            </button>
          </div>
        </div>
      )}

      {/* Audio Recorder Modal Trigger */}
      {showRecorderModal && (
        <AudioRecorderModal
          unitId={currentUnit.id}
          taskTitle={currentUnit.formativeTask.title}
          requirements={currentUnit.formativeTask.rubricRequirements}
          sampleStarter={currentUnit.formativeTask.sampleStarter}
          onClose={() => setShowRecorderModal(false)}
        />
      )}
    </div>
  );
};
