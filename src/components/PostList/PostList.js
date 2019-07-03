import React from 'react'
import { Link } from 'react-router-dom'
import Post from '../Post/Post'
import PostContext from '../../PostContext/PostContext'
import config from '../../config'

export default class PostList extends React.Component {
  static contextType = PostContext || {}
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

  render () {
    return (
      <div>
      <ul>
        {this.state.posts.map(post => {
          const style = this.state.styles.find(style => style.post === post.id)
          const styleString = {
            left: `${style.left_style}`,
            top: `${style.top_style}`,
            width: `${style.width_style}`,
            height: `${style.height_style}`,
          }
          return <div className={`${post.type}-post post draggable`} key={post.id} id={post.id} style={styleString} >
            <Post type={post.post_type} post={post}/>
          </div>
        })}
      </ul>
      </div>
    )
  }
}
