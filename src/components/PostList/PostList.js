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
    if (window.confirm('Are you sure you want to delete this post?')) {
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
          let height = style.height_style
          if (post.type === 'Image' || post.type === 'Video') {
            height = ''
          }

          const styleString = {
            left: `${style.left_style}`,
            top: `${style.top_style}`,
            width: `${style.width_style}`,
            height,
            zIndex: `${parseInt(style.z_index)}`
          }
          return <div className={`${post.type}-post post draggable`} key={post.id} id={post.id} style={styleString} >
            <Post
              type={post.post_type}
              onDelete={this.deletePost}
              post={post}
              style={this.state.styles.find(style => style.post === post.id)}
            />
          </div>
        })}
      </ul>

    )
  }
}
