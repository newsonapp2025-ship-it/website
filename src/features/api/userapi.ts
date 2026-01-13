import { api } from "../api";

// types/user.ts

export interface PaginationArgs {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  search?: string;
  filter?: Record<string, string | number>;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  isActive: boolean;
  createdAt: string;
}

export interface PaginatedUserResponse {
  data: User[];
  total: number;
  page: number;
  limit: number;
}

export interface Admin {
  _id: string;
  name: string;
  email: string;
}

export interface ContactPayload {
  name: string;
  address: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  data?: ContactPayload;
}


const userApi = api.injectEndpoints({
  endpoints: (builder) => ({

    // ✅ Submit Contact Form
    submitData: builder.mutation<ContactResponse, ContactPayload>({
      query: (data) => ({
        url: "/contact/submit",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),

        // ✅ Grouped by country
    termsData: builder.query<
      Record<string, number>,
      void
    >({
      query: () => ({
        url: `/content/terms-and-conditions`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),


           // ✅ Grouped by country
    privacyData: builder.query<
      Record<string, number>,
      void
    >({
      query: () => ({
        url: `/content/privacy-policy`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),

        getAllCategories: builder.query<
      Record<string, number>,
      void
    >({
      query: () => ({
        url: `/category/getAllCategories`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),


        // ✅ Get admin
    getNewsbyId: builder.query<Admin, string>({
      query: (id) => ({
        url: `/latestnews/getNewsByCategory/${id}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),

    // https://api.newson.app/api/latestnews/getActiveNewsMobile?language=tamil
        oneNews: builder.query<Admin, string>({
      query: () => ({
        url: `/latestnews/getActiveNewsMobile?language=tamil`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),



    // ✅ Get users with pagination
    getUserData: builder.query<PaginatedUserResponse, PaginationArgs | void>({
      query: (args) => {
        const {
          page = 1,
          limit = 10,
          sortBy = "createdAt",
          sortOrder = "desc",
          filter = {},
          search = "",
        } = args || {};

        const queryParams = new URLSearchParams({
          page: String(page),
          limit: String(limit),
          sortBy,
          sortOrder,
          search,
          ...filter,
        });

        return {
          url: `/user/getallUserParticipantsPagination?${queryParams.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["user"],
    }),

 
    // ✅ Upload profile image
    uploadProfileImage: builder.mutation<
      { success: boolean },
      FormData
    >({
      query: (profile) => ({
        url: "/user/uploadprofileImage",
        method: "POST",
        body: profile,
      }),
      invalidatesTags: ["user"],
    }),

    // ✅ Edit user
    editUser: builder.mutation<
      User,
      { id: string; value: Partial<User> }
    >({
      query: ({ id, value }) => ({
        url: `/user/editUser/${id}`,
        method: "PUT",
        body: value,
      }),
      invalidatesTags: ["user"],
    }),

    // ✅ Enable / Disable user
    enableDisableUserParticipants: builder.mutation<
      { success: boolean },
      string
    >({
      query: (id) => ({
        url: `/user/enableDisableUserParticipants/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["user"],
    }),

    // ✅ Grouped by country
    getParticipantsGroupedByCountry: builder.query<
      Record<string, number>,
      void
    >({
      query: () => ({
        url: `/user/getParticipantsGroupedByCountry`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),

    // ✅ Get admin
    getAdmin: builder.query<Admin, string>({
      query: (id) => ({
        url: `/v2/admin/profile/${id}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),

    // ✅ Edit admin
    editAdmin: builder.mutation<
      Admin,
      { id: string; value: Partial<Admin> }
    >({
      query: ({ id, value }) => ({
        url: `/admin/editAdmin/${id}`,
        method: "PUT",
        body: value,
      }),
      invalidatesTags: ["user"],
    }),

  }),
});

export const {
  useSubmitDataMutation,
  useTermsDataQuery,
  useOneNewsQuery,
  usePrivacyDataQuery,
  useGetNewsbyIdQuery,
  useGetAllCategoriesQuery,
  useGetUserDataQuery,
  // useCreateUserParticipantMutation,
  useUploadProfileImageMutation,
  useEditUserMutation,
  useEnableDisableUserParticipantsMutation,
  useGetParticipantsGroupedByCountryQuery,
  useGetAdminQuery,
  useEditAdminMutation,
} = userApi;

export default userApi;
