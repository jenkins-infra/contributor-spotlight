import React from 'react';
import './search-result.css';
import { Link } from 'gatsby';
import { Github, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';
import XIcon from '../XIcon.jsx';

function SearchResults({ results, darkmode }) {
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
    const sortedResults = [...results].sort((a, b) => a.score - b.score);
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
            {sortedResults.map(({ item, score }) => {
                if (!item) return null;
                return (
                    <div className='result-card' role="region" aria-label={`Contributor card for ${item?.name}`}> 
                        <Link
                            to={item?.slug}
                            key={item?.id}
                            role="button"
                            tabIndex={0}
                            aria-label={`View details for contributor ${item?.name}`}
                            onKeyDown={e => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    e.target.click();
                                }
                            }}
                        >
                            <img
                                src={item?.image}
                                alt={item?.name ? `${item?.name}'s profile photo` : 'Contributor profile photo'}
                                className='result-avatar'
                                aria-label={item?.name ? `${item?.name}'s profile photo` : 'Contributor profile photo'}
                            />
                            <div className='result-header'>
                                <h3 className='result-name'>
                                    {item?.name}
                                </h3>
                            </div>
                        </Link>
                        <div className='result-content'>
                            <p className='result-location'>
                                {item?.location}
                            </p>
                            <div className='result-links'>
                                {item?.github && (
                                    <motion.a
                                        href={`https://github.com/${item.github}`}
                                        target='_blank'
                                        rel='noreferrer'
                                        variants={socialLinkVariants}
                                        custom={0}
                                        whileHover='hover'
                                        whileTap={{ scale: 0.9 }}
                                        className='social-link'
                                        aria-label={`Open GitHub profile for ${item?.name}`}
                                    >
                                        <Github size={18} />
                                        <span className='social-tooltip'>
                                            GitHub
                                        </span>
                                    </motion.a>
                                )}
                                {item?.linkedin && (
                                    <motion.a
                                        href={`https://linkedin.com/in/${item?.linkedin}`}
                                        target='_blank'
                                        rel='noreferrer'
                                        variants={socialLinkVariants}
                                        custom={1}
                                        whileHover='hover'
                                        whileTap={{ scale: 0.9 }}
                                        className='social-link'
                                        aria-label={`Open LinkedIn profile for ${item?.name}`}
                                    >
                                        <Linkedin size={18} />
                                        <span className='social-tooltip'>
                                            LinkedIn
                                        </span>
                                    </motion.a>
                                )}
                                {item?.twitter && (
                                    <motion.a
                                        href={`https://twitter.com/${item.twitter}`}
                                        target='_blank'
                                        rel='noreferrer'
                                        variants={socialLinkVariants}
                                        custom={2}
                                        whileHover='hover'
                                        whileTap={{ scale: 0.9 }}
                                        className='social-link'
                                        aria-label={`Open X (formerly Twitter) profile for ${item?.name}`}
                                    >
                                        <XIcon size={18} />
                                        <span className='social-tooltip'>
                                            X (formerly Twitter)
                                        </span>
                                    </motion.a>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default SearchResults;
