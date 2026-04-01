import React from 'react';

export default function NeonButton({ children, onClick, className = '' }) {
  return (
    <div 
      className={`relative p-[3px] chamfered-border-sm cursor-pointer group hover:-translate-y-1 transition-transform duration-300 shadow-[0_0_30px_rgba(66,226,255,0.3)] hover:shadow-[0_0_50px_rgba(141,248,100,0.5)] overflow-hidden ${className}`} 
      onClick={onClick}
    >
      {/* Spinning Neon Gradient Layers */}
      <div className="absolute inset-[-200%] animate-[spin_2.5s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_60%,#42e2ff_100%)] opacity-80" />
      <div className="absolute inset-[-200%] animate-[spin_2.5s_linear_infinite] bg-[conic-gradient(from_180deg,transparent_60%,#8df864_100%)] opacity-80" />

      {/* Inner Button Canvas */}
      <div className="relative w-full h-full px-16 md:px-24 py-5 bg-[#05050a] text-white font-black tracking-[0.2em] text-2xl uppercase group-hover:bg-white group-hover:text-dark transition-colors duration-300 chamfered-border-sm flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
