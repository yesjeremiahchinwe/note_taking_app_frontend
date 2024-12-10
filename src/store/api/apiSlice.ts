import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { setCredentials } from "../auth/authSlice"
import { RootState } from "../store"
import { redirect } from "react-router-dom"

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:3500",
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token

        if (token) {
         headers.set("Authorization", `Bearer ${token}`)
        }

        return headers
    }
})


const baseQueryWithReauth = async (args: FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
    // console.log(args) // request url, method, body
    // console.log(api) // signal, dispatch, getState()
    // console.log(extraOptions) //custom like {shout: true}

    let result = await baseQuery(args, api, extraOptions)

    if (result?.error?.status === 401) {
        console.log("It looks like you are not authorized here!")
        console.log(result)
    }

    // If you want, handle other status codes, too
    if (result?.error?.status === 403) {
        console.log("Sending refresh token")

        // send refresh token to get new access token 
        const refreshResult = await baseQuery("/auth/refresh", api, extraOptions)

        if (refreshResult?.data) {

            // store the new token 
            api.dispatch(setCredentials({ ...refreshResult.data }))

            // retry original query with new access token
            result = await baseQuery(args, api, extraOptions)

        } else {
            if (refreshResult?.error?.status === 403) {
                //@ts-ignore
                refreshResult.error.data.message = "Your login has expired."
                console.log("Your login has expired!")
            }

            return refreshResult
        }
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ["Note", "User"],
    endpoints: () => ({})
})