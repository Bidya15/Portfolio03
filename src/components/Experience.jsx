import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';
import { Briefcase, Calendar, MapPin, Zap, Rocket, Star, Orbit, Building2, Cpu, GraduationCap, Timer, Sparkles } from 'lucide-react';
import SplitText from './SplitText';
import TiltCard from './TiltCard';
import exp1 from '../assets/exp1.png';
import exp2 from '../assets/exp2.png';
import exp3 from '../assets/exp3.png';
import exp4 from '../assets/exp4.png';
import './Experience.css';

const ShootingStars = () => {
    const [stars, setStars] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const id = Date.now();
            const star = {
                id,
                top: `${Math.random() * 50}%`,
                left: `${Math.random() * 100}%`,
                duration: 0.5 + Math.random() * 1,
                delay: Math.random() * 2
            };
            setStars(prev => [...prev, star].slice(-5));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="shooting-stars-wrap">
            <AnimatePresence>
                {stars.map(star => (
                    <motion.div
                        key={star.id}
                        className="shooting-star"
                        initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                        animate={{
                            x: 400,
                            y: 200,
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0]
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: star.duration, ease: "easeOut" }}
                        style={{ top: star.top, left: star.left }}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

const QuantumThreads = () => {
    return (
        <svg className="quantum-threads-svg" viewBox="0 0 1000 1000" preserveAspectRatio="none">
            <defs>
                <linearGradient id="thread-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--accent-1)" stopOpacity="0" />
                    <stop offset="50%" stopColor="var(--accent-1)" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="var(--accent-1)" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="thread-grad-alt" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--accent-3)" stopOpacity="0" />
                    <stop offset="50%" stopColor="var(--accent-3)" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="var(--accent-3)" stopOpacity="0" />
                </linearGradient>
            </defs>
            {[...Array(6)].map((_, i) => (
                <motion.path
                    key={i}
                    d={`M ${-200 + i * 150} ${100 + i * 150} Q ${500 + (i - 3) * 50} ${500} ${1200} ${900 - i * 150}`}
                    stroke={i % 2 === 0 ? "url(#thread-grad)" : "url(#thread-grad-alt)"}
                    strokeWidth={1 + Math.random()}
                    fill="none"
                    animate={{
                        d: [
                            `M ${-200 + i * 150} ${100 + i * 150} Q ${500 + (i - 3) * 50} ${500} ${1200} ${900 - i * 150}`,
                            `M ${-200 + i * 150} ${150 + i * 150} Q ${450 + (i - 3) * 50} ${550} ${1200} ${850 - i * 150}`,
                            `M ${-200 + i * 150} ${100 + i * 150} Q ${500 + (i - 3) * 50} ${500} ${1200} ${900 - i * 150}`
                        ]
                    }}
                    transition={{ duration: 10 + i * 4, repeat: Infinity, ease: "easeInOut" }}
                />
            ))}
        </svg>
    );
};

const CometTrail = () => {
    const [comets, setComets] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.7) {
                const id = Date.now();
                setComets(prev => [...prev, {
                    id,
                    top: `${Math.random() * 80}%`,
                    left: '-10%',
                    duration: 8 + Math.random() * 12
                }].slice(-3));
            }
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="comet-trails-wrap">
            <AnimatePresence>
                {comets.map(comet => (
                    <motion.div
                        key={comet.id}
                        className="comet-body"
                        initial={{ x: '-10%', opacity: 0 }}
                        animate={{ x: '120%', opacity: [0, 0.4, 0] }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: comet.duration, ease: "linear" }}
                        style={{ top: comet.top }}
                    >
                        <div className="comet-head" />
                        <div className="comet-tail" />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

const CosmicPulse = () => (
    <motion.div
        className="cosmic-pulse-env"
        animate={{ opacity: [0.02, 0.05, 0.02] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
    />
);

const StellarWind = () => {
    return (
        <div className="stellar-wind-wrap">
            <motion.div
                className="wind-layer"
                animate={{
                    x: ['-5%', '5%', '-5%'],
                    y: ['-2%', '2%', '-2%'],
                    rotate: [0, 5, 0]
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                style={{ background: 'radial-gradient(circle at 30% 40%, var(--accent-1) 0%, transparent 60%)', opacity: 0.05 }}
            />
            <motion.div
                className="wind-layer"
                animate={{
                    x: ['5%', '-5%', '5%'],
                    y: ['2%', '-2%', '2%'],
                    rotate: [0, -5, 0]
                }}
                transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                style={{ background: 'radial-gradient(circle at 70% 60%, var(--accent-3) 0%, transparent 60%)', opacity: 0.03 }}
            />
        </div>
    );
};

const ParallaxStarField = ({ scrollYProgress }) => {
    const nebulaScale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);
    const nebulaRotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

    return (
        <div className="galaxy-canvas">
            <CosmicPulse />
            <StellarWind />
            <ShootingStars />
            <CometTrail />
            <QuantumThreads />

            {/* Layer 1: Distant Stars (Slow) */}
            <div className="star-layer slow">
                {[...Array(80)].map((_, i) => (
                    <div key={`s-${i}`} className="star-particle distant" style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }} />
                ))}
            </div>

            {/* Layer 2: Midground Stars (Medium) */}
            <div className="star-layer medium">
                {[...Array(50)].map((_, i) => (
                    <div key={`m-${i}`} className="star-particle mid" style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }} />
                ))}
            </div>

            {/* Layer 3: Close Pulsing Stars (Fast/Bright) */}
            <div className="star-layer fast">
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={`f-${i}`}
                        className="star-particle bright"
                        animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.2, 1] }}
                        transition={{ duration: 2 + Math.random() * 3, repeat: Infinity }}
                        style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
                    />
                ))}
            </div>

            <motion.div
                className="nebula-vortex primary"
                style={{
                    scale: nebulaScale,
                    rotate: nebulaRotate,
                    background: 'radial-gradient(circle, var(--accent-1) 0%, transparent 70%)'
                }}
            />
            <motion.div
                className="nebula-vortex secondary"
                style={{
                    scale: nebulaScale,
                    rotate: useTransform(scrollYProgress, [0, 1], [0, -30]),
                    background: 'radial-gradient(circle, var(--accent-3) 0%, transparent 70%)'
                }}
            />
        </div>
    );
};

