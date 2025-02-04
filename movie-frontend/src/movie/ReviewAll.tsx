import {useNavigate} from "react-router-dom";
import {useEffect, useReducer, useState} from "react";
import {initialState, Reducer} from "../reducer/Reducer.tsx";
import axios from "axios";
import {Button} from "react-bootstrap";
import {ReviewInsert} from "../ReviewModal/ReviewInsert.tsx";
import {ReviewUpdate} from "../ReviewModal/ReviewUpdate.tsx";
import {ReviewDelete} from "../ReviewModal/ReviewDelete.tsx";

function Print({review}){
    const [show,setShow]=useState(false)
    const close=()=>setShow(false)
    const open=()=>setShow(true)

    const [showD,setShowD]=useState(false)
    const closeD=()=>setShowD(false)
    const openD=()=>setShowD(true)
    return (
        <ul>
            <li>
                <p>작성자:{review.nickname}
                    리뷰: {review.content}</p>
                    {review.entryDate}
                <br/>
                <Button variant="dark" onClick={open}>수정</Button>
                <Button variant="dark" onClick={openD}>삭제</Button>
                <ReviewUpdate show={show} close={close} id={review.id}/>
                <ReviewDelete showD={showD} closeD={closeD} id={review.id} nickname={review.nickname} movieId={review.movieId}/>
                <hr/>
            </li>
        </ul>
    )
}

export function ReviewAll({movieId}) {
    const [state, dispatch] = useReducer(Reducer, initialState)

    const [show, setShow] = useState(false)
    const close = () => setShow(false)
    const open = () => setShow(true)

    useEffect(() => {
        // movieId가 없는데 render 하는 경우가 있어서 추가
        if(movieId>0) {
            axios
                .get(`http://localhost:8080/api/review/reviewAll/${movieId}`)
                .then((resp) => {
                    const {data} = resp
                    if (data.result === 'success') {
                        dispatch({
                            type: 'ON_REVIEW',
                            reviewList: data.list
                        })
                    }
                })
        }
    },[movieId,show]);


    return (
        <>
            <Button variant="dark" onClick={open}>댓글 달기</Button>
            <hr/>
            <ReviewInsert show={show} close={close} movieId={movieId}/>
            {state.reviewList.map(review=>(
                <Print review={review} key={review.id}/>
            ))}
        </>
    )
}