import React, { use, useRef } from 'react'
import PortFolio from './PortFolio'
import HeroSection from './HeroSection'
import SkillsSection from './SkillsSection'
import ProjectsSection from './ProjectsSection'
import ServicesSection from './ServicesSection'
import Navbar from './Navbar'
import ContactSection from './ContactSection'
import Footer from './Footer'

function App() {

  return (
    <>
           <Navbar/>
           <HeroSection/>
           <SkillsSection/>
           <ProjectsSection/>
           <ServicesSection/>
           <ContactSection/>
           <Footer/>
    </>
 
  )
}

export default App

