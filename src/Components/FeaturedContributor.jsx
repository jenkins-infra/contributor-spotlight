import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Code, Zap } from 'lucide-react';
import './featured-contributor.css';
import { Link } from 'gatsby';

const FeaturedContributor = ({ contributor }) => {
    if (!contributor) return null;

    const pageAttributes = contributor?.node?.pageAttributes;
    const { name, image, location, datepublished, intro } =
        pageAttributes || {};
    const { slug } = contributor.node.fields;
    console.log(contributor);
    return (
        <motion.div
            className='featured-contributor-section'
            style={{ color: 'white' }}
        >
            <Link
                to={slug}
                className='featured-contributor-card'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ cursor: 'pointer' }}
            >
                <motion.div
                    className='featured-image'
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                >
                    <img src={image} alt={name} />
                </motion.div>

                <div className='featured-content'>
                    <motion.h2
                        className='featured-name'
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        {name}
                    </motion.h2>

                    <motion.div
                        className='featured-role'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <MapPin size={16} />
                        {location}
                        <span>
                            <Zap size={12} style={{ marginRight: '4px' }} />
                            {datepublished}
                        </span>
                    </motion.div>

                    <motion.div
                        className='featured-highlight'
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        whileHover={{
                            x: 5,
                            transition: { type: 'spring', stiffness: 300 },
                        }}
                    >
                        <p
                            className='featured-intro'
                            style={{ color: 'white' }}
                        >
                            <strong>{name}</strong> {intro}
                        </p>
                    </motion.div>
                </div>
            </Link>
        </motion.div>
    );
};

export default FeaturedContributor;
