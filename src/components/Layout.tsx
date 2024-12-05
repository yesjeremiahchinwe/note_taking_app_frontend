import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { Toaster } from "./ui/toaster";

const Layout = () => (
  <div className="layout">
    <Sidebar />

    <div className="w-full min-h-screen">
      <Outlet />
    </div>

    <Footer />

    <Toaster />
  </div>
);

export default Layout;
