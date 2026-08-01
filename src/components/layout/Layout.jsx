import { Outlet } from 'react-router-dom';
import JioNavbar from './JioNavbar';
import JioFooter from './JioFooter';

function Layout() {
  return (
    <>
      <JioNavbar />
      <Outlet />
      <JioFooter />
    </>
  );
}

export default Layout;
