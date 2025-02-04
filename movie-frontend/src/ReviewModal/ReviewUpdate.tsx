import {Button, Modal} from "react-bootstrap";
import {useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";

export function ReviewUpdate({show,close,id}){

    let [content, setContent] = useState('');

    let onChange = (e) => {
        setContent(e.target.value);
    }

    let onUpdate=()=>{
        axios
            .post('http://localhost:8080/api/review/update',
                {content:content ,id:id})
            .then((resp) => {
                const {data}=resp
                if(data.result==='success'){
                    Swal.fire({
                        icon: 'success',
                        title: '리뷰 수정 완료~!!'
                    })
                }else{
                    console.log(data.message)
                }
                close()
            })
    }
    return (
        <>
            <Modal
                show={show}
                onHide={close}
            >
                <Modal.Header closeButton>
                    <Modal.Title> 수정 </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input name='content' onChange={onChange}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={close}>
                        취소
                    </Button>
                    <Button variant="primary" onClick={onUpdate} >완료</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}