import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, X } from 'lucide-react';
import './Search.css';

function Search() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    return (
        <motion.div
            className='search-container-wrapper'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <motion.div
                className='search-wrapper'
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
                <div
                    className={`search-input-container ${isFocused ? 'focused' : ''}`}
                >
                    <SearchIcon size={20} className='search-icon' />

                    <input
                        type='text'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder='Search contributors'
                        className='search-input'
                    />

                    <AnimatePresence>
                        {searchQuery && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setSearchQuery('')}
                                className='clear-button'
                            >
                                <X size={16} />
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </motion.div>
    );
    
}

export default Search;
