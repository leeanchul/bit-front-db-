import React from "react"

function Hello3(){
    // JSX 에서 스타일을 지정할 때에는 객체를 만들어서 사용한다.
    let style={
        color:'blue',
        fontSzie:'30px',
        backgroundColor:'red'
    }
    return (
        <>
        <h1 style={style} className='card'>hello3</h1>
        </>
    )
}
export default Hello3