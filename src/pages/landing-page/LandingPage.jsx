import { slugs, loadContributor } from '../../utils/contributorLoad';
import ContributorCard from '../../components/contributor-card/ContributorCard';
import HeroSection from '../../components/hero-section/HeroSection';
import './LandingPage.css';

function LandingPage() {
    const contributors = slugs.map((slug) => ({
        slug,
        ...loadContributor(slug),
    }));

    return (
        <main className='landing-page'>
            <HeroSection />
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
