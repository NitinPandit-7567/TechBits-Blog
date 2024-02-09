import { useEffect, useState } from 'react'
export default function Home() {
    const [posts, setPosts] = useState(false)
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
            <h1>All Posts</h1>
            <div className='posts'>
                {posts && posts.map((el) => {
                    return (<div key={'post' + el._id}>
                        <h3 key={'title' + el._id}>{el.title}</h3>
                        < p key={'summary' + el._id}>{el.summary}</p>
                        <p key={'tags' + el._id}>{el.tags.map((el, i) => { return <span key={'tag' + el._id + i}>{el}</span> })}</p>
                        <span key={'span' + el._id}>{el.createdAt}</span>
                    </div>)
                })}
            </div>
        </div>
    </>)
}