import React from 'react';
import './Search-result.css';
import { Link } from 'gatsby';
import { Github, Linkedin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function SearchResults({ results, contributor_id, darkmode }) {
    // console.log(results);
    // console.log(contributor_id);
    if (!results || results.length === 0) {
        return (
            <div
                className='no-results'
                style={{
                    padding: '24px',
                    background: darkmode ? '#2c2c2c' : '#f0f0f0',
                    borderRadius: '12px',
                    border: '1px solid #333',
                    color: darkmode ? '#ccc' : '#333',
                    fontSize: '15px',
                    textAlign: 'center',
                    margin: '16px 0',
                }}
            >
                🔍 No contributors found
            </div>
        );
    }
    const sortedResults = [...results].sort((a, b) => b.score - a.score);
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
    return (
        <div className='results-container'>
            {sortedResults.map(({ ref, score }) => {
                const contributor = contributor_id[ref];
                if (!contributor) return null;
                return (
                    <Link to={contributor.slug} key={ref}>
                        <div className='result-card'>
                            <img
                                src={contributor.image}
                                alt={contributor.name}
                                className='result-avatar'
                            />
                            <div className='result-content'>
                                <div className='result-header'>
                                    <h3 className='result-name'>
                                        {contributor.name}
                                    </h3>
                                </div>

                                <p className='result-location'>
                                    {contributor.location}
                                </p>

                                <div className='result-links'>
                                    {contributor.github && (
                                        <motion.a
                                            href={`https://github.com/${contributor.github}`}
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
                                    {contributor.linkedin && (
                                        <motion.a
                                            href={`https://linkedin.com/in/${contributor_id.linkedin}`}
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
                                </div>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}

export default SearchResults;
