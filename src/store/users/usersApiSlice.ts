import { apiSlice } from "../api/apiSlice";

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