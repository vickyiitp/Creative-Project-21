import React from 'react';
import { AlgorithmType, DatasetType } from '../types';
import { ALGORITHMS, DATASETS } from '../constants';
import Background from './Background';

interface MenuProps {
  onStart: (dataset: DatasetType, playerAlgo: AlgorithmType) => void;
}

const Menu: React.FC<MenuProps> = ({ onStart }) => {
  const [selectedDataset, setSelectedDataset] = React.useState<DatasetType>(DatasetType.RANDOM);
  const [selectedAlgo, setSelectedAlgo] = React.useState<AlgorithmType>(AlgorithmType.QUICK);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-8 md:space-y-12 animate-fade-in relative overflow-hidden font-sans">
      
      <Background intensity="low" />

      <div className="text-center space-y-4 relative z-10 mt-8 md:mt-0">
        <h1 className="text-4xl md:text-7xl font-black font-display tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 animate-pulse-slow drop-shadow-lg glitch" data-text="CONFIGURE PROTOCOL">
          CONFIGURE<br/>PROTOCOL
        </h1>
        <div className="text-slate-400 text-base md:text-xl font-mono border-l-2 border-cyan-500 pl-4 inline-block bg-slate-900/50 p-2 rounded-r">
          <span className="animate-pulse text-cyan-500 mr-2">&gt;</span>PREPARE_FOR_INJECTION
        </div>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 px-2">
        
        {/* Dataset Selection */}
        <div className="glass-panel p-6 rounded-xl relative group">
          <div className="absolute -top-3 left-4 bg-slate-900 px-2 text-cyan-400 text-xs font-bold tracking-[0.2em] border border-cyan-500/30">DATASET_CONFIG</div>
          <h2 className="text-lg md:text-xl font-bold font-display text-white mb-6 flex items-center">
            <span className="mr-3 text-cyan-500 text-2xl">01</span> SELECT SOURCE
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {DATASETS.map((ds) => (
              <button
                key={ds}
                onClick={() => setSelectedDataset(ds)}
                className={`relative p-4 text-left rounded transition-all font-mono text-xs md:text-sm border overflow-hidden group/btn
                  ${selectedDataset === ds 
                    ? 'bg-cyan-900/40 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]' 
                    : 'bg-slate-900/40 border-slate-700 text-slate-400 hover:border-cyan-500/50 hover:text-cyan-200'
                  }`}
              >
                <div className={`absolute left-0 top-0 bottom-0 w-1 transition-all ${selectedDataset === ds ? 'bg-cyan-400' : 'bg-transparent group-hover/btn:bg-cyan-800'}`}></div>
                <span className="relative z-10 flex justify-between items-center">
                  {ds}
                  {selectedDataset === ds && <span className="text-cyan-400 animate-pulse">●</span>}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Algorithm Selection */}
        <div className="glass-panel p-6 rounded-xl relative group">
           <div className="absolute -top-3 left-4 bg-slate-900 px-2 text-pink-400 text-xs font-bold tracking-[0.2em] border border-pink-500/30">ALGORITHM_INJECT</div>
          <h2 className="text-lg md:text-xl font-bold font-display text-white mb-6 flex items-center">
            <span className="mr-3 text-pink-500 text-2xl">02</span> SELECT WEAPON
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {ALGORITHMS.map((algo) => (
              <button
                key={algo}
                onClick={() => setSelectedAlgo(algo)}
                className={`relative p-4 text-center rounded transition-all font-mono text-xs md:text-sm border flex items-center justify-center overflow-hidden
                  ${selectedAlgo === algo 
                    ? 'bg-pink-900/40 border-pink-500 text-white shadow-[0_0_15px_rgba(236,72,153,0.3)]' 
                    : 'bg-slate-900/40 border-slate-700 text-slate-400 hover:border-pink-500/50 hover:text-pink-200'
                  }`}
              >
                 {selectedAlgo === algo && <div className="absolute inset-0 bg-pink-500/10 animate-pulse"></div>}
                 <span className="relative z-10">{algo}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={() => onStart(selectedDataset, selectedAlgo)}
        className="group relative px-16 py-5 bg-transparent overflow-hidden z-10 w-full max-w-sm"
      >
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-600 to-blue-600 opacity-90 group-hover:opacity-100 transition-all skew-x-[-10deg] border border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)]"></div>
        <div className="absolute inset-0 w-full h-1 bg-white opacity-20 group-hover:top-full transition-all duration-700 skew-x-[-10deg]"></div>
        <span className="relative text-xl md:text-2xl font-black font-display tracking-[0.2em] text-white uppercase group-hover:tracking-[0.3em] transition-all flex items-center justify-center gap-2">
          INITIALIZE <span className="text-cyan-200">&gt;&gt;</span>
        </span>
      </button>
    </div>
  );
};

export default Menu;