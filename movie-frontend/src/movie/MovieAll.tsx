import {useEffect, useReducer, useState} from "react";
import axios from "axios";
import {initialState, Reducer} from "../reducer/Reducer.tsx";
import {Button, Pagination, Table} from "react-bootstrap";
import {Insert} from "../movieModal/Insert.tsx";
import {useNavigate, useParams} from "react-router-dom";


function Print({movie}){
    const navigate=useNavigate()
    const [scope,setScope]=useState()
    const [count,setCount]=useState()
    let move=()=>{
        navigate(`/movie/movieOne/${movie.id}`)
    }
    useEffect(()=>{
        axios
            .get(`http://localhost:8080/api/scope/scopeAll/${movie.id}`)
            .then((resp)=>{
                const {data}=resp
                if(data.result==='success'){
                    setScope(data.avg)
                    setCount(data.count)
                }
            })
    },[movie.id])
    return (
        <tr onClick={move}>
            <td>{movie.id}</td>
            <td>{movie.title}</td>
            <td>{movie.director}</td>
            <td>{movie.entryDate}</td>
            <td>{scope} 점({count}명)</td>
        </tr>
    )
}

function MovieAll(){
    const [state,dispatch]=useReducer(Reducer,initialState)
    const navigate=useNavigate()
    let {pageNo} = useParams()
    const [show,setShow]=useState(false)
    const InsertClose=()=>setShow(false)
    const InsertOpen=()=>setShow(true)

    const token=localStorage.getItem('token')
    useEffect(()=>{
        axios
            .get(`http://localhost:8080/api/movie/movieAll/${pageNo}`)
            .then((resp)=>{
                const {data}=resp
                if(data.result==='success'){
                    dispatch({
                        type:'ON_SHOWALL_PAGE',
                        list:data.list,
                        startPage: data.startPage,
                        endPage: data.endPage,
                        maxPage: data.maxPage,
                        currentPage: data.currentPage
                    })
                }
            })
    },[pageNo,show])



    let pageItems = []

    pageItems.push(
        <Pagination.Item key="first" onClick={() => navigate('/movie/movieAll/1')}>
            {'<<'}
        </Pagination.Item>
    )
    for (let i = state.startPage; i <= state.endPage; i++) {
        pageItems.push(
            <Pagination.Item key={i} active={i === state.curerentPage} onClick={() => navigate(`/movie/movieAll/${i}`)}>
                {i}
            </Pagination.Item>
        )
    }
    pageItems.push(
        <Pagination.Item key="last" onClick={() => navigate(`/movie/movieAll/${state.maxPage}`)}>
            {'>>'}
        </Pagination.Item>
    )

    return (
        <>
            <Button variant="dark" onClick={()=>{
                navigate('/')
                sessionStorage.removeItem('login')
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
                   <td>별점 평균</td>
               </tr>
               </thead>
               <tbody>
               {state.list.map(movie => (
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

export default MovieAll