"use client";

import React, { createContext, useContext, useState } from "react";
import { ChildrenProps, MenuContextProps, PropsGetMenus } from "./types";

const MenuProvider = createContext<MenuContextProps | undefined>(undefined);

const MenuContext = ({ children }: ChildrenProps) => {
  const [menu, setMenu] = useState<PropsGetMenus[]>([]);

  const addMenu = (item: PropsGetMenus) => {
    setMenu((el) => [...el, item]);
  };

  const removeMenu = (id: number) => {
    setMenu((el) => el.filter((p) => p.id !== id));
  };

  return (
    <MenuProvider.Provider value={{ menu, setMenu, addMenu, removeMenu }}>
      {children}
    </MenuProvider.Provider>
  );
};

export default MenuContext;

export const useMenu = () => {
  const context = useContext(MenuProvider);
  if (!context) throw new Error("not find context...");
  return context;
};
