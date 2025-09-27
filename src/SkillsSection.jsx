import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, useSpring } from 'framer-motion';


const skills = [
  { name: "JavaScript", level: 95, color: "from-yellow-400 to-yellow-600", category: "Frontend", icon: "🟨" },
  { name: "React", level: 90, color: "from-blue-400 to-blue-600", category: "Frontend", icon: "⚛️" },
  { name: "Node.js", level: 85, color: "from-green-400 to-green-600", category: "Backend", icon: "🟩" },
  { name: "PHP", level: 88, color: "from-purple-400 to-purple-600", category: "Backend", icon: "🐘" },
  { name: "HTML5", level: 98, color: "from-orange-400 to-orange-600", category: "Frontend", icon: "🟧" },
  { name: "CSS3", level: 95, color: "from-blue-400 to-blue-600", category: "Frontend", icon: "🟦" },
  { name: "MongoDB", level: 80, color: "from-green-400 to-green-600", category: "Backend", icon: "🍃" },
  { name: "MySQL", level: 90, color: "from-blue-400 to-blue-600", category: "Backend", icon: "🗄️" }
];

// 3D Floating Icons Component
const FloatingTechIcons = () => {
  const icons = ['💻', '🚀', '⚡', '🔥', '✨', '🎯', '🌟', '💎'];
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map((icon, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl opacity-20"
          style={{
            left: `${Math.random() * 90 + 5}%`,
            top: `${Math.random() * 90 + 5}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.sin(i) * 20, 0],
            rotateZ: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          {icon}
        </motion.div>
      ))}
    </div>
  );
};

// 3D Animated Background with Neural Network
const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0">
      {/* Neural Network Pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        {[...Array(20)].map((_, i) => (
          <g key={i}>
            <motion.circle
              cx={`${Math.random() * 100}%`}
              cy={`${Math.random() * 100}%`}
              r="2"
              fill="url(#gradient)"
              animate={{
                r: [2, 4, 2],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
            {i > 0 && (
              <motion.line
                x1={`${Math.random() * 100}%`}
                y1={`${Math.random() * 100}%`}
                x2={`${Math.random() * 100}%`}
                y2={`${Math.random() * 100}%`}
                stroke="url(#gradient)"
                strokeWidth="0.5"
                animate={{
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            )}
          </g>
        ))}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
      </svg>

      {/* Floating Geometric Shapes */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`shape-${i}`}
          className="absolute w-20 h-20 border border-purple-500/20"
          style={{
            left: `${Math.random() * 90}%`,
            top: `${Math.random() * 90}%`,
            clipPath: i % 2 === 0 ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
          }}
          animate={{
            rotateY: [0, 360],
            rotateZ: [0, 180],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      <FloatingTechIcons />
    </div>
  );
};

// 3D Skill Card Component
const SkillCard3D = ({ skill, index, isInView }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x: x * 20, y: y * -20 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100, rotateX: -30 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ 
        duration: 1, 
        delay: index * 0.15,
        type: "spring",
        stiffness: 100
      }}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl p-8 rounded-3xl border border-purple-500/30 overflow-hidden"
        style={{
          transformStyle: 'preserve-3d',
          rotateX: mousePosition.y,
          rotateY: mousePosition.x,
        }}
        whileHover={{
          scale: 1.05,
          rotateZ: 2,
          boxShadow: '0 25px 50px rgba(168, 85, 247, 0.3)',
        }}
        transition={{ duration: 0.3 }}
      >
        {/* 3D Floating Icon */}
        <motion.div
          className="text-6xl mb-4 relative z-10"
          animate={{
            rotateY: isHovered ? [0, 360] : 0,
            scale: isHovered ? [1, 1.2, 1] : 1,
            y: isHovered ? [0, -10, 0] : 0,
          }}
          transition={{ duration: 1.5 }}
        >
          {skill.icon}
        </motion.div>

        {/* Skill Name with 3D Effect */}
        <motion.h3 
          className="text-2xl font-bold text-white mb-2 relative z-10"
          style={{
            textShadow: '0 4px 8px rgba(0,0,0,0.3)',
          }}
          animate={isHovered ? { 
            scale: 1.05,
            textShadow: '0 6px 12px rgba(168, 85, 247, 0.4)'
          } : {}}
        >
          {skill.name}
        </motion.h3>
        {/* 3D Progress Ring */}
        <div className="relative mb-6">
          <svg className="w-24 h-24 mx-auto" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="8"
              fill="transparent"
            />
            {/* Progress circle */}
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              stroke={`url(#gradient-${index})`}
              strokeWidth="8"
              fill="transparent"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 40}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
              animate={isInView ? { 
                strokeDashoffset: 2 * Math.PI * 40 * (1 - skill.level / 100),
              } : {}}
              transition={{ duration: 2, delay: index * 0.1 }}
              style={{
                filter: isHovered ? 'drop-shadow(0 0 10px currentColor)' : 'none'
              }}
            />
            {/* Skill percentage */}
            <motion.text
              x="50"
              y="50"
              textAnchor="middle"
              dy="0.3em"
              className="text-lg font-bold fill-white"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1.5 + index * 0.1 }}
            >
              {skill.level}%
            </motion.text>
            
            <defs>
              <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={skill.color?.split(' ')[0]?.replace('from-', '') || '#a855f7'} />
                <stop offset="100%" stopColor={skill.color?.split(' ')[1]?.replace('to-', '') || '#ec4899'} />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Category Badge */}
        <motion.div
          className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${skill.color} text-black text-sm font-semibold relative z-10`}
          whileHover={{ scale: 1.1 }}
        >
          {skill.category}
        </motion.div>

        {/* Animated Glow Effect */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r ${skill.color} opacity-0 rounded-3xl blur-xl`}
          animate={isHovered ? { opacity: 0.2, scale: 1.1 } : { opacity: 0, scale: 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* 3D Depth Layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl pointer-events-none" />
        
        {/* Floating Particles on Hover */}
        <AnimatePresence>
          {isHovered && (
            <>
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-purple-400 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    y: [0, -30],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ 
                    duration: 1.5,
                    delay: Math.random() * 0.5
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

// Main Skills Section Component
const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const [filter, setFilter] = useState('All');
  
  const categories = ['All', 'Frontend', 'Backend', 'Design', ];
  
  const filteredSkills = filter === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === filter);

  return (
    <section id='skills'  ref={ref} className="py-32 bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <motion.h2 
            className="text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-6"
            style={{
              textShadow: '0 0 50px rgba(168, 85, 247, 0.3)',
            }}
            animate={{
              backgroundPosition: ["0%", "100%", "0%"],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            Skills & Expertise
          </motion.h2>
          <motion.p 
            className="text-2xl text-gray-300 mb-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            Mastering the art of digital creation
          </motion.p>

          {/* Category Filter */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7 }}
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  filter === category
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Skills Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          layout
        >
          <AnimatePresence>
            {filteredSkills.map((skill, index) => (
              <SkillCard3D
                key={skill.name}
                skill={skill}
                index={index}
                isInView={isInView}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Stats Section */}
       
      </div>
    </section>
  );
};

export default SkillsSection;