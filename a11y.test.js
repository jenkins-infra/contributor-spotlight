// Accessibility test script using axe-core and jest
// Run with: npx jest a11y.test.js
/* global describe, it, expect */

const { configureAxe } = require('jest-axe');

const React = require('react');
const { render } = require('@testing-library/react');
const ContributorCard =
    require('./src/Components/Contributor/ContributorCard.jsx').default;
const FeaturedContributor =
    require('./src/Components/Featured-contributor/FeaturedContributor.jsx').default;
const SearchResults =
    require('./src/Components/Search/SearchResults.jsx').default;

const axe = configureAxe({
    rules: {
        // You can customize rules here
    },
});

describe('Accessibility checks', () => {
    it('ContributorCard should have no a11y violations', async () => {
        const { container } = render(
            React.createElement(ContributorCard, {
                contributor: {
                    node: {
                        pageAttributes: {
                            name: 'Jane Doe',
                            image: '/avatar/jane.jpg',
                            location: 'Earth',
                            datepublished: '2024-01-01',
                            github: 'janedoe',
                            linkedin: 'janedoe',
                            twitter: 'janedoe',
                            pronouns: 'she/her',
                        },
                        fields: { slug: '/contributors/jane-doe/' },
                    },
                },
            })
        );
        const results = await axe(container);
        if (results.violations.length > 0) {
            // eslint-disable-next-line no-console
            console.log('ContributorCard violations:', results.violations);
        }
        expect(results.violations.length).toBe(0);
    });

    it('FeaturedContributor should have no a11y violations', async () => {
        const { container } = render(
            React.createElement(FeaturedContributor, {
                contributor: {
                    node: {
                        pageAttributes: {
                            name: 'John Smith',
                            image: '/avatar/john.jpg',
                            location: 'Mars',
                            datepublished: '2025-01-01',
                            intro: 'A great contributor!',
                            firstcommit: '2022-01-01',
                        },
                        fields: { slug: '/contributors/john-smith/' },
                    },
                },
                darkmode: false,
            })
        );
        const results = await axe(container);
        if (results.violations.length > 0) {
            // eslint-disable-next-line no-console
            console.log('FeaturedContributor violations:', results.violations);
        }
        expect(results.violations.length).toBe(0);
    });

    it('SearchResults should have no a11y violations', async () => {
        const { container } = render(
            React.createElement(SearchResults, {
                results: [
                    {
                        item: {
                            id: '1',
                            name: 'Jane Doe',
                            image: '/avatar/jane.jpg',
                            location: 'Earth',
                            github: 'janedoe',
                            linkedin: 'janedoe',
                            twitter: 'janedoe',
                            slug: '/contributors/jane-doe/',
                        },
                        score: 0,
                    },
                ],
                darkmode: false,
            })
        );
        const results = await axe(container);
        if (results.violations.length > 0) {
            // eslint-disable-next-line no-console
            console.log('SearchResults violations:', results.violations);
        }
        expect(results.violations.length).toBe(0);
    });
});
