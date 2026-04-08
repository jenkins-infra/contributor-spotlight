import React from 'react';
import './search-result.css';
import { Link } from 'gatsby';
import SocialLinks from '../SocialLinks.jsx';

function SearchResults({ results, darkmode }) {
    if (!results || results.length === 0) {
        return (
            <div
                className={`no-results no-results-card ${darkmode ? 'dark' : 'light'}`}
            >
                🔍 No contributors found
            </div>
        );
    }
    const sortedResults = [...results].sort((a, b) => a.score - b.score);
    return (
        <div className='results-container'>
            {sortedResults.map(({ item, score }) => {
                if (!item) return null;
                return (
                    <Link to={item?.slug} key={item?.id}>
                        <div className='result-card'>
                            <img
                                src={item?.image}
                                alt={item?.name}
                                className='result-avatar'
                            />
                            <div className='result-content'>
                                <div className='result-header'>
                                    <h3 className='result-name'>
                                        {item?.name}
                                    </h3>
                                </div>

                                <p className='result-location'>
                                    {item?.location}
                                </p>

                                <div className='result-links'>
                                    <SocialLinks
                                        github={item?.github}
                                        linkedin={item?.linkedin}
                                        twitter={item?.twitter}
                                        onLinkClick={(e) => e.stopPropagation()}
                                    />
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
