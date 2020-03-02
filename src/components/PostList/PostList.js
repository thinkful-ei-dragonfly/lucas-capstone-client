import React, {useState, useContext, useCallback, useEffect} from 'react'
import Context from '../../contexts/Context'
import { useLocation, useMatch, useParams} from 'react-router-dom'
import Post from '../Post/Post'
import config from '../../config'



// export default class PostList extends React.Component {
//   state = {
//     currentBoard: null,
//     posts: [],
//     styles: []
//   }
//   componentDidMount() {
//     let board
//     if (this.props.boardId) {
//       board = this.props.boardId
//     } else if (this.props.props.match.params) {
//       board = parseFloat(this.props.props.match.params.board_id)
//     } else if (this.props.props.location.state) {
//       board = this.props.props.location.state.boarId
//     }
//     // let board = this.props.boardId ||  parseFloat(this.props.props.match.params.board_id) || this.props.props.location.state.boardId 
//     debugger;
//     if (board) {
//       this.setState({
//         currentBoard: board
//       })
//       const requestPosts = fetch(`${config.API_ENDPOINT}/posts?board=${board}`)
//         .then(res => {
//           return res.json()
//         })
//       const requestStyles = fetch(`${config.API_ENDPOINT}/styles?board=${board}`)
//         .then(res => {
//           return res.json()
//         })
//       Promise.all([
//         requestPosts,
//         requestStyles
//       ])
//         .then(res => {
//           this.setState({
//             posts: res[0],
//             styles: res[1]
//           })
//         })  
//     } else {
//       const { location, history } = this.props
//       const destination = (location.state || {}).from || '/'
//       history.push(destination)
//     }
    
//   }
//   deletePost = (post) => {

//     if (post) {
//       this.setState({
//         posts: this.state.posts.filter(obj => obj.id !== post)
//       })
//     } else {
//       return
//     }

//   }
//   render () {

//     return (

//       <ul className='postList'  aria-label="Post List">
//         {this.state.posts.map(post => {
//           const style = this.state.styles.find(style => style.post === post.id)

//           return <Post
//                       className={`${post.type}-post post draggable`}
//                       key={post.id}
//                       id={post.id}
//                       type={post.post_type}
//                       onDelete={this.deletePost}
//                       post={post}
//                       style={style}
//                     />
//         })}
//       </ul>

//     )
//   }
// }
const PostList = ({history, match, location, props}) => {
  // debugger;
  const {currentBoard, setCurrentBoard} = useContext(Context)
  const [wordPressId] = useState(props ? parseFloat(props.boardId) : null)
  const [posts,setPosts] = useState([])
  const [styles,setStyles] = useState([])
  const [error, setError] = useState(null)
  
  const params = useParams()
  const locationHook = useLocation()
  
  

  const deletePost = e => {
    debugger;
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
  }, [])
  return (

    <ul className='postList' aria-label="Post List">
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