import {Button, Modal} from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

export function BoardDelete({showD, CloseD, nickname,id}) {
    let onDelete = (id) => {

        let login = JSON.parse(sessionStorage.getItem('login'))
        let token=sessionStorage.getItem('token')
        //if (login.nickname === nickname) {
            axios.get(`http://localhost:8080/api/board/delete/${id}`, {
                headers: {Authorization: `Bearer ${token}`}
            })
                .then((resp) => {
                    let {data} = resp
                    console.log(data)
                    //if (data.result === 'success') {
                        Swal.fire({
                            icon: 'success',
                            title: '삭제되었습니다.'
                        }).then(() => {
                            location.href = '/board/showAll/1'
                        })
                    //}

                })
        // } else {
        //     Swal.fire({
        //         icon: 'error',
        //         title: '본인이 작성한 게시글이 아닙니다..'
        //     })
        // }
    }
    return (
        <>
            <Modal
                show={showD}
                onHide={CloseD}
            >
                <Modal.Header closeButton>
                    <Modal.Title>!!!경고!!!!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h1>정말 삭제합니까?</h1>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={CloseD}>
                        취소
                    </Button>
                    <Button variant="primary" onClick={()=>{
                        onDelete(id)
                    }}>완료</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}