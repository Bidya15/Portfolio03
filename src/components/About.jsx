import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Rocket, Sparkles, Binary, Cpu, Fingerprint, Zap, Atom, Orbit, Activity, ShieldCheck, Target, Terminal, Code2, Database, Network } from 'lucide-react';
import SplitText from './SplitText';
import TiltCard from './TiltCard';
import profileHologram from '../assets/profile.jpeg';
import './About.css';

const BinaryColumn = ({ index }) => {
    const [stream, setStream] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            setStream(prev => (prev + (Math.random() > 0.5 ? "1" : "0")).slice(-30));
        }, 100 + Math.random() * 200);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            className="binary-column"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
        >
            {stream}
        </motion.div>
    );
};

const FluxRing = ({ color, scrollProgress }) => {
    const rotate = useTransform(scrollProgress, [0, 1], [0, 360]);
    const radius = 35;
    const circumference = 2 * Math.PI * radius;

    return (
        <div className="flux-ring-container">
            <svg viewBox="0 0 100 100" className="flux-ring-svg">
                <circle
                    cx="50" cy="50" r={radius}
                    className="ring-track"
                    strokeWidth="2"
                />
                <motion.circle
                    cx="50" cy="50" r={radius}
                    className="ring-gauge"
                    stroke={color}
                    strokeWidth="4"
                    strokeDasharray={circumference}
                    animate={{
                        strokeDashoffset: [circumference, circumference * 0.3],
                        rotate: [0, 360]
                    }}
                    transition={{
                        strokeDashoffset: { duration: 2, ease: "easeOut" },
                        rotate: { duration: 10, repeat: Infinity, ease: "linear" }
                    }}
                />
            </svg>
            <motion.div
                className="flux-core"
                style={{ background: color, rotate }}
            />
        </div>
    );
};

const DataLeak = ({ color }) => {
    const [leaks, setLeaks] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const id = Math.random();
            setLeaks(prev => [...prev, { id, x: Math.random() * 80 + 10, val: Math.random() > 0.5 ? "1" : "0" }]);
            setTimeout(() => setLeaks(prev => prev.filter(l => l.id !== id)), 2000);
        }, 400);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="data-leak-field">
            <AnimatePresence>
                {leaks.map(l => (
                    <motion.span
                        key={l.id}
                        className="leak-bit"
                        initial={{ y: 0, opacity: 0 }}
                        animate={{ y: 50, opacity: [0, 1, 0] }}
                        exit={{ opacity: 0 }}
                        style={{ left: `${l.x}%`, color }}
                    >
                        {l.val}
                    </motion.span>
                ))}
            </AnimatePresence>
        </div>
    );
};

const LogicCard = ({ icon, title, desc, complexity, delay, color }) => (
    <motion.div
        className="bio-card-singularity"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.8 }}
    >
        <span className="memory-addr">{`0x${Math.floor(Math.random() * 16777215).toString(16).toUpperCase().padStart(8, '0')}`}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', position: 'relative', zIndex: 2 }}>
            <div className="node-icon-wrapper" style={{ background: `linear-gradient(135deg, ${color}, transparent)`, color: 'var(--bg-primary)' }}>
                {icon}
            </div>
            <div className="node-text">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <h4 style={{ color, fontSize: '1rem', fontWeight: '800' }}>{title}</h4>
                    <span className="complexity-badge">{complexity}</span>
                </div>
                <p style={{ fontSize: '0.85rem', opacity: 0.7 }}>{desc}</p>
            </div>
        </div>
    </motion.div>
);

const StatusTag = ({ text, angle, delay, radius }) => (
    <motion.div
        className="status-tag-orbital"
        animate={{
            x: [radius * Math.cos(angle), radius * Math.cos(angle + Math.PI * 2)],
            y: [radius * Math.sin(angle), radius * Math.sin(angle + Math.PI * 2)],
        }}
        transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
            delay
        }}
    >
        {text}
    </motion.div>
);

