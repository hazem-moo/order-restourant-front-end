import { Dispatch, ReactNode, SetStateAction } from "react";

export type ChildrenProps = {
  children: ReactNode;
};

export type PropsGetMenus = {
  id: number;
  description?: string;
  price: number;
  name?: string;
  quantity: number;
  category?: string;
  img?: { url: string };
  bannar?: { url: string };
  orderId?: number;
  orderImg?: string;
  username?: string;
  email?: string;
  // ordet
  cart?: {
    price?: number;
    name?: string;
    quantity?: number;
    orderImg?: string;
    username?: string;
    email?: string;
    orderId?: number;
  }[];
};

export type IdProps = {
  params: {
    id: string;
  };
};

export type MenuContextProps = {
  menu: PropsGetMenus[];
  setMenu: Dispatch<SetStateAction<PropsGetMenus[]>>;
  addMenu: (item: PropsGetMenus) => void;
  removeMenu: (id: number) => void;
};

export type PropsSimilar = {
  data: PropsGetMenus[];
};
