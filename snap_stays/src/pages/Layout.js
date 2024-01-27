import { Outlet, Link } from "react-router-dom";
import HomeNavbar from "../component/HomeNavbar";

const Layout = () => {
  return (
    <>
      <HomeNavbar>
      </HomeNavbar>

      <Outlet />
    </>
  )
};

export default Layout;