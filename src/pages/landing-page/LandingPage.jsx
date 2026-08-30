import { useMemo, useState } from 'react';
import Fuse from 'fuse.js';

import { slugs, loadContributor } from '../../utils/contributorLoad';
import ContributorCard from '../../components/contributor-card/ContributorCard';
import HeroSection from '../../components/hero-section/HeroSection';
import SpotLight from '../../components/spotlight/ContributorSpotlight';
import './LandingPage.css';

const SPOTLIGHT_SLUG = 'allan-burdajewicz';

function LandingPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const contributors = useMemo(
        () =>
            slugs.map((slug) => ({
                slug,
                ...loadContributor(slug),
            })),
        []
    );

    const featuredContributor = contributors.find(
        (contributor) => contributor.slug === SPOTLIGHT_SLUG
    );

    const fuse = useMemo(
        () =>
            new Fuse(contributors, {
                keys: [
                    'title',
                    'pageAttributes.github',
                    'pageAttributes.location',
                    'pageAttributes.organization',
                ],
                threshold: 0.3,
                ignoreLocation: true,
            }),
        [contributors]
    );

    const trimmedQuery = searchQuery.trim();
    const filteredContributors = trimmedQuery
        ? fuse.search(trimmedQuery).map((result) => result.item)
        : contributors;

    return (
        <main className='landing-page'>
            <HeroSection />

            {featuredContributor && (
                <SpotLight contributor={featuredContributor} />
            )}

            <section className='contributors-section'>
                <h2 className='contributors-heading'>
                    Meet our contributors
                </h2>
                <div className='contributors-search'>
                    <input
                        type='search'
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        placeholder='Search contributors...'
                        aria-label='Search contributors'
                    />
                </div>

                {filteredContributors.length > 0 ? (
                    <div className='contributors-grid'>
                        {filteredContributors.map((contributor) => (
                            <ContributorCard
                                key={contributor.slug}
                                contributor={contributor}
                            />
                        ))}
                    </div>
                ) : (
                    <p className='contributors-no-results'>
                        No contributors found for "{searchQuery}".
                    </p>
                )}
            </section>
        </main>
    );
}

export default LandingPage;
