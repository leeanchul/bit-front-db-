
function Element({ele,onDelete}){
    return(
        <div style={{color:'red'}}>
            <hr/>
            <h1>{ele.id}<button onClick={()=>{
                onDelete(ele.id)
            }}>x</button></h1>
            <h1>날짜: {ele.entryDate}</h1>
            <h1>할일: {ele.todo}</h1>
            <hr/>
        </div>
    )
}

function TestList({todoArr,onDelete}){
    return(
        <>
            {todoArr.map(e=>(
                <Element ele={e} key={e.id} onDelete={onDelete}/>
            ))}
        </>
    )

}
export default TestList