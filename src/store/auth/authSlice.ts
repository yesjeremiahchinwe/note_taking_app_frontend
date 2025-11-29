import { createSlice } from "@reduxjs/toolkit";

export type StateType = {
  auth: {
    token: string | null;
    id: string,
    user: {
      _id: string;
      email: string;
      avatar: string;
      username: string;
    } | null;
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null, id: null, user: null },
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken, user, id } = action.payload;
      state.token = accessToken;
      state.user = user;
      state.id = id
    },

    logOut: (state) => {
      state.token = null;
      state.user = null;
      state.id = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state: StateType) => state.auth.token;
export const selectCurrentId = (state: StateType) => state.auth.id;
export const selectCurrentUsername = (state: StateType) =>
  state.auth.user?.username;
