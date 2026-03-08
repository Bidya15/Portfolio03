import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Terminal, Globe, Smartphone, Database, Cpu, Code2, Zap, Activity, ShieldAlert } from 'lucide-react';
import SplitText from './SplitText';
import './Skills.css';

const NeuralBackground = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    useEffect(() => {
        let throttleTimer;
        const handleMouseMove = (e) => {
            if (throttleTimer) return;
            throttleTimer = setTimeout(() => {
                const { clientX, clientY } = e;
                mouseX.set(clientX);
                mouseY.set(clientY);
                throttleTimer = null;
            }, 10); // Throttle to 100fps
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (throttleTimer) clearTimeout(throttleTimer);
        };
    }, []);

    const gridMask = useTransform(
        [smoothX, smoothY],
        ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, black, transparent)`
    );

    return (
        <div className="neural-grid-wrap">
            <div className="static-grid" />
            <motion.div
                className="distorted-grid"
                style={{
                    WebkitMaskImage: gridMask,
                    maskImage: gridMask,
                }}
            />
            <div className="grid-light-follow" style={{
                left: useSpring(mouseX, { stiffness: 100, damping: 30 }),
                top: useSpring(mouseY, { stiffness: 100, damping: 30 })
            }} />
        </div>
    );
};

const DataRain = () => {
    return (
        <div className="data-rain-wrap">
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={i}
                    className="data-stream"
                    initial={{ y: '-100%' }}
                    animate={{ y: '200%' }}
                    transition={{
                        duration: 5 + Math.random() * 5,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                        ease: "linear"
                    }}
                    style={{ left: `${Math.random() * 100}%`, opacity: 0.1 + Math.random() * 0.1 }}
                />
            ))}
        </div>
    );
};

const CircuitPulses = () => {
    return (
        <div className="circuit-pulses-wrap">
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    className="circuit-pulse"
                    animate={{
                        left: ['0%', '100%'],
                        opacity: [0, 1, 0]
                    }}
                    transition={{
                        duration: 4 + Math.random() * 4,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                        ease: "linear"
                    }}
                    style={{
                        top: `${Math.random() * 100}%`,
                        '--pulse-color': i % 2 === 0 ? 'var(--accent-1)' : 'var(--accent-2)'
                    }}
                />
            ))}
        </div>
    );
};

const PowerTrace = ({ start, end, delay }) => (
    <motion.path
        className="trace-line"
        d={`M${start.x},${start.y} L${end.x},${end.y}`}
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.15 }}
        transition={{ duration: 2, delay }}
    >
        <motion.circle
            r="2"
            className="data-packet"
            initial={{ offset: 0 }}
            animate={{ offset: 1 }}
            transition={{ duration: 3, repeat: Infinity, delay, ease: "linear" }}
        />
    </motion.path>
);

const MainframeCard = ({ group, index }) => {
    const [isOverclocked, setIsOverclocked] = useState(false);

    return (
        <motion.div
            className={`mainframe-card ${group.span}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            onMouseEnter={() => setIsOverclocked(true)}
            onMouseLeave={() => setIsOverclocked(false)}
            style={{ '--card-accent': group.color, '--card-accent-rgb': group.rgb }}
        >
            <div className="overclock-warning" />

            <div className="card-monitor-overlay">
                <span>CORE_TEMP: {isOverclocked ? '78°C' : '42°C'}</span>
                <span>VOLTAGE: {isOverclocked ? '1.45V' : '1.10V'}</span>
                <span style={{ color: isOverclocked ? '#ef4444' : group.color }}>
                    {isOverclocked ? 'WARN: OVERCLOCK_ACTIVE' : 'STATUS: OPTIMAL'}
                </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{
                    padding: '0.75rem',
                    background: `${group.color}15`,
                    borderRadius: '1rem',
                    color: group.color,
                    boxShadow: isOverclocked ? `0 0 20px ${group.color}` : 'none',
                    transition: 'all 0.3s'
                }}>
                    {React.cloneElement(group.icon, { size: 28 })}
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-primary)' }}>{group.category}</h3>
            </div>

            <div className="bento-tags" style={{ gap: '0.8rem' }}>
                {group.skills.map((skill, i) => (
                    <motion.span
                        key={i}
                        className="skill-tag-neon"
                        animate={isOverclocked ? {
                            scale: [1, 1.05, 1],
                            borderColor: [group.color, '#ef4444', group.color]
                        } : {}}
                        transition={{ duration: 0.2, repeat: Infinity }}
                    >
                        <Code2 size={14} style={{ opacity: 0.6 }} />
                        {skill}
                    </motion.span>
                ))}
            </div>

            {isOverclocked && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ position: 'absolute', bottom: '1rem', left: '2.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ef4444', fontSize: '0.65rem', fontWeight: '800' }}
                >
                    <ShieldAlert size={12} /> SYSTEM_THROTTLE_BYPASSED
                </motion.div>
            )}
        </motion.div>
    );
};

const Skills = () => {
    const skillGroups = [
        {
            category: 'Backend Architecture',
            skills: ['Java', 'Spring Boot', 'Hibernate', 'Microservices', 'REST APIs'],
            color: '#6366f1',
            rgb: '99, 102, 241',
            icon: <Database />,
            span: 'span-2'
        },
        {
            category: 'Cloud & Infrastructure',
            skills: ['AWS (EC2, S3)', 'Docker', 'Kubernetes', 'CI/CD', 'Git'],
            color: '#f43f5e',
            rgb: '244, 63, 94',
            icon: <Cpu />,
            span: 'span-2'
        },
        {
            category: 'Full-Stack Logic',
            skills: ['Javascript', 'ReactJS', 'C/C++', 'Python', 'MySQL', 'PostgreSQL'],
            color: '#ec4899',
            rgb: '236, 72, 153',
            icon: <Terminal />,
            span: 'span-2'
        },
        {
            category: 'Mobile & Data',
            skills: ['React Native', 'Android Studio', 'Firebase', 'MongoDB'],
            color: '#8b5cf6',
            rgb: '139, 92, 246',
            icon: <Smartphone />,
            span: 'span-2'
        },
    ];

    return (
        <section id="skills" className="skills-section-mainframe">
            <NeuralBackground />
            <DataRain />
            <CircuitPulses />
            <div className="circuit-grid" />

            <div className="processor-hub-container">
                <motion.div className="processor-core" />
                <div className="core-ring-outer" />
                <div className="core-ring-outer" style={{ width: '350px', height: '350px', animationDirection: 'reverse', opacity: 0.1 }} />
            </div>

            <div className="container">
                <div className="section-header" style={{ marginBottom: '6rem', position: 'relative', zIndex: 10 }}>
                    <h2 className="section-title">
                        <SplitText text="Technical" className="text-primary" /> <br />
                        <SplitText text="Arsenal" className="text-chameleon" delay={0.4} />
                    </h2>
                    <p className="section-subtitle" style={{ color: 'var(--text-secondary)', maxWidth: '400px' }}>
                        Overclocking the boundaries of performance with a high-fidelity development stack.
                    </p>
                </div>

                <div className="skills-mainframe-grid">
                    {skillGroups.map((group, index) => (
                        <MainframeCard key={index} group={group} index={index} />
                    ))}
                </div>
            </div>

            {/* Micro-System Decoration */}
            <div className="system-status-indicator">
                MAINFRAME_OS_v4.2 // KERNEL: STABLE
            </div>
        </section>
    );
};

export default Skills;
