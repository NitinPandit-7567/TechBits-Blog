import CommentBox from '../Components/CommentBox';
import { useState, useEffect } from 'react'
import DisplayComments from './DisplayComments';

export default function Comments({ post, isLoggedIn }) {
    const [comments, setComments] = useState('')
    useEffect(() => {
        async function fetchComments(id) {
            const response = await fetch(`http://localhost:3000/comments/${id}/all`, {
                method: "GET",
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const res = await response.json();
            if (!res.error) {
                if (res.comments.length > 0) {
                    return setComments(res.comments)
                }
            }
        }
        fetchComments(post._id)
    }, [post])
    return (
        <div className="commentsWrapper">
            {isLoggedIn &&
                <div className="postComments">
                    <h3>{comments.length > 0 ? comments.length : ''} Comments:</h3>
                    <div className="newComment">
                        <CommentBox postId={post._id} setComments={setComments} />
                    </div>
                </div>
            }
            <div className="postComments">
                <div className="allComments">
                    {!isLoggedIn && <h3>{comments.length > 0 ? comments.length : ''} Comments:</h3>}
                    {comments.length > 0 && comments.map((el, i) => {
                        return <DisplayComments comments={el} key={i.toString() + '_' + comments._id} />
                    })}
                </div>
            </div>
        </div>
    )
}