import {Button, Modal} from "react-bootstrap";
import {useReducer, useState} from "react";
import {initialState, Reducer} from "../reducer/Reducer.tsx";
import Swal from "sweetalert2";
import axios from "axios";

export function Insert({show, InsertClose}) {
    let [state, dispatch] = useReducer(Reducer, initialState);
    let {title, content, director} = state.insert;

    let onChange = (e) => {
        let {name, value} = e.target;

        dispatch({
            type: 'ON_CHANGE_MOVIE',
            name,
            value
        });
    };

    const [file, setFile] = useState(null);

    let onFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    let onInsert = () => {
        let login = JSON.parse(sessionStorage.getItem('login'));
        const Author = login.username;

        if (title === '' || content === '' || director === '') {
            Swal.fire({
                icon: 'error',
                title: '제목과 내용을 입력해주세요'
            });
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('director', director);
        formData.append('author', Author);

        if (file !== null) {
            formData.append('file', file);
        }

        axios
            .post(`http://localhost:8080/api/movie/insert`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            .then((resp) => {
                console.log(resp);
                InsertClose();
            });
    };

    return (
        <>
            <Modal
                show={show}
                onHide={InsertClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>영화 등록</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    영화 제목: <input name='title' onChange={onChange}/>
                    <br/>
                    감독 이름: <input name='director' onChange={onChange}/>
                    <br/>
                    영화 내용: <input name='content' onChange={onChange}/>
                    <br/>
                    <input type="file" name='file' onChange={onFileChange}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={InsertClose}>
                        등록 취소
                    </Button>
                    <Button variant="primary" onClick={onInsert}>등록</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
