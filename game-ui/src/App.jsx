import React, { useState } from 'react';
import GameSelection from './components/GameSelection';
import PlayerSetup from './components/PlayerSetup';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [selectedGame, setSelectedGame] = useState(null);

  return (
    <div className="w-full min-h-screen bg-black overflow-hidden font-sans relative">
      {/* Global Blurred Hero Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-[6px] opacity-70 scale-105 pointer-events-none z-0"
        style={{ backgroundImage: `url('/assets/hero.png')` }}
      />
      {/* Global Dark Gradient Overlay for Maximum Consistency/Visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80 pointer-events-none z-0" />
      
      <div className="relative z-10 w-full min-h-screen h-full flex overflow-hidden">
        <AnimatePresence mode="wait">
          {!selectedGame ? (
            <motion.div 
               key="selection"
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
               exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)', transition: { duration: 0.4 } }}
               transition={{ duration: 0.5, ease: "easeOut" }}
               className="w-full h-full absolute inset-0"
            >
              <GameSelection onSelectGame={setSelectedGame} />
            </motion.div>
          ) : (
            <motion.div 
               key="setup"
               initial={{ opacity: 0, x: '100%', filter: 'blur(10px)' }}
               animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
               exit={{ opacity: 0, x: '100%', filter: 'blur(10px)', transition: { duration: 0.3 } }}
               transition={{ type: "spring", damping: 25, stiffness: 200 }}
               className="w-full h-full absolute inset-0"
            >
              <PlayerSetup 
                gameName={selectedGame.title} 
                mode={selectedGame.mode}
                onBack={() => setSelectedGame(null)} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
