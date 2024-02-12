import { useEffect, useState } from 'react'
import convertDate from '../utils/convertDate'
import { useNavigate } from 'react-router'
import Tags from '../Components/Tags'
import Date from '../Components/Date'
import Pagination from '@mui/material/Pagination';
import { useSearchParams } from "react-router-dom";

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
        const getData = async function (index = 1) {
            const response = await fetch(`http://localhost:3000/posts/all?page=${index}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            const res = await response.json();
            if (!res.error) {
                setData(currentData => { return res })
                setPages({ page: Number(res.page), totalPages: Number(res.pages) })
            }
            else {
                return false;
            }
        }
        getData()
    }, [])

    useEffect(() => {
        const getData = async function (index = 1) {
            const response = await fetch(`http://localhost:3000/posts/all?page=${index}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            const res = await response.json();
            if (!res.error) {
                setData(res)
                setPages({ page: Number(res.page), totalPages: Number(res.pages) })
            }
            else {
                return false;
            }
        }
        getData(pages.page)

    }, [searchParams])
    return (<>
        <div className='home'>
            <div className='allPosts'>
                {data.posts && data.posts.map((el) => {
                    return (<div key={'post' + el._id} id={el._id} className='post-home'>
                        <a href={`/view/${el._id}`} className='postLink'>
                            <div className="cover-home">
                                <img src={el.image !== '' ? '../../public/blog-cover-picture.png' : el.image} alt="Cover Image" />
                            </div>
                            <div className="content-home">
                                <h3 key={'title' + el._id}>{el.title}</h3>
                                < p key={'summary' + el._id}>{el.summary}</p>
                                <span><h5>Tags: </h5></span><Tags tags={el.tags} />
                                <div className='date-home'>
                                    <Date date={el.createdAt} />
                                </div>
                            </div>
                        </a>
                    </div>)
                })}
                <Pagination count={pages.totalPages} page={pages.page} onChange={handleChange} />
            </div>
        </div>
    </>)
}