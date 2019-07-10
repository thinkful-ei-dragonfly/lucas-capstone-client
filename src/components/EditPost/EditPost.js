import React from 'react'
import PostApiService from '../../services/post-api-services'
import FileBase64 from 'react-file-base64';
import PostContext from '../../PostContext/PostContext'
import config from '../../config'



export default class EditPost extends React.Component {
  static contextType = PostContext || {}
  state = {
    post: {},
    uploadedFile: null,
    post_type: 'Text'
  }

  successfulSubmission = () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/'
    history.push(destination)
  }
  generateMessage(string) {
    return (
      <p>{string}</p>
    )
  }
  componentDidMount() {
    const postId = this.props.match.params.post_id
      return fetch(`${config.API_ENDPOINT}/posts/${postId}`)
        .then(res => {
          return res.json()
        })
        .then(res => {
          this.setState({
            post: res
          })
        })
    }
  handleSubmit = ev => {
    ev.preventDefault()
    ev.persist()
    const { post_type, title, text_title, text_content, caption, video, audio} = ev.target
    let newPost = {
      id: this.props.match.params.post_id,
      type: this.state.post_type,
      title: title.value
    }

    switch (post_type.value) {
      case 'Text':
        newPost.text_title = text_title.value
        newPost.text_content = text_content.value
        break;
      case 'Image':
        newPost.image = this.state.uploadedFile.base64
        newPost.caption = caption.value
        break;
      case 'Video':
        newPost.video = video.value
        newPost.caption = caption.value
        break
      case 'Audio':
        newPost.audio = audio.value
        newPost.caption = caption.value
        break;
      default:
    }
    PostApiService.updatePost(newPost)
      .then(res => {
        if (!res.ok) {
          this.generateMessage(res.error)
        }
        this.generateMessage('Your post was successfully updated')

        switch (this.state.post_type) {
          case 'Text':
            title.value = ''
            text_title.value = ''
            text_content.value = ''
            break;
          case 'Image':
            title.value = ''
            caption.value = ''
            break;
          case 'Video':
            title.value = ''
            video.value = ''
            break;
          case 'Audio':
            title.value = ''
            audio.value = ''
            caption.value = ''
            break;
          default:
        }
        setTimeout(() => {
          this.successfulSubmission()
        }, 500)

      })
  }

  updatePostType = e => {
    this.setState({
      post_type: e.target.value
    })

  }
  getFile(file){
    this.setState({ uploadedFile: file })
  }

  renderFieldTypes () {
    let fields = ''
    switch (this.state.post_type) {
      case 'Image':
        fields = (
          <>
            <label htmlFor='image'>Insert Image Address</label>

            <FileBase64
              id='image'
              name='image'
              accept='image/png, image/jpeg'
              multiple={ false }
              onDone={ this.getFile.bind(this) }
            />
            <label htmlFor='caption'>Image Caption</label>
            <textarea
              type='text'
              id='caption'
              name='caption'
              placeholder={this.state.post.caption}
              ></textarea>
          </>
        )
        break;
      case 'Text':
        fields = (
          <>
            <label htmlFor='text_title'>Headline</label>
            <input
              type='text'
              id='text_title'
              name='text_title'
              placeholder='Headline'
              defaultValue={this.state.post.text_title}
            >
          </input>
          <label htmlFor='text_content'>Body</label>
          <textarea
            type='text'
            id='text_content'
            name='text_content'
            placeholder={this.state.post.text_content}
            ></textarea>
          </>
        )
        break;
      case 'Video':
        fields = (
          <>
            <label htmlFor='video'>Enter a Vimeo ID below</label>
            <input
              type='text'
              id='video'
              name='video'
              defaultValue={this.state.post.video}
            >
            </input>
            <label htmlFor='caption'>Video Caption</label>
            <textarea
              type='text'
              id='caption'
              name='caption'
              placeholder={this.state.post.caption}
              ></textarea>
          </>
        )
        break;
      case 'Audio':
      fields = (
        <>
          <label htmlFor='audio'>Insert Audio File Location</label>

          <input
            id='audio'
            name='audio'
            accept='image/png, image/jpeg'
          />
          <label htmlFor='caption'>Audio Caption</label>
          <textarea
            type='text'
            id='caption'
            name='caption'
            ></textarea>
        </>
      )
        break;
      default:

    }
    return (
      <div className='add-post-fields'>
        {fields}
      </div>
    )

  }

  render() {
    return (
      <form
        className='AddPostForm'
        onSubmit={this.handleSubmit}
      >
      <div className='form-title'>
        <h2>Edit Post</h2>
      </div>
      <div className='message'>
        {this.generateMessage()}
      </div>
      <div className='select'>
        <label htmlFor='post_type'>Post Type</label>
        <select
          required
          aria-label="Select your post type"
          name='post_type'
          id='post_type'
          onChange={this.updatePostType}
          defaultValue={this.props.post_type}
        >
        <option value='Text'>Text</option>
        <option value='Image'>Image</option>
        <option value='Video'>Video</option>
        </select>

      </div>
      <div className='form-fields'>
        <label htmlFor='title'>Post Title</label>
        <input type='text' name='title' id='title' placeholder='Post Title' defaultValue={this.state.post.title}></input>
        {this.renderFieldTypes()}
      </div>
      <button
        type='submit'
        className='form-submit'
        >Submit</button>
      </form>
    )
  }
}
