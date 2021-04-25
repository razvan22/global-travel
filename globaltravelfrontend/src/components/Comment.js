import React from 'react'
import "../css/comment.css";

export default function Comment() {
    return (
      <div>
        <div className="row w-75 m-3 p-0 border border-secondary  rounded comment shadow-lg align-items-center">
          <div className="col-12 comment-bg border">
            <div className="row p-0 m-0">
              <div className="col-12 border-bottom comment-author p-0 m-0">
                <i className="bi bi-chat-dots"></i>
                <span> Razvan-Petru</span>
                <span className="ml-3" id="date">
                  2021-03-21
                </span>
              </div>
              <div className="col-12 comment-text p-0 m-0">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Velit omnis animi et iure laudantium vitae, praesentium optio,
                  sapiente distinctio illo?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
