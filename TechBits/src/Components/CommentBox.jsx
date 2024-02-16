
import { Input, Avatar, InputAdornment, InputLabel } from '@mui/material';
import getInitials from '../utils/getInitials'
import { getUserData } from '../utils/UserData';
import { useState } from 'react'
import { useNavigate } from 'react-router';
import { commentSubmit } from '../utils/commentHandler';
import errorHandler from '../utils/errorHandler';
export default function CommentBox({ postId, setComments, setError }) {
    const [commentBox, setCommentBox] = useState({ comment: '' })
    const navigate = useNavigate()
    function handleChange(evt) {
        const value = evt.target.value
        const field = evt.target.id;
        return setCommentBox(currentData => { return { [field]: value } })
    }
    return (<div className='CommentBox'>
        <form onSubmit={(evt) => {
            commentSubmit(evt, postId, commentBox).then((res) => {
                if (!res.error) {
                    setComments((currentData)=>{return [...currentData,res.comment]})
                    setCommentBox({comment: ''})
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
                value={commentBox.comment}
                required
                fullWidth
                onChange={handleChange}
            />
        </form>
    </div>)
}
