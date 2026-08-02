import { Outlet } from 'react-router-dom';
import JioNavbar from './JioNavbar';
import JioFooter from './JioFooter';

const SITE_URL = 'https://contributors.jenkins.io';

function Layout() {
  return (
    <>
      <JioNavbar property={SITE_URL} />
      <Outlet />
      <JioFooter property={SITE_URL} />
    </>
  );
}

export default Layout;
