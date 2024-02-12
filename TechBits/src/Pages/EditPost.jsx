import { useEffect, useState } from 'react'
import Editor from "../Components/Editor"
import { TextField } from '@mui/material';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { fetchPost } from '../utils/handlePost'
import TagEditor from '../Components/TagEditor';
import PostSubmitter from '../Components/PostSubmiter';
import { handleEditSubmit } from '../utils/handlePost';
import { getUserData } from '../utils/UserData';
export default function EditPost({ isLoggedIn }) {
    const user = getUserData()
    const [isAuthor, setIsAuthor] = useState(false)
    if (!isLoggedIn) {
        return <Navigate to={'/login'} />
    }
    const { id } = useParams()
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetchPost(id).then((res) => {
            if (!res.error) {
                if (user.username === res.post.author.username) {
                    console.log(user.username, res.post.author.username)
                    setIsAuthor(true)
                }
                else {
                    return navigate('/')
                }
                setTitle(res.post.title);
                setSummary(res.post.summary);
                setContent(res.post.content);
                setTags(res.post.tags);
            }
        })
    }, [])

    return (<div className='createWrapper'>
        <h1>Edit</h1>
        <form>
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
            <PostSubmitter handleSubmit={(evt) => {
                handleEditSubmit(evt, id, { post: { title, summary, content, tags, status: (evt.target.id) } }).then((res) => {
                    console.log(res)
                    if (!res.error) {
                        return navigate(`/view/${id}`)
                    }
                })
            }} />
        </form>
    </div >)
}