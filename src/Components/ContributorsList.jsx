import React from 'react';
import ContributorCard from './ContributorCard';
import './contributors.css';

const ContributorsList = ({ contributors }) => {
  return (
    <div className="contributors-container">
      <div className="contributors-grid">
        {contributors.map((contributor) => (
          <ContributorCard
            key={contributor.id}
            contributor={contributor}
          />
        ))}
      </div>
    </div>
  );
};

export default ContributorsList;