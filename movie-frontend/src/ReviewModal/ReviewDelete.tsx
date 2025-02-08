import {Button, Modal} from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";

export function ReviewDelete({showD,closeD,id,nickname,movieId,refresh}){
    let navigate=useNavigate()
    let onDelete=()=>{
        let login = JSON.parse(sessionStorage.getItem('login'))
        if(login.nickname === nickname){
            axios.get(`http://localhost:8080/api/review/delete/${id}`)
                .then((resp) => {
                    let {data} = resp
                    closeD()
                    if (data.result === 'success') {
                        refresh()
                        navigate(`/movie/movieOne/${movieId}`)
                        Swal.fire({
                            icon: 'success',
                            title: '삭제되었습니다.'
                        }).then(() => {


                        })
                    }
                })
        } else {
            Swal.fire({
                icon: 'error',
                title: '본인이 작성한 게시글이 아닙니다..'
            })
        }

        closeD()
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
                    <p>{id}</p>
                    <p>{movieId}</p>
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