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