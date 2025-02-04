import {Button, Modal} from "react-bootstrap";
import {useReducer} from "react";
import {reducer} from "../reducers/BoardReducer.tsx";
import Swal from "sweetalert2";
import axios from "axios";

let initialState = {
    inputs: {
        content: ''
    }
}

export function ReplyWrite({show, handleClose, boardId}) {
    let [state, dispatch] = useReducer(reducer, initialState)

    let {content} = state.inputs
    let onChange = (e) => {
        let {name, value} = e.target

        dispatch({
            type: 'ON_CHANGE',
            name,
            value
        })
    }
    let onInsert = () => {
        let login = JSON.parse(sessionStorage.getItem('login'))
        if (content === '') {
            Swal.fire({
                icon: 'error',
                title: '내용을 입력해주세요'
            })
            return
        }
        //if (login !== null) {
        let token = sessionStorage.getItem("token")
            axios
                .post('http://localhost:8080/api/reply/write', {content: content, boardId: boardId},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                .then((resp) => {
                    let {data} = resp
                    console.log(data)
                    handleClose()
                    // if (data.result === 'success') {
                    //     handleClose()
                    // }else{
                    //     Swal.fire({
                    //         icon: 'error',
                    //         title: data.message
                    //     })
                    // }
                })
       // }


    }
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>댓글 달기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>댓글을 이쁘게 달아주세요!!ㅡㅡ</p>
                   댓글: <input name='content' onChange={onChange}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        취소
                    </Button>
                    <Button variant="primary" onClick={onInsert}>완료</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}