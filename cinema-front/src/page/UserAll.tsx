import { useEffect, useReducer } from "react"
import { initialstate, Reducer } from "../reducer/Reduecr"
import axios from "axios"
import { Table } from "react-bootstrap"


export function UserAll(){
    const [state,dispatch]=useReducer(Reducer,initialstate)
    
    useEffect(()=>{
        axios.get("http://localhost:9000/api/user/userAll")
        .then((resp)=>{
            const {data}=resp
            
            dispatch({
                type:'ON_USER',
                userList:data
            })
        })
    },[])
    return(
        <>
          <h1>사용자 정보</h1>
            <Table>
                <thead>
                    <tr>
                        <td>회원 번호 </td>
                        <td>아이디</td>
                        <td>닉네임</td>
                        <td>등급</td>
                        <td>etc</td>
                    </tr>
                </thead>
                <tbody>
                {state.userList.map((item)=><tr key={item.id}>

                    <td>{item.id}</td>
                    <td>{item.username}</td>
                    <td>{item.nickname}</td>
                    <td>{item.role}</td>
                    <td>etc</td>
                </tr>)}
                </tbody>
            </Table>
        </>
    )
}