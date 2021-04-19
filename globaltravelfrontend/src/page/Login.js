import React from "react";
import "../css/login.css";

export default function Login() {
  return (
    <div className="login-container">
      <div className="container-fluid ">
        <h2 className="display-3 text-center p-5 ">GlobaL TraveL</h2>
        <div className="row justify-content-center">
          <form className="col-12 col-md-6 d-flex flex-column align-items-center rounded form-body">
            <h4 className="display-4 text-center text-white m-5">Log in</h4>
            <input type="email" className="m-3 form-control w-50" placeholder="email" />
            <input type="password" className="m-3 form-control w-50" placeholder="password" />
            <button className="m-3 pl-4 pr-4 rounded login-button mb-5">Log in</button>
          </form>
        </div>
      </div>
    </div>
  );
}
