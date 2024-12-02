// import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

// const usersAdapter = createEntityAdapter({})

// const initialState = usersAdapter.getInitialState()

type User = {
    email: string,
    password: string
}

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder: any) => ({
        // getUsers: builder.query({
        //     query: () => ({
        //         url: '/users',
        //         validateStatus: (response, result) => {
        //             return response.status === 200 && !result.isError
        //         }
        //     }),

        //     transformResponse: (responseData: any) => {
        //         const loadedUsers = responseData.map((user: any) => {
        //             user.id = user._id
        //             return user
        //         })

        //         return usersAdapter.setAll(initialState, loadedUsers)
        //     },

        //     providesTags: (result, error, arg) => {
        //         if (result?.ids) {
        //             return [
        //                 { type: "User", id: "LIST" },
        //                 ...result.ids.map(id => ({ type: "User", id }))
        //             ]

        //         } else {
        //             return [{ type: "User", id: "LIST" }]
        //         }
        //     }
        // }),


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
                url: "/users",
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


// returns the query result object
// export const selectUsersResult = usersApiSlice.endpoints.getUsers.select()


// creates memoized selector
// const selectUsersData = createSelector(
//     selectUsersResult,
//     usersResult => usersResult.data  // normalized state object with ids & entities
// )


//getSelectors creates these selectors and we rename them with aliases using destructuring
// export const {
//     selectAll: selectAllUsers,
//     selectById: selectUserById,
//     selectIds: selectUserIds
     // Pass in a selector that returns the users slice of state
// } = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState)