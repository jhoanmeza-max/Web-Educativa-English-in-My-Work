import React, { useState, useRef, useEffect } from 'react';
import {
  Mic,
  Square,
  Play,
  RotateCcw,
  UploadCloud,
  X,
  Volume2,
  CheckCircle2,
  Sparkles,
  FileText
} from 'lucide-react';
import { useVLE } from '../context/VLEContext';

interface AudioRecorderModalProps {
  unitId: string;
  taskTitle: string;
  requirements: string[];
  sampleStarter: string;
  onClose: () => void;
  onSubmitSuccess?: () => void;
}

export const AudioRecorderModal: React.FC<AudioRecorderModalProps> = ({
  unitId,
  taskTitle,
  requirements,
  sampleStarter,
  onClose,
  onSubmitSuccess
}) => {
  const { createForumPost, addXP, unlockBadge } = useVLE();
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [writtenTranscript, setWrittenTranscript] = useState(sampleStarter);
  const [title, setTitle] = useState(`${taskTitle} Submission`);
  const [reflectionNote, setReflectionNote] = useState('');
  const [isTextFallback, setIsTextFallback] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startRecording = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setIsTextFallback(true);
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.warn("Microphone access denied or unavailable, switching to written audio-script mode", err);
      setIsTextFallback(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const resetRecording = () => {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
    setRecordingTime(0);
    setIsRecording(false);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins}:${rem < 10 ? '0' : ''}${rem}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Post to collaborative forum
    createForumPost({
      unitId,
      category: unitId === 'unit-1' ? 'unit1' : unitId === 'unit-2' ? 'unit2' : 'unit3',
      title: title || `${taskTitle} - Audio & Notes`,
      content: `${writtenTranscript}\n\nReflection Note: ${reflectionNote || 'Practiced speaking fluently using present simple and authentic context!'}`,
      tags: [unitId, "FormativeAudio", "StudentRecording", "VoicePractice"]
    });

    addXP(70, "Formative Speaking Task completed");
    if (unitId === 'unit-1') unlockBadge('badge-routine-master');
    if (unitId === 'unit-2') unlockBadge('badge-budget-boss');
    if (unitId === 'unit-3') unlockBadge('badge-town-guide');

    if (onSubmitSuccess) onSubmitSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-slate-900 border border-indigo-500/30 rounded-3xl max-w-xl w-full p-6 shadow-2xl relative my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-xl hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="p-3 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Mic className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
              Formative Speaking Lab
            </span>
            <h3 className="text-xl font-bold text-white">{taskTitle}</h3>
          </div>
        </div>

        {/* Rubric requirements checklist */}
        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 mb-5">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wide mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Checklist for this activity:
          </h4>
          <ul className="space-y-1.5">
            {requirements.map((req, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recording Visualizer & Controls */}
        <div className="p-6 rounded-2xl bg-slate-950 border border-indigo-500/20 flex flex-col items-center justify-center mb-5 relative overflow-hidden">
          {isRecording ? (
            <div className="flex flex-col items-center">
              <div className="relative mb-3">
                <div className="w-20 h-20 rounded-full bg-rose-500/20 flex items-center justify-center animate-ping absolute inset-0" />
                <div className="w-20 h-20 rounded-full bg-rose-600 flex items-center justify-center relative shadow-lg shadow-rose-500/40">
                  <Mic className="w-8 h-8 text-white animate-pulse" />
                </div>
              </div>
              <div className="text-2xl font-mono font-extrabold text-rose-400 mb-1">
                {formatTime(recordingTime)}
              </div>
              <span className="text-xs text-slate-400 animate-pulse">
                Recording your voice in English... Speak clearly!
              </span>
              <button
                type="button"
                onClick={stopRecording}
                className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg transition cursor-pointer"
              >
                <Square className="w-4 h-4 fill-white" />
                <span>Stop Recording</span>
              </button>
            </div>
          ) : audioUrl ? (
            <div className="w-full flex flex-col items-center">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-3">
                <CheckCircle2 className="w-5 h-5" />
                <span>Audio Captured Successfully ({formatTime(recordingTime)})</span>
              </div>
              <audio controls src={audioUrl} className="w-full max-w-md mb-4" />
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={resetRecording}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 transition cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Record Again</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-3">
                <Volume2 className="w-7 h-7" />
              </div>
              <p className="text-xs text-slate-300 max-w-sm mb-4">
                Click below to start recording your 1–2 minute spoken task, or use the transcript box to write your script!
              </p>
              <button
                type="button"
                onClick={startRecording}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition cursor-pointer"
              >
                <Mic className="w-4 h-4" />
                <span>Start Microphone Recording</span>
              </button>
            </div>
          )}
        </div>

        {/* Written Transcript & Reflection Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center justify-between">
              <span>Task Script / Written English Notes</span>
              <span className="text-[11px] text-indigo-400 font-normal">
                (Type or paste your spoken dialogue/schedule)
              </span>
            </label>
            <textarea
              rows={3}
              value={writtenTranscript}
              onChange={(e) => setWrittenTranscript(e.target.value)}
              required
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500"
              placeholder="Write your routine or shopping dialogue here..."
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              Personal Self-Reflection Note
            </label>
            <input
              type="text"
              value={reflectionNote}
              onChange={(e) => setReflectionNote(e.target.value)}
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              placeholder="e.g. It was tricky to pronounce 'usually' and 'always', but I feel more confident!"
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-800">
            <span className="text-[11px] text-slate-400">
              Awards <strong className="text-amber-400">+70 XP</strong> and shares with peers in forum
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition cursor-pointer"
              >
                <UploadCloud className="w-4 h-4" />
                <span>Submit to Forum & Earn XP</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
