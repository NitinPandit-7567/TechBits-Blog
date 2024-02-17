import { useEffect, useState } from "react";
import { Pagination, CircularProgress } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAllPosts } from "../utils/handlePost";
import PostCard from "../Components/PostCard";
import "../styles/home.css";
import errorHandler from "../utils/errorHandler";
export default function Home({ setError, isLoggedIn }) {
  let [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState({});
  const [pages, setPages] = useState({
    page: Number(searchParams.get("page")) || 1,
    totalPages: Number(data.pages) || 1,
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  function handleChange(evt, value) {
    setSearchParams({ page: value });
    return setPages((currentPage) => {
      return { ...currentPage, page: value };
    });
  }
  useEffect(() => {
    setIsLoading(true);
    getAllPosts(pages.page, setData, setPages).then((res) => {
      if (!res.error) {
        setData((currentData) => {
          return res;
        });
        setPages({ page: Number(res.page), totalPages: Number(res.pages) });
        setIsLoading(false);
      } else {
        navigate(errorHandler(res, setError));
      }
    });
  }, [searchParams]);
  return (
    <>
      <div className="home">
        {isLoading ? (
          <div className="loader">
            <CircularProgress />
          </div>
        ) : data && data.posts.length > 0 ? (
          <>
            <div className="allPosts">
              {data.posts.map((el) => {
                return (
                  <PostCard
                    key={el._id}
                    post={el}
                    setError={setError}
                    isLoggedIn={isLoggedIn}
                  />
                );
              })}
            </div>
            <div className="pagination">
              <Pagination
                count={pages.totalPages}
                page={pages.page}
                onChange={handleChange}
              />
            </div>
          </>
        ) : (
          <div className="noPosts">
            <h3>
              There are no posts yet. Create a new post{" "}
              <a href="/create">here!</a>
            </h3>
          </div>
        )}
      </div>{" "}
      :
    </>
  );
}
