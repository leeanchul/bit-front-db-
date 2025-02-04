import {Button, Modal} from "react-bootstrap";
import {useReducer} from "react";
import {reducer} from "../reducers/BoardReducer.tsx";
import axios from "axios";
import Swal from "sweetalert2";

let initialState = {
    inputs: {
        title: '',
        content: ''
    }
}
export function Update({show,handleClose,id,test}){
    let [state, dispatch] = useReducer(reducer, initialState)
    let {title, content} = state.inputs


    let onChange = (e) => {
        let {name, value} = e.target

        dispatch({
            type: 'ON_CHANGE',
            name,
            value
        })
    }
    let onUpdate=()=>{
        let login = JSON.parse(sessionStorage.getItem('login'))
        console.log("udate")
        if (title === '' || content === ''){
            Swal.fire({
                icon: 'error',
                title: '제목과 내용을 입력해주세요'
            })
            return
        }
        let token=sessionStorage.getItem('token')
        axios
            .post('http://localhost:8080/api/board/update', {title: title, content: content, id: id}, {
                headers: {Authorization: `Bearer ${token}`}
            })
            .then((resp) => {
                console.log(resp)
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
                    <Modal.Title>수정 하자 ㅜ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input  name='title' placeholder={test.title} onChange={onChange}/>
                    <br/>
                    <input name='content' placeholder={test.content} onChange={onChange}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        수정 취소
                    </Button>
                    <Button variant="primary" onClick={onUpdate}>수정 완료</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
    
}