import React from 'react';
import TokenService from '../services/token-service'
// create context
const Context = React.createContext();
export default Context


// create provider
export class ContextProvider extends React.Component {
    
    constructor(props) {
        super(props)
        const state = {
            currentBoard: null,
            loggedIn: TokenService.hasAuthToken()
        }
        this.state = state
    }

    setCurrentBoard = currentBoard => {
        this.setState({ currentBoard })
    }

    setLoggedIn = value => {
        this.setState({ loggedIn: value  })
    }

    // the component render method
    render() {
        const value = {
            // values
            currentBoard: this.state.currentBoard,
            loggedIn: this.state.loggedIn,
            // methods
            setCurrentBoard: this.setCurrentBoard,
            setLoggedIn: this.setLoggedIn
        };

        return (
            <Context.Provider value={value}>
                {this.props.children}
            </Context.Provider>
        )
    }
}