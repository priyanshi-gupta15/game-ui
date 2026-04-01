import React from 'react';
import { motion } from 'framer-motion';

export default function NavButton({ icon: Icon, onClick, delay = 0 }) {
  return (
    <motion.button 
      onClick={onClick}
      animate={{ scale: [1, 1.15, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay }}
      whileHover={{ scale: 1.25, backgroundColor: "rgba(255,255,255,0.1)" }}
      whileTap={{ scale: 0.9 }}
      className="p-6 rounded-full bg-white/5 text-white border border-white/10 hover:border-[#42e2ff]/50 hover:shadow-[0_0_20px_rgba(66,226,255,0.3)] hover:text-[#42e2ff] transition-colors duration-300"
    >
      <Icon size={56} strokeWidth={2.5} />
    </motion.button>
  );
}
