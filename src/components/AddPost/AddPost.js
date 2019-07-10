import React from 'react'
import PostApiService from '../../services/post-api-services'
import FileBase64 from 'react-file-base64';


export default class AddPost extends React.Component {
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
    if (this.state.error) {
      return (
        <p>{string}</p>
      )
    }
    return null

  }
  handleSubmit = ev => {
    ev.preventDefault()
    ev.persist()
    const { post_type, title, text_headline, text_content, caption, video, audio} = ev.target
    let newPost = {
      type: this.state.post_type,
      title: title.value
    }

    switch (post_type.value) {
      case 'Text':
        newPost.text_headline = text_headline.value
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
    PostApiService.addPost(newPost)
      .then(res => {
        if (!res.ok) {
          this.setState({
            error: res.error
          })
          this.generateMessage(res.error)
        }
        this.generateMessage('Your message was successfully created')
        PostApiService.postStyle({
          post: res.id
        })
          .then(res => {
            console.log(res)
          })

        switch (this.state.post_type) {
          case 'Text':
            title.value = ''
            text_headline.value = ''
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
              placeholder="Enter Image Caption/Description"
              ></textarea>
          </>
        )
        break;
      case 'Text':
        fields = (
          <>
            <label htmlFor='text_headline'>Headline</label>
            <input
              type='text'
              id='text_headline'
              name='text_headline'
              placeholder='Post Headline'
            >
          </input>
          <label htmlFor='text_content'>Body</label>
          <textarea
            type='text'
            id='text_content'
            name='text_content'
            placeholder='Enter Post Body'
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
            >
            </input>
            <label htmlFor='caption'>Video Caption</label>
            <textarea
              type='text'
              id='caption'
              name='caption'
              placeholder='Video Caption'
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
        <h2 clasName='form-title-header'>Create New Post</h2>
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
      <div className='form-fields'>
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
