import React from "react"
import {useParams} from "react-router-dom";

function Hello2(){
    let name='이안철'

    let {tempId}= useParams()
    console.log(tempId)
    return (
        <>
        
        <h2>
            {tempId} 입력하셨네요
            여기는 hello2
        </h2>
        <h3>
            {/*
            쥬속초라
            */
            }
            <h1>나는 {name} 다</h1>
        </h3>
        </>    
    )
}
export default Hello2