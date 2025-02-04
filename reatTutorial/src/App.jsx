import './App.css'
import Hello from "./Hello.jsx";
import Hello2 from "./Hello2.jsx";
import Hello3 from "./Hello3.jsx";
import BorderedBox from "./BorderedBox.jsx";
import Condition from "./Condition.jsx";
import StateTuto from "./MyReducer.jsx";
import MyInput from "./MyInput.jsx";
import MyRef from "./MyRef.jsx";
import MyArray from "./MyArray.jsx";
import {useMemo, useReducer, useRef, useState} from "react";
import Insert from "./Insert.jsx";
import ToDo from "./ToDo/ToDo.jsx";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import RouterTest from "./RouterTest.jsx";
import Home from "./Home.jsx";

function countEnabled(array){
    console.log('conunt() call')
    return array.filter(e=>e.enable).length
}

function reducer(state,action){
    switch(action.type){
        case 'ON_CHANGE':
            return {
                ...state,
                inputs:{
                    ...state.inputs,
                    [action.name]:action.value
                }
            }
        case 'ON_INSERT':
            return {
                inputs:initialState.inputs,
                array:[...state.array,action.user]
            }
        case 'ON_DELETE':
            return {
                ...state,
                array:state.array.filter(e => e.id !== action.id)
            }
        case 'ON_TOGGLE':
            return {
                ...state,
                array:state.array.map(e=>e.id===action.id? {...e,enable:!e.enable}: e )
            }
    }
}

let initialState= {
    inputs:{
        username: '',
        password: '',
        nickname: ''
    },
    array:[
        {id: 1, username: 'a', password: 'a', nickname: '사용자 A', enable: true},
        {id: 2, username: 'b', password: 'b', nickname: '사용자 B', enable: true},
        {id: 3, username: 'c', password: 'c', nickname: '사용자 C', enable: true},
        {id: 4, username: 'd', password: 'd', nickname: '사용자 D', enable: true},
        {id: 5, username: 'e', password: 'e', nickname: '사용자 E', enable: true}
    ]

}

function App() {

    let [state,dispatch] =useReducer(reducer,initialState)

    let {array} = state

    let {username,password,nickname}=state.inputs


    let onChange = (e) => {
        let {name, value} = e.target
        dispatch({
            type:'ON_CHANGE',
            name,
            value
        })
    }

    let nextId = useRef(6)

    // Array 컴포넌트에 전달할 props의 내용들

    let onInsert = () => {
        let user = {
            id: nextId.current,
            username: username,
            password: password,
            nickname: nickname
        }

       dispatch({
           type:'ON_INSERT',
           user:user
       })
        nextId.current += 1;

    }
    let onDelete = (id) => {
       dispatch({
           type:'ON_DELETE',
           id
       })
    }

    let onToggle = (id) => {
        dispatch({
            type:'ON_TOGGLE',
            id
        })
    }

    // userMemo() 는 기존에 연산한 것을 재사용하되,
    // 우리가 특정 요소가 변경될 때에만
    // 해당 연산을 재실행 시킬 수 있다
    let enabled = useMemo(()=>countEnabled(array),[array])

        // return 할 때에는 절대로 여러개를 리턴할 수 없다.
        // 여러개의 return 을 할때는 반드시
        // 태그로 하나로 묶어서 내보내야한다.
        //  <BorderedBox>
        //     <h1>현재 활성화 된 유저 수:{enabled}</h1>
        //     <Insert
        //         username={username}
        //         password={password}
        //         nickname={nickname}
        //         onChange={onChange}
        //         onInsert={onInsert}/>
        //     <hr/>
        //     <MyArray array={array} onDelete={onDelete} onToggle={onToggle}/>
        //     {/*<ToDo/>*/}
        //  </BorderedBox>
    return (
            <BrowserRouter>
                <Routes>
                    // 인덱스 화면 접속시 보여줄 컴포넌트
                    <Route path='/' element={<Hello/>} />
                    <Route path='/todo' element={<ToDo/>} />
                    <Route path='/todo/:tempId' element={<Hello2/>} />
                </Routes>
            </BrowserRouter>
    )


}

export default App
