import { useEffect, useState } from 'react';

import {
    formatMonth,
    parseHonoredContributor,
} from '../../utils/honoredContributor';
import './ThankYouNote.css';

const CSV_URL =
    'https://raw.githubusercontent.com/jenkins-infra/jenkins-contribution-stats/main/data/honored_contributor.csv';
const REFRESH_INTERVAL = 60 * 60 * 1000;

function RepositoryList({ repositories }) {
    // Naming more than a few of them makes the sentence unreadable.
    if (repositories.length > 5) {
        return <>{repositories.length} Jenkins repositories</>;
    }

    return (
        <>
            {repositories.map((repository, index) => (
                <span key={repository}>
                    {index === 0
                        ? ''
                        : index === repositories.length - 1
                          ? ' and '
                          : ', '}
                    <a
                        href={`https://github.com/${repository}`}
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        {repository.split('/')[1] ?? repository}
                    </a>
                </span>
            ))}{' '}
            {repositories.length > 1 ? 'repositories' : 'repository'}
        </>
    );
}

function ThankYouNote() {
    const [contributor, setContributor] = useState(null);

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            try {
                const response = await fetch(CSV_URL);

                if (!response.ok) {
                    throw new Error(`Request failed: ${response.status}`);
                }

                const row = parseHonoredContributor(await response.text());

                if (!cancelled) {
                    setContributor(row);
                }
            } catch (error) {
                console.error('Could not load the honored contributor:', error);
            }
        };

        load();
        const interval = setInterval(load, REFRESH_INTERVAL);

        return () => {
            cancelled = true;
            clearInterval(interval);
        };
    }, []);

    if (!contributor) {
        return null;
    }

    const month = formatMonth(contributor.MONTH);
    const repositories = contributor.REPOSITORIES.split(/\s+/).filter(Boolean);
    const pullRequests = Number.parseInt(contributor.NBR_PR, 10);

    if (!month || repositories.length === 0 || !Number.isFinite(pullRequests)) {
        return null;
    }

    const name = contributor.FULL_NAME || contributor.GH_HANDLE;

    return (
        <section className='thank-you' aria-label='Honored contributor'>
            <div className='thank-you__card'>
                <img
                    className='thank-you__avatar'
                    src={contributor.GH_HANDLE_AVATAR}
                    alt=''
                    width='96'
                    height='96'
                    loading='lazy'
                />

                <p className='thank-you__text'>
                    Thank you{' '}
                    <a
                        href={contributor.GH_HANDLE_URL}
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        {name}
                    </a>{' '}
                    for making {pullRequests} pull{' '}
                    {pullRequests === 1 ? 'request' : 'requests'} to{' '}
                    <RepositoryList repositories={repositories} /> in {month}.
                </p>
            </div>
        </section>
    );
}

export default ThankYouNote;
