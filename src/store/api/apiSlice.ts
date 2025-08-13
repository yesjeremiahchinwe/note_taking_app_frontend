import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RootState } from "../store"

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_REACT_APP_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
        const accessToken = (getState() as RootState).auth.token

        if (accessToken) {
         headers.set("Authorization", `Bearer ${accessToken}`)
        }

        return headers
    }
})

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ["Note", "User"],
    endpoints: () => ({})
})