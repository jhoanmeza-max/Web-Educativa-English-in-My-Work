import React, { useState } from 'react';
import {
  Palette,
  Sparkles,
  BookOpen,
  MapPin,
  ShoppingBag,
  Plus,
  Trash2,
  Share2,
  CheckCircle2,
  Download,
  UploadCloud,
  Layers,
  Image as ImageIcon
} from 'lucide-react';
import { useVLE } from '../context/VLEContext';
import { AudioSpeechButton } from './AudioSpeechButton';

type StudioTool = 'comic' | 'tour-builder' | 'shopping-studio';

export const CreativeCorner: React.FC = () => {
  const {
    saveCreativeProject,
    creativeProjects,
    triggerConfetti,
    addXP,
    profile
  } = useVLE();

  const [activeTool, setActiveTool] = useState<StudioTool>('comic');

  // ==========================================
  // TOOL 1: COMIC STRIP CREATOR
  // ==========================================
  const [comicTitle, setComicTitle] = useState('A Saturday in My Town');
  const [comicPanels, setComicPanels] = useState<
    {
      id: string;
      background: string;
      bgName: string;
      character: string;
      characterName: string;
      dialogue: string;
    }[]
  >([
    {
      id: 'p1',
      background: 'from-amber-900/40 to-slate-900',
      bgName: 'Teen Bedroom (Morning)',
      character: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
      characterName: 'Alex',
      dialogue: 'First, I wake up at 7:00 AM on Saturdays. No school today!'
    },
    {
      id: 'p2',
      background: 'from-emerald-900/40 to-slate-900',
      bgName: 'Street Market',
      character: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
      characterName: 'Sofía',
      dialogue: 'Excuse me! How much is this vintage jacket? I need it for the cold weather.'
    },
    {
      id: 'p3',
      background: 'from-cyan-900/40 to-slate-900',
      bgName: 'Town Plaza',
      character: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80',
      characterName: 'Lucas',
      dialogue: 'Go straight past the fountain! The ice cream shop is next to the bookstore!'
    }
  ]);

  const updatePanelDialogue = (panelId: string, text: string) => {
    setComicPanels((prev) =>
      prev.map((p) => (p.id === panelId ? { ...p, dialogue: text } : p))
    );
  };

  const handlePublishComic = () => {
    saveCreativeProject({
      type: 'comic',
      title: comicTitle,
      data: { panels: comicPanels },
      publishedToForum: true
    });
    triggerConfetti();
  };

  // ==========================================
  // TOOL 2: TOWN MINI-TOUR BUILDER (Unit 3 Summative)
  // ==========================================
  const [tourTitle, setTourTitle] = useState(`${profile.hometown.split(',')[0]} Highlights Mini-Tour`);
  const [tourStops, setTourStops] = useState<
    {
      id: string;
      placeName: string;
      transport: string;
      directions: string;
      whyVisit: string;
    }[]
  >([
    {
      id: 'stop-1',
      placeName: 'The Main Plaza & Cultural Fountain',
      transport: 'On foot (walking)',
      directions: 'Start at the town center and walk around the colonial plaza.',
      whyVisit: 'This is where teenagers meet to eat traditional Colombian snacks and listen to street artists.'
    },
    {
      id: 'stop-2',
      placeName: 'Artisan Bakery & Cafe',
      transport: 'Walk 1 block north',
      directions: 'Turn right onto Carrera 5, it is right next to the municipal library.',
      whyVisit: 'They bake the freshest warm pandebonos and serve hot chocolate.'
    },
    {
      id: 'stop-3',
      placeName: 'Youth Sports Court & Skate Park',
      transport: 'Feeder bus line 3 (5 min)',
      directions: 'Take the bus opposite the pharmacy and get off at the park entrance.',
      whyVisit: 'We play basketball and soccer here every afternoon after school.'
    },
    {
      id: 'stop-4',
      placeName: 'Sunset Viewpoint Hill',
      transport: 'Bicycle (10 min)',
      directions: 'Ride up the green avenue, behind the historical church.',
      whyVisit: 'You can see the entire valley and mountains from this high point.'
    }
  ]);

  const [newStopName, setNewStopName] = useState('');
  const [newStopDir, setNewStopDir] = useState('');
  const [newStopWhy, setNewStopWhy] = useState('');

  const handleAddTourStop = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStopName.trim()) return;
    setTourStops((prev) => [
      ...prev,
      {
        id: `stop-${Date.now()}`,
        placeName: newStopName,
        transport: 'On foot',
        directions: newStopDir || 'Go straight along the main avenue.',
        whyVisit: newStopWhy || 'A cool local spot to explore!'
      }
    ]);
    setNewStopName('');
    setNewStopDir('');
    setNewStopWhy('');
  };

  const handlePublishTour = () => {
    saveCreativeProject({
      type: 'town-tour',
      title: tourTitle,
      data: { stops: tourStops },
      publishedToForum: true
    });
    triggerConfetti();
  };

  // ==========================================
  // TOOL 3: SHOPPING BUDGET & JUSTIFICATION STUDIO (Unit 2 Summative)
  // ==========================================
  const [shoppingTitle, setShoppingTitle] = useState('My $100 Teen Living & Learning Budget');
  const [budgetItems, setBudgetItems] = useState<
    {
      id: string;
      name: string;
      price: number;
      category: 'need' | 'want';
      justification: string;
    }[]
  >([
    {
      id: 'b1',
      name: 'High-School Ergonomic Backpack',
      price: 32,
      category: 'need',
      justification: 'I need this because my current backpack has broken zippers and my heavy textbooks hurt my shoulders.'
    },
    {
      id: 'b2',
      name: 'Set of Math Notebooks & Gel Pens',
      price: 12,
      category: 'need',
      justification: 'I need them to take organized notes for geometry and English class every day.'
    },
    {
      id: 'b3',
      name: 'Comfortable Sneakers',
      price: 28,
      category: 'need',
      justification: 'I walk 20 minutes to school every morning, so durable sneakers are a daily necessity.'
    },
    {
      id: 'b4',
      name: 'Anime Character Phone Case',
      price: 8,
      category: 'want',
      justification: 'This is a want because my phone is already protected, but it expresses my personal hobby and style.'
    },
    {
      id: 'b5',
      name: 'Snack Combo at the Cinema',
      price: 10,
      category: 'want',
      justification: 'I want this popcorn and soda to celebrate finishing our English unit with classmates!'
    }
  ]);

  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState(15);
  const [newItemCategory, setNewItemCategory] = useState<'need' | 'want'>('need');
  const [newItemJust, setNewItemJust] = useState('');

  const totalBudgetSpent = budgetItems.reduce((acc, i) => acc + i.price, 0);

  const handleAddBudgetItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    setBudgetItems((prev) => [
      ...prev,
      {
        id: `b-${Date.now()}`,
        name: newItemName,
        price: Number(newItemPrice),
        category: newItemCategory,
        justification: newItemJust || 'I chose this product for everyday student life.'
      }
    ]);
    setNewItemName('');
    setNewItemJust('');
  };

  const handlePublishShoppingList = () => {
    saveCreativeProject({
      type: 'shopping-list',
      title: shoppingTitle,
      data: { items: budgetItems, totalSpent: totalBudgetSpent },
      publishedToForum: true
    });
    triggerConfetti();
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-fuchsia-400">
            Student As Creator • Digital Project Studio
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">The Creative Corner</h2>
          <p className="text-xs text-slate-400">
            Transform what you learn into original comics, town tour guides, and illustrated budget sheets.
          </p>
        </div>

        {/* Tool Switcher Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setActiveTool('comic')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTool === 'comic'
                ? 'bg-fuchsia-600 text-white shadow-lg shadow-fuchsia-600/30 ring-2 ring-fuchsia-400/50'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>1. Comic & Story Studio</span>
          </button>

          <button
            onClick={() => setActiveTool('tour-builder')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTool === 'tour-builder'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 ring-2 ring-cyan-400/50'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>2. Town Mini-Tour Builder</span>
          </button>

          <button
            onClick={() => setActiveTool('shopping-studio')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTool === 'shopping-studio'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 ring-2 ring-emerald-400/50'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>3. Shopping Budget Studio</span>
          </button>
        </div>
      </div>

      {/* TOOL 1: COMIC STRIP CREATOR */}
      {activeTool === 'comic' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/30">
                  Multimodal Storytelling
                </span>
                <span className="text-xs text-slate-400">Apply Routine, Shopping & Direction Language</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">Teen Comic Strip Creator</h3>
              <p className="text-xs text-slate-400">
                Write dialogue in speech bubbles for each panel. When done, publish to the forum for peer reactions!
              </p>
            </div>

            <button
              onClick={handlePublishComic}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-indigo-600 hover:from-fuchsia-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg transition cursor-pointer self-start sm:self-auto"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Publish Comic to Forum (+60 XP)</span>
            </button>
          </div>

          {/* Comic Title Input */}
          <div className="mb-6">
            <label className="block text-xs font-bold text-slate-300 mb-1">Comic Strip Title</label>
            <input
              type="text"
              value={comicTitle}
              onChange={(e) => setComicTitle(e.target.value)}
              className="w-full max-w-md bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white font-bold focus:outline-none focus:border-fuchsia-500"
            />
          </div>

          {/* 3 Comic Panels Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {comicPanels.map((panel, idx) => (
              <div
                key={panel.id}
                className={`p-5 rounded-3xl bg-gradient-to-b ${panel.background} border border-slate-700/80 shadow-xl flex flex-col justify-between min-h-[340px]`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase bg-slate-950/80 text-fuchsia-300">
                      Panel #{idx + 1}
                    </span>
                    <span className="text-[11px] text-slate-300 font-semibold">{panel.bgName}</span>
                  </div>

                  {/* Speech Bubble */}
                  <div className="relative p-3.5 rounded-2xl bg-white text-slate-950 shadow-md mb-6">
                    <p className="text-xs font-semibold leading-relaxed font-sans">{panel.dialogue}</p>
                    <div className="absolute -bottom-2 left-6 w-3 h-3 bg-white rotate-45" />
                  </div>
                </div>

                <div>
                  {/* Character Avatar */}
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={panel.character}
                      alt={panel.characterName}
                      className="w-12 h-12 rounded-2xl object-cover ring-2 ring-white/20"
                    />
                    <div>
                      <span className="text-xs font-bold text-white block">{panel.characterName}</span>
                      <AudioSpeechButton text={panel.dialogue} size="sm" label="Listen" />
                    </div>
                  </div>

                  {/* Dialogue Editor */}
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">
                    Edit Panel Dialogue:
                  </label>
                  <textarea
                    rows={2}
                    value={panel.dialogue}
                    onChange={(e) => updatePanelDialogue(panel.id, e.target.value)}
                    className="w-full bg-slate-950/80 border border-slate-700 rounded-xl p-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-fuchsia-400"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TOOL 2: TOWN MINI-TOUR BUILDER */}
      {activeTool === 'tour-builder' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  Unit 3 Summative Project
                </span>
                <span className="text-xs text-slate-400">Authentic Guided Tour in English</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">Interactive Town Tour Builder</h3>
              <p className="text-xs text-slate-400">
                Design a 4-stop tour of your neighborhood or municipality with directions and English narration.
              </p>
            </div>

            <button
              onClick={handlePublishTour}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg transition cursor-pointer self-start sm:self-auto"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Publish Tour to Class Forum (+60 XP)</span>
            </button>
          </div>

          {/* Tour Title */}
          <div className="mb-6">
            <label className="block text-xs font-bold text-slate-300 mb-1">Tour Title</label>
            <input
              type="text"
              value={tourTitle}
              onChange={(e) => setTourTitle(e.target.value)}
              className="w-full max-w-md bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white font-bold focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Existing Stops Itinerary */}
          <div className="space-y-4 mb-8">
            {tourStops.map((stop, idx) => (
              <div
                key={stop.id}
                className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col md:flex-row md:items-start justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    #{idx + 1}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">{stop.placeName}</h4>
                    <p className="text-xs text-cyan-300 font-medium mb-1">
                      Directions: <span className="text-slate-300">{stop.directions}</span>
                    </p>
                    <p className="text-xs text-slate-400">
                      Why visit: <span className="text-slate-300 italic">{stop.whyVisit}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-start">
                  <AudioSpeechButton
                    text={`Stop ${idx + 1}: ${stop.placeName}. How to get there: ${stop.directions}. Why you should visit: ${stop.whyVisit}`}
                    size="sm"
                  />
                  <button
                    onClick={() => setTourStops((prev) => prev.filter((s) => s.id !== stop.id))}
                    className="p-1.5 text-slate-500 hover:text-rose-400"
                    title="Delete stop"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add Stop Form */}
          <form onSubmit={handleAddTourStop} className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/20">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wide mb-3 flex items-center gap-2">
              <Plus className="w-4 h-4 text-cyan-400" />
              Add Another Stop to Your Neighborhood Tour:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
              <input
                type="text"
                value={newStopName}
                onChange={(e) => setNewStopName(e.target.value)}
                placeholder="Landmark name (e.g. Central Market)"
                className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
              <input
                type="text"
                value={newStopDir}
                onChange={(e) => setNewStopDir(e.target.value)}
                placeholder="Directions (e.g. Turn left at the corner)"
                className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
              <input
                type="text"
                value={newStopWhy}
                onChange={(e) => setNewStopWhy(e.target.value)}
                placeholder="Why visit (e.g. Best fruit smoothies in town)"
                className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <button
              type="submit"
              disabled={!newStopName.trim()}
              className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white font-bold text-xs transition cursor-pointer"
            >
              Add Landmark Stop
            </button>
          </form>
        </div>
      )}

      {/* TOOL 3: SHOPPING BUDGET & JUSTIFICATION STUDIO */}
      {activeTool === 'shopping-studio' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Unit 2 Summative Project
                </span>
                <span className="text-xs text-slate-400">Needs vs Wants with Justification</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">Shopping List & Budget Studio</h3>
              <p className="text-xs text-slate-400">
                Design a list of 6–8 products with prices and 2–3 sentences justifying why each item is a 'need' or 'want'.
              </p>
            </div>

            <button
              onClick={handlePublishShoppingList}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg transition cursor-pointer self-start sm:self-auto"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Publish Budget to Forum (+60 XP)</span>
            </button>
          </div>

          {/* Budget Meter */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 mb-6 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 font-semibold block">Total Spent ($100 Budget Limit):</span>
              <span className={`text-xl font-black ${totalBudgetSpent > 100 ? 'text-rose-400' : 'text-emerald-400'}`}>
                ${totalBudgetSpent} / $100 USD
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 font-semibold block">Items in List:</span>
              <span className="text-xl font-black text-white">{budgetItems.length} products</span>
            </div>
          </div>

          {/* Items Table / Cards */}
          <div className="space-y-3 mb-6">
            {budgetItems.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase ${
                        item.category === 'need'
                          ? 'bg-cyan-500/20 text-cyan-300'
                          : 'bg-fuchsia-500/20 text-fuchsia-300'
                      }`}
                    >
                      {item.category}
                    </span>
                    <span className="text-sm font-bold text-white">{item.name}</span>
                    <span className="text-xs font-mono font-bold text-emerald-400">${item.price}</span>
                  </div>
                  <p className="text-xs text-slate-300 italic font-sans leading-relaxed">
                    "{item.justification}"
                  </p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <AudioSpeechButton
                    text={`I chose ${item.name} which costs ${item.price} dollars. ${item.justification}`}
                    size="sm"
                  />
                  <button
                    onClick={() => setBudgetItems((prev) => prev.filter((b) => b.id !== item.id))}
                    className="p-1.5 text-slate-500 hover:text-rose-400"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add Item Form */}
          <form onSubmit={handleAddBudgetItem} className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/20">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wide mb-3 flex items-center gap-2">
              <Plus className="w-4 h-4 text-emerald-400" />
              Add Product with Justification:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-3">
              <input
                type="text"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder="Product (e.g. Science Dictionary)"
                className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
              <input
                type="number"
                value={newItemPrice}
                onChange={(e) => setNewItemPrice(Number(e.target.value))}
                placeholder="Price $"
                className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
              <select
                value={newItemCategory}
                onChange={(e: any) => setNewItemCategory(e.target.value)}
                className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="need">NEED (Essential)</option>
                <option value="want">WANT (Personal Desire)</option>
              </select>
              <input
                type="text"
                value={newItemJust}
                onChange={(e) => setNewItemJust(e.target.value)}
                placeholder="Why do you need/want this?"
                className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <button
              type="submit"
              disabled={!newItemName.trim()}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold text-xs transition cursor-pointer"
            >
              Add Product to Budget Sheet
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
