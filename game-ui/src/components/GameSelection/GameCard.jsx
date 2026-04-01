import React from 'react';
import { motion } from 'framer-motion';

export default function GameCard({ game, isActive, onSelect }) {
  return (
    <div 
      className={`h-[450px] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
        isActive ? 'scale-100 z-20 shadow-[0_15px_60px_rgba(66,226,255,0.4)]' : 'scale-[0.85] z-0 shadow-2xl'
      }`}
    >
      <motion.div 
        className={`w-full h-full rounded-2xl overflow-hidden relative cursor-pointer chamfered-border transition-colors duration-300 ${isActive ? 'border-4 border-white' : 'border border-white/20'}`}
        animate={isActive ? "active" : "inactive"}
        onClick={isActive ? onSelect : undefined}
      >
        <motion.img 
          src={game.image} 
          alt={game.title}
          className="w-full h-full object-cover absolute inset-0 z-0"
          variants={{ active: { scale: 1.02 }, inactive: { scale: 1 } }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        {!isActive && <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] pointer-events-none" />}
        {isActive && <div className="absolute inset-0 border-[2px] border-white/10 z-20 pointer-events-none mix-blend-overlay" />}
      </motion.div>
    </div>
  );
}
