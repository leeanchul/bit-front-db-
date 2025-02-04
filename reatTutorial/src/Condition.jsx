
import React from "react";

function Condition({name,age,color,isEnabled}){
    console.log(age)
    console.log(color)
    console.log(isEnabled)
    return(
        <div>
            {name==='이안철'? <h1>관리자</h1>:null}
            {name} 입니다.
        </div>
    )

}
export default Condition