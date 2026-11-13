import { LearningUnit, Badge } from '../types';

export const COURSE_INFO = {
  title: "English in My World",
  subtitle: "Everyday Life, Everyday English",
  authors: ["Sebastian Meza", "Samuel Perez", "Juan Esteban"],
  targetAudience: "Teenagers aged 12 to 17 (English levels A1–A2 to B1)",
  pedagogy: "Constructivist & Task-Based Learning",
  rationale: "Middle school students encounter English in games, songs, social media, and travel, but need a pressure-free space to build functional English for everyday situations.",
  welcomeMessage: "Welcome to 'English in My World'! In this course you will use English the way you actually need it: to talk about your day, go shopping, and get around your town. Instead of memorizing boring grammar rules, you will practice through interactive media, real-life tasks, and creative projects you build yourself, sharing your work with classmates."
};

export const LEARNING_UNITS: LearningUnit[] = [
  {
    id: "unit-1",
    number: 1,
    title: "My Daily Routine",
    subtitle: "Routines, Habits, and The Present Simple",
    iconName: "Clock",
    bannerGradient: "from-amber-500/20 via-orange-500/10 to-amber-900/10",
    expectedOutcomes: [
      "Describe your own daily routine and habits with confidence using the present simple tense.",
      "Use time markers and frequency adverbs (at 6:30 AM, before school, usually, always, then) naturally.",
      "Compare your routine with a classmate's, identifying cultural and personal similarities and differences."
    ],
    realWorldConnection: "Teenagers across Colombia and the world start their mornings in different ways—some wake up at 5:30 AM for a morning bus, others prepare coffee, walk pets, or play video games after school. Connecting this to English gives you words to share your true everyday life with international friends or online gaming communities.",
    constructivistPrompt: "Think about your real weekday morning. What is the very first thing you do? How does your day compare to a friend who lives in another town?",
    reflectionPrompts: [
      "What new routine action did you learn to express in English today?",
      "Why do we add '-s' or '-es' when talking about our friend or sibling's routine (e.g., 'he wakes up')?",
      "How did viewing a classmate's daily schedule change how you think about your own time?"
    ],
    studyMaterials: [
      {
        id: "mat-1-1",
        title: "Video Infographic: A Teen's Day in Medellín & New York",
        type: "video",
        description: "Watch how 14-year-old Mateo in Colombia and 15-year-old Maya in Brooklyn organize their schedules.",
        content: "Mateo wakes up at 6:00 AM, eats arepa with hot chocolate for breakfast, and catches the bus to school. Maya takes the subway at 7:15 AM. Notice the present simple verbs used to express habitual actions!",
        keyPhrases: [
          { english: "I wake up at 6:00 AM every morning.", spanish: "Me despierto a las 6:00 AM cada mañana.", context: "Stating morning habit" },
          { english: "She always brushes her teeth before breakfast.", spanish: "Ella siempre se cepilla los dientes antes del desayuno.", context: "3rd person habit with frequency adverb" },
          { english: "Then, I catch the bus with my friends.", spanish: "Luego, tomo el autobús con mis amigos.", context: "Sequence connector" },
          { english: "In the afternoon, we do homework and play soccer.", spanish: "Por la tarde, hacemos la tarea y jugamos fútbol.", context: "Afternoon routine" }
        ],
        attribution: "Curated Web 2.0 educational video & infographic adaptation for teenage learners"
      },
      {
        id: "mat-1-2",
        title: "Visual Grammar Card: Present Simple & Time Connectors",
        type: "infographic",
        description: "Interactive visual cheat-sheet showing how sentences are constructed.",
        content: "Subject + Base Verb (+ s/es for he/she/it) + Time Expression. Example: 'I wake up at 7:00' vs 'My brother wakes up at 7:00'. Sequence words: First, Next, Then, After that, Finally.",
        keyPhrases: [
          { english: "First, I wash my face and get dressed.", spanish: "Primero, me lavo la cara y me visto.", context: "Step 1 of routine" },
          { english: "After that, we have lunch at the school cafeteria.", spanish: "Después de eso, almorzamos en la cafetería escolar.", context: "Step 2 of routine" },
          { english: "Finally, I go to bed around 10:00 PM.", spanish: "Finalmente, me voy a dormir alrededor de las 10:00 PM.", context: "Night habit" }
        ],
        attribution: "Constructivist Design adapted by Sebastian Meza, Samuel Perez, Juan Esteban"
      },
      {
        id: "mat-1-3",
        title: "Interactive Dialogue: Comparing Weekdays & Weekends",
        type: "dialogue",
        description: "Read and listen to a real conversation between two classmates discussing their morning energy.",
        content: "Liam: 'Hey Valentina! What time do you usually get up on Mondays?' Valentina: 'Ugh, so early! At 5:45 AM because my school starts at 7:00 AM. But on Sundays, I sleep in until 9:30 AM!' Liam: 'Lucky you! On Saturdays I have swimming practice at 8:00 AM.'",
        keyPhrases: [
          { english: "What time do you usually get up?", spanish: "¿A qué hora te levantas usualmente?", context: "Asking about routines" },
          { english: "I usually sleep in on weekends.", spanish: "Usualmente duermo hasta tarde los fines de semana.", context: "Weekend habit" }
        ],
        attribution: "Authentic youth conversation model (VLE English in My World)"
      }
    ],
    formativeTask: {
      id: "form-1",
      title: "'My Day' Audio/Text Journal Recording",
      timeEstimate: "15–20 min",
      instructions: "Construct a 1–2 minute recording or journal entry describing your daily routine. Use at least 8 present-simple action verbs (wake up, brush, eat, travel, study, relax, etc.) and at least 3 time expressions (at 6:30 AM, after school, then, usually).",
      rubricRequirements: [
        "Include at least 8 routine actions in present simple tense",
        "Use 3 or more time connectors (first, then, after that, at 7:00)",
        "Clear pronunciation and personal authenticity",
        "Share to the Unit 1 Collaborative Forum for peer exchange"
      ],
      sampleStarter: "Hello everyone! This is my daily routine in my town. First, I wake up at..."
    },
    summativeTask: {
      id: "summ-1",
      title: "Daily Schedule Comparison & Reflection Table",
      timeEstimate: "30–40 min",
      instructions: "Create a side-by-side Daily Schedule table comparing your typical day with a classmate's schedule from the forum. Write a 5-sentence analytical comparison paragraph highlighting 2 similarities and 2 differences.",
      productType: "Illustrated Schedule Matrix & Comparative Paragraph",
      rubricCriteria: [
        { category: "Language Accuracy (Present Simple & Connectors)", points: 30, description: "Correct verb forms for 1st person ('I') and 3rd person ('He/She')." },
        { category: "Task Completion & Comparison Table", points: 35, description: "Complete schedule matrix with times and at least 5 comparison sentences." },
        { category: "Critical Thinking & Reflection", points: 20, description: "Analyzes why routines differ (distance to school, family habits, hobbies)." },
        { category: "Constructivist Peer Interaction", points: 15, description: "Gives constructive, encouraging feedback on a classmate's post." }
      ]
    }
  },
  {
    id: "unit-2",
    number: 2,
    title: "Shopping and Money",
    subtitle: "Prices, Needs vs. Wants, and Functional Store English",
    iconName: "ShoppingBag",
    bannerGradient: "from-emerald-500/20 via-teal-500/10 to-emerald-900/10",
    expectedOutcomes: [
      "Carry out a fluid shopping dialogue in English: asking about prices, sizes, and colors.",
      "Differentiate and express 'wants' versus 'needs' using want/need/cost with authentic reasoning.",
      "Manage a simulated budget, calculate totals, and ask for discounts politely."
    ],
    realWorldConnection: "Whether buying clothes online, buying snacks at a convenience store, or purchasing games on digital platforms (Steam, PlayStation Store), money and shopping expressions give teenagers financial autonomy in English.",
    constructivistPrompt: "Imagine you received $50 USD (or equivalent 200,000 COP) for your birthday. How do you decide what you truly 'need' versus what you just 'want'?",
    reflectionPrompts: [
      "What is the difference in English between 'I need this jacket' and 'I want this hoodie'?",
      "Which question was easiest to practice: 'How much is this?' or 'Can I get a discount?'",
      "How did creating a shopping budget help you justify your spending choices?"
    ],
    studyMaterials: [
      {
        id: "mat-2-1",
        title: "Video Simulation: In The Street Market & Mall Store",
        type: "video",
        description: "Watch teenage shoppers interact with shopkeepers: asking prices, trying on sizes, and deciding between items.",
        content: "Customer: 'Excuse me, how much are these sneakers?' Clerk: 'They are $45 dollars. Would you like to try them on?' Customer: 'They look great, but I only have $40. Can I get a student discount?'",
        keyPhrases: [
          { english: "How much is this T-shirt? / How much are these shoes?", spanish: "¿Cuánto cuesta esta camiseta? / ¿Cuánto cuestan estos zapatos?", context: "Asking price for singular vs plural" },
          { english: "It costs $25 dollars. / They cost $60.", spanish: "Cuesta $25 dólares. / Cuestan $60.", context: "Stating prices" },
          { english: "I need school supplies, but I want a new gaming mouse.", spanish: "Necesito útiles escolares, pero quiero un nuevo ratón para juegos.", context: "Contrasting need vs want" },
          { english: "Do you have this in medium size or dark blue?", spanish: "¿Tiene esto en talla mediana o azul oscuro?", context: "Requesting variations" }
        ],
        attribution: "Curated youth store dialogue modeled after Cambridge English everyday situations"
      },
      {
        id: "mat-2-2",
        title: "Interactive Price List & Shopping Vocabulary Infographic",
        type: "infographic",
        description: "Interactive visual catalog of clothes, electronics, food, and common retail vocabulary.",
        content: "Categories: Clothes (hoodie, jeans, sneakers, jacket), Electronics (headphones, charger, phone case), School (backpack, notebook, pens). Useful verbs: buy, sell, pay, spend, afford, discount.",
        keyPhrases: [
          { english: "Can I pay in cash or with a card?", spanish: "¿Puedo pagar en efectivo o con tarjeta?", context: "Payment method" },
          { english: "That is a bit expensive, is there a cheaper option?", spanish: "Eso es un poco caro, ¿hay una opción más barata?", context: "Negotiating politely" }
        ],
        attribution: "Created by Sebastian Meza & team with Canva educational graphics"
      },
      {
        id: "mat-2-3",
        title: "Authentic Audio Role-play: Bargaining & Budgeting",
        type: "dialogue",
        description: "Listen to Sophie and the thrift shop owner discussing vintage jackets.",
        content: "Sophie: 'Hi! I saw this denim jacket in the window. How much does it cost?' Seller: 'It's only $22. It's in perfect condition.' Sophie: 'I love it! I also need two retro pins. How much is the total?'",
        keyPhrases: [
          { english: "How much is the total, please?", spanish: "¿Cuánto es el total, por favor?", context: "Finalizing purchase" },
          { english: "Here is your change and receipt. Have a great day!", spanish: "Aquí está su cambio y recibo. ¡Que tenga un excelente día!", context: "Clerk closing phrase" }
        ],
        attribution: "VLE Everyday English Learning Library"
      }
    ],
    formativeTask: {
      id: "form-2",
      title: "'Let's Go Shopping' Role-Play Simulation",
      timeEstimate: "20 min",
      instructions: "Simulate a live shopping dialogue as a customer or shop clerk. Use at least 6 essential shopping expressions (asking price, stating cost, expressing need/want, inquiring about size/color, payment method, asking about discount). Record your dialogue or generate an interactive script.",
      rubricRequirements: [
        "Include at least 6 authentic shopping phrases",
        "Use correct question forms ('How much is...?', 'Do you have...?')",
        "Demonstrate polite negotiation and price exchange",
        "Post script or audio to the forum for peer critique"
      ],
      sampleStarter: "Clerk: Welcome to Youth Gear! Can I help you? Customer: Yes, I'm looking for..."
    },
    summativeTask: {
      id: "summ-2",
      title: "Illustrated 'Mini Shopping List' with Critical Justification",
      timeEstimate: "30–40 min",
      instructions: "Design an illustrated shopping list of 6–8 items within a $100 budget. For each item, specify item name, estimated price, and 2–3 sentences clearly justifying why you chose it: is it a 'need' or a 'want', and why?",
      productType: "Visual Budget Sheet & Justification Report",
      rubricCriteria: [
        { category: "Vocabulary & Language Use (want/need/cost)", points: 30, description: "Correct grammatical application of 'I need because...' and 'It costs...'." },
        { category: "Task Fulfillment & Budget Calculation", points: 35, description: "6 to 8 items with accurate arithmetic and realistic price estimates." },
        { category: "Critical Thinking & Prioritization", points: 20, description: "Clear, logical justification distinguishing necessity from personal desire." },
        { category: "Peer Commenting & Dialogue", points: 15, description: "Reviews another student's list and suggests an item swap." }
      ]
    }
  },
  {
    id: "unit-3",
    number: 3,
    title: "Getting Around Town",
    subtitle: "Places in Town, Prepositions of Place, and Giving Directions",
    iconName: "MapPin",
    bannerGradient: "from-cyan-500/20 via-blue-500/10 to-indigo-900/10",
    expectedOutcomes: [
      "Ask for and give clear step-by-step directions using spatial prepositions and imperative action verbs.",
      "Identify places in a municipality (bank, central park, library, bus terminal, cinema, bakery, hospital).",
      "Produce a guided mini-tour of your own neighborhood or hometown in English with an interactive map."
    ],
    realWorldConnection: "Tourism and international visitors frequently visit Colombian and Latin American cities and towns (Bogotá, Medellín, Cartagena, Villa de Leyva, Salento). Being able to give clear directions makes you a confident cultural ambassador in your community.",
    constructivistPrompt: "If a foreign tourist stopped you near the main square of your town asking how to reach the nearest bakery or bus station, what landmarks would you use to guide them?",
    reflectionPrompts: [
      "Which direction phrase did you find most useful: 'turn left', 'go straight', or 'it is across from'?",
      "How did creating a tour of your real town make the English vocabulary feel personal and relevant?",
      "What was the most challenging preposition of place to remember?"
    ],
    studyMaterials: [
      {
        id: "mat-3-1",
        title: "Video Guide: Navigating a City Like a Pro",
        type: "video",
        description: "Follow tourist Alex asking local teenagers how to get to the art museum and the metro station.",
        content: "Tourist: 'Excuse me, could you tell me how to get to the Central Library?' Teen: 'Sure! Walk straight for two blocks on Bolivar Avenue, then turn right at the traffic lights. It's next to the post office, opposite the park!'",
        keyPhrases: [
          { english: "Excuse me, where is the nearest bus stop?", spanish: "Disculpe, ¿dónde queda la parada de autobús más cercana?", context: "Polite question" },
          { english: "Go straight ahead for two blocks.", spanish: "Siga derecho por dos cuadras.", context: "Direction instruction" },
          { english: "Turn left at the corner onto Green Street.", spanish: "Gire a la izquierda en la esquina hacia la calle Green.", context: "Turning instruction" },
          { english: "It is between the supermarket and the bookstore.", spanish: "Está entre el supermercado y la librería.", context: "Preposition 'between'" },
          { english: "It is across from the main park.", spanish: "Queda frente al parque principal.", context: "Preposition 'across from / opposite'" }
        ],
        attribution: "Video demonstration curated by Samuel Perez & Sebastian Meza"
      },
      {
        id: "mat-3-2",
        title: "Interactive Town Map Template & Prepositions Guide",
        type: "interactive",
        description: "Interactive town grid showing key locations, compass points, and prepositions of place.",
        content: "Prepositions of Place: next to, behind, in front of, between, opposite, on the corner of. Direction Verbs: go straight, turn left, turn right, cross the street, take the bus.",
        keyPhrases: [
          { english: "Cross the street at the pedestrian zebra.", spanish: "Cruce la calle por el paso de cebra peatonal.", context: "Pedestrian safety" },
          { english: "You will see a large yellow church on your right.", spanish: "Verá una gran iglesia amarilla a su derecha.", context: "Landmark confirmation" }
        ],
        attribution: "Designed for Colombian secondary school geography integration"
      },
      {
        id: "mat-3-3",
        title: "Audio Story: Giving Directions to a Lost Exchange Student",
        type: "dialogue",
        description: "Listen to an exchange student find their way from the train station to their host school.",
        content: "Exchange Student: 'I am at the north exit of the station. Where do I go?' Guide: 'Don't worry! Exit the station, cross San Martin street, and walk past the bakery. Your school is right behind the sports field!'",
        keyPhrases: [
          { english: "You can't miss it!", spanish: "¡No tiene pérdida! / ¡Es imposible no verlo!", context: "Reassurance" },
          { english: "Take bus line 14 towards downtown.", spanish: "Tome la línea de autobús 14 hacia el centro.", context: "Public transit advice" }
        ],
        attribution: "Authentic audio dialogue (VLE Project)"
      }
    ],
    formativeTask: {
      id: "form-3",
      title: "'Find the Way' Map Route Challenge",
      timeEstimate: "20 min",
      instructions: "Using the interactive municipality map or a map of your real hometown, write or record step-by-step directions from point A (e.g. Town Square) to point B (e.g. Market or Youth Park). Include at least 5 direction expressions and 2 prepositions of place.",
      rubricRequirements: [
        "Include at least 5 direction expressions (turn left, go straight, cross, etc.)",
        "Use at least 2 prepositions of place (next to, between, across from)",
        "Accurate landmark references and clear sequence",
        "Submit route to the forum for peer verification"
      ],
      sampleStarter: "To get from the Central Park to the Art Cinema, first go straight on..."
    },
    summativeTask: {
      id: "summ-3",
      title: "'My Neighborhood Tour' Interactive Mini-Tour Guide",
      timeEstimate: "30–40 min",
      instructions: "Create a guided mini-tour of your neighborhood or town in English. Select at least 4 favorite places (e.g., your favorite cafe, park, sports court, landmark). Write 6–8 sentences describing each place, why it matters, and how someone can walk or travel there.",
      productType: "Illustrated Guided Mini-Tour with Map Pins & Narration",
      rubricCriteria: [
        { category: "Language Precision (Directions & Places)", points: 30, description: "Correct imperative direction verbs and accurate prepositions of place." },
        { category: "Content Depth & Cultural Context", points: 35, description: "Describes at least 4 authentic places with cultural or personal significance." },
        { category: "Creative Presentation & Usability", points: 20, description: "Clear navigation layout, photos/markers, and engaging guide tone." },
        { category: "Constructivist Peer Feedback", points: 15, description: "Leaves comments or asks a curious question on a classmate's tour." }
      ]
    }
  }
];

