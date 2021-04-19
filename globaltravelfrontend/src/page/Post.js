import axios from "axios";
import "../css/post.css";
import { Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";

export default function Post({ location }) {
  const [post, setPost] = useState(location.data);
  console.log(location.data);

  // useEffect(async () => {
  //   let data = await axios
  //     .get(`http://localhost:5500/api/post/post=${match.params.id}`)
  //     .then((res) => {
  //       return res.data;
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //      setPost(data);
  // }, []);

  return (
    <div>
      <div className="container-fluid">
        <div className="mt-5">" "</div>
        <div className="container">
          <div className="row">
            <div className="col">
              <Button />
              <button onClick={() => console.log(post)}>Click</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
