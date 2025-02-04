import {Button, Modal} from "react-bootstrap";
import {useReducer, useState} from "react";
import axios from "axios";
import {reducer} from "../reducers/BoardReducer.tsx";
import Swal from "sweetalert2";

let initialState = {
    inputs: {
        content: ''
    }
}

export function ReplyUpdate({showU, CloseU, id, boardId,nickname}) {
    let [state, dispatch] = useReducer(reducer, initialState)

    let {content}=state.inputs

    let onChange = (e) => {
        let {name, value} = e.target

        dispatch({
            type: 'ON_CHANGE',
            name,
            value
        })
    }
    let onUpdate = () => {
        let login = JSON.parse(sessionStorage.getItem('login'))
        let token = sessionStorage.getItem("token")

        // if(login.nickname!==nickname){
        //     Swal.fire({
        //         icon: 'error',
        //         title: '남의 댓글을 왜 수정해!!!'
        //     })
        //     return
        // }
        axios
            .post('http://localhost:8080/api/reply/update', {content: content, id: id},{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((resp) => {
                let {data} = resp
                console.log(data)
                CloseU()
                location.href=`/board/showOne/${boardId}`
                if (data.result === "success") {
                    CloseU()
                    location.href=`/board/showOne/${boardId}`
                }


            })
    }
    return (
        <>
            <Modal show={showU} onHide={CloseU} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>!!키배 금지!!!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {id} 댓글 수정: <input name='content' onChange={onChange}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={CloseU}>
                        취소
                    </Button>
                    <Button variant="primary" onClick={onUpdate}>
                        수정
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}