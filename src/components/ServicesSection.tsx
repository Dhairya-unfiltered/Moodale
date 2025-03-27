
import React, { useEffect, useRef } from 'react';
import { Search, Share2, BarChart3, Users, LineChart, ShoppingCart, Target, Database } from 'lucide-react';
import { Parallax } from 'react-parallax';
import { motion } from 'framer-motion';

const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  const services = [
    {
      icon: <Search className="h-8 w-8 text-moodale-orange" />,
      title: 'SEO Optimization',
      description:
        'Improve your search engine rankings and drive organic traffic with our comprehensive SEO strategies.'
    },
    {
      icon: <Share2 className="h-8 w-8 text-moodale-orange" />,
      title: 'Social Media Marketing',
      description:
        'Engage with your audience and build brand awareness through effective social media campaigns.'
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-moodale-orange" />,
      title: 'Content Marketing',
      description:
        'Create valuable, relevant content that attracts and engages your target audience.'
    },
    {
      icon: <Users className="h-8 w-8 text-moodale-orange" />,
      title: 'Influencer Marketing',
      description:
        'Partner with influential personalities to expand your reach and build trust with potential customers.'
    },
    {
      icon: <Target className="h-8 w-8 text-moodale-orange" />,
      title: 'Campaign Marketing',
      description:
        'Launch targeted campaigns designed to meet specific business objectives and drive conversions.'
    },
    {
      icon: <Database className="h-8 w-8 text-moodale-orange" />,
      title: 'Data-Driven Marketing',
      description:
        'Leverage analytics and insights to make informed decisions and optimize your marketing strategies.'
    },
    {
      icon: <ShoppingCart className="h-8 w-8 text-moodale-orange" />,
      title: 'E-Commerce Marketing',
      description:
        'Boost your online sales with specialized strategies for e-commerce platforms and marketplaces.'
    },
    {
      icon: <LineChart className="h-8 w-8 text-moodale-orange" />,
      title: 'PPC Advertising',
      description:
        'Maximize your ROI with targeted pay-per-click campaigns on search engines and social platforms.'
    }
  ];

  return (
    <Parallax
      bgImage="https://images.unsplash.com/photo-1557682250-33bd709cbe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80"
      strength={300}
      bgImageStyle={{ opacity: 0.15, backgroundColor: 'black' }}
    >
      <section id="services" ref={sectionRef} className="relative py-20 md:py-32 overflow-hidden bg-moodale-black text-white">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-moodale-orange/10 to-orange-400/5 blur-2xl" />
        </div>

        <div className="section-container">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight mb-8 text-center"
          >
            Our Services
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 text-center"
          >
            We offer a comprehensive range of digital marketing services to help your business thrive online.
          </motion.p>

          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {services.map((service, index) => (
              <motion.div 
                key={index} 
                variants={item}
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 10px 25px -5px rgba(255, 122, 0, 0.3)",
                  
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="p-6 border border-white/10 rounded-xl shadow-sm backdrop-blur-sm bg-white/5"
              >
                <motion.div 
                  initial={{ scale: 1 }}
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: 5,
                    transition: { yoyo: Infinity, duration: 0.5 }
                  }}
                  className="mb-4"
                >
                  {service.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </Parallax>
  );
};

export default ServicesSection;
