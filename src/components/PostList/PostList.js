import React from 'react'
import Post from '../Post/Post'
import config from '../../config'



export default class PostList extends React.Component {
  state = {
    currentBoard: null,
    posts: [],
    styles: []
  }
  componentDidMount() {
    
    
    const board = parseFloat(this.props.match.params.board_id) || this.props.location.state.boardId  
    if (board) {
      this.setState({
        currentBoard: board
      })
      const requestPosts = fetch(`${config.API_ENDPOINT}/posts?board=${board}`)
        .then(res => {
          return res.json()
        })
      const requestStyles = fetch(`${config.API_ENDPOINT}/styles?board=${board}`)
        .then(res => {
          return res.json()
        })
      Promise.all([
        requestPosts,
        requestStyles
      ])
        .then(res => {
          this.setState({
            posts: res[0],
            styles: res[1]
          })
        })  
    } else {
      const { location, history } = this.props
      const destination = (location.state || {}).from || '/'
      history.push(destination)
    }
    
  }
  deletePost = (post) => {

    if (post) {
      this.setState({
        posts: this.state.posts.filter(obj => obj.id !== post)
      })
    } else {
      return
    }

  }
  render () {

    return (

      <ul className='postList'  aria-label="Post List">
        {this.state.posts.map(post => {
          const style = this.state.styles.find(style => style.post === post.id)

          return <Post
                      className={`${post.type}-post post draggable`}
                      key={post.id}
                      id={post.id}
                      type={post.post_type}
                      onDelete={this.deletePost}
                      post={post}
                      style={style}
                    />
        })}
      </ul>

    )
  }
}
