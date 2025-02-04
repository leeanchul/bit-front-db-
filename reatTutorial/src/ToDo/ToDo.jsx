import React, {useReducer, useRef} from "react";
import {reducer} from "./ToDoReducer.jsx";
import InsertToDo from "./InsertToDo.jsx";
import ToDoList from "./ToDoList.jsx";


// 처음 리액트가 시잘될 때 등록할
// 초기 state 값


let initialState = {
    inputs: {
        date: new Date('YYYY-MM-DD'),
        task: ''
    },
    todos: []
}


function ToDo() {

    let [state, dispatch] = useReducer(reducer, initialState)

    let {todos} = state
    let {date, task} = state.inputs

    let nextId = useRef(1)

    let onChange = (e) => {
        // 이 이벤트가 발생한 대상의 저장된 namer과 value attribute 를 비구조적 할당으로 불러온다.
        let {name, value} = e.target

        // dispatch 를 통하여 reducer 에 등록된 ON_CHANGE 를 실행
        dispatch({
            type: 'ON_CHANGE',
            name,
            value
        })
    }

    let onInsert = () => {
        console.log(nextId.current)
        dispatch({
            type: 'ON_INSERT',
            todo: {
                id: nextId.current,
                date: date,
                task: task,
                isCompleted:false
            }

        })
        nextId.current += 1

    }

    let onToggle=(id)=>{
        console.log('toglle')
        dispatch({
            type:'ON_TOGGLE',id
        })
    }



    return (
        <>
            <InsertToDo date={date} task={task} onChange={onChange} onInsert={onInsert}/>
            <ToDoList todos={todos} onToggle={onToggle}/>
        </>
    )
}

export default ToDo