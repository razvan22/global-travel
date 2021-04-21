import React from "react";
import "../css/post-component.css";
import { Link } from "react-router-dom";

export default function PostComponent({ post }) {

  

  return (
    <div>
      <div className="container">
        <div className="row justify-content-center mt-5 pt-4">
          <div className="col-11 col-md-9 p-0 shadow post-body mt-4">
            <div className="card">
              <img
                src={`http://localhost:3001/${post.images[0].imagePath}`}
                className="card-img-top img-fluid"
              />
              <h3 className="rounded-circle p-2 rating-number align-self-end">
                7.2
              </h3>
              <h6 className="align-self-end pr-5 pt-0 pb-0 m-0 publisher-name">
                <i className="bi bi-person-fill"> </i>- {post.author.name}
              </h6>
              <div className="card-body pt-0 pl-5">
                <Link
                  className="post-link"
                  to={{
                    pathname: `/post/${post.id}`,
                    data: post
                  }}
                >
                  <h2 className="card-title pb-2">{post.title}</h2>
                  <h5 className="location mb-4">
                    <i className="bi bi-geo-alt-fill"> </i>{" "}
                    {post.location.continent + "/" + post.location.country}
                  </h5>
                  <p className="card-text">{post.content}</p>
                </Link>
                <div className="border-top">
                  <h6 className="pt-2 info">
                    <i className="bi bi-clock"></i> {post.postDate}
                    <i className="bi bi-chat-text ml-5"></i> 23 comments
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
