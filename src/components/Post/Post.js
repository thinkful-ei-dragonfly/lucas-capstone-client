import React from 'react'
import PostContext from '../../PostContext/PostContext'
import TokenService from '../../services/token-service'
import PostApiService from '../../services/post-api-services'
import $ from 'jquery'

export default class Post extends React.Component {
  static contextType = PostContext || {}
  state = {
    post: this.props.post,
    type: this.props.post.type,
    video_id: `https://player.vimeo.com/video/${this.props.post.video}?loop=false&amp;byline=false&amp;portrait=false&amp;title=false&amp;speed=false&amp;transparent=0&amp;gesture=media`
  }
  componentDidMount() {
    $('.draggable').draggable({
      stop: (e) => {
        this.updateStyle(e)
      }
    });
    $('.draggable').resizable({
     aspectRatio: true,
     stop: (e) => {
       this.updateStyle(e)
     }
   })
  }
  updateStyle = (e) => {
    if (!TokenService.hasAuthToken()) {
      return
    }
    const top_calculated = `${(((e.target.style.top.split('px')[0]) / window.innerHeight) * 100).toFixed(2)}%`
    const left_calculated = `${(((e.target.style.left.split('px')[0]) / window.innerWidth) * 100).toFixed(2)}%`
    let width_calculated,
    height_calculated
    if (e.target.style.width) {
      width_calculated = `${(((e.target.style.width.split('px')[0]) / window.innerWidth) * 100).toFixed(2)}%`
    }
    if (e.target.style.height) {
      height_calculated = `${(((e.target.style.height.split('px')[0]) / window.innerHeight) * 100).toFixed(2)}%`
    }


    const updatedPost = {
      post: e.target.id,
      top_style: top_calculated,
      left_style: left_calculated,
      width_style: width_calculated,
      height_style: height_calculated
    }
    debugger;
    PostApiService.saveStyle(updatedPost)
      .then(res => console.log(res))

  }
  render () {
    let renderedPost = ''

    switch (this.props.post.type) {

      case 'Text':
        renderedPost = (
          <div className='text-post-content'>
            <h2 className='text-post-h2'>{this.props.post.title}</h2>
            <p className='text-post-title'>{this.props.post.text_headline}</p>
            <p className='text-post-p'>{this.props.post.text_content}</p>
          </div>
        )
        break;
      case 'Image':
        renderedPost = (
          <div className='image-post-content'>
            <img src={this.props.post.image} alt={this.props.post.title} />
          </div>
        )
        break;
      case 'Audio':
        renderedPost = (
          <div className='audio-post-content'>
          <div className="audio-post-controls">
            <p className='audio-post-title'>{this.props.post.title}</p>
          </div>
            <audio id="audioPlayer" src={this.props.post.audio_url} autoPlay={false} preload="" contentEditable="true"></audio>
          </div>
        )
        break;
      case 'Video':
        renderedPost = (
          <div className='video-post-wrapper'>
            <div className='video-post-content'>
              <iframe className='video-post-player' src={this.state.video_id}  frameBorder="0" allowFullScreen={true} allowtransparency=""></iframe>
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
