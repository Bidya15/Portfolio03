import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AnimatedBackground from './components/AnimatedBackground';
import CustomCursor from './components/CustomCursor';
import Lenis from 'lenis';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    return () => {
      lenis.destroy();
    };
  }, [theme]);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="app">
      <CustomCursor isMobile={isMobile} />
      <AnimatedBackground isMobile={isMobile} />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero isMobile={isMobile} />
        <About isMobile={isMobile} />
        <Experience />
        <Projects />
        <Skills />
        <Achievements isMobile={isMobile} />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
