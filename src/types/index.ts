/**
 * Core Types for the Constructivist Virtual Learning Environment (VLE)
 * "English in My World: Everyday Life, Everyday English"
 */

export interface StudentProfile {
  name: string;
  avatar: string;
  level: string; // A1, A2, B1
  hometown: string;
  xp: number;
  streakDays: number;
  completedTasks: string[];
  badges: string[];
  joinedDate: string;
}

export interface UnitResource {
  id: string;
  title: string;
  type: 'video' | 'infographic' | 'dialogue' | 'vocabulary' | 'interactive';
  description: string;
  content: string;
  keyPhrases: { english: string; spanish: string; context: string }[];
  attribution: string;
}

export interface FormativeTask {
  id: string;
  title: string;
  timeEstimate: string;
  instructions: string;
  rubricRequirements: string[];
  sampleStarter: string;
}

export interface SummativeTask {
  id: string;
  title: string;
  timeEstimate: string;
  instructions: string;
  productType: string;
  rubricCriteria: {
    category: string;
    points: number;
    description: string;
  }[];
}

export interface LearningUnit {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  iconName: string;
  bannerGradient: string;
  expectedOutcomes: string[];
  realWorldConnection: string;
  studyMaterials: UnitResource[];
  formativeTask: FormativeTask;
  summativeTask: SummativeTask;
  constructivistPrompt: string; // "Connect to your life"
  reflectionPrompts: string[];
}

export interface ForumReply {
  id: string;
  author: string;
  avatar: string;
  role: 'student' | 'teacher';
  content: string;
  timestamp: string;
  likes: number;
  badgeAwarded?: string;
}

export interface ForumPost {
  id: string;
  unitId?: string;
  category: 'unit1' | 'unit2' | 'unit3' | 'general' | 'showcase';
  title: string;
  author: string;
  avatar: string;
  role: 'student' | 'teacher';
  timestamp: string;
  content: string;
  attachedProject?: {
    type: 'routine-schedule' | 'shopping-list' | 'town-tour' | 'comic';
    title: string;
    data: any;
  };
  audioUrl?: string;
  likes: number;
  replies: ForumReply[];
  tags: string[];
}

export interface CreativeComicPanel {
  id: string;
  background: string;
  character: string;
  dialogue: string;
  speaker: string;
  expression: string;
}

export interface CreativeProject {
  id: string;
  type: 'comic' | 'town-tour' | 'shopping-list';
  title: string;
  author: string;
  createdAt: string;
  data: any;
  publishedToForum: boolean;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  category: 'daily' | 'weekly' | 'constructivist';
  xpReward: number;
  badgeReward?: string;
  progress: number; // 0 to 100
  completed: boolean;
  actionSection: 'modules' | 'games' | 'collab' | 'creative' | 'tracker';
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  category: 'Discovery' | 'Creation' | 'Collaboration' | 'Mastery';
  icon: string;
  unlockedAt?: string;
}

export interface ReflectionEntry {
  id: string;
  unitId: string;
  date: string;
  newDiscovery: string;
  connectionToLife: string;
  challengesFaced: string;
  nextGoal: string;
}
