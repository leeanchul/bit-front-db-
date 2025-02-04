import {useNavigate, useParams} from "react-router";
import axios from "axios";
import {useEffect, useReducer, useState} from "react";
import {reducer} from "../reducers/BoardReducer.tsx";
import {Pagination, Table} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

let initalState = {
    list: [],
    startPage: 1,
    endPage: 0,
    maxPage: 0,
    currentPage: 0
}

interface PageInfo {
    list: [],
    startPage: number,
    endPage: number,
    maxPage: number,
    currentPage: number
}


function Board({board}) {
    let moveToShowOne = () => {
        location.href = `/board/showOne/${board.id}`
    }
    let entryDate=new Date(board.entryDate);
    let modifyDate=new Date(board.modifyDate);
    return (
        <tr onClick={moveToShowOne}>
            <td>{board.id}</td>
            <td>{board.title}</td>
            <td>{board.writerNickname}</td>
            <td>{entryDate.toLocaleString("ko-kr")}</td>
            <td>{modifyDate.toLocaleString("ko-kr")}</td>
        </tr>

    )
}


function ShowAll() {
    let [state, dispatch] = useReducer(reducer, initalState)

    let {pageNo} = useParams()

    let token = sessionStorage.getItem("token")
    useEffect(() => {
        axios.get(`http://localhost:8080/api/board/showAll/${pageNo}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((resp) => {
                let {data} = resp
                let temp = {
                    list: data.content,
                    startPage: data.startPage,
                    endPage: data.endPage,
                    maxPage: data.maxPage,
                    currentPage: data.currentPage
                }
                dispatch({
                    type: 'ON_SHOW_ALL_LOAD', temp
                })
            })
    }, [pageNo])

    // page
    let pageItems = []

    const navigate=useNavigate()
    pageItems.push(
        <Pagination.Item key='first' onClick={()=>navigate('/board/showAll/1')}>
            {'<<'}
        </Pagination.Item>
    )

    for (let i = state.startPage; i <= state.endPage; i++) {
        pageItems.push(
            <Pagination.Item key={i} active={i === state.curerentPage} onClick={()=>navigate(`/board/showAll/${i}`)} >
                {i}
            </Pagination.Item>
        )
    }
    pageItems.push(
        <Pagination.Item key='last'  onClick={()=>navigate(`/board/showAll/${state.maxPage}`)}>
            {'>>'}
        </Pagination.Item>
    )

    return (
        <div>
            <button onClick={() => {
                location.href = '/board/insert'
            }}>글 작성
            </button>
            <Table striped bordered hover variant="dark">
                <thead>
                <tr>
                    <td>글번호</td>
                    <td>제목</td>
                    <td>작성자</td>
                    <td>작성일</td>
                    <td>수정일</td>
                </tr>
                </thead>
                <tbody>
                {state.list.map(board => (
                    <Board board={board} key={board.id}/>
                ))}
                <tr>
                    <td colSpan={6}>
                        <Pagination>
                            {pageItems}
                        </Pagination>
                    </td>
                </tr>
                </tbody>
            </Table>

        </div>
    )
}

export default ShowAll