import Container from "@/components/Container";
import { GetMenu } from "@/utils/FUNC";
import { PropsGetMenus } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import { FaMotorcycle } from "react-icons/fa";
import { FaFileCircleCheck } from "react-icons/fa6";

const Offers = async () => {
  const menus: PropsGetMenus[] = await GetMenu();
  const category = new Set(menus.map((el) => el.category).filter(Boolean));

  const menuList = Array.from(category)
    .filter((cats) => cats)
    .map((cats) => (
      <div key={cats} className="offer-menu">
        <h2>{cats}</h2>
        <div className="grid">
          {menus
            .filter((item) => item.category === cats)
            .map((el) => (
              <Link href={`/menu/${el.id}`} className="flex" key={el.id}>
                <Image
                  alt={`${el.name}`}
                  width={120}
                  height={100}
                  loading="lazy"
                  src={el.img?.url ? el.img.url.trim() : ""}
                />
                <h3>{el.name}</h3>
              </Link>
            ))}
        </div>
      </div>
    ));

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
        {menuList}
      </Container>
    </section>
  );
};

export default Offers;
