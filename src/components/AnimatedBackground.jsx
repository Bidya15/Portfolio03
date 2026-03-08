import React, { useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const AnimatedBackground = () => {
    const { scrollYProgress } = useScroll();
    const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
    const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

    const orbs = useMemo(() => [
        { size: '40vw', color: 'var(--accent-1)', top: '-10%', left: '-10%', y: y1 },
        { size: '35vw', color: 'var(--accent-2)', bottom: '10%', right: '-5%', y: y2 },
        { size: '25vw', color: 'var(--accent-3)', top: '40%', right: '15%', y: y1 },
    ], [y1, y2]);

    return (
        <div className="bg-mesh" style={{ pointerEvents: 'none', position: 'fixed' }}>
            {orbs.map((orb, i) => (
                <motion.div
                    key={i}
                    className="mesh-glow"
                    style={{
                        width: orb.size,
                        height: orb.size,
                        background: orb.color,
                        top: orb.top,
                        left: orb.left,
                        right: orb.right,
                        bottom: orb.bottom,
                        y: orb.y,
                        rotate: rotate,
                        opacity: 0.15,
                    }}
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.12, 0.2, 0.12],
                    }}
                    transition={{
                        duration: 10 + i * 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            ))}

            {/* Adaptive overlay for better contrast */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at center, transparent 0%, var(--bg-primary) 100%)',
                opacity: 'var(--bg-overlay-opacity)'
            }} />
        </div>
    );
};

export default AnimatedBackground;
