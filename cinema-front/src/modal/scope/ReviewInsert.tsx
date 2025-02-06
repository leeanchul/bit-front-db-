import Swal from "sweetalert2";
import {useState} from "react";
import axios from "axios";
import {Button, Modal} from "react-bootstrap";

export function ReviewInsert({show,close,movieId}) {

    const [review, setReview] = useState('');

    const onChange = (e) => {
        setReview(e.target.value);
    }

    const onInsert = () => {
        if (review === '') {
            Swal.fire({
                icon: 'error',
                title: '리뷰 내용을 입력해주세요'
            })
            return
        }
        axios
            .post(`http://localhost:9000/api/scope/reviewInsert`,
                { review: review, movieId: movieId})
            .then((resp) => {
                const {data} = resp
                    Swal.fire({
                        icon: 'success',
                        title: '리뷰 작성 완료!'
                    })

            }).catch(()=>{
            Swal.fire({
                icon: 'error',
                title: "리뷰 작성은 한번만 됩니다."
            })
        })
        close()
    }

    return (
        <>
            <Modal
                show={show}
                onHide={close}
            >
                <Modal.Header closeButton>
                    <Modal.Title>!!!리뷰!!!!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h1>리뷰는 영화 한편당 하나만 달수있어요!</h1>
                    <input name='content' onChange={onChange}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={close}>
                        취소
                    </Button>
                    <Button variant="primary" onClick={onInsert}>완료</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}