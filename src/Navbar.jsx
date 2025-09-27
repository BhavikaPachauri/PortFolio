import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import { Linkedin, Github, Mail, MessageCircle, Sparkles, Menu, X, Code, Zap, Star } from 'lucide-react';

function Navbar() {
  const { scrollY } = useScroll();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Smooth spring animations
  const navY = useSpring(useTransform(scrollY, [0, 100], [0, -10]));
  const navOpacity = useTransform(scrollY, [0, 100], [1, 0.95]);
  const navScale = useTransform(scrollY, [0, 100], [1, 0.98]);
  const borderRadius = useTransform(scrollY, [0, 100], ['0px', '20px']);

  const navItems = [
    { name: 'Home', icon: <Star className="w-4 h-4" />, href: '#home' },
    { name: 'Skills', icon: <Code className="w-4 h-4" />, href: '#skills' },
    { name: 'Projects', icon: <Zap className="w-4 h-4" />, href: '#projects' },
    { name: 'Services', icon: <Sparkles className="w-4 h-4" />, href: '#services' },
    { name: 'Contact', icon: <Mail className="w-4 h-4" />, href: '#contact' }
  ];

  const socialLinks = [
    { 
      icon: <Linkedin className="w-5 h-5" />, 
      link: 'https://www.linkedin.com/in/bhavika-pachauri-66161a243/', 
      label: 'LinkedIn',
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'hover:shadow-blue-500/50'
    },
    { 
      icon: <Github className="w-5 h-5" />, 
      link: 'https://github.com/BhavikaPachauri/', 
      label: 'GitHub',
      color: 'from-gray-600 to-gray-700',
      hoverColor: 'hover:shadow-gray-500/50'
    },
    { 
      icon: <MessageCircle className="w-5 h-5" />, 
      link: 'https://wa.me/8449296898', 
      label: 'WhatsApp',
      color: 'from-green-500 to-green-600',
      hoverColor: 'hover:shadow-green-500/50'
    },
    { 
      icon: <Mail className="w-5 h-5" />, 
      link: 'mailto:bhavikapachauri02@gmail.com', 
      label: 'Email',
      color: 'from-red-500 to-pink-500',
      hoverColor: 'hover:shadow-red-500/50'
    }
  ];

  // Track mouse movement for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Floating Background Component
  const FloatingBackground = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient orbs */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-32 h-32 rounded-full opacity-10"
          style={{
            background: `linear-gradient(45deg, 
              ${i === 0 ? '#8B5CF6, #EC4899' : i === 1 ? '#06B6D4, #3B82F6' : '#F59E0B, #EF4444'})`,
            left: `${20 + i * 30}%`,
            top: `${10 + i * 20}%`,
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 2
          }}
        />
      ))}
    </div>
  );

  return (
    <section >
      <motion.nav
        style={{ 
          y: navY, 
          opacity: navOpacity, 
          scale: navScale,
          borderRadius: borderRadius
        }}
        className="fixed top-4 left-4 right-4 z-50 mx-auto max-w-7xl"
      >
        <motion.div
          className="relative bg-gradient-to-r from-violet-900/80 via-purple-900/80 to-indigo-900/80 
                     backdrop-blur-2xl border border-violet-500/30 shadow-2xl overflow-hidden"
          style={{ borderRadius: borderRadius }}
          whileHover={{ 
            boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.25)",
            borderColor: "rgba(139, 92, 246, 0.5)"
          }}
        >
          <FloatingBackground />
          
          {/* Animated border glow */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: `conic-gradient(from 0deg, 
                transparent, 
                rgba(139, 92, 246, 0.3), 
                transparent, 
                rgba(236, 72, 153, 0.3), 
                transparent)`
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          
          <div className="relative z-10 px-6 py-4 flex items-center justify-between">
            
            {/* Enhanced Logo */}
            <motion.div
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: -30, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
            >
              <motion.div
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 
                           flex items-center justify-center shadow-lg"
                whileHover={{ 
                  rotate: 360, 
                  scale: 1.1,
                  boxShadow: "0 10px 25px rgba(139, 92, 246, 0.5)"
                }}
                transition={{ duration: 0.6 }}
              >
                <Code className="w-5 h-5 text-white" />
              </motion.div>
              
              <motion.div
                className="text-2xl font-black bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 
                           bg-clip-text text-transparent relative"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{ backgroundSize: "200% 200%" }}
              >
                BHAVIKA
                
             
              </motion.div>
            </motion.div>

            {/* Enhanced Desktop Nav Items */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="relative group px-4 py-2 rounded-xl transition-all duration-300"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, type: "spring" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Background glow on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-pink-500/20 
                               rounded-xl opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                    transition={{ duration: 0.3 }}
                  />
                  
                  <div className="relative flex items-center space-x-2 text-white group-hover:text-violet-300">
                    <motion.div
                      whileHover={{ rotate: 12 }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      {item.icon}
                    </motion.div>
                    <span className="font-medium tracking-wide">{item.name}</span>
                  </div>
                  
                  {/* Animated underline */}
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r 
                               from-violet-400 via-pink-400 to-cyan-400 rounded-full"
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileHover={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </div>

            {/* Enhanced Social Links */}
            <div className="hidden md:flex items-center space-x-2">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-xl bg-gradient-to-r ${social.color} 
                             flex items-center justify-center text-white shadow-lg 
                             ${social.hoverColor} transition-all duration-300`}
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ 
                    delay: 0.6 + index * 0.1, 
                    type: "spring", 
                    stiffness: 200 
                  }}
                  whileHover={{ 
                    scale: 1.2, 
                    rotate: 5,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.3)"
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social.icon}
                </motion.a>
              ))}
              
            
            </div>

            {/* Enhanced Mobile Menu Toggle */}
            <motion.button
              className="md:hidden relative w-10 h-10 rounded-xl bg-violet-500/20 
                         backdrop-blur-sm border border-violet-500/30 flex items-center justify-center"
              onClick={() => setMenuOpen(!menuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {!menuOpen ? (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                  >
                    <Menu className="w-5 h-5 text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                  >
                    <X className="w-5 h-5 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.div>

        {/* Enhanced Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              className="mt-2 bg-gradient-to-br from-violet-900/95 via-purple-900/95 to-indigo-900/95 
                         backdrop-blur-2xl border border-violet-500/30 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 space-y-4">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center space-x-3 text-white font-medium p-3 rounded-xl 
                               hover:bg-violet-500/20 transition-all duration-300 group"
                    onClick={() => setMenuOpen(false)}
                    whileHover={{ x: 5 }}
                  >
                    <motion.div
                      className="text-violet-400 group-hover:text-pink-400"
                      whileHover={{ rotate: 12 }}
                    >
                      {item.icon}
                    </motion.div>
                    <span className="text-lg group-hover:text-violet-300">{item.name}</span>
                  </motion.a>
                ))}
                
                {/* Mobile Social Links */}
                <motion.div
                  className="pt-4 border-t border-violet-500/20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-violet-300 text-sm mb-3 text-center">Connect with me</p>
                  <div className="flex justify-center space-x-3">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={social.label}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-12 h-12 rounded-xl bg-gradient-to-r ${social.color} 
                                   flex items-center justify-center text-white shadow-lg`}
                        initial={{ opacity: 0, scale: 0, rotate: -180 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ delay: 0.7 + index * 0.1, type: "spring" }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </section>
  );
}

export default Navbar;