import { apiSlice } from "../api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
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

export const { useUpdateUserPasswordMutation } = usersApiSlice;
