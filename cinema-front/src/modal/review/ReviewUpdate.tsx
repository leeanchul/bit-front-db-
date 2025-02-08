import Swal from "sweetalert2";
import {useState} from "react";
import axios from "axios";
import {Button, Modal} from "react-bootstrap";

export function ReviewUpdate({show,close,id,refresh}){

    const [review, setReview] = useState('');

    const onChange = (e) => {
        setReview(e.target.value);
    }

    const onUpdate=()=>{
        axios
            .post('http://localhost:9000/api/review/update',
                {review:review ,id:id})
            .then((resp) => {
                const {data}=resp
                refresh()
                close()
                    Swal.fire({
                        icon: 'success',
                        title: '리뷰 수정 완료~!!'
                    })
            })
    }
    return (
        <>
            <Modal
                show={show}
                onHide={close}
            >
                <Modal.Header closeButton>
                    <Modal.Title>댓글 수정 </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  수정할 댓글: <input name='review' onChange={onChange}/>
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