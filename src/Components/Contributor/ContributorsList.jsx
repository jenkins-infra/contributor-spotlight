import React, { useRef, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ContributorCard from './ContributorCard';
import './contributors.css';

const ContributorsList = ({ contributors, darkmode }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [showAll, setShowAll] = useState(false);
    const initialMobileCount = 15;
    const seeMore = useRef(null);

    const nonFeaturedContributors = contributors.filter(
        (contributor) => contributor?.node?.pageAttributes?.featured !== 'true'
    );

    const visibleContributors =
        isMobile && !showAll
            ? nonFeaturedContributors.slice(0, initialMobileCount)
            : nonFeaturedContributors;

    const handleSeeLess = () => {
        setShowAll(false);
        setTimeout(() => {
            seeMore.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
            });
        });
    };

    return (
        <div
            className={`contributors-container ${darkmode ? 'dark' : 'light'}`}
        >
            <div className='contributors-grid' ref={seeMore}>
                {visibleContributors.map((contributor) => (
                    <ContributorCard
                        key={contributor.node.id}
                        contributor={contributor}
                    />
                ))}
            </div>

            {isMobile &&
                !showAll &&
                nonFeaturedContributors.length > initialMobileCount && (
                    <div className='see-more-wrapper'>
                        <button
                            type='button'
                            className='see-more-button'
                            onClick={() => setShowAll(true)}
                        >
                            See more
                        </button>
                    </div>
                )}

            {isMobile &&
                showAll &&
                nonFeaturedContributors.length > initialMobileCount && (
                    <div className='see-more-wrapper'>
                        <button
                            type='button'
                            className='see-more-button'
                            onClick={handleSeeLess}
                        >
                            See less
                        </button>
                    </div>
                )}
        </div>
    );
};

export default ContributorsList;
