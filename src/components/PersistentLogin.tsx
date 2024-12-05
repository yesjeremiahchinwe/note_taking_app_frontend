import { Outlet, Link } from "react-router-dom"
import { useEffect, useRef, useState } from 'react'
import { useRefreshMutation } from "@/store/auth/authApiSlice"
import usePersist from "@/hooks/usePersist"
import { useSelector } from 'react-redux'
import { selectCurrentToken } from "@/store/auth/authSlice"

const PersistLogin = () => {
    const [persist] = usePersist()
    const token = useSelector(selectCurrentToken)
    const effectRan = useRef(false)

    const [refresh, {
        isUninitialized
    }] = useRefreshMutation()


    useEffect(() => {
        if (effectRan.current === true || process.env.NODE_ENV !== 'development') { // React 18 Strict Mode

            const verifyRefreshToken = async () => {
                try {
                    //const response = 
                    await refresh({})
                    //const { accessToken } = response.data
                }
                catch (err) {
                    console.error(err)
                }
            }

            if (!token) verifyRefreshToken()
        }

        // return () => effectRan.current = true

        // eslint-disable-next-line
    }, [])


    let content
    if (token && isUninitialized) { //persist: yes, token: yes
        content = <Outlet />
    }

    return content
}
export default PersistLogin