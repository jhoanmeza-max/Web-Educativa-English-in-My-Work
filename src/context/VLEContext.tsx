import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  StudentProfile,
  ForumPost,
  CreativeProject,
  ReflectionEntry,
  Mission
} from '../types';
import { INITIAL_FORUM_POSTS } from '../data/initialForumData';
import { WEEKLY_MISSIONS } from '../data/curriculumData';

export type NavSection = 'welcome' | 'modules' | 'games' | 'collab' | 'creative' | 'missions' | 'tracker';

interface VLEContextType {
  profile: StudentProfile;
  activeSection: NavSection;
  setActiveSection: (sec: NavSection) => void;
  selectedUnitId: string;
  setSelectedUnitId: (unitId: string) => void;
  forumPosts: ForumPost[];
  creativeProjects: CreativeProject[];
  reflections: ReflectionEntry[];
  missions: Mission[];
  addXP: (amount: number, reason?: string) => void;
  unlockBadge: (badgeId: string) => void;
  completeTask: (taskId: string, xpReward?: number) => void;
  createForumPost: (post: {
    unitId?: string;
    category: 'unit1' | 'unit2' | 'unit3' | 'general' | 'showcase';
    title: string;
    content: string;
    tags: string[];
    attachedProject?: any;
  }) => void;
  replyToPost: (postId: string, content: string) => void;
  toggleLikePost: (postId: string) => void;
  saveCreativeProject: (project: {
    type: 'comic' | 'town-tour' | 'shopping-list';
    title: string;
    data: any;
    publishedToForum?: boolean;
  }) => string;
  addReflection: (entry: {
    unitId: string;
    newDiscovery: string;
    connectionToLife: string;
    challengesFaced: string;
    nextGoal: string;
  }) => void;
  updateProfile: (updates: Partial<StudentProfile>) => void;
  triggerConfetti: () => void;
  speakText: (text: string) => void;
  toastMessage: string | null;
  setToastMessage: (msg: string | null) => void;
}

const DEFAULT_PROFILE: StudentProfile = {
  name: "Alex Rios",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
  level: "A2 (Explorer)",
  hometown: "Medellín, Colombia",
  xp: 240,
  streakDays: 4,
  completedTasks: ["mat-1-1", "mat-1-2"],
  badges: ["badge-first-step"],
  joinedDate: "October 2026"
};

const VLEContext = createContext<VLEContextType | undefined>(undefined);

