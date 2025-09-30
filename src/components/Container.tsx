import { ChildrenProps } from "@/utils/types";
import React from "react";

const Container = ({ children }: ChildrenProps) => {
  return <div className="container">{children}</div>;
};

export default Container;
