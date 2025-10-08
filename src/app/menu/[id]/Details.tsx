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
  const [loading, setLoading] = useState(false);

  const rout = useRouter();
  const btnRef = useRef<HTMLButtonElement>(null);

  const addToMenu = async () => {
    if (!user) {
      setWrite("Please sign in first to add to menu...");
      setTimeout(() => {
        setWrite("");
        rout.push("/sign-in");
      }, 3000);
      return;
    }

    try {
      setLoading(true); // بدأ التحميل
      if (btnRef.current) {
        btnRef.current.style.visibility = "hidden"; // إخفاء الزر
      }

      const currentEmail = user.primaryEmailAddress?.emailAddress;
      const backEndOrder: PropsGetMenus[] = await getOrder();

      const existItems = backEndOrder
        .filter((el) => el.email === currentEmail)
        .flatMap((ele) => ele.cart?.map((item) => item.orderId));

      const filterMenu = menu.filter((el) => !existItems.includes(el.id));

      if (filterMenu.length === 0) {
        setWrite("This selection already exists...");
        return;
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

      await postMenu(apiData);
      setWrite("Added successfully 🎉");
    } catch (error) {
      console.error(error);
      setWrite("Something went wrong, please try again!");
    } finally {
      // بعد 4 ثواني رجّع الزر
      setTimeout(() => {
        setLoading(false);
        if (btnRef.current) {
          btnRef.current.style.visibility = "visible";
        }
        setWrite("");
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
                ref={btnRef}
                onClick={addToMenu}
                disabled={findById === 0 || loading}
                className={`${findById <= 0 ? "opacity" : ""}`}
              >
                {loading ? "Adding..." : "Add Order"}
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
