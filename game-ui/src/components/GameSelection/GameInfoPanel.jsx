import React from 'react';
import { motion } from 'framer-motion';

export default function GameInfoPanel({ game, activeIndex }) {
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col justify-center items-center mt-6 z-20 min-h-[160px]">
       <motion.h2 
         key={`title-${activeIndex}`}
         initial={{ opacity: 0, y: 10 }}
         animate={{ opacity: 1, y: 0 }}
         className="text-4xl md:text-5xl font-black text-white tracking-[0.1em] uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] text-center"
       >
         {game.title}
       </motion.h2>

       <motion.p 
         key={`desc-${activeIndex}`}
         initial={{ opacity: 0, y: 10 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.1 }}
         className="text-gray-300 mt-2 text-lg md:text-xl tracking-widest font-semibold uppercase drop-shadow-md text-center"
       >
         {game.description}
       </motion.p>
       
       <motion.div 
         key={`stats-${activeIndex}`}
         initial={{ opacity: 0, scale: 0.95 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ delay: 0.2 }}
         className="flex items-center gap-8 mt-5 bg-black/40 backdrop-blur-xl border border-white/10 px-10 py-3 rounded-2xl shadow-xl"
       >
          <div className="flex flex-col items-center">
            <span className="text-[#42e2ff] font-black text-2xl leading-none drop-shadow-md mb-1 uppercase whitespace-nowrap">{game.players}</span>
            <span className="text-white/70 text-[10px] tracking-widest uppercase font-bold">Players</span>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div className="flex flex-col items-center">
            <span className="text-[#8df864] font-black text-2xl leading-none drop-shadow-md mb-1 uppercase">{game.age}</span>
            <span className="text-white/70 text-[10px] tracking-widest uppercase font-bold">Age</span>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div className="flex flex-col items-center">
            <span className="text-[#ff2255] font-black text-2xl leading-none drop-shadow-md mb-1 uppercase">{game.levels}</span>
            <span className="text-white/70 text-[10px] tracking-widest uppercase font-bold">Levels</span>
          </div>
       </motion.div>
    </div>
  );
}
