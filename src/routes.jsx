import Layout from './components/layout/Layout.jsx';
import LandingPage from './pages/landing-page/LandingPage.jsx';
import ContributorDetails from './pages/contributor-page/contributor-details.jsx';
import { loadContributor } from './utils/contributorLoad.js';

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
        loader: async ({ params }) => loadContributor(params.slug),
      },
      
    ],
  },
];

export default routes;
