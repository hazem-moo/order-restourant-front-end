import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"} className="brand">
      <Image width={130} height={30} src="/logo1.png" alt="" loading="lazy" />
    </Link>
  );
};

export default Logo;
