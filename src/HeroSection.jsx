import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

// Enhanced 3D Floating Particles with depth layers
const FloatingParticles = () => {
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
      {/* Layer 1: Background particles */}
      {[...Array(80)].map((_, i) => (
        <motion.div
          key={`bg-${i}`}
          className="absolute rounded-full"
          style={{
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `radial-gradient(circle, ${
              ['rgba(168, 85, 247, 0.4)', 'rgba(236, 72, 153, 0.4)', 'rgba(59, 130, 246, 0.4)', 'rgba(16, 185, 129, 0.4)'][Math.floor(Math.random() * 4)]
            }, transparent)`
          }}
          animate={{
            y: [0, Math.random() * -100 - 20, 0],
            x: [0, Math.random() * 60 - 30, 0],
            scale: [1, Math.random() * 2 + 1, 1],
            opacity: [0.1, 1, 0.1],
            rotate: [0, Math.random() * 360, 0]
          }}
          transition={{
            duration: Math.random() * 8 + 4,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Layer 2: Mid-ground particles */}
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={`mid-${i}`}
          className="absolute rounded-full backdrop-blur-sm"
          style={{
            width: `${Math.random() * 6 + 3}px`,
            height: `${Math.random() * 6 + 3}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `linear-gradient(45deg, ${
              ['#a855f7', '#ec4899', '#3b82f6', '#10b981'][Math.floor(Math.random() * 4)]
            }, transparent)`,
            boxShadow: `0 0 20px ${['#a855f7', '#ec4899', '#3b82f6', '#10b981'][Math.floor(Math.random() * 4)]}40`
          }}
          animate={{
            y: [0, Math.random() * -150 - 30, 0],
            x: [0, Math.random() * 80 - 40, 0],
            scale: [0.5, 2, 0.5],
            opacity: [0.2, 0.8, 0.2],
            rotate: [0, Math.random() * 720, 0]
          }}
          transition={{
            duration: Math.random() * 6 + 3,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Advanced 3D Geometric Shapes with physics-like movement
const FloatingShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Floating Morphing Cubes */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`cube-${i}`}
          className="absolute backdrop-blur-sm border opacity-60"
          style={{
            width: `${Math.random() * 20 + 10}px`,
            height: `${Math.random() * 20 + 10}px`,
            left: `${Math.random() * 90 + 5}%`,
            top: `${Math.random() * 90 + 5}%`,
            background: `linear-gradient(135deg, ${
              ['rgba(168, 85, 247, 0.3)', 'rgba(236, 72, 153, 0.3)', 'rgba(59, 130, 246, 0.3)'][Math.floor(Math.random() * 3)]
            }, transparent)`,
            borderColor: `${['#a855f7', '#ec4899', '#3b82f6'][Math.floor(Math.random() * 3)]}60`,
            transform: `rotateX(${Math.random() * 60}deg) rotateY(${Math.random() * 60}deg)`,
            borderRadius: `${Math.random() * 20}px`
          }}
          animate={{
            y: [0, Math.random() * -80 - 20, 0],
            rotateX: [0, Math.random() * 360, 0],
            rotateY: [0, Math.random() * 360, 0],
            rotateZ: [0, Math.random() * 180, 0],
            scale: [0.8, 1.5, 0.8],
            borderRadius: [`${Math.random() * 20}px`, `${Math.random() * 50}px`, `${Math.random() * 20}px`]
          }}
          transition={{
            duration: Math.random() * 8 + 4,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Floating Energy Rings */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`ring-${i}`}
          className="absolute rounded-full border-2"
          style={{
            width: `${Math.random() * 40 + 20}px`,
            height: `${Math.random() * 40 + 20}px`,
            left: `${Math.random() * 80 + 10}%`,
            top: `${Math.random() * 80 + 10}%`,
            borderColor: `${['#a855f7', '#ec4899', '#3b82f6', '#10b981'][Math.floor(Math.random() * 4)]}80`,
            background: `conic-gradient(from ${Math.random() * 360}deg, transparent, ${
              ['rgba(168, 85, 247, 0.4)', 'rgba(236, 72, 153, 0.4)', 'rgba(59, 130, 246, 0.4)', 'rgba(16, 185, 129, 0.4)'][Math.floor(Math.random() * 4)]
            }, transparent)`,
            boxShadow: `0 0 30px ${['#a855f7', '#ec4899', '#3b82f6', '#10b981'][Math.floor(Math.random() * 4)]}60`
          }}
          animate={{
            rotate: [0, 360],
            scale: [0.5, 1.8, 0.5],
            opacity: [0.3, 1, 0.3],
            y: [0, Math.random() * -60, 0]
          }}
          transition={{
            duration: Math.random() * 10 + 5,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Floating Hexagons */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`hex-${i}`}
          className="absolute"
          style={{
            width: `${Math.random() * 30 + 15}px`,
            height: `${Math.random() * 30 + 15}px`,
            left: `${Math.random() * 85 + 7.5}%`,
            top: `${Math.random() * 85 + 7.5}%`,
            clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
            background: `linear-gradient(60deg, ${
              ['rgba(168, 85, 247, 0.4)', 'rgba(236, 72, 153, 0.4)', 'rgba(59, 130, 246, 0.4)'][Math.floor(Math.random() * 3)]
            }, transparent)`
          }}
          animate={{
            rotate: [0, 360],
            scale: [0.7, 1.4, 0.7],
            y: [0, Math.random() * -100, 0],
            opacity: [0.4, 0.9, 0.4]
          }}
          transition={{
            duration: Math.random() * 12 + 6,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// Ultra-Dynamic Animated Background
const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0">
      {/* Primary gradient mesh */}
      <motion.div
        className="absolute inset-0 opacity-80"
        style={{
          background: `
            radial-gradient(ellipse at 10% 90%, rgba(168, 85, 247, 0.4) 0%, transparent 60%),
            radial-gradient(ellipse at 90% 10%, rgba(236, 72, 153, 0.4) 0%, transparent 60%),
            radial-gradient(ellipse at 50% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 70%),
            radial-gradient(ellipse at 20% 20%, rgba(16, 185, 129, 0.2) 0%, transparent 50%)
          `
        }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 2, 0],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Secondary shifting gradients */}
      <motion.div
        className="absolute inset-0 opacity-50"
        style={{
          background: `
            conic-gradient(from 0deg at 30% 30%, transparent, rgba(168, 85, 247, 0.3), transparent),
            conic-gradient(from 120deg at 70% 70%, transparent, rgba(236, 72, 153, 0.3), transparent)
          `
        }}
        animate={{
          rotate: [0, 360],
          scale: [0.8, 1.3, 0.8]
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Dynamic wave patterns */}
      <motion.div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(45deg, transparent 30%, rgba(168, 85, 247, 0.2) 50%, transparent 70%),
            linear-gradient(-45deg, transparent 30%, rgba(236, 72, 153, 0.2) 50%, transparent 70%),
            linear-gradient(90deg, transparent 40%, rgba(59, 130, 246, 0.15) 50%, transparent 60%)
          `,
          backgroundSize: '120px 120px, 80px 80px, 200px 200px',
        }}
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -80, 40, 0],
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      <FloatingParticles />
      <FloatingShapes />
    </div>
  );
};

// Enhanced 3D Text Component
const Text3D = ({ children, className, size = 'normal', ...props }) => {
  const sizeClasses = {
    small: 'text-xl sm:text-2xl md:text-3xl',
    normal: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl',
    large: 'text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem]'
  };

  return (
    <motion.div
      className={`relative font-black tracking-tight ${sizeClasses[size]} ${className}`}
      style={{
        textShadow: `
          0 1px 0 rgba(168, 85, 247, 0.9),
          0 2px 0 rgba(168, 85, 247, 0.8),
          0 3px 0 rgba(168, 85, 247, 0.7),
          0 4px 0 rgba(168, 85, 247, 0.6),
          0 5px 0 rgba(168, 85, 247, 0.5),
          0 6px 0 rgba(168, 85, 247, 0.4),
          0 7px 1px rgba(0, 0, 0, 0.3),
          0 0 50px rgba(168, 85, 247, 0.6)
        `,
        filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.5))'
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
  const [isMobile, setIsMobile] = useState(false);
  
  const texts = [
    "Full Stack Developer", 
    "UI/UX Designer", 
    "Problem Solver", 
    "Tech Enthusiast",
    "Creative Innovator",
    "Digital Artist"
  ];
  
  const mouseX = useSpring(0, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 100 });
  const backgroundX = useTransform(mouseX, [-1, 1], [-20, 20]);
  const backgroundY = useTransform(mouseY, [-1, 1], [-20, 20]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [texts.length]);

  useEffect(() => {
    if (isMobile) return;
    
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX - innerWidth / 2) / innerWidth;
      const y = (clientY - innerHeight / 2) / innerHeight;
      
      setMousePosition({ x: clientX, y: clientY });
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, isMobile]);

  return (
    <section id='home' className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-950 to-black text-white overflow-hidden">
      <AnimatedBackground />
      
      {/* Interactive cursor glow - desktop only */}
      {!isMobile && (
        <motion.div
          className="fixed w-96 h-96 pointer-events-none z-5 hidden md:block"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, rgba(236, 72, 153, 0.15) 30%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        />
      )}
      
      <motion.div 
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full"
        style={{
          x: isMobile ? 0 : backgroundX,
          y: isMobile ? 0 : backgroundY,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 100, rotateX: -45, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
          transition={{ 
            duration: 2,
            ease: [0.25, 0.46, 0.45, 0.94],
            staggerChildren: 0.2
          }}
          className="mb-8 sm:mb-12"
          style={{ perspective: '1000px' }}
        >
          {/* Main Name */}
          <Text3D
            size="large"
            className="mb-4 sm:mb-6 md:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-green-400 leading-none"
            style={{
              backgroundSize: '200% 200%',
            }}
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              scale: [1, 1.02, 1],
            }}
            transition={{ 
              backgroundPosition: { 
                duration: 8, 
                repeat: Infinity, 
                ease: "linear" 
              },
              scale: { 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }
            }}
            whileHover={{ 
              scale: isMobile ? 1.02 : 1.05,
              rotateY: isMobile ? 0 : 5,
              transition: { duration: 0.3 }
            }}
          >
            BHAVIKA
          </Text3D>
          
          {/* Animated role text */}
          <motion.div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light mb-8 sm:mb-12 h-12 sm:h-16 md:h-20 flex items-center justify-center relative">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentText}
                initial={{ 
                  opacity: 0, 
                  y: 50, 
                  rotateX: -90, 
                  scale: 0.8,
                  filter: 'blur(10px)'
                }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  rotateX: 0, 
                  scale: 1,
                  filter: 'blur(0px)'
                }}
                exit={{ 
                  opacity: 0, 
                  y: -50, 
                  rotateX: 90, 
                  scale: 0.8,
                  filter: 'blur(10px)'
                }}
                transition={{ 
                  duration: 0.8,
                  ease: [0.4, 0.0, 0.2, 1]
                }}
                className="absolute inset-0 bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent font-medium"
                style={{
                  textShadow: '0 0 30px rgba(168, 85, 247, 0.4)',
                  transformStyle: 'preserve-3d',
                  backgroundSize: '200% 200%'
                }}
              >
                <motion.span
                  animate={{ 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "linear"
                  }}
                  style={{
                    background: 'linear-gradient(90deg, #d8b4fe, #f9a8d4, #93c5fd, #6ee7b7)',
                    backgroundSize: '300% 100%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  {texts[currentText]}
                </motion.span>
              </motion.span>
            </AnimatePresence>
            
            {/* Text underline effect */}
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4"
          >
            Crafting digital experiences that blend creativity with cutting-edge technology. 
            <br className="hidden sm:block" />
            Let's build something extraordinary together.
          </motion.p>
        </motion.div>

        {/* Enhanced CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 justify-center mb-16 sm:mb-20 px-4"
        >
          <motion.button
            whileHover={{ 
              scale: 1.05,
              rotateY: isMobile ? 0 : 10,
              boxShadow: "0 25px 50px rgba(168, 85, 247, 0.6)",
            }}
            whileTap={{ scale: 0.98, rotateY: isMobile ? 0 : -5 }}
            className="relative px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl font-bold text-base sm:text-lg shadow-2xl overflow-hidden group min-w-[200px]"
            style={{
              transformStyle: 'preserve-3d',
              boxShadow: '0 15px 35px rgba(168, 85, 247, 0.4)'
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              initial={{ x: '-100%', rotate: -10 }}
              whileHover={{ x: '100%', rotate: 10 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
            <span className="relative z-10 flex items-center justify-center gap-2">
              <span>View My Work</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✦
              </motion.span>
            </span>
            <motion.div
              className="absolute inset-0 bg-white/20 rounded-2xl"
              initial={{ scale: 0, borderRadius: '50%' }}
              whileHover={{ scale: 1.5, borderRadius: '20px' }}
              transition={{ duration: 0.5 }}
            />
          </motion.button>
          
          <motion.button
            whileHover={{ 
              scale: 1.05,
              rotateY: isMobile ? 0 : -10,
              backgroundColor: 'rgba(168, 85, 247, 0.9)',
              color: '#000',
              borderColor: 'transparent'
            }}
            whileTap={{ scale: 0.98, rotateY: isMobile ? 0 : 5 }}
            className="relative px-8 sm:px-10 py-4 sm:py-5 border-2 border-purple-400 rounded-2xl font-bold text-base sm:text-lg hover:text-black transition-all duration-500 backdrop-blur-sm bg-white/5 min-w-[200px]"
            style={{
              transformStyle: 'preserve-3d',
              boxShadow: '0 15px 35px rgba(168, 85, 247, 0.2)'
            }}
          >
            <motion.div
              className="absolute inset-0 bg-purple-400 opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-2xl"
              whileHover={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 0.4 }}
            />
            <span className="relative z-10 flex items-center justify-center gap-2">
              <span>Contact Me</span>
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                ⚡
              </motion.span>
            </span>
          </motion.button>
        </motion.div>

        

        {/* Enhanced floating elements */}
        <motion.div
          className="absolute -top-10 sm:-top-20 -left-10 sm:-left-20 w-20 sm:w-40 h-20 sm:h-40 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-xl"
          animate={{
            scale: [1, 1.8, 1],
            rotate: [0, 180, 360],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute -bottom-10 sm:-bottom-20 -right-10 sm:-right-20 w-16 sm:w-32 h-16 sm:h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl"
          animate={{
            scale: [1.5, 1, 1.5],
            rotate: [360, 180, 0],
            opacity: [0.8, 0.2, 0.8],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Enhanced scroll indicator */}
        <motion.div
          className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer group"
          animate={{ 
            y: [0, 15, 0],
            rotateX: [0, 10, 0]
          }}
          transition={{ duration: 3, repeat: Infinity }}
          whileHover={{ scale: 1.2, rotateY: isMobile ? 0 : 10 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="w-6 sm:w-8 h-10 sm:h-14 border-2 border-purple-400 rounded-full flex justify-center relative backdrop-blur-sm bg-white/5 group-hover:border-pink-400 transition-colors duration-300">
            <motion.div
              className="w-1.5 sm:w-2 h-3 sm:h-4 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full mt-2 sm:mt-3 shadow-lg"
              animate={{ 
                opacity: [0, 1, 0],
                y: [0, 6, 0],
                scale: [1, 1.3, 1]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-0 border-2 border-purple-300/50 rounded-full group-hover:border-pink-300/50 transition-colors duration-300"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute -inset-2 border border-purple-400/30 rounded-full"
              animate={{
                scale: [1, 1.6, 1],
                opacity: [0.3, 0, 0.3],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>
          <motion.p
            className="text-xs sm:text-sm text-gray-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            animate={{ y: [0, 3, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scroll to explore
          </motion.p>
        </motion.div>

        {/* Additional creative elements */}
        <motion.div
          className="absolute top-1/4 left-4 sm:left-10 w-2 h-20 sm:h-32 bg-gradient-to-b from-purple-400/40 to-transparent rounded-full"
          animate={{
            scaleY: [0, 1, 0],
            opacity: [0, 0.6, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: 1
          }}
        />
        
        <motion.div
          className="absolute top-1/3 right-4 sm:right-10 w-2 h-16 sm:h-24 bg-gradient-to-b from-pink-400/40 to-transparent rounded-full"
          animate={{
            scaleY: [0, 1, 0],
            opacity: [0, 0.6, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: 2
          }}
        />

        {/* Mobile-specific enhancements */}
        <div className="sm:hidden absolute inset-x-4 bottom-20">
          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 0.8, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity
            }}
          />
        </div>
      </motion.div>

      {/* Enhanced background overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 pointer-events-none z-5" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
    </section>
  );
};

export default HeroSection;