import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, ArrowUpRight } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ theme, toggleTheme }) => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Experience', href: '#experience' },
        { name: 'Projects', href: '#projects' },
        { name: 'Skills', href: '#skills' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container nav-container glossy-card" style={{
                borderRadius: scrolled ? '0 0 2rem 2rem' : '1.5rem',
                padding: '0.75rem 2rem',
                margin: scrolled ? '0 auto' : '1.5rem auto',
                border: scrolled ? 'none' : '1px solid var(--glass-border)',
                background: scrolled ? 'var(--glass)' : 'transparent'
            }}>
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="logo"
                >
                    BSR<span className="text-gradient">.</span>
                </motion.div>

                {/* Desktop Menu */}
                <div className="nav-links">
                    {navLinks.map((link, index) => (
                        <motion.a
                            key={link.name}
                            href={link.href}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="nav-link"
                        >
                            {link.name}
                        </motion.a>
                    ))}

                    <div className="nav-actions" style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginLeft: '1.5rem', paddingLeft: '1.5rem', borderLeft: '1px solid var(--glass-border)' }}>
                        <button onClick={toggleTheme} className="theme-toggle">
                            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                        <a href="mailto:bidyasingrongpi2004@gmail.com" className="btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.8rem', background: 'var(--accent-gradient)' }}>
                            Hire Me <ArrowUpRight size={14} />
                        </a>
                    </div>
                </div>

                {/* Mobile Actions */}
                <div className="mobile-actions">
                    <button onClick={toggleTheme} className="theme-toggle">
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="mobile-menu"
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="mobile-nav-link"
                            >
                                {link.name} <ArrowUpRight size={18} opacity={0.5} />
                            </a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
