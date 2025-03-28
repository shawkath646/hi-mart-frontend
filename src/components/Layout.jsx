import React from "react";
import Navbar from "./navigation/navbar";
import Footer from "./navigation/footer";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}