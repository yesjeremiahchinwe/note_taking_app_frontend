import { selectCurrentId } from "@/store/auth/authSlice"
import { useSelector } from "react-redux"
import { useLocation, Navigate, Outlet } from "react-router-dom"

const RequireAuth = () => {
    const location = useLocation()
    const userId = useSelector(selectCurrentId)

    const content = (
        userId ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
    )

    return content
}

export default RequireAuth