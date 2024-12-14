import { apiSlice } from "../api/apiSlice"
import { logOut, setCredentials } from "./authSlice"

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: "/auth/login",
                method: "POST",
                body: { ...credentials }
            }),

            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                } catch (err) {
                    console.log(err)
                }
            }
        }),


        sendLogout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST"
            }),

            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    console.log(data)
                    dispatch(logOut({}))
                    setTimeout(() => {
                        dispatch(apiSlice.util.resetApiState())
                    }, 1000)
                    
                } catch (err) {
                    console.log(err)
                }
            }
        }),

        forgotPassword: builder.mutation({
            query: credentials => ({
                url: "/auth/forgot-password",
                method: "POST",
                body: { ...credentials }
            }),

            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                } catch (err) {
                    console.log(err)
                }
            }
        }),

        resetPassword: builder.mutation({
            query: credentials => ({
                url: "/auth/reset-password",
                method: "PATCH",
                body: { ...credentials }
            }),

            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                } catch (err) {
                    console.log(err)
                }
            }
        }),

        refresh: builder.mutation({
            query: () => ({
                url: "/auth/refresh",
                method: "GET"
            }),

            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    const { accessToken } = data
                    dispatch(setCredentials({ accessToken }))
                } catch (err) {
                    console.log(err)
                }
            }
        })
    })
})


export const {
    useLoginMutation,
    useSendLogoutMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useRefreshMutation
} = authApiSlice