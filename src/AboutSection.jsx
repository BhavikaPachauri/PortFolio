import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const AboutSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const imageRef = useRef(null);
 

  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
 
  const [animationPhase, setAnimationPhase] = useState(0);

  // Simulate staged animations
  useEffect(() => {
    if (isInView) {
      const timer1 = setTimeout(() => setAnimationPhase(1), 300);
      const timer2 = setTimeout(() => setAnimationPhase(2), 800);
      const timer3 = setTimeout(() => setAnimationPhase(3), 1300);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [isInView]);

  


  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-20 bg-gradient-to-br from-gray-900 via-purple-950 to-black overflow-hidden"
      id="about"
    >
      {/* Floating Background Symbols */}
      <div className="absolute inset-0">
        {["<>", "{}", "[]", "()", "=>", "&&"].map((symbol, i) => (
          <motion.div
            key={symbol}
            className="absolute text-4xl font-mono text-purple-500/20 select-none"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 2) * 40}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360, 0],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          >
            {symbol}
          </motion.div>
        ))}

        {/* Moving Grid */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "50px 50px", "0px 0px"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={titleRef}
          className="text-center mb-20"
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.h2
            className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
            style={{ textShadow: "0 0 40px rgba(139, 92, 246, 0.5)" }}
            animate={{
              backgroundPosition: isInView ? ["0%", "100%", "0%"] : "0%",
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            About Me
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : {}}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Profile Image Section */}
          <motion.div
            ref={imageRef}
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -100, rotateY: -45 }}
            animate={
              animationPhase >= 1 ? { opacity: 1, x: 0, rotateY: 0 } : {}
            }
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="relative inline-block mb-8">
              <motion.div
                className="w-full h-full mx-auto lg:mx-0 rounded-3xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/30 flex items-center justify-center relative overflow-hidden"
                whileHover={{
                  scale: 1.05,
                  rotateY: 10,
                  boxShadow: "0 25px 50px rgba(139, 92, 246, 0.4)",
                }}
                transition={{ duration: 0.3 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* AI Generated Profile Image */}
                <motion.img
                  src="https://cdn.gamma.app/5ew2b2ehon52a7z/generated-images/guonNpmpKPVtXB4m2ZN2G.png"
                  alt="AI Generated Profile"
                  className="w-full h-full object-cover rounded-3xl"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Skills & Description */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 100 }}
            animate={animationPhase >= 1 ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          >
            <div className="prose prose-lg text-gray-300 max-w-none">
              <motion.p
                className="text-xl leading-relaxed mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={animationPhase >= 2 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                I’m Bhavika Pachauri, a passionate Full Stack Developer skilled
                in building scalable and responsive web applications. With
                hands-on experience in React.js, Node.js, PHP, Laravel, MySQL,
                and PostgreSQL, I specialize in creating seamless UI/UX and
                optimizing backend performance.
              </motion.p>

              <motion.p
                className="text-lg leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={animationPhase >= 2 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
               I’ve built e-commerce, healthcare, and management systems, improving user engagement by up to 30%. As a GSSoC 2024 contributor, I focus on clean code, API integration, and security, while continuously enhancing my skills with certifications in SQL and JavaScript.
              </motion.p>
            </div>

            {/* Tech Stack Pills */}
            
          </motion.div>
        </div>
      </div>

      {/* Background Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -50, 100, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl"
        animate={{
          x: [0, -80, 60, 0],
          y: [0, 80, -40, 0],
          scale: [1, 0.8, 1.3, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
    </section>
  );
};

export default AboutSection;
