"use client";
import Container from "@/components/Container";
import Links from "@/components/Links";
import Logo from "@/components/Logo";
import React, { useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const date = new Date(document.lastModified).toLocaleString();
      setTime(date);
    }
  }, []);

  return (
    <footer className="footer">
      <Container>
        <div className="info">
          <Logo />
          <Links open={false} />
        </div>
        <div className="socail">
          <FaFacebook />
          <FaYoutube />
          <FaInstagram />
        </div>
        <div className="time">
          <h3>&copy;: hazem mohamed</h3>
          <h5>last update: {time}</h5>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
