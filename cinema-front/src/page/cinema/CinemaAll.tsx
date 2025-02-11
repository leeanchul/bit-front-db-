import {useEffect, useReducer, useState} from "react";
import {Button, Pagination, Table} from "react-bootstrap";
import {CinemaInsert} from "../../modal/cinema/CinemaInsert.tsx";
import {initialstateC, ReducerCinema} from "../../reducer/ReducerCinema.tsx";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import { CinemaDelete } from "../../modal/cinema/CinemaDelete.tsx";
import { CinemaUpdate } from "../../modal/cinema/CinemaUpdate.tsx";

export function CinemaAll() {
    const [state, dispatch] = useReducer(ReducerCinema, initialstateC)
    const {pageNo} = useParams()
    // 입력 모달
    const [showI, setShowI] = useState(false)
    const closeI = () => {
        dispatch({
            type:"ON_RESET"
        })
        setShowI(false)
    }
    const openI = () => setShowI(true)
    
    // 수정 모달
    const [showU,setShowU]=useState(false)
    const closeU=()=>{
        dispatch({
            type:"ON_RESET"
        })
        setShowU(false)
    }
    const openU=()=>setShowU(true)

    // 삭제 모달
    const [showD,setShowD] = useState(false)
    const closeD=()=>setShowD(false)
    const openD=()=>setShowD(true)

    const navigate=useNavigate();

    const refresh=()=>{
        axios
            .get(`http://localhost:9000/api/cinema/cinemaAll/${pageNo}`)
            .then((resp) => {
                const {data} = resp
                dispatch({
                    type: 'ON_CINEMAALL',
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
    }, [pageNo])


    // page
    let pageItems = []

    pageItems.push(
        <Pagination.Item key='first' onClick={()=>navigate('/cinema/cinemaAll/1')}>
            {'<<'}
        </Pagination.Item>
    )

    for (let i = state.cinemaAll.startPage; i <= state.cinemaAll.endPage; i++) {
        pageItems.push(
            <Pagination.Item key={i} active={i === state.cinemaAll.curerentPage} onClick={()=>navigate(`/cinema/cinemaAll/${i}`)} >
                {i}
            </Pagination.Item>
        )
    }
    pageItems.push(
        <Pagination.Item key='last'  onClick={()=>navigate(`/cinema/cinemaAll/${state.cinemaAll.maxPage}`)}>
            {'>>'}
        </Pagination.Item>
    )

    return (
        <>
            <Button variant='dark' onClick={openI} >극장 추가</Button>
            <CinemaInsert showI={showI} closeI={closeI} refresh={refresh} state={state} dispatch={dispatch}/>
            <h1>test</h1>
            <Table>
                <thead>
                <tr>
                    <td>아이디</td>
                    <td>지역</td>
                    <td>지점명</td>
                    <td>수정</td>
                    <td>삭제</td>
                </tr>
                </thead>
                <tbody>
                {state.cinemaAll.list.map((item) => <tr key={item.id}>
                    <td>{item.id}</td>
                    <td >{item.area}</td>
                    <td  onClick={()=>{navigate(`/cinema/cinemaOne/${item.spotName}/${item.id}`)}}>{item.spotName}</td>
                    <td><Button variant="dark" onClick={openU}>수정</Button></td>
                    <CinemaUpdate  showU={showU} closeU={closeU} id={item.id} refresh={refresh}/>
                    <td><Button variant="dark" onClick={openD}>삭제</Button></td>
                    <CinemaDelete showD={showD} closeD={closeD} id={item.id} refresh={refresh}/>
                </tr>)}

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