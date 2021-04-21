import React, { useEffect, useState } from "react";
import axios from "axios";
import PostComponent from "../components/PostComponent";

export default function HomeView() {
  const [postList, setList] = useState([]);

  useEffect(async () => {
    let data = await axios
      .get("http://localhost:8080/api/post")
      .then((res) => {
        setList([]);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    setList(data);
  }, []);

function login() {
  axios
    .get("http://localhost:8080/api/user/whoami")
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

async function springLogin() {
  const credentials =
    "username=" +
    encodeURIComponent("anastasia@gmail.com") +
    "&password=" +
    encodeURIComponent("password");

  let response = await fetch("http://localhost:8080/rest/login", {
    method: "POST",
    redirect: "manual",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: credentials,
  });
  console.log("CREDEN", credentials);

  console.log(response);
  if (response.status == 500) {
    window.confirm("Inloggningen misslyckades");
  } else {
    console.log("RESPONSE", response);

    console.log("SUCCESS");
  }
}


  return (
    <div>
      <section>
        {postList.map((post) => (
          <PostComponent post={post} key={post.id} />
        ))}
      </section>
      <button
        onClick={() => {
          springLogin();
          login();
        }}
      >
        springLogin
      </button>
    </div>
  );
}
