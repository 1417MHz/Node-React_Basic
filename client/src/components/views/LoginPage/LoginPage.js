import axios from 'axios'
import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import {loginUser} from '../../../_actions/user_action'

const LoginPage = (props) => {
    const dispatch = useDispatch()

    const [inputEmail, setEmail] = useState("")
    const [inputPassword, setPassword] = useState("")

    const onEmailChange = (event) => {
        setEmail(event.currentTarget.value)
    }
    const onPasswordChange = (event) => {
        setPassword(event.currentTarget.value)
    }
    const onSubmitHandler = (event) => {
        event.preventDefault();

        let body = {
            email: inputEmail,
            password: inputPassword
        }

        dispatch(loginUser(body))
        .then(response => {
            if(response.payload.loginSuccess) {
                props.history.push('/') // 로그인 성공시 루트 페이지로 이동
            } else {
                alert("Error")
            }
        })
    }

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'}}>
        
            <form style={{display: 'flex', flexDirection: 'column'}} onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type="email" value={inputEmail} onChange={onEmailChange} />
                <label>Password</label>
                <input type="password" value={inputPassword} onChange={onPasswordChange} />
                <br/>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginPage
