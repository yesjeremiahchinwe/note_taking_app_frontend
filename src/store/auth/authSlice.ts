import { createSlice } from "@reduxjs/toolkit"

export type StateType = {
    auth: { token: string | null, id: string },
}

const authSlice = createSlice({
    name: "auth",
    initialState: { token: null, id: "", username: "" },
    reducers: {
        setCredentials: (state, action) => {
            const { accessToken, id, username } = action.payload
            state.token = accessToken
            state.id = id
            state.username = username
        },

        logOut: (state) => {
            state.token = null
            state.id = ""
        }
    }
})


export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state: StateType) => state.auth.token
export const selectCurrentId = (state: StateType) => state.auth.id
