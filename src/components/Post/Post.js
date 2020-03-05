import React from 'react'
import { Link } from 'react-router-dom'
import { Rnd } from 'react-rnd'
import InfoSVG from '../../icons/info.svg'
import InfoPNG from '../../icons/info.png'
import TokenService from '../../services/token-service'
import PostApiService from '../../services/post-api-services'

export default class Post extends React.Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef()
  }

  state = {
    post: this.props.post,
    style: this.props.style,
    type: this.props.post.type,
    video_id: `https://player.vimeo.com/video/${this.props.post.video}?loop=false&amp;byline=false&amp;portrait=false&amp;title=false&amp;speed=false&amp;transparent=0&amp;gesture=media`,
    expanded: false,
    deleteConfirmation: false
  }

  showCaption = (e) => {
    if (e.target.className.includes('info')) {
      this.setState({
        expanded: !this.state.expanded
      })
    } else return
  }

  deletePost = (e) => {
    e.preventDefault()
    let answer = window.confirm('Are you sure you want to delete?')
    if (answer) {
      PostApiService.deleteStyle(this.props.post.id)
      .then(res => {
          PostApiService.deletePost(this.props.post.id)
          .then(response => {
            this.props.onDelete(this.props.post.id)
          })
      })
    } else {
      return
    }

  }

  render () {
    let renderedPost = ''
    let editlink = ''
    let captionPopup = ''
    let deleteConfirmation = ''
    if (this.props.post.caption) {
      captionPopup = (
        <div className='caption-popup'>
          <p className='caption'>{this.props.post.caption}</p>
        </div>
      )
    }
    if (this.state.deleteConfirmation) {
      deleteConfirmation = (
        <div className='deleteConfirmation'>
          <p>Are you sure you want to delete?</p>
          <button onClick={this.setState({
              deleteConfirmation: false
            })}>Cancel</button>
          <button onClick={this.deletePost}>Confirm</button>
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
          <>
            <h2 className='text-post-h2'>{this.props.post.title}</h2>
            <h3 className='text-post-title'>{this.props.post.text_title}</h3>
            <p className='text-post-p'>{this.props.post.text_content}</p>
          </>
        )
        break;
      case 'Image':
        renderedPost = (
          <>
            <img src={this.props.post.image} alt={this.props.post.title} />
          </>
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

      <Rnd
        className={this.props.className}
        ref={this.myRef}
        role='listitem'
        lockAspectRatio={this.state.type === 'Image' || this.state.type === 'Video'}
        bounds={'window'}
        onClick={this.showCaption}
        default={{
          x: parseInt(this.state.style.left_style),
          y: parseInt(this.state.style.top_style),
          width: parseInt(this.state.style.width_style)
        }}
        onDragStop={
          (e, node) => {
            if (!TokenService.hasAuthToken()) {
              return
            }
            let leftComponent = node.x
            let topComponent = node.y
            let heightComponent = this.myRef.current.getSelfElement().offsetHeight
            let widthComponent = this.myRef.current.getSelfElement().offsetWidth

            const updatedPost = {
              post: this.state.post.id,
              top_style: topComponent,
              left_style: leftComponent,
              width_style: widthComponent,
              height_style: heightComponent
            }

            PostApiService.saveStyle(updatedPost)

          }
        }
        onResizeStop={
          (e, dir, refToElement, node) => {
            if (!TokenService.hasAuthToken()) {
              return
            }
            let leftComponent = e.clientX
            let topComponent = e.clientY
            let heightComponent = this.myRef.current.getSelfElement().offsetHeight
            let widthComponent = this.myRef.current.getSelfElement().offsetWidth

            const updatedPost = {
              post: this.state.post.id,
              top_style: topComponent,
              left_style: leftComponent,
              width_style: widthComponent,
              height_style: heightComponent
            }
            PostApiService.saveStyle(updatedPost)

          }
        }
      >
      {editlink}
      {this.state.deleteConfirmation
        ? deleteConfirmation
        : ''}
      {renderedPost}
      {this.state.expanded && captionPopup}
      <img src={InfoPNG} className='info' />
    </Rnd>
    )

  }
}
