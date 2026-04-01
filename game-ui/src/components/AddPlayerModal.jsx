import React from 'react';
import { X } from 'lucide-react';

export default function AddPlayerModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-2xl bg-panel border-[1px] border-gray-600/50 chamfered-border">
        {/* Modal Decorative Corners overlay (visual only) */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/20 pointer-events-none chamfered-border-sm" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/20 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/20 pointer-events-none" />

        <div className="p-8 pb-12 flex flex-col items-center">
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors bg-red-500/20 hover:bg-red-500/40 rounded-full p-1"
          >
            <X size={24} className="text-red-400" />
          </button>

          {/* Attention Label */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-8 py-2 bg-red-600 text-white text-sm font-black tracking-[0.3em] chamfered-border-sm shadow-[0_0_20px_rgba(220,38,38,0.6)] uppercase border border-red-400/50 z-20">
            ATTENTION
          </div>

          <h2 className="text-4xl md:text-5xl font-black tracking-[0.1em] mt-8 mb-4 text-center text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            TAP CARD TO ADD PLAYER
          </h2>

          {/* Card Tap Icon */}
          <div className="my-8 mb-12 flex justify-center items-center">
            {/* Using a custom SVG or highly stylized lucide icon here */}
            <svg
              width="120"
              height="120"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" ry="2" />
              <line x1="3" y1="10" x2="21" y2="10" />
              <path d="M7 15h.01M16 15c.5-.5.5-1.5 0-2" />
              {/* Hand representation */}
              <path d="M12 22l-4-4v-4a2 2 0 0 1 4 0v2h1v-3a1.5 1.5 0 0 1 3 0v3h1v-4a1.5 1.5 0 0 1 3 0v9l-8 5z" />
            </svg>
          </div>

          <p className="text-gray-300 text-lg tracking-wide mb-10 text-center uppercase">
            You can have up to 2 players in each team.
          </p>

          {/* OKAY button */}
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-10 py-2 border border-white text-white font-medium tracking-widest hover:bg-white hover:text-black transition-colors"
          >
            OKAY
          </button>
        </div>
      </div>
    </div>
  );
}
