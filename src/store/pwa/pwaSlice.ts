// store/slices/pwaSlice.ts
import { createSlice } from "@reduxjs/toolkit";

const pwaSlice = createSlice({
  name: "pwa",
  initialState: {
    deferredPrompt: null, // Store the install prompt
  },
  reducers: {
    setDeferredPrompt(state, action) {
      state.deferredPrompt = action.payload;
    },
  },
});

export const { setDeferredPrompt } = pwaSlice.actions;
export default pwaSlice.reducer;
