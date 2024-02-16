import CommentBox from "../Components/CommentBox";
import { useState, useEffect } from "react";
import DisplayComments from "./DisplayComments";
import { fetchComments } from "../utils/fetchData";
import errorHandler from "../utils/errorHandler";
import { useNavigate } from "react-router-dom";
export default function Comments({ post, isLoggedIn, setError }) {
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchComments(post._id).then((res) => {
      if (!res.error) {
        if (res.status === 200) {
          if (res.comments.length > 0) {
            return setComments(res.comments);
          }
        } else if (res.status === 204) {
          return setComments([]);
        }
      } else {
        return navigate(errorHandler(res, setError));
      }
    });
  }, [post]);
  return (
    <div className="commentsWrapper">
      {/* Displaying comment box if user is logged in */}
      {isLoggedIn && (
        <div className="postComments">
          <h3>{comments.length > 0 ? comments.length : ""} Comments:</h3>
          <div className="newComment">
            <CommentBox
              postId={post._id}
              setComments={setComments}
              setError={setError}
            />
          </div>
        </div>
      )}
      <div className="postComments">
        <div className="allComments">
          {/* Checking if there are any comments to display the count */}
          {!isLoggedIn && (
            <h3>{comments.length > 0 ? `${comments.length} Comments:` : ""}</h3>
          )}
          {comments.length > 0
            ? comments.map((el, i) => {
                return (
                  <DisplayComments
                    comments={el}
                    key={i.toString() + "_" + comments._id}
                    setError={setError}
                    setComments={setComments}
                  />
                );
              })
            : "There are no comments yet."}
        </div>
      </div>
    </div>
  );
}
