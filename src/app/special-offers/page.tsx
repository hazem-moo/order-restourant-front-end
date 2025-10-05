import Container from "@/components/Container";
import { GetMenu } from "@/utils/FUNC";
import { PropsGetMenus } from "@/utils/types";
import Image from "next/image";
import { FaMotorcycle } from "react-icons/fa";
import { FaFileCircleCheck } from "react-icons/fa6";

const Offers = async () => {
  const menus: PropsGetMenus[] = await GetMenu();
  console.log(menus);
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
      </Container>
    </section>
  );
};

export default Offers;
