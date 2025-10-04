"use client";
import Container from "@/components/Container";
import { GetMenu } from "@/utils/FUNC";
import { PropsGetMenus } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaMotorcycle } from "react-icons/fa";
import { FaFileCircleCheck } from "react-icons/fa6";

const Offers = () => {
  const [category, setCategory] = useState<string[]>([]);
  const [data, setData] = useState<PropsGetMenus[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const allData: PropsGetMenus[] = await GetMenu();
      console.log(allData);
      setData(allData);
      const uniqueCategory = Array.from(
        new Set(data.map((el) => el.category))
      ).filter(Boolean) as string[];
      setCategory(uniqueCategory);
    };
    fetchData();
  }, [data]);

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

  console.log(data);

  return (
    <section className="special-offers">
      <Container>
        <div className="special-offers-info">
          <div className="title">
            <p>I`m lovin it!</p>
            <h3>McDonald’s East London</h3>
            <div>
              <div>
                <FaFileCircleCheck />
                <p>Minimum Order: 12 GBP</p>
              </div>
              <div>
                <FaMotorcycle />
                <p>Delivery in 20-25 Minutes</p>
              </div>
            </div>
          </div>
          <div className="img">
            <Image
              alt=""
              width={290}
              height={300}
              loading="lazy"
              src={"/purger.png"}
            />
            <Image
              alt=""
              width={100}
              height={100}
              loading="lazy"
              src={"/price.png"}
            />
          </div>
        </div>
        {dataList}
      </Container>
    </section>
  );
};

export default Offers;
