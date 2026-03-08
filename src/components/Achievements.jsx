import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Trophy, Star, ShieldCheck, Zap, Orbit, Sparkles } from 'lucide-react';
import SplitText from './SplitText';
import './Achievements.css';

const Meteor = ({ index }) => {
    const startX = Math.random() * 100;
    const startY = Math.random() * 30;
    const duration = 2 + Math.random() * 3;
    const delay = Math.random() * 10;

    return (
        <motion.div
            className="meteor"
            animate={{
                x: [0, -500],
                y: [0, 500],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5]
            }}
            transition={{
                duration,
                repeat: Infinity,
                delay,
                ease: "linear"
            }}
            style={{
                left: `${startX}%`,
                top: `${startY}%`,
                rotate: '45deg'
            }}
        />
    );
};

const PlanetMilestone = ({ item, index, total }) => {
    // Invert Y to create upward arc and prioritize middle card
    const angle = (index / (total - 1)) * (Math.PI * 0.7) + (Math.PI * 0.15);
    const radius = 500;
    const x = Math.cos(angle) * radius;
    const y = -Math.sin(angle) * (radius * 0.5); // Flattened upward arc
    const zIndex = index === 1 ? 30 : 10;

    return (
        <motion.div
            className="planet-milestone"
            initial={{ opacity: 0, scale: 0.8, x: 0, y: 0 }}
            whileInView={{
                opacity: 1,
                scale: 1,
                x,
                y
            }}
            viewport={{ once: true }}
            transition={{
                type: "spring",
                stiffness: 50,
                damping: 20,
                delay: index * 0.2
            }}
            style={{ zIndex }}
            whileHover={{ scale: 1.1, zIndex: 50 }}
        >
            <div className="achievement-card-cosmic">
                <div className="nebula-glow" style={{ background: item.color }} />

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                    <div className="cosmic-badge" style={{ color: item.color, borderColor: `${item.color}40` }}>
                        {item.icon} {item.ribbon}
                    </div>
                    <span className="planet-year">{item.year}</span>
                </div>

                <h3 className="planet-title">{item.title}</h3>
                <p className="planet-desc">{item.desc}</p>

                <div style={{
                    marginTop: '2rem',
                    height: '2px',
                    background: `linear-gradient(90deg, ${item.color}, transparent)`,
                    borderRadius: '1px'
                }} />
            </div>
        </motion.div>
    );
};

const Achievements = () => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const sunScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);
    const sunRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

    const achievements = [
        {
            title: 'Advantage Assam 2.0 Quiz Competition',
            year: '2025',
            icon: <Trophy size={16} />,
            color: '#fbbf24', // Gold
            ribbon: 'WINNER',
            desc: 'Secured top position in a high-stakes regional technical challenge evaluating innovation and rapid problem-solving.'
        },
        {
            title: 'ATF 2024 Fellowship Program',
            year: '2024',
            icon: <ShieldCheck size={16} />,
            color: '#60a5fa', // Blue
            ribbon: 'FELLOW',
            desc: 'Selected for the prestigious fellowship focusing on advanced development paradigms and scalable architecture.'
        },
        {
            title: 'NEC 2024, IIT Bombay',
            year: '2024',
            icon: <Star size={16} />,
            color: '#c084fc', // Purple
            ribbon: 'FINALIST',
            desc: 'Recognized at the National Entrepreneurship Challenge for exceptional strategic planning and technical execution.'
        }
    ];

    return (
        <section id="achievements" className="achievements-section" ref={sectionRef}>
            {/* Gravity Core (Sun) */}
            <div className="gravity-core-container">
                <motion.div
                    className="core-sun"
                    style={{ scale: sunScale }}
                />
                <motion.div
                    className="core-ring"
                    style={{ width: '25vw', height: '25vw', rotate: sunRotate }}
                />
                <motion.div
                    className="core-ring"
                    style={{ width: '40vw', height: '40vw', rotate: sunRotate, opacity: 0.03, borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }}
                />
            </div>

            {/* Orbital Paths SVG */}
            <svg className="orbital-paths-svg" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
                <circle cx="500" cy="500" r="150" className="orbit-path-line" />
                <circle cx="500" cy="500" r="300" className="orbit-path-line" />
                <circle cx="500" cy="500" r="450" className="orbit-path-line" />
            </svg>

            {/* Meteor Rain */}
            <div className="meteor-container">
                {[...Array(6)].map((_, i) => <Meteor key={i} index={i} />)}
            </div>

            <div className="container">
                <div className="section-header" style={{ textAlign: 'center', marginBottom: '6rem' }}>
                    <h2 className="section-title">
                        <SplitText text="Celestial" className="text-primary" /> <br />
                        <SplitText text="Milestones" className="text-chameleon" delay={0.4} />
                    </h2>
                    <p className="section-subtitle" style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                        Mapping the trajectory of technical achievement across the professional cosmos.
                    </p>
                </div>

                <div className="achievements-cosmic-layout">
                    {achievements.map((item, index) => (
                        <PlanetMilestone
                            key={index}
                            item={item}
                            index={index}
                            total={achievements.length}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Achievements;
