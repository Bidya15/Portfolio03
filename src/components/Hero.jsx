import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowRight, Zap, Orbit, Sparkles, Download } from 'lucide-react';
import SplitText from './SplitText';
import './Hero.css';
import resumeFile from '../assets/BidyaSingRongpi_Resume02.pdf';

const StellarParticleV2 = ({ index }) => {
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const size = 1 + Math.random() * 2;
    const duration = 15 + Math.random() * 20;

    return (
        <div className="stellar-trail-container" style={{ left: `${x}%`, top: `${y}%` }}>
            <motion.div
                className="particle-trail"
                animate={{ width: [0, 100, 0], opacity: [0, 0.3, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: Math.random() * 5 }}
                style={{ rotate: '45deg' }}
            />
            <motion.div
                className="stellar-particle-v2"
                animate={{
                    x: [0, 50, 0],
                    y: [0, 50, 0],
                    opacity: [0.2, 0.6, 0.2],
                    scale: [1, 1.5, 1]
                }}
                transition={{ duration, repeat: Infinity, ease: "linear" }}
                style={{
                    width: size,
                    height: size,
                    background: index % 3 === 0 ? 'var(--accent-1)' : 'var(--particle-color)',
                    willChange: 'transform'
                }}
            />
        </div>
    );
};

const NeuralTether = ({ start, end, mouseX, mouseY }) => {
    const springX = useSpring(mouseX);
    const springY = useSpring(mouseY);

    const pathRef = useRef('');
    const [path, setPath] = useState('');

    useEffect(() => {
        let frameId;
        const updatePath = () => {
            const mx = mouseX.get();
            const my = mouseY.get();

            const midX = (start.x + end.x) / 2;
            const midY = (start.y + end.y) / 2;

            const dist = Math.hypot(mx - midX, my - midY);
            const influence = Math.max(0, 1 - dist / 400);

            const cpX = midX + (mx - midX) * influence * 0.5;
            const cpY = midY + (my - midY) * influence * 0.5;

            const newPath = `M ${start.x} ${start.y} Q ${cpX} ${cpY} ${end.x} ${end.y}`;
            if (pathRef.current !== newPath) {
                pathRef.current = newPath;
                setPath(newPath);
            }
            frameId = requestAnimationFrame(updatePath);
        };

        frameId = requestAnimationFrame(updatePath);
        return () => cancelAnimationFrame(frameId);
    }, [start, end, mouseX, mouseY]);

    return (
        <motion.path
            d={path}
            className="tether-path"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.15 }}
            transition={{ duration: 2, ease: "easeInOut" }}
        />
    );
};

