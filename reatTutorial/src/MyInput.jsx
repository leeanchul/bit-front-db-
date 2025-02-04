import {useState} from "react";

function MyInput(){

    let [inputs,setInputs]=useState({
        username:'',
        password:''
    })

    let change=(e)=>{
        let {name,value}=e.target


        // spread 문법
        // 배열, 객체의 원래의 ㄱ밧을 그대로 복사할 때에는
        // spread 문법을 사용한다.
        // 객체1={값1:값,값2:값....값100:값100
        setInputs({
            ...inputs,
            [name]:value
        })
    }

    let reset=()=>{
        setInputs({
            username:'',
            password:''
        })
    }

    return(
        <>
            <input name='username' placeholder='아이디' onChange={change} value={inputs.usrname}/>
            <input name='password' placeholder='비밀번호' onChange={change} value={inputs.password}/>
            <button onClick={reset}>reset</button>
            <hr/>
            <h1>username: {inputs.username}</h1>
            <h1>password: {inputs.password} </h1>
        </>
    )
}
export default MyInput