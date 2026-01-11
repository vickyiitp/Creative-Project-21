import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 font-mono text-center">
          <div className="max-w-md w-full bg-slate-800 border border-red-500/50 p-8 rounded-xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-red-500 animate-pulse"></div>
            <h1 className="text-4xl font-black text-red-500 mb-4 tracking-widest font-display">SYSTEM FAILURE</h1>
            <div className="text-red-300/80 text-sm mb-6 border-l-2 border-red-500 pl-4 text-left">
              CRITICAL_ERROR: {this.state.error?.message || 'Unknown Exception'}
              <br/>
              PROCESS_TERMINATED
            </div>
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(220,38,38,0.5)]"
            >
              Reboot System
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;