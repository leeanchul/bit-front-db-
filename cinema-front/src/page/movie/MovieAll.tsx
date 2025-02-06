import {useEffect, useReducer, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {Button, Pagination, Table} from "react-bootstrap";
import {Insert} from "../../modal/movie/Insert.tsx";
import {initialstate, Reducer} from "../../reducer/Reduecr.tsx";

function Print({movie}){
    const navigate=useNavigate()

    const [score, setScore] = useState(0)
    const [count, setCount] = useState(0)
    useEffect(()=>{
        axios
            .post(`http://localhost:9000/api/scope/scopeAvg`,
                {movieId: movie.id})
            .then((resp) => {
                const {data} = resp
                setScore(data.maxAvg)
                setCount(data.count)
            })
    },[])
    let move=()=>{
        navigate(`/movie/movieOne/${movie.id}`)
    }
    return (
        <tr onClick={move}>
            <td>{movie.id}</td>
            <td>{movie.title}</td>
            <td>{movie.director}</td>
            <td>{movie.relaseDate}</td>
            {count === 0 ? <td>별점이없어요</td> : <td>평균: {score} (총: {count}명)</td>}
        </tr>
    )
}

export function MovieAll(){
    const [state,dispatch]=useReducer(Reducer,initialstate)
    const navigate=useNavigate()
    const {pageNo}=useParams()
    // 영화 추가
    const [show,setShow]=useState(false)
    const InsertClose=()=>setShow(false)
    const InsertOpen=()=>setShow(true)


    useEffect(()=>{
        axios
            .get(`http://localhost:9000/api/movie/movieAll/${pageNo}`)
            .then((resp)=>{
                const {data}=resp
                dispatch({
                    type:'ON_MOVIEALL',
                    list: data.content,
                    startPage: data.startPage,
                    endPage: data.endPage,
                    maxPage: data.maxPage,
                    currentPage: data.currentPage
                })
            })
    },[pageNo,show])


    // page
    let pageItems = []

    pageItems.push(
        <Pagination.Item key='first' onClick={()=>navigate('/movie/movieAll/1')}>
            {'<<'}
        </Pagination.Item>
    )

    for (let i = state.movieAll.startPage; i <= state.movieAll.endPage; i++) {
        pageItems.push(
            <Pagination.Item key={i} active={i === state.movieAll.curerentPage} onClick={()=>navigate(`/movie/movieAll/${i}`)} >
                {i}
            </Pagination.Item>
        )
    }
    pageItems.push(
        <Pagination.Item key='last'  onClick={()=>navigate(`/movie/movieAll/${state.movieAll.maxPage}`)}>
            {'>>'}
        </Pagination.Item>
    )

    return (
        <>
            <Button variant="dark" onClick={()=>{
                navigate('/')
               localStorage.removeItem("token")
                delete axios.defaults.headers.common["Authorization"];
            }}>로그아웃</Button>
            <Button variant="dark" onClick={InsertOpen}>영화 추가</Button>
            <Insert show={show} InsertClose={InsertClose}/>
            <Table>
                <thead>
                <tr>
                    <td>번호</td>
                    <td>제목</td>
                    <td>감독</td>
                    <td>개봉일</td>
                </tr>
                </thead>
                <tbody>
                {state.movieAll.list.map(movie => (
                    <Print movie={movie} key={movie.id}/>
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
        </>
    )
}