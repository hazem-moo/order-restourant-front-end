import React, { use } from "react";
import { PropsGetMenus } from "@/utils/types";
import Link from "next/link";
import Image from "next/image";
import Container from "./Container";
import { GetMenu } from "../app/api/FUNC";

const Categorys = () => {
  const data: PropsGetMenus[] = use(GetMenu());

  const category = data.reduce((arr: PropsGetMenus[], item: PropsGetMenus) => {
    const el = arr.find((p) => p.category === item.category);
    if (!el) arr.push({ ...item });
    return arr;
  }, []);

  const categoryList = category.map((el) => (
    <Link
      href={`/categories/${el.category?.replace("%0", "_")}`}
      key={el.id}
      className="flex"
    >
      <Image
        alt=""
        width={100}
        height={100}
        loading="lazy"
        src={el.bannar?.url ? `${el.bannar?.url}` : ""}
      />
      <h3>{el.category}</h3>
    </Link>
  ));
  return (
    <section className="category">
      <Container>
        <h2>Order.uk Popular Categories 🤩</h2>
        <div className="grid">{categoryList}</div>
      </Container>
    </section>
  );
};

export default Categorys;
