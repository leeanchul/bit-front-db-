import React from 'react';

// 만약 어떠한 컴포넌트 안에 다른 컴포넌트가 출력이 되어야 하는 겨우
// 바깥쪽 컴포넌트의 내용을 비어놓으면, 아무것도 출력이 되지 않는다.
// 이러한 경우, 바깥쪽 컴포넌트에 파라미터와 return 의 내용으로 {children} 을 보내어
// 이 컴포넌트가 다른 것을 포함할 수 있다는 것을 적어주게 된다.
function BorderedBox({children}){
    let style={
        padding:'20px'
        ,border:'2px solid red'
    }
    return(
        <div style={style}>
            {children}
        </div>
    )
}
export default BorderedBox