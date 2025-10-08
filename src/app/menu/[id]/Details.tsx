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
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      if (btnRef.current) btnRef.current.style.visibility = "hidden";

      const currentEmail = user.primaryEmailAddress?.emailAddress;
      const backEndOrder: PropsGetMenus[] = await getOrder();

      // لو مفيش بيانات راجعة من الـ backend
      if (!Array.isArray(backEndOrder)) {
        console.error("getOrder() returned invalid data:", backEndOrder);
        setWrite("Server returned invalid data");
        return;
      }

      const existItems = backEndOrder
        .filter((el) => el.email === currentEmail)
        .flatMap((ele) => ele.cart?.map((item) => item.orderId));

      const filterMenu = menu.filter((el) => !existItems.includes(el.id));

      // ✅ بدلاً من "return" هنا، خلينا نكمل عادي ونسمح بـ postMenu
      if (filterMenu.length === 0) {
        setWrite("Already exists, but updating your cart...");
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

      // ✅ هنا بيتنفذ POST فعلاً
      await postMenu(apiData);
      setWrite("Order added successfully 🎉");
    } catch (error) {
      console.error("Error in addToMenu:", error);
      setWrite("Something went wrong while posting!");
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
