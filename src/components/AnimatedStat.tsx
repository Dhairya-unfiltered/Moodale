
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import useAnimatedNumber from '../hooks/useAnimatedNumber';
import useScrollReveal from '../hooks/useScrollReveal';

interface AnimatedStatProps {
  value: number;
  label: string;
  symbol?: string;
  delay?: number;
}

const AnimatedStat: React.FC<AnimatedStatProps> = ({ 
  value, 
  label, 
  symbol = '',
  delay = 0 
}) => {
  const { ref, isRevealed } = useScrollReveal<HTMLDivElement>({
    threshold: 0.2,
    triggerOnce: true
  });
  
  const current = useAnimatedNumber(value, 2000, delay, isRevealed);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isRevealed ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className="text-center"
    >
      <motion.h3 
        className="text-3xl md:text-4xl font-bold text-moodale-orange"
        initial={{ scale: 0.5 }}
        animate={isRevealed ? { scale: 1 } : {}}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          delay: delay * 0.1 
        }}
      >
        {current}{symbol}
      </motion.h3>
      <p className="text-white/80 mt-2">{label}</p>
    </motion.div>
  );
};

export default AnimatedStat;
