import React from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import PostApiService from '../../services/post-api-services'

import jQuery from 'jquery'
import 'jquery-ui';
import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/ui/widgets/resizable';
import 'jquery-ui/ui/widgets/resizable';
import 'jquery-ui/ui/core';
import 'jquery-ui/ui/widget';
import 'jquery-ui/ui/widgets/mouse';
// import 'jquery-ui-touch-punch'


// import '../../touchpunch'

export default class Post extends React.Component {

  state = {
    post: this.props.post,
    style: this.props.style,
    type: this.props.post.type,
    video_id: `https://player.vimeo.com/video/${this.props.post.video}?loop=false&amp;byline=false&amp;portrait=false&amp;title=false&amp;speed=false&amp;transparent=0&amp;gesture=media`,
    expanded: false
  }

  componentDidMount = () => {
    jQuery('.draggable').draggable({
      stack: ".draggable",
      stop: (e) => {
        this.updateStyle(e)
      }
    });
    jQuery('.Text-post').resizable({
     stop: (e) => {
       this.updateStyle(e)
     }
   })
    jQuery('.Image-post, .Video-post').resizable({
     aspectRatio: true,
     stop: (e) => {
       this.updateStyle(e)
     }
   })
   setTimeout(() => {
     let targetNode = document.getElementById(`${this.props.post.id}`)
     let config = {
       attributes: true,
       childList: true,
       subtree: false
     }
     let callback =  (mutationsList, observer) => {
       for(let mutation of mutationsList) {
         if (mutation.attributeName === 'style') {
           this.updateStyle(mutation)
         }
       }
     }
     let observer = new MutationObserver(callback)

     observer.observe(targetNode, config)
   }, 1000)
  }

  updateStyle = (e) => {
    if (!TokenService.hasAuthToken()) {
      return
    }
    let width_calculated,
    top_calculated,
    left_calculated,
    height_calculated,
    z_index
    if (e.target.style.top !== this.state.style.top_style) {
      for (const key of ['%', 'px']) {
        if (e.target.style.top.includes(key)) {

          top_calculated = `${(((e.target.style.top.split(key)[0]) / window.innerHeight) * 100).toFixed(2)}%`
            if (top_calculated === undefined) {
              top_calculated = this.state.style.top_style
            }
        }
      }
    }
    if (e.target.style.left !== this.state.style.left_style) {
      for (const key of ['%', 'px']) {
        if (e.target.style.left.includes(key)) {

          left_calculated = `${(((e.target.style.left.split(key)[0]) / window.innerWidth) * 100).toFixed(2)}%`
            if (left_calculated === undefined) {
              left_calculated = this.state.style.left_style
            }
        }
      }

    }
    if (e.target.style.width !== this.state.style.width_style) {
      for (const key of ['%', 'px']) {
        if (e.target.style.width.includes(key)) {

          width_calculated = `${(((e.target.style.width.split(key)[0]) / window.innerWidth) * 100).toFixed(2)}%`
            if (width_calculated === undefined) {
              width_calculated = this.state.style.width_style
            }
        }
      }
    }
    if ((e.target.style.height !== this.state.style.height_style) && this.state.type === 'Text'){
      for (const key of ['%', 'px']) {
        if (e.target.style.height.includes(key)) {

          height_calculated = `${(((e.target.style.height.split(key)[0]) / window.innerHeight) * 100).toFixed(2)}%`
            if (height_calculated === undefined) {
              height_calculated = this.state.style.height_style
            }
        }
      }
    }
    if (e.target.style['z-index']) {
      z_index = e.target.style['z-index']
    }

    const updatedPost = {
      post: e.target.id,
      top_style: top_calculated,
      left_style: left_calculated,
      width_style: width_calculated,
      height_style: height_calculated,
      z_index
    }
    PostApiService.saveStyle(updatedPost)
  }
  showCaption = (e) => {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  deletePost = (e) => {
    e.preventDefault()
    PostApiService.deleteStyle(this.props.post.id)
    .then(res => {
        PostApiService.deletePost(this.props.post.id)
        .then(response => {
          this.props.onDelete(this.props.post.id)
        })
    })
  }
  render () {
    let renderedPost = ''
    let editlink = ''
    let captionPopup = ''
    if (this.props.post.caption) {
      captionPopup = (
        <div className='caption-popup'>
          <p className='caption'>{this.props.post.caption}</p>
        </div>
      )
    }
    if (TokenService.hasAuthToken()) {
      editlink = (
        <div className='post-controls'>
          <Link
            to={`/post/${this.props.post.id}`}
          >
          Edit
          </Link>
          <p>{this.props.post.title}</p>
          <Link
            to={`/delete/post/${this.props.post.id}`}
            onClick={this.deletePost}>
            Delete
          </Link>
        </div>

      )
    }

    switch (this.props.post.type) {

      case 'Text':
        renderedPost = (
          <div className='text-post-content'>
            <h2 className='text-post-h2'>{this.props.post.title}</h2>
            <h3 className='text-post-title'>{this.props.post.text_title}</h3>
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
              <iframe className='video-post-player' src={this.state.video_id} title={this.props.post.title} frameBorder="0" allowFullScreen={true} allowtransparency=""></iframe>
            </div>
          </div>
        )
        break;
      default:

    }
    return (
      <article
        className='post-container'
        onClick={this.showCaption}
        role='listitem'
      >
      {editlink}
      {this.state.expanded
        ? captionPopup
        : ''}
      {renderedPost}
    </article>
    )

  }
}
