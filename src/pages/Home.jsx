import React from "react";
import { Navbar } from "../componentes/navBar";
import { Catalog } from "../componentes/Catalogo/Catalogo";


export const Home = () => {
  return (
      <section className="Home">
        <Navbar />
        <Catalog />
      </section>
  );
}

