import {useEffect, useReducer, useState} from "react";
import {reducer} from "../reducers/BoardReducer.tsx";
import axios from "axios";
import {ReplyWrite} from "./ReplyWrite.tsx";
import {ReplyDelte} from "./ReplyDelte.tsx";
import {ReplyUpdate} from "./ReplyUpdate.tsx";

let initalState = {
    list: []
}

function Reply({reply}) {

    // 댓글 삭제 모달
    const [showD, setShowD] = useState(false);
    const CloseD = () => setShowD(false);
    const ShowD = () => setShowD(true);

    // 댓글 수정 모달
    const [showU, setShowU] = useState(false);
    const CloseU = () => setShowU(false);
    const ShowU = () => setShowU(true);

    return (
        <>
            <hr/>
            <p>{reply.writerNickname}님 댓글 내용: {reply.content}</p>
            <button onClick={ShowU}>수정</button>
            <button onClick={ShowD}>삭제</button>
            <ReplyUpdate showU={showU} CloseU={CloseU} id={reply.id} boardId={reply.boardId} nickname={reply.nickname}/>
            <ReplyDelte showD={showD} CloseD={CloseD} id={reply.id} nickname={reply.writerNickname} boardId={reply.boardId}/>
            <hr/>


        </>
    )
}

function ReplyAll({boardId}) {
    let [state, dispatch] = useReducer(reducer, initalState)

    // 댓글 모달
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let token = sessionStorage.getItem("token")
    useEffect(() => {
        if (boardId > 0) {
            axios
                .get(`http://localhost:8080/api/reply/showAll/${boardId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                .then((resp) => {
                    let {data} = resp
                    let list=data
                    dispatch({
                                type: 'ON_REPLY_LOAD', list
                    })
                    //if (data.result === 'success') {
                    //     let list = data.list
                    //     dispatch({
                    //         type: 'ON_REPLY_LOAD', list
                    //     })
                    //}
                }).catch((e) => console.log(e))
       }
    }, [show, boardId])

    return (
        <>
            <button onClick={handleShow}>댓글달기</button>
            {state.list.map(reply => (
                <Reply reply={reply} key={reply.id}/>
            ))}
            <ReplyWrite show={show} handleClose={handleClose} boardId={boardId}/>
        </>
    )

}

export default ReplyAll