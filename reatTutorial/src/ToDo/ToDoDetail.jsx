import react from "react";
import BorderedBox from "../BorderedBox.jsx";


function ToDoDetail({todo,onToggle}){

    let btnStyle={
        marginLeft:'50px'
    }

    let strikeOutStyle={
        textDecoration:'line-through'
    }

    return(
        <BorderedBox >
            <b style={todo.isCompleted ? strikeOutStyle : null}>{todo.date} 의 할일 : {todo.task}</b>
            <button style={btnStyle} onClick={()=>onToggle(todo.id)}>
                {todo.isCompleted ? '🚬':'🚭' }
            </button>
        </BorderedBox>
    )
}

export default ToDoDetail