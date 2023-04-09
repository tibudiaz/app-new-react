import React from "react";
import { Navbar } from "../componentes/navBar";
import './style.css';
import {Catalog} from "../componentes/Catalogo";
import Banner from "../componentes/banner";


export const Home = () => {
  return (
      <div>
      <section className="Home">
        <Navbar />
      </section>
      <Banner />
      <div className="inicio">

      </div>
      <Catalog />
      </div>
  );
}

