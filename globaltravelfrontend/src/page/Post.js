import axios from "axios";
import "../css/post.css";
import Comment from "../components/Comment";
import React, { useState, useEffect } from "react";
import { Carousel, Spinner } from "react-bootstrap";

export default function Post({ location} , props) {
  const [post, setPost] = useState(location.data);
  const [spinner, setSpinner] = useState(true);


  useEffect( async () => {
    let data = await axios
      .get(`http://localhost:5500/api/post/post=${location.pathname.split('/')[2]}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
      if(data != null || data == undefined){
       setPost(data);
       setSpinner(false)
      }
      
  }, []);


return spinner == true ? (
  <div className="container-fluid h-100">
    <div className="row d-flex justify-content-center align-items-center" id="spinner">
      <Spinner animation="grow"  role="status" >
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  </div>
) : (
  <div>
    <div className="container-fluid ">
      <div className="pt-5">

      </div>
      <div className="row justify-content-center ">
        <div className="col-8 p-0 shadow" id="main-bg">
          <Carousel>
            {post.images.map((image) => (
              <Carousel.Item key={image.id}>
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
      <div className="row justify-content-center mb-5">
        <div className="col-8 p-0 shadow">
          <h4 className="title ml-3 pt-2">
            Comments
            <span className="comments-subtitle ml-2">GlobaL-TraveL</span>
          </h4>
          { post.comments.length > 0 ? 
          (post.comments.map( (comment) => <Comment key={comment.id} comment={comment}/> ))
          :
          (<div className="ml-3"> <h6 className="text-mute">....</h6></div>) 
          }
        </div>
      </div>
    </div>
  </div>
);
}
