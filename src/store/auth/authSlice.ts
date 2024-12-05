import { createSlice } from "@reduxjs/toolkit"

type StateType = {
    auth: { token: string | null, userId: string | null }
}

const authSlice = createSlice({
    name: "auth",
    initialState: { token: null, userId: "" },
    reducers: {
        setCredentials: (state, action) => {
            const { accessToken } = action.payload
            state.token = accessToken
        },

        logOut: (state, action) => {
            state.token = null
        },

        setUserId: (state, action) => {
            const { userId } = action.payload
            state.userId = userId
        }
    }
})


export const { setCredentials, logOut, setUserId } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state: StateType) => state.auth.token

export const selectUserId = (state: StateType) => state.auth.userId
