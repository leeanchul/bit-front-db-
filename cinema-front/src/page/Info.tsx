import axios from "axios"
import { useEffect, useReducer, useState } from "react"
import { Button } from "react-bootstrap"
import { initialstate, Reducer } from "../reducer/Reduecr"
import Swal from "sweetalert2"
import { InfoModal } from "../modal/InfoModal"
import { ScopeUpdate } from "../modal/scope/ScopeUpdate"

export function Info(){

    const [state, dispatch] = useReducer(Reducer,initialstate)
    const [info,setInfo]=useState({
        id:0,
        nickname:'',
        role:'',
        username:''
    })

    const [showU,setShowU]=useState(false)
    const closeU=()=>setShowU(false)
    const openU=()=>setShowU(true)

    const [showI,setShowI]=useState(false)
    const closeI=()=>setShowI(false)
    const openI=()=>setShowI(true)
    useEffect(()=>{
        refresh()
        axios
            .get(`http://localhost:9000/api/user/info`)
            .then((resp) => {
                const {data} = resp
                setInfo(data)
            })
    },[info.id])

    const refresh=()=>{
        axios
        .get(`http://localhost:9000/api/scope/scopeInfo/${info.id}`)
        .then((resp) => {
            const {data} = resp
            dispatch({
                type:'ON_INFO',
                infoList:data
            })
        })
    }

    const onDelete = (id) => {
        axios
        .get(`http://localhost:9000/api/scope/delete/${id}`)
        .then((resp) => {
            const {data} = resp
            refresh()
            Swal.fire({
                icon: 'success',
                title: data
            })
        })
    }
    return(
        <>
            <h1>내 정보</h1>
            <h3>회원 번호: {info.id}</h3>
            <h3>닉네임: {info.nickname}  <Button variant="dark" onClick={openI}>정보 수정</Button></h3>
            <h3>아이디: {info.username}</h3>
           
            <InfoModal show={showI} close={closeI} info={info} refresh={refresh}/>
            <h3>등급: {info.role}</h3>
            <Button >등업 신청</Button>
            <hr />
            {state.infoList.map((item)=>
            <div key={item.id}>
                <hr />
                <h1>{item.id}</h1>
                <p>영화: {item.title}  ,별점: {item.score} 날짜: {item.entryDate}</p>
                <Button variant="dark" onClick={openU}>수정</Button>
                <ScopeUpdate show={showU} close={closeU} id={item.id} refresh={refresh}/>
                <Button variant="dark" onClick={()=>onDelete(item.id)}>삭제</Button>
            </div>
                
            )}
        </>
    )
}