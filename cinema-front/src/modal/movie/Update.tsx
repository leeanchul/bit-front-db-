import {useReducer} from "react";
import {initialstate, Reducer} from "../../reducer/Reduecr.tsx";
import axios from "axios";
import Swal from "sweetalert2";
import {Button, Modal} from "react-bootstrap";


export function Update({showU, closeU, id, test}) {

    const [state, dispatch] = useReducer(Reducer, initialstate)
    const {title, content, director,date} = state.movie

    const onChange = (e) => {
        let {name, value} = e.target

        dispatch({
            type: 'ON_CHANGE_MOVIE',
            name,
            value
        })
    }

    const onUpdate = () => {
        axios
            .post('http://localhost:9000/api/movie/update',
                {
                    title: title || test.title,
                    content: content || test.content,
                    director: director || test.director,
                    date:date || test.relaseDate,
                    id: id
                })
            .then((resp) => {
                Swal.fire({
                    icon: 'success',
                    title: '게시글 수정 완료~!!'
                })
                closeU()
            })

    }

    return (
        <>
            <Modal
                show={showU}
                onHide={closeU}
            >
                <Modal.Header closeButton>
                    <Modal.Title> 수정 </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    영화 제목: <input name='title' placeholder={test.title} onChange={onChange}/>
                    <br/>
                    영화 감독: <input name='director' placeholder={test.director} onChange={onChange}/>
                    <br/>
                    줄거리: <input name='content' placeholder={test.content} onChange={onChange}/>
                    <br/>
                    개봉일: <input type="date" name='date' onChange={onChange}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeU}>
                        취소
                    </Button>
                    <Button variant="primary" onClick={onUpdate}>완료</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}