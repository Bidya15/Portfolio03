import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Send, Mail, Phone, MapPin, Github, Linkedin, MessageSquare, CheckCircle2, Wifi, Zap, ShieldCheck, Eye, EyeOff, Lock, Unlock } from 'lucide-react';
import SplitText from './SplitText';
import './Contact.css';

const Ripple = ({ x, y }) => (
    <motion.div
        className="ripple-circle"
        initial={{ width: 0, height: 0, x, y, opacity: 0.5 }}
        animate={{ width: 500, height: 500, opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
    />
);

const EntangledSocial = ({ icon, href }) => (
    <motion.a
        href={href}
        className="social-portal-unique"
        whileHover="hover"
        initial="initial"
    >
        {[0.1, 0.2].map((delay, i) => (
            <motion.div
                key={i}
                style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.3, color: 'var(--accent-1)' }}
                variants={{
                    hover: {
                        x: (i + 1) * 10,
                        y: (i + 1) * -5,
                        opacity: 0.1,
                        filter: 'blur(2px)'
                    }
                }}
            >
                {icon}
            </motion.div>
        ))}
        <motion.div style={{ position: 'relative', zIndex: 2 }}>
            {icon}
        </motion.div>
    </motion.a>
);

const Contact = () => {
    const [ripples, setRipples] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [visibleFields, setVisibleFields] = useState(new Set()); // Hide all details by default
    const containerRef = useRef(null);
    const formRef = useRef(null);

    const beaconRef = useRef(null);

    const addRipple = (manualPos = null) => {
        let x, y;

        if (manualPos) {
            x = manualPos.x;
            y = manualPos.y;
        } else if (beaconRef.current && containerRef.current) {
            const beaconRect = beaconRef.current.getBoundingClientRect();
            const containerRect = containerRef.current.getBoundingClientRect();
            x = (beaconRect.left + beaconRect.width / 2) - containerRect.left;
            y = (beaconRect.top + beaconRect.height / 2) - containerRect.top;
        } else {
            return;
        }

        const id = Date.now();
        setRipples(prev => [...prev, { x, y, id }]);
        setTimeout(() => {
            setRipples(prev => prev.filter(r => r.id !== id));
        }, 1500);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            addRipple();
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        addRipple({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    const toggleVisibility = (index) => {
        const newVisible = new Set(visibleFields);
        if (newVisible.has(index)) {
            newVisible.delete(index);
        } else {
            newVisible.add(index);
        }
        setVisibleFields(newVisible);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage('');

        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (!serviceId || !templateId || !publicKey || serviceId === 'your_service_id') {
            setIsLoading(false);
            setErrorMessage('EMAIL_SERVICE_CONFIG_MISSING: Please configure .env file.');
            return;
        }

        emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
            .then((result) => {
                setIsLoading(false);
                setIsSubmitted(true);
                setFormState({ name: '', email: '', message: '' });
                formRef.current.reset();
                setTimeout(() => setIsSubmitted(false), 5000);
            }, (error) => {
                setIsLoading(false);
                setErrorMessage('TRANSMISSION_FAILED: ' + error.text);
            });
    };

    return (
        <section id="contact" className="contact-section" ref={containerRef}>
            <div className="signal-ripple-container">
                {ripples.map(ripple => (
                    <Ripple key={ripple.id} x={ripple.x} y={ripple.y} />
                ))}
            </div>

            <div className="container">
                <motion.div
                    className="contact-prism-v2"
                    onMouseMove={handleMouseMove}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                >
                    <div className="prism-edge-diffraction" />

                    {/* Info Column */}
                    <div className="contact-info-quantum">
                        <div>
                            <div className="signal-status-badge" ref={beaconRef}>
                                <Wifi size={12} className="pulse-icon" /> SYSTEM_STATUS: ONLINE // SIGNAL_STRENGTH: MAX
                            </div>
                            <h2 className="contact-title-unique">
                                <SplitText text="Establish" className="text-primary" /> <br />
                                <SplitText text="Connection" className="text-chameleon" delay={0.4} />
                            </h2>
                            <p style={{ color: 'var(--text-secondary)', marginTop: '1rem', maxWidth: '300px' }}>
                                Initiating quantum-encrypted communication channel. Awaiting signal emission.
                            </p>
                        </div>

                        <div className="contact-methods">
                            {[
                                { icon: <Mail />, label: 'Neural Link', value: 'bidyasingrongpi90@gmail.com', color: '#22d3ee' },
                                { icon: <Phone />, label: 'Audio Stream', value: '+91 7576069252', color: '#818cf8' },
                                { icon: <MapPin />, label: 'Origin Point', value: 'Guwahati, Assam', color: '#c084fc' }
                            ].map((method, i) => {
                                const isVisible = visibleFields.has(i);
                                return (
                                    <motion.div
                                        key={i}
                                        className={`quantum-method-card ${!isVisible ? 'is-encrypted' : ''}`}
                                        style={{ '--card-color': method.color }}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 * i }}
                                    >
                                        <div style={{ color: method.color }}>{method.icon}</div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: '0.7rem', opacity: 0.4, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{method.label}</div>
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={isVisible ? 'visible' : 'hidden'}
                                                    initial={{ opacity: 0, y: 5 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -5 }}
                                                    style={{ fontWeight: 700, fontSize: '1rem', fontFamily: !isVisible ? 'JetBrains Mono' : 'inherit' }}
                                                >
                                                    {isVisible ? method.value : "••••••••••••••••"}
                                                </motion.div>
                                            </AnimatePresence>
                                        </div>
                                        <button
                                            type="button"
                                            className="contact-toggle-btn"
                                            onClick={() => toggleVisibility(i)}
                                            style={{ color: method.color }}
                                        >
                                            {isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
                                        </button>
                                    </motion.div>
                                );
                            })}
                        </div>

                        <div className="entangled-socials">
                            <EntangledSocial icon={<Github />} href="#" />
                            <Linkedin size={24} style={{ display: 'none' }} /> {/* Just for reference if needed */}
                            <EntangledSocial icon={<Linkedin />} href="#" />
                            <EntangledSocial icon={<MessageSquare />} href="#" />
                        </div>
                    </div>

                    {/* Form Column */}
                    <div className="contact-form-quantum">
                        <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div className="quantum-input-container">
                                <input
                                    type="text"
                                    name="user_name"
                                    placeholder=" "
                                    className="quantum-input"
                                    value={formState.name}
                                    required
                                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                />
                                <div className="data-pulse-border" />
                                <label className="label-quantum">Identity_Key (Name)</label>
                            </div>

                            <div className="quantum-input-container">
                                <input
                                    type="email"
                                    name="user_email"
                                    placeholder=" "
                                    className="quantum-input"
                                    value={formState.email}
                                    required
                                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                />
                                <div className="data-pulse-border" />
                                <label className="label-quantum">Return_Path (Email)</label>
                            </div>

                            <div className="quantum-input-container">
                                <textarea
                                    name="message"
                                    placeholder=" "
                                    className="quantum-input"
                                    rows="5"
                                    value={formState.message}
                                    required
                                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                />
                                <div className="data-pulse-border" />
                                <label className="label-quantum">Signal_Payload (Message)</label>
                            </div>

                            <AnimatePresence>
                                {errorMessage && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        style={{ color: '#ef4444', fontSize: '0.7rem', fontFamily: 'JetBrains Mono' }}
                                    >
                                        [ERR] {errorMessage}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <motion.button
                                type="submit"
                                className="btn-emission"
                                disabled={isLoading}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Zap size={20} className={isLoading ? 'pulse-icon' : ''} />
                                {isLoading ? 'EMITTING...' : 'EMIT SIGNAL'}
                            </motion.button>
                        </form>

                        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '1rem', opacity: 0.3, fontSize: '0.65rem', fontFamily: 'JetBrains Mono' }}>
                            <ShieldCheck size={14} /> ENCRYPTION_ACTIVE: AES-256-GCM
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Success Bloom */}
            <AnimatePresence>
                {isSubmitted && (
                    <motion.div
                        className="data-bloom-overlay"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 2 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

export default Contact;
