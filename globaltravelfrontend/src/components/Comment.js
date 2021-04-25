import React,{useState} from 'react'
import "../css/comment.css";

export default function Comment(props) {
    console.log("COMMENT PROPS : ", props);
    
    console.log(props.comment.commentDate);
    
    return (
      <div>
        <div className="row m-3 w-50  p-0 border rounded comment shadow-lg align-items-center">
          <div className="col-12 comment-bg border">
            <div className="row p-0 m-0 ">
              <div className="col-12 border-bottom comment-author p-0 m-0">
                <i className="bi bi-chat-dots"></i>
                <span className="pl-1"> { props.comment.authorName}</span>
                <span className="ml-3 text-muted" id="date">
                  {props.comment.commentDate}
                </span>
              </div>
              <div className="col-12 comment-text pt-1 m-0 p-0">
                <p>{props.comment.comment}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
