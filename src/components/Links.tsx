/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

export const dynamic = "force-dynamic";

import { getOrder } from "@/utils/FUNC";
import { useMenu } from "@/utils/MenuContext";
import { PropsGetMenus } from "@/utils/types";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { FaUser } from "react-icons/fa";

const Links = ({ open }: { open: boolean }) => {
  const usePath = usePathname();
  const { user } = useUser();
  const { menu, setMenu } = useMenu();

  useEffect(() => {
    if (!user) return; // 🛑 ما تجيبش cart لو مفيش user

    const getOrderCart = async () => {
      const getData: PropsGetMenus[] = await getOrder();

      const dataList: any[] = getData.flatMap((item) =>
        item.cart
          ? item.cart.map((el) => ({
              id: item.id,
              orderId: el.orderId,
              orderImg: el.orderImg,
              name: el.name,
              price: el.price,
              quantity: el.quantity,
            }))
          : []
      );

      setMenu(dataList);
    };

    getOrderCart();
  }, [user]);

  return (
    <div className={`collapse ${open ? "show" : ""}`}>
      <ul className="nav">
        <li className="nav-item">
          <Link
            href={`/`}
            className={`nav-link ${usePath === "/" ? "active" : ""}`}
          >
            home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            href={`/special-offers`}
            className={`nav-link ${
              usePath === `/special-offers` ? " active" : ""
            }`}
          >
            special offers
          </Link>
        </li>
        <li className="nav-item">
          <Link
            href={`/order`}
            className={`nav-link nav-link-order ${
              usePath === `/order` ? " active" : ""
            }`}
          >
            order <p>{!user ? "" : menu.length}</p>
          </Link>
        </li>
        <li className="nav-item">
          {!user ? (
            <Link href={"/sign-in"} className="login">
              <FaUser /> <p>login/signup</p>
            </Link>
          ) : (
            <UserButton />
          )}
        </li>
      </ul>
    </div>
  );
};

export default Links;
