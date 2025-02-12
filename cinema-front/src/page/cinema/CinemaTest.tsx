import {useEffect, useReducer, useState} from "react";
import {Button, Pagination, Table} from "react-bootstrap";
import {CinemaInsert} from "../../modal/cinema/CinemaInsert.tsx";
import {initialstateC, ReducerCinema} from "../../reducer/ReducerCinema.tsx";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import { CinemaDelete } from "../../modal/cinema/CinemaDelete.tsx";
import { CinemaUpdate } from "../../modal/cinema/CinemaUpdate.tsx";
import { CinemaOne } from "./CinemaOne.tsx";

export function CinemaTest() {
    const [state, dispatch] = useReducer(ReducerCinema, initialstateC)
    const {pageNo} = useParams()

    // 지역
    const [area,setArea]=useState('서울')

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
            .get(`http://localhost:9000/api/cinema/cinema/${area}`)
            .then((resp) => {
                const {data} = resp
                dispatch({
                    type: 'CINEMAALL',
                    list: data
                })
            })
    }

    useEffect(() => {
        refresh()
    }, [area])

    return (
        <>
            <Button variant='dark' onClick={openI} >극장 추가</Button>
            <CinemaInsert showI={showI} closeI={closeI} refresh={refresh} state={state} dispatch={dispatch}/>
            <Table>
                <thead>
                <tr>
    <td 
        onClick={() => setArea('서울')} 
        style={{ color: area === '서울' ? 'red' : 'black' }}
    >
        서울
    </td>
    <td 
        onClick={() => setArea('경기')} 
        style={{ color: area === '경기' ? 'red' : 'black' }}
    >
        경기
    </td>
    <td 
        onClick={() => setArea('인천')} 
        style={{ color: area === '인천' ? 'red' : 'black' }}
    >
        인천
    </td>
    <td 
        onClick={() => setArea('강원')} 
        style={{ color: area === '강원' ? 'red' : 'black' }}
    >
        강원
    </td>
    <td 
        onClick={() => setArea('대전충청')} 
        style={{ color: area === '대전충청' ? 'red' : 'black' }}
    >
        대전/충청
    </td>
    <td 
        onClick={() => setArea('대구')} 
        style={{ color: area === '대구' ? 'red' : 'black' }}
    >
        대구
    </td>
    <td 
        onClick={() => setArea('부산울산')} 
        style={{ color: area === '부산울산' ? 'red' : 'black' }}
    >
        부산/울산
    </td>
    <td 
        onClick={() => setArea('경상')} 
        style={{ color: area === '경상' ? 'red' : 'black' }}
    >
        경상
    </td>
    <td 
        onClick={() => setArea('광주전라제주')} 
        style={{ color: area === '광주전라제주' ? 'red' : 'black' }}
    >
        광주/전라/제주
    </td>
</tr>

                </thead>
            </Table>
            <p>{area}</p>
            {state.list.map((item) =><div key={item.id}>
                <hr />
                <h3 onClick={()=>{navigate(`/cinema/cinemaOne/${item.spotName}/${item.id}`)}}>{item.spotName}</h3>
                <Button variant="dark" onClick={openU}>수정</Button>
                    <CinemaUpdate  showU={showU} closeU={closeU} id={item.id} refresh={refresh}/>
                    <Button variant="dark" onClick={openD}>삭제</Button>
                    <CinemaDelete showD={showD} closeD={closeD} id={item.id} refresh={refresh}/>
            </div>)}
        </>
    )
}