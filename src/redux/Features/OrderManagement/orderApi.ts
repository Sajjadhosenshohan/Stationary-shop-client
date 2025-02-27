import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addOrder: builder.mutation({
      query: (productInfo) => ({
        url: "/order",
        method: "POST",
        body: productInfo,
      }),
    }),
    getAdminOrdersData: builder.query({
      query: () => ({
        url: "/payment/get-admin-order-data",
        method: "GET"
      })
    }),
    getUserOrdersData: builder.query({
      query: (userEmail) => ({
        url: "/payment/get-user-order-data",
        method: "POST",
        body: { email: userEmail }
        
      }),
      providesTags:["orderHistory"]
    }),
    changeOrderStatus: builder.mutation({
      query: (productInfo) => ({
        url: "/payment/change-order-status",
        method: "PUT",
        body: productInfo,
      }),
      invalidatesTags: ["orderHistory"]
    }),
    deleteOrder: builder.mutation({
      query: (orderInfo) => ({
        url: "/payment/delete-order",
        method: "PUT",
        body: orderInfo,
      }),
      invalidatesTags: ["orderHistory"]
    }),
  }),
});

export const {
  useAddOrderMutation,
  useGetAdminOrdersDataQuery,
  useGetUserOrdersDataQuery,
  useDeleteOrderMutation,
  useChangeOrderStatusMutation
} = orderApi;
