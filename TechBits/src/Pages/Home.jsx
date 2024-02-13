import { useEffect, useState } from 'react'
import Tags from '../Components/Tags'
import Date from '../Components/Date'
import Pagination from '@mui/material/Pagination';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CommentIcon from '@mui/icons-material/Comment';
import PersonIcon from '@mui/icons-material/Person';
import { useSearchParams } from "react-router-dom";
import { getAllPosts } from '../utils/handlePost';
import '../styles/home.css'

export default function Home() {
    let [searchParams, setSearchParams] = useSearchParams();
    const [data, setData] = useState(false)
    const [pages, setPages] = useState({ page: Number(searchParams.get('page')) || 1, totalPages: Number(data.pages) || 1 })
    function handleChange(evt, value) {
        setSearchParams({ page: value })
        return setPages((currentPage) => { return { ...currentPage, page: value } })
    }

    useEffect(() => {
        getAllPosts(pages.page, setData, setPages)
    }, [])

    useEffect(() => {
        getAllPosts(pages.page, setData, setPages)

    }, [searchParams])
    return (<>
        <div className='home'>
            <div className='allPosts'>
                {data.posts && data.posts.map((el) => {
                    return (<div key={'post' + el._id} id={el._id} className='post-home'>
                        <a href={`/view/${el._id}`} className='postLink'>
                            <img src={el.image !== '' ? '../../blog-cover-picture.png' : el.image} alt="Cover Image" />
                            <div className="content-home">
                                <div className='info-home'>
                                    <span><PersonIcon fontSize='small' /> {el.author.username}</span>
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
            </div >
        </div >
    </>)
}