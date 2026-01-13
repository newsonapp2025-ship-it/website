import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { all } from "./common";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${all.baseurl}`,
    prepareHeaders: (headers) => {
      // HARD-CODED TOKEN (for 5 days)
      const hardcodedToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI2OTIxYjE3Yjc5MTcyM2U3ZTNlZjkzMWYiLCJkYm5hbWUiOiJ1c2VycyIsImlhdCI6MTc2ODI3NzgwMH0.UFv8DnVmeJIqyo2yXdiz6oFNY_k61_VIn8HOItRpjsI";

      // Optionally, you can still prefer localStorage token if it exists
      const token = localStorage.getItem("token") || hardcodedToken;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      // ✅ Return headers object
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
