import axios from "axios"
import { Button, Modal } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"



export function ShowDelete({showD, closeD, id,refresh}) {
    let navigate = useNavigate()
    let onDelete = () => {
        axios.get(`http://localhost:9000/api/show/delete/${id}`)
            .then((resp) => {
                let {data} = resp
                refresh()
                closeD()
                  Swal.fire({
                        icon: 'success',
                        title: '삭제되었습니다.'
                    })
            })
    }

    return (
        <>
            <Modal
                show={showD}
                onHide={closeD}
            >
                <Modal.Header closeButton>
                    <Modal.Title>!!!경고!!!!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h1>정말 삭제합니까?</h1>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeD}>
                        취소
                    </Button>
                    <Button variant="primary" onClick={onDelete}>완료</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}