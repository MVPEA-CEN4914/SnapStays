import { Outlet, Link } from "react-router-dom";
import HomeNavbar from "../component/HomeNavbar";
import Footer from "../component/Footer";

const Layout = () => {
  return (
    <>
      <HomeNavbar></HomeNavbar>
      <Outlet />
      <Footer></Footer>
    </>
  );
};

export default Layout;
