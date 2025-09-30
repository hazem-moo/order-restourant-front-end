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
  const [write, setWrite] = useState<string>("");
  const rout = useRouter();
  const btnRef = useRef<HTMLButtonElement>(null);

  const addToMenu = async () => {
    if (!user) {
      setWrite("please sign in first to add to menu... ");
      setTimeout(() => {
        setWrite("");
        rout.push("/sign-in");
      }, 4000);
    } else {
      const currentEmail = user.primaryEmailAddress?.emailAddress;
      const backEndOrder: PropsGetMenus[] = await getOrder();
      const existItems = backEndOrder
        .filter((el) => el.email === currentEmail)
        .flatMap((ele) => ele.cart?.map((item) => item.orderId));
      const filterMenu = menu.filter((el) => !existItems.includes(el.id));

      if (filterMenu.length === 0) {
        setWrite("This selection already exists... ");
      }
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
      if (btnRef.current) btnRef.current.style.visibility = "hidden";
      await postMenu(apiData);
      setTimeout(() => {
        if (btnRef.current) btnRef.current.style.visibility = "visible";
      }, 4000);
    }
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
                onClick={addToMenu}
                ref={btnRef}
                disabled={findById === 0}
                className={`${findById <= 0 ? "opacity" : null}`}
              >
                add order
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
