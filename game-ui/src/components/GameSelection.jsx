import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Mousewheel } from 'swiper/modules';
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import { motion } from 'framer-motion';

// Import Swiper styles
import 'swiper/css';

const games = [
  {
    id: 1,
    title: 'ESCAPE THE LAVA',
    description: 'Survive the rising heat!',
    image: '/assets/escape_the_lava.jpg',
    players: '1-6',
    age: '6+',
    levels: '30'
  },
  {
    id: 2,
    title: 'FIND THE COLOR',
    description: 'Speed and recognition challenge',
    image: '/assets/find_the_color.jpg',
    players: '2-4',
    age: '4+',
    levels: '50'
  },
  {
    id: 3,
    title: 'RED LIGHT GREEN LIGHT',
    description: 'Stop on red, move on green',
    image: '/assets/red_light_green_light.jpg',
    players: '2-10',
    age: '8+',
    levels: '15'
  }
];

export default function GameSelection({ onSelectGame }) {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleStart = () => {
    onSelectGame(games[activeIndex]);
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center overflow-hidden relative text-white">
      {/* Top Right Menu Icon */}
      <button className="absolute top-8 right-8 z-[60] p-3 rounded-xl bg-black/20 hover:bg-white/10 border border-white/5 hover:border-white/20 backdrop-blur-md transition-all group">
        <Menu size={36} className="text-white group-hover:text-accentBlue" />
      </button>

      {/* Background decoration */}
      <div className="absolute top-0 w-full h-1/2 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.8)_0%,transparent_100%)] pointer-events-none z-0" />
      <div className="absolute bottom-0 w-full h-[40%] bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-0" />
      
      <div className="z-10 w-full text-center mt-6 mb-4 relative">
        <h1 className="text-5xl md:text-6xl font-black text-white tracking-[0.2em] uppercase mb-3 drop-shadow-[0_5px_15px_rgba(0,0,0,1)]">
          Select Mission
        </h1>
        <p className="text-accentBlue font-bold tracking-[0.3em] text-sm uppercase drop-shadow-[0_2px_5px_rgba(0,0,0,1)]">
          CHOOSE YOUR CHALLENGE
        </p>
      </div>

      <div className="w-full z-10 px-0 flex-1 flex flex-col items-center justify-center">
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex % games.length)}
          centeredSlides={true}
          slidesPerView={'auto'}
          loop={true}
          loopAdditionalSlides={3}
          spaceBetween={40}
          grabCursor={true}
          slideToClickedSlide={true}
          speed={600}
          mousewheel={{ forceToAxis: true }}
          modules={[Navigation, Mousewheel]}
          className="w-full py-8 !overflow-visible"
        >
          {[...games, ...games].map((game, index) => (
            <SwiperSlide key={`${game.id}-${index}`} className="!w-auto">
              {({ isActive }) => (
                <div 
                  className={`w-[800px] h-[450px] max-w-[85vw] mx-auto transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                    isActive ? 'scale-100 z-20 shadow-[0_15px_60px_rgba(66,226,255,0.4)]' : 'scale-[0.85] z-0 shadow-2xl'
                  }`}
                >
                  <motion.div 
                    className={`w-full h-full rounded-2xl overflow-hidden relative cursor-pointer chamfered-border transition-colors duration-300 ${isActive ? 'border-4 border-white' : 'border border-white/20'}`}
                    animate={isActive ? "active" : "inactive"}
                    onClick={isActive ? handleStart : undefined}
                  >
                    <motion.img 
                      src={game.image} 
                      alt={game.title}
                      className="w-full h-full object-cover absolute inset-0 z-0"
                      variants={{ active: { scale: 1.02 }, inactive: { scale: 1 } }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                    {/* Subtle Overlay for contrast */}
                    {!isActive && <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] pointer-events-none" />}
                    {isActive && <div className="absolute inset-0 border-[2px] border-white/10 z-20 pointer-events-none mix-blend-overlay" />}
                  </motion.div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Dynamic Text Information Station Below Carousel */}
        <div className="w-full max-w-4xl mx-auto flex flex-col justify-center items-center mt-6 z-20 min-h-[160px]">
           <motion.h2 
             key={`title-${activeIndex}`}
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-4xl md:text-5xl font-black text-white tracking-[0.1em] uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
           >
             {games[activeIndex].title}
           </motion.h2>

           <motion.p 
             key={`desc-${activeIndex}`}
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="text-gray-300 mt-2 text-lg md:text-xl tracking-widest font-semibold uppercase drop-shadow-md"
           >
             {games[activeIndex].description}
           </motion.p>
           
           <motion.div 
             key={`stats-${activeIndex}`}
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.2 }}
             className="flex items-center gap-8 mt-5 bg-black/40 backdrop-blur-xl border border-white/10 px-10 py-3 rounded-2xl shadow-xl"
           >
              <div className="flex flex-col items-center">
                <span className="text-accentBlue font-black text-2xl leading-none drop-shadow-md mb-1">{games[activeIndex].players}</span>
                <span className="text-white/70 text-[10px] tracking-widest uppercase font-bold">Players</span>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div className="flex flex-col items-center">
                <span className="text-accentGreen font-black text-2xl leading-none drop-shadow-md mb-1">{games[activeIndex].age}</span>
                <span className="text-white/70 text-[10px] tracking-widest uppercase font-bold">Age</span>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div className="flex flex-col items-center">
                <span className="text-accentRed font-black text-2xl leading-none drop-shadow-md mb-1">{games[activeIndex].levels}</span>
                <span className="text-white/70 text-[10px] tracking-widest uppercase font-bold">Levels</span>
              </div>
           </motion.div>
        </div>

        {/* Start Button & Controls Row */}
        <div className="mt-8 flex items-center gap-16 md:gap-32 z-20">
          <motion.button 
            onClick={() => swiperRef.current?.slidePrev()}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.25, backgroundColor: "rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.9 }}
            className="p-6 rounded-full bg-white/5 text-white border border-white/10 hover:border-accentBlue/50 hover:shadow-[0_0_20px_rgba(66,226,255,0.3)] hover:text-accentBlue transition-colors duration-300"
          >
            <ChevronLeft size={56} strokeWidth={2.5} />
          </motion.button>
          
          {/* Animated Neon Start Button Wrapper */}
          <div 
            className="relative p-[3px] chamfered-border-sm cursor-pointer group hover:-translate-y-1 transition-transform duration-300 shadow-[0_0_30px_rgba(66,226,255,0.3)] hover:shadow-[0_0_50px_rgba(141,248,100,0.5)] overflow-hidden" 
            onClick={handleStart}
          >
            {/* Spinning Neon Gradient Layers */}
            <div className="absolute inset-[-200%] animate-[spin_2.5s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_60%,#42e2ff_100%)] opacity-80" />
            <div className="absolute inset-[-200%] animate-[spin_2.5s_linear_infinite] bg-[conic-gradient(from_180deg,transparent_60%,#8df864_100%)] opacity-80" />

            {/* Inner Button Canvas */}
            <div className="relative w-full h-full px-16 md:px-24 py-5 bg-dark text-white font-black tracking-[0.2em] text-2xl uppercase group-hover:bg-white group-hover:text-dark transition-colors duration-300 chamfered-border-sm flex items-center justify-center">
              START
            </div>
          </div>
          
          <motion.button 
            onClick={() => swiperRef.current?.slideNext()}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            whileHover={{ scale: 1.25, backgroundColor: "rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.9 }}
            className="p-6 rounded-full bg-white/5 text-white border border-white/10 hover:border-accentBlue/50 hover:shadow-[0_0_20px_rgba(66,226,255,0.3)] hover:text-accentBlue transition-colors duration-300"
          >
            <ChevronRight size={56} strokeWidth={2.5} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