export const VLEProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem('vle_student_profile');
      return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  const [activeSection, setActiveSection] = useState<NavSection>('welcome');
  const [selectedUnitId, setSelectedUnitId] = useState<string>('unit-1');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [forumPosts, setForumPosts] = useState<ForumPost[]>(() => {
    try {
      const saved = localStorage.getItem('vle_forum_posts');
      return saved ? JSON.parse(saved) : INITIAL_FORUM_POSTS;
    } catch {
      return INITIAL_FORUM_POSTS;
    }
  });

  const [creativeProjects, setCreativeProjects] = useState<CreativeProject[]>(() => {
    try {
      const saved = localStorage.getItem('vle_creative_projects');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [reflections, setReflections] = useState<ReflectionEntry[]>(() => {
    try {
      const saved = localStorage.getItem('vle_reflections');
      return saved ? JSON.parse(saved) : [
        {
          id: "refl-sample",
          unitId: "unit-1",
          date: "Yesterday",
          newDiscovery: "I discovered that frequency adverbs like 'usually' and 'always' go before the main verb, but after 'to be'.",
          connectionToLife: "I can now chat with international gaming friends on Discord and explain what time I hop online.",
          challengesFaced: "Remembering to add '-s' to verbs when describing my sister's morning schedule.",
          nextGoal: "Complete the shopping list challenge and role-play a bargaining dialogue!"
        }
      ];
    } catch {
      return [];
    }
  });

  const [missions, setMissions] = useState<Mission[]>(() => {
    return WEEKLY_MISSIONS.map(m => ({
      ...m,
      progress: profile.completedTasks.includes(m.id) ? 100 : 0,
      completed: profile.completedTasks.includes(m.id)
    }));
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('vle_student_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('vle_forum_posts', JSON.stringify(forumPosts));
  }, [forumPosts]);

  useEffect(() => {
    localStorage.setItem('vle_creative_projects', JSON.stringify(creativeProjects));
  }, [creativeProjects]);

  useEffect(() => {
    localStorage.setItem('vle_reflections', JSON.stringify(reflections));
  }, [reflections]);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#38bdf8']
      });
    } catch {
      // fallback
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => prev === msg ? null : prev);
    }, 3500);
  };

  const addXP = (amount: number, reason?: string) => {
    setProfile(prev => {
      const newXp = prev.xp + amount;
      let newLevel = prev.level;
      if (newXp >= 600) newLevel = "B1 (Fluent Pathfinder)";
      else if (newXp >= 350) newLevel = "A2+ (Urban Navigator)";
      else if (newXp >= 150) newLevel = "A2 (Explorer)";
      return { ...prev, xp: newXp, level: newLevel };
    });
    showToast(`+${amount} XP! ${reason ? `(${reason})` : ''} 🚀`);
  };

  const unlockBadge = (badgeId: string) => {
    if (!profile.badges.includes(badgeId)) {
      setProfile(prev => ({
        ...prev,
        badges: [...prev.badges, badgeId]
      }));
      triggerConfetti();
      showToast(`🏆 Badge Unlocked: New Achievement in your Trophy Showcase!`);
    }
  };

  const completeTask = (taskId: string, xpReward = 50) => {
    if (!profile.completedTasks.includes(taskId)) {
      setProfile(prev => ({
        ...prev,
        completedTasks: [...prev.completedTasks, taskId]
      }));
      addXP(xpReward, "Task completed");
      triggerConfetti();
    }
  };

  const createForumPost = (postData: {
    unitId?: string;
    category: 'unit1' | 'unit2' | 'unit3' | 'general' | 'showcase';
    title: string;
    content: string;
    tags: string[];
    attachedProject?: any;
  }) => {
    const newPost: ForumPost = {
      id: `post-${Date.now()}`,
      unitId: postData.unitId,
      category: postData.category,
      title: postData.title,
      author: profile.name,
      avatar: profile.avatar,
      role: 'student',
      timestamp: 'Just now',
      content: postData.content,
      tags: postData.tags,
      attachedProject: postData.attachedProject,
      likes: 1,
      replies: []
    };

    setForumPosts(prev => [newPost, ...prev]);
    addXP(40, "Shared constructive project in forum");
    unlockBadge("badge-peer-supporter");
    showToast("🎉 Your post is live on the Class Forum!");
  };

  const replyToPost = (postId: string, content: string) => {
    const newReply = {
      id: `rep-${Date.now()}`,
      author: profile.name,
      avatar: profile.avatar,
      role: 'student' as const,
      timestamp: 'Just now',
      content,
      likes: 0
    };

    setForumPosts(prev =>
      prev.map(p =>
        p.id === postId ? { ...p, replies: [...p.replies, newReply] } : p
      )
    );
    addXP(25, "Constructive peer feedback given");
    unlockBadge("badge-peer-supporter");
    showToast("💬 Constructive peer feedback posted!");
  };

  const toggleLikePost = (postId: string) => {
    setForumPosts(prev =>
      prev.map(p =>
        p.id === postId ? { ...p, likes: p.likes + 1 } : p
      )
    );
  };

  const saveCreativeProject = (proj: {
    type: 'comic' | 'town-tour' | 'shopping-list';
    title: string;
    data: any;
    publishedToForum?: boolean;
  }) => {
    const id = `proj-${Date.now()}`;
    const newProject: CreativeProject = {
      id,
      type: proj.type,
      title: proj.title,
      author: profile.name,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      data: proj.data,
      publishedToForum: !!proj.publishedToForum
    };

    setCreativeProjects(prev => [newProject, ...prev]);
    addXP(60, `Created ${proj.type} project`);
    if (proj.type === 'comic') unlockBadge('badge-comic-author');
    if (proj.type === 'town-tour') unlockBadge('badge-town-guide');
    if (proj.type === 'shopping-list') unlockBadge('badge-budget-boss');

    if (proj.publishedToForum) {
      createForumPost({
        category: 'showcase',
        title: `Creative Project: ${proj.title}`,
        content: `I just created a ${proj.type} in the Creative Corner! Check it out and let me know your thoughts or suggestions.`,
        tags: ["CreativeCorner", proj.type, "StudentCreation"],
        attachedProject: {
          type: proj.type === 'comic' ? 'comic' : proj.type === 'town-tour' ? 'town-tour' : 'shopping-list',
          title: proj.title,
          data: proj.data
        }
      });
    }

    return id;
  };

  const addReflection = (entry: {
    unitId: string;
    newDiscovery: string;
    connectionToLife: string;
    challengesFaced: string;
    nextGoal: string;
  }) => {
    const newRefl: ReflectionEntry = {
      id: `refl-${Date.now()}`,
      date: 'Today',
      ...entry
    };
    setReflections(prev => [newRefl, ...prev]);
    addXP(50, "Metacognitive reflection logged");
    unlockBadge('badge-deep-thinker');
    showToast("🧠 Reflection saved to your Learning Portfolio!");
  };

  const updateProfile = (updates: Partial<StudentProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
    showToast("Profile updated!");
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <VLEContext.Provider
      value={{
        profile,
        activeSection,
        setActiveSection,
        selectedUnitId,
        setSelectedUnitId,
        forumPosts,
        creativeProjects,
        reflections,
        missions,
        addXP,
        unlockBadge,
        completeTask,
        createForumPost,
        replyToPost,
        toggleLikePost,
        saveCreativeProject,
        addReflection,
        updateProfile,
        triggerConfetti,
        speakText,
        toastMessage,
        setToastMessage
      }}
    >
      {children}
    </VLEContext.Provider>
  );
};

export const useVLE = () => {
  const context = useContext(VLEContext);
  if (!context) {
    throw new Error('useVLE must be used within a VLEProvider');
  }
  return context;
};
