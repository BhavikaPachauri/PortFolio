import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const AboutSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [animationPhase, setAnimationPhase] = useState(0);

  // staged animations
  useEffect(() => {
    if (isInView) {
      const timers = [
        setTimeout(() => setAnimationPhase(1), 300),
        setTimeout(() => setAnimationPhase(2), 800),
      ];
      return () => timers.forEach((t) => clearTimeout(t));
    }
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen py-20 bg-gradient-to-br from-gray-900 via-purple-950 to-black overflow-hidden"
    >
      {/* Floating Background Symbols */}
      <div className="absolute inset-0">
        {["<>", "{}", "[]", "()", "=>", "&&"].map((symbol, i) => (
          <motion.div
            key={symbol}
            className="absolute text-4xl font-mono text-purple-500/20 select-none"
            style={{ left: `${15 + i * 15}%`, top: `${20 + (i % 2) * 40}%` }}
            animate={{ y: [0, -30, 0], rotate: [0, 360, 0], opacity: [0.1, 0.4, 0.1] }}
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

        {/* Subtle Grid Animation */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
          animate={{ backgroundPosition: ["0px 0px", "50px 50px", "0px 0px"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.h2
            className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
            style={{ textShadow: "0 0 30px rgba(139, 92, 246, 0.5)" }}
            animate={isInView ? { backgroundPosition: ["0%", "100%", "0%"] } : {}}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            About Me
          </motion.h2>
          <motion.div
            className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : {}}
            transition={{ duration: 1.2, delay: 0.5 }}
          />
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <motion.div
            className="flex justify-center lg:justify-start"
            initial={{ opacity: 0, x: -100 }}
            animate={animationPhase >= 1 ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.div
              className="relative w-full h-full rounded-3xl overflow-hidden bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/30"
              whileHover={{ scale: 1.05, rotateY: 10 }}
              transition={{ duration: 0.4 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.img
                src="https://cdn.gamma.app/5ew2b2ehon52a7z/generated-images/guonNpmpKPVtXB4m2ZN2G.png"
                alt="Profile"
                className="w-full h-full object-cover rounded-3xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
              />
            </motion.div>
          </motion.div>

          {/* About Text */}
          <motion.div
            className="space-y-6 text-gray-300"
            initial={{ opacity: 0, x: 100 }}
            animate={animationPhase >= 1 ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          >
            <motion.p
              className="text-xl leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={animationPhase >= 2 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              I’m <span className="font-semibold text-purple-400">Bhavika Pachauri</span>, a Full Stack Developer skilled in
              <span className="text-purple-300"> React.js, Node.js, PHP, Laravel, MySQL, and PostgreSQL</span>. I build
              scalable and responsive applications with seamless UI/UX and optimized performance.
            </motion.p>
            <motion.p
              className="text-lg leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={animationPhase >= 2 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              I’ve developed <span className="text-purple-300">e-commerce, healthcare, and management systems</span>,
              improving engagement by up to 30%. As a <span className="text-pink-300">GSSoC 2024 contributor</span>, I focus on
              clean code, API integration, and security while continuously learning with certifications in
              SQL and JavaScript.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Background Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"
        animate={{ x: [0, 80, -40, 0], y: [0, -40, 60, 0], scale: [1, 1.2, 0.9, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-pink-600/10 rounded-full blur-3xl"
        animate={{ x: [0, -60, 40, 0], y: [0, 60, -30, 0], scale: [1, 0.8, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
    </section>
  );
};

export default AboutSection;
