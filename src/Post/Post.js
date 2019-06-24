import React from 'react'
import { Link } from 'react-router-dom'
import PostContext from '../PostContext/PostContext'
import $ from 'jquery'

export default class Post extends React.Component {
  static contextType = PostContext || {}
  state = {
    post: this.props.post,
    type: this.props.post.type,
    video_id: `https://player.vimeo.com/video/${this.props.post.video_id}?loop=false&amp;byline=false&amp;portrait=false&amp;title=false&amp;speed=false&amp;transparent=0&amp;gesture=media`
  }
  componentDidMount() {
    $('.draggable').draggable();
   $('.draggable').resizable({
     aspectRatio: true
   })
  }
  render () {
    let renderedPost = ''
    switch (this.props.post.post_type) {
      case 'text':
        renderedPost = (
          <div className='text-post-content'>
            <h2 className='text-post-h2'>{this.props.post.title}</h2>
            <p className='text-post-title'>{this.props.post.text_headline}</p>
            <p className='text-post-p'>{this.props.post.text_content}</p>
          </div>
        )
        break;
      case 'image':
        renderedPost = (
          <div className='image-post-content'>
            <img src={this.props.post.image_url} alt={this.props.post.title} />
          </div>
        )
        break;
      case 'audio':
        renderedPost = (
          <div className='audio-post-content'>
          <div className="audio-post-controls">
            <p className='audio-post-title'>{this.props.post.title}</p>
          </div>
            <audio id="audioPlayer" src={this.props.post.audio_url} autoplay="false" preload="" contenteditable="true"></audio>
          </div>
        )
        break;
      case 'video':
        renderedPost = (
          <div className='video-post-wrapper'>
            <div className='video-post-content'>
              <iframe className='video-post-player' src={this.state.video_id}  frameborder="0" allowfullscreen="" allowtransparency=""></iframe>
            </div>
          </div>
        )
        break;
      default:

    }

    // if (this.props.post.post_type == 'text') {
    //
    // }
    return (
      <>
      {renderedPost}
      </>
    )

  }
}
