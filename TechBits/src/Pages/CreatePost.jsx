import { useState } from 'react'
import Editor from "../Components/Editor"
import { TextField, LinearProgress } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import TagEditor from '../Components/TagEditor';
import { handleCreateSubmit } from '../utils/handlePost';
import PostSubmitter from '../Components/PostSubmiter';
import errorHandler from '../utils/errorHandler'
export default function CreatePost({ isLoggedIn, setError }) {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState([]);
    const [status, setStatus] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();
    if (!isLoggedIn) {
        return <Navigate to={'/login'} />
    }

    return (
        <div className='createWrapper'>
            {isLoading && <LinearProgress />}
            <h1>Write</h1>
            <form onSubmit={(evt) => {
                const formData = { title, summary, content, tags, status }
                setIsLoading(true)
                handleCreateSubmit(evt, formData).then((res) => {
                    if (!res.error) {
                        setIsLoading(false)
                        return navigate(`/view/${res.id}`)
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
                    required
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