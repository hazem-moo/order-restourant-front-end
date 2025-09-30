import Container from "@/components/Container";
import { PropsSimilar } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Similar = ({ data }: PropsSimilar) => {
  const category = data.map((el) => (
    <Link href={``} key={el.id} className="flex">
      <Image
        alt=""
        width={120}
        height={100}
        loading="lazy"
        src={el.img?.url ?? ""}
      />
      <h3>{el.name}</h3>
    </Link>
  ));
  return (
    <section className="similar">
      <Container>
        <h2>menu similar</h2>
        <div className="grid">{category}</div>
      </Container>
    </section>
  );
};

export default Similar;
