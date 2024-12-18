import { apiSlice } from "../api/apiSlice";

type User = {
    email: string,
    password: string
}

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

            async onQueryStarted({ queryFulfilled }) {
                try {
                    await queryFulfilled
                } catch (err) {
                    console.log(err)
                }
            }
            
            // invalidatesTags: [{ type: "User", id: "LIST" }]
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