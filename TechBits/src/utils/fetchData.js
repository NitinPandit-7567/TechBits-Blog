export async function fetchComments(id) {
    const response = await fetch(`http://localhost:3000/comments/${id}/all`, {
        method: "GET",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return await response.json();
}

export async function fetchPost(id) {
    const response = await fetch(`http://localhost:3000/posts/${id}`, {
        method: "GET",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return await response.json();
}

export async function fetchLikes(id) {
    const response = await fetch(`http://localhost:3000/likes/${id}`, {
        method: "GET",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return await response.json();
}