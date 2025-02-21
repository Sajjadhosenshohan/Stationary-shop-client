import { baseApi } from "../../api/baseApi";


const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (bookInfo) => ({
        url: "/product/add-product",
        method: "POST",
        body: bookInfo,
      }),
      invalidatesTags: ["products"]
    }),
    getAllProductData: builder.query({
      query: () => ({
        url: "/product/",
      }),
      providesTags: ["products"]
    }),
    deleteProduct: builder.mutation({
      query: (bookId) => ({
        url: "/product/delete-product",
        method: "PUT",
        body: bookId,
      }),
      invalidatesTags: ["products"]
    }),
    updateProduct: builder.mutation({
      query: (bookData) => ({
        url: "/product/update-product",
        method: "PUT",
        body: bookData,
      }),
      invalidatesTags: ["products"]
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetAllProductDataQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productApi;