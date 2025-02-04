import {useParams} from "react-router";
import {useEffect, useReducer, useState} from "react";
import axios from "axios";
import {reducer} from "../reducers/BoardReducer.tsx";
import {Modal, Table} from "react-bootstrap";
import Swal from "sweetalert2";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Update} from "./Update.tsx";
import ReplyAll from "../Reply/ReplyAll.tsx";
import {BoardDelete} from "./BoardDelete.tsx";


function ShowOne() {

    let {id} = useParams()

    let [state, dispatch] = useReducer(reducer, {})

    // update 모달
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // delete 모달
    const [showD, setShowD] = useState(false);
    const CloseD = () => setShowD(false);
    const OpenD = () => setShowD(true);
    let token=sessionStorage.getItem("token")
    useEffect(() => {
        axios.get(`http://localhost:8080/api/board/showOne/${id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
            .then((resp) => {
                let {data} = resp
                    dispatch({
                        type: 'ON_SHOW_ONE_LOAD',
                        item: data
                    })
            })
    }, [show,showD])


    let test = {
        title: state.title,
        content: state.content
    }

    return (
        <>
            <button onClick={() => {
                location.href = '/board/showAll/1'
            }}>목록보기
            </button>
            <Table>
                <thead/>
                <tbody>
                <tr>
                    <td>글 번호</td>
                    <td>{state.id}</td>
                </tr>
                <tr>
                    <td>제목</td>
                    <td>{state.title}</td>
                </tr>
                <tr>
                    <td>작성자</td>
                    <td>{state.writerNickname}</td>
                </tr>
                <tr>
                    <td>작성일</td>
                    <td>{state.entryDate}</td>
                </tr>
                <tr>
                    <td>수정일</td>
                    <td>{state.modifyDate}</td>
                </tr>
                <tr>
                    <td colSpan={2}>내용</td>
                </tr>
                <tr>
                    <td colSpan={2}>{state.content}</td>
                </tr>
                </tbody>
            </Table>
            <button onClick={handleShow}>수정</button>
            <button onClick={OpenD}>삭제
            </button>
            <BoardDelete showD={showD} CloseD={CloseD} nickname={state.nickname} id={state.id}/>
            <Update show={show} handleClose={handleClose} id={state.id} test={test}/>
            <hr/>
            <br/>
            <h1>-----------경계선------------</h1>
            <br/>
            <ReplyAll boardId={state.id}/>
        </>
    )
}

export default ShowOne