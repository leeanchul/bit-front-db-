import React, {useReducer, useRef} from "react";
import TestList from "./TestList.jsx";
import TestAdd from "./TestAdd.jsx";

function ToDoReducer(state,action){
    switch(action.type){
        case 'ON_C':
            return {
                ...state,
                inputs:{
                    ...state.inputs,
                    [action.name]:action.value
                }
            }
        case 'ON_I':
            return {
                inputs:initState.inputs,
                todoArr:[...state.todoArr,action.data]
            }
        case 'ON_D':
            return {
                ...state,
                todoArr:state. todoArr.filter(e => e.id !== action.id)

            }
    }
}

let initState={
    inputs:{
        entryDate:'',
        todo:'',
    },
    todoArr:[
        {id:1,entryDate:'2025-01-24',todo:'todolist 만들기'},
        {id:2,entryDate:'2025-01-25',todo:'으악!!'}
    ]
}


function TestTodo(){

    let [state,dispatch] =useReducer(ToDoReducer,initState)

    let {todoArr}=state

    let {entryDate,todo}=state.inputs

    let onChange=(e)=>{
        let {name,value}=e.target
        dispatch({
            type:'ON_C',
            name,value
        })
    }

    let nextId = useRef(3)

    let onInsert=()=>{
        let data={
            id:nextId.current,
            entryDate:entryDate,
            todo:todo
        }
        dispatch({
            type:'ON_I',
            data:data
        })
        nextId.current += 1;
    }

    let onDelete=(id)=>{
        dispatch({
            type:'ON_D',
            id
        })
    }
    return(
        <>
            <h1>test</h1>
            <TestAdd entryDate={entryDate} todo={todo} onChange={onChange} onInsert={onInsert}/>
            <TestList todoArr={todoArr} onDelete={onDelete}/>
        </>
    )
}
export default TestTodo