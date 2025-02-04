import React from "react";

function InsertToDo({date, task, onChange, onInsert}) {

    return (
        <>
            <input name='date' type='date' onChange={onChange} value={date}/>
            <input name='task' placeholder='할일' onChange={onChange} value={task}/>
            <button onClick={onInsert}>입력</button>
        </>
    )
}

export default InsertToDo