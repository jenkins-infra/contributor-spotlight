import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'gatsby';
import { Calendar, CircleUser, GitCommitVertical } from 'lucide-react';
import SocialLinks from '../SocialLinks.jsx';

const ContributorCard = ({ contributor }) => {
    const pageAttributes = contributor?.node?.pageAttributes ?? {};
    const slug = contributor?.node?.fields?.slug;

    const {
        name,
        image,
        location,
        datepublished,
        firstcommit,
        github,
        linkedin,
        twitter,
        pronouns,
    } = pageAttributes;
    const badgeVariants = {
        hidden: { opacity: 0, scale: 0.6, y: -10 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                delay: 0.05,
                type: 'spring',
                stiffness: 260,
                damping: 18,
            },
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
        <Link to={slug} className='contributor-card-link'>
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
                {firstcommit && (
                    <motion.div
                        className='contributor-est-badge'
                        variants={badgeVariants}
                        initial='hidden'
                        animate='visible'
                    >
                        <GitCommitVertical
                            size={12}
                            fill='currentColor'
                            style={{ flexShrink: 0 }}
                        />
                        1st Commit in {firstcommit}
                    </motion.div>
                )}

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

                <div className='contributor-meta-row'>
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
                    <SocialLinks
                        github={github}
                        linkedin={linkedin}
                        twitter={twitter}
                        onLinkClick={(e) => e.stopPropagation()}
                        showNoSocialText
                    />
                </motion.div>
            </div>
        </Link>
    );
};

export default ContributorCard;
