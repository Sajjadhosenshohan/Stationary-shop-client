import {
    createApi,
    fetchBaseQuery,
  } from '@reduxjs/toolkit/query/react';
  import { RootState } from '../store';
  
  const baseQuery = fetchBaseQuery({
//https://stationary-shop-server-nu.vercel.app
//http://localhost:5000
    baseUrl: `https://stationary-shop-server-nu.vercel.app/api/v1`,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
  
      if (token) {
        headers.set('authorization', `${token}`);
      }
  
      return headers;
    },
  });

  export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQuery,
    tagTypes: ["users", "products", "orderHistory","singleUser"],
    endpoints: () => ({}),
  });
  