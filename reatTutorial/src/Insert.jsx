
function Insert({username,password,nickname,onChange,onInsert}){

    return (
        <>
            <input placeholder='아이디' name='username' onChange={onChange} value={username}/>
            <input placeholder='비밀번호' name='password' onChange={onChange} value={password}/>
            <input placeholder='닉네임' name='nickname' onChange={onChange} value={nickname}/>
            <button onClick={onInsert}>등록하기</button>
        </>
    )
}

export default Insert