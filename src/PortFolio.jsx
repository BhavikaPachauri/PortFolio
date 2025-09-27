import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView ,useMotionValue, useSpring} from "framer-motion";

const LinkedInIcon = () => <div className="w-6 h-6 bg-blue-500 rounded"></div>;
const GitHubIcon = () => <div className="w-6 h-6 bg-gray-800 rounded-full"></div>;
const WhatsAppIcon = () => <div className="w-6 h-6 bg-green-500 rounded-full"></div>;
const EmailIcon = () => <div className="w-6 h-6 bg-red-500 rounded"></div>;


// Enhanced Floating Particles with GSAP-style animations
const FloatingParticles = () => {
  const particlesRef = useRef([]);

  useEffect(() => {
    // Simulate GSAP timeline animations
    const animateParticles = () => {
      particlesRef.current.forEach((particle, i) => {
        if (particle) {
          const delay = i * 100;
          const duration = 3000 + Math.random() * 2000;
          
          particle.animate([
            { 
              transform: 'translateY(0px) translateX(0px) scale(1) rotate(0deg)',
              opacity: 0.3 
            },
            { 
              transform: `translateY(-${30 + Math.random() * 20}px) translateX(${Math.sin(i) * 20}px) scale(1.5) rotate(180deg)`,
              opacity: 1 
            },
            { 
              transform: 'translateY(0px) translateX(0px) scale(1) rotate(360deg)',
              opacity: 0.3 
            }
          ], {
            duration,
            delay,
            iterations: Infinity,
            easing: 'ease-in-out'
          });
        }
      });
    };

    animateParticles();
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(80)].map((_, i) => (
        <div
          key={i}
          ref={el => particlesRef.current[i] = el}
          className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full shadow-lg"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: 'blur(0.5px)',
          }}
        />
      ))}
    </div>
  );
};

