import Tags from './Tags'
import Date from './Date'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CommentIcon from '@mui/icons-material/Comment';
import PersonIcon from '@mui/icons-material/Person';
export default function PostCard({ post }) {
    return (
        <div key={'post' + post._id} id={post._id} className='postCard'>
            <a href={`/view/${post._id}`} className='postLink'>
                <div className='postCover'>
                    <img src={post.image === undefined ? '../../blog-cover-picture.png' : (post.image !== '' ? '../../blog-cover-picture.png' : post.image)} alt="Cover-Image" />
                </div>
                <div className="postContent">
                    <div className='postInfo'>
                        {post.status ? <span className='status'><span className={`status-${post.status}`}></span>{post.status[0].toUpperCase() + post.status.substr(1,)}</span> : <span><PersonIcon fontSize='small' /> {post.author.username}</span>}
                        <Date date={post.createdAt} />
                    </div>
                    <h3 key={'title' + post._id}>{post.title}</h3>
                    < p key={'summary' + post._id}>{post.summary}</p>
                    <span><Tags tags={post.tags} /></span>
                    <div className="post-details">
                        <span>{post.commentsCount > 0 && post.commentsCount}<CommentIcon fontSize='small' sx={{ marginRight: '10px', marginLeft: '5px' }} />
                            <ThumbUpIcon fontSize='small' sx={{ marginRight: '10px' }} />{(post.likeCount)}
                            <ThumbDownIcon fontSize='small' sx={{ marginRight: '10px', marginLeft: '10px' }} />{post.dislikeCount > 0 && (post.dislikeCount)}</span>
                    </div>
                </div>
            </a>
        </div>)

}