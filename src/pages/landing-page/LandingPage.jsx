import { slugs, loadContributor } from '../../utils/contributorLoad';
import ContributorCard from '../../components/contributor-card/ContributorCard';
import HeroSection from '../../components/hero-section/HeroSection';
import SpotLight from '../../components/spotlight/ContributorSpotlight';
import './LandingPage.css';

const SPOTLIGHT_SLUG = 'allan-burdajewicz';

function LandingPage() {
    const contributors = slugs.map((slug) => ({
        slug,
        ...loadContributor(slug),
    }));

    const featuredContributor = contributors.find(
        (contributor) => contributor.slug === SPOTLIGHT_SLUG
    );

    return (
        <main className='landing-page'>
            <HeroSection />

            {featuredContributor && (
                <SpotLight contributor={featuredContributor} />
            )}

            <section className='contributors-section'>
                <div className='contributors-grid'>
                    {contributors.map((contributor) => (
                        <ContributorCard
                            key={contributor.slug}
                            contributor={contributor}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
}

export default LandingPage;
