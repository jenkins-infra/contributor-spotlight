import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Search as SearchIcon } from 'lucide-react';
import './Search.css';
import lunr from 'lunr';
import SearchResults from './Search-results.jsx';
function Search({ contributors, darkmode }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [selectedTags, setSelectedTags] = useState(['name', 'location']);
    const TAGS = ['github', 'linkedin', 'firstcommit'];
    const [results, setResults] = useState([]);
    const contributorsArray = Object.values(contributors).map((c) => ({
        id: c?.node?.id,
        name: c?.node?.document?.title || c?.document?.title || '',
        location: c?.node?.pageAttributes?.location || '',
        github: c?.node?.pageAttributes?.github || '',
        linkedin: c?.node?.pageAttributes?.linkedin || '',
        firstcommit: c?.node?.pageAttributes?.firstcommit || '',
        slug: c?.node?.fields?.slug || '/',
        image: c?.node?.pageAttributes?.image || '',
    }));
    // console.log(contributorsArray);

    const idx = useMemo(() => {
        return lunr(function () {
            this.ref('id');
            this.field('name', { boost: 10 });
            this.field('location', { boost: 5 });
            this.field('github', { boost: 3 });
            this.field('linkedin', { boost: 2 });
            this.field('firstcommit', { boost: 1 });
            contributorsArray.forEach((doc) => this.add(doc));
        });
    }, [contributorsArray]);

    const contributor_id = useMemo(() => {
        const map = {};
        contributorsArray.forEach((contributor) => {
            map[contributor.id] = contributor;
        });
        return map;
    }, [contributorsArray]);
    function buildQuery(query, selectedTags) {
        const fields =
            selectedTags.length > 0 ? selectedTags : ['name', 'location'];
        // console.log(fields);
        return fields.map((f) => `${f}:${query}`).join(' ');
    }
    const toggletag = (tag) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };
    useEffect(() => {
        if (!searchQuery.trim()) return;
        const query = buildQuery(searchQuery, selectedTags);
        const results = idx.search(query);
        setResults(results);
    }, [searchQuery, selectedTags]);
    return (
        <div className={`search ${darkmode ? 'dark' : 'light'}`}>
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
                    <div className='tags-container'>
                        {TAGS.map((tag) => (
                            <button
                                key={tag}
                                className={`tag ${selectedTags.includes(tag) ? 'active' : ''}`}
                                onClick={() => toggletag(tag)}
                                type='button'
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
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
                            placeholder='Search contributors (name & location by default)'
                            className='search-input'
                        />
                    </div>
                    {searchQuery && (
                        <SearchResults
                            results={results}
                            contributor_id={contributor_id}
                            darkmode={darkmode}
                        />
                    )}
                </motion.div>
            </motion.div>
        </div>
    );
}

export default Search;
