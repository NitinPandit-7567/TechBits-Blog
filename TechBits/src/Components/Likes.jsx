
import { useState, useEffect } from 'react'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { IconButton } from '@mui/material';
import likeHandler from '../utils/likesHandler';
export default function Likes({ post, isLoggedIn }) {
    const [likes, setLikes] = useState({ likeCount: 0, dislikeCount: 0 })
    useEffect(() => {
        async function fetchLikes(id) {
            const response = await fetch(`http://localhost:3000/likes/${id}`, {
                method: "GET",
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const res = await response.json();
            if (!res.error) {
                if (res.likeCount || res.dislikeCount) {
                    return setLikes({ ...res })
                }
            }
        }
        fetchLikes(post._id)
    }, [post])

    let likeIcon = <ThumbUpOffAltIcon fontSize='small' id='like' />
    let dislikeIcon = <ThumbDownOffAltIcon id='dislike' />
    if (likes.isLiked !== undefined) {
        if (likes.isLiked) {
            likeIcon = <ThumbUpIcon fontSize='small' id='like' />
        }
        else {
            dislikeIcon = <ThumbDownIcon fontSize='small' id='dislike' />
        }
    }

    return (
        <div className="likesWrapper">
            <div className="postLikes">
                <span>
                    <IconButton sx={{ marginRight: '2px' }} id='like' onClick={(evt) => { likeHandler(evt, likes, post._id) }}>
                        {likeIcon}
                    </IconButton> {(likes.likeCount)}
                    <IconButton sx={{ marginRight: '5px', marginLeft: '5px' }} id='dislike' onClick={(evt) => { likeHandler(evt, likes, post._id) }}>
                        {dislikeIcon}
                    </IconButton> {(likes.dislikeCount)}
                </span>
            </div>
        </div>
    )
}