import {Button, Modal} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useEffect, useReducer} from "react";
import {initialState, Reducer} from "../reducer/Reducer.tsx";
import axios from "axios";
import Swal from "sweetalert2";


export function Register({show,handleClose}){
    let [state,dispatch]=useReducer(Reducer,initialState)
    let {username,password,nickname}=state.inputs
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
        axios
            .post('http://localhost:8080/api/user/register', {username: username, password: password,nickname:nickname})
            .then((resp)=>{
                let {data}=resp
                if(data.result==='success'){
                    console.log(data)
                    Swal.fire({
                        icon: 'success',
                        title: data.message
                    })
                    handleClose()
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: data.message
                    })
                }

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
                    <Button variant="primary" onClick={onRegister}>Understood</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}