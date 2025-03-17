import { useEffect, useReducer, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { initialstateS, ReducerShow } from "../../reducer/ReducerShow";
import axios from "axios";
import Swal from "sweetalert2";

export function ShowUpdate({ showU, closeU, id, refresh }) {
    const [state, dispatch] = useReducer(ReducerShow, initialstateS)
    const { type, age, movieId, showTime } = state.input
    const { origin } = state

    useEffect(() => {
        axios
            .get(`http://localhost:9000/api/movie/movieAll`)
            .then((resp) => {
                const { data } = resp

                dispatch({
                    type: 'ON_MOVIEALL',
                    movieList: data
                })
            })
    }, [])

    useEffect(() => {
        axios
            .get(`http://localhost:9000/api/show/showOne/${id}`)
            .then((resp) => {
                const { data } = resp
              
                dispatch({
                    type: 'origin',
                    origin: data    
                })
            })
    }, [id])

    const onChange = (e) => {
        const { name, value } = e.target;

        dispatch({
            type: 'ON_CHANGE',
            name,
            value
        })

    }

    const onInsert = () => {
        axios
            .post('http://localhost:9000/api/show/update',
                {
                    type: type || origin.type,
                    movieId: movieId || origin.movieId,
                    age: age || origin.age,
                    showTime: showTime || origin.showTime,
                    id: id
                }
            ).then((resp) => {
                const { data } = resp
                console.log(data)
                refresh()
                closeU()
                Swal.fire({
                    icon: 'success',
                    title: '영화 수정 되었습니다.'
                });
            })
    }

    return (
        <>
            <Modal
                show={showU}
                onHide={closeU}
            >
                <Modal.Header closeButton>
                    <Modal.Title>!!!상영 영화 수정!!!!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    영화 선택: <select name="movieId" onChange={onChange} value={movieId || origin.movieId}>
                        <option value="">==선택==</option>
                        {state.movieList.map((item, index) => (
                            <option key={index} value={item.id}>
                                {item.title}
                            </option>
                        ))}
                    </select>
                    <br />
                    상영 방식: <select name="type" onChange={onChange} value={type || origin.type}>
                        <option >==선택==</option>
                        <option value='2D'>2D</option>
                        <option value='3D'>3D</option>
                        <option value='4D'>4D</option>
                    </select>
                    <br />
                    영상물 등급: <select name="age" onChange={onChange} value={age || origin.age}>
                        <option >==선택==</option>
                        <option value='All'>전체 이용가</option>
                        <option value='12'>12세 이용가</option>
                        <option value='15'>15세 이용가</option>
                        <option value='19'>청소년 이용불가</option>
                    </select>
                    <br />
                    상영 시간: <input type="number" min='100' step='10' name="showTime" onChange={onChange} value={showTime || origin.showTime} />
              
                  
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        dispatch({
                            type: 'RESET_SHOW'
                        })
                        closeU()
                    }}>
                        취소
                    </Button>
                    <Button variant="primary" onClick={onInsert}>완료</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
