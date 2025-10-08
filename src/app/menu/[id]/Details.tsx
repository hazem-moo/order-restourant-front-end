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
  const [loading, setLoading] = useState(false);

  const [write, setWrite] = useState<string>("");
  const btnRef = useRef<HTMLButtonElement>(null);

  const addToMenu = async () => {
    console.log("🟡 addToMenu started");

    if (!user) {
      setWrite("Please sign in first to add to menu...");
      setTimeout(() => {
        setWrite("");
        rout.push("/sign-in");
      }, 3000);
      return;
    }

    try {
      setLoading(true);
      if (btnRef.current) btnRef.current.style.visibility = "hidden";

      const currentEmail = user.primaryEmailAddress?.emailAddress;
      console.log("📧 Current Email:", currentEmail);

      const backEndOrder: PropsGetMenus[] = await getOrder();
      console.log("📦 Orders from backend:", backEndOrder);

      const existItems = backEndOrder
        .filter((el) => el.email === currentEmail)
        .flatMap((ele) => ele.cart?.map((item) => item.orderId));

      console.log("🧾 Existing item IDs:", existItems);

      const filterMenu = menu.filter((el) => !existItems.includes(el.id));
      console.log("🆕 Filtered menu:", filterMenu);

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
        username: user.fullName,
        email: currentEmail,
        cart: api,
      };

      console.log("🚀 Sending postMenu with:", apiData);

      await postMenu(apiData);

      console.log("✅ postMenu success");
      setWrite("Added successfully 🎉");
    } catch (error) {
      console.error("❌ Error in addToMenu:", error);
      setWrite("Something went wrong, please try again!");
    } finally {
      setTimeout(() => {
        setLoading(false);
        if (btnRef.current) btnRef.current.style.visibility = "visible";
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
