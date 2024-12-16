import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RootState } from "../store"

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_REACT_APP_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token

        if (token) {
         headers.set("Authorization", `Bearer ${token}`)
        }

        return headers
    }
})

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ["Note", "User"],
    endpoints: () => ({})
})