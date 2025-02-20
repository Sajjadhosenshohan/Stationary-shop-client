import { baseApi } from "../../api/baseApi";

  
  const productManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      getAllProducts: builder.query({
        query: (args) => {
          const params = new URLSearchParams();
  
        //   if (args) {
        //     args.forEach((item) => {
        //       params.append(item.name, item.value as string);
        //     });
        //   }
  
          return {
            url: '/product',
            method: 'GET',
            params: params,
          };
        },
        transformResponse: (response) => {
          return {
            data: response.data,
            meta: response.meta,
          };
        },
      }),
      addAcademicSemester: builder.mutation({
        query: (data) => ({
          url: '/academic-semesters/create-academic-semester',
          method: 'POST',
          body: data,
        }),
      }),
      getAcademicFaculties: builder.query({
        query: () => {
          return { url: '/academic-faculties', method: 'GET' };
        },
        // response: TResponseRedux<TAcademicFaculty[]>
        transformResponse: (response) => {
          return {
            data: response.data,
            meta: response.meta,
          };
        },
      }),
      addAcademicFaculty: builder.mutation({
        query: (data) => ({
          url: '/academic-faculties/create-academic-faculty',
          method: 'POST',
          body: data,
        }),
      }),
      getAcademicDepartments: builder.query({
        query: () => {
          return { url: '/academic-departments', method: 'GET' };
        },
        transformResponse: (response) => {
          return {
            data: response.data,
            meta: response.meta,
          };
        },
      }),
      addAcademicDepartment: builder.mutation({
        query: (data) => ({
          url: '/academic-departments/create-academic-department',
          method: 'POST',
          body: data,
        }),
      }),
    }),
  });
  
export const {useGetAllProductsQuery} = productManagementApi
  