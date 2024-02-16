import Tags from "./Tags";
import Date from "./Date";
import CommentIcon from "@mui/icons-material/Comment";
import PersonIcon from "@mui/icons-material/Person";
import { CircularProgress, IconButton } from "@mui/material";
import React, { Suspense } from "react";
const Likes = React.lazy(() => import("./Likes"));
export default function PostCard({ post, setError, isLoggedIn}) {
  return (
    <div key={"post" + post._id} id={post._id} className="postCard">
      <div className="postCover">
        <img
          src={
            post.image === undefined
              ? "../../blog-cover-picture.png"
              : post.image !== ""
              ? post.image
              : "../../blog-cover-picture.png"
          }
          alt="Cover-Image"
        />
      </div>
      <div className="postContent">
        <a href={`/view/${post._id}`} className="postLink">
          <div className="postInfo">
            {post.status ? (
              <span className="status">
                <span className={`status-${post.status}`}></span>
                {post.status[0].toUpperCase() + post.status.substr(1)}
              </span>
            ) : (
              <span>
                <PersonIcon fontSize="small" /> {post.author.username}
              </span>
            )}
            <Date date={post.createdAt} />
          </div>
          <h3 key={"title" + post._id}>{post.title}</h3>
          <p key={"summary" + post._id}>{post.summary}</p>
          <span>
            <Tags tags={post.tags} />
          </span>
        </a>
        <div className="post-details">
          <span>
            {post.commentsCount > 0 && post.commentsCount}
            <IconButton sx={{ marginRight: "10px", marginLeft: "5px" }} href={`/view/${post._id}`}>
            <CommentIcon
              fontSize="small"
            />
            </IconButton>
          </span>
          <Suspense
            fallback={
              <div>
                <CircularProgress sx={{ marginTop: "20px" }} />
              </div>
            }
          >
            <div className="card-likes">
              <Likes post={post} setError={setError} isLoggedIn={isLoggedIn}/>
            </div>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
