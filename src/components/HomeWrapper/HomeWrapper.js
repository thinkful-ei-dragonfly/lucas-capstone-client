import React, {useState} from 'react'
import TokenService from '../../services/token-service'
import LoginPage from '../../routes/LoginPage/LoginPage'
import BoardList from '../BoardList/BoardList'

const HomeWrapper = props => {
    const [LoggedIn, setLoggedIn] = useState(TokenService.hasAuthToken());
    
    return (
        <>
            {LoggedIn ? <BoardList /> : <LoginPage props={props}/>}
        </>
    )
}
export default HomeWrapper