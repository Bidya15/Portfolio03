import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ExternalLink, Github, Terminal, Code2, Cpu, Database, Server, Box, Layers, X, ChevronRight, Zap } from 'lucide-react';
import SplitText from './SplitText';
import TiltCard from './TiltCard';
import './Projects.css';

const ProjectDetailsModal = ({ project, onClose }) => {
    if (!project) return null;

    return (
        <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="modal-content-glass"
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-header-lab">
                    <div className="modal-title-wrap">
                        <span className="modal-tag" style={{ color: project.color }}>{project.tag}</span>
                        <h2 className="modal-title">{project.title}</h2>
                    </div>
                    <button className="modal-close-btn" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <div className="modal-body-lab">
                    <div className="modal-scroll-area">
                        <div className="modal-section">
                            <h4 className="modal-section-label">TECHNICAL DOSSIER</h4>
                            <p className="modal-long-desc">{project.longDescription}</p>
                        </div>

                        <div className="modal-section">
                            <h4 className="modal-section-label">SYSTEM HIGHLIGHTS</h4>
                            <ul className="modal-highlights-list">
                                {project.highlights.map((highlight, i) => (
                                    <li key={i} className="highlight-item">
                                        <ChevronRight size={16} style={{ color: project.color }} />
                                        <span>{highlight}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="modal-section">
                            <h4 className="modal-section-label">TECHNOLOGY STACK</h4>
                            <div className="modal-tech-grid">
                                {project.tech.map((t, i) => (
                                    <span key={i} className="tech-pill-modal" style={{ '--accent': project.color }}>{t}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer-lab">
                        <motion.a
                            href={project.links.github}
                            className="modal-action-btn"
                            style={{ background: project.color }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            SOURCE ACCESS <Github size={18} />
                        </motion.a>
                        {project.links.demo !== '#' && (
                            <motion.a
                                href={project.links.demo}
                                className="modal-action-btn secondary"
                                style={{ borderColor: project.color, color: project.color }}
                                whileHover={{ scale: 1.05, background: `${project.color}10` }}
                                whileTap={{ scale: 0.95 }}
                            >
                                LIVE DEPLOYMENT <ExternalLink size={18} />
                            </motion.a>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const RefractiveShard = ({ index }) => {
    const x = useMotionValue(Math.random() * 100);
    const y = useMotionValue(Math.random() * 100);
    const rotate = useMotionValue(Math.random() * 360);

    return (
        <motion.div
            className="refractive-shard"
            animate={{
                x: [`${x.get()}%`, `${x.get() + 2}%`, `${x.get()}%`],
                y: [`${y.get()}%`, `${y.get() - 2}%`, `${y.get()}%`],
                rotate: [rotate.get(), rotate.get() + 10, rotate.get()]
            }}
            transition={{ duration: 5 + Math.random() * 5, repeat: Infinity }}
            style={{
                width: 40 + Math.random() * 60,
                height: 40 + Math.random() * 60,
                left: 0, top: 0,
                opacity: 0.1,
                clipPath: index % 2 === 0 ? 'polygon(50% 0%, 100% 100%, 0% 100%)' : 'polygon(0% 20%, 100% 0%, 80% 100%, 20% 80%)'
            }}
        />
    );
};

const TerminalChip = ({ code }) => (
    <motion.div
        className="terminal-chip"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
    >
        <div className="terminal-header">
            <div className="terminal-dot" />
            <div className="terminal-dot" />
            <div className="terminal-dot" />
        </div>
        <div className="code-stream">
            {code.map((line, i) => (
                <motion.div
                    key={i}
                    animate={{ x: [0, 2, 0] }}
                    transition={{ delay: i * 0.1, duration: 2, repeat: Infinity }}
                >
                    {`> ${line}`}
                </motion.div>
            ))}
            <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity }}>_</motion.div>
        </div>
    </motion.div>
);

const Projects = () => {
    const [hoveredProject, setHoveredProject] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
    const gridY = useTransform(scrollYProgress, [0, 1], [0, 200]);

    // Mouse Tracking for Reactive Glow
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { left, top } = sectionRef.current.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    const projects = [
        {
            title: 'Spam Analysis Engine',
            tag: 'Neural Filter v2.0',
            description: 'A high-precision machine learning pipeline utilizing Logistic Regression and NLP to achieve 92% classification accuracy.',
            longDescription: 'This project implements a sophisticated spam detection ecosystem. By leveraging Natural Language Processing (NLP) techniques like TF-IDF vectorization and Tokenization, the system transforms raw text into high-dimensional feature vectors. The core engine uses a weighted Logistic Regression model, optimized through cross-validation to handle class imbalance, ensuring minimal false positives for critical communications.',
            highlights: [
                'NLP Pre-processing pipeline (Lemmatization, Stop-word removal)',
                '92.5% Weighted F1-Score on SMS Spam Collection Dataset',
                'Real-time inference engine with Tkinter GUI integration',
                'Automated telemetry logging for model performance tracking'
            ],
            tech: ['Python', 'Scikit-learn', 'NLTK', 'Tkinter'],
            color: '#6366f1',
            icon: <Cpu size={32} />,
            code: ['import sklearn', 'model.fit(X, y)', 'score = 0.925', 'predicting...', 'Done.'],
            links: { github: 'https://github.com/bidya15', demo: '#' }
        },
        {
            title: 'Predictive Maintenance Hub',
            tag: 'Industrial AI / IOCL',
            description: 'Advanced fault-detection dashboard for refinery machinery. Combines Random Forest predictors with high-frequency telemetry.',
            longDescription: 'Developed during a tenure at IOCL, this system monitors critical industrial assets. It processes multi-variate time-series data from vibration, thermal, and pressure sensors. A Random Forest classifier identifies early-stage failure signatures with 89% precision, allowing for preemptive maintenance scheduling and reducing unplanned downtime by an estimated 15%.',
            highlights: [
                'Multi-sensor time-series feature engineering',
                'Random Forest Ensemble for fault signature detection',
                'Reactive Dashboard built with React and DataV visualization',
                'RESTful API layer using FastAPI for low-latency data access'
            ],
            tech: ['FastAPI', 'ReactJs', 'DataV', 'ForestML'],
            color: '#ec4899',
            icon: <Database size={32} />,
            code: ['GET /telemetry', 'predicting_failure', 'status: critical', 'triggering_alert', 'OK.'],
            links: { github: 'https://github.com/bidya15', demo: '#' }
        },
        {
            title: 'Portfolio Website',
            tag: 'Personal Project',
            description: 'A modern, responsive portfolio built with React and Framer Motion to showcase my engineering skills.',
            longDescription: 'An ultra-premium digital presence designed to mirror the structural elegance of enterprise software. This portfolio utilizes Framer Motion for complex coordinate-based animations and custom CSS for high-end glassmorphism effects. It features a fully responsive architecture with mobile-first optimizations and a unified theme system.',
            highlights: [
                'Physics-based particle swarm in Hero section',
                'Coordinate-mapped SVG "Neural Tethers"',
                'Adaptive layout system for zero-perceptual-latency transitions',
                'Fully responsive "Enterprise-Compact" scaling'
            ],
            tech: ['ReactJs', 'Framer Motion', 'CSS', 'Lucide'],
            color: '#6366f1',
            icon: <Code2 size={32} />,
            code: ['import React', 'import FramerMotion', 'import CSS'],
            links: { github: 'https://github.com/bidya15/Portfolio', demo: 'https://bidya15.github.io/Portfolio/' }
        },
        {
            title: 'Alumni Connect',
            tag: 'Web Application',
            description: 'A full-stack enterprise platform for connecting institutional alumni with secure JWT-based authentication.',
            longDescription: 'A comprehensive networking solution built on the Spring Boot ecosystem. This project features a robust security layer using Spring Security and JWT for stateless authentication. The data layer uses Hibernate/JPA with PostgreSQL, optimized for complex relational queries. The frontend provides a seamless SPA experience with secure Google OAuth2 integration.',
            highlights: [
                'Stateless Auth with JWT and Refresh Token rotation',
                'Complex PostgreSQL schema with Hibernate optimizations',
                'Spring Security integration with Google OAuth2',
                'Distributed microservice-ready architecture'
            ],
            tech: ['ReactJs', 'Spring Boot 4.0', 'PostgreSQL', 'JWT', 'Spring Security', 'Hibernate'],
            color: '#63f1ac',
            icon: <Server size={32} />,
            code: ['POST /auth/login', 'JWT_TOKEN_GENERATED', 'fetching_alumni_data', 'connection: secured', 'READY'],
            links: { github: 'https://github.com/bidya15', demo: '#' }
        }
    ];

    return (
        <section
            id="projects"
            className="projects-section"
            ref={sectionRef}
            onMouseMove={handleMouseMove}
        >
            <motion.div className="projects-grid-canvas" style={{ y: gridY }} />

            {/* Reactive Glow Layer */}
            <motion.div
                className="projects-grid-glow"
                style={{
                    y: gridY,
                    maskImage: useTransform(
                        [smoothMouseX, smoothMouseY],
                        ([x, y]) => `radial-gradient(350px circle at ${x}px ${y}px, black, transparent)`
                    ),
                    WebkitMaskImage: useTransform(
                        [smoothMouseX, smoothMouseY],
                        ([x, y]) => `radial-gradient(350px circle at ${x}px ${y}px, black, transparent)`
                    )
                }}
            />

            <div className="scanning-beam" />

            <div className="container">
                <motion.div className="section-header" style={{ marginBottom: '6rem' }}>
                    <h2 className="section-title">
                        <SplitText text="Discovery" className="text-primary" /> <br />
                        <SplitText text="Lab Showcase" className="text-gradient" delay={0.3} />
                    </h2>
                    <p className="section-subtitle">A collection of technical prototypes and engineered solutions.</p>
                </motion.div>

                <div className="projects-lab-flow">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            className={`project-item-row ${index % 2 !== 0 ? 'reverse' : ''}`}
                            onMouseEnter={() => setHoveredProject(index)}
                            onMouseLeave={() => setHoveredProject(null)}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="project-visual-side" style={{ flex: 1, position: 'relative' }}>
                                <TerminalChip code={project.code} />
                                <TiltCard>
                                    <div className="blueprint-mockup">
                                        <div className="blueprint-lines" />
                                        <svg className="blueprint-reveal-svg" viewBox="0 0 100 100">
                                            <rect x="10" y="10" width="80" height="80" rx="4" />
                                            <circle cx="50" cy="50" r="20" />
                                            <path d="M10,50 L90,50 M50,10 L50,90" style={{ opacity: 0.3 }} />
                                        </svg>
                                        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, color: project.color }}>
                                            <motion.div
                                                animate={{ scale: hoveredProject === index ? 1.5 : 1, rotate: hoveredProject === index ? 360 : 0 }}
                                                transition={{ duration: 1.5 }}
                                            >
                                                {project.icon}
                                            </motion.div>
                                        </div>
                                        <div className="refractive-container" style={{ position: 'absolute', inset: 0 }}>
                                            {[...Array(3)].map((_, i) => <RefractiveShard key={i} index={i} />)}
                                        </div>
                                    </div>
                                </TiltCard>
                            </div>

                            <div className="project-details-lab">
                                <motion.span className="project-tag-lab" style={{ color: project.color }}>
                                    <Layers size={14} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} /> {project.tag}
                                </motion.span>

                                <h3 className="project-title-lab">{project.title}</h3>

                                <p className="project-desc-lab">{project.description}</p>

                                <div className="project-tech-lab">
                                    {project.tech.map((t, i) => (
                                        <span key={i} className="tech-pill-lab" style={{ '--accent': project.color }}>{t}</span>
                                    ))}
                                </div>

                                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                                    <motion.button
                                        onClick={() => setSelectedProject(project)}
                                        className="read-more-trigger"
                                        style={{
                                            backgroundColor: `${project.color}20`,
                                            color: project.color,
                                            borderColor: `${project.color}40`
                                        }}
                                        whileHover={{
                                            backgroundColor: project.color,
                                            color: '#000000' // Dark text for better contrast on neon buttons
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        READ FULL DOSSIER <ChevronRight size={18} />
                                    </motion.button>

                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <motion.a
                                            href={project.links.github}
                                            className="action-btn-magnetic"
                                            whileHover={{ scale: 1.1, backgroundColor: project.color, color: 'var(--bg-primary)' }}
                                        >
                                            <Github size={20} />
                                        </motion.a>
                                        {project.links.demo !== '#' && (
                                            <motion.a
                                                href={project.links.demo}
                                                className="action-btn-magnetic"
                                                whileHover={{ scale: 1.1, backgroundColor: project.color, color: 'var(--bg-primary)' }}
                                            >
                                                <ExternalLink size={20} />
                                            </motion.a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedProject && (
                    <ProjectDetailsModal
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

export default Projects;
