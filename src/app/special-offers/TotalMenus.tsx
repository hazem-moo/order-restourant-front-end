import Image from "next/image";
import Link from "next/link";
import React from "react";

const TotalMenus = ({ data, category }) => {
  const dataList = category
    .filter((cat) => cat)
    .map((cat) => (
      <div key={cat} className="offer-menu">
        <h2>{cat}</h2>
        <div className="grid">
          {data
            .filter((el) => el.category === cat)
            .map((item) => (
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
