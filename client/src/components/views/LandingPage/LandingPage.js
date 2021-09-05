import React, {useEffect} from 'react';
import axios from 'axios';

const LandingPage = (props) => {
    useEffect(() => {
        axios.get('/api/hello')
        .then(response => { console.log(response) })
    }, [])

    const onClickHandler = () => {
        axios.get(`/api/user/logout`)
        .then(response => {
            if(response.data.success) {
                console.log("로그아웃 성공")
                props.history.push("/login")
            } else {
                alert("로그아웃 오류")
            }
        })
    }

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'}}>
            <h2>시작 페이지</h2>

            <button onClick={onClickHandler}>
                로그아웃
            </button>
        </div>
    )
}

export default LandingPage
