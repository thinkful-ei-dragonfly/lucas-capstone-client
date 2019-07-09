import React from 'react';
import './App.scss';
import 'jquery-ui'
import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/ui/widgets/resizable';
import { Route, Switch } from 'react-router-dom'
import PostList from '../PostList/PostList'
import Header from '../Header/Header'
import AddPost from '../AddPost/AddPost'
import EditPost from '../EditPost/EditPost'
import LoginPage from '../../routes/LoginPage/LoginPage'
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage'
import PrivateRoute from '../Utils/PrivateRoute'
import PublicOnlyRoute from '../Utils/PublicOnlyRoute'
import AuthApiService from '../../services/auth-api-service'
import IdleService from '../../services/idle-service'
import TokenService from '../../services/token-service'

export default class App extends React.Component{
  state = {
    posts: [],
    styles: [],
    hasError: false
  }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  componentDidMount() {

    /*
      set the function (callback) to call when a user goes idle
      we'll set this to logout a user when they're idle
    */
    IdleService.setIdleCallback(this.logoutFromIdle)

    /* if a user is logged in */
    if (TokenService.hasAuthToken()) {
      /*
        tell the idle service to register event listeners
        the event listeners are fired when a user does something, e.g. move their mouse
        if the user doesn't trigger one of these event listeners,
          the idleCallback (logout) will be invoked
      */
      IdleService.registerIdleTimerResets()

      /*
        Tell the token service to read the JWT, looking at the exp value
        and queue a timeout just before the token expires
      */
      TokenService.queueCallbackBeforeExpiry(() => {
        /* the timoue will call this callback just before the token expires */
        AuthApiService.postRefreshToken()
      })
    }
  }

  componentWillUnmount() {
    /*
      when the app unmounts,
      stop the event listeners that auto logout (clear the token from storage)
    */
    IdleService.unRegisterIdleResets()
    /*
      and remove the refresh endpoint request
    */
    TokenService.clearCallbackBeforeExpiry()
  }

  logoutFromIdle = () => {
    /* remove the token from localStorage */
    TokenService.clearAuthToken()
    /* remove any queued calls to the refresh endpoint */
    TokenService.clearCallbackBeforeExpiry()
    /* remove the timeouts that auto logout when idle */
    IdleService.unRegisterIdleResets()
    /*
      react won't know the token has been removed from local storage,
      so we need to tell React to rerender
    */
    this.forceUpdate()
  }


  renderMainContent() {
    const { posts, styles } = this.state
    return (
      <>
        <Route
          exact
          path="/"
          render={routeProps => (
            <PostList
              posts={posts}
              styles={styles}
              />
          )}
          />
        <PrivateRoute
          exact
          path='/add-post'
          component={AddPost}
          />
          <PrivateRoute
            path={'/post/:post_id'}
            component={EditPost}
            posts={this.state.posts}
          />
      </>
    )
  }
  render() {
    return (
      <>
        <Header/>
        <div className="App">
          <main className="main-content">
            {this.state.hasError && <p className='red'>There was an error! Oh no!</p>}
            <Switch>
              <PublicOnlyRoute
                path={'/login'}
                component={LoginPage}
                />
                <PublicOnlyRoute
                path={'/register'}
                component={RegistrationPage}
              />
            {this.renderMainContent()}
            </Switch>
          </main>
        </div>
      </>
    );
  }
}
