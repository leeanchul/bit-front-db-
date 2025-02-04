import {useReducer} from "react";
import {reducer} from "../reducers/BoardReducer.tsx";
import axios from "axios";
import Swal from "sweetalert2";

let initialState = {
    inputs: {
        title: '',
        content: ''
    }
}

function Insert() {
    let [state, dispatch] = useReducer(reducer, initialState)

    let {title, content} = state.inputs

    let onChange = (e) => {
        let {name, value} = e.target

        dispatch({
            type: 'ON_CHANGE',
            name,
            value
        })
    }
    let onInsert = () => {
        let login = JSON.parse(sessionStorage.getItem('login'))
        if (title === '' || content === ''){
            Swal.fire({
                icon: 'error',
                title: '제목과 내용을 입력해주세요'
            })
            return
        }

        //if (login !== null) {
            let token=sessionStorage.getItem('token')
            axios
                .post('http://localhost:8080/api/board/write',
                    {title: title, content: content},
                    //, writerId: login.id
                    {
                        headers: {Authorization: `Bearer ${token}`}
                    }
                ).then((resp) => {
                    location.href='/board/showAll/1'
                })
       //  //}else{
       //      Swal.fire({
       //          icon: 'error',
       //          title: '로그인 후 이용해주세요'
       //      }).then(()=>{
       //          location.href='/'
       //      })
       // // }

    }

    return (
        <>
            <input placeholder='제목' name='title' value={title} onChange={onChange}/>
            <br/>
            <input placeholder='내용' name='content' value={content} onChange={onChange}/>
            <br/>
            <button onClick={onInsert}>작성</button>
            <button onClick={()=>{
                location.href='/board/showAll/1'
            }}>취소</button>
        </>
    )
}

export default Insert