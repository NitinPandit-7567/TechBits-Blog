import { useState, useEffect } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { IconButton } from "@mui/material";
import likeHandler from "../utils/likesHandler";
import { fetchLikes } from "../utils/fetchData";
import errorHandler from "../utils/errorHandler";
import { useNavigate } from "react-router";
export default function Likes({ post, setError }) {
  const navigate = useNavigate();
  const [likes, setLikes] = useState({ likeCount: 0, dislikeCount: 0 });
  useEffect(() => {
    fetchLikes(post._id).then((res) => {
      if (!res.error) {
        if (res.likeCount || res.dislikeCount) {
          return setLikes({ ...res });
        }
      } else {
        return navigate(errorHandler(res, setError));
      }
    });
  }, [post]);

  let likeIcon = <ThumbUpOffAltIcon fontSize="small" id="like" />;
  let dislikeIcon = <ThumbDownOffAltIcon id="dislike" />;
  if (likes.isLiked !== undefined) {
    if (likes.isLiked) {
      likeIcon = <ThumbUpIcon fontSize="small" id="like" />;
    } else {
      dislikeIcon = <ThumbDownIcon fontSize="small" id="dislike" />;
    }
  }
  return (
    <div className="likesWrapper">
      <div className="postLikes">
        <span>
          <IconButton
            sx={{ marginRight: "2px" }}
            id="like"
            onClick={(evt) => {
              likeHandler(evt, likes, post._id, setError).then((res) => {
                if (!res.error) {
                  if (likes.isLiked === undefined) {
                    setLikes((currentData) => {
                      return {
                        ...currentData,
                        _id: res._id,
                        likeCount: currentData.likeCount + 1,
                        isLiked: true,
                        
                      };
                    });
                  } else {
                    if(likes.isLiked){
                        setLikes(currentData=>{
                        return{
                        dislikeCount: currentData.dislikeCount,
                        likeCount: currentData.likeCount - 1}})
                    }else
                    {
                    setLikes((currentData) => {
                      return {
                        ...currentData,
                        likeCount: currentData.likeCount + 1,
                        dislikeCount: currentData.dislikeCount - 1,
                        isLiked: true,
                      };
                    });
                    }
                  }
                } else {
                  return navigate(errorHandler(res, setError));
                }
              });
            }}
          >
            {likeIcon}
          </IconButton>{" "}
          {likes.likeCount}
          <IconButton
            sx={{ marginRight: "5px", marginLeft: "5px" }}
            id="dislike"
            onClick={(evt) => {
              likeHandler(evt, likes, post._id, setError).then((res) => {
                if (!res.error) {
                  if (likes.isLiked === undefined) {
                    setLikes((currentData) => {
                      return {
                        ...currentData,
                        _id: res._id,
                        dislikeCount: currentData.dislikeCount + 1,
                        isLiked: false,
                      };
                    });
                  } else {
                    if (likes.isLiked) {
                      setLikes((currentData) => {
                        return {
                          ...currentData,
                          likeCount: currentData.likeCount - 1,
                          dislikeCount: currentData.dislikeCount + 1,
                          isLiked: false,
                        };
                      });
                    }else{
                        setLikes((currentData) => {
                            return {
                              likeCount:currentData.likeCount,
                              dislikeCount: currentData.dislikeCount - 1
                            };
                          });
                    }
                  }
                } else {
                  return navigate(errorHandler(res, setError));
                }
              });
            }}
          >
            {dislikeIcon}
          </IconButton>{" "}
          {likes.dislikeCount}
        </span>
      </div>
    </div>
  );
}
