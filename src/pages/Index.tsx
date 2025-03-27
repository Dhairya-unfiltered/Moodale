
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import TeamSection from '../components/TeamSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    // Smooth scroll to section when clicking on anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });

    return () => {
      clearTimeout(timer);
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', function() {});
      });
    };
  }, []);

  // Page transition variants
  const pageVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Loading screen animation
  const loadingVariants = {
    initial: { opacity: 1 },
    exit: { 
      opacity: 0,
      transition: { 
        duration: 0.8,
        ease: "easeInOut" 
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div 
          key="loader"
          variants={loadingVariants}
          initial="initial"
          exit="exit"
          className="fixed inset-0 flex flex-col items-center justify-center bg-moodale-black z-50"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              transition: { duration: 0.5 }
            }}
            className="relative"
          >
            <motion.div 
              className="w-24 h-24 rounded-full border-t-4 border-moodale-orange"
              animate={{ 
                rotate: 360,
                transition: { duration: 1.5, repeat: Infinity, ease: "linear" }
              }}
            />
            <motion.div 
              className="absolute inset-0 flex items-center justify-center text-moodale-orange text-xl font-bold"
              animate={{ 
                opacity: [0.5, 1, 0.5],
                transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              M
            </motion.div>
          </motion.div>
          <motion.p 
            className="mt-4 text-white text-lg"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              transition: { delay: 0.3, duration: 0.5 }
            }}
          >
            Loading Experience...
          </motion.p>
        </motion.div>
      ) : (
        <motion.div 
          key="content"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex flex-col min-h-screen"
        >
          <Navbar />
          <main className="flex-grow">
            <HeroSection />
            <ServicesSection />
            <TestimonialsSection />
            <TeamSection />
            <ContactSection />
          </main>
          <Footer />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Index;
