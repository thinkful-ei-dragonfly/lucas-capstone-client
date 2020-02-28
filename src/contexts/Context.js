import React from 'react';

// create context
const Context = React.createContext();
export default Context


// create provider
export class ContextProvider extends React.Component {
    
    constructor(props) {
        super(props)
        const state = {
            currentBoard: null
        }
        this.state = state
    }

    setCurrentBoard = currentBoard => {
        this.setState({ currentBoard })
    }

    // the component render method
    render() {
        const value = {
            // values
            currentBoard: this.state.currentBoard,
            // methods
            setCurrentBoard: this.setCurrentBoard
        };

        return (
            <Context.Provider value={value}>
                {this.props.children}
            </Context.Provider>
        )
    }
}