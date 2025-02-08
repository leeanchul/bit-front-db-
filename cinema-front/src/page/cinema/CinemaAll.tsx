import {useEffect, useReducer, useState} from "react";
import {Button, Pagination, Table} from "react-bootstrap";
import {CinemaInsert} from "../../modal/cinema/CinemaInsert.tsx";
import {initialstateC, ReducerCinema} from "../../reducer/ReducerCinema.tsx";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

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

    const navigate=useNavigate();

    const refresh=()=>{
        axios
            .get(`http://localhost:9000/api/cinema/cinemaAll/${pageNo}`)
            .then((resp) => {
                const {data} = resp
                console.log(data.content)
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

    console.log(pageNo)

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
                    <td  onClick={()=>{navigate('/cinema/cinemaOne/1')}}>{item.spotName}</td>
                    <td><Button>수정</Button></td>
                    <td><Button>삭제</Button></td>
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