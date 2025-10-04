/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import React from "react";

const TotalMenus = ({ data, category }: any) => {
  const dataList = category
    .filter((cat: any) => cat)
    .map((cat: any) => (
      <div key={cat} className="offer-menu">
        <h2>{cat}</h2>
        <div className="grid">
          {data
            .filter((el: any) => el.category === cat)
            .map((item: any) => (
              <Link href={`/menu/${item.id}`} className="flex" key={item.id}>
                <Image
                  alt={`${item.name}`}
                  width={120}
                  height={100}
                  loading="lazy"
                  src={item.img?.url ? item.img.url.trim() : ""}
                />
                <h3>{item.name}</h3>
              </Link>
            ))}
        </div>
      </div>
    ));

  return <>{dataList}</>;
};

export default TotalMenus;
