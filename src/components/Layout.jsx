import React from "react";
import Navbar from "./navigation/Navbar";
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