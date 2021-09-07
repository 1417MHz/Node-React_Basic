import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action.js'

const UserAuth = (SpecificComponent, option, adminRoute = null) => {
    // option
    // 1. null = 아무나 출입이 가능한 페이지
    // 2. true = 로그인한 유저만 출입이 가능한 페이지
    // 3. false = 로그인한 유저는 출입 불가능한 페이지

    const AuthCheck = (props) => {
        const dispatch = useDispatch()
        useEffect(() => {
            // 백엔드에서 가져온 정보들이 response에 담김
            dispatch(auth()).then(response => {
                console.log(response)

                // 로그인 하지 않은 상태
                if(!response.payload.isAuth) {
                    if(option === true) {
                        props.history.push('/login')
                    }
                } else { // 로그인 한 상태
                    // Admin이 아닌데 Admin 전용 페이지에 들어가려는 경우
                    if(adminRoute && !response.payload.isAdmin) {
                        props.history.push('/')
                    } else {
                        // 로그인 한 상태로는 들어갈 수 없는 페이지를 들어가려는 경우
                        if(option === false) {
                            props.history.push('/')
                        }
                    }
                }
            })
        })

        return (
            <SpecificComponent {...props}/>
        )
    }

    return AuthCheck
}

export default UserAuth
