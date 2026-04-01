import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Mousewheel } from 'swiper/modules';
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import { motion } from 'framer-motion';

// Separate Components & Data
import { games } from '../data/games';
import GameCard from './GameSelection/GameCard';
import GameInfoPanel from './GameSelection/GameInfoPanel';
import NeonButton from './ui/NeonButton';
import NavButton from './ui/NavButton';

// Import Swiper styles
import 'swiper/css';

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
          slidesPerView={3}
          loop={true}
          spaceBetween={30}
          grabCursor={true}
          slideToClickedSlide={true}
          speed={600}
          mousewheel={{ forceToAxis: true }}
          modules={[Navigation, Mousewheel]}
          className="w-full py-8"
        >
          {/* Triple the array to ensure Swiper loop-cloning works perfectly with centered slides */}
          {[...games, ...games, ...games].map((game, index) => (
            <SwiperSlide key={`slide-${index}`}>
              {({ isActive }) => (
                <GameCard 
                  game={game} 
                  isActive={isActive} 
                  onSelect={handleStart} 
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Dynamic Text Information Station Below Carousel */}
        <GameInfoPanel 
          game={games[activeIndex]} 
          activeIndex={activeIndex} 
        />

        {/* Start Button & Controls Row */}
        <div className="mt-8 flex items-center gap-16 md:gap-32 z-20">
          <NavButton 
            icon={ChevronLeft} 
            onClick={() => swiperRef.current?.slidePrev()} 
            delay={0}
          />
          
          <NeonButton onClick={handleStart}>
            START
          </NeonButton>
          
          <NavButton 
            icon={ChevronRight} 
            onClick={() => swiperRef.current?.slideNext()} 
            delay={1}
          />
        </div>
      </div>
    </div>
  );
}
