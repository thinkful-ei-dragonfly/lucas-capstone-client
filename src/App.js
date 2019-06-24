import React from 'react';
import './App.scss';
import $ from 'jquery';
import 'jquery-ui'
import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/ui/widgets/resizable';
import { Route, Link } from 'react-router-dom'
import config from './config.js'
import PostList from './PostList/PostList'
import PostContext from './PostContext/PostContext'

export default class App extends React.Component{
  state = {
    posts: []
  }
  componentDidMount() {

    Promise.all([fetch(`${config.API_ENDPOINT}`).then(res => res.json())])
      .then(posts => {
        this.setState({
          posts: posts[0]
        })
      })

    // $('.draggable').draggable();
    // $('.draggable').resizable({
    //   aspectRatio: true
    // })
    //
  }

  renderMainContent() {
    const { posts } = this.state
    return (
      <>
        <Route
          exact
          path="/login"
          render={routeProps => (
            <div><h1>Login</h1></div>
          )}
          />
        <Route
          exact
          path="/"
          render={routeProps => (
            <PostList
              posts={posts}
              />
          )}
          />
      </>
    )
  }
  render() {
    const contextValue = { posts: this.state.posts }
    return (
      <PostContext.Provider value={contextValue}>
        <div className="App">
          <header className="header">
            <Link to="/"><p>Colección</p></Link>
          </header>
          <main className="main-content">
            {this.renderMainContent()}
          </main>
        </div>
      </PostContext.Provider>
    );
  }
}
