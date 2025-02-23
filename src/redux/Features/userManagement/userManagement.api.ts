import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // addProduct: builder.mutation({
    //   query: (bookInfo) => ({
    //     url: "/api/product/add-product",
    //     method: "POST",
    //     body: bookInfo,
    //   }),
    // }),
    getAllUserData: builder.query({
      query: () => ({
        url: "/auth/admin/get-all-user",
      }),
      providesTags: ["users"],
    }),
    deactivateAccount: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/admin/block-user",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["users"],
    }),
    activateAccount: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/admin/make-active-user",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["users"],
    }),
    changeRole: builder.mutation({
      query: (userRole) => ({
        url: "/auth/admin/change-user-role",
        method: "POST",
        body: userRole,
      }),
      invalidatesTags: ["users"],
    }),

    // profile management

    getProfileData: builder.query({
      query: (email) => ({
        url: `/auth/get-single-user/${email}`,
      }),
      
      providesTags: ["singleUser"],
    }),
    updateProfile: builder.mutation({
      query: (userInfo) => {
        return {
        url: "/auth/update-profile-data",
        method: "PUT",
        body: userInfo,
      }},
      invalidatesTags: ["singleUser"],
    }),
  }),
});

export const {
  useGetAllUserDataQuery,
  useActivateAccountMutation,
  useChangeRoleMutation,
  useDeactivateAccountMutation,

  useGetProfileDataQuery,
  useUpdateProfileMutation
} = userManagementApi;
