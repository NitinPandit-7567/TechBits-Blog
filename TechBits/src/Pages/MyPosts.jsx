import { useEffect, useState } from 'react'
import Tags from '../Components/Tags'
import Date from '../Components/Date'
import { Pagination, CircularProgress } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CommentIcon from '@mui/icons-material/Comment';
import { Navigate, useSearchParams } from "react-router-dom";
import { getMyPosts } from '../utils/handlePost';
import '../styles/myPosts.css'

export default function MyPosts({ isLoggedIn }) {
    if (!isLoggedIn) {
        return <Navigate to={'/login'} />
    }
    let [searchParams, setSearchParams] = useSearchParams();
    const [data, setData] = useState(false)
    const [pages, setPages] = useState({ page: Number(searchParams.get('page')) || 1, totalPages: Number(data.pages) || 1 })
    const [isLoading, setIsLoading] = useState(true);
    function handleChange(evt, value) {
        setSearchParams({ page: value })
        return setPages((currentPage) => { return { ...currentPage, page: value } })
    }

    useEffect(() => {
        getMyPosts(pages.page, setData, setPages).then(() => { setIsLoading(false) })
    }, [])

    useEffect(() => {
        setIsLoading(true)
        getMyPosts(pages.page, setData, setPages).then(() => { setIsLoading(false) })

    }, [searchParams])
    console.log(data.posts)
    return (<>
        {data ?
            <div className='myPosts'>
                <div className='allPosts'>
                    {isLoading ? <CircularProgress /> :
                        <>
                            {data.posts && data.posts.map((el) => {
                                return (<div key={'post' + el._id} id={el._id} className='post-myPosts'>
                                    <a href={`/view/${el._id}`} className='postLink'>
                                        <img src={el.image !== '' ? '../../blog-cover-picture.png' : el.image} alt="Cover Image" />
                                        <div className="content-myPosts">
                                            <div className='info-myPosts'>
                                                <span className='status'><span className={`status-${el.status}`}></span>{el.status[0].toUpperCase() + el.status.substr(1,)}</span>
                                                <Date date={el.createdAt} />
                                            </div>
                                            <h3 key={'title' + el._id}>{el.title}</h3>
                                            < p key={'summary' + el._id}>{el.summary}</p>
                                            <span><Tags tags={el.tags} /></span>
                                            <div className="post-details">
                                                <span>{el.commentsCount > 0 && el.commentsCount}<CommentIcon fontSize='small' sx={{ marginRight: '10px', marginLeft: '5px' }} />
                                                    <ThumbUpIcon fontSize='small' sx={{ marginRight: '10px' }} />{(el.likeCount)}
                                                    <ThumbDownIcon fontSize='small' sx={{ marginRight: '10px', marginLeft: '10px' }} />{el.dislikeCount > 0 && (el.dislikeCount)}</span>
                                            </div>
                                        </div>
                                    </a>
                                </div>)
                            })}
                            <Pagination count={pages.totalPages} page={pages.page} onChange={handleChange} />
                        </>
                    }
                </div >
            </div >
            : <div className='noPosts'>
                <h3>You dont have any posts yet! Create a new post <a href='/create'>here!</a></h3>
            </div>
        }
    </>)
}