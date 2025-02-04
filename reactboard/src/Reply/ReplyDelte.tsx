import {Button, Modal} from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

export function ReplyDelte({showD,CloseD,nickname,id,boardId}){

    let onDelete = (id) => {

        let login = JSON.parse(sessionStorage.getItem('login'))
        let token = sessionStorage.getItem("token")
       // if (login.nickname === nickname) {
            axios.get(`http://localhost:8080/api/reply/delete/${id}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((resp) => {
                    let {data} = resp
                    console.log(data)
                    CloseD()
                    location.href = `/board/showOne/${boardId}`
                    if (data.result === 'success') {
                        Swal.fire({
                            icon: 'success',
                            title: '삭제되었습니다.'
                        }).then(() => {
                            location.href = `/board/showOne/${boardId}`
                        })
                    }

                })
        // } else {
        //     Swal.fire({
        //         icon: 'error',
        //         title: '본인이 작성한 게시글이 아닙니다..'
        //     })
        // }
    }
    return (
        <Modal show={showD} onHide={CloseD} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>!!!경고!!!</Modal.Title>
            </Modal.Header>
            <Modal.Body>댓글을 영구적으로 삭제됩니다.{id}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={CloseD}>
                    삭제 취소!
                </Button>
                <Button variant="primary" onClick={()=>{
                    onDelete(id)
                }}>영구 삭제</Button>
            </Modal.Footer>
        </Modal>
    )

}