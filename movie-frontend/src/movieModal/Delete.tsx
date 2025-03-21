import {Button, Modal} from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";

export function Delete({showD,closeD,id,author}){
    let navigate=useNavigate()
    let onDelete=()=>{
        let login = JSON.parse(sessionStorage.getItem('login'))
        if(login.username === author){
            axios.get(`http://localhost:8080/api/movie/delete/${id}`)
                .then((resp) => {
                    let {data} = resp
                    if (data.result === 'success') {
                        Swal.fire({
                            icon: 'success',
                            title: '삭제되었습니다.'
                        }).then(() => {
                            navigate('/movie/movieAll/1')
                        })
                    }
                })
        } else {
            Swal.fire({
                icon: 'error',
                title: '본인이 작성한 게시글이 아닙니다..'
            })
        }
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