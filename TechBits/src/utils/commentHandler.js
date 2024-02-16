export async function commentDelete(id) {
  const response = await fetch(`http://localhost:3000/comments/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
}

export async function commentSubmit(evt, id, comment) {
  evt.preventDefault();
  const response = await fetch(`http://localhost:3000/comments/${id}/new`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });
  return await response.json();
}
