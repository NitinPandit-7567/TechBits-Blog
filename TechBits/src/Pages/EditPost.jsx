import { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { fetchPost } from '../utils/fetchData'
import { handleEditSubmit } from '../utils/handlePost';
import { getUserData } from '../utils/UserData';
import errorHandler from '../utils/errorHandler';
import PostEditor from '../Components/PostEditor';
import { CircularProgress } from '@mui/material';
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
    const imageHandler = function (evt) {
        setImage((currentData) => { return { ...currentData, image: evt.target.files[0], toDelete: true } });
        setUploadedFileURL(URL.createObjectURL(evt.target.files[0]))
    }
    const handleSubmit = async function (evt) {
        const data = { title, summary, content, tags, status, image }
        setIsSubmitLoading(true)
        await handleEditSubmit(evt, id, data).then((res) => {
            if (!res.error) {
                setIsSubmitLoading(false)
                return navigate(`/view/${id}`)
            }
            else {
                return navigate(errorHandler(res, setError))
            }
        })
    }
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
    return (<div className='editPostWrapper'>
        {isLoading && <CircularProgress />}
        <PostEditor helperText='Edit Post' handleSubmit={handleSubmit} imageHandler={imageHandler} props={{ isLoggedIn, setError, title, setTitle, summary, setSummary, content, setContent, tags, setTags, status, setStatus, isLoading, setIsLoading, image, setImage, uploadedFileURL, setUploadedFileURL }} />
    </div >)
}