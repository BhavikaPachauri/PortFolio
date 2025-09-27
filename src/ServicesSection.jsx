import React, { useRef, useEffect, useState, useMemo } from 'react';
import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

// Custom Cursor Component
const CustomCursor = () => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  
  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    
    if (!cursor || !cursorDot) return;
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;
    
    const updateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;
      dotX += (mouseX - dotX) * 0.8;
      dotY += (mouseY - dotY) * 0.8;
      
      cursor.style.transform = `translate3d(${cursorX - 20}px, ${cursorY - 20}px, 0)`;
      cursorDot.style.transform = `translate3d(${dotX - 4}px, ${dotY - 4}px, 0)`;
      
      requestAnimationFrame(updateCursor);
    };
    
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);
    
    document.addEventListener('mousemove', handleMouseMove);
    
    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('button, a, [data-cursor="pointer"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });
    
    updateCursor();
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50 mix-blend-difference">
      <div
        ref={cursorRef}
        className={`fixed w-10 h-10 border border-white rounded-full transition-all duration-300 ${
          isHovering ? 'scale-150 bg-white/10' : 'scale-100'
        }`}
      />
      <div
        ref={cursorDotRef}
        className="fixed w-2 h-2 bg-white rounded-full"
      />
    </div>
  );
};

// Enhanced 3D Background with Particles
const Enhanced3DBackground = () => {
  const { scrollYProgress } = useScroll();
  const containerRef = useRef(null);
  
  // Parallax transforms
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [360, 0]);
  
  return (
    <div className="absolute inset-0 overflow-hidden" ref={containerRef}>
      {/* Animated gradient mesh */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              conic-gradient(from 0deg at 20% 30%, rgba(168, 85, 247, 0.4) 0deg, transparent 120deg),
              conic-gradient(from 120deg at 80% 70%, rgba(236, 72, 153, 0.3) 0deg, transparent 120deg),
              conic-gradient(from 240deg at 40% 80%, rgba(59, 130, 246, 0.3) 0deg, transparent 120deg),
              radial-gradient(ellipse at 50% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 70%)
            `,
          }}
          animate={{
            filter: [
              'hue-rotate(0deg) brightness(1)',
              'hue-rotate(60deg) brightness(1.2)',
              'hue-rotate(120deg) brightness(0.9)',
              'hue-rotate(180deg) brightness(1.1)',
              'hue-rotate(240deg) brightness(1)',
              'hue-rotate(300deg) brightness(1.1)',
              'hue-rotate(360deg) brightness(1)'
            ]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>
      
      {/* 3D Floating Elements */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`float-3d-${i}`}
          className="absolute"
          style={{
            left: `${15 + (i % 5) * 17}%`,
            top: `${10 + Math.floor(i / 5) * 30}%`,
            y: i % 2 === 0 ? y1 : y2,
          }}
          animate={{
            rotateX: [0, 360],
            rotateY: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15 + (i % 3) * 5,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "linear"
          }}
        >
          <div
            className="w-8 h-8 border border-white/20 backdrop-blur-sm"
            style={{
              background: `conic-gradient(from ${i * 24}deg, transparent, rgba(168, 85, 247, 0.3), transparent)`,
              borderRadius: i % 3 === 0 ? '50%' : i % 3 === 1 ? '0' : '20%',
              transformStyle: 'preserve-3d',
              transform: `rotateX(45deg) rotateY(45deg)`,
            }}
          />
        </motion.div>
      ))}
      
      {/* Morphing Orbs */}
      <motion.div
        style={{ rotate: rotate1, y: y1 }}
        className="absolute -top-40 -left-40 w-80 h-80"
      >
        <div className="w-full h-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl" />
        <motion.div
          className="absolute inset-4 bg-gradient-to-l from-blue-400/20 to-purple-600/20 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
      
      <motion.div
        style={{ rotate: rotate2, y: y2 }}
        className="absolute -bottom-40 -right-40 w-96 h-96"
      >
        <div className="w-full h-full bg-gradient-to-l from-cyan-500/30 to-blue-500/30 rounded-full blur-3xl" />
        <motion.div
          className="absolute inset-6 bg-gradient-to-r from-emerald-400/20 to-cyan-600/20 rounded-full blur-2xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </motion.div>
      
      {/* 3D Grid */}
      <div className="absolute inset-0 opacity-5">
        <div
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            transform: 'perspective(1000px) rotateX(60deg)',
            transformOrigin: 'center bottom',
          }}
          className="w-full h-full"
        />
      </div>
      
      {/* Particle System */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-white/40 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-10, -150, -10],
            x: [0, Math.sin(i) * 50, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const services = [
  {
    title: "Frontend Development",
    icon: "💻",
    description: "Building responsive and interactive user interfaces using HTML, CSS, JavaScript, and React.",
    gradient: "from-blue-400 via-indigo-400 to-purple-400",
    color: "blue",
    model3d: "🌐",
  },
  {
    title: "Backend Development",
    icon: "⚙️",
    description: "Creating secure and scalable server-side applications with Node.js, Express, and PHP.",
    gradient: "from-green-400 via-emerald-400 to-teal-400",
    color: "green",
    model3d: "🛠️",
  },
  {
    title: "Database Management",
    icon: "🗄️",
    description: "Designing and managing databases like MySQL and MongoDB to store and organize application data.",
    gradient: "from-yellow-400 via-orange-400 to-red-400",
    color: "yellow",
    model3d: "📊",
  },
  {
    title: "Logo Design",
    icon: "🎨",
    description: "Designing clean and professional logos that represent your brand identity effectively.",
    gradient: "from-pink-400 via-red-400 to-yellow-400",
    color: "pink",
    model3d: "✨",
  },
];

// Enhanced 3D Service Card
const Enhanced3DServiceCard = ({ service, index, isInView }) => {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]));
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]));
  
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    setMousePosition({ x, y });
    mouseX.set(x);
    mouseY.set(y);
  };
  
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 100, rotateX: -15, scale: 0.8 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        rotateX: 0, 
        scale: 1,
      } : {}}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: index * 0.15,
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "1200px",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative cursor-pointer"
      data-cursor="pointer"
    >
      {/* 3D Card Container */}
      <motion.div
        className="relative bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-gray-900/95 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 h-full"
        style={{
          transformStyle: "preserve-3d",
        }}
        animate={{
          boxShadow: isHovered 
            ? `0 40px 80px rgba(168, 85, 247, 0.4), 0 0 120px rgba(168, 85, 247, 0.2), inset 0 2px 0 rgba(255, 255, 255, 0.1)`
            : '0 20px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        }}
        transition={{ duration: 0.4 }}
      >
        {/* Animated Border */}
        <motion.div
          className="absolute inset-0 rounded-3xl"
          style={{
            background: `conic-gradient(from 0deg, transparent, rgba(168, 85, 247, 0.5), transparent, rgba(236, 72, 153, 0.5), transparent)`,
            padding: '1px',
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'xor',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            opacity: isHovered ? 1 : 0,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Card Content */}
        <div 
          className="relative p-8 h-full flex flex-col"
          style={{ transform: "translateZ(50px)" }}
        >
          {/* 3D Icon Container */}
          <div className="relative mb-8 h-24 flex items-center justify-center">
            <motion.div
              className="text-6xl relative z-10"
              animate={{
                rotateY: isHovered ? [0, 360] : 0,
                scale: isHovered ? [1, 1.2, 1] : 1,
              }}
              transition={{
                rotateY: { duration: 2, ease: "easeInOut" },
                scale: { duration: 1, repeat: isHovered ? Infinity : 0 },
              }}
              style={{
                transformStyle: "preserve-3d",
                filter: "drop-shadow(0 10px 20px rgba(168, 85, 247, 0.3))",
              }}
            >
              {service.icon}
            </motion.div>
            
            {/* 3D Icon Shadow */}
            <motion.div
              className="absolute text-6xl opacity-30 blur-md"
              style={{
                transform: "translateZ(-20px) translateY(20px)",
                color: "#8b5cf6",
              }}
              animate={{
                rotateY: isHovered ? [0, 360] : 0,
                scale: isHovered ? [1, 1.2, 1] : 1,
              }}
              transition={{
                rotateY: { duration: 2, ease: "easeInOut" },
                scale: { duration: 1, repeat: isHovered ? Infinity : 0 },
              }}
            >
              {service.icon}
            </motion.div>
            
            {/* Floating 3D Elements */}
            {isHovered && Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={`float-${i}`}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: `linear-gradient(45deg, #8b5cf6, #ec4899)`,
                  left: `${30 + Math.random() * 40}%`,
                  top: `${20 + Math.random() * 60}%`,
                }}
                initial={{ opacity: 0, scale: 0, z: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 2, 0],
                  z: [0, 100, 0],
                  x: [0, Math.random() * 40 - 20],
                  y: [0, Math.random() * 40 - 20],
                }}
                transition={{
                  duration: 2,
                  delay: Math.random() * 0.5,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              />
            ))}
          </div>
          
          {/* Title */}
          <motion.h3
            className={`text-2xl lg:text-3xl font-bold mb-4 bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent leading-tight`}
            style={{ transform: "translateZ(30px)" }}
            animate={isHovered ? {
              backgroundPosition: ['0%', '100%', '0%'],
            } : {}}
            transition={{
              backgroundPosition: { duration: 2, repeat: Infinity },
            }}
          >
            {service.title}
          </motion.h3>
          
          {/* Description */}
          <motion.p
            className="text-gray-300 group-hover:text-white leading-relaxed flex-grow transition-colors duration-300"
            style={{ transform: "translateZ(20px)" }}
          >
            {service.description}
          </motion.p>
          
          
          
          {/* Glow Effect */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}
            style={{ transform: "translateZ(-10px)" }}
          />
        </div>
        
        {/* Interactive Light Effect */}
        {isHovered && (
          <motion.div
            className="absolute pointer-events-none"
            style={{
              width: '200px',
              height: '200px',
              background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%)',
              borderRadius: '50%',
              left: mousePosition.x - 100,
              top: mousePosition.y - 100,
              transform: 'translateZ(5px)',
              filter: 'blur(40px)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const headerY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  
  return (
    <>
      <CustomCursor />
      <section 
        ref={ref} 
        id='services'
        className="relative min-h-screen py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden"
      >
        <Enhanced3DBackground />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Enhanced Header */}
          <motion.div
            style={{ y: headerY }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotateX: -15 }}
              animate={isInView ? { opacity: 1, scale: 1, rotateX: 0 } : {}}
              transition={{ duration: 1, type: "spring", stiffness: 100 }}
              className="relative inline-block"
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.h2 
                className="text-5xl sm:text-6xl lg:text-8xl font-black mb-6 relative"
                style={{
                  background: 'linear-gradient(45deg, #ffffff, #a855f7, #ec4899, #06b6d4, #10b981)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  backgroundSize: '400% 400%',
                  transform: "translateZ(50px)",
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                SERVICES
              </motion.h2>
              
              {/* 3D Text Shadow */}
              <motion.div
                className="absolute inset-0 text-5xl sm:text-6xl lg:text-8xl font-black blur-xl opacity-20"
                style={{
                  background: 'linear-gradient(45deg, #a855f7, #ec4899, #06b6d4)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  transform: "translateZ(-20px) translateY(10px)",
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                SERVICES
              </motion.div>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl lg:text-2xl text-gray-300 font-light tracking-wide max-w-3xl mx-auto"
              style={{ transform: "translateZ(30px)" }}
            >
              Transforming ideas into extraordinary digital experiences with cutting-edge 3D innovation
            </motion.p>
          </motion.div>

          {/* Enhanced Services Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
            style={{ transformStyle: "preserve-3d" }}
          >
            {services.map((service, index) => (
              <Enhanced3DServiceCard
                key={service.title}
                service={service}
                index={index}
                isInView={isInView}
              />
            ))}
          </motion.div>
          
          
        </div>
      </section>
      
      {/* Global Styles */}
      <style jsx global>{`
       
        
        @media (max-width: 768px) {
          * {
            cursor: auto !important;
          }
          .fixed.inset-0.pointer-events-none.z-50 {
            display: none;
          }
        }
        
        body {
          background: #000;
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </>
  );
};

export default  ServicesSection;