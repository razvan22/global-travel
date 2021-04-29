import React, { useState, useContext } from "react";
import axios from "axios";
import "../css/login.css";
import { UserContext } from "../global-context/UserContext";

export default function Login(props) {
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState({})
  const [password, setPassword] = useState({})

async function login(){
  const user = {
    email: email,
    password: password,
  };
  const response =  await axios
    .post("http://localhost:5500/user-login", user, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res)
    .catch((err) => err);
    
    if(response.status == 200){
      setUser(response.data)
      props.history.push(`/`);
    } else{
      showErrorMessage();
    }
}

function showErrorMessage(){
  
  const alert = document.getElementById('alert');
  alert.style.display = 'block';
  setTimeout(function () {
    alert.style.display = "none";
  }, 3000);
}




  return (
    <div className="login-container">
      <div className="container-fluid ">
        <h2 className="display-3 text-center p-5 ">GlobaL TraveL</h2>
        <div className="row justify-content-center">
          <form className="col-12 col-md-6 d-flex flex-column align-items-center rounded form-body">
            <h4 className="display-4 text-center text-white m-2">Log in</h4>
            <input
              type="text"
              name="username"
              className="m-3 form-control w-50"
              placeholder="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="m-3 form-control w-50"
              placeholder="password"
              name="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
            type="submit"
              className="m-3 pl-4 pr-4 rounded login-button mb-5"
              onClick={(e) => {
                e.preventDefault();
                login();
              }}
            >
              Log in
            </button>
            <div className="alert alert-danger" id="alert" role="alert">
              Check your username and password and try again !
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
