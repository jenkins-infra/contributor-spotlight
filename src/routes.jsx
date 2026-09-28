import Layout from './components/layout/Layout.jsx';
import LandingPage from './pages/landing-page/LandingPage.jsx';
import ContributorDetails from './pages/contributor-page/contributor-details.jsx';
import { legacySlugs, slugs } from './utils/contributorLoad.js';
import NotFoundPage from './pages/not-found-page/NotFoundPage.jsx';

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: '/pages/contributors/:slug',
        Component: ContributorDetails,
        getStaticPaths: () =>
          [...slugs, ...Object.keys(legacySlugs)].map(
            (slug) => `/pages/contributors/${slug}`
          ),
        errorElement: <NotFoundPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />
      },
    ],
  },
];

export default routes;
