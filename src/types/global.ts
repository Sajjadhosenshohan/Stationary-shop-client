import { BaseQueryApi } from '@reduxjs/toolkit/query';

export type TError = {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
};

export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

export type TResponse<T> = {
  data?: T;
  error?: TError;
  meta?: TMeta;
  success: boolean;
  message: string;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;

export type TQueryParam = {
  name: string;
  value: boolean | React.Key;
};

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image: string;
}

// export interface CartItem extends Product {
//   quantity: number;
// }

export interface Order {
  _id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'shipping' | 'delivered';
  createdAt: string;
}



//
// Types
export interface TOrderProduct {
  _id: string; // MongoDB ObjectId as a string
  title: string;
  numberOfProduct: number;
  description: string;
  price: number; // Price as a string (consider converting to number if necessary)
  category: string;
  imageUrl: string;
  authorName: string;
  authorEmail: string;
  isAvailable: boolean;
  isDeleted: boolean;
  quantity: number;
  __v: number;
}

export interface CartItem extends TOrderProduct {
  quantity: number;
}
export type TUserInfo = {
  name: string;
  email: string;
  role: string;
}

export type TOrder = {
  _id: string;
  products: TOrderProduct[];
  total_order_amount: number;
  orderStatus: string;
  transactionId: string;
  isDeleted: true;
  userInfo: TUserInfo;
}
