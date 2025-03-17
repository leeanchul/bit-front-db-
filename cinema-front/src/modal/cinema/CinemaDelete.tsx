import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

export function CinemaDelete({showD,closeD,id,refresh}){
    const onInsert=()=>{
        axios
        .get(`http://localhost:9000/api/cinema/delete/${id}`)
        .then((resp) => {
            const {data} = resp
            refresh()
            closeD()
            console.log(data)
            Swal.fire({
                icon: 'success',
                title: '삭제되었습니다.'
            })
        }).catch(()=>{
              Swal.fire({
                    icon: 'error',
                    title: '관리자 전용입니다.'
                })
        })
    }
    return(
        <>
        <Modal
            show={showD}
            onHide={closeD}
        >
            <Modal.Header closeButton>
                <Modal.Title>{id}극장 등록</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h1>진짜로?

                </h1>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeD}>
                    등록 취소
                </Button>
                <Button variant="primary" onClick={onInsert}>등록</Button>
            </Modal.Footer>
        </Modal>
    </>
    )
}