import { apiSlice } from "../api/apiSlice";
import { setCredentials } from "../auth/authSlice";

type User = {
    email: string,
    password: string
}

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder: any) => ({
        addNewUser: builder.mutation({
            query: (initialUserState: User) => ({
                url: "/users",
                method: "POST",
                body: {
                    ...initialUserState
                }
            }),

            //@ts-ignore
            async onQueryStarted({ dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    const { accessToken } = data
                    dispatch(setCredentials({ accessToken }))
                } catch (err) {
                    console.log(err)
                }
            },

            invalidatesTags: [{ type: "User", id: "LIST" }]
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