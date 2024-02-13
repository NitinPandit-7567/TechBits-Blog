export default async function likeHandler(evt, likes, post_id) {

    if (evt.target.id === 'like' || evt.target.id === 'dislike') {
        const data = (evt.target.id === 'like') ? true : false;
        if (likes._id) {
            console.log(data)
            if (data !== likes.isLiked) {
                const response = await fetch(`http://localhost:3000/likes/${likes._id}`, {
                    method: "PATCH",
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ "like": data })
                })
                const res = await response.json();
                if (!res.error) {
                    return window.location.reload();
                }
            }
            else {
                const response = await fetch(`http://localhost:3000/likes/${likes._id}`, {
                    method: "DELETE",
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const res = await response.json();
                if (!res.error) {
                    return window.location.reload();
                }
            }
        } else {
            console.log('create', post_id)
            const response = await fetch(`http://localhost:3000/likes/${post_id}/new`, {
                method: "POST",
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "like": data })
            })
            const res = await response.json();
            if (!res.error) {
                return window.location.reload();
            }
        }
    }

}