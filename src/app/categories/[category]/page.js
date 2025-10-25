export const dynamic = "force-dynamic"; // 🔥 يخلي الصفحة دايمًا تتحدث

import Container from "@/components/Container";
import Image from "next/image";
import Link from "next/link";
import { GetMenu } from "../../../utils/FUNC";

const Page = async ({ params }) => {
  const { category } = params;
  const data = await GetMenu();
  const categoryList = data.filter((el) => el.category === category);

  return (
    <section className="categories">
      <Container>
        <div className="grid">
          {categoryList.map((el) => (
            <Link href={`/menu/${el.id}`} className="flex" key={el.id}>
              <Image
                alt={el.name ?? ""}
                width={270}
                height={300}
                src={el.img?.url?.trim() ?? ""}
              />
              <h3>{el.name}</h3>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Page;
