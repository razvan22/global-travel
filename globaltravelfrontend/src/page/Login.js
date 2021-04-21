import React from "react";
import axios from "axios";
import "../css/login.css";

export default function Login(props) {


async function login(){
}

 async function springLogin() {
      const credentials =
        "username=" +
        encodeURIComponent("anastasia@gmail.com") +
        "&password=" +
        encodeURIComponent("password");

      let response = await fetch("http://localhost:3001/rest/login", {
        method: "POST",
        redirect: "manual",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: credentials,
      });
      console.log("CREDEN",credentials);
      
      console.log(response)
      if (response.status==500) {

        window.confirm("Inloggningen misslyckades");
      } else {
        console.log("RESPONSE", response);
        
       console.log("SUCCESS");
       
      }
  }


  return (
    <div className="login-container">
      <div className="container-fluid ">
        <h2 className="display-3 text-center p-5 ">GlobaL TraveL</h2>
        <div className="row justify-content-center">
          <form className="col-12 col-md-6 d-flex flex-column align-items-center rounded form-body">
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
            >
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
