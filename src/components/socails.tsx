import Image from "next/image";
import React from "react";
import Logo from "./Logo";
import Container from "./Container";

const Socails = () => {
  return (
    <Container>
      <section className="solails">
        <Image
          alt=""
          width={300}
          height={300}
          loading="lazy"
          src={"/ordet.png"}
        />
        <div className="info">
          <div>
            <Logo />
            <h2>ing is more</h2>
          </div>
          <div>
            <h3>Personalised</h3>
            <h3>& Instant</h3>
          </div>
          <p>Download the Order.uk app for faster ordering</p>
          <div className="app">
            <Image
              alt=""
              loading="lazy"
              width={100}
              height={30}
              src={"/google.png"}
            />
            <Image
              alt=""
              loading="lazy"
              width={100}
              height={30}
              src="/appel.png"
            />
          </div>
        </div>
      </section>
    </Container>
  );
};

export default Socails;
