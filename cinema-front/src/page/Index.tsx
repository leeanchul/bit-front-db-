import {useReducer, useState} from "react";
import {initialstate, Reducer} from "../reducer/Reduecr.tsx";
import axios from "axios";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";
import {Register} from "../modal/Registrer.tsx";

export function Index(){
    const [state, dispatch] = useReducer(Reducer, initialstate);  // initialState 사용


    const { username, password } = state.user;

    const navigate=useNavigate()
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    };

    const handleShow = () =>{
        setShow(true);
    }
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
            .post('http://localhost:9000/api/user/auth', { username: username, password: password })
            .then((resp) => {
                const { data } = resp;
                if(data !==null){
                    Swal.fire({
                        icon: 'success',
                        title: '로그인 성공'
                    }).then(()=>{
                        localStorage.token=data
                        axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.token;
                        navigate("/movie/movieAll/1")
                    })

                }
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: error.message
                })
            }).then(()=>{
            dispatch({
                type: 'RESET'
            });
        });
    };
    return (
        <>
            <h1>Cinema</h1>
            <br/>
            <h3>로그인</h3>
            아이디: <input name='username' value={username} onChange={onChange}/>
            <br/>
            비밀번호: <input type='password' name='password' value={password} onChange={onChange}/>
            <br/>
            <button onClick={onLogin}>로그인</button>
            <button onClick={handleShow}>회원 가입</button>
            <Register show={show} handleClose={handleClose}/>
        </>
    )
}