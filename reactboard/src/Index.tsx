import * as React from "react";
import {useReducer} from "react";
import {UserReducer} from "./reducers/UserReducer.tsx";
import axios from "axios";
import Swal from 'sweetalert2';

let initialState = {
    inputs: {
        username: '',
        password: ''
    }
}

function Index() {

    let [state, dispatch] = useReducer(UserReducer, initialState)

    let {username, password} = state.inputs

    let onChange = (e) => {
        let {name, value} = e.target

        dispatch({
            name,
            type: 'ON_CHANGE',
            value
        })
    }

    let onLogIn = () => {
        // Axios 는 react 에서 사용하는
        // 비동기 통신 라이브러리다.
        axios
            .post('http://localhost:8080/api/user/auth', {username: username, password: password})
            .then((resp) => {
                let {data} = resp

                sessionStorage.setItem('token', data)
                location.href = '/board/showAll/1'


                // board_backend 랑할때
                // if (data.result === 'success!') {
                //    // Json 형태로 오기때문에 아래와 같은 설정을한다.
                //     let login = JSON.stringify(data.login)
                //     sessionStorage.setItem('login', login)
                //     sessionStorage.setItem('token',data.token)
                //     location.href = '/board/showAll/1'
                //     Swal.fire({
                //         icon: 'success',
                //         title: '반가워여'
                //     })
                // } else {
                //     Swal.fire({
                //         icon: 'error',
                //         title: data.message
                //     })
                // }
            }).catch((e) => console.log(e))
    }

    let moveToRegister = () => {
        location.href = '/user/register'
    }

    return (
        <>
            <input name='username' value={username} onChange={onChange}/>
            <br/>
            <input type='password' name='password' value={password} onChange={onChange}/>
            <br/>
            <button onClick={onLogIn}>로그인</button>
            <button onClick={moveToRegister}>회원 가입</button>
        </>
    )
}

export default Index