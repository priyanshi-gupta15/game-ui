import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import AddPlayerModal from './AddPlayerModal';
import TeamColumn from './PlayerSetup/TeamColumn';

export default function PlayerSetup({ onBack, gameName = "MISSION", mode = "SURVIVAL MODE" }) {
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

  return (
    <div className="min-h-screen text-white p-8 overflow-hidden relative w-full">
      {/* Background grid pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="max-w-6xl mx-auto relative z-10 pt-4">
        {/* Header Section */}
        <div className="flex items-center mb-10">
          <button 
            onClick={onBack}
            className="mr-6 p-2 bg-[#ff2255]/90 hover:bg-[#ff2255] rounded chamfered-border-sm flex items-center justify-center transition-colors"
          >
            <ChevronLeft size={28} className="text-white" />
          </button>
          
          <div>
            <div className="bg-[#ff2255] text-white font-bold px-3 py-1 inline-block uppercase tracking-wider text-xl mb-1 chamfered-border-sm">
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
          <TeamColumn 
            title="BLUE TEAM" 
            players={teamBlue} 
            colorClass="bg-accentBlue" 
            shadowClass="shadow-[0_0_15px_rgba(66,226,255,0.4)]"
            onSlotClick={(index) => handleSlotClick('blue', index)}
          />

          <TeamColumn 
            title="GREEN TEAM" 
            players={teamGreen} 
            colorClass="bg-accentGreen" 
            shadowClass="shadow-[0_0_15px_rgba(141,248,100,0.4)]"
            onSlotClick={(index) => handleSlotClick('green', index)}
          />
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
