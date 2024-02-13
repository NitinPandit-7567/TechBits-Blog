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


export async function handleEditSubmit(evt, id, formData) {
    evt.preventDefault();
    console.log(evt.target.id)
    console.log(formData)
    const response = await fetch(`http://localhost:3000/posts/${id}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    return await response.json();
}

export async function handleCreateSubmit(evt, formData) {
    evt.preventDefault();
    const response = await fetch('http://localhost:3000/posts/new', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
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