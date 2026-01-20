import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { all } from "./common";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${all.baseurl}`,
    prepareHeaders: (headers) => {
      // ✅ Get token only from localStorage
      const token = localStorage.getItem("token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: [
    "webinar",
    "user",
    "auth",
    "userbot",
    "country",
    "menuControl",
    "price",
    "ticket",
    "support",
  ],
  endpoints: (builder) => ({}),
});
