import React, {useState, useContext} from 'react'
import Context from '../../contexts/Context'
import LoginPage from '../../routes/LoginPage/LoginPage'
import BoardList from '../BoardList/BoardList'

const HomeWrapper = props => {
    const {loggedIn} = useContext(Context)
    
    return (
        <>
            {loggedIn ? <BoardList /> : <LoginPage props={props}/>}
        </>
    )
}
export default HomeWrapper