import { useState } from 'react'
import Editor from "../Components/Editor"
import { TextField, LinearProgress, Button } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import TagEditor from '../Components/TagEditor';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { handleCreateSubmit } from '../utils/handlePost';
import PostSubmitter from '../Components/PostSubmiter';
import errorHandler from '../utils/errorHandler'
import { styled } from '@mui/material/styles';
export default function CreatePost({ isLoggedIn, setError }) {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState([]);
    const [status, setStatus] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [image, setImage] = useState('')
    const [uploadedFileURL, setUploadedFileURL] = useState('')
    const navigate = useNavigate();
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });
    if (!isLoggedIn) {
        return <Navigate to={'/login'} />
    }
    return (
        <div className='createWrapper'>
            {isLoading && <LinearProgress />}
            <h1>Write</h1>
            <form onSubmit={(evt) => {
                const formData = new FormData();
                formData.append('title', title);
                formData.append('summary', summary);
                formData.append('content', content);
                formData.append('tags', JSON.stringify(tags));
                formData.append('status', status);
                formData.append('image', image.image);
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
                <img src={uploadedFileURL}></img>
                <h3>Title:</h3>
                <TextField
                    id="title"
                    label="Title"
                    value={title}
                    required
                    onChange={ev => setTitle(ev.target.value)}
                    fullWidth
                    name='title'
                />
                <br></br>
                <br></br>
                <h3>Summary</h3>
                <TextField
                    id="summary"
                    name="summary"
                    label="Summary"
                    value={summary}
                    onChange={ev => setSummary(ev.target.value)}
                    fullWidth
                />
                <br></br>
                <br></br>
                <h3>Content</h3>
                <Editor value={content} onChange={setContent} name='content' />
                <br></br>
                <TagEditor tags={tags} setTags={setTags} name='tags' />
                <br></br>
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                    onChange={(evt) => { setImage({ image: evt.target.files[0] }); setUploadedFileURL(URL.createObjectURL(evt.target.files[0])) }}
                    id='image'
                    sx={{ marginBottom: '10px' }}
                >
                    Upload file
                    <VisuallyHiddenInput type="file" name='image' />
                </Button>
                <PostSubmitter setStatus={setStatus} />
            </form>
        </div >)
}