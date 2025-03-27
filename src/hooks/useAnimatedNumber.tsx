
import { useState, useEffect } from 'react';

// Hook to animate numbers (e.g., for stat counters)
export const useAnimatedNumber = (
  target: number, 
  duration: number = 2000, 
  delay: number = 0,
  startWhen: boolean = true
) => {
  const [current, setCurrent] = useState(0);
  
  useEffect(() => {
    if (!startWhen) return;
    
    let startTime: number;
    let animationFrame: number;
    let startValue = 0;
    
    const startAnimation = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      if (progress < delay) {
        animationFrame = requestAnimationFrame(startAnimation);
        return;
      }
      
      const elapsed = progress - delay;
      
      if (elapsed > duration) {
        setCurrent(target);
        return;
      }
      
      const value = easeOutQuart(elapsed, startValue, target - startValue, duration);
      setCurrent(Math.floor(value));
      animationFrame = requestAnimationFrame(startAnimation);
    };
    
    // Easing function for smooth animation
    const easeOutQuart = (t: number, b: number, c: number, d: number) => {
      t /= d;
      t--;
      return -c * (t * t * t * t - 1) + b;
    };
    
    animationFrame = requestAnimationFrame(startAnimation);
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [target, duration, delay, startWhen]);
  
  return current;
};

export default useAnimatedNumber;
