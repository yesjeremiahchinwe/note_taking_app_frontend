import { Outlet } from "react-router-dom"
import { useEffect, useRef, useState } from 'react'
import { useRefreshMutation } from "@/store/auth/authApiSlice"
import usePersist from "@/hooks/usePersist"
import { useSelector } from 'react-redux'
import { selectCurrentToken } from "@/store/auth/authSlice"
import AlertModal from "./modals/alert-modal"
import LoadiingState from "./HomeLoader"

const PersistLogin = () => {
    const [persist] = usePersist()
    const token = useSelector(selectCurrentToken)
    const effectRan = useRef(false)

    const [trueSuccess, setTrueSuccess] = useState(false)

    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError
    }] = useRefreshMutation()

    //@ts-ignore
    useEffect(() => {
        if (effectRan.current === true || process.env.NODE_ENV !== 'development') { // React 18 Strict Mode

            const verifyRefreshToken = async () => {
                try {
                    const response = await refresh({})
                    const { accessToken } = response.data
                    console.log(accessToken)
                    setTrueSuccess(true)
                }
                catch (err) {
                    console.error(err)
                }
            }

            if (!token && persist) verifyRefreshToken()
        }

        return () => effectRan.current = true

        // eslint-disable-next-line
    }, [])


    let content
    if (!persist) { // persist: no
        content = <Outlet />
    } else if (isLoading) { //persist: yes, token: no
        content = <LoadiingState message="Please wait..." />
    } else if (isError) { //persist: yes, token: no
        content = (
            <AlertModal isOpen={true} onClose={() => false} title="Session Expired!" description="Your login has expired! Click the button below to login again." />
        )
    } else if (isSuccess && trueSuccess) { //persist: yes, token: yes
        content = <Outlet />
    } else if (token && isUninitialized) { //persist: yes, token: yes
        content = <Outlet />
    }

    return content
}
export default PersistLogin