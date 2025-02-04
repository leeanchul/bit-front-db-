// React 컴포넌트는 반드시 react 를 import 해야 한다.
import "react";

// 이 컴포넌트가 로딩 될때 어떠한 작업을 할지를 만들어준다.
function Hello(props){
    console.log(props.name)
    // JSX 에서는 반드시
    // 한 쌍으로 묶인 태그가 리턴이 되어야 한다.
    let style={
        color:props.color
    }
    return (
        <h1 style={style}>안녕하세요!</h1>

    )
}
Hello.defaultProps={
    name:'이안철',
    color:'red'
}

// 외부에서 해당 컴포넌트를 불러올때 사용할 이름
export default Hello