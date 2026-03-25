import React from 'react';
import ContributorCard from './ContributorCard';
import './contributors.css';

const ContributorsList = ({ contributors, darkmode }) => {
    return (
        <div
            className={`contributors-container ${darkmode ? 'dark' : 'light'}`}
        >
            <div className='contributors-grid'>
                {contributors.map((contributor) =>
                    contributor?.node?.pageAttributes?.featured ===
                    'true' ? null : (
                        <ContributorCard
                            key={contributor.node.id}
                            contributor={contributor}
                        />
                    )
                )}
            </div>
        </div>
    );
};

export default ContributorsList;
