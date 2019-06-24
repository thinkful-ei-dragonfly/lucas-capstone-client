import React from 'react'
import { Link } from 'react-router-dom'
import Post from '../Post/Post'
import PostContext from '../PostContext/PostContext'

export default class PostList extends React.Component {
  static contextType = PostContext || {}

  render () {
    return (
      <div>
      <ul>
        {this.context.posts.map(post =>
          <div className={`${post.post_type}-post post draggable`} key={post.id} id={post.id}>
            <Post type={post.post_type} post={post}/>
          </div>
        )}
      </ul>
      </div>
    )
  }
}
