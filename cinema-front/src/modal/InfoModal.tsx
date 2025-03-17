import axios from "axios";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";

export function InfoModal({show,close,info,refresh}){

    const [newNickname,setNewNickname]=useState('')
    const [ok,setOk]=useState(false)

    const onChange = (e) => {
        setOk(false);
        setNewNickname(e.target.value);
    };

    const onUpdate=()=>{
        axios
        .post(`http://localhost:9000/api/user/update`,
            {
                id:info.id, newNickname:newNickname
            }
        )
        .then((resp) => {
            const {data} = resp
            refresh()
            close()
               Swal.fire({
                    icon: 'success',
                    title: '영화 수정 되었습니다.'
                });
        })
        
    }
    
    return(
        <>
        <Modal
            show={show}
            onHide={close}
        >
            <Modal.Header closeButton>
                <Modal.Title>정보 수정</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h3>닉네임: {info.nickname}</h3>
                변경할 닉네임: <input name="newNickname" onChange={onChange} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={close}>
                    취소
                </Button>
                <Button variant="primary" onClick={onUpdate}>수정</Button>
            </Modal.Footer>
        </Modal>
    </>
    )
}