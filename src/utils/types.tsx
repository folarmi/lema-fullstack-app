import { ReactNode } from "react";

export type Address = {
  id: string;
  user_id: string;
  street: string;
  state: string;
  city: string;
  zipcode: string;
};

export type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  address: Address;
};

export type PaginatedUsersResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type CardProp = {
  title: string;
  post: string;
  onDelete: () => void;
};

export type ModalProp = {
  show: boolean;
  toggleModal: () => void;
  ifClose?: boolean;
  children: ReactNode;
};

export type NewPostProp = {
  toggleModal: () => void;
};

export type Post = {
  id: number;
  user_id: string;
  title: string;
  body: string;
  created_at: string;
};
