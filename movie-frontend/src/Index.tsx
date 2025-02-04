// Index.tsx
import {useReducer, useState} from "react";
import {initialState, Reducer} from "./reducer/Reducer"; // initialState를 가져옴
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import {Register} from "./userModal/Register.tsx";
import Swal from "sweetalert2";

export function Index() {
    const [state, dispatch] = useReducer(Reducer, initialState);  // initialState 사용

    const { username, password } = state.inputs;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch({
            type: 'ON_CHANGE',
            name,
            value
        });
    };

    const onLogin = () => {
        axios
            .post('http://localhost:8080/api/user/auth', { username: username, password: password })
            .then((resp) => {
                const { data } = resp;
                if (data !== null) {
                    localStorage.token = data.result.value;
                    const login = JSON.stringify(jwtDecode(data.result.value));
                    sessionStorage.setItem('login', login);
                    console.log(login);
                    axios.defaults.headers.common["Authorization"] = "Bearer+" + localStorage.token;
                    location.href = '/movie/movieAll/1';
                }
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: error.message
                })
            });
    };

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    };

    const handleShow = () =>{
        setShow(true);
    }

    return (
        <>
            <h1>로그인</h1>
            <input name='username' value={username} onChange={onChange} />
            <input type='password' name='password' value={password} onChange={onChange} />
            <br />
            <button onClick={onLogin}>로그인</button>
            <button onClick={handleShow}>회원 가입</button>
            <Register show={show} handleClose={handleClose} />
        </>
    );
}
