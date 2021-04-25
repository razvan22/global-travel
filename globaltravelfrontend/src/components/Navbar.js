import "../css/nav.css";
import UserMenu from "./UserMenu";
import {Link} from "react-router-dom";
import React,{useContext} from "react";
import AnonymousMenu from "./AnonymousMenu";
import { UserContext } from "../global-context/UserContext";

export default function Navbar() {
  const {user, setUser} = useContext(UserContext);

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
              aria-expanded="false">
              <i className="bi bi-box-arrow-in-down"></i>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            {user == null ? <AnonymousMenu /> : <UserMenu/>}
            </ul>
          </div>
          <Link to="/">
            <h1 className="nav-text text-light ml-lg-5">GlobaL TraveL</h1>
          </Link>
        </div>
      </nav>
      <div className="mb-5 h-25">
      </div>
    </div>
  );
}