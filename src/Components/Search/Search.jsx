import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Search as SearchIcon } from 'lucide-react';
import './search.css';
import Fuse from 'fuse.js';
import SearchResults from './SearchResults.jsx';
function Search({ contributors, darkmode }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [results, setResults] = useState([]);
    const searchInputRef = useRef(null);
    const platform = navigator.platform.toUpperCase();
    const useCmdKey =
        platform.indexOf('MAC') >= 0 ||
        platform === 'IPHONE' ||
        platform === 'IPAD';

    const shortcutHint = useCmdKey ? '⌘ + K' : 'Ctrl + K';
    const contributorsArray = useMemo(() => {
        return Object.values(contributors).map((c) => ({
            id: c?.node?.id,
            name: c?.node?.document?.title || c?.document?.title || '',
            location: c?.node?.pageAttributes?.location || '',
            github: c?.node?.pageAttributes?.github || '',
            linkedin: c?.node?.pageAttributes?.linkedin || '',
            twitter: c?.node?.pageAttributes?.twitter || '',
            firstcommit: c?.node?.pageAttributes?.firstcommit || '',
            slug: c?.node?.fields?.slug || '/',
            image: c?.node?.pageAttributes?.image || '',
        }));
    }, [contributors]);
    const idx = useMemo(() => {
        const keys = ['name', 'location'];
        return new Fuse(contributorsArray, {
            keys,
            threshold: 0,
            includeScore: true,
            ignoreLocation: true,
            useExtendedSearch: true,
        });
    }, [contributorsArray]);

    useEffect(() => {
        if (!searchQuery.trim()) {
            setResults([]);
            return;
        }
        const searched_results = idx.search(searchQuery);
        setResults(searched_results);
    }, [searchQuery, idx]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                searchInputRef.current?.focus();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
    return (
        <div className={`search ${darkmode ? 'dark' : 'light'}`}>
            <motion.div className='search-container-wrapper'>
                <motion.div
                    className={`search-input-container ${isFocused ? 'focused' : ''}`}
                    whileHover={{ scale: 1.02 }}
                    transition={{
                        type: 'tween',
                        duration: 0.15,
                        ease: 'easeOut',
                    }}
                >
                    <SearchIcon size={20} className='search-icon' />
                    <input
                        ref={searchInputRef}
                        type='text'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder={`[${shortcutHint}] Search contributors...`}
                        className='search-input'
                    />
                </motion.div>
                <div>
                    {searchQuery && (
                        <SearchResults results={results} darkmode={darkmode} />
                    )}
                </div>
            </motion.div>
        </div>
    );
}

export default Search;
