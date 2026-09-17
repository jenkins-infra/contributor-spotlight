import { Link } from 'react-router-dom';
import './ContributorSpotlight.css';

export default function ContributorSpotlight({ contributor }) {
    if (!contributor) return null;

    const { slug, pageAttributes } = contributor;
    const { name, location, firstcommit, image, intro } = pageAttributes;

    const introParagraphs = (intro || '')
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean);

    return (
        <section className="spotlight">
            <h2 className="spotlight__title">Contributor Spotlight</h2>

            <Link to={`/contributors/${slug}`} className="spotlight__card">
                <img
                    className="spotlight__avatar"
                    src={image}
                    alt={name}
                    loading="lazy"
                />

                <div className="spotlight__header">
                    <div className="spotlight__identity">
                        <h3 className="spotlight__name">{name}</h3>
                        {location && (
                            <p className="spotlight__location">{location}</p>
                        )}
                    </div>

                    {firstcommit && (
                        <p className="spotlight__first-commit">
                            <span className="spotlight__first-commit-label">
                                First Commit:
                            </span>{' '}
                            {firstcommit}
                        </p>
                    )}
                </div>

                <div className="spotlight__intro">
                    {introParagraphs.map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                    ))}
                </div>
            </Link>
        </section>
    );
}
