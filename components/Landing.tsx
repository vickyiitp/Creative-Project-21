import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import Background from './Background';

interface LandingProps {
  onEnter: () => void;
}

const Landing: React.FC<LandingProps> = ({ onEnter }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [modalContent, setModalContent] = useState<'privacy' | 'terms' | null>(null);

  // Back to Top Logic
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const SocialIcon = ({ href, path, viewBox = "0 0 24 24", label }: { href: string; path: string; viewBox?: string, label: string }) => (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="text-slate-500 hover:text-cyan-400 transition-all transform hover:-translate-y-1 hover:scale-110 p-2"
      aria-label={label}
    >
      <svg className="w-5 h-5 fill-current filter drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]" viewBox={viewBox} xmlns="http://www.w3.org/2000/svg">
        <path d={path} />
      </svg>
    </a>
  );

  return (
    <div className="relative min-h-screen flex flex-col font-sans text-slate-200">
      
      <Background intensity="low" />

      {/* Navigation */}
      <nav className="relative z-50 w-full px-6 py-4 md:px-8 md:py-6 flex justify-between items-center glass-panel border-b-0 border-white/5 sticky top-0">
        <div className="text-xl md:text-2xl font-black font-display tracking-wider text-white flex items-center gap-2 group cursor-default">
          <div className="w-3 h-3 bg-cyan-500 rounded-sm animate-pulse shadow-[0_0_10px_#06b6d4]"></div>
          <span>QS<span className="text-cyan-400 group-hover:text-pink-500 transition-colors duration-300">RACER</span></span>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-semibold tracking-[0.15em] text-slate-400">
          <a href="#how-it-works" className="hover:text-cyan-400 transition-colors relative group">
            MECHANICS
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all group-hover:w-full"></span>
          </a>
          <a href="#story" className="hover:text-pink-400 transition-colors relative group">
            LORE
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-400 transition-all group-hover:w-full"></span>
          </a>
          <button 
            onClick={onEnter}
            className="relative overflow-hidden bg-cyan-900/30 text-cyan-400 border border-cyan-500/50 font-bold py-2 px-6 hover:bg-cyan-500 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(6,182,212,0.3)] clip-path-slant"
            style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)' }}
          >
            ENTER_SYSTEM
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button 
          className="md:hidden text-cyan-400 focus:outline-none p-2 border border-cyan-500/30 bg-cyan-900/20 rounded"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
          aria-expanded={isMenuOpen}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-[#0a0a12]/95 backdrop-blur-xl border-b border-cyan-500/30 p-6 flex flex-col space-y-4 md:hidden animate-fade-in shadow-2xl z-50">
             <a href="#how-it-works" className="text-slate-300 hover:text-cyan-400 font-bold tracking-widest py-2 border-b border-white/5" onClick={() => setIsMenuOpen(false)}>MECHANICS</a>
             <a href="#story" className="text-slate-300 hover:text-pink-400 font-bold tracking-widest py-2 border-b border-white/5" onClick={() => setIsMenuOpen(false)}>LORE</a>
             <button 
              onClick={() => {
                setIsMenuOpen(false);
                onEnter();
              }}
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold py-3 rounded uppercase tracking-wider shadow-lg mt-2"
            >
              Enter System
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex-grow flex items-center justify-center py-20 px-4 text-center">
        <div className="max-w-6xl w-full flex flex-col items-center">
          <div className="inline-block mb-6 px-4 py-1 rounded-sm border border-cyan-500/30 bg-cyan-900/20 text-cyan-300 text-xs font-mono tracking-[0.2em] animate-pulse">
            SYSTEM_STATUS: CRITICAL // PACKET_LOSS_DETECTED
          </div>
          
          <h1 className="glitch text-6xl md:text-8xl lg:text-9xl font-black font-display mb-8 leading-none text-white tracking-tighter" data-text="QUICKSORT RACER">
            QUICKSORT<br />RACER
          </h1>
          
          <p className="text-lg md:text-2xl text-slate-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed px-4">
            The ultimate algorithm battleground. Outperform the CPU in real-time sorting challenges or face <span className="text-pink-500 font-bold text-shadow-neon">immediate deletion</span>.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 px-4 w-full">
            <button 
              onClick={onEnter}
              className="group relative px-10 py-5 bg-transparent overflow-hidden w-full sm:w-auto min-w-[200px]"
            >
              <div className="absolute inset-0 w-full h-full bg-cyan-600 opacity-20 group-hover:opacity-40 transition-opacity border border-cyan-400 skew-x-[-10deg]"></div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-cyan-400 group-hover:h-full group-hover:opacity-20 transition-all duration-300 ease-out skew-x-[-10deg]"></div>
              <div className="absolute top-0 right-0 w-2 h-2 bg-white/50 group-hover:bg-cyan-400 transition-colors"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 bg-white/50 group-hover:bg-cyan-400 transition-colors"></div>
              
              <span className="relative text-2xl font-bold font-display tracking-[0.15em] text-white group-hover:text-cyan-100 uppercase flex items-center justify-center gap-3">
                <span className="animate-pulse">▶</span> PLAY NOW
              </span>
            </button>
            <div className="text-slate-500 font-mono text-sm border-l border-slate-700 pl-4 text-left">
              <div>v2.0.45 [STABLE]</div>
              <div className="text-xs text-slate-600">SERVER: ONLINE</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative z-10 py-24 border-t border-slate-800/50 bg-slate-900/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl md:text-5xl font-black font-display text-center mb-16 text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 text-shadow-neon">SYSTEM</span> ARCHITECTURE
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="glass-panel p-8 rounded hover:border-cyan-500/50 transition-all duration-500 group transform hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-30 transition-opacity">
                <span className="text-6xl font-display font-black text-cyan-500">01</span>
              </div>
              <div className="w-16 h-16 rounded border border-cyan-500/30 bg-slate-900/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold font-display text-white mb-3 group-hover:text-cyan-400 transition-colors">INPUT DATA</h3>
              <p className="text-slate-400 leading-relaxed mb-4 text-sm md:text-base">
                Select your dataset. Random chaos, reversed streams, or nearly sorted arrays. Each requires a different strategic approach.
              </p>
            </div>

            {/* Card 2 */}
            <div className="glass-panel p-8 rounded hover:border-pink-500/50 transition-all duration-500 group transform hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(236,72,153,0.15)] relative overflow-hidden">
               <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-30 transition-opacity">
                <span className="text-6xl font-display font-black text-pink-500">02</span>
              </div>
              <div className="w-16 h-16 rounded border border-pink-500/30 bg-slate-900/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(236,72,153,0.2)]">
                <svg className="w-8 h-8 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold font-display text-white mb-3 group-hover:text-pink-400 transition-colors">INJECT CODE</h3>
              <p className="text-slate-400 leading-relaxed mb-4 text-sm md:text-base">
                Deploy the optimal algorithm. QuickSort for speed, MergeSort for stability, or HeapSort for worst-case defense.
              </p>
            </div>

            {/* Card 3 */}
            <div className="glass-panel p-8 rounded hover:border-purple-500/50 transition-all duration-500 group transform hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] relative overflow-hidden">
               <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-30 transition-opacity">
                <span className="text-6xl font-display font-black text-purple-500">03</span>
              </div>
              <div className="w-16 h-16 rounded border border-purple-500/30 bg-slate-900/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                <svg className="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold font-display text-white mb-3 group-hover:text-purple-400 transition-colors">EXECUTE</h3>
              <p className="text-slate-400 leading-relaxed mb-4 text-sm md:text-base">
                Race against the mainframe's advanced AI CPU. Visualize the sorting process in real-time at 60 frames per second.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section id="story" className="relative z-10 py-24 border-t border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 opacity-90"></div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-sm font-bold tracking-[0.3em] text-cyan-500 mb-6 uppercase animate-pulse">The Archive // 2084</h2>
          <h3 className="text-3xl md:text-5xl font-display font-black text-white mb-8">
            DATA IS THE ONLY <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">CURRENCY</span>
          </h3>
          <p className="text-lg md:text-xl text-slate-400 leading-loose mb-12 border-l-2 border-cyan-500/50 pl-6 text-left bg-slate-900/50 p-6 rounded-r-lg">
            The Global Network has fragmented. Petabytes of corrupt data flood the sectors. You are an <span className="text-white font-bold">Elite Sorter</span>, tasked with restoring order to chaos. 
            <br/><br/>
            Your opponent? The <span className="text-pink-500 font-bold">Zenith-AI</span>, a rogue processor determined to keep the world in entropy.
            Only the most efficient logic can survive.
          </p>
          <button 
            onClick={onEnter}
            className="border border-slate-700 hover:border-cyan-500 text-slate-300 hover:text-cyan-400 px-10 py-4 rounded uppercase tracking-[0.2em] transition-all hover:bg-cyan-900/20 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]"
          >
            Access Terminal
          </button>
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="relative z-10 py-12 border-t border-slate-800 glass-panel mt-auto bg-slate-950/80">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            
            {/* Branding */}
            <div className="text-center md:text-left">
              <div className="text-lg font-display font-bold text-white mb-1 tracking-wider">QUICKSORT RACER</div>
              <p className="text-sm text-slate-500">© 2025 Vickyiitp. All rights reserved.</p>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-6">
              <SocialIcon label="YouTube" href="https://youtube.com/@vickyiitp" path="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              <SocialIcon label="LinkedIn" href="https://linkedin.com/in/vickyiitp" path="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              <SocialIcon label="X (Twitter)" href="https://x.com/vickyiitp" path="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
              <SocialIcon label="GitHub" href="https://github.com/vickyiitp" path="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              <SocialIcon label="Instagram" href="https://instagram.com/vickyiitp" path="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069-3.204 0-3.584-.012-4.849-.069-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </div>

            {/* Contact / Links */}
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-slate-400">
               <a href="mailto:themvaplatform@gmail.com" className="hover:text-cyan-400 transition-colors">themvaplatform@gmail.com</a>
               <a href="https://vickyiitp.tech" className="hover:text-cyan-400 transition-colors" target="_blank" rel="noopener noreferrer">vickyiitp.tech</a>
               <span className="hidden md:inline text-slate-700">|</span>
               <div className="flex space-x-4">
                 <button onClick={() => setModalContent('terms')} className="hover:text-white transition-colors">Terms</button>
                 <button onClick={() => setModalContent('privacy')} className="hover:text-white transition-colors">Privacy</button>
               </div>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Back to Top */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 bg-cyan-600/80 hover:bg-cyan-500 text-white rounded shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all animate-bounce border border-cyan-400/50 backdrop-blur-sm"
          aria-label="Back to Top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}

      {/* Modals */}
      <Modal 
        isOpen={modalContent === 'privacy'} 
        onClose={() => setModalContent(null)}
        title="Privacy Policy"
      >
        <p><strong>Effective Date:</strong> January 1, 2025</p>
        <p>QuickSort Racer ("we", "us", or "our") respects your privacy. This Privacy Policy describes how we collect, use, and share information.</p>
        <h3 className="text-lg font-bold text-white mt-4">1. Information Collection</h3>
        <p>We do not collect personal data. This application runs entirely in your browser. No data is sent to external servers.</p>
      </Modal>

      <Modal 
        isOpen={modalContent === 'terms'} 
        onClose={() => setModalContent(null)}
        title="Terms of Service"
      >
         <p>By accessing QuickSort Racer, you agree to be bound by these Terms of Service.</p>
         <h3 className="text-lg font-bold text-white mt-4">1. License</h3>
         <p>This is a free-to-play educational game. The code is open for educational review.</p>
      </Modal>
    </div>
  );
};

export default Landing;