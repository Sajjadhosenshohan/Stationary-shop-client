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
  }),
});

export const {
  useGetAllUserDataQuery,
  useActivateAccountMutation,
  useChangeRoleMutation,
  useDeactivateAccountMutation,
} = userManagementApi;
