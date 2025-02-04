import React from "react";
import ToDoDetail from "./ToDoDetail.jsx";

function ToDoList({todos,onToggle}) {
    return (
        <>
            {todos.map(todo => (
                <ToDoDetail todo={todo} onToggle={onToggle}/>

            ))}
        </>
    )
}

export default ToDoList