
import React, { useEffect, useRef } from 'react';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ThreeDModel from './ThreeDModel';

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const children = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    children?.forEach((child) => {
      observer.observe(child as Element);
    });

    return () => {
      children?.forEach((child) => {
        observer.unobserve(child as Element);
      });
    };
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      }
    },
  };

  const hoverEffect = {
    scale: 1.05,
    transition: { type: "spring", stiffness: 400, damping: 10 }
  };

  // Fixed TypeScript issue by properly typing the animation variant
  const glowingText = {
    animate: {
      color: ["#FFFFFF", "#FF7A00", "#FFFFFF"] as string[],
      textShadow: [
        "0 0 5px rgba(255,122,0,0)",
        "0 0 20px rgba(255,122,0,0.8)",
        "0 0 5px rgba(255,122,0,0)"
      ] as string[],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse" as const,
      }
    }
  };

  const serviceCardVariants = {
    hover: {
      scale: 1.05,
      backgroundColor: "rgba(255, 122, 0, 0.2)",
      boxShadow: "0 0 15px rgba(255, 122, 0, 0.5)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };

  return (
    <section id="home" ref={sectionRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-moodale-black text-white">
      {/* Background elements */}
      <ThreeDModel />
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div 
          style={{ y, opacity }}
          className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-moodale-orange/20 to-orange-400/10 blur-3xl" 
        />
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -200]), opacity }}
          className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-orange-400/10 to-moodale-orange/20 blur-3xl" 
        />
      </div>

      <div className="section-container">
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div 
            variants={item}
            className="flex justify-center mb-2"
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 3, -3, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium mb-4"
            >
              <Sparkles className="h-4 w-4 mr-2 text-moodale-orange" />
              <span>Marketing Specialists</span>
            </motion.div>
          </motion.div>
          
          <motion.h1 
            variants={item}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-tight md:leading-tight lg:leading-tight mb-6 tracking-tight"
          >
            Elevate Your 
             <span className='text-moodale-orange'> Digital Presence</span> 
             
           
          </motion.h1>
          
          <motion.p 
            variants={item}
            className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            We craft tailored digital marketing strategies to boost your online visibility and drive measurable results.
          </motion.p>
          
          <motion.div 
            variants={item}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <motion.a 
              whileHover={hoverEffect}
              whileTap={{ scale: 0.95 }}
              className="btn-primary group relative overflow-hidden"
              href="#contact"
            >
              <motion.span 
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%", opacity: 0.5 }}
                whileHover={{ 
                  x: "100%", 
                  transition: { duration: 0.4 }
                }}
              />
              <span className="relative z-10">Get Started</span>
              <ArrowRight className="relative z-10 ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.a>
            <motion.a 
              whileHover={hoverEffect}
              whileTap={{ scale: 0.95 }}
              href="#services" 
              className="btn-secondary group relative overflow-hidden"
            >
              <motion.span 
                className="absolute inset-0 bg-moodale-orange/10"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ 
                  scale: 1, 
                  opacity: 1,
                  transition: { duration: 0.3 }
                }}
              />
              <span className="relative z-10">Explore Services</span>
            </motion.a>
          </motion.div>

          <motion.div 
            variants={container}
            className="flex flex-wrap justify-center gap-6 md:gap-10"
          >
            {["SEO Optimization", "Social Media Marketing", "Content Strategy", "PPC Advertising"].map((service, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={serviceCardVariants.hover}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm shadow-sm px-6 py-3 rounded-full text-sm font-medium border border-white/10"
              >
                <span className="text-white">{service}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      
    </section>
  );
};

export default HeroSection;
