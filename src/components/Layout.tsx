import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { Toaster } from "./ui/toaster";
import useTitle from "@/hooks/useTitle";
import { useEffect } from "react";
import useAuth from "@/hooks/useAuth";

const Layout = () => {
  useTitle("Home Page")
  const { userId } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!userId) {
      navigate("/login")
    }
  }, [])

  return (
  <div className="layout">
    <Sidebar />

    <div className="w-full max-h-screen overflow-y-auto custom_scroll_bar">
      <Outlet />
    </div>

    <Footer />

    <Toaster />
  </div>
)
}

export default Layout;
