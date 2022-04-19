import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

const NavBar = () => {
  return (
    <React.Fragment>
      <ul className="nav nav-tabs justify-content-center">
        <li className="nav-item">
          <a className="nav-link disabled">Vidly</a>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/home/">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/movies/">
            Movies
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/customers/">
            Customers
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/rentals/">
            Rentals
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/login/">
            Login
          </NavLink>
        </li>
      </ul>
    </React.Fragment>
  );
};

export default NavBar;
