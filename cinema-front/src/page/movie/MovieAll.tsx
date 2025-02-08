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
    const [imageSrc, setImageSrc] = useState('');
    useEffect(() => {
        if (movie.filePath && movie.filePath !== ''){
            axios.get(`http://localhost:9000/api/movie/upload/${movie.filePath}`, {
                responseType: 'blob' // responseType을 'blob'으로 변경
            }).then((response) => {
                const blob = response.data; // 응답 데이터를 그대로 사용
                const imageUrl = URL.createObjectURL(blob); // Blob을 URL로 변환
                setImageSrc(imageUrl); // 변환된 URL을 상태에 저장
            })
        }
    }, [movie.filePath]);

    useEffect(()=>{
        axios
            .post(`http://localhost:9000/api/scope/scopeAvg`,
                {movieId: movie.id})
            .then((resp) => {
                const {data} = resp
                setScore(data.maxAvg)
                setCount(data.count)
            })
    },[count])
    let move=()=>{
        navigate(`/movie/movieOne/${movie.id}`)
    }
    return (
        <tr onClick={move}>
            <td>{imageSrc ? <img width='150px' height='150px' src={imageSrc} alt="이미지 없음"/> :
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-image-alt" viewBox="0 0 16 16">
                    <path
                        d="M7 2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m4.225 4.053a.5.5 0 0 0-.577.093l-3.71 4.71-2.66-2.772a.5.5 0 0 0-.63.062L.002 13v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4.5z"/>
                </svg>}</td>
            <td>{movie.id}</td>
            <td>{movie.title}</td>
            <td>{movie.director}</td>
            {count === 0 ? <td>별점이없어요</td> : <td>평균: {score} (총: {count}명)</td>}
        </tr>
    )
}

export function MovieAll() {
    const [state, dispatch] = useReducer(Reducer, initialstate)
    const navigate = useNavigate()
    const {pageNo} = useParams()
    // 영화 추가
    const [show, setShow] = useState(false)
    const InsertClose = ()=>{
        dispatch({
            type:'RESET_MOVIE'
        })
        setShow(false)
    }
    const InsertOpen = () => setShow(true)

    const refresh=()=>{
        axios
            .get(`http://localhost:9000/api/movie/movieAll/${pageNo}`)
            .then((resp) => {
                const {data} = resp
                dispatch({
                    type: 'ON_MOVIEALL',
                    list: data.content,
                    startPage: data.startPage,
                    endPage: data.endPage,
                    maxPage: data.maxPage,
                    currentPage: data.currentPage
                })
            })
    }

    useEffect(() => {
        refresh()
    },[pageNo])


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

            <Button variant="dark" onClick={InsertOpen} >영화 추가(관리자)</Button>
            <Insert show={show} InsertClose={InsertClose} refresh={refresh} />
            <Table>
                <thead>
                <tr>
                    <td>사진</td>
                    <td>번호</td>
                    <td>제목</td>
                    <td>감독</td>
                    <td>평점</td>
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