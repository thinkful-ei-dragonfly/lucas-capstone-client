import React from 'react'
import Post from '../Post/Post'
import config from '../../config'



export default class PostList extends React.Component {

  state = {
    posts: [],
    styles: []
  }
  componentDidMount() {
    const requestPosts = fetch(`${config.API_ENDPOINT}/posts`)
      .then(res => {
        return res.json()
      })
    const requestStyles = fetch(`${config.API_ENDPOINT}/styles`)
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