const Hero = ({ isMobile }) => {
    const containerRef = useRef(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const { scrollY } = useScroll();

    // Kinetic Typography Transforms
    const titleScale = useTransform(scrollY, [0, 500], [1, 0.8]);
    const titleOpacity = useTransform(scrollY, [0, 300], [1, 0]);
    const vortexSkew = useTransform(scrollY, [0, 500], [0, 10]);

    const [singularityPos, setSingularityPos] = useState({ x: 0, y: 0 });
    const [socialRefs, setSocialRefs] = useState([]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Calculate singularity position (center of container)
        const updatePositions = () => {
            const rect = containerRef.current.getBoundingClientRect();
            const isMobile = window.innerWidth < 1024;
            setSingularityPos({
                x: isMobile ? rect.width / 2 : rect.width * 0.95 - 250,
                y: isMobile ? rect.height * 0.2 : rect.height / 2
            });
        };
        updatePositions();
        window.addEventListener('resize', updatePositions);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', updatePositions);
        };
    }, []);

    const socials = [
        { icon: <Github size={20} />, label: 'GITHUB // CORE_ACCESS', href: 'https://github.com/bidya15' },
        { icon: <Linkedin size={20} />, label: 'LINKEDIN // NEURAL_NET', href: 'https://www.linkedin.com/in/bidya-s-rongpi-2b018a27b' },
        { icon: <Mail size={20} />, label: 'MAIL // SIGNAL_EMISSION', href: 'mailto:bidyasingrongpi2004@gmail.com' },
    ];

    const [nodePositions, setNodePositions] = useState([]);
    const nodesRef = useRef([]);

    useEffect(() => {
        const updateNodes = () => {
            const positions = nodesRef.current.map(node => {
                if (!node) return null;
                const rect = node.getBoundingClientRect();
                const containerRect = containerRef.current.getBoundingClientRect();
                return {
                    x: rect.left - containerRect.left + rect.width / 2,
                    y: rect.top - containerRect.top + rect.height / 2
                };
            }).filter(p => p !== null);
            setNodePositions(positions);
        };

        setTimeout(updateNodes, 100); // Wait for render
        window.addEventListener('resize', updateNodes);
        return () => window.removeEventListener('resize', updateNodes);
    }, []);

    return (
        <section id="home" className="hero" ref={containerRef}>
            <div className="quantum-singularity-container">
                <div className="singularity-core" style={{ opacity: 0.4 }} />
                <div className="singularity-core" style={{ animationDirection: 'reverse', opacity: 0.2, scale: 1.5 }} />
                <div className="singularity-void" />
            </div>

            <svg className="neural-tether-svg">
                {!isMobile && nodePositions.map((nodePos, i) => (
                    <NeuralTether
                        key={i}
                        start={singularityPos}
                        end={nodePos}
                        mouseX={mouseX}
                        mouseY={mouseY}
                    />
                ))}
            </svg>

            <div className="stellar-swarm">
                {[...Array(isMobile ? 6 : 15)].map((_, i) => (
                    <StellarParticleV2 key={i} index={i} />
                ))}
            </div>

            <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                <div className="hero-content">
                    <motion.div style={{ scale: titleScale, opacity: titleOpacity, skewY: vortexSkew }}>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="hero-subtitle-quantum"
                        >
                            <Zap size={14} /> Full-Stack Java Architect // v2.0.4
                        </motion.div>

                        <h1 className="hero-title-vortex">
                            <span className="text-prismatic">
                                <SplitText text="Engineering" delay={0.2} />
                            </span> <br />
                            <SplitText text="The Singularity" delay={0.6} />
                        </h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 }}
                            className="hero-description-quantum"
                        >
                            Architecting <strong>Enterprise-Grade Java Ecosystems</strong> where <strong>Scalability</strong> meets <strong>Structural Elegance</strong>. Specializing in high-concurrency systems and distributed microservices.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.4 }}
                            style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}
                        >
                            <motion.a
                                href="#projects"
                                className="btn-primary"
                                style={{
                                    background: 'var(--accent-gradient-vibrant)',
                                    padding: '1.2rem 3rem',
                                    borderRadius: '1.25rem',
                                    fontWeight: 800,
                                    fontSize: '1rem',
                                    boxShadow: 'var(--card-shadow)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.8rem'
                                }}
                                whileHover={{ scale: 1.05, boxShadow: '0 0 60px var(--accent-glow)' }}
                                whileTap={{ scale: 0.95 }}
                            >
                                TRANSMIT FOCUS <ArrowRight size={20} />
                            </motion.a>

                            <motion.a
                                href={resumeFile}
                                download="Bidya_Sing_Rongpi_Resume.pdf"
                                className="btn-secondary"
                                style={{
                                    background: 'var(--glass)',
                                    border: '1px solid var(--accent-1)',
                                    padding: '1.2rem 2.5rem',
                                    borderRadius: '1.25rem',
                                    fontWeight: 700,
                                    fontSize: '1rem',
                                    color: 'var(--accent-1)',
                                    boxShadow: 'var(--card-shadow-soft)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.8rem'
                                }}
                                whileHover={{ scale: 1.05, background: 'rgba(99, 102, 241, 0.1)' }}
                                whileTap={{ scale: 0.95 }}
                            >
                                DOWNLOAD CV <Download size={20} />
                            </motion.a>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            <div className="strategic-hud-array">
                {socials.map((social, i) => (
                    <div key={i} className="tether-node-wrap">
                        <div className="holographic-label">{social.label}</div>
                        <motion.a
                            href={social.href}
                            ref={el => nodesRef.current[i] = el}
                            className="tether-icon-box"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            {social.icon}
                        </motion.a>
                    </div>
                ))}
            </div>

            <motion.div
                className="scroll-indicator"
                animate={{ y: [0, 10, 0], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{
                    position: 'absolute',
                    bottom: '4rem',
                    left: '10%',
                    fontFamily: 'JetBrains Mono',
                    fontSize: '0.6rem',
                    color: 'var(--accent-1)',
                    letterSpacing: '0.5em',
                    textTransform: 'uppercase'
                }}
            >
                IN_DESCENSION // SCROLL
            </motion.div>
        </section>
    );
};

export default Hero;
