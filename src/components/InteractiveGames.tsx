import React, { useState } from 'react';
import {
  Gamepad2,
  ShoppingBag,
  MapPin,
  Clock,
  Sparkles,
  Trophy,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Volume2,
  ArrowRight,
  ShieldAlert,
  Coins,
  Compass,
  Check
} from 'lucide-react';
import { useVLE } from '../context/VLEContext';
import { AudioSpeechButton } from './AudioSpeechButton';

type ActiveGame = 'market' | 'town-mystery' | 'routine-scramble' | 'memory-match';

export const InteractiveGames: React.FC = () => {
  const { addXP, unlockBadge, triggerConfetti } = useVLE();
  const [activeGame, setActiveGame] = useState<ActiveGame>('market');

  // ==========================================
  // GAME 1: MARKET & STORE CHECKOUT CHALLENGE
  // ==========================================
  const STORE_ITEMS = [
    { id: 'item-1', name: 'Vintage Graphic Hoodie', category: 'Clothes', price: 28, type: 'want' },
    { id: 'item-2', name: 'School Ergonomic Backpack', category: 'School', price: 25, type: 'need' },
    { id: 'item-3', name: 'Noise-Cancelling Headphones', category: 'Electronics', price: 35, type: 'want' },
    { id: 'item-4', name: 'Pastel Highlighters & Notebook', category: 'School', price: 10, type: 'need' },
    { id: 'item-5', name: 'Insulated Metal Water Bottle', category: 'Everyday', price: 15, type: 'need' },
    { id: 'item-6', name: 'Skateboard Stickers Pack', category: 'Accessories', price: 6, type: 'want' },
  ];

  const [cart, setCart] = useState<string[]>(['item-2', 'item-4']);
  const [budget] = useState<number>(60);
  const [negotiatedDiscount, setNegotiatedDiscount] = useState<boolean>(false);
  const [checkoutComplete, setCheckoutComplete] = useState<boolean>(false);
  const [clerkPhrase, setClerkPhrase] = useState<string>("Hello! Welcome to Youth Gear. How can I help you today?");

  const totalCost = cart.reduce((sum, itemId) => {
    const item = STORE_ITEMS.find((i) => i.id === itemId);
    return sum + (item ? item.price : 0);
  }, 0) * (negotiatedDiscount ? 0.9 : 1.0);

  const toggleCartItem = (itemId: string) => {
    if (checkoutComplete) return;
    setCart((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const handleBargain = () => {
    if (!negotiatedDiscount) {
      setNegotiatedDiscount(true);
      setClerkPhrase("Sure! Since you are a student, I can give you a 10% discount on your entire cart!");
      addXP(20, "Practiced polite bargaining in English");
    }
  };

  const handleCheckout = () => {
    if (totalCost > budget) return;
    setCheckoutComplete(true);
    setClerkPhrase(`That comes to $${totalCost.toFixed(2)}. Here is your receipt and change. Have a great day!`);
    addXP(50, "Market Checkout completed within budget");
    unlockBadge('badge-budget-boss');
    triggerConfetti();
  };

  const resetMarket = () => {
    setCart(['item-2', 'item-4']);
    setNegotiatedDiscount(false);
    setCheckoutComplete(false);
    setClerkPhrase("Hello! Welcome to Youth Gear. How can I help you today?");
  };

  // ==========================================
  // GAME 2: TOWN MAP MYSTERY NAVIGATOR
  // ==========================================
  interface TownLandmark {
    id: string;
    name: string;
    x: number; // percentage
    y: number; // percentage
    description: string;
    isTarget?: boolean;
  }

  const LANDMARKS: TownLandmark[] = [
    { id: 'bus', name: 'Central Bus Terminal', x: 20, y: 75, description: 'Where regional feeder buses arrive.' },
    { id: 'plaza', name: 'Town Plaza & Fountain', x: 50, y: 50, description: 'Main square with colonial benches.' },
    { id: 'bakery', name: 'Artisan Bakery', x: 30, y: 35, description: 'Smells of fresh warm Colombian pan de bono.' },
    { id: 'school', name: 'High School', x: 75, y: 25, description: 'Classrooms and the soccer pitch.' },
    { id: 'library', name: 'Public Library', x: 70, y: 65, description: 'Quiet study rooms and computers.', isTarget: true },
    { id: 'cinema', name: 'Youth Cinema & Arcade', x: 85, y: 75, description: 'Where friends gather on Friday night.' },
    { id: 'market', name: 'Local Farmer Market', x: 25, y: 20, description: 'Fresh fruits like lulo and maracuyá.' }
  ];

  const [mysteryStep, setMysteryStep] = useState(0);
  const [mysterySolved, setMysterySolved] = useState(false);
  const [navigatorFeedback, setNavigatorFeedback] = useState<string | null>(null);

  const MYSTERY_CLUES = [
    {
      instruction: "Step 1: Start at the Central Bus Terminal. Head north along Bolívar Avenue for two blocks until you reach the Artisan Bakery.",
      targetId: "bakery",
      promptAudio: "Start at the Central Bus Terminal. Head north along Bolívar Avenue until you reach the Artisan Bakery."
    },
    {
      instruction: "Step 2: From the Bakery, cross the street to the east and pass through the Town Plaza & Fountain.",
      targetId: "plaza",
      promptAudio: "Cross the street to the east and pass through the Town Plaza and Fountain."
    },
    {
      instruction: "Step 3: Great! Now walk southeast from the Fountain. Find the building located between the Plaza and the Cinema, across from the sports field.",
      targetId: "library",
      promptAudio: "Walk southeast from the Fountain. The secret package is hidden inside the Public Library!"
    }
  ];

  const handleLandmarkClick = (landmark: TownLandmark) => {
    if (mysterySolved) return;
    const currentClue = MYSTERY_CLUES[mysteryStep];

    if (landmark.id === currentClue.targetId) {
      if (mysteryStep < MYSTERY_CLUES.length - 1) {
        setMysteryStep((prev) => prev + 1);
        setNavigatorFeedback(`Correct! You arrived at ${landmark.name}. Follow the next direction clue.`);
        addXP(20, "Navigated step successfully");
      } else {
        setMysterySolved(true);
        setNavigatorFeedback(`Mystery Solved! You found the secret exchange portfolio inside the Public Library!`);
        addXP(60, "Solved the Town Mystery Quest");
        unlockBadge('badge-game-champion');
        triggerConfetti();
      }
    } else {
      setNavigatorFeedback(`Not quite! That is the ${landmark.name}. Re-read the direction clue and look at the compass directions.`);
    }
  };

  const resetMystery = () => {
    setMysteryStep(0);
    setMysterySolved(false);
    setNavigatorFeedback(null);
  };

  // ==========================================
  // GAME 3: DAILY ROUTINE TIMELINE SCRAMBLE
  // ==========================================
  const ROUTINE_CARDS = [
    { id: 'r1', time: '06:00 AM', text: 'I wake up and wash my face', order: 1 },
    { id: 'r2', time: '06:30 AM', text: 'I eat breakfast (arepa with cheese)', order: 2 },
    { id: 'r3', time: '07:00 AM', text: 'I catch the bus to school', order: 3 },
    { id: 'r4', time: '01:30 PM', text: 'I return home and eat lunch', order: 4 },
    { id: 'r5', time: '04:30 PM', text: 'I do my homework and study English', order: 5 },
    { id: 'r6', time: '09:30 PM', text: 'I go to bed and sleep', order: 6 },
  ];

  const [scrambledSlots, setScrambledSlots] = useState<{ [slotIndex: number]: typeof ROUTINE_CARDS[0] | null }>({
    0: null, 1: null, 2: null, 3: null, 4: null, 5: null
  });
  const [availableCards, setAvailableCards] = useState<typeof ROUTINE_CARDS>([
    ROUTINE_CARDS[3],
    ROUTINE_CARDS[0],
    ROUTINE_CARDS[5],
    ROUTINE_CARDS[1],
    ROUTINE_CARDS[4],
    ROUTINE_CARDS[2],
  ]);
  const [scrambleComplete, setScrambleComplete] = useState(false);

  const placeCardInSlot = (card: typeof ROUTINE_CARDS[0], slotIdx: number) => {
    setScrambledSlots((prev) => ({ ...prev, [slotIdx]: card }));
    setAvailableCards((prev) => prev.filter((c) => c.id !== card.id));
  };

  const removeCardFromSlot = (slotIdx: number) => {
    const card = scrambledSlots[slotIdx];
    if (card) {
      setAvailableCards((prev) => [...prev, card]);
      setScrambledSlots((prev) => ({ ...prev, [slotIdx]: null }));
    }
  };

  const checkRoutineSequence = () => {
    let allCorrect = true;
    for (let i = 0; i < ROUTINE_CARDS.length; i++) {
      if (!scrambledSlots[i] || scrambledSlots[i]?.order !== i + 1) {
        allCorrect = false;
        break;
      }
    }
    if (allCorrect) {
      setScrambleComplete(true);
      addXP(50, "Completed Daily Timeline Scramble");
      unlockBadge('badge-routine-master');
      triggerConfetti();
    } else {
      alert("Some routine steps are out of order! Check the time sequence from morning to night.");
    }
  };

  const resetScramble = () => {
    setScrambledSlots({ 0: null, 1: null, 2: null, 3: null, 4: null, 5: null });
    setAvailableCards([
      ROUTINE_CARDS[3],
      ROUTINE_CARDS[0],
      ROUTINE_CARDS[5],
      ROUTINE_CARDS[1],
      ROUTINE_CARDS[4],
      ROUTINE_CARDS[2],
    ]);
    setScrambleComplete(false);
  };

  // ==========================================
  // GAME 4: VOCABULARY MEMORY PAIRS
  // ==========================================
  const MEMORY_CARDS = [
    { id: 1, pairId: 'a', text: 'Go straight', audio: 'Go straight' },
    { id: 2, pairId: 'a', text: 'Siga derecho', audio: 'Go straight' },
    { id: 3, pairId: 'b', text: 'Turn left', audio: 'Turn left' },
    { id: 4, pairId: 'b', text: 'Gire a la izquierda', audio: 'Turn left' },
    { id: 5, pairId: 'c', text: 'How much is it?', audio: 'How much is it?' },
    { id: 6, pairId: 'c', text: '¿Cuánto cuesta?', audio: 'How much is it?' },
    { id: 7, pairId: 'd', text: 'Across from', audio: 'Across from' },
    { id: 8, pairId: 'd', text: 'Frente a / opuesto', audio: 'Across from' },
    { id: 9, pairId: 'e', text: 'Next to', audio: 'Next to' },
    { id: 10, pairId: 'e', text: 'Al lado de', audio: 'Next to' },
    { id: 11, pairId: 'f', text: 'I wake up early', audio: 'I wake up early' },
    { id: 12, pairId: 'f', text: 'Me despierto temprano', audio: 'I wake up early' },
  ];

  const [memoryFlipped, setMemoryFlipped] = useState<number[]>([]);
  const [memoryMatched, setMemoryMatched] = useState<string[]>([]);

  const handleCardFlip = (card: typeof MEMORY_CARDS[0]) => {
    if (memoryFlipped.includes(card.id) || memoryMatched.includes(card.pairId)) return;
    if (memoryFlipped.length === 2) return;

    const newFlipped = [...memoryFlipped, card.id];
    setMemoryFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const card1 = MEMORY_CARDS.find((c) => c.id === newFlipped[0])!;
      const card2 = MEMORY_CARDS.find((c) => c.id === newFlipped[1])!;

      if (card1.pairId === card2.pairId) {
        setMemoryMatched((prev) => [...prev, card1.pairId]);
        setMemoryFlipped([]);
        addXP(15, "Matched memory pair");
        if (memoryMatched.length + 1 === 6) {
          addXP(50, "Mastered all memory pairs");
          unlockBadge('badge-game-champion');
          triggerConfetti();
        }
      } else {
        setTimeout(() => {
          setMemoryFlipped([]);
        }, 1100);
      }
    }
  };

  const resetMemory = () => {
    setMemoryFlipped([]);
    setMemoryMatched([]);
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
            Constructivist Learning through Play
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">Interactive Games & Quests</h2>
          <p className="text-xs text-slate-400">
            Experiment, test hypotheses, discover answers independently, and learn from mistakes without fear!
          </p>
        </div>

        {/* Game Switcher Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setActiveGame('market')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeGame === 'market'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 ring-2 ring-emerald-400/50'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>1. Market Checkout</span>
          </button>

          <button
            onClick={() => setActiveGame('town-mystery')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeGame === 'town-mystery'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-2 ring-cyan-400/50'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>2. Town Mystery Navigator</span>
          </button>

          <button
            onClick={() => setActiveGame('routine-scramble')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeGame === 'routine-scramble'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30 ring-2 ring-amber-400/50'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>3. Routine Timeline</span>
          </button>

          <button
            onClick={() => setActiveGame('memory-match')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeGame === 'memory-match'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 ring-2 ring-indigo-400/50'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <Gamepad2 className="w-4 h-4" />
            <span>4. Memory Pairs & Audio</span>
          </button>
        </div>
      </div>

      {/* GAME 1: MARKET CHECKOUT */}
      {activeGame === 'market' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Unit 2 Authentic Simulation
                </span>
                <span className="text-xs text-slate-400">Ages 12–17 Financial English</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">Market Master & Store Checkout</h3>
              <p className="text-xs text-slate-400">
                You have a $60 budget! Pick items, negotiate with the shop clerk, distinguish 'wants' vs 'needs', and complete checkout.
              </p>
            </div>

            {/* Budget status box */}
            <div className="flex items-center gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <Coins className="w-6 h-6 text-amber-400" />
              <div>
                <div className="text-xs text-slate-400 font-semibold">Your Wallet Budget</div>
                <div className="text-lg font-black text-white">${budget.toFixed(2)} USD</div>
              </div>
              <div className="h-8 w-px bg-slate-800 mx-1" />
              <div>
                <div className="text-xs text-slate-400 font-semibold">Cart Total</div>
                <div className={`text-lg font-black ${totalCost > budget ? 'text-rose-400' : 'text-emerald-400'}`}>
                  ${totalCost.toFixed(2)}
                </div>
              </div>
            </div>
          </div>

          {/* Interactive dialogue speech box with clerk */}
          <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 mb-6 flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="Clerk"
                className="w-10 h-10 rounded-xl object-cover ring-2 ring-indigo-400/40 mt-1"
              />
              <div>
                <div className="text-xs font-bold text-indigo-300">Youth Gear Shop Clerk</div>
                <p className="text-sm text-slate-200 italic mt-0.5">"{clerkPhrase}"</p>
              </div>
            </div>
            <AudioSpeechButton text={clerkPhrase} size="sm" />
          </div>

          {/* Store items catalog */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {STORE_ITEMS.map((item) => {
              const inCart = cart.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleCartItem(item.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    inCart
                      ? 'bg-emerald-950/30 border-emerald-500/50 shadow-md shadow-emerald-500/10'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase ${
                        item.type === 'need'
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                          : 'bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30'
                      }`}
                    >
                      {item.type.toUpperCase()}
                    </span>
                    <span className="text-sm font-black text-white">${item.price}</span>
                  </div>

                  <h4 className="text-sm font-bold text-white mb-1">{item.name}</h4>
                  <div className="text-xs text-slate-400 mb-3">{item.category}</div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
                    <span className={inCart ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                      {inCart ? '✓ In Cart' : '+ Add to Cart'}
                    </span>
                    <AudioSpeechButton text={`How much is the ${item.name}? It costs ${item.price} dollars.`} size="sm" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Checkout & Action Footer */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                disabled={negotiatedDiscount || checkoutComplete}
                onClick={handleBargain}
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 hover:bg-indigo-600/30 disabled:opacity-40 transition cursor-pointer"
              >
                {negotiatedDiscount ? '✓ 10% Discount Applied' : 'Ask: "Can I get a student discount?"'}
              </button>

              <button
                onClick={resetMarket}
                className="p-2.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
                title="Reset simulation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              {totalCost > budget && (
                <span className="text-xs text-rose-400 font-semibold flex items-center gap-1">
                  <ShieldAlert className="w-4 h-4" /> Over budget! Remove a 'want' item.
                </span>
              )}

              {checkoutComplete ? (
                <div className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Purchase Completed! (+50 XP)</span>
                </div>
              ) : (
                <button
                  disabled={totalCost > budget || cart.length === 0}
                  onClick={handleCheckout}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-40 text-slate-950 font-black text-xs shadow-lg transition cursor-pointer"
                >
                  Pay ${totalCost.toFixed(2)} & Complete Task
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* GAME 2: TOWN MYSTERY NAVIGATOR */}
      {activeGame === 'town-mystery' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  Unit 3 Directions & Map
                </span>
                <span className="text-xs text-slate-400">Real-World Spatial English</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">Town Map Mystery Navigator</h3>
              <p className="text-xs text-slate-400">
                Follow the English directional clues on the interactive grid to locate the hidden exchange package!
              </p>
            </div>

            <button
              onClick={resetMystery}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 transition cursor-pointer self-start lg:self-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restart Clues</span>
            </button>
          </div>

          {/* Current Clue Banner */}
          <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 mb-6 flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 shrink-0 mt-0.5">
                <Compass className="w-5 h-5 animate-spin-slow" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-300">
                  Clue #{mysteryStep + 1} of {MYSTERY_CLUES.length}
                </span>
                <p className="text-sm font-semibold text-white mt-0.5">
                  {MYSTERY_CLUES[mysteryStep].instruction}
                </p>
                {navigatorFeedback && (
                  <p className="text-xs text-cyan-300 font-medium mt-1">
                    {navigatorFeedback}
                  </p>
                )}
              </div>
            </div>
            <AudioSpeechButton text={MYSTERY_CLUES[mysteryStep].promptAudio} size="sm" />
          </div>

          {/* Interactive Town Map Canvas */}
          <div className="relative w-full h-[380px] rounded-3xl bg-slate-950 border border-slate-800 overflow-hidden mb-6 p-4">
            {/* Grid streets background */}
            <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]" />
            <div className="absolute top-1/2 left-0 right-0 h-10 -translate-y-1/2 bg-slate-900/60 border-y border-dashed border-slate-700/60 flex items-center justify-around text-[10px] text-slate-600 font-mono">
              <span>◄ Bolívar Avenue (West)</span>
              <span>Bolívar Avenue (East) ►</span>
            </div>
            <div className="absolute left-1/2 top-0 bottom-0 w-10 -translate-x-1/2 bg-slate-900/60 border-x border-dashed border-slate-700/60 flex flex-col justify-around text-[9px] text-slate-600 font-mono text-center">
              <span>▲ North</span>
              <span>▼ South</span>
            </div>

            {/* Landmark Pins */}
            {LANDMARKS.map((lm) => {
              const isTargetStep = lm.id === MYSTERY_CLUES[mysteryStep].targetId;
              return (
                <div
                  key={lm.id}
                  onClick={() => handleLandmarkClick(lm)}
                  style={{ left: `${lm.x}%`, top: `${lm.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 p-3 rounded-2xl cursor-pointer transition-all duration-300 flex flex-col items-center group ${
                    isTargetStep
                      ? 'scale-110 ring-2 ring-cyan-400 bg-cyan-950/80 shadow-lg shadow-cyan-500/30'
                      : 'bg-slate-900/90 hover:bg-slate-800 hover:scale-105 border border-slate-700/80'
                  }`}
                >
                  <MapPin className={`w-5 h-5 ${isTargetStep ? 'text-cyan-400 animate-bounce' : 'text-slate-400 group-hover:text-white'}`} />
                  <span className="text-[11px] font-extrabold text-white text-center whitespace-nowrap mt-1">
                    {lm.name}
                  </span>
                  <span className="text-[9px] text-slate-400 hidden group-hover:block max-w-[120px] text-center">
                    {lm.description}
                  </span>
                </div>
              );
            })}
          </div>

          {mysterySolved && (
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Congratulations! You mastered directions and prepositions in this quest!</span>
              </div>
              <button
                onClick={resetMystery}
                className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-lg"
              >
                Play Again
              </button>
            </div>
          )}
        </div>
      )}

      {/* GAME 3: ROUTINE TIMELINE SCRAMBLE */}
      {activeGame === 'routine-scramble' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  Unit 1 Present Simple
                </span>
                <span className="text-xs text-slate-400">Order Daily Habits Chronologically</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">Daily Routine Timeline Scramble</h3>
              <p className="text-xs text-slate-400">
                Place the routine actions into the timeline slots in proper chronological order from morning to bedtime.
              </p>
            </div>

            <button
              onClick={resetScramble}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 transition cursor-pointer self-start sm:self-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Cards</span>
            </button>
          </div>

          {/* Timeline Slots */}
          <div className="space-y-3 mb-8">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wide">
              Timeline Slots (Click a card below, then place here):
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {ROUTINE_CARDS.map((target, idx) => {
                const assigned = scrambledSlots[idx];
                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border transition-all ${
                      assigned
                        ? 'bg-slate-900/90 border-indigo-500/40'
                        : 'bg-slate-950/60 border-dashed border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-amber-400">
                        Slot #{idx + 1} ({target.time})
                      </span>
                      {assigned && (
                        <button
                          onClick={() => removeCardFromSlot(idx)}
                          className="text-[10px] text-slate-400 hover:text-rose-400"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    {assigned ? (
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-semibold text-white">{assigned.text}</span>
                        <AudioSpeechButton text={assigned.text} size="sm" />
                      </div>
                    ) : (
                      <div className="text-xs text-slate-600 italic py-2">
                        Empty slot. Select an action below.
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Available Cards Bank */}
          <div className="mb-6">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wide mb-3">
              Available Routine Action Cards:
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {availableCards.map((card) => (
                <button
                  key={card.id}
                  onClick={() => {
                    // Find first empty slot
                    const emptyIdx = Object.keys(scrambledSlots).find(
                      (k) => scrambledSlots[Number(k)] === null
                    );
                    if (emptyIdx !== undefined) {
                      placeCardInSlot(card, Number(emptyIdx));
                    }
                  }}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 hover:border-indigo-400 transition cursor-pointer flex items-center gap-2"
                >
                  <span>{card.text}</span>
                  <span className="text-[10px] text-amber-400 font-mono">({card.time})</span>
                </button>
              ))}
              {availableCards.length === 0 && (
                <span className="text-xs text-emerald-400 font-bold">
                  All cards placed! Click 'Check Order' below to verify.
                </span>
              )}
            </div>
          </div>

          {/* Action button */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <span className="text-xs text-slate-400">
              Notice the base verbs: 'wake up', 'eat', 'catch', 'study', 'sleep'.
            </span>
            <button
              disabled={availableCards.length > 0}
              onClick={checkRoutineSequence}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 disabled:opacity-40 text-slate-950 font-black text-xs shadow-lg transition cursor-pointer"
            >
              Check Timeline Order (+50 XP)
            </button>
          </div>
        </div>
      )}

      {/* GAME 4: VOCABULARY MEMORY PAIRS */}
      {activeGame === 'memory-match' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                  Vocabulary & Speech Synthesis
                </span>
                <span className="text-xs text-slate-400">Match English to Context</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">Memory Pairs & Spoken English</h3>
              <p className="text-xs text-slate-400">
                Flip cards to match the English phrase with its Spanish everyday equivalent. Hear authentic pronunciation on match!
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-indigo-300">
                Matched: {memoryMatched.length} / 6 pairs
              </span>
              <button
                onClick={resetMemory}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 mb-6">
            {MEMORY_CARDS.map((card) => {
              const isFlipped = memoryFlipped.includes(card.id);
              const isMatched = memoryMatched.includes(card.pairId);

              return (
                <div
                  key={card.id}
                  onClick={() => handleCardFlip(card)}
                  className={`h-28 rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 border ${
                    isMatched
                      ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300 opacity-80'
                      : isFlipped
                      ? 'bg-indigo-900/50 border-cyan-400 text-white shadow-lg shadow-cyan-500/20 scale-105'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-400'
                  }`}
                >
                  {isFlipped || isMatched ? (
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-white mb-1.5">
                        {card.text}
                      </p>
                      <AudioSpeechButton text={card.audio} size="sm" />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-1">
                      <Sparkles className="w-5 h-5 text-indigo-400/60" />
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                        FLIP
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {memoryMatched.length === 6 && (
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>All pairs matched! You have built high recognition of everyday phrases!</span>
              </div>
              <button
                onClick={resetMemory}
                className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-lg"
              >
                Play Again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
