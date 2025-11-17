import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import useTitle from "@/hooks/useTitle";

const Layout = () => {
  useTitle("Home Page")

  return (
  <div className="layout">
    <Sidebar />
    <div className="w-full max-h-screen overflow-y-auto custom_scroll_bar">
      <Outlet />
    </div>
    <Footer />
  </div>
)
}

export default Layout;
