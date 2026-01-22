import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'gatsby';
import {
    Calendar,
    Github,
    Linkedin,
    Twitter,
    ExternalLink,
    CircleUser,
} from 'lucide-react';

const ContributorCard = ({ contributor }) => {
    const { pageAttributes } = contributor.node;
    const { slug } = contributor.node.fields;

    const {
        name,
        image,
        location,
        datepublished,
        github,
        linkedin,
        twitter,
        pronouns,
    } = pageAttributes;

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

    const dateVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { delay: 0.2 },
        },
    };

    return (
        <Link
            to={slug}
            style={{
                textDecoration: 'none',
                color: 'inherit',
                display: 'block',
            }}
        >
            <div className='contributor-card'>
                <div className='contributor-image-wrapper'>
                    <motion.img
                        src={image}
                        alt={name}
                        loading='lazy'
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                            delay: 0.1,
                            type: 'spring',
                            stiffness: 100,
                        }}
                    />
                </div>

                <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                >
                    {name}
                </motion.h3>

                <motion.p
                    className='contributor-location'
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    {location}
                </motion.p>

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '20px',
                    }}
                >
                    {datepublished && (
                        <motion.div
                            className='contributor-meta'
                            variants={dateVariants}
                            initial='hidden'
                            animate='visible'
                        >
                            <Calendar size={14} />
                            <span>{datepublished}</span>
                        </motion.div>
                    )}
                    {pronouns && (
                        <motion.div
                            className='contributor-meta'
                            variants={dateVariants}
                            initial='hidden'
                            animate='visible'
                        >
                            <CircleUser size={14} />
                            <span>{pronouns}</span>
                        </motion.div>
                    )}
                </div>

                <motion.div
                    className='contributor-links'
                    initial='hidden'
                    animate='visible'
                >
                    {github || linkedin || twitter ? (
                        <>
                            {github && (
                                <motion.a
                                    href={`https://github.com/${github}`}
                                    target='_blank'
                                    rel='noreferrer'
                                    onClick={(e) => e.stopPropagation()}
                                    variants={socialLinkVariants}
                                    custom={0}
                                    whileHover='hover'
                                    whileTap={{ scale: 0.9 }}
                                    className='social-link'
                                >
                                    <Github size={18} />
                                    <span className='social-tooltip'>
                                        GitHub
                                    </span>
                                </motion.a>
                            )}

                            {linkedin && (
                                <motion.a
                                    href={`https://linkedin.com/in/${linkedin}`}
                                    target='_blank'
                                    rel='noreferrer'
                                    onClick={(e) => e.stopPropagation()}
                                    variants={socialLinkVariants}
                                    custom={1}
                                    whileHover='hover'
                                    whileTap={{ scale: 0.9 }}
                                    className='social-link'
                                >
                                    <Linkedin size={18} />
                                    <span className='social-tooltip'>
                                        LinkedIn
                                    </span>
                                </motion.a>
                            )}

                            {twitter && (
                                <motion.a
                                    href={`https://twitter.com/${twitter}`}
                                    target='_blank'
                                    rel='noreferrer'
                                    onClick={(e) => e.stopPropagation()}
                                    variants={socialLinkVariants}
                                    custom={2}
                                    whileHover='hover'
                                    whileTap={{ scale: 0.9 }}
                                    className='social-link'
                                >
                                    <Twitter size={18} />
                                    <span className='social-tooltip'>
                                        Twitter
                                    </span>
                                </motion.a>
                            )}
                        </>
                    ) : (
                        <span className='no-social-data'>No social links</span>
                    )}
                </motion.div>
            </div>
        </Link>
    );
};

export default ContributorCard;
