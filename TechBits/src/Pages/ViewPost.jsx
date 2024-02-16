import React, { useState, useEffect, Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, ButtonGroup, CircularProgress } from "@mui/material";
import { getUserData } from "../utils/UserData";
import { fetchPost } from "../utils/fetchData";
import { handleDelete } from "../utils/handlePost";
import Tags from "../Components/Tags";
const Comments = React.lazy(() => import("../Components/Comments"));
const Likes = React.lazy(() => import("../Components/Likes"));
import PersonIcon from "@mui/icons-material/Person";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import convertDate from "../utils/convertDate";
import LinearProgress from "@mui/material/LinearProgress";
import "../styles/ViewPost.css";
import errorHandler from "../utils/errorHandler";
export default function ViewPost({ isLoggedIn, setError, setBanner }) {
  const { id } = useParams();
  const [isAuthor, setIsAuthor] = useState(false);
  const [post, setPost] = useState({
    title: "Title",
    summary: "Summary",
    content: "Content",
    tags: [],
    author: "",
    date: "mm-dd-yy",
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  //Loading data on render by making a GET request to the post API with the post ID
  useEffect(() => {
    fetchPost(id).then((res) => {
      if (!res.error) {
        setIsLoading(false);
        setPost({ ...res.post });
        if (isLoggedIn) {
          const user = getUserData();
          if (user.username === res.post.author.username) {
            setIsAuthor(true);
          }
        }
      } else {
        return navigate(errorHandler(res, setError));
      }
    });
  }, []);

  return (
    <div className="viewPost">
      {isLoading ? (
        <LinearProgress />
      ) : (
        <>
          <div className="post-view">
            <div className="post-Image">
              <img
                src={
                  post.image === undefined
                    ? "../../blog-cover-picture.png"
                    : post.image !== ""
                    ? post.image
                    : "../../blog-cover-picture.png"
                }
              ></img>
            </div>
            <h1>{post.title}</h1>
            <div className="postDetails-view">
              <span>
                <PersonIcon fontSize="small" />
                {post.author.username}
              </span>
              <span>
                <CalendarMonthIcon fontSize="small" />
                {convertDate(post.createdAt)}{" "}
              </span>
            </div>
            <br></br>
            {isAuthor && ( //if author, render edit and delete buttons and display post status
              <div className="postEditButtons">
                {" "}
                <ButtonGroup
                  variant="contained"
                  aria-label="Basic button group"
                  size="small"
                >
                  <Button color="warning" id="edit" href={`/edit/${post._id}`}>
                    <EditNoteIcon fontSize="small" />
                    Edit
                  </Button>
                  <Button
                    color="error"
                    id="delete"
                    type="submit"
                    onClick={(evt) => {
                      handleDelete(evt, id).then((res) => {
                        if (!res.error) {
                          setBanner("Post deleted successfully!");
                          return navigate("/");
                        } else {
                          return navigate(errorHandler(res, setError));
                        }
                      });
                    }}
                  >
                    Delete <DeleteIcon fontSize="small" />
                  </Button>
                </ButtonGroup>
                <span className="status">
                  <span className={`status-${post.status}`}></span>
                  {post.status[0].toUpperCase() + post.status.substr(1)}
                </span>
              </div>
            )}
            <br></br>
            <p>{post.summary}</p>
            <div
              className="content-view"
              dangerouslySetInnerHTML={{ __html: post.content }}
            ></div>
            {post.tags.length > 0 && (
              <>
                <h3>Tags:</h3>
                <Tags tags={post.tags} />
              </>
            )}
          </div>
        </>
      )}
      {/* Lazy Loading likes and comments components */}
      <Suspense
        fallback={
          <div>
            <CircularProgress sx={{ marginTop: "20px" }} />
          </div>
        }
      >
        <div className="likesWrapper">
          <div className="view-likes">
            <Likes post={post} setError={setError} isLoggedIn={isLoggedIn} />
          </div>
        </div>
        <Comments
          id={post._id}
          post={post}
          isLoggedIn={isLoggedIn}
          setError={setError}
        />
      </Suspense>
    </div>
  );
}
