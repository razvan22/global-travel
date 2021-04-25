import React, {useContext} from 'react'
import { Link } from "react-router-dom";
import { UserContext } from "../global-context/UserContext";


export default function UserMenu() {
  const { user, setUser } = useContext(UserContext);

  function logout(){
        setUser(null);
  }  

    return (
      <div>
        <li className="dropdown-item">
          <a>
            <i className="bi bi-person"></i> {user.name}
          </a>
        </li>
        <Link to="/publish" className="dropdown-item">
          <i className="bi bi-journal-plus"></i> Publish
        </Link>
        <Link to="/" className="dropdown-item" onClick={logout}>
          <i className="bi bi-box-arrow-in-left"></i> Logout
        </Link>
      </div>
    );
}
