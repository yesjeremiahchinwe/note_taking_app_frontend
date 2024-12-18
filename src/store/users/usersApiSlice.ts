import { apiSlice } from "../api/apiSlice"

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        addNewUser: builder.mutation({
            query: credentials => ({
                url: "/users",
                method: "POST",
                body: {
                    ...credentials
                }
            }),

            // async onQueryStarted({ dispatch, queryFulfilled }) {
            //     try {
            //         const { data } = await queryFulfilled
            //         const { accessToken } = data
            //         dispatch(setCredentials({ accessToken }))
            //     } catch (err) {
            //         console.log(err)
            //     }
            // }
        }),


        updateUserPassword: builder.mutation({
            query: (initialUserState: any) => ({
                url: "/users/change-password",
                method: "PATCH",
                body: {
                    ...initialUserState
                }
            }),
        }),
    })
})


export const { 
    useAddNewUserMutation,
    useUpdateUserPasswordMutation
} = usersApiSlice