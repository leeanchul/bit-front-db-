import {React, useReducer} from "react";
import {UserReducer} from "../reducers/UserReducer.tsx";
import Form from 'react-bootstrap/Form';
import {Col, Row} from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

let intialState = {
    inputs: {
        username: '',
        password: '',
        nickname: ''
    }
}

function Register() {
    let [state, dispatch] = useReducer(UserReducer, intialState)

    let {username, password, nickname} = state.inputs

    let onChange = (e) => {
        let {name, value} = e.target

        dispatch({
            type: 'ON_CHANGE',
            name,
            value
        })
    }

    let onRegiseter = () => {
        axios
            .post('http://localhost:8080/api/user/register',
                {username: username, password: password, nickname: nickname})
            .then((resp) => {
                let {data} = resp
                if (data.result === 'fail') {
                    Swal.fire({
                        icon: 'error',
                        title: data.message
                    })
                } else {
                    Swal.fire({
                        icon: 'success',
                        title: data.message
                    }).then(() => {
                        location.href = '/'
                    })
                }
            })
    }

    return (
        <>
            <label htmlFor="username">아이디 </label>
            <input placeholder='아이디' name='username' value={username} onChange={onChange}/>
            <br/>
            <label htmlFor="password">비밀번호 </label>
            <input placeholder='비번' type='password' name='password' value={password} onChange={onChange}/>
            <br/>
            <label htmlFor="nickname">닉네임 </label>
            <input placeholder='닉네임' name='nickname' value={nickname} onChange={onChange}/>
            <br/>
            <button onClick={onRegiseter}>가입하기</button>
        </>
    )

}

export default Register