
import 'boxicons'
import React, { useState, useEffect } from 'react';
import iphone11 from './img/12.svg';
import iphone12 from './img/12.svg';
import iphone13 from './img/13.svg';
import iphone14 from './img/14.svg';
import iphone14pro from './img/14p.svg';
import './style.css';
import { Link } from 'react-router-dom';
import { Cart } from '../carrito';




export const Navbar = () => {
  const [showIphones, setShowIphones] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);

  
  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart"));
    if (cartItems) {
      setCartCount(cartItems.length);
    } else {
      setCartCount(0);
    }
  }, [cartOpen]);
  


  const handleIphoneClick = () => {
    setShowIphones(!showIphones);
  };

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
    setShowLinks(!showLinks);
  };
  return (
    <nav className="navbar">
      <div className="navbar__left">
        <Link to= "/" className="navbar__logo">
          Apple Store RC
        </Link>
      </div>
      <div className={`navbar__right ${showMenu ? "active" : ""}`}>
        <ul className={`navbar__links ${showLinks ? "" : "navbar__links--hidden"}`}>
          <div className="navbar__dropdown"></div>
          <li>
            <a href="# " className="navbar__btn" onClick={handleIphoneClick}>
              iPhone Nuevos
            </a>
          </li>
          <li>
            <a href=" ">iPhone Usados</a>
          </li>
          <li>
            <a href=" ">Plan Canje</a>
          </li>
          <li>
            <a href=" ">Nosotros</a>
          </li>
        </ul>
        <button className="navbar__menu-icon" onClick={handleMenuClick}>
          <box-icon color="white" name="menu"></box-icon>
        </button>
      </div>
      <div className='users'>
          <Link to='/users'>
          <box-icon color="white" name='user'></box-icon>
          </Link>
      <div className="cart" onClick={() => setCartOpen(!cartOpen)}>
          <box-icon color="white" name="cart"></box-icon>
          <span className="item__total">{cartCount}</span>
        </div>
        {cartOpen && <Cart />}
      </div>
      {showIphones && (
        <div className="iphone__dropdown">
          <div>
            <Link to="/iph11">
              <img src={iphone11} alt="iPhone 11" />
              <p>iPhone 11</p>
            </Link>
          </div>
          <div>
            <Link to="/iph12">
              <img src={iphone12} alt="iPhone 12" />
              <p>iPhone 12</p>
            </Link>
          </div>
          <div>
            <Link to="/iph13">
              <img src={iphone13} alt="iPhone 13" />
              <p>iPhone 13</p>
            </Link>
          </div>
          <div>
          <Link to="/iph14">
              <img src={iphone14} alt="iPhone 14" />
              <p>iPhone 14</p>
            </Link>
          </div>
          <div>
            <Link to="/iph14p">
              <img src={iphone14pro} alt="iPhone 14 Pro" />
              <p>iPhone 14 Pro</p>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