const ConstellationLine = ({ isLeft, color }) => (
    <div className={`constellation-link ${isLeft ? 'left' : 'right'}`} style={{ '--line-color': color }}>
        <div className="energy-pulse" />
    </div>
);

const OrbitalNode = ({ color, scrollProgress, index }) => {
    const scale = useTransform(scrollProgress, [index * 0.25, index * 0.25 + 0.1], [0, 1]);
    const glow = useTransform(scrollProgress, [index * 0.25, index * 0.25 + 0.1], [0, 1]);

    return (
        <motion.div className="orbital-node" style={{ scale, color }}>
            <motion.div className="node-glow-field" style={{ opacity: glow, background: `radial-gradient(circle, ${color}40 0%, transparent 70%)` }} />
            <div className="orbital-ring" />
            <div className="orbital-ring" style={{ animationDelay: '-2s', scale: 1.4 }} />
            <motion.div
                className="pulsar-core"
                animate={{
                    scale: [1, 1.3, 1],
                    boxShadow: [`0 0 10px ${color}`, `0 0 30px ${color}`, `0 0 10px ${color}`]
                }}
                transition={{ duration: 2, repeat: Infinity }}
            />
        </motion.div>
    );
};

const Experience = () => {
    const experiences = [
        {
            title: 'Training and Placement Coordinator',
            company: 'Training and Placement Cell, AEC',
            location: 'Assam Engineering College(AEC), Jalukbari, Ghy-13',
            period: 'Aug 2025 - Present',
            color: '#818cf8', // Indigo
            logo: exp1,
            description: [
                'Industry Coordination: Establishing relationships with HR for placements/internships and inviting organizations for campus drives.',
                'Student Training: Organizing workshops on soft skills, technical aptitude, and coordinating mock interviews/resume building.',
                'Drive Management: Scheduling recruitment processes and handling logistics for tests, interviews, and pre-placement talks.',
            ],
        },
        {
            title: 'Technical Associate',
            company: 'EDC, Assam Engineering College',
            location: 'AEC, Assam',
            period: 'Active',
            color: '#ec4899', // Pink
            logo: exp3,
            description: [
                'Full-stack maintenance of the existing EDC digital infrastructure.',
                'Implementing Agile protocols to accelerate startup incubation cycles.',
                'Developing cross-functional web modules for entrepreneurship initiatives.',
            ],
        },
        {
            title: 'Software Development Intern',
            company: 'DITEC, Govt. of Assam',
            location: 'Dispur, Assam',
            period: 'Jul. 2025 – Aug. 2025',
            color: '#22d3ee', // Cyan
            logo: exp2,
            description: [
                'RoW Portal: Optimized backend data management for telecom infrastructure.',
                'Aadhaar Integration: Integrated UIDAI e-KYC protocols into citizen microservices.',
                'Laravel/React CMS: Developed a full-stack administrative ecosystem for state services.',
            ],
        },
        {
            title: 'Winter Intern',
            company: 'IOCL, Guwahati',
            location: 'Guwahati, Assam',
            period: 'Jan, 2026 – Jan, 2026',
            color: '#c084fc', // Violet
            logo: exp4,
            description: [
                'AI Predictive Maintenance: Engineered Random Forest models for refinery components.',
                'Dashboarding: Built a real-time monitor for high-frequency sensor streams.',
            ],
        },
    ];

    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    return (
        <section id="experience" className="experience-section">
            <ParallaxStarField scrollYProgress={scrollYProgress} />

            <div className="container" ref={containerRef}>
                <motion.div className="section-header">
                    <h2 className="section-title">
                        <SplitText text="Interstellar" className="text-primary" /> <br />
                        <SplitText text="Career Journey" className="text-gradient" delay={0.3} />
                    </h2>
                    <p className="section-subtitle">Navigating through the professional event horizons of engineering.</p>
                </motion.div>

                <div className="experience-timeline" style={{ marginTop: '5rem', position: 'relative' }}>
                    <div className="timeline-path-cosmic">
                        <motion.div className="stardust-progress" style={{ height: useTransform(scaleY, s => `${s * 100}%`) }} />
                        <div className="energy-beam-core" />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8rem' }}>
                        {experiences.map((exp, index) => (
                            <div key={index} className="experience-item-wrap" style={{ position: 'relative' }}>
                                <OrbitalNode color={exp.color} scrollProgress={scrollYProgress} index={index} />
                                <ConstellationLine isLeft={index % 2 === 0} color={exp.color} />

                                <motion.div
                                    className={`experience-item-cosmic ${index % 2 === 0 ? 'left' : 'right'}`}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 1, type: "spring", bounce: 0.3 }}
                                >
                                    <TiltCard>
                                        <div className="experience-card-cosmic" style={{ borderLeft: `4px solid ${exp.color}` }}>
                                            <div className="card-nebula-bg" style={{ color: exp.color }} />

                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                                                <div
                                                    className="exp-logo-container"
                                                    style={{
                                                        borderColor: `${exp.color}40`,
                                                        '--exp-color': exp.color
                                                    }}
                                                >
                                                    <motion.div
                                                        className="exp-logo-glow"
                                                        style={{ background: exp.color }}
                                                        animate={{ opacity: [0.1, 0.3, 0.1] }}
                                                        transition={{ duration: 3, repeat: Infinity }}
                                                    />
                                                    <div className="exp-logo-img-wrapper" style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.8rem' }}>
                                                        <img src={exp.logo} alt={exp.company} className="exp-logo-img" />
                                                    </div>
                                                </div>
                                                <div className="exp-planet-badge" style={{ color: exp.color, borderColor: `${exp.color}30` }}>
                                                    <Orbit size={14} /> sector {index + 1}
                                                </div>
                                            </div>

                                            <h3 className="exp-title-stellar">{exp.title}</h3>

                                            <div className="exp-company-stellar" style={{ color: exp.color }}>
                                                <Rocket size={16} /> {exp.company}
                                            </div>

                                            <div className="exp-desc-stellar">
                                                {exp.description.map((desc, i) => (
                                                    <div key={i} className="stellar-bullet" style={{ color: exp.color }}>
                                                        <span style={{ color: 'var(--text-secondary)' }}>{desc}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="exp-footer-stellar">
                                                <div className="footer-item">
                                                    <Calendar size={14} /> {exp.period}
                                                </div>
                                                <div className="footer-item">
                                                    <MapPin size={14} /> {exp.location}
                                                </div>
                                            </div>
                                        </div>
                                    </TiltCard>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
