import {Button, Modal} from "react-bootstrap";
import {useState} from "react";
import Swal from "sweetalert2";
import axios from "axios";

export function ScopeInsert({show,close,movieId}){

    const [score, setScore] = useState(0);

    const onChange = (e) => {
        setScore(e.target.value);
    }
    const onInsert=()=>{
        const login = JSON.parse(sessionStorage.getItem('login'))
        if(score===0){
            Swal.fire({
                icon: 'error',
                title: '0점 이상 주세요ㅜㅜ'
            })
            return
        }
        axios
            .post(`http://localhost:8080/api/scope/insert`,
                {movieId:movieId,userId:login.userId,score:score})
            .then((resp)=>{
                const {data} = resp
                if(data.result==='success') {
                    Swal.fire({
                        icon: 'success',
                        title: '소중한 별점 감사합니다!'
                    })
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: '이미 별점을 남겼어요'
                    })
                }
                close()
            }).catch((e)=>console.log(e))
    }
    return (
        <>
            <Modal
                show={show}
                onHide={close}
            >
                <Modal.Header closeButton>
                    <Modal.Title>!!별점!!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="range" min='0' max='5' step='0.5' name='score' vlaue={score} onChange={onChange}/>
                    <span>{score}</span>
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