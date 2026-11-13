import { ForumPost } from '../types';

export const INITIAL_FORUM_POSTS: ForumPost[] = [
  {
    id: "post-1",
    unitId: "unit-1",
    category: "unit1",
    title: "My School Morning Routine in Envigado (Comparing with NYC)",
    author: "Mateo Restrepo",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    role: "student",
    timestamp: "2 hours ago",
    content: "Hi everyone! Here is my Unit 1 schedule. First, I wake up at 5:30 AM because my school starts at 6:45 AM. I eat an arepa with melted cheese and drink hot chocolate. Then, I brush my teeth and catch the feeder bus with my friend Camilo. In the afternoon, I always do my math homework first, and then I play basketball at the neighborhood court at 4:30 PM. Finally, I play Minecraft for an hour and sleep around 9:45 PM. What do you think?",
    tags: ["Unit1", "DailyRoutine", "PresentSimple", "MorningHabits"],
    likes: 6,
    replies: [
      {
        id: "rep-1-1",
        author: "Sofía Calderón",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
        role: "student",
        timestamp: "1 hour ago",
        content: "Great job Mateo! I really like how you used 'First', 'Then', and 'Finally' to connect your actions. In Bogotá, I wake up at 6:00 AM because my school is closer. Question: Do you always walk to the court or take your bike?",
        likes: 3
      },
      {
        id: "rep-1-2",
        author: "Teacher Elena",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
        role: "teacher",
        timestamp: "30 minutes ago",
        content: "Excellent use of time markers, Mateo! Your present simple verbs ('wake up', 'eat', 'catch', 'do') are spotless. Notice how you said 'I always do my homework'—great placement of the frequency adverb right before the main verb. Can someone compare their afternoon routine with Mateo's?",
        likes: 5
      }
    ]
  },
  {
    id: "post-2",
    unitId: "unit-2",
    category: "unit2",
    title: "My $75 School Shopping List: Needs vs Wants Challenge",
    author: "Camila Vargas",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    role: "student",
    timestamp: "5 hours ago",
    content: "Hey guys! Here is my Unit 2 summative project draft. I had a $100 budget and spent $78:\n1. Ergonomic Backpack: $35 -> NEED: My old bag broke and hurts my back.\n2. Set of Pastel Highlighters: $8 -> NEED: I organize my science summaries with colors.\n3. Water Bottle (Insulated): $15 -> NEED: I drink water during soccer practice.\n4. Anime Keychain: $5 -> WANT: It looks cool on my bag, but I don't need it to survive!\n5. Retro Graphic T-shirt: $15 -> WANT: I already have clothes, but I love the vintage art.\nTotal = $78. Saved = $22! Would you change any item?",
    tags: ["Unit2", "ShoppingList", "NeedsVsWants", "Budgeting"],
    likes: 9,
    replies: [
      {
        id: "rep-2-1",
        author: "Lucas Gómez",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
        role: "student",
        timestamp: "3 hours ago",
        content: "I love your distinction! You justified the anime keychain honestly as a 'want'. In my list, I put headphones as a 'need' because I study with lo-fi beats, but my teacher might call that a 'want' haha!",
        likes: 4
      }
    ]
  },
  {
    id: "post-3",
    unitId: "unit-3",
    category: "unit3",
    title: "Guided Tour: Secret Spots in Villa de Leyva",
    author: "Lucas Gómez",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    role: "student",
    timestamp: "Yesterday",
    content: "Welcome to my hometown mini-tour! If you visit Villa de Leyva, here is how to find the coolest spots:\nStart at the Main Plaza (the giant cobblestone square). Walk west past the church for two blocks, then turn left onto Calle 13. Opposite the bakery, you will find 'El Claustro' cultural center. Behind the museum, there is an artisanal ice cream shop with exotic Colombian fruits (guava and passion fruit). You can't miss it! What places would you add?",
    tags: ["Unit3", "TownTour", "Directions", "PrepositionsOfPlace"],
    likes: 12,
    replies: [
      {
        id: "rep-3-1",
        author: "Valentina Ortiz",
        avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80",
        role: "student",
        timestamp: "Yesterday",
        content: "Wow Lucas, I visited Villa de Leyva with my family last December! Your directions are super easy to follow. Using 'opposite the bakery' and 'behind the museum' makes the route so clear. Five stars for your tour!",
        likes: 5
      }
    ]
  }
];

export const CONSTRUCTIVIST_SENTENCE_STARTERS = [
  "I really liked how you explained...",
  "In my hometown/routine, we usually...",
  "To make your sentence even more accurate, you could say...",
  "One question I have about your project is...",
  "Do you think that item is a true 'need' or more of a 'want' because...",
  "Your direction instructions were very clear because you used..."
];
