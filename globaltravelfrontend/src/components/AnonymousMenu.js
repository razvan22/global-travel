import React from 'react';
import { Link } from "react-router-dom";


export default function AnonymousMenu() {
    return (
      <div>
        <Link to="/login" className="dropdown-item">
          <i className="bi bi-box-arrow-in-right pr-2"> </i> Login
        </Link>
        <Link to="/register" className="dropdown-item">
          <i className="bi bi-person-plus pr-2"></i> Sign Up
        </Link>
      </div>
    );
}
