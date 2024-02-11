import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import Tags from '../Components/Tags';
import { Button, ButtonGroup } from '@mui/material';
import convertDate from '../utils/convertDate'
import { getUserData } from '../utils/UserData';
import { fetchPost } from '../utils/handlePost'
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import '../styles/ViewPost.css'
export default function ViewPost({ isLoggedIn }) {
    const { id } = useParams()
    const [isAuthor, setIsAuthor] = useState(false)
    const [post, setPost] = useState({ title: 'Title', summary: 'Summary', content: 'Content', tags: [], author: '', date: 'mm-dd-yy' })
    const navigate = useNavigate();
    useEffect(() => {
        fetchPost(id).then((res) => {
            console.log(res)
            if (!res.error) {
                setPost({ ...res.post })
                if (isLoggedIn) {
                    const user = getUserData()
                    if (user.username === post.author.username) {
                        setIsAuthor(true)
                    }
                }
            }
        })
    }, [isLoggedIn])

    return (
        <div className="viewPost">
            <div className='post-view'>
                <div className="postDetails-view">
                    <span><PersonIcon fontSize='small' />{post.author.username}</span>
                    <span><CalendarMonthIcon fontSize='small' />{convertDate(post.createdAt)} </span>
                </div>
                <h1>{post.title}</h1>
                <p>{post.summary}</p>
                <div className='content-view' dangerouslySetInnerHTML={{ __html: post.content }}></div>
                <br></br>
                <h3>Tags:</h3>
                <Tags tags={post.tags} />
                <br></br>
                {isAuthor && <ButtonGroup variant="contained" aria-label="Basic button group" size="small">
                    <Button color='warning' id='edit' href={`/edit/${post._id}`}>Edit</Button>
                    <Button color='error' id='delete' type='submit' onClick={() => {
                        const res = handleDelete(evt, id); if (!res.error) {
                            return navigate('/')
                        }
                    }}>Delete</Button>
                </ButtonGroup>}
            </div ></div>)
}