export const ALL_BADGES: Badge[] = [
  {
    id: "badge-first-step",
    title: "Adventure Pioneer",
    description: "Welcome to the VLE! Began your constructivist English journey.",
    category: "Discovery",
    icon: "Compass"
  },
  {
    id: "badge-routine-master",
    title: "Routine Architect",
    description: "Completed the Unit 1 'My Day' formative task with present simple mastery.",
    category: "Mastery",
    icon: "Clock"
  },
  {
    id: "badge-budget-boss",
    title: "Smart Shopper",
    description: "Mastered prices, wants vs needs, and simulated a store purchase in Unit 2.",
    category: "Creation",
    icon: "ShoppingBag"
  },
  {
    id: "badge-town-guide",
    title: "City Pathfinder",
    description: "Designed a guided mini-tour of your neighborhood with accurate directions.",
    category: "Mastery",
    icon: "MapPin"
  },
  {
    id: "badge-peer-supporter",
    title: "Peer Mentor",
    description: "Left thoughtful, constructive feedback on 2 classmates' projects in the forum.",
    category: "Collaboration",
    icon: "MessageSquareHeart"
  },
  {
    id: "badge-game-champion",
    title: "Quest Champion",
    description: "Successfully solved the Market and Town Mystery interactive challenges.",
    category: "Discovery",
    icon: "Trophy"
  },
  {
    id: "badge-comic-author",
    title: "Storyteller",
    description: "Created an original English comic strip in the Creative Corner.",
    category: "Creation",
    icon: "Sparkles"
  },
  {
    id: "badge-deep-thinker",
    title: "Reflective Mind",
    description: "Completed your metacognitive reflection journal reflecting on what you constructed.",
    category: "Discovery",
    icon: "BookOpenCheck"
  }
];

