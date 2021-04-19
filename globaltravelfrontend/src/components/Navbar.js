import "../css/nav.css";
import React from "react";
import {Link} from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar nav-bg fixed-top">
        <div className="container-fluid">
          <div className="dropdown mr-4">
            <button
              className="btn dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi bi-person-circle "></i>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <Link to="/register" className="dropdown-item">
                Register
              </Link>
              <Link to="/login" className="dropdown-item">
                Login
              </Link>
            </ul>
          </div>
          <Link to="/">
            <h1 className="nav-text text-light ml-lg-5">GlobaL TraveL</h1>
          </Link>
        </div>
      </nav>
      <div className="mb-5 h-25">
        <h1 className=""></h1>
      </div>
    </div>
  );
}