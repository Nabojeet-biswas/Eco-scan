import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl:
    (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE_URL) ||
    "http://localhost:8080",
  prepareHeaders: (headers, { getState }) => {
    // If a future token is stored, we can attach it here
    const token = getState()?.auth?.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  tagTypes: ["Status", "Demo", "WasteResult"],
  endpoints: () => ({}),
});
