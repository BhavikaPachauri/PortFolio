import React, { use, useRef } from 'react'
import HeroSection from './HeroSection'
import SkillsSection from './SkillsSection'
import ProjectsSection from './ProjectsSection'
import ServicesSection from './ServicesSection'
import Navbar from './Navbar'
import ContactSection from './ContactSection'
import AboutSection from './AboutSection'
import Footer from './Footer'

function App() {

  return (
    <>
           <Navbar/>
           <HeroSection/>
           <AboutSection/>
           <SkillsSection/>
           <ProjectsSection/>
           <ServicesSection/>
           <ContactSection/>
           <Footer/>
    </>
 
  )
}

export default App

