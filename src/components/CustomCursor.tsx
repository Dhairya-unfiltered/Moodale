
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    const handleMouseEnter = () => setHidden(false);
    const handleMouseLeave = () => setHidden(true);

    const handleLinkHover = () => setIsHovering(true);
    const handleLinkLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Add hover effect to all interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleLinkHover);
      element.addEventListener('mouseleave', handleLinkLeave);
    });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);

      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleLinkHover);
        element.removeEventListener('mouseleave', handleLinkLeave);
      });
    };
  }, []);

  // Hide default cursor with CSS
  useEffect(() => {
    // Only on desktop devices
    if (window.innerWidth > 768) {
      document.body.classList.add('custom-cursor');

      return () => {
        document.body.classList.remove('custom-cursor');
      };
    }
  }, []);

  // Don't render on mobile devices
  if (typeof window !== 'undefined' && window.innerWidth <= 768) {
    return null;
  }

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="cursor-main bg-white/50 fixed z-[9999] pointer-events-none rounded-full w-6 h-6 flex items-center justify-center"
        animate={{
          x: position.x - 12,
          y: position.y - 12,
          scale: clicked ? 0.8 : isHovering ? 1.5 : 1,
          opacity: hidden ? 0 : 0.4,
        }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 300,
          mass: 0.5,
        }}
      />

      {/* Dot cursor */}
      <motion.div
        className="cursor-dot bg-moodale-orange fixed z-[9999] pointer-events-none rounded-full w-3 h-3"
        animate={{
          x: position.x - 6,
          y: position.y - 6,
          opacity: hidden ? 0 : 1,
          scale: clicked ? 0.5 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 50,
          stiffness: 500,
          mass: 0.2,
        }}
      />
    </>
  );
};

export default CustomCursor;
