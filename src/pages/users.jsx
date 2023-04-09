import React from "react";
import { Navbar } from "../componentes/navBar";
import './style.css';
import  Login  from "../componentes/login";


export const Users = () => {
  return (
      <div>
      <section className="Home">
        <Navbar />
      </section>
      <div className="inicio">
      <Login />
      </div>
      </div>
  );
}

