import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import {registerUser} from '../../../_actions/user_action'

function RegisterPage(props) {
    const dispatch = useDispatch()

    const [inputEmail, setEmail] = useState("")
    const [inputName, setName] = useState("")
    const [inputPassword, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const onEmailChange = (event) => {
        setEmail(event.currentTarget.value)
    }
    const onNameChange = (event) => {
        setName(event.currentTarget.value)
    }
    const onPasswordChange = (event) => {
        setPassword(event.currentTarget.value)
    }
    const onConfirmPasswordChange = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }
    const onSubmitHandler = (event) => {
        event.preventDefault();

        if(inputPassword !== confirmPassword) {
            return alert("비밀번호를 다시 확인하세요.");
        }
        let body = {
            email: inputEmail,
            name: inputName,
            password: inputPassword
        }

        dispatch(registerUser(body))
        .then(response => {
            if(response.payload.success) {
                props.history.push("./login") // 회원가입 성공시 로그인 페이지로 이동
            } else {
                alert("회원가입 실패.")
            }
        })
    }

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'}}>
        
            <form style={{display: 'flex', flexDirection: 'column'}} onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type="email" value={inputEmail} onChange={onEmailChange} />
                
                <label>Name</label>
                <input type="text" value={inputName} onChange={onNameChange} />
                
                <label>Password</label>
                <input type="password" value={inputPassword} onChange={onPasswordChange} />
                
                <label>Confirm Password</label>
                <input type="password" value={confirmPassword} onChange={onConfirmPasswordChange} />
                
                <br/>
                <button type="submit">회원가입</button>
            </form>
        </div>
    )
}

export default RegisterPage
