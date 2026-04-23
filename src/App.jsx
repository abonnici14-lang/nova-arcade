/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Gamepad2, 
  Search, 
  X, 
  Maximize2, 
  Info, 
  TrendingUp, 
  Clock, 
  Cpu,
  Monitor
} from 'lucide-react';
import gamesData from './data/games.json';

export default function App() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = useMemo(() => {
    const cats = new Set(gamesData.map(g => g.category));
    return ['All', ...Array.from(cats)];
  }, []);

  const filteredGames = useMemo(() => {
    return gamesData.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'All' || game.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, categoryFilter]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-6 overflow-x-hidden flex flex-col gap-6">
      {/* Header Navigation */}
      <header className="flex items-center justify-between bg-slate-900/50 border border-slate-800 p-4 rounded-2xl backdrop-blur-xl">
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => setSelectedGame(null)}
        >
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
            <Gamepad2 className="text-white" size={24} />
          </div>
          <h1 className="text-xl font-bold tracking-tight uppercase italic hidden sm:block">Nexus Arcade</h1>
        </div>
        
        <div className="flex items-center gap-6 flex-1 justify-end">
          <div className="hidden lg:flex gap-6 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <button onClick={() => setSelectedGame(null)} className={`hover:text-white transition-colors ${!selectedGame ? 'text-indigo-400 border-b-2 border-indigo-400' : ''}`}>Home</button>
            <a href="#" className="hover:text-white transition-colors">Categories</a>
            <a href="#" className="hover:text-white transition-colors">Proxy</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>
          
          <div className="relative flex items-center max-w-xs w-full">
            <Search className="absolute left-3 text-slate-500" size={16} />
            <input 
              type="text" 
              placeholder="Search titles..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-full pl-10 pr-12 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-200"
            />
            <div className="absolute right-4 opacity-40 italic font-mono text-[10px] hidden sm:block">[K]</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {!selectedGame ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-min">
            {/* Featured Hero Card - Only shown when no search is active */}
            {searchQuery === '' && categoryFilter === 'All' && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="col-span-1 md:col-span-8 lg:col-span-9 row-span-2 bg-gradient-to-br from-indigo-900 to-indigo-700 rounded-3xl p-8 relative overflow-hidden group border border-indigo-400/30"
              >
                <div className="relative z-10 h-full flex flex-col justify-end min-h-[300px]">
                  <span className="bg-indigo-400/20 border border-indigo-300/30 px-3 py-1 rounded-full text-[10px] font-bold w-fit mb-4 uppercase tracking-wider">Weekly Featured</span>
                  <h2 className="text-4xl md:text-6xl font-black mb-3 uppercase leading-none italic tracking-tighter">Hyper Stream</h2>
                  <p className="text-indigo-100/70 max-w-sm text-sm mb-6 leading-relaxed">Experience high-octane gaming in a premium landscape. Low latency, zero blocks, pure performance.</p>
                  <button 
                    onClick={() => setSelectedGame(gamesData[0])}
                    className="bg-white text-indigo-900 px-8 py-3 rounded-full font-bold uppercase tracking-wide w-fit hover:bg-indigo-50 transition-all hover:scale-105 shadow-xl"
                  >
                    Quick Start
                  </button>
                </div>
                <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/20 rounded-full blur-[80px] -mr-20 -mt-20"></div>
                <div className="absolute bottom-10 right-10 flex gap-1 opacity-20 group-hover:opacity-40 transition-opacity">
                  <div className="w-12 h-48 bg-white/10 rounded-full skew-x-12 translate-y-10"></div>
                  <div className="w-12 h-48 bg-white/20 rounded-full skew-x-12"></div>
                  <div className="w-12 h-48 bg-white/5 rounded-full skew-x-12 -translate-y-10"></div>
                </div>
              </motion.div>
            )}

            {/* Sidebar Stats/Categories */}
            <div className="col-span-1 md:col-span-4 lg:col-span-3 flex flex-col gap-4">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between min-h-[160px]">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Filters</h3>
                  <div className="text-indigo-500">
                    <TrendingUp size={18} />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setCategoryFilter(cat)}
                      className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase transition-all ${
                        categoryFilter === cat 
                        ? 'bg-indigo-600 border-indigo-500 text-white' 
                        : 'bg-slate-800 border border-slate-700 text-slate-400 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex-1">
                <h3 className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-4">Trending Now</h3>
                <div className="space-y-3">
                  {gamesData.slice(0, 3).map(game => (
                    <div key={game.id} className="flex items-center gap-3 p-2 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-indigo-500/30 transition-colors cursor-pointer" onClick={() => setSelectedGame(game)}>
                      <div className="w-10 h-10 bg-slate-700 rounded-lg overflow-hidden">
                        <img src={game.thumbnail} className="w-full h-full object-cover opacity-60" alt="" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold truncate">{game.title}</p>
                        <p className="text-[9px] text-slate-500 font-mono uppercase tracking-tighter">{Math.floor(Math.random() * 5 + 1)}k active</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Game Grid Integrates into Bento */}
            <div className="col-span-1 md:col-span-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mt-2">
              {filteredGames.map((game, index) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.03 }}
                  onClick={() => setSelectedGame(game)}
                  className="bg-slate-900 border border-slate-800 rounded-3xl p-4 group cursor-pointer hover:border-indigo-500/50 hover:bg-slate-800/50 transition-all flex flex-col"
                >
                  <div className="w-full aspect-square bg-slate-800 rounded-2xl mb-4 overflow-hidden relative">
                    <img 
                      src={game.thumbnail} 
                      className="w-full h-full object-cover opacity-50 group-hover:scale-110 group-hover:opacity-100 transition-all duration-500" 
                      alt={game.title}
                    />
                    <div className="absolute inset-0 bg-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute right-2 top-2 w-8 h-8 rounded-lg bg-black/40 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                      <Maximize2 size={14} className="text-white" />
                    </div>
                  </div>
                  <div className="mt-auto">
                    <p className="text-xs font-bold truncate mb-0.5 group-hover:text-indigo-400 transition-colors uppercase italic tracking-tight">{game.title}</p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{game.category}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Trusted Banner */}
            <div className="col-span-1 md:col-span-12 lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between overflow-hidden relative mt-4">
              <div className="relative z-10 text-center md:text-left mb-6 md:mb-0">
                <h3 className="text-2xl font-bold italic mb-2 uppercase tracking-tighter">Unblocked & Secure</h3>
                <p className="text-slate-400 text-[10px] max-w-sm uppercase tracking-widest leading-relaxed">
                  All games are optimized for minimal footprint and maximum speed. Encrypted traffic bypasses common academic filters.
                </p>
              </div>
              <div className="relative z-10 flex gap-3">
                <button className="p-4 bg-slate-800 rounded-2xl border border-slate-700 hover:text-indigo-400 transition-all">
                  <Monitor size={20} />
                </button>
                <button className="bg-indigo-600 px-8 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-indigo-600/20 hover:scale-105 active:scale-95 transition-all">
                  Join Community
                </button>
              </div>
              <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(circle_at_center,#4f46e5_1px,transparent_1px)] bg-[length:16px_16px] opacity-10"></div>
            </div>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col gap-6"
          >
            {/* Theater Mode View */}
            <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl backdrop-blur-sm">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setSelectedGame(null)}
                    className="w-12 h-12 rounded-2xl border border-slate-700 flex items-center justify-center hover:bg-slate-800 transition-all bg-slate-900"
                  >
                    <X size={24} />
                  </button>
                  <div>
                    <h2 className="text-3xl font-black italic uppercase tracking-tighter text-indigo-400">{selectedGame.title}</h2>
                    <div className="flex items-center gap-3 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                      <span>{selectedGame.category}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="flex items-center gap-1"><Clock size={12} /> Live_Session_V4</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-6 py-3 bg-slate-800 border border-slate-700 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:text-indigo-400 transition-colors">
                    <Maximize2 size={16} /> Fullscreen
                  </button>
                </div>
              </div>

              <div className="relative aspect-video w-full bg-black rounded-2xl overflow-hidden border border-slate-800 shadow-2xl shadow-black">
                <iframe 
                  src={selectedGame.url} 
                  className="w-full h-full border-none"
                  title={selectedGame.title}
                  allowFullScreen
                />
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="col-span-2 p-6 bg-slate-900 border border-slate-800 rounded-2xl">
                   <h4 className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-3">Intelligence Report</h4>
                   <p className="text-sm text-slate-300 leading-relaxed font-medium">
                     {selectedGame.description} Session is running via Nexus Proxy Layer 0. Hardware acceleration recommended for high-frame stability.
                   </p>
                </div>
                <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col justify-between">
                  <h4 className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-3">Controls</h4>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-slate-800 rounded-lg text-xs border border-slate-700">WASD</span>
                    <span className="px-3 py-1 bg-slate-800 rounded-lg text-xs border border-slate-700">SPACE</span>
                    <span className="px-3 py-1 bg-slate-800 rounded-lg text-xs border border-slate-700">MOUSE</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </main>

      {/* Footer Bar */}
      <footer className="mt-auto flex flex-col sm:flex-row items-center justify-between px-2 py-4 text-[9px] text-slate-500 uppercase tracking-[0.2em] font-mono border-t border-slate-900">
        <div className="flex items-center gap-4">
          <div>STATUS: <span className="text-emerald-500">ALL SYSTEMS GO</span></div>
          <div className="hidden md:block">NEXUS ARCADE • {gamesData.length} MODULES LOADED</div>
        </div>
        <div className="flex items-center gap-4 mt-2 sm:mt-0">
          <div>LATENCY: 14MS</div>
          <div className="text-indigo-400">© 2026 CORE_PROTOCOLS</div>
        </div>
      </footer>
    </div>
  );
}
