import {useEffect, useReducer, useState} from "react";
import {Button} from "react-bootstrap";
import {initialstate, Reducer} from "../../reducer/Reduecr.tsx";
import axios from "axios";
import {ReviewDelete} from "../../modal/review/ReviewDelete.tsx";
import {ReviewInsert} from "../../modal/review/ReviewInsert.tsx";
import {ReviewUpdate} from "../../modal/review/ReviewUpdate.tsx";

function Print({review, refresh}) {

    // 댓글 수정 모달
    const [show, setShow] = useState(false)
    const close = () => setShow(false)
    const open = () => setShow(true)

    // 댓글 삭제 모달
    const [showD, setShowD] = useState(false)
    const closeD = () => setShowD(false)
    const openD = () => setShowD(true)

    return (
        <ul>
            <li>
                <p>작성자:{review.nickname}</p>
                <p>리뷰: {review.review}</p>
                {review.entryDate}
                <br/>
                <Button variant="dark" onClick={open}>수정</Button>
                <Button variant="dark" onClick={openD}>삭제</Button>
                <ReviewUpdate show={show} close={close} id={review.id} refresh={refresh}/>
                <ReviewDelete showD={showD} closeD={closeD} id={review.id} movieId={review.movieId} refresh={refresh}/>
                <hr/>
            </li>
        </ul>
    )
}

export function ReviewAll({movieId}) {
    const [state, dispatch] = useReducer(Reducer, initialstate)
    const [show, setShow] = useState(false)
    const close = () =>  setShow(false)
    const open = () => setShow(true)
    useEffect(() => {
        dispatch({
            type:'RESET'
        })
    },[movieId]);
    const refresh = () => {
        if (movieId > 0) {
            axios
                .get(`http://localhost:9000/api/review/reviewAll/${movieId}`)
                .then((resp) => {
                    const {data} = resp
                    dispatch({
                        type: 'ON_REVIEW',
                        reviewList: data
                    })
                })
        }
    }

    useEffect(() => {
        refresh()
    }, [movieId]);


    return (
        <>
            <Button variant="dark" onClick={open}>댓글 달기</Button>
            <hr/>
            <ReviewInsert show={show} close={close} movieId={movieId} refresh={refresh}/>
            {state.reviewList.map(review => (
                <Print review={review} key={review.id} refresh={refresh}/>
            ))}
        </>
    )
}