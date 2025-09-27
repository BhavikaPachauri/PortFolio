import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdYard } from 'react-icons/md';


const projectDetails = [
  {
    title: 'Creative Portfolio Hub',
    description: 'Portfolio platform for creative professionals with interactive galleries, client testimonials, and booking system.',
    tech: ['React', 'Netlify'],
    category: 'Portfolio',
    image: './portfolio.png',
    color: 'from-violet-500 via-purple-500 to-fuchsia-500',
    link: 'https://bhavika-portfolio-steel.vercel.app/',
  },
  {
    title: 'Developer Portfolio',
    description: 'Personal portfolio showcasing development projects, skills, and experience with a modern interactive design.',
    tech: ['React', 'Vercel'],
    category: 'Portfolio',
    image: './Screenshot (5).png',
    color: 'from-blue-500 via-indigo-500 to-purple-500',
    link: 'https://bhavika-pachauri-portfolio.vercel.app/',
  },
  {
    title: 'School ERP',
    description: 'School management system with student records, attendance, exams, fees, and staff management features.',
    tech: ['React', 'Vercel'],
    category: 'Enterprise',
    image: './Screenshot (11).png',
    color: 'from-blue-500 via-indigo-500 to-purple-500',
    link: 'https://www.schoolerp.online/',
  },
  {
    title: 'Tabvik.com',
    description: 'Business website for a digital agency with modern UI, smooth animations, and responsive design.',
    tech: ['React', 'Framer Motion', 'Tailwind CSS'],
    category: 'Business',
    image: './Screenshot (575).png',
    color: 'from-indigo-500 via-purple-500 to-pink-500',
    link: 'https://tabvik.com',
  },
  {
    title: 'HRMS Dashboard',
    description: 'Human Resource Management System with employee management, payroll, leave tracking, and analytics.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Chart.js', 'Socket.io'],
    category: 'Enterprise',
    image: './Screenshot (3).png',
    color: 'from-emerald-500 via-teal-500 to-cyan-500',
    link: '#',
  },
  {
    title: 'E-Commerce',
    description: 'E-commerce platform with product catalog, cart, checkout, and secure payment integration.',
    tech: ['React', 'Node.js'],
    category: 'E-Commerce',
    image: './ecommerce.png',
    color: 'from-orange-500 via-red-500 to-pink-500',
    link: '#',
  },
  {
    title: 'CareerBanao',
    description: 'Career guidance and resources website with job listings, career tips, and student engagement tools.',
    tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    category: 'Web Platform',
    image: './Screenshot (9).png',
    color: 'from-cyan-500 via-blue-500 to-indigo-500',
    link: 'https://career-bnao-web.vercel.app/',
  },
  {
    title: 'CardioCare System',
    description: 'Healthcare management system for patients with appointment booking, reports, and doctor-patient records.',
    tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    category: 'Healthcare',
    image: './cardiocare.png',
    color: 'from-rose-500 via-pink-500 to-red-500',
    link: '#',
  },
  {
    title: 'Admin Dashboard',
    description: 'Admin dashboard for managing users, reports, and analytics built with the MERN stack.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB'],
    category: 'Enterprise',
    image: './Screenshot (4).png',
    color: 'from-green-500 via-emerald-500 to-teal-500',
    link: 'https://adminpanel-five-eosin.vercel.app/',
  },
  {
    title: 'Academic Website',
    description: 'Educational website for managing courses, content, and student information.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB'],
    category: 'Education',
    image: './Screenshot (8).png',
    color: 'from-green-500 via-emerald-500 to-teal-500',
    link: 'https://project11-one.vercel.app/',
  }
];


const categories = ['All',  'E-Commerce', 'Portfolio',  'Healthcare', 'Enterprise'];

// Optimized Particle System - Reduced particles and simplified animations
const OptimizedParticleSystem = React.memo(() => {
  const canvasRef = useRef(null);
  const animationRef = useRef();
  const particlesRef = useRef([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (canvasRef.current) {
      observer.observe(canvasRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Reduced particle count for better performance
    particlesRef.current = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.4 + 0.1,
      hue: Math.random() * 60 + 260,
    }));

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${particle.hue}, 70%, 60%, ${particle.opacity})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-20"
      style={{ mixBlendMode: 'screen' }}
    />
  );
});

