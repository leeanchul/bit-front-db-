import { useEffect, useReducer, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { initialstateS, ReducerShow } from "../../reducer/ReducerShow";
import axios from "axios";
import Swal from "sweetalert2";

export function ShowUpdate({showU,closeU,id,refresh}){
    const [state,dispatch]=useReducer(ReducerShow,initialstateS)
    const {type,roomNum,age,movieId,showTime}=state.input

    useEffect(()=>{
        axios
        .get(`http://localhost:9000/api/movie/movieAll`)
        .then((resp) => {
            const {data} = resp

            dispatch({
                type:'ON_MOVIEALL',
                movieList:data
            })
        })
    },[])
    const onChange=(e)=>{
        const {name,value}=e.target;

        dispatch({
            type:'ON_CHANGE',
            name,
            value
        })
 
    }
    const onInsert=()=>{
        if(true){

        }


        axios
        .post('http://localhost:9000/api/show/insert',
            {
                type:type,movieId:movieId,age:age,showTime:showTime,roomNum:roomNum,cinemaId:cinemaId
            }
        ).then((resp)=>{
            const {data}=resp
            refresh()
            closeI()
                Swal.fire({
                           icon: 'success',
                           title: '영화 추가 되었습니다.'
                       });
        })
        
    }

    
    return(
        <>
            <Modal
                show={showU}
                onHide={closeU}
            >
                <Modal.Header closeButton>
                    <Modal.Title>!!!상영 영화 수정!!!!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                영화 선택: <select name="movieId" onChange={onChange}>
                        <option value="">==선택==</option>
                        {state.movieList.map((item, index) => (
                            <option key={index} value={item.id}>
                                {item.title}
                            </option>
                        ))}
                    </select>
                    <br />
                상영 방식: <select name="type" onChange={onChange}>
                        <option >==선택==</option>
                        <option value='2D'>2D</option>
                        <option value='3D'>3D</option>
                        <option value='4D'>4D</option>
                </select>
                <br />
                영상물 등급: <select name="age" onChange={onChange}>
                        <option >==선택==</option>
                        <option value='All'>전체 이용가</option>
                        <option value='12'>12세 이용가</option>
                        <option value='15'>15세 이용가</option>
                        <option value='19'>청소년 이용불가</option>
                </select>
                <br/> 
                상영 시간: <input type="number" min='100' step='10' name="showTime" onChange={onChange}/>
                 
                <br />
                상영관 : <input name="roomNum" onChange={onChange} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>{
                              dispatch({
                                type:'RESET_SHOW'
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