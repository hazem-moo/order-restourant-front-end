import AboutUs from "@/components/AboutUs";
import Categorys from "@/components/Categorys";
import Home from "@/components/Home";
import RandomMenu from "@/components/RandomMenu";
import Socails from "@/components/socails";

const HomePage = () => {
  return (
    <main>
      <Home />
      <Categorys />
      <Socails />
      <AboutUs />
      <RandomMenu />
    </main>
  );
};

export default HomePage;