// Simplified background with CSS animations instead of JS
const OptimizedBackground = React.memo(() => (
  <div className="absolute inset-0 overflow-hidden">
    <div 
      className="absolute inset-0 opacity-40"
      style={{
        background: `
          radial-gradient(ellipse at 20% 30%, rgba(168, 85, 247, 0.3) 0%, transparent 70%),
          radial-gradient(ellipse at 80% 20%, rgba(236, 72, 153, 0.25) 0%, transparent 60%),
          radial-gradient(ellipse at 60% 80%, rgba(59, 130, 246, 0.2) 0%, transparent 70%),
          linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(17, 24, 39, 0.9))
        `,
        animation: 'gradientShift 15s ease-in-out infinite'
      }}
    />
    <OptimizedParticleSystem />
    
    {/* Static geometric elements */}
    {[...Array(6)].map((_, i) => (
      <div
        key={`geo-${i}`}
        className="absolute border border-white/10 backdrop-blur-sm opacity-20"
        style={{
          width: `${30 + (i % 3) * 20}px`,
          height: `${30 + (i % 3) * 20}px`,
          left: `${10 + (i % 3) * 30}%`,
          top: `${15 + Math.floor(i / 3) * 40}%`,
          borderRadius: i % 2 === 0 ? '50%' : '20%',
          animation: `float${i % 3} ${8 + i * 2}s ease-in-out infinite`,
          animationDelay: `${i * 0.5}s`
        }}
      />
    ))}

    <style jsx>{`
      @keyframes gradientShift {
        0%, 100% { filter: hue-rotate(0deg); }
        50% { filter: hue-rotate(30deg); }
      }
      @keyframes float0 {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
      }
      @keyframes float1 {
        0%, 100% { transform: translateX(0px) scale(1); }
        50% { transform: translateX(15px) scale(1.1); }
      }
      @keyframes float2 {
        0%, 100% { transform: rotate(0deg); }
        50% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
));

// Optimized Project Card with reduced animations and memoization
const OptimizedProjectCard = React.memo(({ project, index, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);

  const statusColor = useMemo(() => ({
    'Live': 'bg-emerald-500/90 text-white',
    'Beta': 'bg-orange-500/90 text-white',
    'In Development': 'bg-blue-500/90 text-white',
  })[project.status], [project.status]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      className="group cursor-pointer h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-gray-900/95 backdrop-blur-xl rounded-2xl overflow-hidden border border-purple-500/20 shadow-xl h-full flex flex-col"
        whileHover={{ 
          scale: 1.02,
          boxShadow: '0 25px 50px rgba(168, 85, 247, 0.25)'
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="h-48 relative overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${project.color}/20`} />
          
          {/* Project Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="text-6xl"
              animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
              transition={{ duration: 0.3 }}
            >
             <img src={project.image}/>
            </motion.div>
          </div>

          
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col space-y-4">
          <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {project.title}
          </h3>
          
          <p className="text-gray-300 text-sm leading-relaxed flex-grow">
            {project.description}
          </p>

          {/* Stats
          <div className="grid grid-cols-3 gap-2 mb-4">
            {Object.entries(project.stats).map(([key, value]) => (
              <div
                key={key}
                className="text-center p-2 bg-purple-500/20 rounded-lg border border-purple-500/30"
              >
                <div className="text-xs font-bold text-white">{value}</div>
                <div className="text-xs text-gray-400 capitalize">{key}</div>
              </div>
            ))}
          </div> */}

          {/* Tech Stack */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-1.5">
              {project.tech.slice(0, 4).map(tech => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-purple-500/20 rounded-md text-xs border border-purple-500/30"
                >
                  {tech}
                </span>
              ))}
              {project.tech.length > 4 && (
                <span className="px-2 py-1 bg-gray-500/20 rounded-md text-xs text-gray-400">
                  +{project.tech.length - 4} more
                </span>
              )}
            </div>
          </div>

          {/* CTA Button */}
          <motion.a
            href={project.link}
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-sm mt-auto"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex items-center space-x-2">
              <span>View Project</span>
              <span>→</span>
            </span>
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
});

// Main component with performance optimizations
const ProjectsSection = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState('All');
  
  const filteredProjects = useMemo(() => {
    return filter === 'All' 
      ? projectDetails 
      : projectDetails.filter(project => project.category === filter);
  }, [filter]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleFilterChange = useCallback((newFilter) => {
    setFilter(newFilter);
  }, []);

  return (
    <section 
      id='projects'
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden"
    >
      <OptimizedBackground />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            FEATURED PROJECTS
          </h2>
          
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Crafting digital experiences that blend cutting-edge technology with exceptional design.
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleFilterChange(category)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  filter === category
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/70'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={`${filter}-${project.title}`}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <OptimizedProjectCard
                  project={project}
                  index={index}
                  isVisible={isVisible}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
         
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;