import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logOut, setCredentials } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_REACT_APP_API_BASE_URL,
  credentials: "include", // important if your refresh token is httpOnly cookie
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as RootState).auth.token;

    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }

    return headers;
  },
});

// Wrapper to handle re-authentication
export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs, // request args
  unknown, // response data type
  FetchBaseQueryError // error type
> = async (args, api, extraOptions) => {

  let result = await baseQuery(args, api, extraOptions);

  // 401 Unauthorized → Try refresh
  if (result.error && result.error.status === 401) {
    console.warn("Access token expired. Attempting refresh...");

    const refreshResult = await baseQuery(
      {
        url: "/auth/refresh-token",
        method: "POST",
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const accessToken = (refreshResult.data as { accessToken: string })
        .accessToken;

      // Save refreshed token
      api.dispatch(
        setCredentials({
          token: accessToken,
          user: (api.getState() as RootState).auth.user,
        })
      );

      // Retry original request
      result = await baseQuery(args, api, extraOptions);
    } else {
      console.warn("Refresh token failed. Logging out...");
      api.dispatch(logOut());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Note", "User"],
  endpoints: () => ({}),
});
