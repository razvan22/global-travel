import axios from "axios";
import "../css/register.css";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";


export default function RegisterView(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(false);

  function redirectToHome(){
      props.history.push("/login")
  }

  function register() {
     
    if (isValid == true) {
      let user = {
        name: name,
        email: email,
        password: password,
      };
      axios
        .post("http://localhost:5500/api/user", user, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "application/json",
          },
        })
        .then((res) => {
          
        })
        .catch((err) => console.log(err));
        redirectToHome();
    }
  }

  function checkEmail(e) {
    let email = e.target.value;
    setEmail(email);
    console.log("Email: ", email);

    let emailElement = document.getElementsByClassName("email-field");
    emailElement[0].classList.remove("is-invalid");

    axios
      .get(`http://localhost:5500/api/user/check=${email}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "application/json",
        },
      })
      .then((res) => {
        if (res.data === false) {
          let emailElement = document.getElementsByClassName("email-field");
          let registerButton = document.getElementById("register-button");
          registerButton.disabled = true;
          emailElement[0].classList.add("is-invalid");
          setIsValid(false);
        } else {
          let registerButton = document.getElementById("register-button");
          registerButton.disabled = false;
          setIsValid(true);
        }
      })
      .catch((err) => console.log(err));
  }

  function clearFormText() {
    let inputElements = document.getElementById("register-form").children;
    for (let element of inputElements) {
      element.value = "";
    }
  }

  return (
    <div>
      <div className="container-fluid register-body d-flex flex-column  align-items-center">
        <h2 className="display-3 p-5">GlobaL TraveL</h2>
        <div className="container form-container rounded text-white">
          <h3 className="text-center display-4 pb-2">Register</h3>
          <div className="row justify-content-center pb-2 ">
            <form className="col-12 col-md-6" id="register-form">
              <input
                type="text"
                className="form-control mb-3"
                id="formGroupExampleInput"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                className="form-control mb-3 email-field"
                id="formGroupExampleInput"
                placeholder="Email"
                onChange={checkEmail}
              />
              <div className="invalid-feedback mb-2">
                Email already in use !
              </div>
              <input
                type="password"
                className="form-control mb-3"
                id="formGroupExampleInput"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                className="form-control mb-3"
                id="formGroupExampleInput"
                placeholder="Confirm Password"
              />
            </form>
            <div className="col-12 d-flex justify-content-center m-4">
              <button
                type="submit"
                id="register-button"
                className="rounded btn-primary border-0 pl-4 pr-4"
                onClick={register}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
