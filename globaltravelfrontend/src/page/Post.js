import axios from "axios";
import "../css/post.css";
import getTime from "../methods/GetTime";
import Comment from "../components/Comment";
import { Carousel, Spinner } from "react-bootstrap";
import { UserContext } from "../global-context/UserContext";
import React, { useState, useEffect, useContext } from "react";
import {
  CalculatePostRating,
  getNumberOfStars,
} from "../methods/PostRating.js";

export default function Post({ location }) {
  const [hover, setHover] = useState(null);
  const [rating, setRating] = useState(null);
  const [spinner, setSpinner] = useState(true);
  const [post, setPost] = useState(location.data);
  const { user, setUser } = useContext(UserContext);
  const [comment, setComment] = useState({
    comment: "",
    authorName: "",
    commentDate: "",
    post: { id: "" },
  });

  async function postReview() {
    const rate = {
      author: { id: user.id },
      rating: rating,
      post: { id: post.id },
    };

    await axios
      .post("http://localhost:5500/api/post/rate", rate)
      .then((res) =>{
        if(res.status === 200){
          updatePost();
          setRating(null);
        }
      })
      .catch((err) => err);
  }
  
  function checkIfAlreadyRated(){
   return post.ratings.find( rating => rating.author.id == user.id);
  }

  async function updatePost() {
    await axios
      .get(`http://localhost:5500/api/post/post=${post.id}`)
      .then((res) => {
        if (res.status === 200) {
          setPost(res.data);
        }
      })
      .catch((err) => err);
  }

  async function commentToPost() {
    comment.commentDate = getTime();
    comment.authorName = user.name;
    comment.post.id = post.id;
    let inputField = document.getElementById(`comment-input-field${post.id}`);

    await axios
      .post("http://localhost:5500/api/post/comment", comment, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        if (res.status === 200) {
          updatePost();
          inputField.value = "";
          comment.commentDate = null;
          comment.comment = "";
        }
      })
      .catch((error) => error);
  }

  useEffect(async () => {
    let data = await axios
      .get(
        `http://localhost:5500/api/post/post=${location.pathname.split("/")[2]}`
      )
      .then((res) => {
        return res.data;
      })
      .catch((err) => err);
    if (data != null || data == undefined) {
      setPost(data);
      setSpinner(false);
    }
  }, []);

  return spinner == true ? (
    <div className="container-fluid h-100">
      <div
        className="row d-flex justify-content-center align-items-center"
        id="spinner"
      >
        <Spinner animation="grow" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    </div>
  ) : (
    <div>
      <div className="container-fluid ">
        <div className="pt-5"></div>
        <div className="row justify-content-center ">
          <div className="col-md-8 col-12 p-0 shadow" id="main-bg">
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
              <div className="col-12 col-md-8 mt-4 d-flex ">
                <p className="p-2 text-md-start">{post.content}</p>
              </div>
              <div className="col-12 col-md-4 mt-4">
                <div className="row d-flex align-items-center justify-content-center">
                  <div className="col-10 col-md-10 mb-4">
                    <div className="card border-default">
                      <div className="card-body ">
                        <div className="text-center">
                          <div className="d-inline align-baseline display-4 mr-1">
                            {CalculatePostRating(post.ratings) === 0
                              ? "NA"
                              : CalculatePostRating(post.ratings)}
                            <span className="full-rating"> /5</span>
                          </div>
                          <div className="align-baseline text-sm text-warning mr-1">
                            {[
                              ...Array(
                                Math.round(CalculatePostRating(post.ratings))
                              ),
                            ].map((star) => (
                              <i className="bi bi-star-fill"></i>
                            ))}
                          </div>
                        </div>
                        <div className="pt-1 text-center">
                          <div className="text-medium text-sm">
                            5 stars{" "}
                            <span className="text-muted">
                              - {getNumberOfStars(post.ratings).fiveStars}
                            </span>
                          </div>
                          <div className="text-medium text-sm">
                            4 stars{" "}
                            <span className="text-muted">
                              - {getNumberOfStars(post.ratings).fourStars}
                            </span>
                          </div>
                          <div className="text-medium text-sm">
                            3 stars{" "}
                            <span className="text-muted">
                              - {getNumberOfStars(post.ratings).threeStars}
                            </span>
                          </div>
                          <div className="text-medium text-sm">
                            2 stars{" "}
                            <span className="text-muted">
                              - {getNumberOfStars(post.ratings).twoStars}
                            </span>
                          </div>
                          <div className="text-medium text-sm">
                            1 stars{" "}
                            <span className="text-muted">
                              - {getNumberOfStars(post.ratings).oneStar}
                            </span>
                          </div>
                        </div>
                      </div>
                      {user != null ? (
                        <div>
                          {checkIfAlreadyRated() == undefined ? (
                            <div className="rating row d-flex justify-content-center">
                              <div className="col-12 d-flex justify-content-center ">
                                {[...Array(5)].map((star, index) => {
                                  const ratingValue = index + 1;
                                  return (
                                    <label>
                                      <input
                                        value={ratingValue}
                                        name="rating"
                                        type="radio"
                                        onClick={(e) => setRating(ratingValue)}
                                      />
                                      <i
                                        id="rating-stars"
                                        className="bi bi-star-fill p-1"
                                        onMouseEnter={() =>
                                          setHover(ratingValue)
                                        }
                                        onMouseLeave={() => setHover(null)}
                                        style={{
                                          color:
                                            ratingValue <= (hover || rating)
                                              ? "#ffc107"
                                              : "#e4e5e9",
                                        }}
                                      ></i>
                                    </label>
                                  );
                                })}
                              </div>
                              <div className="col-12 d-flex justify-content-center mb-2">
                                <button
                                  type="button"
                                  className="btn-warning rounded px-4"
                                  onClick={postReview}
                                >
                                  Leave a Review
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="col-12 d-flex justify-content-center mb-2">
                              <button
                                disabled
                                type="button"
                                className="btn-warning rounded px-2"
                              >
                               Already Reviewed
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="row"></div>
                      )}
                    </div>
                  </div>
                </div>
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
            {post.comments.length > 0 ? (
              post.comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))
            ) : (
              <div className="ml-3">
                <h6 className="text-mute">....</h6>
              </div>
            )}
            {user != null ? (
              <div className="input-group p-3 w-75 mt-5">
                <input
                  type="text"
                  className="form-control"
                  placeholder="comment..."
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  id={`comment-input-field${post.id}`}
                  onChange={(e) => (comment.comment = e.target.value)}
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
      </div>
    </div>
  );
}
