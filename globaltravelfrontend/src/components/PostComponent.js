import axios from 'axios';
import "../css/post-component.css";
import { Link } from "react-router-dom";
import getTime from '../methods/GetTime'; 
import {PageUpdate} from "../global-context/UpdateContext";
import { UserContext } from "../global-context/UserContext";
import React, { useContext, useState, useEffect } from "react";
import { CalculatePostRating} from "../methods/PostRating.js";

export default function PostComponent({ postObj }) {

  let id = postObj.id;
  const [post, setPost] = useState(postObj);
  const [comment, setComment] = useState({
    comment:     '',
    authorName:  '',
    commentDate: '',
    post:{ id:   post.id}
  });
  const { user, setUser } = useContext(UserContext);
  const { update, setUpdate} = useContext(PageUpdate);

  async function updateComments(){
  await axios
    .get(`http://localhost:5500/api/post/post=${post.id}`)
    .then((res)=> {
      if(res.status === 200 ){
        setPost(res.data)
      }
    })
    .catch((err) => err);  
  }

  async function commentToPost(){
    comment.commentDate = getTime();
    comment.authorName = user.name
    let inputField = document.getElementById(`comment-input-field${post.id}`);
    await axios
        .post("http://localhost:5500/api/post/comment", comment, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          if(res.status === 200){
            updateComments();
            inputField.value = "";
            comment.commentDate = null;
            comment.comment = "";
          }
        } )
        .catch((error) => error);
  }



  return (
    <div>
      <div className="container mb-5">
        <div className="row justify-content-center mt-5 pt-4">
          <div className="col-11 col-md-9 p-0 shadow post-body mt-4">
            <div className="card">
              <img
                src={`http://localhost:5500/${post.images[0].imagePath}`}
                className="card-img-top img-fluid"
              />
              <h5 className="rounded-circle text-center pt-3 rating-number align-self-end ">
                {CalculatePostRating(post.ratings) === 0
                  ? "N/A"
                  : CalculatePostRating(post.ratings)}
              </h5>
              <h6 className="align-self-end pr-5 pt-0 pb-0 m-0 publisher-name">
                <i className="bi bi-person-fill"> </i>- {post.author.name}
              </h6>
              <div className="card-body pt-0 pl-5">
                <Link
                  className="post-link"
                  to={{
                    pathname: `/post/${post.id}`,
                    data: post,
                  }}
                >
                  <h2 className="card-title pb-2">{post.title}</h2>
                  <h5 className="location mb-4">
                    <i className="bi bi-geo-alt-fill"> </i>{" "}
                    {post.location.continent + "/" + post.location.country}
                  </h5>
                  <p className="card-text pb-3">{post.content}</p>
                </Link>
                <div className="border-top">
                  <h6 className="pt-2 info">
                    <i className="bi bi-clock"></i> {post.postDate}
                    <span id="comment-collapse">
                      <i
                        className="bi bi-chat-text ml-5"
                        data-bs-toggle="collapse"
                        href={`#collapseExample${id}`}
                        role="button"
                        aria-expanded="false"
                        aria-controls={`collapseExample${id}`}
                      >
                        {" "}
                      </i>
                      <span
                        className="pl-2"
                        data-bs-toggle="collapse"
                        href={`#collapseExample${id}`}
                        role="button"
                        aria-expanded="false"
                        aria-controls={`collapseExample${id}`}
                      >
                        {post.comments.length}
                      </span>
                    </span>
                  </h6>
                  {post.comments.length > 0 ? (
                    <div>
                      <div
                        className="collapse border rounded mt-4 comment-section"
                        id={`collapseExample${id}`}
                      >
                        {post.comments.map((comment) => (
                          <div
                            className=" w-50 border m-3 shadow comment-bg"
                            key={comment.id}
                          >
                            <div className=" pl-2 border-bottom text-body ">
                              {comment.authorName}
                              <span className="text-muted date pl-5 ml-5">
                                {comment.commentDate}
                              </span>
                            </div>
                            <p className="p-1 m-0 text-muted comment-content">
                              {comment.comment}
                            </p>
                          </div>
                        ))}
                        {user != null ? (
                          <div className="input-group p-3 w-75 mt-5">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="comment..."
                              aria-label="Username"
                              aria-describedby="basic-addon1"
                              id={`comment-input-field${post.id}`}
                              onChange={(e) =>
                                (comment.comment = e.target.value)
                              }
                            />
                            <button
                              onClick={commentToPost}
                              className="border rounded bg-primary border-start-0"
                              type="button"
                              id="button-addon2"
                            >
                              <i className="bi bi-reply"></i>
                            </button>
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div
                        className="collapse border rounded mt-4 comment-section"
                        id={`collapseExample${id}`}
                      >
                        {user != null ? (
                          <div className="input-group p-3 w-75 mt-5">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="comment..."
                              aria-label="Username"
                              aria-describedby="basic-addon1"
                              id={`comment-input-field${post.id}`}
                              onChange={(e) =>
                                (comment.comment = e.target.value)
                              }
                            />
                            <button
                              onClick={(e) => {
                                commentToPost();
                              }}
                              className="border rounded bg-primary border-start-0"
                              type="button"
                              id="button-addon2"
                            >
                              <i className="bi bi-reply"></i>
                            </button>
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
