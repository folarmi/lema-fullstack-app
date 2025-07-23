import { ReactNode } from "react";

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
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
  id: string;
  user_id: string;
  title: string;
  body: string;
  created_at: string;
};
