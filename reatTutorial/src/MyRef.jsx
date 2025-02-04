import {useRef, useState} from "react";

function MyRef(){
    let [inputs,setInputs]=useState({
        input1:'',
        input2:'',
        input3:'',
        input4:''
    })

    let [result,setResult]=useState('')

    let {input1,input2,input3,input4} =inputs

    let onChange=(e)=>{
        let {name,value}=e.target

        setInputs({
            ...inputs,
            [name]:value
        })
    }
    // useRef는 특정 DOM 객체를 선택할 때 사용된다.
    // 사용하는 방법은 JS 코드에는
    // let 이름 = useRef()라 적어주고
    // 태그에는 ref={이름} 으로 적어주면 된다.
    let form1=useRef()
    let form2=useRef()
    let form3=useRef()
    let form4=useRef()

    let validate=()=>{
        if(input1 === ''){
            setResult('1 input is empty')
            form1.current.focus()
        }else if(input2 ===''){
            setResult('2 input is empty')
            form2.current.focus()
        }else if(input3 ===''){
            setResult('3 input is empty')
            form3.current.focus()
        }else if(input4 ===''){
            setResult('4 input is empty')
            form4.current.focus()
        }else {
            setResult('no problem')
        }
    }
    return (
        <>
            <input name='input1' value={input1} onChange={onChange} ref={form1}/>
            <input name='input2' value={input2} onChange={onChange} ref={form2}/>
            <input name='input3' value={input3} onChange={onChange} ref={form3}/>
            <input name='input4' value={input4} onChange={onChange} ref={form4}/>
            <hr/>
            <button onClick={validate}>find empty</button>
            <hr/>
            <h1>{result}</h1>
        </>
    )
}

export default MyRef