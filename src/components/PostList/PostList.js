import React, {useState, useContext, useEffect} from 'react'
import Context from '../../contexts/Context'
import { useLocation, useParams} from 'react-router-dom'
import Post from '../Post/Post'
import config from '../../config'

const PostList = ({history, match, location, props}) => {

  const {currentBoard, setCurrentBoard} = useContext(Context)
  const [wordPressId] = useState(props ? parseFloat(props.boardId) : null)
  const [posts,setPosts] = useState([])
  const [styles,setStyles] = useState([])
  const [error, setError] = useState(null)
  
  const params = useParams()

  const deletePost = post => {

    if (post) {
      setPosts(posts.filter(item => item.id !== post))
    } else {
      return
    }

  }
  useEffect(() => {
    if (wordPressId) {
      const requestPosts = fetch(`${config.API_ENDPOINT}/posts?board=${wordPressId}`)
        .then(res => {
          return res.json()
        })
      const requestStyles = fetch(`${config.API_ENDPOINT}/styles?board=${wordPressId}`)
        .then(res => {
          return res.json()
        })
      Promise.all([
        requestPosts,
        requestStyles
      ])
        .then(res => {
          setPosts(res[0])
          setStyles(res[1])
          
        })
        .catch(err => {
          console.error(err)
          setError(err)
        })
    } else if (currentBoard) {
      
      const requestPosts = fetch(`${config.API_ENDPOINT}/posts?board=${currentBoard.id}`)
        .then(res => {
          return res.json()
        })
      const requestStyles = fetch(`${config.API_ENDPOINT}/styles?board=${currentBoard.id}`)
        .then(res => {
          return res.json()
        })
      Promise.all([
        requestPosts,
        requestStyles
      ])
        .then(res => {
          setPosts(res[0])
          setStyles(res[1])

        })
      .catch(err => {
        console.error(err)
        setError(err)
      }) 
    } else {
      
      const requestPosts = fetch(`${config.API_ENDPOINT}/posts?board=${params.board_id}`)
        .then(res => {
          return res.json()
        })
      const requestStyles = fetch(`${config.API_ENDPOINT}/styles?board=${params.board_id}`)
        .then(res => {
          return res.json()
        })
      Promise.all([
        requestPosts,
        requestStyles
      ])
        .then(res => {
          setPosts(res[0])
          setStyles(res[1])

        })
        .catch(err => {
          console.error(err)
          setError(err)
        }) 
    }
  }, [currentBoard, location, setCurrentBoard])
  return (

    <ul className='postList' aria-label="Post List">
      {error && (<span className='error red'>{error}</span>)}
      {(posts.length && styles.length) && posts.map(post => {
        const style = styles.find(style => style.post === post.id)
        
        return <Post
          className={`${post.type}-post post draggable`}
          key={post.id}
          id={post.id}
          type={post.post_type}
          onDelete={deletePost}
          post={post}
          style={style}
        />
      })}
    </ul>

  )
}
export default PostList