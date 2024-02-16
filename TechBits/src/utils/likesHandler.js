export default async function likeHandler(evt, likes, post_id, setError) {
  const id = evt.target.parentNode.id || evt.target.id;     //getting id of like icon that was clicked
  if (id === "like" || id === "dislike") {                 //check if id is like/dislike
    const data = id === "like" ? true : false;             //convert id to boolean
    if (likes._id) {                                       //checking if like_id is present, if present send update/delete request else create new like
      if (data !== likes.isLiked) {                        //if like is not requal to previous like, send update/PATCH request else send DELETE request
        const response = await fetch(
          `http://localhost:3000/likes/${likes._id}`,
          {
            method: "PATCH",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ like: data }),
          }
        );
        return await response.json();
      } else {
        const response = await fetch(
          `http://localhost:3000/likes/${likes._id}`,
          {
            method: "DELETE",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        return await response.json();
      }
    } else {
      const response = await fetch(
        `http://localhost:3000/likes/${post_id}/new`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ like: data }),
        }
      );
      return await response.json();
    }
  }
}
