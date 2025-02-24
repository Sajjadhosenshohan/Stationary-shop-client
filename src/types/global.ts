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
  updatedAt: string;
  createdAt: string;
}


export interface Profile {
  id: string;
  name: string | null;
  image_url: string | null;
  present_address: string | null;
  city: string | null;
  updated_at: string;
}

export interface ProfileFormData {
  name: string;
  image_url: string;
  present_address: string;
  city: string;
}

export interface UserInfo {
  name: string;
  email: string;
  role: "user" | "admin";
  iat: number;
  exp: number;
}