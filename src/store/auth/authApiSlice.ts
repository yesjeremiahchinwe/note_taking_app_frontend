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
                    console.log(err)
                }
            }
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
                    console.log(err)
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
                    console.log(err)
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
                    console.log(err)
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
                    console.log(err)
                }
            }
        })
    })
})


export const {
    useAddNewUserMutation,
    useLoginMutation,
    useSendLogoutMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation
} = authApiSlice