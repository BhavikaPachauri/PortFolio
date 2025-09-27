import React, { useState, useEffect, useRef } from 'react';

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [showEmail, setShowEmail] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [cursorVariant, setCursorVariant] = useState('default');
  const sectionRef = useRef(null);
  const cursorRef = useRef(null);
  const floatingElementsRef = useRef([]);

  // Custom cursor tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Floating elements animation
  useEffect(() => {
    const animateFloatingElements = () => {
      floatingElementsRef.current.forEach((el, index) => {
        if (el) {
          const speed = 0.5 + index * 0.2;
          const amplitude = 20 + index * 10;
          const offset = index * 60;
          
          el.style.transform = `
            translateY(${Math.sin(Date.now() * 0.001 * speed + offset) * amplitude}px)
            translateX(${Math.cos(Date.now() * 0.0015 * speed + offset) * amplitude * 0.5}px)
            rotateZ(${Math.sin(Date.now() * 0.002 + offset) * 5}deg)
          `;
        }
      });
      requestAnimationFrame(animateFloatingElements);
    };
    animateFloatingElements();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleMouseEnter = (variant) => {
    setIsHovering(true);
    setCursorVariant(variant);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setCursorVariant('default');
  };

  // 3D Tilt effect
  const handleMouseMoveCard = (e, cardRef) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
  };

  const handleMouseLeaveCard = (cardRef) => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    }
  };

  const contactCardRef = useRef(null);
  const formCardRef = useRef(null);

  return (
    <div className="relative">
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className={`fixed pointer-events-none z-50 transition-all duration-300 ease-out hidden md:block ${
          isHovering ? 'scale-150' : 'scale-100'
        }`}
        style={{
          left: mousePosition.x - 10,
          top: mousePosition.y - 10,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
        }}
      >
        <div
          className={`w-5 h-5 rounded-full border-2 transition-all duration-300 ${
            cursorVariant === 'button'
              ? 'bg-purple-500 border-purple-300 shadow-lg shadow-purple-500/50'
              : cursorVariant === 'input'
              ? 'bg-blue-500 border-blue-300 shadow-lg shadow-blue-500/50'
              : 'bg-transparent border-white/50'
          }`}
        />
        <div
          className={`absolute inset-0 rounded-full transition-all duration-300 ${
            isHovering ? 'scale-200 opacity-20' : 'scale-100 opacity-50'
          } ${
            cursorVariant === 'button'
              ? 'bg-purple-400'
              : cursorVariant === 'input'
              ? 'bg-blue-400'
              : 'bg-white'
          }`}
        />
      </div>

      <section 
        ref={sectionRef}
        id='contact'
        className="relative py-20 bg-gradient-to-br from-black via-purple-900/20 to-black text-white overflow-hidden"
       
      >
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating geometric shapes */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              ref={(el) => (floatingElementsRef.current[i] = el)}
              className={`absolute opacity-10 pointer-events-none ${
                i % 4 === 0 ? 'text-purple-400' : 
                i % 4 === 1 ? 'text-blue-400' : 
                i % 4 === 2 ? 'text-pink-400' : 'text-cyan-400'
              }`}
              style={{
                left: `${10 + (i * 8) % 80}%`,
                top: `${15 + (i * 12) % 70}%`,
                fontSize: `${1 + (i % 3)}rem`,
              }}
            >
              {i % 4 === 0 ? '◆' : i % 4 === 1 ? '●' : i % 4 === 2 ? '▲' : '★'}
            </div>
          ))}
          
          {/* Gradient orbs */}
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-block">
              <h2 className="text-6xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-6 tracking-tight animate-pulse">
                Let's Connect
              </h2>
              <div className="h-1 w-32 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mb-6" />
            </div>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Ready to transform your ideas into extraordinary digital experiences?
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            
            {/* Contact Information Card */}
            <div
              ref={contactCardRef}
              className="group transition-all duration-500 ease-out transform-gpu"
              onMouseMove={(e) => handleMouseMoveCard(e, contactCardRef)}
              onMouseLeave={() => handleMouseLeaveCard(contactCardRef)}
              onMouseEnter={() => handleMouseEnter('default')}
            >
              <div className="relative bg-gradient-to-br from-gray-900/90 via-purple-900/20 to-gray-800/90 backdrop-blur-xl p-8 lg:p-10 rounded-3xl border border-purple-500/20 shadow-2xl group-hover:shadow-purple-500/20 transition-all duration-500">
                {/* Glowing border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 -z-10" />
                
                <div className="relative z-10">
                  <h3 className="text-4xl lg:text-5xl font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Get In Touch
                  </h3>
                  
                  <div className="space-y-8">
                    {/* Email */}
                    <div 
                      className="group/item flex items-center space-x-6 cursor-pointer transform transition-all duration-300 hover:translate-x-4"
                      onMouseEnter={() => handleMouseEnter('button')}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-2xl transform transition-all duration-300 group-hover/item:rotate-12 group-hover/item:scale-110 shadow-lg group-hover/item:shadow-purple-500/50">
                          📧
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-50 group-hover/item:opacity-80 transition-all duration-300" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-lg text-gray-200 mb-1">Email</p>
                        {showEmail ? (
                          <a
                            href="mailto:bhavikapachauri02@gmail.com"
                            className="text-purple-400 hover:text-purple-300 transition-colors duration-300 text-lg"
                          >
                            bhavika@gmail.com
                          </a>
                        ) : (
                          <button
                            onClick={() => setShowEmail(true)}
                            className="text-purple-400 hover:text-purple-300 transition-colors duration-300 text-lg "
                          >
                            Click to reveal →
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Phone */}
                    <div 
                      className="group/item flex items-center space-x-6 cursor-pointer transform transition-all duration-300 hover:translate-x-4"
                      onMouseEnter={() => handleMouseEnter('button')}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center text-2xl transform transition-all duration-300 group-hover/item:rotate-12 group-hover/item:scale-110 shadow-lg group-hover/item:shadow-green-500/50">
                          📱
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl blur-xl opacity-50 group-hover/item:opacity-80 transition-all duration-300" />
                      </div>
                      <div>
                        <p className="font-bold text-lg text-gray-200 mb-1">Phone</p>
                        <a 
                          href="tel:8449296898" 
                          className="text-green-400 hover:text-green-300 transition-colors duration-300 text-lg"
                        >
                          +91 8449296898
                        </a>
                      </div>
                    </div>

                    {/* Location */}
                    <div 
                      className="group/item flex items-center space-x-6 cursor-pointer transform transition-all duration-300 hover:translate-x-4"
                      onMouseEnter={() => handleMouseEnter('button')}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-2xl transform transition-all duration-300 group-hover/item:rotate-12 group-hover/item:scale-110 shadow-lg group-hover/item:shadow-blue-500/50">
                          📍
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl blur-xl opacity-50 group-hover/item:opacity-80 transition-all duration-300" />
                      </div>
                      <div>
                        <p className="font-bold text-lg text-gray-200 mb-1">Location</p>
                        <p className="text-blue-400 text-lg">Fatehabad, Agra, India</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div
              ref={formCardRef}
              className="group transition-all duration-500 ease-out transform-gpu"
              onMouseMove={(e) => handleMouseMoveCard(e, formCardRef)}
              onMouseLeave={() => handleMouseLeaveCard(formCardRef)}
            >
              <div
                className="relative bg-gradient-to-br from-gray-900/90 via-blue-900/20 to-gray-800/90 backdrop-blur-xl p-8 lg:p-10 rounded-3xl border border-blue-500/20 shadow-2xl group-hover:shadow-blue-500/20 transition-all duration-500"
              >
                {/* Glowing border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 -z-10" />
                
                <div className="relative z-10 space-y-8">
                  <h3 className="text-3xl lg:text-4xl font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Send Message
                  </h3>

                  {/* Name Input */}
                  <div 
                    className="group/input"
                    onMouseEnter={() => handleMouseEnter('input')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full p-5 bg-gray-800/60 border-2 border-purple-500/30 rounded-2xl focus:border-purple-500 focus:outline-none transition-all duration-300 text-white placeholder-gray-400 text-lg backdrop-blur-sm group-hover/input:border-purple-500/50 focus:shadow-lg focus:shadow-purple-500/20 transform focus:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl opacity-0 group-hover/input:opacity-100 transition-all duration-300 pointer-events-none" />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div 
                    className="group/input"
                    onMouseEnter={() => handleMouseEnter('input')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full p-5 bg-gray-800/60 border-2 border-blue-500/30 rounded-2xl focus:border-blue-500 focus:outline-none transition-all duration-300 text-white placeholder-gray-400 text-lg backdrop-blur-sm group-hover/input:border-blue-500/50 focus:shadow-lg focus:shadow-blue-500/20 transform focus:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl opacity-0 group-hover/input:opacity-100 transition-all duration-300 pointer-events-none" />
                    </div>
                  </div>

                  {/* Message Textarea */}
                  <div 
                    className="group/input"
                    onMouseEnter={() => handleMouseEnter('input')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="relative">
                      <textarea
                        rows="6"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full p-5 bg-gray-800/60 border-2 border-pink-500/30 rounded-2xl focus:border-pink-500 focus:outline-none transition-all duration-300 text-white placeholder-gray-400 text-lg backdrop-blur-sm resize-none group-hover/input:border-pink-500/50 focus:shadow-lg focus:shadow-pink-500/20 transform focus:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover/input:opacity-100 transition-all duration-300 pointer-events-none" />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="group/button relative w-full py-5 bg-gradient-to-r from-purple-900 via-violet-600 to-blue-900 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-purple-500/40 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 overflow-hidden"
                    onMouseEnter={() => handleMouseEnter('button')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-violet-600 to-blue-900 opacity-0 group-hover/button:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 bg-white/10 transform translate-x-full group-hover/button:translate-x-0 transition-transform duration-500 skew-x-12" />
                    <span className="relative z-10 flex items-center justify-center space-x-3">
                      <span>Send Message</span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Styles */}
        <style jsx>{`
          @keyframes glow {
            from { text-shadow: 0 0 20px rgba(168, 85, 247, 0.3); }
            to { text-shadow: 0 0 40px rgba(168, 85, 247, 0.6), 0 0 60px rgba(168, 85, 247, 0.4); }
          }
          
          @media (max-width: 768px) {
            section {
              cursor: auto !important;
            }
          }
          
          .transform-gpu {
            transform: translateZ(0);
            backface-visibility: hidden;
            perspective: 1000px;
          }
          
          /* Smooth scrolling and performance optimizations */
          * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          
          .group:hover .group-hover\\:blur-2xl {
            filter: blur(2rem);
          }
          
          @media (prefers-reduced-motion: reduce) {
            .animate-pulse,
            .transition-all {
              animation: none;
              transition: none;
            }
          }
        `}</style>
      </section>
    </div>
  );
};

export default ContactSection;