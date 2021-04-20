import React from "react";
import axios from "axios";
import "../css/login.css";

export default function Login(props) {

function login(){
  axios
    .get("http://localhost:5500/api/user/whoami")
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
       
  }

  return (
    <div className="login-container">
      <div className="container-fluid ">
        <h2 className="display-3 text-center p-5 ">GlobaL TraveL</h2>
        <div className="row justify-content-center">
          <form
            className="col-12 col-md-6 d-flex flex-column align-items-center rounded form-body"
            method="post"
            action="http://localhost:5500/login"
          >
            <h4 className="display-4 text-center text-white m-5">Log in</h4>
            <input
              type="text"
              name="username"
              className="m-3 form-control w-50"
              placeholder="email"
              required
            />
            <input
              type="password"
              className="m-3 form-control w-50"
              placeholder="password"
              name="password"
              required
            />
            <button
              className="m-3 pl-4 pr-4 rounded login-button mb-5"
              type="submit"
              onClick={login}
            >
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
