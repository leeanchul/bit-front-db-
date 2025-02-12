import Swal from "sweetalert2";
import {useState} from "react";
import axios from "axios";
import {Button, Modal} from "react-bootstrap";

export function ScopeUpdate({show, close, id,refresh}) {

    const [score, setScore] = useState(0);

    const onChange = (e) => {
        setScore(e.target.value);
    }
    const onUpdate = () => {
        if (score === 0) {
            Swal.fire({
                icon: 'error',
                title: '0점 이상 주세요ㅜㅜ'
            })
            return
        }
        axios
            .post(`http://localhost:9000/api/scope/scoreUpdate`,
                {id:id, score: score})
            .then((resp) => {
                const {data} = resp
                refresh()
                Swal.fire({
                    icon: 'success',
                    title: '별점이 수정되었습니다.'
                })
            }).catch(() => {
            Swal.fire({
                icon: 'error',
                title: '이미 별점을 남겼어요'
            })
        })
        setScore(0)
        close()
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
                    <input type="range" min='0' max='5' step='0.5' name='score' value={score} onChange={onChange}/>
                    <span>{score}</span>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={close}>
                        취소
                    </Button>
                    <Button variant="primary" onClick={onUpdate}>완료</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}