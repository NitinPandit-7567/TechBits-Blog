export async function handleDelete(evt, id) {
    evt.preventDefault();
    const response = await fetch(`http://localhost:3000/posts/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return await response.json()

}


export async function handleEditSubmit(evt, id, data) {
    evt.preventDefault();
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('summary', data.summary);
    formData.append('content', data.content);
    formData.append('tags', JSON.stringify(data.tags));
    formData.append('status', data.status);
    formData.append('image', data.image.image);
    formData.append('deleteImage', JSON.stringify({ image: data.image.oldImage, toDelete: data.image.toDelete }));
    const response = await fetch(`http://localhost:3000/posts/${id}`, {
        method: 'PATCH',
        credentials: 'include',
        body: formData
    })
    return await response.json();
}

export async function handleCreateSubmit(evt, data) {
    evt.preventDefault();
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('summary', data.summary);
    formData.append('content', data.content);
    formData.append('tags', JSON.stringify(data.tags));
    formData.append('status', data.status);
    formData.append('image', data.image.image);
    const response = await fetch('http://localhost:3000/posts/new', {
        method: 'POST',
        credentials: 'include',
        body: formData
    })
    return await response.json();
}

export async function getAllPosts(index = 1, setData, setPages) {
    const response = await fetch(`http://localhost:3000/posts/all?page=${index}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    const res = await response.json();
    if (!res.error) {
        setData(currentData => { return res })
        setPages({ page: Number(res.page), totalPages: Number(res.pages) })
    }
    else {
        return false;
    }

}

export async function getMyPosts(index = 1, setData, setPages) {
    const response = await fetch(`http://localhost:3000/posts//myposts?page=${index}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    const res = await response.json();
    if (!res.error) {
        setData(currentData => { return res })
        setPages({ page: Number(res.page), totalPages: Number(res.pages) })
    }
    else {
        return false;
    }

}