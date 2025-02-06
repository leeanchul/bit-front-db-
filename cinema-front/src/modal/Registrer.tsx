import {Button, Modal} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useEffect, useReducer} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {initialstate, Reducer} from "../reducer/Reduecr.tsx";


export function Register({show,handleClose}){
    let [state,dispatch]=useReducer(Reducer,initialstate)
    let {username,password,nickname}=state.user
    useEffect(() => {
        dispatch({
            type:'RESET'
        })
    },[handleClose]);

    let onChange=(e)=>{

        let {name,value}=e.target
        dispatch({
            type:'ON_CHANGE',
            name,
            value
        })
    }
    let onRegister=()=>{
        if(username === '' || password === '' || nickname ===''){
            Swal.fire({
                icon: 'error',
                title: "모든 필드를 입력해주세요"
            })
            return
        }
        axios
            .post('http://localhost:9000/api/user/register', {username: username, password: password,nickname:nickname})
            .then((resp)=>{
                let {data}=resp
                    Swal.fire({
                        icon: 'success',
                        title: data
                    })
                handleClose()
            })
    }

    return(
        <>
            <Modal
                show={show}
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>회원 가입</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    아이디: <input name='username' value={username} onChange={onChange}/>
                    <br/>
                    비밀번호: <input type='password' name='password' value={password} onChange={onChange}/>
                    <br/>
                    닉네임: <input name='nickname' value={nickname} onChange={onChange}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onRegister}>Join</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}