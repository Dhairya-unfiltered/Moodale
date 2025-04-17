
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Parallax } from 'react-parallax';
import AnimatedStat from './AnimatedStat';

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      quote:
        "Working with Moodale has significantly boosted our online presence. Their strategic approach and consistent results have been invaluable to Navdrishti Group.",
      author: "Sanjay Singhal",
      role: "Director, Navdrishti Group",
      rating: 5
    },
    {
      quote:
        "Thanks to Moodale, our café has seen a noticeable increase in footfall and online engagement.",
      // author: "Michael Chen",
      role: "Founder, Make My Day Cafe",
      rating: 5
    },
    {
      quote:
        "Working with Moodale has been a game-changer for our cafe business. Their data-driven approach helped us optimize our ad spend and increase our conversion rate significantly.",
      
      role: "Founder, Rocky's Cafe",
      rating: 5
    }
  ];

  const next = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
      };
    }
  };

  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    setDirection(1);
    next();
  };

  const handlePrev = () => {
    setDirection(-1);
    prev();
  };

  return (
    <Parallax
      bgImage="https://images.unsplash.com/photo-1577760258779-e787a1633c1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80"
      strength={300}
      bgImageStyle={{ opacity: 0.15, backgroundColor: 'black' }}
    >
      <section id="testimonials" className="relative py-20 md:py-32 overflow-hidden bg-moodale-black text-white">
        <div className="section-container">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight mb-8 text-center"
          >
            Success Stories
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 text-center"
          >
            Don't just take our word for it. Here's what our clients have to say about working with Moodale.
          </motion.p>

          <div className="relative max-w-4xl mx-auto">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-md p-8 mb-8"
              >
                <div className="flex flex-col items-center text-center p-4 md:p-8">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex mb-4"
                  >
                    {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </motion.div>
                  <motion.blockquote 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-lg md:text-xl font-medium italic mb-6"
                  >
                    "{testimonials[activeIndex].quote}"
                  </motion.blockquote>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="mt-auto"
                  >
                    <p className="font-semibold">{testimonials[activeIndex].author}</p>
                    <p className="text-sm text-muted-foreground">{testimonials[activeIndex].role}</p>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePrev}
                className="p-2 rounded-full border border-white/20 bg-white/5 hover:bg-moodale-orange/20 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </motion.button>
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setDirection(index > activeIndex ? 1 : -1);
                      setActiveIndex(index);
                    }}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      activeIndex === index ? 'bg-moodale-orange' : 'bg-white/30'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleNext}
                className="p-2 rounded-full border border-white/20 bg-white/5 hover:bg-moodale-orange/20 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </motion.button>
            </div>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mt-16 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-8 max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <AnimatedStat value={550} label="Happy Clients" symbol="+" delay={0} />
              <AnimatedStat value={650} label="Projects Delivered" symbol="+" delay={1} />
              <AnimatedStat value={25} label="Specialists" symbol="+" delay={2} />
              <AnimatedStat value={6} label="Years of operation" symbol="+" delay={3} />
            </div>
          </motion.div>
        </div>
      </section>
    </Parallax>
  );
};

export default TestimonialsSection;
