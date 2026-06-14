import React, { useState } from 'react';
import ContributorCard from './ContributorCard';
import './contributors.css';
import useMediaQuery from '@mui/material/useMediaQuery';

const ContributorsList = ({ contributors, darkmode }) => {
    const isMobile = useMediaQuery('(max-width:600px)');
    const [showAll, setShowAll] = useState(false);

    const visibleContributors =
        isMobile && !showAll ? contributors.slice(0, 15) : contributors;

    return (
        <div
            className={`contributors-container ${darkmode ? 'dark' : 'light'}`}
        >
            <div className='contributors-grid'>
                {visibleContributors.map((contributor) =>
                    contributor?.node?.pageAttributes?.featured ===
                    'true' ? null : (
                        <ContributorCard
                            key={contributor.node.id}
                            contributor={contributor}
                        />
                    )
                )}
            </div>

            {isMobile && !showAll && contributors.length > 15 && (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '20px',
                    }}
                >
                    <span
                        className='contributor-meta'
                        onClick={() => setShowAll(true)}
                    >
                        See more
                    </span>
                </div>
            )}
        </div>
    );
};

export default ContributorsList;
