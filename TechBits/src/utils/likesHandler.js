export default async function likeHandler(evt, likes, post_id, setError) {
    if (evt.target.id === 'like' || evt.target.id === 'dislike') {
        const data = (evt.target.id === 'like') ? true : false;
        if (likes._id) {
            if (data !== likes.isLiked) {
                const response = await fetch(`http://localhost:3000/likes/${likes._id}`, {
                    method: "PATCH",
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ "like": data })
                })
                return await response.json();
            }
            else {
                const response = await fetch(`http://localhost:3000/likes/${likes._id}`, {
                    method: "DELETE",
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                return await response.json();
            }
        } else {
            const response = await fetch(`http://localhost:3000/likes/${post_id}/new`, {
                method: "POST",
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "like": data })
            })
            return await response.json();
        }
    }

}