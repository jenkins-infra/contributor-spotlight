import React from 'react';
import './search-result.css';
import { Link } from 'gatsby';
import SocialLinks from '../SocialLinks.jsx';

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
