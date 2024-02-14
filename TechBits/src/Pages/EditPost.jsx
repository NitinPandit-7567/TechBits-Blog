import { useEffect, useState } from 'react'
import Editor from "../Components/Editor"
import { TextField, CircularProgress, LinearProgress, Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { fetchPost } from '../utils/fetchData'
import TagEditor from '../Components/TagEditor';
import PostSubmitter from '../Components/PostSubmiter';
import { handleEditSubmit } from '../utils/handlePost';
import { getUserData } from '../utils/UserData';
import errorHandler from '../utils/errorHandler';
import { styled } from '@mui/material/styles';
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
    const [image, setImage] = useState('')
    const [uploadedFileURL, setUploadedFileURL] = useState(false)
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
    useEffect(() => {
        fetchPost(id).then((res) => {
            if (!res.error) {
                if (user.username === res.post.author.username) {
                    setTitle(res.post.title);
                    setSummary(res.post.summary);
                    setContent(res.post.content);
                    setTags(res.post.tags);
                    setStatus(res.post.status)
                    setImage({ image: res.post.image, oldImage: res.post.image, toDelete: false })
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
    console.log(image)
    return (<div className='createWrapper'>
        {isLoading ? <CircularProgress /> : <>
            {isSubmitLoading && <LinearProgress />}
            <h1>Edit</h1>
            <form onSubmit={(evt) => {
                setIsSubmitLoading(true)
                const formData = new FormData();
                formData.append('title', title);
                formData.append('summary', summary);
                formData.append('content', content);
                formData.append('tags', JSON.stringify(tags));
                formData.append('status', status);
                formData.append('image', image.image);
                formData.append('deleteImage', JSON.stringify({ image: image.oldImage, toDelete: image.toDelete }));
                console.log(formData)
                for (let i of formData.entries()) {
                    console.log(i[0], ': ', i[1]);
                }
                handleEditSubmit(evt, id, formData).then((res) => {
                    if (!res.error) {
                        setIsSubmitLoading(false)
                        return navigate(`/view/${id}`)
                    }
                    else {
                        return navigate(errorHandler(res, setError))
                    }
                })
            }}>
                <img src={uploadedFileURL ? uploadedFileURL : image.image} alt='Cover-Image'></img>
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
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                    onChange={(evt) => { setImage((currentData) => { return { ...currentData, image: evt.target.files[0], toDelete: true } }); setUploadedFileURL(URL.createObjectURL(evt.target.files[0])) }}
                    id='image'
                    sx={{ marginBottom: '10px' }}
                >
                    Upload file
                    <VisuallyHiddenInput type="file" name='image' />
                </Button>
                <PostSubmitter setStatus={setStatus} />
            </form>
        </>}
    </div >)
}