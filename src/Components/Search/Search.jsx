import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { motion } from 'framer-motion';
import {
    Search as SearchIcon,
    MapPin,
    Calendar,
    GitCommitVertical,
    RotateCcw,
} from 'lucide-react';
import './search.css';
import Fuse from 'fuse.js';
import SearchResults from './SearchResults.jsx';

function Search({ contributors, darkmode, onFilteredResults }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [results, setResults] = useState([]);
    const [filters, setFilters] = useState({
        country: '',
        datePublished: '',
        firstCommitYear: '',
    });
    const searchInputRef = useRef(null);
    const platform = navigator.platform.toUpperCase();
    const isMobile =
        platform === 'IPHONE' ||
        platform === 'IPAD' ||
        /Android/i.test(navigator.userAgent);
    const useCmdKey =
        platform.indexOf('MAC') >= 0 ||
        platform === 'IPHONE' ||
        platform === 'IPAD';

    const shortcutHint = isMobile ? null : useCmdKey ? '⌘ + K' : 'Ctrl + K';

    const contributorsArray = useMemo(() => {
        return Object.values(contributors).map((c) => ({
            id: c?.node?.id,
            name: c?.node?.document?.title || c?.document?.title || '',
            location: c?.node?.pageAttributes?.location || '',
            github: c?.node?.pageAttributes?.github || '',
            linkedin: c?.node?.pageAttributes?.linkedin || '',
            twitter: c?.node?.pageAttributes?.twitter || '',
            firstcommit: c?.node?.pageAttributes?.firstcommit || '',
            datepublished: c?.node?.pageAttributes?.datepublished || '',
            slug: c?.node?.fields?.slug || '/',
            image: c?.node?.pageAttributes?.image || '',
        }));
    }, [contributors]);

    // Derive filter dropdown options from contributor data
    const { countries, publishedYears, firstCommitYears } = useMemo(() => {
        const countrySet = new Set();
        const publishedYearSet = new Set();
        const firstCommitYearSet = new Set();

        contributors.forEach((c) => {
            const location = c?.node?.pageAttributes?.location || '';
            if (location) {
                const parts = location.split(',');
                const country = parts[parts.length - 1].trim();
                if (country) countrySet.add(country);
            }

            const datepublished = c?.node?.pageAttributes?.datepublished || '';
            if (datepublished) {
                const year = datepublished.substring(0, 4);
                if (year) publishedYearSet.add(year);
            }

            const firstcommit = c?.node?.pageAttributes?.firstcommit || '';
            if (firstcommit) {
                firstCommitYearSet.add(firstcommit);
            }
        });

        return {
            countries: [...countrySet].sort(),
            publishedYears: [...publishedYearSet].sort().reverse(),
            firstCommitYears: [...firstCommitYearSet].sort().reverse(),
        };
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

    const applyFilters = useCallback(
        (items) => {
            return items.filter((item) => {
                const record = item.item || item;

                if (filters.country) {
                    const location = record.location || '';
                    const parts = location.split(',');
                    const country = parts[parts.length - 1].trim();
                    if (
                        country.toLowerCase() !== filters.country.toLowerCase()
                    ) {
                        return false;
                    }
                }

                if (filters.datePublished) {
                    const dp = record.datepublished || '';
                    const year = dp.substring(0, 4);
                    if (year !== filters.datePublished) {
                        return false;
                    }
                }

                if (filters.firstCommitYear) {
                    const fc = record.firstcommit || '';
                    if (fc !== filters.firstCommitYear) {
                        return false;
                    }
                }

                return true;
            });
        },
        [filters]
    );

    useEffect(() => {
        const hasActiveFilters =
            filters.country || filters.datePublished || filters.firstCommitYear;

        if (!searchQuery.trim() && !hasActiveFilters) {
            setResults([]);
            if (onFilteredResults) {
                onFilteredResults(null);
            }
            return;
        }

        let searchedResults;
        if (searchQuery.trim()) {
            searchedResults = idx.search(searchQuery);
        } else {
            searchedResults = contributorsArray.map((item) => ({
                item,
                score: 0,
            }));
        }

        const filteredResults = applyFilters(searchedResults);
        setResults(filteredResults);

        if (onFilteredResults) {
            if (hasActiveFilters && !searchQuery.trim()) {
                const filteredContributorIds = filteredResults.map(
                    (r) => (r.item || r).id
                );
                onFilteredResults(filteredContributorIds);
            } else if (searchQuery.trim()) {
                onFilteredResults('search-active');
            } else {
                onFilteredResults(null);
            }
        }
    }, [
        searchQuery,
        idx,
        filters,
        applyFilters,
        contributorsArray,
        onFilteredResults,
    ]);

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

    const handleFilterChange = useCallback((key, value) => {
        if (key === 'reset') {
            setFilters({
                country: '',
                datePublished: '',
                firstCommitYear: '',
            });
        } else {
            setFilters((prev) => ({ ...prev, [key]: value }));
        }
    }, []);

    const hasActiveFilters =
        filters.country || filters.datePublished || filters.firstCommitYear;

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
                        placeholder={
                            shortcutHint
                                ? `[${shortcutHint}] Search contributors...`
                                : 'Search contributors...'
                        }
                        className='search-input'
                    />
                </motion.div>

                {/* Filter Controls */}
                <div className='filter-bar'>
                    <div className='filter-bar-controls'>
                        <div className='filter-group'>
                            <MapPin size={16} className='filter-icon' />
                            <select
                                id='filter-country'
                                value={filters.country}
                                onChange={(e) =>
                                    handleFilterChange(
                                        'country',
                                        e.target.value
                                    )
                                }
                                className='filter-select'
                            >
                                <option value=''>All Countries</option>
                                {countries.map((country) => (
                                    <option key={country} value={country}>
                                        {country}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className='filter-group'>
                            <Calendar size={16} className='filter-icon' />
                            <select
                                id='filter-date-published'
                                value={filters.datePublished}
                                onChange={(e) =>
                                    handleFilterChange(
                                        'datePublished',
                                        e.target.value
                                    )
                                }
                                className='filter-select'
                            >
                                <option value=''>All Published Years</option>
                                {publishedYears.map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className='filter-group'>
                            <GitCommitVertical
                                size={16}
                                className='filter-icon'
                            />
                            <select
                                id='filter-first-commit'
                                value={filters.firstCommitYear}
                                onChange={(e) =>
                                    handleFilterChange(
                                        'firstCommitYear',
                                        e.target.value
                                    )
                                }
                                className='filter-select'
                            >
                                <option value=''>All First Commit Years</option>
                                {firstCommitYears.map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {hasActiveFilters && (
                            <button
                                className='filter-reset-btn'
                                onClick={() => handleFilterChange('reset')}
                                title='Reset all filters'
                            >
                                <RotateCcw size={14} />
                                <span>Reset</span>
                            </button>
                        )}
                    </div>
                </div>

                <div>
                    {(searchQuery || hasActiveFilters) && (
                        <SearchResults results={results} darkmode={darkmode} />
                    )}
                </div>
            </motion.div>
        </div>
    );
}

export default Search;
