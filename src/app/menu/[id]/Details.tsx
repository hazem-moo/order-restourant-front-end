/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Container from "@/components/Container";
import { getOrder, postMenu } from "@/utils/FUNC";
import { useMenu } from "@/utils/MenuContext";
import { PropsGetMenus } from "@/utils/types";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";

const Details = ({
  id,
  name,
  description,
  price,
  img,
  quantity,
}: PropsGetMenus) => {
  const { menu, addMenu, removeMenu } = useMenu();
  const { user } = useUser();

  const findById = menu.filter((el) => el.id === id).length;
  const rout = useRouter();

  const [write, setWrite] = useState<string>("");
  const btnRef = useRef<HTMLButtonElement>(null);

  const addToMenu = async () => {
    if (!user) {
      setWrite("Please sign in first to add to menu...");
      setTimeout(() => {
        setWrite("");
        rout.push("/sign-in");
      }, 4000);
      return;
    }

    const currentEmail = user.primaryEmailAddress?.emailAddress;

    // 🔥 استدعاء من السيرفر بدل الكلاينت
    const backendOrder: PropsGetMenus[] = (await getOrder()) || [];

    const existItems = backendOrder
      .filter((el: any) => el.email === currentEmail)
      .flatMap((el: any) => el.cart?.map((item: any) => item.orderId));

    const filterMenu = menu.filter((el) => !existItems.includes(el.id));

    const api = filterMenu.map((el) => ({
      orderId: el.id,
      name: el.name,
      orderImg: el.img?.url,
      price: el.price,
      quantity: el.quantity,
      description: el.description,
    }));

    const apiData = {
      data: {
        username: user.fullName,
        email: currentEmail,
        cart: api,
      },
    };
    console.log(apiData);
    await postMenu(apiData);

    setWrite("Added successfully 🎉");
    if (btnRef.current) btnRef.current.style.visibility = "hidden";

    setTimeout(() => {
      if (btnRef.current) btnRef.current.style.visibility = "visible";
    }, 4000);
  };

  return (
    <section className="details-id">
      <Container>
        <div className="flex">
          <Image width={300} height={300} alt="" src={img?.url.trim() ?? ""} />
          <div className="info">
            <h3> {name}</h3>
            <p>{description}</p>
            <h4>{price} $</h4>
            <div className="icons">
              <FaPlusCircle
                onClick={() =>
                  addMenu({ id, name, description, price, img, quantity })
                }
              />
              <p>{findById} </p>
              <FaMinusCircle onClick={() => removeMenu(id)} />
              <button
                ref={btnRef}
                onClick={addToMenu}
                disabled={findById === 0}
                className={`${findById <= 0 ? "opacity" : ""}`}
              >
                Add Order
              </button>
            </div>
            <h5>{write}</h5>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Details;