const About = () => {
    const sectionRef = useRef(null);
    const [hue, setHue] = useState(200);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const scrollHue = useTransform(scrollYProgress, [0, 1], [200, 320]);
    const orbitalRotate = useTransform(scrollYProgress, [0, 1], [0, 720]);
    const hudScale = useTransform(scrollYProgress, [0.1, 0.3], [0.8, 1]);

    useEffect(() => {
        return scrollHue.onChange(v => setHue(v));
    }, [scrollHue]);

    return (
        <section
            id="about"
            className="about-section"
            ref={sectionRef}
            style={{
                '--hue-1': `hsl(${hue}, 100%, 60%)`,
                '--hue-2': `hsl(${hue + 40}, 100%, 60%)`,
                '--accent-1': `hsl(${hue}, 100%, 60%)`
            }}
        >
            {/* Binary Stream Background */}
            <div className="binary-stream-container">
                {[...Array(12)].map((_, i) => <BinaryColumn key={i} index={i} />)}
            </div>

            {/* Logic Connectors SVG */}
            <svg className="logic-connector-svg" viewBox="0 0 1000 1000">
                <path className="logic-trace" d="M100,200 L300,200 L300,400 L500,400" />
                <path className="logic-trace" d="M900,800 L700,800 L700,600 L500,600" />
                <rect x="290" y="390" width="20" height="20" className="gate-symbol" />
                <circle cx="700" cy="600" r="10" className="gate-symbol" />
            </svg>

            <div className="container">
                <div className="about-grid">
                    <motion.div className="about-content">
                        <motion.div
                            className="about-tag"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            style={{ background: 'var(--glass)', color: 'var(--hue-1)', borderColor: 'var(--hue-1)' }}
                        >
                            <Terminal size={14} /> Architecture of Logic
                        </motion.div>

                        <h2 className="about-title">
                            <SplitText text="Architecting" className="text-primary" /> <br />
                            <SplitText text="Enterprise Ecosystems" className="text-chameleon" delay={0.4} />
                        </h2>

                        <div className="code-term-card" style={{ marginTop: '2rem' }}>
                            <span className="code-line"><span className="at">@architecture</span> / <span className="fn">LogicAssembler</span></span>
                            <div className="about-text" style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>
                                <p>
                                    My engineering philosophy centers on <strong>Robust Java Architectures</strong> and
                                    <strong>Enterprise Scalability</strong>. I don't just build applications; I design
                                    high-throughput <span style={{ color: 'var(--hue-1)', fontWeight: '800' }}>Backend Ecosystems</span>.
                                </p>
                                <p>
                                    From optimizing <span style={{ color: 'var(--hue-1)', fontStyle: 'italic' }}>Spring Boot Microservices</span> for massive scale
                                    to architecting <span style={{ color: 'var(--hue-2)', fontStyle: 'italic' }}>Cloud-Native Solutions</span> in AWS,
                                    I prioritize <strong>Thread-Safety</strong> and <strong>Memory Efficiency</strong>.
                                </p>
                            </div>
                        </div>

                        <div className="memory-node-system" style={{ gap: '1.2rem', marginTop: '2rem' }}>
                            <LogicCard
                                icon={<Database size={24} />}
                                title="Persistence Mastery"
                                desc="Optimizing data-layer performance with Hibernate and complex PostgreSQL indexing."
                                complexity="HIBERNATE"
                                color="var(--hue-1)"
                                delay={0.6}
                            />
                            <LogicCard
                                icon={<Network size={24} />}
                                title="Spring Ecosystem"
                                desc="Building secure, cloud-native microservices with Spring Cloud and Netflix OSS."
                                complexity="SPRING BOOT"
                                color="var(--hue-2)"
                                delay={0.7}
                            />
                        </div>
                    </motion.div>

                    <motion.div className="about-visual">
                        <motion.div className="visual-core-singularity" style={{ scale: hudScale }}>
                            {/* Minimalism Anti-Gravity Glow */}
                            <div className="neural-void-glow" />

                            <motion.div className="hologram-container neural-frame">
                                <div className="holographic-interference" />
                                <div className="scanning-bar-v2" />
                                <div className="frame-border-glitch" />
                                <img src={profileHologram} alt="Neural Node Profile" className="profile-hologram-image" />

                                <StatusTag text="STATUS: ACTIVE" angle={0} radius={80} delay={0} />
                                <StatusTag text="CORE: STABLE" angle={Math.PI} radius={100} delay={0.5} />
                                <StatusTag text="TYPE: ARCHITECT" angle={Math.PI / 2} radius={60} delay={1} />
                            </motion.div>

                            <div className="singularity-orbit">
                                <div className="orbit-planet" />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                <div className="about-stats" style={{ marginTop: '5rem' }}>
                    {[
                        { number: "99.9%", label: "System Uptime", color: "var(--hue-1)", icon: <Activity size={24} /> },
                        { number: "O(log n)", label: "Logic Depth", color: "var(--hue-2)", icon: <Zap size={24} /> },
                        { number: "2.4k", label: "Neural Synapses", color: "var(--hue-1)", icon: <Code2 size={24} /> }
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            className="stat-card-biolume"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 + (i * 0.1) }}
                            style={{ background: 'var(--surface-1)', border: `1px solid ${stat.color}40`, boxShadow: 'var(--card-shadow)' }}
                        >
                            <DataLeak color={stat.color} />
                            <div className="stat-spectrum-bg" style={{ background: `linear-gradient(45deg, transparent, ${stat.color}10, transparent)` }} />
                            <div style={{ color: stat.color, marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                                {stat.icon}
                                <FluxRing color={stat.color} scrollProgress={scrollYProgress} />
                            </div>
                            <h3 className="stat-number-vivid" style={{ color: 'var(--text-primary)' }}>{stat.number}</h3>
                            <p style={{ color: stat.color, fontWeight: '800', letterSpacing: '0.2em', fontSize: '0.75rem', textTransform: 'uppercase' }}>{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
