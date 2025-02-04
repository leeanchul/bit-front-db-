import {useEffect} from "react";

function Element({ele, onDelete, onToggle}) {
    // 각 컴포넌트는 우리 화면에 등장/퇴장 하는 것을
    // 마운트/ 언마운트 라고 표현한다.
    // 우리가 특정 컴포넌트가 화면에 등장할때나
    // 사라질때 특별한 작업을 해 주어야 하는 경우도 존재한다.
    // 그럴 때에는 useEffect() 라는 함수를 통해서
    // 해당 경우를 컨트롤 하게 된다.

    // useEffect(()=>{
    //     console.log('MyEffect() 등장!!')
    //     // useEffcet의 경우
    //     //     // return 부분에 해당 컴포넌트가 사라질 때 실행시킬 코드를
    //     //     // 등록하게된다.
    //     //     // return() => {} 는 우리가 cleanup() 이라고 한다.
    //     //     return ()=>{
    //     //         console.log("MyEffect() 퇴장 ㅜㅜ")
    //     }
    // },[ele])
    // deps는 해당 컴포넌트 안에서 특정 요소가 변경 되는지를 감지해서
    // 변경이 되면 effect가 시작된 걸로 인식한다.
    // 단 이떄에는 return() => {....} 이 발생되지 않는다.

    return (
        <div style={{color: ele.enable ? 'black' : 'red'}}>
            <hr/>
            <h1>
                <b onClick={() => onToggle(ele.id)}> {ele.id} 번 회원</b>
                <button onClick={() => {
                    onDelete(ele.id)
                }}>X
                </button>
            </h1>
            <h2>{ele.username}</h2>
            <h2>{ele.password}</h2>
            <h2>{ele.nickname}</h2>
            <hr/>
        </div>
    )
}

function MyArray({array, onDelete, onToggle}) {

    return (
        <>
            {array.map(e => (
                <Element ele={e} key={e.id} onDelete={onDelete} onToggle={onToggle}/>
            ))}
        </>
    )
}

export default MyArray