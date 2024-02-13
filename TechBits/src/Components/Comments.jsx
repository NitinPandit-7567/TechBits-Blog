import CommentBox from '../Components/CommentBox';
import { useState, useEffect } from 'react'
import DisplayComments from './DisplayComments';
import { fetchComments } from '../utils/fetchData';
import errorHandler from '../utils/errorHandler';
export default function Comments({ post, isLoggedIn, setError }) {
    const [comments, setComments] = useState('')
    useEffect(() => {
        fetchComments(post._id).then((res) => {
            if (!res.error) {
                if (res.comments.length > 0) {
                    return setComments(res.comments)
                }
            }
            else {
                return navigate(errorHandler(res, setError))
            }
        })
    }, [post])
    return (
        <div className="commentsWrapper">
            {isLoggedIn &&
                <div className="postComments">
                    <h3>{comments.length > 0 ? comments.length : ''} Comments:</h3>
                    <div className="newComment">
                        <CommentBox postId={post._id} setComments={setComments} setError={setError} />
                    </div>
                </div>
            }
            <div className="postComments">
                <div className="allComments">
                    {!isLoggedIn && <h3>{comments.length > 0 ? (`${comments.length} Comments:`) : ''}</h3>}
                    {comments.length > 0 && comments.map((el, i) => {
                        return <DisplayComments comments={el} key={i.toString() + '_' + comments._id} setError={setError} />
                    })}
                </div>
            </div>
        </div>
    )
}