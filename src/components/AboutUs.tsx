import React from "react";
import Container from "./Container";
import Image from "next/image";

const AboutUs = () => {
  return (
    <section className="about">
      <Container>
        <div className="info">
          <h3>Know more about us!</h3>
          <p>Frequent Questions Who we are? Partner Program Help & Support</p>
        </div>
        <div className="details">
          <div className="details-title">
            <h4>How does Order.UK work?</h4>
            <h5>What payment methods are accepted?</h5>
            <h5>Can I track my order in real-time?</h5>
            <h5>Are there any special discounts orpromotions available?</h5>
            <h5>Is Order.UK available in my area?</h5>
          </div>
          <div className="details-info">
            <div>
              <h5>Place an Order!</h5>
              <Image
                alt=""
                width={50}
                height={50}
                loading="lazy"
                src="/order-food.png"
              />
              <p>Place order through ourwebsite or Mobile app</p>
            </div>
            <div>
              <h5>Track Progress</h5>
              <Image
                alt=""
                width={50}
                height={50}
                loading="lazy"
                src="/food.png"
              />
              <p>Your can track your orderstatus with delivery time</p>
            </div>
            <div>
              <h5>Place an Order!</h5>
              <Image
                alt=""
                width={50}
                height={50}
                loading="lazy"
                src="/order-food.png"
              />
              <p>Place order through ourwebsite or Mobile app</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutUs;
