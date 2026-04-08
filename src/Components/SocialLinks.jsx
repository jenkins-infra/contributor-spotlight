import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import XIcon from './XIcon.jsx';

const socialLinkVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
        opacity: 1,
        scale: 1,
        transition: {
            delay: i * 0.1,
            type: 'spring',
            stiffness: 200,
            damping: 15,
        },
    }),
    hover: {
        scale: 1.2,
        rotate: 5,
        transition: { type: 'spring', stiffness: 400 },
    },
};

const linkConfig = {
    github: {
        href: (value) => `https://github.com/${value}`,
        label: 'GitHub',
        icon: <Github size={18} />,
    },
    linkedin: {
        href: (value) => `https://linkedin.com/in/${value}`,
        label: 'LinkedIn',
        icon: <Linkedin size={18} />,
    },
    twitter: {
        href: (value) => `https://x.com/${value}`,
        label: 'X (formerly Twitter)',
        icon: <XIcon size={18} />,
    },
    email: {
        href: (value) => `mailto:${value}`,
        label: 'Email',
        icon: <Mail size={18} />,
    },
};

const SocialLinks = ({
    github,
    linkedin,
    twitter,
    email,
    order = ['github', 'linkedin', 'twitter', 'email'],
    onLinkClick,
    showNoSocialText = false,
}) => {
    const values = { github, linkedin, twitter, email };
    const links = order
        .filter((type) => values[type])
        .map((type, index) => ({ type, value: values[type], index }));

    if (links.length === 0) {
        return showNoSocialText ? (
            <span className='no-social-data'>No social links</span>
        ) : null;
    }

    return (
        <>
            {links.map(({ type, value, index }) => {
                const config = linkConfig[type];

                return (
                    <motion.a
                        key={type}
                        href={config.href(value)}
                        target='_blank'
                        rel='noreferrer'
                        onClick={onLinkClick}
                        variants={socialLinkVariants}
                        custom={index}
                        whileHover='hover'
                        whileTap={{ scale: 0.9 }}
                        className='social-link'
                    >
                        {config.icon}
                        <span className='social-tooltip'>{config.label}</span>
                    </motion.a>
                );
            })}
        </>
    );
};

export default SocialLinks;
