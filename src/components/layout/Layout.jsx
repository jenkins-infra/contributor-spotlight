import { Outlet, useLocation, useMatches } from 'react-router-dom';
import { useEffect } from 'react';
import { Head } from 'vite-react-ssg';
import JioNavbar from './JioNavbar';
import JioFooter from './JioFooter';
import { sourcePathFor } from '../../utils/contributorLoad';

const SITE_URL = 'https://contributors.jenkins.io';
const GITHUB_REPO = 'jenkins-infra/contributor-spotlight';
const GITHUB_BRANCH = import.meta.env.GITHUB_BRANCH;

function Layout() {
  const matches = useMatches();
  const location = useLocation();
  const contributorMatch = matches.find((match) => match.params?.slug);
  const sourcePath = contributorMatch
    ? sourcePathFor(contributorMatch.params.slug)
    : null;

useEffect(() => {
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
}, [location.pathname]);

  return (
    <>
      {/* Site-wide defaults. A page's own tags replace these. */}
      <Head>
        <title>Jenkins Contributor Spotlight</title>
        <meta property='og:title' content='Jenkins Contributor Spotlight' />
        <meta property='og:type' content='website' />
        <meta property='og:image' content={`${SITE_URL}/opengraph.png`} />
        <meta property='og:url' content={SITE_URL} />
        <meta
          property='og:description'
          content='Contributors behind Jenkins and the people shaping its community around the world.'
        />
        <meta property='og:site_name' content='Jenkins Contributor Spotlight' />
        <meta name='twitter:card' content='summary_large_image' />
      </Head>
      <JioNavbar property={SITE_URL} />
      <Outlet />
      <JioFooter
        property={SITE_URL}
        sourcePath={sourcePath}
        githubRepo={GITHUB_REPO}
        githubBranch={GITHUB_BRANCH}
      />
    </>
  );
}

export default Layout;
