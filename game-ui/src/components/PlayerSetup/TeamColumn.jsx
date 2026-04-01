import React from 'react';
import PlayerSlot from './PlayerSlot';

export default function TeamColumn({ title, players, colorClass, shadowClass, onSlotClick }) {
  const isBlue = title.toLowerCase().includes('blue');

  return (
    <div className="flex-1 flex flex-col">
      <div className={`h-16 ${colorClass} w-full mb-1 flex items-center justify-center ${shadowClass} chamfered-border-sm relative overflow-hidden`}>
         <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.1)_75%,transparent_75%,transparent)] bg-[length:20px_20px] opacity-30 pointer-events-none" />
         <span className={`font-black tracking-[0.2em] text-xl relative z-10 drop-shadow-md ${isBlue ? 'text-white' : 'text-dark'}`}>
           {title}
         </span>
      </div>
      <div className={`bg-black/60 backdrop-blur-xl border p-6 min-h-[400px] shadow-2xl chamfered-border-sm flex-1 ${isBlue ? 'border-accentBlue/30' : 'border-accentGreen/30'}`}>
        {players.map((slot, index) => (
          <PlayerSlot 
            key={`${title}-${index}`}
            index={index}
            isOccupied={slot}
            onClick={() => onSlotClick(index)}
          />
        ))}
      </div>
    </div>
  );
}
