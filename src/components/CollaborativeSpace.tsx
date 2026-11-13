import React, { useState } from 'react';
import {
  Users,
  MessageSquare,
  Heart,
  Send,
  Sparkles,
  PlusCircle,
  Tag,
  Award,
  Bookmark,
  Share2,
  X,
  MessageCircle,
  Clock,
  MapPin,
  ShoppingBag
} from 'lucide-react';
import { useVLE } from '../context/VLEContext';
import { CONSTRUCTIVIST_SENTENCE_STARTERS } from '../data/initialForumData';
import { AudioSpeechButton } from './AudioSpeechButton';

export const CollaborativeSpace: React.FC = () => {
  const {
    forumPosts,
    createForumPost,
    replyToPost,
    toggleLikePost,
    profile,
    addXP
  } = useVLE();

  const [activeTab, setActiveTab] = useState<'all' | 'unit1' | 'unit2' | 'unit3' | 'showcase'>('all');
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [replyInputs, setReplyInputs] = useState<{ [postId: string]: string }>({});

  // New Post Form State
  const [postTitle, setPostTitle] = useState('');
  const [postCategory, setPostCategory] = useState<'unit1' | 'unit2' | 'unit3' | 'general' | 'showcase'>('unit1');
  const [postContent, setPostContent] = useState('');
  const [postTags, setPostTags] = useState('Unit1, DailyRoutine, StudentVoice');

  // Collaborative Team Challenge State (Interactive co-writing)
  const [dialogueLines, setDialogueLines] = useState<
    { speaker: string; text: string; role: 'teen1' | 'teen2'; author: string }[]
  >([
    { speaker: 'Mateo (Medellín)', text: 'Hey guys! Where are you going this Saturday morning?', role: 'teen1', author: 'Mateo' },
    { speaker: 'Sofía (Bogotá)', text: 'I usually take the Transmilenio to the flea market at Usaquén to look for vintage books!', role: 'teen2', author: 'Sofía' },
    { speaker: 'Lucas (Tunja)', text: 'Awesome! How much does a vintage book usually cost there?', role: 'teen1', author: 'Lucas' }
  ]);
  const [newCollabLine, setNewCollabLine] = useState('');

  const filteredPosts = forumPosts.filter((post) => {
    if (activeTab === 'all') return true;
    return post.category === activeTab;
  });

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim() || !postContent.trim()) return;

    createForumPost({
      category: postCategory,
      title: postTitle,
      content: postContent,
      tags: postTags.split(',').map((t) => t.trim()).filter(Boolean)
    });

    setPostTitle('');
    setPostContent('');
    setShowNewPostModal(false);
  };

  const handleSendReply = (postId: string) => {
    const text = replyInputs[postId];
    if (!text || !text.trim()) return;

    replyToPost(postId, text);
    setReplyInputs((prev) => ({ ...prev, [postId]: '' }));
  };

  const handleInsertSentenceStarter = (postId: string, starter: string) => {
    setReplyInputs((prev) => ({
      ...prev,
      [postId]: (prev[postId] ? prev[postId] + ' ' : '') + starter + ' '
    }));
  };

  const handleAddCollabLine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCollabLine.trim()) return;

    setDialogueLines((prev) => [
      ...prev,
      {
        speaker: `${profile.name} (${profile.hometown.split(',')[0]})`,
        text: newCollabLine.trim(),
        role: prev.length % 2 === 0 ? 'teen1' : 'teen2',
        author: profile.name
      }
    ]);
    setNewCollabLine('');
    addXP(30, "Contributed line to Collaborative Team Challenge");
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
            Constructivist Community Hub • Vygotskian Social Learning
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">Collaborative Learning Space</h2>
          <p className="text-xs text-slate-400">
            Share your authentic tasks, compare routines with peers, and provide constructive feedback to classmates!
          </p>
        </div>

        <button
          onClick={() => setShowNewPostModal(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-indigo-600/20 transition cursor-pointer self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Forum Thread</span>
        </button>
      </div>

      {/* Collaborative Team Challenge Widget (Top Banner) */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-950/50 via-slate-900 to-purple-950/40 border border-indigo-500/30 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-500/20 text-indigo-400">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                Live Class Team Challenge
              </span>
              <h3 className="text-base font-bold text-white">Co-Write a Teen Weekend Dialogue</h3>
            </div>
          </div>
          <span className="text-xs text-slate-400">
            Topic: Saturday shopping & weekend plans using everyday English
          </span>
        </div>

        {/* Live script chain */}
        <div className="space-y-2.5 mb-4 max-h-48 overflow-y-auto pr-2">
          {dialogueLines.map((line, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-2xl text-xs flex items-start justify-between gap-3 ${
                line.role === 'teen1'
                  ? 'bg-slate-950/80 border border-slate-800'
                  : 'bg-indigo-950/40 border border-indigo-500/30 ml-4 sm:ml-8'
              }`}
            >
              <div>
                <span className="font-bold text-cyan-300 block mb-0.5">{line.speaker}:</span>
                <span className="text-slate-200">"{line.text}"</span>
              </div>
              <AudioSpeechButton text={line.text} size="sm" />
            </div>
          ))}
        </div>

        {/* Add line input */}
        <form onSubmit={handleAddCollabLine} className="flex gap-2">
          <input
            type="text"
            value={newCollabLine}
            onChange={(e) => setNewCollabLine(e.target.value)}
            placeholder="Add the next dialogue line (e.g. 'They cost around $15, and they have comic books too!')..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition cursor-pointer flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Contribute Line (+30 XP)</span>
          </button>
        </form>
      </div>

      {/* Forum Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'all'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          All Discussions ({forumPosts.length})
        </button>

        <button
          onClick={() => setActiveTab('unit1')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'unit1'
              ? 'bg-amber-600 text-white shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Unit 1: Routines & Schedules</span>
        </button>

        <button
          onClick={() => setActiveTab('unit2')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'unit2'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Unit 2: Shopping & Budgets</span>
        </button>

        <button
          onClick={() => setActiveTab('unit3')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'unit3'
              ? 'bg-cyan-600 text-white shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>Unit 3: Town Tours & Directions</span>
        </button>

        <button
          onClick={() => setActiveTab('showcase')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'showcase'
              ? 'bg-fuchsia-600 text-white shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Creative Showcase</span>
        </button>
      </div>

      {/* Forum Thread Cards */}
      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition"
          >
            {/* Post Header */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={post.avatar}
                  alt={post.author}
                  className="w-11 h-11 rounded-2xl object-cover ring-2 ring-indigo-500/30"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white">{post.author}</span>
                    {post.role === 'teacher' && (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        Teacher / Facilitator
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-500">{post.timestamp}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="hidden sm:flex flex-wrap gap-1.5">
                {post.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2 py-0.5 rounded-md bg-slate-800 text-[10px] font-semibold text-slate-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Post Body */}
            <h3 className="text-base sm:text-lg font-bold text-white mb-2">{post.title}</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line mb-4 font-sans">
              {post.content}
            </p>

            {/* Attached Project Card if any */}
            {post.attachedProject && (
              <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                      Attached Artifact: {post.attachedProject.type}
                    </span>
                    <h5 className="text-xs font-bold text-white">{post.attachedProject.title}</h5>
                  </div>
                </div>
                <span className="text-[10px] text-slate-400 bg-slate-900 px-2.5 py-1 rounded-lg">
                  Student Artifact
                </span>
              </div>
            )}

            {/* Post Action Buttons */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 mb-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => toggleLikePost(post.id)}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-rose-400 transition cursor-pointer"
                >
                  <Heart className="w-4 h-4 fill-rose-500/20 text-rose-400" />
                  <span>{post.likes} Likes</span>
                </button>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <MessageCircle className="w-4 h-4 text-cyan-400" />
                  <span>{post.replies.length} Peer Replies</span>
                </div>
              </div>

              <AudioSpeechButton text={post.content} size="sm" label="Read Aloud" />
            </div>

            {/* Existing Replies */}
            {post.replies.length > 0 && (
              <div className="space-y-3 mb-4 pl-4 sm:pl-6 border-l-2 border-indigo-500/20">
                {post.replies.map((reply) => (
                  <div key={reply.id} className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <img
                          src={reply.avatar}
                          alt={reply.author}
                          className="w-6 h-6 rounded-lg object-cover"
                        />
                        <span className="text-xs font-bold text-white">{reply.author}</span>
                        {reply.role === 'teacher' && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 font-bold">
                            Facilitator
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-500">{reply.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">{reply.content}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Constructivist Sentence Starters for Reply */}
            <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Click a constructive sentence starter to assist your feedback:
              </span>
              <div className="flex flex-wrap gap-1.5 mb-2.5">
                {CONSTRUCTIVIST_SENTENCE_STARTERS.map((starter, sIdx) => (
                  <button
                    key={sIdx}
                    onClick={() => handleInsertSentenceStarter(post.id, starter)}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 border border-slate-700/80 hover:border-indigo-400 transition cursor-pointer"
                  >
                    "{starter}"
                  </button>
                ))}
              </div>

              {/* Reply Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={replyInputs[post.id] || ''}
                  onChange={(e) =>
                    setReplyInputs((prev) => ({ ...prev, [post.id]: e.target.value }))
                  }
                  placeholder="Write a constructive peer comment or question..."
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
                <button
                  onClick={() => handleSendReply(post.id)}
                  disabled={!replyInputs[post.id]?.trim()}
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white font-bold text-xs transition cursor-pointer flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Reply</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Post Modal */}
      {showNewPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-indigo-500/30 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowNewPostModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-xl hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white mb-1">Create Class Forum Thread</h3>
            <p className="text-xs text-slate-400 mb-4">
              Share your schedule, shopping list, neighborhood tour, or ask classmates a question!
            </p>

            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Category / Unit</label>
                <select
                  value={postCategory}
                  onChange={(e: any) => setPostCategory(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="unit1">Unit 1: My Daily Routine</option>
                  <option value="unit2">Unit 2: Shopping & Money</option>
                  <option value="unit3">Unit 3: Getting Around Town</option>
                  <option value="showcase">Creative Project Showcase</option>
                  <option value="general">General Teen Lounge & English Questions</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Thread Title</label>
                <input
                  type="text"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  required
                  placeholder="e.g. My Weekday Schedule in Cali vs NY"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Your Post Content</label>
                <textarea
                  rows={4}
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  required
                  placeholder="Share your sentences, schedule table, questions, or ideas..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  value={postTags}
                  onChange={(e) => setPostTags(e.target.value)}
                  placeholder="DailyRoutine, PresentSimple, Shopping"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowNewPostModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold text-xs shadow-md shadow-indigo-600/30 transition cursor-pointer"
                >
                  Publish Post (+40 XP)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
