import { useEffect, useState } from 'react'
import Editor from "../Components/Editor"
import { TextField } from '@mui/material';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { fetchPost } from '../utils/fetchData'
import TagEditor from '../Components/TagEditor';
import PostSubmitter from '../Components/PostSubmiter';
import { handleEditSubmit } from '../utils/handlePost';
import { getUserData } from '../utils/UserData';
export default function EditPost({ isLoggedIn }) {
    const user = getUserData()
    if (!isLoggedIn) {
        return <Navigate to={'/login'} />
    }
    const { id } = useParams()
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState([]);
    const [status, setStatus] = useState('')
    const navigate = useNavigate();
    useEffect(() => {
        fetchPost(id).then((res) => {
            if (!res.error) {
                if (user.username === res.post.author.username) {
                    console.log(user.username, res.post.author.username)
                    setTitle(res.post.title);
                    setSummary(res.post.summary);
                    setContent(res.post.content);
                    setTags(res.post.tags);
                    setStatus(res.post.status)
                }
                else {
                    return navigate('/')
                }
            }
        })
    }, [])

    return (<div className='createWrapper'>
        <h1>Edit</h1>
        <form onSubmit={(evt) => {
            handleEditSubmit(evt, id, { post: { title, summary, content, tags, status } }).then((res) => {
                console.log(res)
                if (!res.error) {
                    return navigate(`/view/${id}`)
                }
            })
        }}>
            <h3>Title:</h3>
            <TextField
                id="title"
                label="Title"
                value={title}
                onChange={ev => setTitle(ev.target.value)}
                fullWidth
            />
            <br></br>
            <br></br>
            <h3>Summary</h3>
            <TextField
                id="summary"
                label="Summary"
                value={summary}
                onChange={ev => setSummary(ev.target.value)}
                fullWidth
            />
            <br></br>
            <br></br>
            <h3>Content</h3>
            <Editor value={content} onChange={setContent} />
            <br></br>
            <TagEditor tags={tags} setTags={setTags} />
            <br></br>
            <PostSubmitter setStatus={setStatus} />
        </form>
    </div >)
}