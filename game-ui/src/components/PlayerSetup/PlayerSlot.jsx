import React from 'react';
import { Plus } from 'lucide-react';

export default function PlayerSlot({ index, isOccupied, onClick }) {
  return (
    <div 
      onClick={!isOccupied ? onClick : undefined}
      className={`h-32 mb-4 flex items-center justify-center p-6 border transition-all chamfered-border-sm
        ${!isOccupied ? 'cursor-pointer hover:bg-white/10 bg-black/40 border-dashed border-white/20 hover:border-white/50' : 'bg-white/10 border-white/20 shadow-lg'}`}
    >
      {!isOccupied ? (
        <div className="flex items-center space-x-4 w-full justify-center">
          <Plus size={32} className="text-white font-bold" />
          <span className="text-white/70 text-lg uppercase tracking-wider font-semibold">
            ADD PLAYER
          </span>
        </div>
      ) : (
        <div className="flex items-center space-x-4 w-full justify-center">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white">
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Priyanshi-${index}`} 
              alt="Player Avatar" 
              className="w-full h-full object-cover bg-white/20" 
            />
          </div>
          <span className="text-white text-lg font-bold tracking-wider uppercase">
            PLAYER {index + 1}
          </span>
        </div>
      )}
    </div>
  );
}
