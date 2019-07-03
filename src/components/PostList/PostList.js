import React from 'react'
import { Link } from 'react-router-dom'
import Post from '../Post/Post'
import PostContext from '../../PostContext/PostContext'

export default class PostList extends React.Component {
  static contextType = PostContext || {}

  render () {
    return (
      <div>
      <ul>
        {this.context.posts.map(post => {
          const style = this.context.styles.find(style => style.post === post.id)
          const styleString = {
            left: `${style.left_style}`,
            top: `${style.top_style}`,
            width: `${style.width_style}`,
            height: `${style.height_style}`,
          }
          return <div className={`${post.post_type}-post post draggable`} key={post.id} id={post.id} style={styleString} >
            <Post type={post.post_type} post={post}/>
          </div>
        })}
      </ul>
      </div>
    )
  }
}
