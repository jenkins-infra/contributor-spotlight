import { useNavigate } from 'react-router-dom';
import { Github, Linkedin } from 'lucide-react';
import XIcon from '../XIcons';
import './ContributorCard.css';

function buildSocialHref(platform, value) {
    if (!value) return null;
    if (/^https?:\/\//i.test(value)) return value;

    switch (platform) {
        case 'linkedin':
            return `https://linkedin.com/in/${value}`;
        case 'twitter':
            return `https://x.com/${value}`;
        case 'github':
            return `https://github.com/${value}`;
        default:
            return value;
    }
}

function ContributorCard({ contributor }) {
    const navigate = useNavigate();
    const { slug, title, pageAttributes = {} } = contributor;
    const { image, name, pronouns, location, linkedin, twitter, github } =
        pageAttributes;

    const contributorName = name || title || 'Contributor';

    const linkedinHref = buildSocialHref('linkedin', linkedin);
    const twitterHref = buildSocialHref('twitter', twitter);
    const githubHref = buildSocialHref('github', github);

    const goToContributor = () => {
        if (slug) navigate(`/contributors/${slug}`);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            goToContributor();
        }
    };

    const stopBubble = (e) => e.stopPropagation();

    return (
        <article
            className='contributor-card'
            role='link'
            tabIndex={0}
            onClick={goToContributor}
            onKeyDown={handleKeyDown}
        >
            <div className='contributor-card-content'>
                {image && (
                    <img
                        className='contributor-card-avatar'
                        src={image}
                        alt={contributorName}
                        loading='lazy'
                    />
                )}

                <h3 className='contributor-card-name'>{contributorName}</h3>

                {pronouns && (
                    <p className='contributor-card-pronouns'>{pronouns}</p>
                )}

                {location && (
                    <p className='contributor-card-location'>{location}</p>
                )}

                <div className='contributor-card-socials'>
                    {githubHref && (
                        <a
                            href={githubHref}
                            className='contributor-card-social'
                            target='_blank'
                            rel='noopener noreferrer'
                            aria-label={`${contributorName} on GitHub`}
                            onClick={stopBubble}
                        >
                            <Github size={18} />
                        </a>
                    )}

                    {linkedinHref && (
                        <a
                            href={linkedinHref}
                            className='contributor-card-social'
                            target='_blank'
                            rel='noopener noreferrer'
                            aria-label={`${contributorName} on LinkedIn`}
                            onClick={stopBubble}
                        >
                            <Linkedin size={18} />
                        </a>
                    )}

                    {twitterHref && (
                        <a
                            href={twitterHref}
                            className='contributor-card-social'
                            target='_blank'
                            rel='noopener noreferrer'
                            aria-label={`${contributorName} on X`}
                            onClick={stopBubble}
                        >
                            <XIcon size={18} />
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
}

export default ContributorCard;
