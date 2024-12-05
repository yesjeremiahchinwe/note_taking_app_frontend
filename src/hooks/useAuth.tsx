import { useSelector } from 'react-redux'
import { selectCurrentToken, setUserId } from "@/store/auth/authSlice"
import { jwtDecode, JwtPayload } from 'jwt-decode'
import { useDispatch } from 'react-redux'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    const dispatch = useDispatch()

    if (token) {
        const decoded: JwtPayload = jwtDecode(token)
        //@ts-ignore
        const { email, userId } = decoded.UserInfo

        console.log(email)

        dispatch(setUserId({ userId }))

        return { email, userId }
    }

    return { email: '', userId: '' }
}


export default useAuth