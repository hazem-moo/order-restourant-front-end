"use client";

import Container from "@/components/Container";
import Links from "@/components/Links";
import Logo from "@/components/Logo";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";

const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const toggle = () => setOpen(!open);

  return (
    <Container>
      <nav className="navbar">
        <Logo />
        <Links open={open} />
        <button className="toggler" onClick={toggle}>
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </nav>
    </Container>
  );
};

export default Navbar;
