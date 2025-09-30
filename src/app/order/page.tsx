"use client";
import Container from "@/components/Container";
import { deleteMenu } from "@/utils/FUNC";
import { useMenu } from "@/utils/MenuContext";
import { PropsGetMenus } from "@/utils/types";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import { MdRemoveShoppingCart } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";

const Order = () => {
  const { menu, removeMenu } = useMenu();
  const { user } = useUser();

  const findMenu = menu.reduce((arr: PropsGetMenus[], item: PropsGetMenus) => {
    const data = arr.find((p) => p.orderId === item.orderId);
    const quantity = item.quantity || 1;
    if (data) {
      data.quantity += quantity;
    } else {
      arr.push({ ...item, quantity });
    }
    return arr;
  }, []);

  const deleteItem = async (id: number) => {
    await deleteMenu(id);
    removeMenu(id);
  };
  // const placeholder =
  //   "https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg";

  const dataList = findMenu.map((el) => (
    <div className="flex" key={el.id}>
      <Image
        alt=""
        width={150}
        height={150}
        loading="lazy"
        src={el.orderImg ?? ""}
      />
      <div>
        <h2>{el.name}</h2>
        <h4>quantity: {el.quantity}</h4>
        <h4>price: {el.price * el.quantity} $</h4>
        <RiDeleteBin5Fill onClick={() => deleteItem(el.id)} />
      </div>
    </div>
  ));
  const totalPrice = menu.reduce((total, item) => total + (item.price ?? 0), 0);

  return (
    <section className="order">
      <h1>{totalPrice === 0 ? "" : `total price: ${totalPrice} $`} </h1>
      {findMenu.length === 0 || !user ? (
        <div className="empty">
          <MdRemoveShoppingCart />
          <h1>the menu is empy</h1>
        </div>
      ) : (
        <Container>{dataList}</Container>
      )}
    </section>
  );
};

export default Order;
