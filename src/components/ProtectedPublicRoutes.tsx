import { selectCurrentId } from "@/store/auth/authSlice";
import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const ProtectedPublicRoutes = () => {
  const location = useLocation();
  const userId = useSelector(selectCurrentId);

  const content =
    userId ? (
      <Navigate to="/" state={{ from: location }} replace />
    ) : (
      <Outlet />
    );

  return content;
};

export default ProtectedPublicRoutes;
