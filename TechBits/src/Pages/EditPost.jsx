import { useEffect, useState } from 'react'
import Editor from "../Components/Editor"
import { TextField, CircularProgress, LinearProgress } from '@mui/material';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { fetchPost } from '../utils/fetchData'
import TagEditor from '../Components/TagEditor';
import PostSubmitter from '../Components/PostSubmiter';
import { handleEditSubmit } from '../utils/handlePost';
import { getUserData } from '../utils/UserData';
import errorHandler from '../utils/errorHandler';
export default function EditPost({ isLoggedIn, setError }) {
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
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitLoading, setIsSubmitLoading] = useState(false)
    const navigate = useNavigate();
    useEffect(() => {
        fetchPost(id).then((res) => {
            if (!res.error) {
                if (user.username === res.post.author.username) {
                    setTitle(res.post.title);
                    setSummary(res.post.summary);
                    setContent(res.post.content);
                    setTags(res.post.tags);
                    setStatus(res.post.status)
                    setIsLoading(false)
                }
                else {
                    setIsLoading(false)
                    return navigate('/')
                }
            } else {
                return navigate(errorHandler(res, setError))
            }
        })
    }, [])

    return (<div className='createWrapper'>
        {isLoading ? <CircularProgress /> : <>
            {isSubmitLoading && <LinearProgress />}
            <h1>Edit</h1>
            <form onSubmit={(evt) => {
                setIsSubmitLoading(true)
                handleEditSubmit(evt, id, { post: { title, summary, content, tags, status } }).then((res) => {
                    if (!res.error) {
                        setIsSubmitLoading(false)
                        return navigate(`/view/${id}`)
                    }
                    else {
                        return navigate(errorHandler(res, setError))
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
        </>}
    </div >)
}