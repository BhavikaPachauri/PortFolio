import React, { useState, useEffect } from 'react';
import { motion, useAnimationControls, useTransform, useScroll } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, Phone, MapPin, Heart, Code, Send, Star, Zap, Sparkles } from 'lucide-react';

const CreativeFooter = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const { scrollY } = useScroll();
  const controls = useAnimationControls();

  const navItems = ['Home', 'About', 'Projects', 'Skills', 'Contact'];
  
  const socialLinks = [
    { Icon: Github, link: 'https://github.com/bhavikapachauri', label: 'GitHub', color: 'from-gray-600 to-gray-800' },
    { Icon: Linkedin, link: 'https://www.linkedin.com/in/bhavika-pachauri-66161a243/', label: 'LinkedIn', color: 'from-blue-500 to-blue-700' },
    { Icon: Mail, link: 'mailto:bhavikapachauri02@gmail.com', label: 'Email', color: 'from-red-500 to-pink-500' }
  ];

  const skills = ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Git', 'REST APIs', 'TypeScript', 'Next.js'];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animated Background Component
  const AnimatedBackground = () => {
    return (
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20" />
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20"
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * 400, Math.random() * 400],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
          />
        ))}

        {/* Animated Grid */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <defs>
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <motion.path
                d="M 100 0 L 0 0 0 100"
                fill="none"
                stroke="url(#gridGradient)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              />
            </pattern>
            <linearGradient id="gridGradient">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

      
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-gradient-radial from-purple-500/10 to-transparent pointer-events-none"
          animate={{
            x: mousePosition.x - 192,
            y: mousePosition.y - 192,
          }}
          transition={{ type: "spring", damping: 30, stiffness: 200 }}
        />
      </div>
    );
  };

  // Skill Pill Component
  const SkillPill = ({ skill, index }) => (
    <motion.span
      key={skill}
      className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full text-purple-300 text-sm border border-purple-500/30 backdrop-blur-sm"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05, backgroundColor: "rgba(139, 92, 246, 0.3)" }}
    >
      {skill}
    </motion.span>
  );

  return (
    <div className="relative">
      <footer 
        className="relative py-16 bg-gradient-to-br from-black via-purple-900/20 to-black text-white overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatedBackground />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Personal Brand Section */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="mb-6"
                whileHover={{ scale: 1.02 }}
              >
                <motion.h3 
                  className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-4 flex items-center gap-2"
                  animate={{ 
                    backgroundPosition: isHovered ? ['0%', '100%'] : ['100%', '0%'],
                  }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
                >
                  
                  BHAVIKA PACHAURI
                </motion.h3>
                
                <motion.p 
                  className="text-gray-300 text-lg leading-relaxed mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Full Stack Developer passionate about creating 
                  <span className="text-purple-400 font-semibold"> amazing digital experiences </span>
                  with modern technologies and creative solutions.
                </motion.p>

                {/* Skills Section */}
                <div className="mb-6">
                  <h4 className="text-purple-400 font-semibold mb-3 flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <SkillPill key={skill} skill={skill} index={index} />
                    ))}
                  </div>
                </div>

                {/* Status Indicator */}
                <motion.div 
                  className="flex items-center gap-2 text-green-400"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-sm">Available for new opportunities</span>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4"
            >
              <h4 className="text-xl font-bold text-purple-400 mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Quick Links
              </h4>
              <div className="space-y-3">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="block group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                  >
                    <span className="text-gray-300 group-hover:text-purple-400 transition-all duration-300 text-lg flex items-center gap-2">
                      <motion.div
                        className="w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100"
                        whileHover={{ scale: 2 }}
                      />
                      {item}
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Contact & Social */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              <h4 className="text-xl font-bold text-purple-400 flex items-center gap-2">
                <Star className="w-5 h-5" />
                Let's Connect
              </h4>
              
              {/* Social Links */}
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 bg-gradient-to-r ${social.color} rounded-xl flex items-center justify-center text-white shadow-lg backdrop-blur-sm border border-white/10`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                    whileHover={{ 
                      scale: 1.2, 
                      rotate: 5,
                      boxShadow: "0 10px 25px rgba(139, 92, 246, 0.4)"
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>

              {/* Contact Info */}
              <div className="space-y-3 text-gray-400">
                <motion.div 
                  className="flex items-center gap-3 group hover:text-purple-400 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <MapPin className="w-4 h-4 text-purple-400" />
                  <span className="text-sm">Fatehabad, Agra, India</span>
                </motion.div>
                <motion.a
                  href="mailto:bhavikapachauri02@gmail.com"
                  className="flex items-center gap-3 group hover:text-purple-400 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <Mail className="w-4 h-4 text-purple-400" />
                  <span className="text-sm">bhavikapachauri02@gmail.com</span>
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Divider with Animation */}
          <motion.div
            className="border-t border-gradient-to-r from-transparent via-purple-500/50 to-transparent my-12"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 1 }}
          />

          {/* Footer Bottom */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-center space-y-4"
          >
            <motion.p className="text-gray-400 text-lg">
              © 2024 Bhavika Pachauri. Crafted with{' '}
              <motion.span
                className="text-red-500 inline-block"
                animate={{ 
                  scale: [1, 1.3, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <Heart className="w-5 h-5 inline" fill="currentColor" />
              </motion.span>{' '}
              and lots of{' '}
              <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-bold">
                passionate coding
              </span>
            </motion.p>
            
            <motion.p 
              className="text-purple-400 text-sm"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              "Code is poetry written in logic" ✨
            </motion.p>
          </motion.div>
        </div>
      </footer>

      {/* Enhanced Floating Action Button */}
      <motion.div
        className="fixed bottom-8 right-8 z-50"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 2, type: "spring", stiffness: 200 }}
      >
        <motion.a
          href="#contact"
          className="relative w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white shadow-2xl backdrop-blur-sm border border-white/20"
          whileHover={{ 
            scale: 1.1,
            boxShadow: "0 20px 40px rgba(139, 92, 246, 0.6)"
          }}
          whileTap={{ scale: 0.9 }}
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <Send className="w-6 h-6" />
          
          {/* Pulse Effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-30"
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.a>
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 z-50 origin-left"
        style={{ 
          scaleX: useTransform(scrollY, [0, 2000], [0, 1]),
        }}
      />
    </div>
  );
};

export default CreativeFooter;