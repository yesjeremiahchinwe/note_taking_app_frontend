import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Layout = () => (
  <div className="layout">
    <Sidebar />

    <div>
      <Outlet />
    </div>

    <Footer />
  </div>
);

export default Layout;
