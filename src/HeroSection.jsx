import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

// Animated Code Background Component
const AnimatedCodeBackground = React.memo(() => {
  const codeSnippets = useMemo(() => [
    'const developer = new Creative();',
    'function buildAmazing() { return magic; }',
    'class Innovation extends Creativity {}',
    'const dreams = await reality.build();',
    'import { passion } from "./soul";',
    'export default Excellence;',
    'while(learning) { grow(); }',
    'const future = () => possibilities;',
    '// Code that changes the world',
    'return <PerfectSolution />;',
    'useState(creativity);',
    'useEffect(() => { inspire(); });',
    'npm install awesome-ideas',
    'git commit -m "✨ Magic"',
    'const vision = transform(ideas);'
  ], []);

  const codeLines = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      text: codeSnippets[i],
      x: Math.random() * 100,
      y: Math.random() * 100,
      fontSize: Math.random() * 8 + 12,
      opacity: Math.random() * 0.4 + 0.1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 10,
      color: ['#8b5cf6', '#ec4899', '#3b82f6', '#10b981', '#f59e0b'][Math.floor(Math.random() * 5)]
    }));
  }, [codeSnippets]);

  return (
    <div className="absolute inset-0 overflow-hidden font-mono">
      {codeLines.map((line) => (
        <motion.div
          key={line.id}
          className="absolute whitespace-nowrap select-none pointer-events-none"
          style={{
            left: `${line.x}%`,
            top: `${line.y}%`,
            fontSize: `${line.fontSize}px`,
            color: line.color,
            opacity: line.opacity,
            textShadow: `0 0 10px ${line.color}50`,
            willChange: 'transform, opacity'
          }}
          animate={{
            x: [0, -200, 0],
            y: [0, Math.random() * 100 - 50, 0],
            opacity: [line.opacity, line.opacity * 2, line.opacity],
            scale: [1, 1.1, 1],
            rotateX: [0, Math.random() * 20, 0]
          }}
          transition={{
            duration: line.duration,
            repeat: Infinity,
            delay: line.delay,
            ease: "linear"
          }}
        >
          {line.text}
        </motion.div>
      ))}
      
      {/* Floating brackets and symbols */}
      {['{', '}', '<', '>', '(', ')', '[', ']', ';', '=', '+', '-'].map((symbol, i) => (
        <motion.div
          key={`symbol-${i}`}
          className="absolute text-2xl font-bold select-none pointer-events-none"
          style={{
            left: `${Math.random() * 90 + 5}%`,
            top: `${Math.random() * 90 + 5}%`,
            color: ['#8b5cf6', '#ec4899', '#3b82f6'][Math.floor(Math.random() * 3)],
            opacity: 0.2,
            textShadow: '0 0 15px currentColor'
          }}
          animate={{
            y: [0, -60, 0],
            rotate: [0, 360, 0],
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.6, 0.1]
          }}
          transition={{
            duration: Math.random() * 8 + 6,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut"
          }}
        >
          {symbol}
        </motion.div>
      ))}
    </div>
  );
});

// Enhanced Particle System
const EnhancedParticles = React.memo(() => {
  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      hue: Math.random() * 60 + 250, // Purple to pink range
      duration: Math.random() * 6 + 4,
      delay: Math.random() * 3
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            background: `hsl(${particle.hue}, 80%, 70%)`,
            boxShadow: `0 0 ${particle.size * 6}px hsl(${particle.hue}, 80%, 70%, 0.8)`,
            willChange: 'transform, opacity'
          }}
          animate={{
            y: [0, -80, 0],
            x: [0, Math.random() * 40 - 20, 0],
            scale: [1, 2.5, 1],
            opacity: [0.3, 1, 0.3],
            rotate: [0, 360, 0]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
});

// Geometric Shapes with Code Symbols
const CodeGeometry = React.memo(() => {
  const shapes = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      id: i,
      size: Math.random() * 25 + 15,
      left: Math.random() * 85 + 7.5,
      top: Math.random() * 85 + 7.5,
      symbol: ['{ }', '< >', '[ ]', '( )', '/* */', '=> {}'][i],
      color: ['#8b5cf6', '#ec4899', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'][i],
      duration: Math.random() * 10 + 8,
      delay: Math.random() * 4
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute backdrop-blur-sm border rounded-lg flex items-center justify-center font-mono font-bold select-none"
          style={{
            width: `${shape.size + 20}px`,
            height: `${shape.size}px`,
            left: `${shape.left}%`,
            top: `${shape.top}%`,
            background: `${shape.color}15`,
            borderColor: `${shape.color}40`,
            color: shape.color,
            fontSize: `${shape.size * 0.3}px`,
            textShadow: `0 0 10px ${shape.color}80`,
            willChange: 'transform, opacity'
          }}
          animate={{
            y: [0, -60, 0],
            rotateX: [0, 180, 0],
            rotateY: [0, 360, 0],
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.9, 0.4]
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            delay: shape.delay,
            ease: "easeInOut"
          }}
        >
          {shape.symbol}
        </motion.div>
      ))}
    </div>
  );
});

