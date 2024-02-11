import { useEffect, useState } from 'react'
import convertDate from '../utils/convertDate'
import { useNavigate } from 'react-router'
import Tags from '../Components/Tags'
import Date from '../Components/Date'
import '../styles/home.css'

export default function Home() {
    const [posts, setPosts] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        const getData = async function () {
            const response = await fetch('http://localhost:3000/posts/all', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            const data = await response.json();
            if (!data.error) {
                return setPosts(currentPosts => { return data })
            }
            else {
                return false;
            }
        }
        getData();
    }, [])
    return (<>
        <div className='home'>
            <div className='allPosts'>
                {posts && posts.map((el) => {
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
            </div>
        </div>
    </>)
}