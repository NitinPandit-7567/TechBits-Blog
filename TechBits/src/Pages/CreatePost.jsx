import { useState } from 'react'
import Editor from "../Components/Editor"
import { TextField } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import TagEditor from '../Components/TagEditor';
import PostSubmitter from '../Components/PostSubmiter';
export default function CreatePost({ isLoggedIn }) {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();
    if (!isLoggedIn) {
        return <Navigate to={'/login'} />
    }
    async function handleSubmit(evt) {
        evt.preventDefault();
        const status = evt.target.id;
        const formData = { title, summary, content, tags, status }
        const response = await fetch('http://localhost:3000/posts/new', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        const res = await response.json();
        console.log(res)
        if (!res.error) {
            return navigate('/')
        }
    }
    return (<div className='createWrapper'>
        <h1>Write</h1>
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
            <PostSubmitter handleSubmit={handleSubmit} />
        </form>
    </div >)
}