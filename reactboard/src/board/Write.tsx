import {useReducer} from "react";
import {reducer} from "../reducers/BoardReducer.tsx";
import axios from "axios";

let initialstate={
    inputs:{
        title:'',
        content:''
    }
}

function Write(){

    let [state,dispatch] =useReducer(reducer,initialstate)

    let {title,content}=state.inputs

    let token=sessionStorage.getItem('token')

    let onChange=(e)=>{
        let {name,value}=e.target

        dispatch({
            type:'ON_CHANGE',
            name,
            value
        })
    }

    let onWrite=()=>{
        axios
            .post(`http://localhost:8080/api/board/write`,{title: title,
                content: content} ,
                {
                headers: {Authorization: `Bearer ${token}`}
                }
            ).then ((resp)=>{
                let {data}=resp
                    console.log(data)
            if(data.result==='success'){
                location.href=`/board/showOne/${data.boardDTO.id}`
            }
        })

    }
    return(
        <>
            제목: <input type="text" name='title' onChange={onChange} value={title}/>
            내용: <input type="text" name='content' onChange={onChange} value={content}/>
            <button onClick={onWrite}>입력력</button>
        </>
    )
}
export default Write