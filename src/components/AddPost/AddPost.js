import React from 'react'
import PostContext from '../../PostContext/PostContext'
import PostApiService from '../../services/post-api-services'
import image2base64 from 'image-to-base64'

export default class AddPost extends React.Component {
  state = {
    post: {},
    selectedFile: null,
    post_type: 'text'
  }
  constructPost = event => {
    // Validate based on this.state.post_type
    // instantiate the variables from event.target based on the post_type
    // (e.g. if post_type === 'text', then "const { text_headline, text_body} = event.target")

    switch (this.state.post_type) {
      case 'text':

        break;
      default:

    }
    let constructedPost
    this.setState({
      post: constructedPost
    })
  }

  fileSelectedHandler = event => {
    // let newFile = image2base64(event.target.value)
    //   .then(response => {
    //     console.log(response)
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })

    this.setState({
      selectedFile: event.target.value
    })

    // console.log(event.target.value)
    // implement some kind of base64 encoding. save that to the post.img_url
  }
  handleSubmit = ev => {
    // Send POST request to api/styles and send just the ID
    // send the actual post to api/posts
    // This ensures that the new post ID is sent to both tables
    ev.preventDefault()
    ev.persist()
    let newPost = {
      post_type: this.state.post_type,
      title: ev.target.title.value
    }

    switch (this.state.post_type) {
      case 'text':
        newPost.text_headline = ev.target.text_headline.value
        newPost.text_content = ev.target.text_content.value
        break;
      case 'image':
        newPost.image_url = ev.target.image.value
        newPost.caption = ev.target.caption.value
        break;
      case 'video':
        newPost.video_id = ev.target.video.value
        newPost.caption = ev.target.caption.value
        break
      default:

    }
    PostApiService.addPost(newPost)
      .then(res => {
        ev.target.title.value = ''
        switch (this.state.post_type) {
          case 'text':
          debugger;
            ev.target.text_headline.value = ''
            ev.target.text_content.value = ''
            break;
          case 'image':
          ev.target.image.value = ''
          ev.target.caption.value = ''
            break;
          default:

        }
      })
  }

  updatePostType = e => {
    this.setState({
      post_type: e.target.value
    })

  }
  renderFieldTypes () {
    let fields = ''

    switch (this.state.post_type) {
      case 'image':
        fields = (
          <>
            <label htmlFor='image'>Insert Image Address</label>
            <input
              type='text'
              id='image'
              name='image'
              accept='image/png, image/jpeg'
              onChange={this.fileSelectedHandler}
              required
            >
            </input>
            <label htmlFor='caption'>Image Caption</label>
            <textarea
              type='text'
              id='caption'
              name='caption'
              onChange={this.constructPost}
              ></textarea>
          </>
        )
        break;
      case 'text':
        fields = (
          <>
            <label htmlFor='text_headline'>Headline</label>
            <input
              type='text'
              id='text_headline'
              name='text_headline'
              onChange={this.constructPost}
              placeholder='Headline'
            >
          </input>
          <label htmlFor='text_content'>Body</label>
          <textarea
            type='text'
            id='text_content'
            name='text_content'
            onChange={this.constructPost}
            placeholder='Text Body'
            ></textarea>
          </>
        )
        break;
      case 'video':
        fields = (
          <>
            <label htmlFor='video'>Enter a Vimeo ID below</label>
            <input
              type='text'
              id='video'
              name='video'
              onChange={this.constructPost}
            >
          </input>
          </>
        )
        break;
      case 'audio':
        fields = (
          <>
            <p className='alert'>TBD. Need to investigate uploading of MP3 or using Soundcloud</p>
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
      <h2>New Post</h2>
      </div>
      <div className='select'>
        <label htmlFor='post_type'>Post Type</label>
        <select
          required
          aria-label="Select your post type!"
          name='post_type'
          id='post_type'
          onChange={this.updatePostType}
        >
        <option value='text'>Text</option>
        <option value='image'>Image</option>
        <option value='video'>Video</option>
        <option value='audio'>Audio</option>
        </select>

      </div>
      <div className='form-fields'>
        <label htmlFor='title'>Post Title</label>
        <input type='text' name='title' id='title' placeholder='Post Title'></input>
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
