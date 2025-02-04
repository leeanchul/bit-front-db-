import {useEffect, useReducer, useState} from "react";
import {initialState, Reducer} from "../reducer/Reducer.tsx";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {Button, Table} from "react-bootstrap";
import {Delete} from "../movieModal/Delete.tsx";
import {Update} from "../movieModal/Update.tsx";
import {ReviewAll} from "./ReviewAll.tsx";
import {ScopeInsert} from "../scopeModal/ScopeInsert.tsx";

function MovieOne() {
    const {id} = useParams()
    const [state, dispath] = useReducer(Reducer, initialState)

    const navigate = useNavigate()
    // 삭제 모달
    const [showD, setShowD] = useState(false)
    const closeD = () => setShowD(false)
    const openD = () => setShowD(true)
    // 수정 모달
    const [showU, setShowU] = useState(false)
    const closeU = () => setShowU(false)
    const openU = () => setShowU(true)

    // 별점 추가 모달
    const [scope, setScope] = useState(false)
    const closeScope = () => setScope(false)
    const openScope = () => setScope(true)
    const test = {
        title: state.movieOne.title,
        director: state.movieOne.director,
        content: state.movieOne.content,
        author: state.movieOne.author
    }
    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/movie/movieOne/${id}`)
            .then((resp) => {
                const {data} = resp
                if (data.result === 'success') {
                    dispath({
                        type: 'ON_SHOWONE',
                        movieOne: data.movieDTO
                    })
                }
            })
    }, [id, showU])

    const [role, setRole] = useState('ROLE_USER')
    const [score, setScore] = useState(0)
    const [count, setCount] = useState(0)

    useEffect(() => {
        axios
            .post(`http://localhost:8080/api/scope/scopeRole`,
                {movieId: id, userRole: role})
            .then((resp) => {
                const {data} = resp
                if (data.result === 'success') {
                    setScore(data.avg)
                    setCount(data.count)
                }
            })
    }, [role, scope])
    const [imageSrc, setImageSrc] = useState('');
    useEffect(() => {
        if (state.movieOne.filePath && state.movieOne.filePath !== ''){
                axios.get(`http://localhost:8080/api/movie/upload/${state.movieOne.filePath}`, {
                    responseType: 'blob' // responseType을 'blob'으로 변경
                }).then((response) => {
                    const blob = response.data; // 응답 데이터를 그대로 사용
                    const imageUrl = URL.createObjectURL(blob); // Blob을 URL로 변환
                    setImageSrc(imageUrl); // 변환된 URL을 상태에 저장
                })
        }

    }, [state.movieOne.filePath]);
    return (
        <>
            <Button variant="dark" onClick={() => {
                navigate('/movie/movieAll/1')
            }}>목록 보기</Button>
            <Table>
                <thead/>
                <tbody>
                <tr>
                    <td>사진</td>
                    <td>{imageSrc ? <img width='300px' height='300px' src={imageSrc} alt="이미지 없음"/> :
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-image-alt" viewBox="0 0 16 16">
                            <path
                                d="M7 2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m4.225 4.053a.5.5 0 0 0-.577.093l-3.71 4.71-2.66-2.772a.5.5 0 0 0-.63.062L.002 13v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4.5z"/>
                        </svg>}</td>
                </tr>
                <tr>
                    <td>글번호</td>
                    <td>{state.movieOne.id}</td>
                </tr>
                <tr>
                    <td>영화 제목</td>
                    <td>{state.movieOne.title}</td>
                </tr>
                <tr>
                    <td>영화 감독</td>
                    <td>{state.movieOne.director}</td>
                </tr>
                <tr>
                    <td>줄거리</td>
                    <td>{state.movieOne.content}</td>
                </tr>
                <tr>
                    <td>작성일</td>
                    <td>{state.movieOne.entryDate}</td>
                </tr>
                <tr>
                    <td>수정일</td>
                    <td>{state.movieOne.modifyDate}</td>
                </tr>
                <tr>
                    <td>작성자</td>
                    <td>{state.movieOne.author}</td>
                </tr>
                <tr>
                    <td>{role} 별점</td>
                    <td>평균 {score}({count} 명)</td>
                </tr>
                <tr>
                    <td onClick={() => {
                        setRole('ROLE_USER')
                    }}>유저
                    </td>
                    <td onClick={() => {
                        setRole('ROLE_REVIEWER')
                    }}>평론가
                    </td>
                </tr>
                </tbody>
            </Table>
            <Button variant="dark" onClick={openU}>수정</Button>
            <Button variant="dark" onClick={openD}>삭제</Button>
            <Delete showD={showD} closeD={closeD} id={state.movieOne.id} author={state.movieOne.author}/>
            <Update showU={showU} closeU={closeU} id={state.movieOne.id} test={test}/>
            <hr/>
            <Button variant="dark" onClick={openScope}>별점 남기기</Button>
            <ScopeInsert show={scope} close={closeScope} movieId={state.movieOne.id}/>
            <hr/>
            <ReviewAll movieId={state.movieOne.id}/>
        </>
    )
}

export default MovieOne