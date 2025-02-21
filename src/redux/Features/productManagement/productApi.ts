import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (bookInfo) => ({
        url: "/product/add-product",
        method: "POST",
        body: bookInfo,
      }),
      invalidatesTags: ["products"],
    }),
    getAllProductData: builder.query({
      query: () => ({
        url: "/product/",
      }),
      providesTags: ["products"],
    }),
    deleteProduct: builder.mutation({
      query: (bookId) => {
        console.log(bookId, "Marking as deleted");
        return {
          url: `/product/delete-product`,
          method: "PUT",
          body: {
            productId: bookId, // sending productId in the body
            productInfo: { isDeleted: true }, // setting isDeleted to true
          },
        };
      },
      invalidatesTags: ["products"],
    }),

    updateProduct: builder.mutation({
      query: (bookData) => ({
        url: "/product/update-product",
        method: "PUT",
        body: bookData,
      }),
      invalidatesTags: ["products"],
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetAllProductDataQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productApi;
