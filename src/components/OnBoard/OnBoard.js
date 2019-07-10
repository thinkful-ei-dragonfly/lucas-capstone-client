import React from 'react'

export default class OnBoard extends React.Component {
  render() {
    return (
      <div className='onboarding-page'>
        <header className='onboarding-header'>
          <h1 className='onboarding-heading-text'>Welcome to Colección</h1>
        </header>
        <div className='onboarding-content'>
          <h2>Colección is an interactive, multimedia, collage-style blog leveraging ReactJs, Express, jQuery, Node, PostgreSQL, and SASS</h2>
          <p>When a user is authenticated, they can build Text, Image, and Video posts.</p>
          <p>The author is able to rearrange and resize the posts in a collage-style. Those posts and style changes are stored in PostgreSQL database tables.</p>
          <p>When an unauthenticated end-user visits the page, they are able to interact with the page and manipulate</p>
          <h3>Using Colección</h3>
          <p>A Demo user has been created (username: <strong>demo_admin</strong>, password: <strong>Demouser123!</strong>)</p>
          <p><em>Additionally, you can register a new user by clicking the 'REGISTER' link</em></p>
          <p>Authenticated users are able to create a new post object. The post creation form will dynamically load relevant field forms based on your selection of post 'type'. You can create Photo, Video, and Text post objects</p>
          <p>Two asynchronous calls are made to the database. The post object is sent to the Colección Posts table including the title, caption, and other content. Another request is sent to the Styles table, sending the posts new ID as the foreign key.</p>
          <p>As an authenticated user (aka "Author") you can rearrange and resize the posts on your canvas. Using the browser API's <a href='https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver' target='_blank'>MutationObserver</a> interface to listen to DOM inline-style changes, we send PATCH requests to the Styles table to automatically save changes.</p>
          <p>This allows the "author" to design the collage and user-experience to their liking. End users will still be able to interact with the blog and move and resize components to their liking, but only the "author" can make permanent style changes. When the end user refreshes, they see the original styles made by the author</p>
        </div>
      </div>
    )
  }
}
