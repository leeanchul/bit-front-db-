import React, {useReducer, useState} from "react";
import {reducer} from './MyReducerLib'

function MyReducer() {

    let [value, dispatch] = useReducer(reducer, 0)

    let style = {
        marginTop: '10px'
    }
    let onPlus = () => {
        dispatch({type: 'PLUS'})
    }
    let onMinus = () => {
        if (value > 0) {
            dispatch({type: 'MINUS'})
        }
    }
    return (
        <>
            <h1>{value}</h1>
            <button style={style} onClick={onPlus}>+</button>
            <button style={style} onClick={onMinus}>-</button>
        </>
    )
}

export default MyReducer