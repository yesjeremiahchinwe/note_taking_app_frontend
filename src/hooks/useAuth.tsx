import { useSelector } from 'react-redux'
import { selectCurrentToken } from "@/store/auth/authSlice"
import { jwtDecode, JwtPayload } from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)

    if (token) {
        const decoded: JwtPayload = jwtDecode(token)
        //@ts-ignore
        const { email, userId } = decoded.UserInfo

        return { email, userId }
    }
    
    return { email: '', userId: '' }
}


export default useAuth