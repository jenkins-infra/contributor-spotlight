import { Link, useLoaderData, useParams } from 'react-router-dom';
import { Head } from 'vite-react-ssg';
import { ArrowLeft, Github, Linkedin, Mail } from 'lucide-react';

import XIcon from '../../components/XIcons';
import './contributor-details.css';

export default function ContributorPage() {
    const { html, title, pageAttributes } = useLoaderData();
    const { slug } = useParams();

    const siteUrl = 'https://contributors.jenkins.io';
    const tagLine = pageAttributes.intro;
    const ogImage = pageAttributes.image?.startsWith('http')
        ? pageAttributes.image
        : `${siteUrl}${pageAttributes.image}`;
    const ogUrl = `${siteUrl}/contributors/${slug}`;

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name='description' content={tagLine ?? ''} />
                <meta property='og:title' content={title} />
                <meta property='og:description' content={tagLine ?? ''} />
                <meta property='og:image' content={ogImage} />
                <meta property='og:url' content={ogUrl} />
            </Head>

            <div className='contributor-page'>
                <aside className='contributor-sidebar'>
                    <Link to='/' className='back-link'>
                        <ArrowLeft size={16} />
                        <span>Back to Spotlight</span>
                    </Link>

                    <img
                        src={pageAttributes.image}
                        alt={pageAttributes.name}
                        className='contributor-avatar'
                    />

                    <h1>{pageAttributes.name}</h1>

                    {pageAttributes.pronouns && (
                        <p className='pronouns'>{pageAttributes.pronouns}</p>
                    )}

                    {pageAttributes.location && (
                        <p className='location'>{pageAttributes.location}</p>
                    )}

                    <div className='meta'>
                        {pageAttributes.firstcommit && (
                            <p>
                                <strong>First Commit:</strong>{' '}
                                {pageAttributes.firstcommit}
                            </p>
                        )}

                        {pageAttributes.datepublished && (
                            <p>
                                <strong>Date Published:</strong>{' '}
                                {pageAttributes.datepublished}
                            </p>
                        )}
                    </div>

                    {(pageAttributes.github ||
                        pageAttributes.linkedin ||
                        pageAttributes.twitter ||
                        pageAttributes.email) && (
                        <div className='contributor-socials'>
                            {pageAttributes.github && (
                                <a
                                    href={`https://github.com/${pageAttributes.github}`}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='social-link'
                                    aria-label='GitHub'
                                >
                                    <Github size={18} />
                                </a>
                            )}

                            {pageAttributes.linkedin && (
                                <a
                                    href={`https://linkedin.com/in/${pageAttributes.linkedin}`}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='social-link'
                                    aria-label='LinkedIn'
                                >
                                    <Linkedin size={18} />
                                </a>
                            )}

                            {pageAttributes.twitter && (
                                <a
                                    href={`https://x.com/${pageAttributes.twitter}`}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='social-link'
                                    aria-label='X'
                                >
                                    <XIcon size={18} />
                                </a>
                            )}

                            {pageAttributes.email && (
                                <a
                                    href={`mailto:${pageAttributes.email}`}
                                    className='social-link'
                                    aria-label='Email'
                                >
                                    <Mail size={18} />
                                </a>
                            )}
                        </div>
                    )}
                </aside>

                <main className='contributor-content'>
                    <div className='adoc-wrapper'>
                        <article
                            className='adoc-content'
                            dangerouslySetInnerHTML={{ __html: html }}
                        />
                    </div>
                </main>
            </div>
        </>
    );
}
