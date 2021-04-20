import axios from "axios";
import "../css/post.css";
import { Carousel } from "react-bootstrap";
import Comment from "../components/Comment";
import React, { useState, useEffect } from "react";

export default function Post({ location }) {
  const [post, setPost] = useState(location.data);
  console.log(location.data);

  useEffect( async () => {
    let data = await axios
      .get(`http://localhost:5500/api/post/post=${post.id}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
       setPost(data);
  }, []);

  return (
    <div>
      <div className="container-fluid">
        <div className="mt-5">" "</div>
        <div className="row justify-content-center ">
          <div className="col-8 p-0 shadow" id="main-bg">
            <Carousel>
              {post.images.map((image) => (
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={`http://localhost:5500/${image.imagePath}`}
                    alt="First slide"
                  />
                </Carousel.Item>
              ))}
            </Carousel>
            <div className="row  m-0">
              <div className="col-12 nav-bg d-flex rounded-bottom justify-content-end text-light">
                <nav>
                  <h3 className="mt-4 p-2"></h3>
                </nav>
              </div>
              <div className="col-12 border-bottom">
                <h2 className="title pl-1 pt-2">{post.title}</h2>
                <h5 className="location pl-1 pt-3">{`${post.location.continent} / ${post.location.country} / ${post.location.address}`}</h5>
              </div>
              <div className="col-12">
                <p className="p-2 text-md-start">{post.content}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row m-5"></div>
        <div className="row justify-content-center">
          <div className="col-8 p-0 shadow">
            <h4 className="title ml-3 pt-2">Comments <span className="comments-subtitle ml-2">GlobaL-TraveL</span></h4>
            <Comment />
            <Comment />
            <Comment />
            <Comment />
          </div>
        </div>
        <button onClick={() => console.log(post)}>Click</button>
      </div>
    </div>
  );
}
