import React, {useState} from "react";


// 리액트는 우리가 별도의 명령을 하지 않으면
// 값을 따로 자기네들이 관리하지 않는다.

function StateTuto(){
    // useState를 사용할때는
    // value,setValue()로 지정

    let [value,setValue]=useState(0)


    let style={
        marginTop:'10px'
    }
    let onPlus=()=>{
        setValue(prevValue=>prevValue+1)
    }
    let onMinus=()=>{
        if(value!==0){
            setValue(prevValue=>prevValue-1)
        }

    }
    return(
        <>
            <h1>{value}</h1>
            <button style={style} onClick={onPlus}>+</button>
            <br/>
            <button style={style} onClick={onMinus}>-</button>
            <br/>
        </>
    )
}
export default StateTuto