
import React, { useRef } from 'react';
import { Linkedin, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';
import { Parallax } from 'react-parallax';

const TeamSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const teamMembers = [
    {
      name: 'Alex Morgan',
      role: 'Founder & CEO',
      bio: 'Digital marketing strategist with over 15 years of experience helping businesses grow online.'
    },
    {
      name: 'Samantha Wu',
      role: 'SEO Specialist',
      bio: 'Search engine optimization expert focused on driving organic traffic and improving rankings.'
    },
    {
      name: 'James Parker',
      role: 'Content Director',
      bio: 'Skilled content creator and strategist specializing in engaging, conversion-focused content.'
    },
    {
      name: 'Olivia Chen',
      role: 'Social Media Manager',
      bio: 'Social media expert with a passion for creating viral campaigns and growing online communities.'
    }
  ];

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
    hidden: { y: 50, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    },
  };

  const SocialIcon = ({ children }: { children: React.ReactNode }) => (
    <motion.div 
      whileHover={{ scale: 1.2, backgroundColor: "rgba(255, 122, 0, 0.2)" }}
      whileTap={{ scale: 0.9 }}
      className="p-2 rounded-full border border-white/20 hover:border-moodale-orange/50 transition-colors"
    >
      {children}
    </motion.div>
  );

  return (
    <Parallax
      bgImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80"
      strength={200}
      bgImageStyle={{ opacity: 0.1, backgroundColor: 'black' }}
    >
      <section id="team" ref={sectionRef} className="relative py-20 md:py-32 overflow-hidden bg-moodale-black text-white">
        <div className="section-container">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight mb-8 text-center"
          >
            Our Team
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 text-center"
          >
            Meet the experts behind Moodale's successful digital marketing strategies.
          </motion.p>

          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12"
          >
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index} 
                variants={item}
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 25px -5px rgba(255, 122, 0, 0.2)",
                  transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
                className="flex flex-col items-center p-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10"
              >
                <motion.div 
                  whileHover={{ scale: 1.05, rotate: 3 }}
                  className="relative w-full aspect-square mb-6 overflow-hidden rounded-xl bg-gradient-to-br from-moodale-orange/20 to-moodale-orange/5"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div 
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.2 + index * 0.1 
                      }}
                      viewport={{ once: true }}
                      className="text-6xl font-display font-bold text-moodale-orange/40"
                    >
                      {member.name.charAt(0)}
                    </motion.div>
                  </div>
                </motion.div>

                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-moodale-orange mb-3 text-sm font-medium">{member.role}</p>
                <p className="text-white/70 text-sm mb-4 text-center">{member.bio}</p>

                <motion.div className="flex space-x-2 mt-auto">
                  <SocialIcon>
                    <Linkedin className="h-4 w-4 text-white" />
                  </SocialIcon>
                  <SocialIcon>
                    <Twitter className="h-4 w-4 text-white" />
                  </SocialIcon>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </Parallax>
  );
};

export default TeamSection;
