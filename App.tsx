import React, { useState, useEffect, useRef, useCallback } from 'react';
import Menu from './components/Menu';
import Landing from './components/Landing';
import GameCanvas from './components/GameCanvas';
import Background from './components/Background';
import { GameState, AlgorithmType, DatasetType, SortStep } from './types';
import { generateDataset } from './utils/dataGenerator';
import { bubbleSort, quickSort, mergeSort, heapSort, insertionSort } from './utils/algorithms';
import { ANIMATION_SPEED_MULTIPLIER } from './constants';

const ALGO_MAP: Record<AlgorithmType, (arr: number[]) => Generator<SortStep>> = {
  [AlgorithmType.BUBBLE]: bubbleSort,
  [AlgorithmType.QUICK]: quickSort,
  [AlgorithmType.MERGE]: mergeSort,
  [AlgorithmType.HEAP]: heapSort,
  [AlgorithmType.INSERTION]: insertionSort,
};

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.LANDING);
  const [winner, setWinner] = useState<'PLAYER' | 'CPU' | null>(null);
  const [isInitializing, setIsInitializing] = useState(false);
  
  // Game Configuration
  const [datasetType, setDatasetType] = useState<DatasetType>(DatasetType.RANDOM);
  const [playerAlgo, setPlayerAlgo] = useState<AlgorithmType>(AlgorithmType.QUICK);
  const [cpuAlgo, setCpuAlgo] = useState<AlgorithmType>(AlgorithmType.QUICK);

  // Visualization State
  const [playerData, setPlayerData] = useState<number[]>([]);
  const [cpuData, setCpuData] = useState<number[]>([]);
  
  const [playerActiveIndices, setPlayerActiveIndices] = useState<number[]>([]);
  const [cpuActiveIndices, setCpuActiveIndices] = useState<number[]>([]);
  const [playerPivot, setPlayerPivot] = useState<number | undefined>(undefined);
  const [cpuPivot, setCpuPivot] = useState<number | undefined>(undefined);

  const [playerFinished, setPlayerFinished] = useState(false);
  const [cpuFinished, setCpuFinished] = useState(false);

  // Animation Refs
  const requestRef = useRef<number>();
  const playerGenRef = useRef<Generator<SortStep> | null>(null);
  const cpuGenRef = useRef<Generator<SortStep> | null>(null);
  
  // --- Game Logic ---

  const selectCpuStrategy = (dataset: DatasetType): AlgorithmType => {
    // A simple "AI" that picks somewhat sensibly but isn't perfect
    const options = [AlgorithmType.QUICK, AlgorithmType.MERGE, AlgorithmType.HEAP];
    
    // For nearly sorted, Insertion/Bubble is actually good, maybe the CPU knows this?
    if (dataset === DatasetType.NEARLY_SORTED) {
      if (Math.random() > 0.3) return AlgorithmType.INSERTION;
    }
    
    // Random choice from efficient algos
    return options[Math.floor(Math.random() * options.length)];
  };

  const startGame = (dataset: DatasetType, algo: AlgorithmType) => {
    setIsInitializing(true);
    setGameState(GameState.PREPARING);

    // Simulate system initialization for effect and ensures UI updates
    setTimeout(() => {
      const initialData = generateDataset(dataset);
      
      setDatasetType(dataset);
      setPlayerAlgo(algo);
      const cpuSelected = selectCpuStrategy(dataset);
      setCpuAlgo(cpuSelected);

      // Deep copy for independent sorting
      setPlayerData([...initialData]);
      setCpuData([...initialData]);
      
      setWinner(null);
      setPlayerFinished(false);
      setCpuFinished(false);

      // Initialize Generators
      playerGenRef.current = ALGO_MAP[algo]([...initialData]);
      cpuGenRef.current = ALGO_MAP[cpuSelected]([...initialData]);

      setIsInitializing(false);

      // Short delay before start "RACING" text appears
      setTimeout(() => {
        setGameState(GameState.RACING);
      }, 1000);

    }, 800);
  };

  const resetGame = () => {
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    setGameState(GameState.MENU);
  };

  const gameLoop = useCallback(() => {
    if (gameState !== GameState.RACING) return;

    let pDone = playerFinished;
    let cDone = cpuFinished;

    // Process Player
    if (!pDone && playerGenRef.current) {
      // Speed multiplier: execute multiple steps per frame
      for (let i = 0; i < ANIMATION_SPEED_MULTIPLIER; i++) {
        const next = playerGenRef.current.next();
        if (next.done) {
          pDone = true;
          setPlayerFinished(true);
          setPlayerActiveIndices([]);
          setPlayerPivot(undefined);
          break;
        } else {
          setPlayerData(next.value.array);
          setPlayerActiveIndices(next.value.activeIndices);
          setPlayerPivot(next.value.pivotIndex);
        }
      }
    }

    // Process CPU
    if (!cDone && cpuGenRef.current) {
       for (let i = 0; i < ANIMATION_SPEED_MULTIPLIER; i++) {
        const next = cpuGenRef.current.next();
        if (next.done) {
          cDone = true;
          setCpuFinished(true);
          setCpuActiveIndices([]);
          setCpuPivot(undefined);
          break;
        } else {
          setCpuData(next.value.array);
          setCpuActiveIndices(next.value.activeIndices);
          setCpuPivot(next.value.pivotIndex);
        }
       }
    }

    if (pDone && cDone) {
      setGameState(GameState.FINISHED);
      return; // Stop loop
    }
    
    // Check for win condition immediately
    if (pDone && !cDone && !winner) {
      setWinner('PLAYER');
    } else if (cDone && !pDone && !winner) {
      setWinner('CPU');
    }

    requestRef.current = requestAnimationFrame(gameLoop);
  }, [gameState, playerFinished, cpuFinished, winner]);

  useEffect(() => {
    if (gameState === GameState.RACING) {
      requestRef.current = requestAnimationFrame(gameLoop);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [gameState, gameLoop]);


  // --- Render ---

  if (gameState === GameState.LANDING) {
    return <Landing onEnter={() => setGameState(GameState.MENU)} />;
  }

  if (gameState === GameState.MENU) {
    return <Menu onStart={startGame} />;
  }

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 flex flex-col items-center justify-center p-4 font-mono overflow-hidden relative">
      <Background intensity="high" />
      
      {/* Game Container (CRT Look) */}
      <div className="relative w-full max-w-6xl z-10 glass-panel border-t-4 border-t-cyan-500/50 rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[95vh]">
        
        {/* HUD Header */}
        <header className="w-full flex justify-between items-center px-6 py-4 bg-slate-900/80 border-b border-slate-700/50">
          <div className="flex flex-col">
             <span className="text-[10px] text-cyan-500 uppercase tracking-[0.2em] font-bold mb-1">Active Protocol</span>
             <span className="text-lg font-bold text-white font-display uppercase tracking-widest">{datasetType}</span>
          </div>
          
          <div className="text-4xl font-black italic tracking-widest font-display text-center relative">
            {isInitializing ? (
                <span className="text-slate-500 animate-pulse">BOOTING...</span>
            ) : gameState === GameState.PREPARING ? (
                <span className="animate-pulse text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]">READY...</span>
            ) : gameState === GameState.RACING ? (
                <span className="text-green-500 drop-shadow-[0_0_15px_rgba(34,197,94,0.8)] animate-pulse">RACING</span>
            ) : (
                <span className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">FINISHED</span>
            )}
          </div>

          <div className="flex flex-col items-end">
             <span className="text-[10px] text-pink-500 uppercase tracking-[0.2em] font-bold mb-1">Status</span>
             <span className={`text-lg font-bold font-display tracking-widest ${winner === 'PLAYER' ? 'text-cyan-400' : winner === 'CPU' ? 'text-pink-500' : 'text-slate-400'}`}>
               {winner ? `${winner} WINS` : 'PROCESSING'}
             </span>
          </div>
        </header>

        {/* Main Game Area */}
        <main className="w-full p-4 md:p-8 space-y-6 flex-grow flex flex-col justify-center bg-slate-900/40 relative">
          
          {/* CPU Section */}
          <div className={`transition-all duration-500 rounded-lg p-3 border border-transparent ${winner === 'CPU' ? 'bg-pink-900/20 border-pink-500/50 shadow-[0_0_30px_rgba(236,72,153,0.2)]' : 'bg-slate-900/50'}`}>
            <div className="flex justify-between items-end mb-3 px-2">
              <h2 className="text-pink-400 font-bold flex items-center gap-3 font-display tracking-wider">
                <div className={`w-3 h-3 bg-pink-500 rounded-sm ${!cpuFinished ? 'animate-ping' : ''}`}></div>
                OPPONENT_CPU
              </h2>
              <span className="text-xs font-mono text-pink-300 border border-pink-500/30 bg-pink-900/30 px-3 py-1 rounded-sm shadow-[0_0_10px_rgba(236,72,153,0.2)]">
                ALGO: {cpuAlgo.toUpperCase()}
              </span>
            </div>
            <GameCanvas 
              data={cpuData} 
              activeIndices={cpuActiveIndices}
              pivotIndex={cpuPivot}
              label="CPU_THREAD_01" 
              colorTheme="cpu" 
              finished={cpuFinished}
            />
          </div>

          {/* Separator */}
          <div className="relative h-px bg-slate-700/50 w-full flex justify-center items-center">
             <div className="bg-[#0f172a] px-4 text-xs text-slate-500 font-mono tracking-[0.3em] border border-slate-700/50 rounded-full">
               VS
             </div>
          </div>

          {/* Player Section */}
          <div className={`transition-all duration-500 rounded-lg p-3 border border-transparent ${winner === 'PLAYER' ? 'bg-cyan-900/20 border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.2)]' : 'bg-slate-900/50'}`}>
            <div className="flex justify-between items-end mb-3 px-2">
              <h2 className="text-cyan-400 font-bold flex items-center gap-3 font-display tracking-wider">
                 <div className={`w-3 h-3 bg-cyan-500 rounded-sm ${!playerFinished ? 'animate-ping' : ''}`}></div>
                 PLAYER_ONE
              </h2>
              <span className="text-xs font-mono text-cyan-300 border border-cyan-500/30 bg-cyan-900/30 px-3 py-1 rounded-sm shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                ALGO: {playerAlgo.toUpperCase()}
              </span>
            </div>
            <GameCanvas 
              data={playerData} 
              activeIndices={playerActiveIndices} 
              pivotIndex={playerPivot}
              label="LOCAL_HOST" 
              colorTheme="player" 
              finished={playerFinished}
            />
          </div>

        </main>
      </div>

      {/* Footer / Results Overlay */}
      {gameState === GameState.FINISHED && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-md transition-opacity"></div>
          <div className="bg-black/80 border border-white/10 p-10 rounded-2xl max-w-lg w-full text-center shadow-2xl transform transition-all scale-100 relative z-10 box-glow animate-fade-in-up">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"></div>
             
             <h2 className={`text-6xl font-black mb-4 font-display tracking-tighter ${winner === 'PLAYER' ? 'text-cyan-400 drop-shadow-[0_0_20px_rgba(6,182,212,0.8)]' : 'text-pink-500 drop-shadow-[0_0_20px_rgba(236,72,153,0.8)]'}`}>
               {winner === 'PLAYER' ? 'VICTORY' : 'DEFEAT'}
             </h2>
             
             <p className="text-slate-300 mb-10 font-mono text-lg leading-relaxed border-t border-b border-white/10 py-6">
               {winner === 'PLAYER' 
                 ? <span className="text-cyan-100">Optimal sorting efficiency achieved.<br/>System integrity restored.</span> 
                 : <span className="text-pink-100">CPU logic superior.<br/>Your algorithms require optimization.</span>}
             </p>

             <button 
               onClick={resetGame}
               className="w-full py-4 bg-white hover:bg-cyan-50 text-slate-900 font-black rounded transition-all uppercase tracking-[0.2em] font-display shadow-lg hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] transform hover:-translate-y-1"
             >
               Re-Initialize
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;