// import { toast } from "react-toastify"
import { apiSlice } from "../api/apiSlice"
import { logOut } from "./authSlice"

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        addNewUser: builder.mutation({
            query: credentials => ({
                url: "/auth/register",
                method: "POST",
                body: {
                    ...credentials
                }
            }),

            async onQueryStarted({ queryFulfilled }) {
                try {
                     await queryFulfilled
                } catch (err) {
                    // toast.error("Something went wrong. Please try again.")
                }
            }
        }),

        googleLogin: builder.query({
            query: () => ({
                url: "/auth/google"
            }),
        }),
        
        login: builder.mutation({
            query: credentials => ({
                url: "/auth/login",
                method: "POST",
                body: { ...credentials }
            }),

            async onQueryStarted({ queryFulfilled }) {
                try {
                    await queryFulfilled
                } catch (err) {
                    // toast.error("Something went wrong. Please try again.")
                }
            }
        }),

        sendLogout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST"
            }),

            async onQueryStarted({ dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                    dispatch(logOut())

                    setTimeout(() => {
                        dispatch(apiSlice.util.resetApiState())
                    }, 1000)
                    
                } catch (err) {
                    // toast.error("Something went wrong. Please try again.")
                }
            }
        }),

        forgotPassword: builder.mutation({
            query: credentials => ({
                url: "/auth/forgot",
                method: "POST",
                body: { ...credentials }
            }),

            async onQueryStarted({ queryFulfilled }) {
                try {
                    await queryFulfilled
                } catch (err) {
                    // toast.error("Something went wrong. Please try again.")
                }
            }
        }),

        resetPassword: builder.mutation({
            query: credentials => ({
                url: "/auth/reset",
                method: "PATCH",
                body: { ...credentials }
            }),

            async onQueryStarted({ queryFulfilled }) {
                try {
                    await queryFulfilled
                } catch (err) {
                    // toast.error("Something went wrong. Please try again.")
                }
            }
        })
    })
})


export const {
    useAddNewUserMutation,
    useGoogleLoginQuery,
    useLoginMutation,
    useSendLogoutMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation
} = authApiSlice