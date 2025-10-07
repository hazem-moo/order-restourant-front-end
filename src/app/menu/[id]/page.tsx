import { GetMenu } from "@/utils/FUNC";
import { IdProps, PropsGetMenus } from "@/utils/types";
import Details from "./Details";
import Similar from "./Similar";
import RandomMenu from "@/components/RandomMenu";

const page = async ({ params }: IdProps) => {
  const id = Number(params.id);
  const data: PropsGetMenus[] = await GetMenu();

  const menu = data.filter((el) => el.id === id);

  const similar = data.filter(
    (el) => el.category === menu[0].category && el.id !== menu[0].id
  );

  const menuList = menu.map((el) => (
    <Details
      key={el.id}
      id={el.id}
      name={el.name}
      img={el.img}
      price={el.price}
      description={el.description}
      quantity={el.quantity}
    />
  ));
  return (
    <>
      {menuList}
      <Similar data={similar} />
      <RandomMenu />
    </>
  );
};

export default page;
