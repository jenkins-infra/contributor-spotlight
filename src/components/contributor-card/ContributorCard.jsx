import { Link } from 'react-router-dom';
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
    const { slug, title, pageAttributes = {} } = contributor;
    const { image, name, pronouns, location, linkedin, twitter, github } =
        pageAttributes;

    const contributorName = name || title || 'Contributor';

    const linkedinHref = buildSocialHref('linkedin', linkedin);
    const twitterHref = buildSocialHref('twitter', twitter);
    const githubHref = buildSocialHref('github', github);

    return (
        <article className='contributor-card'>
            <div className='contributor-card-content'>
                {image && (
                    <img
                        className='contributor-card-avatar'
                        src={image}
                        alt={contributorName}
                        loading='lazy'
                    />
                )}

                {/* The link covers the whole card, see ContributorCard.css. */}
                <h3 className='contributor-card-name'>
                    <Link
                        to={`/pages/contributors/${slug}`}
                        className='contributor-card-link'
                    >
                        {contributorName}
                    </Link>
                </h3>

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