export const WEEKLY_MISSIONS: {
  id: string;
  title: string;
  description: string;
  category: 'daily' | 'weekly' | 'constructivist';
  xpReward: number;
  badgeReward?: string;
  actionSection: 'modules' | 'games' | 'collab' | 'creative' | 'tracker';
}[] = [
  {
    id: "mission-1",
    title: "The Morning Routine Log",
    description: "Listen to Unit 1 dialogue and record or write your morning routine with at least 5 verbs.",
    category: "daily",
    xpReward: 80,
    badgeReward: "badge-routine-master",
    actionSection: "modules"
  },
  {
    id: "mission-2",
    title: "Market Master Challenge",
    description: "Play the Shopping Checkout challenge and successfully budget under $50.",
    category: "daily",
    xpReward: 70,
    badgeReward: "badge-game-champion",
    actionSection: "games"
  },
  {
    id: "mission-3",
    title: "Peer Reviewer Extraordinaire",
    description: "Read a classmate's daily routine or shopping list in the forum and write a constructive comment.",
    category: "weekly",
    xpReward: 100,
    badgeReward: "badge-peer-supporter",
    actionSection: "collab"
  },
  {
    id: "mission-4",
    title: "Town Tour Cartographer",
    description: "Pin 4 local spots in the Creative Corner Mini-Tour Builder and write direction steps.",
    category: "weekly",
    xpReward: 120,
    badgeReward: "badge-town-guide",
    actionSection: "creative"
  },
  {
    id: "mission-5",
    title: "Metacognitive Reflection",
    description: "Write your weekly entry in the Progress Tracker reflecting on how you connect English to your life.",
    category: "constructivist",
    xpReward: 90,
    badgeReward: "badge-deep-thinker",
    actionSection: "tracker"
  }
];
