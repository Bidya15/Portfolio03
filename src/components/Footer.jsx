import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-top">
                        <div className="footer-logo">
                            BSR<span style={{ color: 'var(--accent)' }}>.</span>
                        </div>
                        <p className="footer-copy">
                            © {new Date().getFullYear()} Bidya Sing Rongpi. All rights reserved.
                        </p>
                    </div>

                    <div className="footer-socials">
                        {[
                            { icon: <Github size={24} />, href: 'https://github.com/bidya15' },
                            { icon: <Linkedin size={24} />, href: 'https://www.linkedin.com/in/bidya-s-rongpi-2b018a27b' },
                            { icon: <Mail size={24} />, href: 'mailto:bidyasingrongpi2004@gmail.com' },
                        ].map((social, i) => (
                            <a
                                key={i}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer-social-link"
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>

                    <div className="footer-tech">
                        Built with <span>Thoughts</span> & <span>Imagination</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
