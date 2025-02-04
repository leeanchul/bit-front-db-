import React from "react";


function TestAdd({entryDate,todo,onChange,onInsert}){

    return(
        <>
            <h1>날짜 <input name='entryDate' onChange={onChange} value={entryDate}/></h1>
            <h1>할일 <input name='todo' onChange={onChange} value={todo}/></h1>
            <button onClick={onInsert}>입력</button>
            <hr/>
        </>
    )
}

export default TestAdd