import Layout from './components/layout/Layout.jsx';
import LandingPage from './pages/landing-page/LandingPage.jsx';
import ContributorDetails from './pages/contributor-page/contributor-details.jsx';
import { loadContributor, slugs } from './utils/contributorLoad.js';
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
                path: '/contributors/:slug',
                Component: ContributorDetails,
                loader: ({ params }) => loadContributor(params.slug),
                getStaticPaths: () =>
                    slugs.map((slug) => `/contributors/${slug}`),
                errorElement: <NotFoundPage />,
            },
            {
                path: '*',
                element: <NotFoundPage />,
            },
        ],
    },
];

export default routes;
