
import { Input, Avatar, InputAdornment, InputLabel } from '@mui/material';
import getInitials from '../utils/getInitials'
import { getUserData } from '../utils/UserData';
import { useState } from 'react'
import { useNavigate } from 'react-router';

export default function CommentBox({ postId }) {
    const [comment, setComment] = useState({ comment: '' })
    const navigate = useNavigate()
    function handleChange(evt) {
        const value = evt.target.value
        const field = evt.target.id;
        return setComment(currentData => { return { [field]: value } })
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        console.log(`http://localhost:3000/comments/${postId}/new`)
        const response = await fetch(`http://localhost:3000/comments/${postId}/new`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment)
        })
        const res = await response.json();
        console.log(res)
        if (!res.error) {
            return window.location.reload();
        }
    }
    return (<div className='CommentBox'>
        <form onSubmit={handleSubmit}>
            <InputLabel htmlFor="comment">
                Add a new comment
            </InputLabel>
            <Input
                id="comment"
                startAdornment={
                    <InputAdornment position="start">
                        <Avatar sx={{ width: 24, height: 24, fontSize: 'small' }}>{getInitials(getUserData())}</Avatar>
                    </InputAdornment>
                }
                value={comment.comment}
                required
                fullWidth
                onChange={handleChange}
            />
        </form>
    </div>)
}