// Dynamic Background with Code Theme
const DynamicCodeBackground = React.memo(() => {
  return (
    <div className="absolute inset-0">
      {/* Main gradient with code-inspired colors */}
      <motion.div
        className="absolute inset-0 opacity-70"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.4) 0%, transparent 60%),
            radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.4) 0%, transparent 60%),
            radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 70%),
            radial-gradient(circle at 30% 30%, rgba(16, 185, 129, 0.2) 0%, transparent 50%)
          `,
          willChange: 'transform, opacity'
        }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 2, 0],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Terminal-style grid */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
        animate={{
          backgroundPosition: ['0px 0px', '40px 40px', '0px 0px']
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <AnimatedCodeBackground />
      <EnhancedParticles />
      <CodeGeometry />
    </div>
  );
});

// Enhanced 3D Text
const Enhanced3DText = React.memo(({ children, className, size = 'normal', ...props }) => {
  const sizeClasses = {
    small: 'text-xl sm:text-2xl md:text-3xl',
    normal: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl',
    large: 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl'
  };

  return (
    <motion.div
      className={`relative font-black tracking-tight ${sizeClasses[size]} ${className}`}
      style={{
        textShadow: `
          0 1px 0 rgba(139, 92, 246, 0.9),
          0 2px 0 rgba(139, 92, 246, 0.8),
          0 3px 0 rgba(139, 92, 246, 0.7),
          0 4px 0 rgba(139, 92, 246, 0.6),
          0 5px 0 rgba(139, 92, 246, 0.5),
          0 6px 0 rgba(139, 92, 246, 0.4),
          0 8px 2px rgba(0, 0, 0, 0.3),
          0 0 40px rgba(139, 92, 246, 0.7)
        `,
        filter: 'drop-shadow(0 0 30px rgba(139, 92, 246, 0.6))',
        willChange: 'transform, filter'
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
});

// Interactive Button Component
const InteractiveButton = React.memo(({ children, variant = 'primary', className = '', ...props }) => {
  const variants = {
    primary: 'from-purple-600 via-purple-500 to-purple-950',
    secondary: 'border-2 border-purple-400 bg-transparent hover:bg-purple-500 hover:text-white'
  };

  return (
    <motion.button
      whileHover={{ 
        scale: 1.08,
        rotateY: 8,
        boxShadow: variant === 'primary' ? 
          "0 25px 50px rgba(139, 92, 246, 0.6)" : 
          "0 20px 40px rgba(139, 92, 246, 0.4)"
      }}
      whileTap={{ 
        scale: 0.95,
        rotateY: -3
      }}
      className={`
        relative px-8 sm:px-12 py-4 sm:py-6 
        ${variant === 'primary' ? `bg-gradient-to-r ${variants.primary}` : variants.secondary}
        rounded-2xl font-bold text-base sm:text-lg 
        shadow-2xl overflow-hidden group min-w-[180px]
        backdrop-blur-sm transition-all duration-500
        ${className}
      `}
      style={{
        transformStyle: 'preserve-3d',
        boxShadow: variant === 'primary' ? 
          '0 12px 35px rgba(139, 92, 246, 0.4)' : 
          '0 10px 30px rgba(139, 92, 246, 0.3)',
        willChange: 'transform, box-shadow'
      }}
      {...props}
    >
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
          initial={{ x: '-100%', rotate: -5 }}
          whileHover={{ x: '100%', rotate: 5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      )}
      
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
});

const AnimatedCodeHero = () => {
  const [currentText, setCurrentText] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  
  const developerRoles = useMemo(() => [
    "Full-Stack Developer", 
    "FRONT-END DEVELOPER",
    "Problem Solver",
 
  ], []);
  
  const mouseX = useSpring(0, { stiffness: 400, damping: 100 });
  const mouseY = useSpring(0, { stiffness: 400, damping: 100 });
  const backgroundX = useTransform(mouseX, [-1, 1], [-10, 10]);
  const backgroundY = useTransform(mouseY, [-1, 1], [-10, 10]);

  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [checkMobile]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % developerRoles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [developerRoles.length]);

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

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, isMobile]);

  const InteractiveCursor = useMemo(() => {
    if (isMobile) return null;
    
    return (
      <motion.div
        className="fixed w-96 h-96 pointer-events-none z-5 hidden md:block"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, rgba(236, 72, 153, 0.15) 30%, transparent 70%)',
          willChange: 'transform, opacity'
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.8, 0.4],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    );
  }, [isMobile, mousePosition.x, mousePosition.y]);

  return (
    <section id='home' className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-950 to-black text-white overflow-hidden">
      <DynamicCodeBackground />
      
      {InteractiveCursor}
      
      <motion.div 
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full"
        style={{
          x: isMobile ? 0 : backgroundX,
          y: isMobile ? 0 : backgroundY,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 80, rotateX: -30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
          transition={{ 
            duration: 2,
            ease: [0.25, 0.46, 0.45, 0.94],
            staggerChildren: 0.2
          }}
          className="mb-8 sm:mb-12"
          style={{ perspective: '1000px' }}
        >
          {/* Enhanced Main Name */}
          <Enhanced3DText
            size="large"
            className="mb-6 mt-30 sm:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 leading-none"
            style={{
              backgroundSize: '200% 200%',
            }}
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              scale: [1, 1.02, 1],
              filter: [
                'drop-shadow(0 0 30px rgba(139, 92, 246, 0.7)) hue-rotate(0deg)',
                'drop-shadow(0 0 40px rgba(236, 72, 153, 0.8)) hue-rotate(30deg)',
                'drop-shadow(0 0 30px rgba(139, 92, 246, 0.7)) hue-rotate(0deg)'
              ]
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
              },
              filter: {
                duration: 4,
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
          </Enhanced3DText>
          
          {/* Dynamic role text */}
          <motion.div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light mb-8 sm:mb-12 h-12 sm:h-16 md:h-20 flex items-center justify-center relative">
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
                  textShadow: '0 0 30px rgba(139, 92, 246, 0.5)',
                  transformStyle: 'preserve-3d',
                  backgroundSize: '200% 200%',
                  willChange: 'transform, opacity, filter'
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
                    background: 'linear-gradient(90deg, #a78bfa, #f472b6, #60a5fa, #34d399)',
                    backgroundSize: '300% 100%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  {developerRoles[currentText]}
                </motion.span>
              </motion.span>
            </AnimatePresence>
          </motion.div>

          {/* Enhanced subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-base sm:text-lg md:text-xl text-gray-300 mb-10 sm:mb-14 max-w-3xl mx-auto leading-relaxed px-4"
          >
            Crafting exceptional digital experiences through clean code, innovative design, 
            <br className="hidden sm:block" />
            and relentless pursuit of perfection
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex flex-col sm:flex-row flex-wrap gap-6 justify-center mb-16 sm:mb-20 px-4"
        >
          <InteractiveButton variant="primary">
            <span>View Portfolio</span>
            <motion.span
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              ✨
            </motion.span>
          </InteractiveButton>
          
          <InteractiveButton variant="secondary">
            <span>Get in Touch</span>
            <motion.span
              animate={{ 
                y: [0, -3, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              🚀
            </motion.span>
          </InteractiveButton>
        </motion.div>

        {/* Enhanced scroll indicator */}
        <motion.div
          className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 cursor-pointer group"
          animate={{ 
            y: [0, 15, 0],
            rotateX: [0, 10, 0]
          }}
          transition={{ duration: 3, repeat: Infinity }}
          whileHover={{ 
            scale: 1.2, 
            rotateY: isMobile ? 0 : 10,
            filter: 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.8))'
          }}
          style={{ 
            transformStyle: 'preserve-3d',
            willChange: 'transform, filter'
          }}
        >
          <div className="w-8 h-14 border-2 border-purple-400 rounded-full flex justify-center relative backdrop-blur-sm bg-white/5 group-hover:border-pink-400 transition-colors duration-300">
            <motion.div
              className="w-2 h-4 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full mt-3 shadow-lg"
              animate={{ 
                opacity: [0, 1, 0],
                y: [0, 8, 0],
                scale: [1, 1.3, 1]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>
          <motion.p
            className="text-xs sm:text-sm text-gray-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            animate={{ y: [0, 3, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Explore Below
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Code-themed overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none z-5" />
    </section>
  );
};

export default AnimatedCodeHero;