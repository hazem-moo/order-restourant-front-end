import Image from "next/image";
import React from "react";

const Home = () => {
  return (
    <section className="home">
      <div className="overlay"></div>
      <div className="home-info">
        <p>Order Restaurant food, takeaway and groceries.</p>
        <h2>Feast Your Senses,</h2>
        <span>Fast and Fresh</span>
        <div>
          <p>Enter a postcode to see what we deliver</p>
          <form>
            <input type="search" placeholder="e.g. EC4R 3TE" />
            <span>search</span>
          </form>
        </div>
      </div>
      <div className="home-img">
        <Image
          alt=""
          width={300}
          height={250}
          loading="lazy"
          src={"/home.png"}
        />
        <div className="details">
          <div>
            <h5>order</h5>
            <p>We’ve Received your order!</p>
            <p>Awaiting Restaurant acceptance</p>
          </div>
          <div className="info">
            <h5>order</h5>
            <p>We’ve Received your order!</p>
            <p>Awaiting Restaurant acceptance</p>
          </div>
          <div className="info">
            <h5>order</h5>
            <p>We’ve Received your order!</p>
            <p>Awaiting Restaurant acceptance</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
