import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { handleCreateSubmit } from '../utils/handlePost';
import PostEditor from '../Components/PostEditor';
import errorHandler from '../utils/errorHandler'

export default function CreatePost({ isLoggedIn, setError }) {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState([]);
    const [status, setStatus] = useState('')
    const [isSubmitLoading, setIsSubmitLoading] = useState(false)
    const [image, setImage] = useState('')
    const [uploadedFileURL, setUploadedFileURL] = useState(false)
    const navigate = useNavigate();
    const handleSubmit = async function (evt) {
        const data = { title, summary, content, tags, status, image }
        setIsSubmitLoading(true)
        await handleCreateSubmit(evt, data).then((res) => {
            if (!res.error) {
                setIsSubmitLoading(false)
                return navigate(`/view/${res.id}`)
            }
            else {
                return navigate(errorHandler(res, setError))
            }
        })
    }
    const imageHandler = function (evt) {
        setImage({ image: evt.target.files[0] });
        setUploadedFileURL(URL.createObjectURL(evt.target.files[0]))
    }
    if (!isLoggedIn) {
        return <Navigate to={'/login'} />
    }
    return (
        <div className='createPostWrapper'>
            <PostEditor helperText='Write' handleSubmit={handleSubmit} imageHandler={imageHandler} props={{ isLoggedIn, setError, title, setTitle, summary, setSummary, content, setContent, tags, setTags, setStatus, isSubmitLoading, image, uploadedFileURL }} />
        </div >)
}