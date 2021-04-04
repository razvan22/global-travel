import React from "react";
import "../css/nav.css";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar nav-bg">
        <div className="container-fluid d-flex flex-row">
          <h1 className="text-light align-self-center text-center">GlobaL TraveL</h1>
          <i className="text-light">Menu</i>
          <span className="badge text-dark bg-light">7</span>
        </div>
      </nav>
    </div>
  );
}