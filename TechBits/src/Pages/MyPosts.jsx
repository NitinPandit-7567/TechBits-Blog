import { useEffect, useState } from 'react'
import { Pagination, CircularProgress } from '@mui/material';
import { Navigate, useSearchParams } from "react-router-dom";
import { getMyPosts } from '../utils/handlePost';
import PostCard from '../Components/PostCard';
import '../styles/home.css'

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
    return (<>
        {data ?
            <div className='myPosts'>
                <div className='allPosts'>
                    {isLoading ? <CircularProgress /> :
                        <>
                            {
                                data.posts && data.posts.map((el) => {
                                    return <PostCard key={el._id} post={el} />
                                })
                            }
                            < Pagination count={pages.totalPages} page={pages.page} onChange={handleChange} />
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