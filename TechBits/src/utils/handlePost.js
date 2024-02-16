//function to send DELETE request to the post API with the post ID
export async function handleDelete(evt, id) {
  evt.preventDefault();
  const response = await fetch(`http://localhost:3000/posts/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
}

//function to send PATCH request to the post API with the formData
export async function handleEditSubmit(evt, id, data) {
  evt.preventDefault();
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("summary", data.summary);
  formData.append("content", data.content);
  formData.append("tags", JSON.stringify(data.tags));
  formData.append("status", data.status);
  formData.append("image", data.image.image);
  formData.append(
    "deleteImage",
    JSON.stringify({
      image: data.image.oldImage,
      toDelete: data.image.toDelete,
    })
  );
  const response = await fetch(`http://localhost:3000/posts/${id}`, {
    method: "PATCH",
    credentials: "include",
    body: formData,
  });
  return await response.json();
}

//function to send POST request to the post API with the formData
export async function handleCreateSubmit(evt, data) {
  evt.preventDefault();
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("summary", data.summary);
  formData.append("content", data.content);
  formData.append("tags", JSON.stringify(data.tags));
  formData.append("status", data.status);
  formData.append("image", data.image.image);
  const response = await fetch("http://localhost:3000/posts/new", {
    method: "POST",
    credentials: "include",
    body: formData,
  });
  return await response.json();
}

//function to send GET request to the post API to fetch all posts
export async function getAllPosts(index = 1) {
  const response = await fetch(
    `http://localhost:3000/posts/all?page=${index}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return await response.json();
}

//function to send GET request to the post API to fetch user posts
export async function getMyPosts(index = 1) {
  const response = await fetch(
    `http://localhost:3000/posts//myposts?page=${index}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return await response.json();
}
