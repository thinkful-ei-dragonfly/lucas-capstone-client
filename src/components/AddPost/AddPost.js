import React from 'react'
import Context from '../../contexts/Context'
import PostApiService from '../../services/post-api-services'
import FileBase64 from 'react-file-base64';


export default class AddPost extends React.Component {
  static contextType = Context;

  state = {
    post: {},
    uploadedFile: null,
    post_type: 'Text',
    error: null,
    currentBoard: this.context.currentBoard
  }

  componentDidMount() {
    if (this.context.currentBoard) {
      this.setState({
        currentBoard: this.context.currentBoard
      })
    } else {
      const { history } = this.props
      
      history.push('/')  
    }
  }

  successfulSubmission = () => {
    const { history } = this.props
    
    history.push(`/boards/${this.state.currentBoard.id}`)
  }
  
  generateMessage(string) {
    if (this.state.error) {
      return (
        <p className="errorMessage red" aria-label="Error Message" role='alertdialog'>{this.state.error}</p>
      )
    }
    return null

  }
  handleSubmit = ev => {
    ev.preventDefault()
    ev.persist()
    const { post_type, title, text_title, text_content, caption, video} = ev.target
    let newPost = {
      board: this.state.currentBoard.id,
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
      default:
        newPost.text_title = text_title.value
        newPost.text_content = text_content.value
    }
    PostApiService.addPost(newPost)
      .then(res => {
        if (!res.ok || res.status(400)) {
          this.setState({
            error: res.error
          })
        }

        PostApiService.postStyle({
          post: res.id
        })

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
          default:
        }
        setTimeout(() => {
          this.successfulSubmission()
        }, 1500)

      })
      .catch(res => {
        this.setState({
          error: res.error.message
        })
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
              aria-label='Select an image to upload'
              onDone={ this.getFile.bind(this) }
            />
            <label htmlFor='caption'>Image Caption</label>
            <textarea
              type='text'
              id='caption'
              name='caption'
              placeholder="Enter Image Caption/Description"
              aria-label="Image caption"
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
              placeholder='Post Headline'
              aria-label="Post Headline"
            >
          </input>
          <label htmlFor='text_content'>Body</label>
          <textarea
            type='text'
            id='text_content'
            name='text_content'
            placeholder='Enter Post Body'
            aria-label="Post body content"
            ></textarea>
          </>
        )
        break;
      case 'Video':
        fields = (
          <>
            <label htmlFor='video'>Vimeo ID</label>
            <input
              type='text'
              id='video'
              name='video'
              placeholder='Enter Vimeo ID'
              aria-label="Vimeo Id"
            >
            </input>
            <label htmlFor='caption'>Video Caption</label>
            <textarea
              type='text'
              id='caption'
              name='caption'
              placeholder='Video Caption'
              aria-label="Video Caption"
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
        aria-label="Create new Post"
      >
      <div className='form-title'>
        <h2 className='form-title-header'>Create New Post</h2>
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
        >
        <option value='Text'>Text</option>
        <option value='Image'>Image</option>
        <option value='Video'>Video</option>
        </select>

      </div>
      <div className='form-fields' aria-label='Post Fields'>
        <label htmlFor='title'>Post Title</label>
        <input type='text' name='title' id='title' placeholder='Enter post title...'></input>
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
