import { Outlet, useSearchParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import useTitle from "@/hooks/useTitle";
import { useEffect } from "react";
import { setCredentials } from "@/store/auth/authSlice";
import { useDispatch } from "react-redux";

const Layout = () => {
  useTitle("Home Page");

  const [params] = useSearchParams();
  const token = params.get("token");
  const id = params.get("id");
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(setCredentials({ accessToken: token, id }));
    }
  }, []);

  return (
    <div className="layout">
      <Sidebar />
      <div className="w-full max-h-screen overflow-y-auto custom_scroll_bar">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
