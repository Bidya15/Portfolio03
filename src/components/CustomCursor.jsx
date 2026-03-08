import React, { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isHovering, setIsHovering] = useState(false);

    const springConfig = { damping: 25, stiffness: 200 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const moveMouse = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleHover = (e) => {
            const isClickable = e.target.closest('a, button, .interactive');
            setIsHovering(!!isClickable);
        };

        window.addEventListener('mousemove', moveMouse);
        window.addEventListener('mouseover', handleHover);

        return () => {
            window.removeEventListener('mousemove', moveMouse);
            window.removeEventListener('mouseover', handleHover);
        };
    }, []);

    return (
        <>
            <motion.div
                style={{
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    x: mouseX,
                    y: mouseY,
                    translateX: '-50%',
                    translateY: '-50%',
                    zIndex: 9999,
                    pointerEvents: 'none',
                    width: '6px',
                    height: '6px',
                    backgroundColor: 'var(--accent-1)',
                    borderRadius: '50%',
                }}
            />
            <motion.div
                animate={{
                    scale: isHovering ? 2 : 1,
                    backgroundColor: isHovering ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
                }}
                transition={{ type: 'spring', damping: 10 }}
                style={{
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                    zIndex: 9998,
                    pointerEvents: 'none',
                    width: '32px',
                    height: '32px',
                    border: '1px solid var(--accent-1)',
                    borderRadius: '50%',
                }}
            />
        </>
    );
};

export default CustomCursor;
