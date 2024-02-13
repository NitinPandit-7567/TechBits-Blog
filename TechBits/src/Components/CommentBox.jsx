
import { Input, Avatar, InputAdornment, InputLabel } from '@mui/material';
import getInitials from '../utils/getInitials'
import { getUserData } from '../utils/UserData';
import { useState } from 'react'
import { useNavigate } from 'react-router';
import { commentSubmit } from '../utils/commentHandler';
import errorHandler from '../utils/errorHandler';
export default function CommentBox({ postId, setError }) {
    const [comment, setComment] = useState({ comment: '' })
    const navigate = useNavigate()
    function handleChange(evt) {
        const value = evt.target.value
        const field = evt.target.id;
        return setComment(currentData => { return { [field]: value } })
    }
    return (<div className='CommentBox'>
        <form onSubmit={(evt) => {
            return commentSubmit(evt, postId, comment).then((res) => {
                if (!res.error) {
                    return window.location.reload();
                } else {
                    return navigate(errorHandler(res, setError))
                }
            })
        }}>
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
