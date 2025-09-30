import { GetMenu } from "@/utils/FUNC";
import { PropsGetMenus } from "@/utils/types";
import React from "react";
import Container from "./Container";
import Link from "next/link";
import Image from "next/image";

const RandomMenu = async () => {
  const data: PropsGetMenus[] = await GetMenu();
  const random = [...data.sort(() => Math.random() - 0.5)].slice(0, 6);
  const ranndomList = random.map((el) => (
    <Link href={`/menu/${el.id}`} className="flex" key={el.id}>
      <Image
        alt=""
        width={120}
        height={120}
        loading="lazy"
        src={el.img?.url.trim() ?? ""}
      />
      <h4>{el.name}</h4>
      <p>{el.category}</p>
    </Link>
  ));
  return (
    <section className="ranndom-menu">
      <Container>
        <h2>Random menu</h2>
        <div className="grid">{ranndomList}</div>
      </Container>
    </section>
  );
};

export default RandomMenu;