// 3D Floating Shapes with enhanced animations
const FloatingShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Enhanced Floating Cubes */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`cube-${i}`}
          className="absolute bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-400/30 shadow-2xl"
          style={{
            width: `${20 + Math.random() * 20}px`,
            height: `${20 + Math.random() * 20}px`,
            left: `${Math.random() * 90 + 5}%`,
            top: `${Math.random() * 90 + 5}%`,
            transform: 'rotateX(45deg) rotateY(45deg)',
            filter: 'drop-shadow(0 0 10px rgba(168, 85, 247, 0.3))',
          }}
          animate={{
            y: [0, -80, 0],
            rotateX: [45, 90, 45],
            rotateY: [45, 90, 45],
            rotateZ: [0, 360],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Enhanced Floating Rings */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`ring-${i}`}
          className="absolute border-2 rounded-full"
          style={{
            width: `${40 + Math.random() * 40}px`,
            height: `${40 + Math.random() * 40}px`,
            left: `${Math.random() * 80 + 10}%`,
            top: `${Math.random() * 80 + 10}%`,
            background: `conic-gradient(from ${Math.random() * 360}deg, transparent, rgba(168, 85, 247, 0.4), transparent)`,
            borderImage: 'linear-gradient(45deg, #a855f7, #ec4899, #06b6d4) 1',
            filter: 'blur(1px) drop-shadow(0 0 20px rgba(168, 85, 247, 0.4))',
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* New: Floating Triangles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`triangle-${i}`}
          className="absolute"
          style={{
            left: `${Math.random() * 90}%`,
            top: `${Math.random() * 90}%`,
            width: 0,
            height: 0,
            borderLeft: `${15 + Math.random() * 10}px solid transparent`,
            borderRight: `${15 + Math.random() * 10}px solid transparent`,
            borderBottom: `${25 + Math.random() * 15}px solid rgba(168, 85, 247, 0.2)`,
            filter: 'drop-shadow(0 0 10px rgba(168, 85, 247, 0.3))',
          }}
          animate={{
            rotateZ: [0, 360],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10 + Math.random() * 5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// Enhanced Animated Background


// Enhanced 3D Project Card
const ProjectCard3D = ({ project, index, isInView }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x: x * 25, y: y * -25 });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 100, rotateX: -30, scale: 0.8 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : {}}
      transition={{ 
        duration: 1.2, 
        delay: index * 0.2,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      className="group relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-3xl overflow-hidden border border-purple-500/30 shadow-2xl"
        style={{
          transformStyle: 'preserve-3d',
          rotateX: mousePosition.y,
          rotateY: mousePosition.x,
        }}
        animate={{
          boxShadow: isHovered 
            ? `0 35px 80px rgba(168, 85, 247, 0.4), 0 0 50px rgba(168, 85, 247, 0.2)` 
            : '0 20px 40px rgba(0, 0, 0, 0.3)',
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Enhanced Project Image/Header */}
        <div className="h-56 relative overflow-hidden">
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${project.color}/30`}
            animate={{
              opacity: [0.3, 0.7, 0.3],
              scale: isHovered ? [1, 1.1, 1] : 1,
            }}
            transition={{
              opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              scale: { duration: 2, repeat: Infinity }
            }}
          />
          
          {/* Animated Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px',
            }}
          />
          
          {/* Project Icon with 3D effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="text-8xl relative z-10"
              animate={{
                rotateY: isHovered ? [0, 360] : 0,
                scale: isHovered ? [1, 1.2, 1] : 1,
                y: isHovered ? [0, -20, 0] : 0,
              }}
              transition={{ duration: 2 }}
              style={{
                filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))',
                textShadow: '0 0 30px rgba(168, 85, 247, 0.6)',
              }}
            >
              {project.image}
            </motion.div>
          </div>

          {/* Status Badge */}
          <motion.div
            className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
              project.status === 'Live' ? 'bg-green-500/80 text-white' : 
              project.status === 'Beta' ? 'bg-orange-500/80 text-white' : 
              'bg-blue-500/80 text-white'
            } backdrop-blur-sm`}
            whileHover={{ scale: 1.1 }}
          >
            {project.status}
          </motion.div>

          {/* Category Badge */}
          <motion.div
            className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/80 text-white backdrop-blur-sm"
            whileHover={{ scale: 1.1 }}
          >
            {project.category}
          </motion.div>
        </div>

        {/* Enhanced Card Content */}
        <div className="p-8 relative z-10">
          <motion.h3
            className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            animate={isHovered ? { 
              scale: 1.05,
              textShadow: '0 0 20px rgba(168, 85, 247, 0.4)'
            } : {}}
            transition={{ duration: 0.3 }}
          >
            {project.title}
          </motion.h3>
          
          <p className="text-gray-300 mb-6 leading-relaxed text-lg">
            {project.description}
          </p>

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {Object.entries(project.stats).map(([key, value], i) => (
              <motion.div
                key={key}
                className="text-center p-3 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg backdrop-blur-sm border border-purple-500/20"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(168, 85, 247, 0.1)' }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-lg font-bold text-white">{value}</div>
                <div className="text-xs text-gray-400 capitalize">{key}</div>
              </motion.div>
            ))}
          </div>

          {/* Tech Stack */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                  transition={{ delay: 0.8 + i * 0.1, type: "spring", stiffness: 200 }}
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: 5,
                    backgroundColor: 'rgba(168, 85, 247, 0.3)',
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full text-sm border border-purple-500/30 font-medium backdrop-blur-sm"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Enhanced CTA Button */}
          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold text-lg overflow-hidden group shadow-lg"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(168, 85, 247, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ x: '-100%' }}
              whileHover={{ x: '0%' }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10">Explore Project</span>
            <motion.span
              className="ml-3 relative z-10 text-xl"
              animate={{ x: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🚀
            </motion.span>
          </motion.a>
        </div>

        {/* 3D Depth Layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-tl from-purple-500/5 to-transparent rounded-3xl pointer-events-none" />
        
        {/* Floating Particles on Hover */}
        <AnimatePresence>
          {isHovered && (
            <>
              {[...Array(15)].map((_, i) => (
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
                    scale: [0, 1.5, 0],
                    y: [0, -50],
                    x: [0, (Math.random() - 0.5) * 40],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ 
                    duration: 2,
                    delay: Math.random() * 0.8
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
const AnimatedBackground1 = () => {
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

        <p className="text-gray-400 text-sm mb-6 relative z-10">{skill.description}</p>

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
                <stop offset="0%" stopColor={(skill.color && skill.color.split(' ')[0]?.replace('from-', '')) || "#a855f7"} />
                <stop offset="100%" stopColor={(skill.color && skill.color.split(' ')[1]?.replace('to-', '')) || "#ec4899"} />
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

const projectDetails = [
  {
    title: 'AI-Powered E-Commerce Platform',
    description: 'A revolutionary shopping experience with AI recommendations, real-time inventory, and immersive 3D product visualization.',
    tech: ['React', 'Node.js', 'TensorFlow', 'Three.js', 'MongoDB'],
    link: '#',
    category: 'Web App',
    status: 'Live',
    image: '🛒',
    color: 'from-purple-500 to-pink-500',
    stats: { users: '10K+', rating: '4.9', performance: '98%' }
  },
  {
    title: 'Blockchain DeFi Dashboard',
    description: 'Advanced cryptocurrency trading platform with real-time analytics, smart contract integration, and portfolio management.',
    tech: ['Vue.js', 'Solidity', 'Web3.js', 'D3.js', 'Python'],
    link: '#',
    category: 'DeFi',
    status: 'In Development',
    image: '⛓️',
    color: 'from-cyan-500 to-blue-500',
    stats: { transactions: '50K+', volume: '$2M+', security: '100%' }
  },
  {
    title: 'Neural Network Visualizer',
    description: 'Interactive machine learning tool for visualizing neural networks with real-time training and performance metrics.',
    tech: ['React', 'Python', 'TensorFlow', 'WebGL', 'FastAPI'],
    link: '#',
    category: 'AI/ML',
    status: 'Live',
    image: '🧠',
    color: 'from-green-500 to-emerald-500',
    stats: { models: '500+', accuracy: '94%', speed: '2.5x' }
  },
  {
    title: 'Metaverse Social Platform',
    description: 'Next-generation social platform with VR integration, 3D avatars, and immersive virtual environments.',
    tech: ['Unity', 'WebXR', 'Node.js', 'Socket.io', 'PostgreSQL'],
    link: '#',
    category: 'VR/AR',
    status: 'Beta',
    image: '🌐',
    color: 'from-orange-500 to-red-500',
    stats: { users: '25K+', worlds: '100+', uptime: '99.9%' }
  },
  {
    title: 'Smart IoT Home System',
    description: 'Intelligent home automation with AI-driven energy optimization, security monitoring, and voice control.',
    tech: ['React Native', 'AWS IoT', 'Python', 'TensorFlow', 'Arduino'],
    link: '#',
    category: 'IoT',
    status: 'Live',
    image: '🏠',
    color: 'from-indigo-500 to-purple-500',
    stats: { devices: '1M+', savings: '35%', response: '<100ms' }
  },
  {
    title: 'AR Fashion Try-On App',
    description: 'Revolutionary fashion app using augmented reality for virtual try-ons with AI-powered style recommendations.',
    tech: ['React Native', 'ARCore', 'TensorFlow', 'Firebase', 'OpenCV'],
    link: '#',
    category: 'Mobile',
    status: 'Live',
    image: '👗',
    color: 'from-pink-500 to-rose-500',
    stats: { downloads: '500K+', accuracy: '96%', satisfaction: '4.8/5' }
  }
];


const services = [
  {
    icon: "💻",
    title: "Web Development",
    description: "Expert in end-to-end web application development, covering both frontend and backend technologies.",
    gradient: "from-purple-600 to-pink-600"
  },
  {
    icon: "🎨",
    title: "UI/UX Design",
    description: "Crafting engaging and intuitive interfaces for better user experience and accessibility.",
    gradient: "from-blue-600 to-cyan-600"
  },
  {
    icon: "🌐",
    title: "Web Designing",
    description: "Creating visually stunning and user-friendly website designs with modern frameworks.",
    gradient: "from-green-600 to-teal-600"
  },
  {
    icon: "🚀",
    title: "Performance Optimization",
    description: "Optimizing websites for speed, SEO, and user experience across all devices.",
    gradient: "from-orange-600 to-red-600"
  }
];

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

/* Removed duplicate AnimatedBackground component */
const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0">
      {/* Animated gradient mesh */}
      <motion.div
        className="absolute inset-0 opacity-70"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%)
          `
        }}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 1, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Moving wave patterns */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(45deg, transparent 40%, rgba(168, 85, 247, 0.1) 50%, transparent 60%),
            linear-gradient(-45deg, transparent 40%, rgba(236, 72, 153, 0.1) 50%, transparent 60%)
          `,
          backgroundSize: '100px 100px',
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      <FloatingParticles />
      <FloatingShapes />
    </div>
  );
};



// Hero Section Component
const FloatingParticlesHero = () => {
  const particlesRef = useRef();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 40 - 20, 0],
            scale: [1, 1.5, 1],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// 3D Geometric Shapes Component
const FloatingShapesHero = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Floating Cubes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`cube-${i}`}
          className="absolute w-8 h-8 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-400/30"
          style={{
            left: `${Math.random() * 90 + 5}%`,
            top: `${Math.random() * 90 + 5}%`,
            transform: 'rotateX(45deg) rotateY(45deg)',
          }}
          animate={{
            y: [0, -50, 0],
            rotateX: [45, 75, 45],
            rotateY: [45, 75, 45],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
      
      {/* Floating Rings */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`ring-${i}`}
          className="absolute w-16 h-16 border-2 border-gradient-to-r from-blue-400/40 to-purple-400/40 rounded-full"
          style={{
            left: `${Math.random() * 80 + 10}%`,
            top: `${Math.random() * 80 + 10}%`,
            background: 'conic-gradient(from 0deg, transparent, rgba(168, 85, 247, 0.3), transparent)',
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 6 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

// Enhanced Animated Background with 3D effects
// const AnimatedBackground = () => {
//   return (
//     <div className="absolute inset-0">
//       {/* Animated gradient mesh */}
//       <motion.div
//         className="absolute inset-0 opacity-70"
//         style={{
//           background: `
//             radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
//             radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
//             radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%)
//           `
//         }}
//         animate={{
//           scale: [1, 1.1, 1],
//           rotate: [0, 1, 0],
//         }}
//         transition={{
//           duration: 20,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       />
      
//       {/* Moving wave patterns */}
//       <motion.div
//         className="absolute inset-0 opacity-30"
//         style={{
//           backgroundImage: `
//             linear-gradient(45deg, transparent 40%, rgba(168, 85, 247, 0.1) 50%, transparent 60%),
//             linear-gradient(-45deg, transparent 40%, rgba(236, 72, 153, 0.1) 50%, transparent 60%)
//           `,
//           backgroundSize: '100px 100px',
//         }}
//         animate={{
//           x: [0, 100, 0],
//           y: [0, -50, 0],
//         }}
//         transition={{
//           duration: 15,
//           repeat: Infinity,
//           ease: "linear",
//         }}
//       />
      
//       <FloatingParticles />
//       <FloatingShapes />
//     </div>
//   );
// };

// 3D Text Component with enhanced effects
const Text3D = ({ children, className, ...props }) => {
  return (
    <motion.div
      className={`relative ${className}`}
      style={{
        textShadow: `
          0 1px 0 rgba(168, 85, 247, 0.8),
          0 2px 0 rgba(168, 85, 247, 0.7),
          0 3px 0 rgba(168, 85, 247, 0.6),
          0 4px 0 rgba(168, 85, 247, 0.5),
          0 5px 0 rgba(168, 85, 247, 0.4),
          0 6px 1px rgba(0, 0, 0, 0.3),
          0 0 40px rgba(168, 85, 247, 0.5)
        `
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};
const HeroSection = () => {
  const [currentText, setCurrentText] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const texts = ["Full Stack Developer", "UI/UX Designer", "Problem Solver", "Tech Enthusiast"];
  
  const mouseX = useSpring(0, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 100 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX - innerWidth / 2) / innerWidth;
      const y = (clientY - innerHeight / 2) / innerHeight;
      
      setMousePosition({ x: clientX, y: clientY });
      mouseX.set(x * 20);
      mouseY.set(y * 20);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white overflow-hidden">
      <AnimatedBackground />
      
      {/* Interactive cursor glow */}
      <motion.div
        className="fixed w-96 h-96 pointer-events-none z-5"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />
      
      <motion.div 
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        style={{
          x: mouseX,
          y: mouseY,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: -30 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="mb-8"
          style={{ perspective: '1000px' }}
        >
          <Text3D
            className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400"
            animate={{ 
              backgroundPosition: ["0%", "100%", "0%"],
              scale: [1, 1.02, 1],
            }}
            transition={{ 
              backgroundPosition: { duration: 8, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{ 
              scale: 1.05,
              rotateY: 5,
              transition: { duration: 0.3 }
            }}
          >
            BHAVIKA
          </Text3D>
          
          <motion.div className="text-2xl md:text-4xl font-light mb-8 h-16 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentText}
                initial={{ opacity: 0, y: 30, rotateX: -90, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, rotateX: 90, scale: 0.8 }}
                transition={{ 
                  duration: 0.8,
                  ease: [0.4, 0.0, 0.2, 1]
                }}
                className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent"
                style={{
                  textShadow: '0 0 20px rgba(168, 85, 247, 0.3)',
                  transformStyle: 'preserve-3d'
                }}
              >
                {texts[currentText]}
              </motion.span>
            </AnimatePresence>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-wrap gap-6 justify-center mb-16"
        >
          <motion.button
            whileHover={{ 
              scale: 1.1,
              rotateY: 10,
              boxShadow: "0 25px 50px rgba(168, 85, 247, 0.5)",
              z: 50
            }}
            whileTap={{ scale: 0.95, rotateY: -5 }}
            className="relative px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold text-lg shadow-2xl overflow-hidden group"
            style={{
              transformStyle: 'preserve-3d',
              boxShadow: '0 10px 30px rgba(168, 85, 247, 0.3)'
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ x: '-100%' }}
              whileHover={{ x: '0%' }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10">View My Work</span>
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ scale: 0, borderRadius: '50%' }}
              whileHover={{ scale: 1.5, borderRadius: '0%' }}
              transition={{ duration: 0.4 }}
            />
          </motion.button>
          
          <motion.button
            whileHover={{ 
              scale: 1.1,
              rotateY: -10,
              backgroundColor: 'rgba(168, 85, 247, 0.8)',
              color: '#000'
            }}
            whileTap={{ scale: 0.95, rotateY: 5 }}
            className="relative px-10 py-5 border-2 border-purple-400 rounded-full font-semibold text-lg hover:text-black transition-all duration-300 backdrop-blur-sm"
            style={{
              transformStyle: 'preserve-3d',
              boxShadow: '0 10px 30px rgba(168, 85, 247, 0.2)'
            }}
          >
            <motion.div
              className="absolute inset-0 bg-purple-400 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-full"
              whileHover={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10">Contact Me</span>
          </motion.button>
        </motion.div>

        {/* Enhanced floating elements */}
        <motion.div
          className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-xl"
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, 180, 360],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute -bottom-20 -right-20 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl"
          animate={{
            scale: [1.5, 1, 1.5],
            rotate: [360, 180, 0],
            opacity: [0.8, 0.3, 0.8],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Enhanced scroll indicator with 3D effect */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
          animate={{ 
            y: [0, 15, 0],
            rotateX: [0, 10, 0]
          }}
          transition={{ duration: 3, repeat: Infinity }}
          whileHover={{ scale: 1.2, rotateY: 10 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="w-8 h-14 border-2 border-purple-400 rounded-full flex justify-center relative backdrop-blur-sm bg-white/5">
            <motion.div
              className="w-2 h-4 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full mt-3 shadow-lg"
              animate={{ 
                opacity: [0, 1, 0],
                y: [0, 8, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-0 border-2 border-purple-300/50 rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
// Animated Skills Section
const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const [filter, setFilter] = useState('All');
  
  const categories = ['All', 'Frontend', 'Backend', 'Design', 'DevOps', 'AI'];
  
  const filteredSkills = filter === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === filter);

  return (
    <section ref={ref} className="py-32 bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
      <AnimatedBackground1 />
      
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

        
      </div>
    </section>
  );
};


// Projects Section with 3D Cards
const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const [filter, setFilter] = useState('All');
  
  const categories = ['All', 'Web App', 'DeFi', 'AI/ML', 'VR/AR', 'IoT', 'Mobile'];
  
  const filteredProjects = filter === 'All' 
    ? projectDetails 
    : projectDetails.filter(project => project.category === filter);

  return (
    <section ref={ref} className="py-32 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20 text-white relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10 max-w-8xl mx-auto px-6">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2 }}
          className="text-center mb-20"
        >
          <motion.h2 
            className="text-8xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-8"
            style={{
              textShadow: '0 0 60px rgba(168, 85, 247, 0.4)',
            }}
            animate={{
              backgroundPosition: ["0%", "100%", "0%"],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            Featured Projects
          </motion.h2>
          <motion.p 
            className="text-2xl text-gray-300 mb-16"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
          >
            Crafting the future of digital experiences
          </motion.p>

          {/* Category Filter */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
          >
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  filter === category
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-purple-500/20'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          layout
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <ProjectCard3D
                key={project.title}
                project={project}
                index={index}
                isInView={isInView}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 2 }}
          className="text-center mt-24"
        >
          <motion.button
            className="px-12 py-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full font-bold text-xl shadow-2xl"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 30px 60px rgba(168, 85, 247, 0.4)",
              backgroundPosition: ["0%", "100%"],
            }}
            whileTap={{ scale: 0.95 }}
            animate={{
              backgroundPosition: ["0%", "100%", "0%"],
            }}
            transition={{
              backgroundPosition: { duration: 3, repeat: Infinity },
            }}
          >
            View All Projects →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};




// Services Section with Hover Effects
const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-20 bg-black text-white relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Services
          </h2>
          <p className="text-xl text-gray-300">What I offer</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)"
              }}
              className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/20 hover:border-purple-500/50 transition-all"
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div
                className="text-6xl mb-6"
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }}
                transition={{ duration: 0.6 }}
              >
                {service.icon}
              </motion.div>
              
              <motion.h3
                className={`text-2xl font-bold mb-4 bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}
                whileHover={{ scale: 1.05 }}
              >
                {service.title}
              </motion.h3>
              
              <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors">
                {service.description}
              </p>

              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                layoutId={`service-bg-${index}`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section with Interactive Elements
const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [showEmail, setShowEmail] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-black via-purple-900/20 to-black text-white relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Let's Work Together
          </h2>
          <p className="text-xl text-gray-300">Ready to bring your ideas to life?</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <h3 className="text-3xl font-bold mb-6">Get In Touch</h3>
            
            <div className="space-y-6">
              <motion.div
                className="flex items-center space-x-4"
                whileHover={{ x: 10 }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  📧
                </div>
                <div>
                  <p className="font-semibold">Email</p>
                  {showEmail ? (
                    <motion.a
                      href="mailto:bhavikapachauri02@gmail.com"
                      className="text-purple-400 hover:text-purple-300"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      bhavikapachauri02@gmail.com
                    </motion.a>
                  ) : (
                    <motion.button
                      onClick={() => setShowEmail(true)}
                      className="text-purple-400 hover:text-purple-300"
                      whileHover={{ scale: 1.05 }}
                    >
                      Click to reveal
                    </motion.button>
                  )}
                </div>
              </motion.div>

              <motion.div
                className="flex items-center space-x-4"
                whileHover={{ x: 10 }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                  📱
                </div>
                <div>
                  <p className="font-semibold">Phone</p>
                  <a href="tel:8449296898" className="text-green-400 hover:text-green-300">
                    +91 8449296898
                  </a>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center space-x-4"
                whileHover={{ x: 10 }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  📍
                </div>
                <div>
                  <p className="font-semibold">Location</p>
                  <p className="text-blue-400">Fatehabad, Agra, India</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/20"
          >
            <div className="space-y-6">
              <motion.div whileFocus={{ scale: 1.02 }}>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-4 bg-gray-800/50 border border-purple-500/30 rounded-lg focus:border-purple-500 focus:outline-none transition-all text-white placeholder-gray-400"
                />
              </motion.div>
              
              <motion.div whileFocus={{ scale: 1.02 }}>
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full p-4 bg-gray-800/50 border border-purple-500/30 rounded-lg focus:border-purple-500 focus:outline-none transition-all text-white placeholder-gray-400"
                />
              </motion.div>
              
              <motion.div whileFocus={{ scale: 1.02 }}>
                <textarea
                  rows="5"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full p-4 bg-gray-800/50 border border-purple-500/30 rounded-lg focus:border-purple-500 focus:outline-none transition-all text-white placeholder-gray-400 resize-none"
                ></textarea>
              </motion.div>
              
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(168, 85, 247, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold text-lg shadow-lg hover:shadow-purple-500/25 transition-all"
              >
                Send Message
              </motion.button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

// Main App Component
export default function Portfolio() {
  const { scrollY } = useScroll();
  const [menuOpen, setMenuOpen] = useState(false);
  
  const navY = useTransform(scrollY, [0, 100], [0, -100]);
  const navOpacity = useTransform(scrollY, [0, 100], [0.8, 1]);

  const navItems = ['Home', 'Skills', 'Projects', 'Services', 'Contact'];
  const socialLinks = [
    { Icon: LinkedInIcon, link: 'https://www.linkedin.com/in/bhavika-pachauri/', label: 'LinkedIn' },
    { Icon: GitHubIcon, link: 'https://github.com/BhavikaPachauri/', label: 'GitHub' },
    { Icon: WhatsAppIcon, link: 'https://wa.me/8449296898', label: 'WhatsApp' },
    { Icon: EmailIcon, link: 'mailto:bhavikapachauri02@gmail.com', label: 'Email' }
  ];

  return (
    <div className="bg-black text-white overflow-x-hidden">
      {/* Animated Navigation */}
      <motion.nav
        style={{ y: navY, opacity: navOpacity }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-purple-500/20"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            BHAVIKA
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:flex items-center space-x-8"
          >
            {navItems.map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative text-white hover:text-purple-400 transition-colors font-medium"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden md:flex items-center space-x-4"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="text-white hover:text-purple-400 transition-colors"
              >
                <social.Icon />
              </motion.a>
            ))}
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={menuOpen ? { rotate: 45 } : { rotate: 0 }}
              className="w-6 h-0.5 bg-white mb-1"
            />
            <motion.div
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-0.5 bg-white mb-1"
            />
            <motion.div
              animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-white"
            />
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black/90 backdrop-blur-md border-t border-purple-500/20"
            >
              <div className="px-6 py-4 space-y-4">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="block text-white hover:text-purple-400 transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item}
                  </motion.a>
                ))}
                <div className="flex space-x-4 pt-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      whileHover={{ scale: 1.2 }}
                      className="text-white hover:text-purple-400 transition-colors"
                    >
                      <social.Icon />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Main Content */}
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
      <ServicesSection />
      <ContactSection />

      {/* Footer */}
      <footer className="py-12 bg-gradient-to-r from-gray-900 to-black text-white relative overflow-hidden">
        <AnimatedBackground />
        
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                BHAVIKA PACHAURI
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Full Stack Developer passionate about creating amazing digital experiences
                with modern technologies and creative solutions.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h4 className="text-lg font-semibold text-purple-400 mb-4">Quick Links</h4>
              <div className="space-y-2">
                {navItems.map((item) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="block text-gray-300 hover:text-purple-400 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h4 className="text-lg font-semibold text-purple-400 mb-4">Connect</h4>
              <div className="flex justify-center md:justify-start space-x-4 mb-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.3, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white hover:shadow-lg transition-all"
                  >
                    <social.Icon />
                  </motion.a>
                ))}
              </div>
              <p className="text-gray-400 text-sm">
                📍 Fatehabad, Agra, India
              </p>
              <p className="text-gray-400 text-sm">
                📧 bhavikapachauri02@gmail.com
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="border-t border-gray-800 mt-8 pt-8 text-center"
          >
            <p className="text-gray-400">
              © 2024 Bhavika Pachauri. Made with{' '}
              <motion.span
                className="text-red-500 inline-block"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                ❤️
              </motion.span>{' '}
              and lots of{' '}
              <span className="text-purple-400">code</span>
            </p>
          </motion.div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <motion.div
        className="fixed bottom-8 right-8 z-40"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 200 }}
      >
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white shadow-2xl hover:shadow-purple-500/50 transition-all"
        >
          <motion.span
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-2xl"
          >
            💬
          </motion.span>
        </motion.a>
      </motion.div>


      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 z-50 origin-left"
        style={{ scaleX: useTransform(scrollY, [0, 2000], [0, 1]) }}
      />
    </div>
  );
}