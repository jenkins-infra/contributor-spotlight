import { useNavigate } from 'react-router-dom';
import XIcon from '../XIcons.jsx';
import './ContributorCard.css';

const LinkedInIcon = ({ size = 18 }) => (
    <svg
        width={size}
        height={size}
        viewBox='0 0 24 24'
        fill='currentColor'
        aria-hidden='true'
    >
        <path d='M6.5 8.5H3V21h3.5V8.5ZM4.75 3A2.05 2.05 0 1 0 4.75 7.1 2.05 2.05 0 0 0 4.75 3ZM21 13.85c0-3.76-2-5.52-4.67-5.52-2.15 0-3.1 1.18-3.64 2.01V8.5H9.2V21h3.49v-6.19c0-1.63.31-3.21 2.33-3.21 1.99 0 2.01 1.86 2.01 3.32V21H21v-7.15Z' />
    </svg>
);

const GitHubIcon = ({ size = 18 }) => (
    <svg
        width={size}
        height={size}
        viewBox='0 0 24 24'
        fill='currentColor'
        aria-hidden='true'
    >
        <path d='M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.38 7.85 10.9.57.1.78-.25.78-.55v-2.1c-3.19.69-3.86-1.54-3.86-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.34.96.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.77.11 3.06.73.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.07.78 2.16v3.2c0 .31.21.66.79.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z' />
    </svg>
);

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
                    {linkedinHref && (
                        <a
                            href={linkedinHref}
                            className='contributor-card-social'
                            target='_blank'
                            rel='noopener noreferrer'
                            aria-label={`${contributorName} on LinkedIn`}
                            onClick={stopBubble}
                        >
                            <LinkedInIcon />
                        </a>
                    )}

                    {twitterHref && (
                        <a
                            href={twitterHref}
                            className='contributor-card-social'
                            target='_blank'
                            rel='noopener noreferrer'
                            aria-label={`${contributorName} on Twitter`}
                            onClick={stopBubble}
                        >
                            <XIcon size={17} />
                        </a>
                    )}

                    {githubHref && (
                        <a
                            href={githubHref}
                            className='contributor-card-social'
                            target='_blank'
                            rel='noopener noreferrer'
                            aria-label={`${contributorName} on GitHub`}
                            onClick={stopBubble}
                        >
                            <GitHubIcon />
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
}

export default ContributorCard;
