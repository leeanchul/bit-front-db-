import {Button, Modal} from "react-bootstrap";
import {useState} from "react";
import Swal from "sweetalert2";
import axios from "axios";

export function ReviewInsert({show,close,movieId}){

    const [content, setContent] = useState('');

    const onChange = (e) => {
        setContent(e.target.value);
    }

    const onInsert=()=>{
        const login = JSON.parse(sessionStorage.getItem('login'))
        if(content===''){
            Swal.fire({
                icon: 'error',
                title: '리뷰 내용을 입력해주세요'
            })
            return
        }
        axios
            .post(`http://localhost:8080/api/review/insert`,
                {userId:login.userId,content:content,movieId:movieId})
            .then((resp)=>{
                const {data}=resp
                if(data.result==='success'){
                    Swal.fire({
                        icon: 'success',
                        title: data.result
                    })
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: data.message
                    })
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