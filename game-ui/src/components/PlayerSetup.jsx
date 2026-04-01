import React, { useState } from 'react';
import { ChevronLeft, Plus } from 'lucide-react';
import AddPlayerModal from './AddPlayerModal';

export default function PlayerSetup({ onBack, gameName = "SHARP SHOOTER", mode = "COMPETITION MODE" }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSlot, setActiveSlot] = useState(null);
  
  // Track players: null means empty slot, true means player added
  const [teamBlue, setTeamBlue] = useState([null, null]);
  const [teamGreen, setTeamGreen] = useState([null, null]);

  const handleSlotClick = (team, index) => {
    setActiveSlot({ team, index });
    setIsModalOpen(true);
  };

  const handleConfirmPlayer = () => {
    if (!activeSlot) return;
    
    if (activeSlot.team === 'blue') {
      const newTeam = [...teamBlue];
      newTeam[activeSlot.index] = true;
      setTeamBlue(newTeam);
    } else {
      const newTeam = [...teamGreen];
      newTeam[activeSlot.index] = true;
      setTeamGreen(newTeam);
    }
  };

  const renderPlayerSlot = (team, index, isOccupied) => {
    return (
      <div 
        key={`${team}-${index}`}
        onClick={() => !isOccupied && handleSlotClick(team, index)}
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
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Priyanshi" alt="Player Avatar" className="w-full h-full object-cover bg-white/20" />
            </div>
            <span className="text-white text-lg font-bold tracking-wider">
              PLAYER {index + 1}
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen text-white p-8 overflow-hidden relative">
      {/* Background grid pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="max-w-6xl mx-auto relative z-10 pt-4">
        {/* Header Section */}
        <div className="flex items-center mb-10">
          <button 
            onClick={onBack}
            className="mr-6 p-2 bg-red-600/90 hover:bg-red-500 rounded chamfered-border-sm flex items-center justify-center transition-colors"
          >
            <ChevronLeft size={28} className="text-white" />
          </button>
          
          <div>
            <div className="bg-red-600 text-white font-bold px-3 py-1 inline-block uppercase tracking-wider text-xl mb-1 chamfered-border-sm">
              {gameName}
            </div>
            <div className="text-gray-400 text-sm tracking-widest uppercase bg-white/5 px-2 py-0.5 inline-block ml-3">
              {mode}
            </div>
          </div>
        </div>
        
        <p className="text-white/60 mb-8 uppercase tracking-widest text-sm font-semibold bg-black/40 inline-block px-4 py-2 rounded-full border border-white/10">
          Tap an empty slot to add players. Up to 2 players per team.
        </p>

        {/* Teams Layout */}
        <div className="flex gap-12 mt-4">
          {/* Blue Team Column */}
          <div className="flex-1 flex flex-col">
            <div className="h-16 bg-accentBlue w-full mb-1 flex items-center justify-center shadow-[0_0_15px_rgba(66,226,255,0.4)] chamfered-border-sm relative overflow-hidden">
               <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.1)_75%,transparent_75%,transparent)] bg-[length:20px_20px] opacity-30 pointer-events-none" />
               <span className="text-white font-black tracking-[0.2em] text-xl relative z-10 drop-shadow-md">BLUE TEAM</span>
            </div>
            <div className="bg-black/60 backdrop-blur-xl border border-accentBlue/30 p-6 min-h-[400px] shadow-2xl chamfered-border-sm flex-1">
              {teamBlue.map((slot, index) => renderPlayerSlot('blue', index, slot))}
            </div>
          </div>

          {/* Green Team Column */}
          <div className="flex-1 flex flex-col">
            <div className="h-16 bg-accentGreen w-full mb-1 flex items-center justify-center shadow-[0_0_15px_rgba(141,248,100,0.4)] chamfered-border-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.1)_75%,transparent_75%,transparent)] bg-[length:20px_20px] opacity-30 pointer-events-none" />
               <span className="text-dark font-black tracking-[0.2em] text-xl relative z-10 drop-shadow-md">GREEN TEAM</span>
            </div>
            <div className="bg-black/60 backdrop-blur-xl border border-accentGreen/30 p-6 min-h-[400px] shadow-2xl chamfered-border-sm flex-1">
              {teamGreen.map((slot, index) => renderPlayerSlot('green', index, slot))}
            </div>
          </div>
        </div>
      </div>

      <AddPlayerModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={handleConfirmPlayer} 
      />
    </div>
  );
}
