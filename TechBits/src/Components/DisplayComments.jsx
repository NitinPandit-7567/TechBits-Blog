
import { Avatar } from '@mui/material';
import getInitials from '../utils/getInitials'
import { getUserData } from '../utils/UserData';
import convertDate from '../utils/convertDate';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom'
export default function DisplayComments({ comments }) {
    const user = { name: comments.author.name.first + ' ' + comments.author.name.last }
    const isAuthor = comments.author.username === getUserData().username;
    const navigate = useNavigate()
    async function handleDelete(evt) {
        const id = evt.target.parentNode.id
        if (id) {
            const response = await fetch(`http://localhost:3000/comments/${id}`, {
                method: 'DELETE',
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
    }
    return (<div className='displayCommentsWrapper'>
        <Avatar sx={{ width: 44, height: 44, fontSize: 'large' }}>{getInitials(user)}</Avatar>
        <div className="comment">
            <p className='commentDetails'>{isAuthor ? 'You' : comments.author.username} <span className='commentDate'>{convertDate(comments.createdAt)}</span></p>
            <p className='commentContent'>{comments.comment}</p>
        </div>
        {isAuthor && <div className="commentDelete">
            <IconButton id={comments._id} aria-label="delete" size="small" onClick={(evt) => { handleDelete(evt) }}>
                <DeleteIcon fontSize="inherit" id={comments._id} />
            </IconButton>
        </div>}
    </div >)
}