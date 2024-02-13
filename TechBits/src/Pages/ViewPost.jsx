import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { Button, ButtonGroup } from '@mui/material';
import { getUserData } from '../utils/UserData';
import { fetchPost } from '../utils/fetchData'
import { handleDelete } from '../utils/handlePost';
import Tags from '../Components/Tags';
import Comments from '../Components/Comments';
import Likes from '../Components/Likes';
import PersonIcon from '@mui/icons-material/Person';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import convertDate from '../utils/convertDate'
import '../styles/ViewPost.css'
export default function ViewPost({ isLoggedIn }) {
    const { id } = useParams()
    const [isAuthor, setIsAuthor] = useState(false)
    const [post, setPost] = useState({ title: 'Title', summary: 'Summary', content: 'Content', tags: [], author: '', date: 'mm-dd-yy' })
    const navigate = useNavigate();
    useEffect(() => {
        fetchPost(id).then((res) => {
            if (!res.error) {
                setPost({ ...res.post })
                if (isLoggedIn) {
                    const user = getUserData()
                    if (user.username === res.post.author.username) {
                        setIsAuthor(true)
                    }
                }
            }
        })
    }, [])

    return (
        <div className="viewPost">
            <div className='post-view'>
                <h1>{post.title}</h1>
                <div className="postDetails-view">
                    <span><PersonIcon fontSize='small' />{post.author.username}</span>
                    <span><CalendarMonthIcon fontSize='small' />{convertDate(post.createdAt)} </span>
                </div>
                <br></br>
                {isAuthor &&
                    <div className='postEditButtons'> <ButtonGroup variant="contained" aria-label="Basic button group" size="small">
                        <Button color='warning' id='edit' href={`/edit/${post._id}`}><EditNoteIcon fontSize='small' />Edit</Button>
                        <Button color='error' id='delete' type='submit' onClick={(evt) => {
                            handleDelete(evt, id).then((res) => {
                                if (!res.error) {
                                    return navigate('/')
                                }
                            })
                        }}>
                            Delete <DeleteIcon fontSize='small' />
                        </Button>
                    </ButtonGroup>
                    </div>
                }
                <br></br>
                <p>{post.summary}</p>
                <div className='content-view' dangerouslySetInnerHTML={{ __html: post.content }}></div>
                {post.tags.length > 0 &&
                    <>
                        <h3>Tags:</h3>
                        <Tags tags={post.tags} />
                    </>
                }
            </div >
            <Likes post={post} />
            <Comments id={post._id} post={post} isLoggedIn={isLoggedIn} />
        </div>)
}