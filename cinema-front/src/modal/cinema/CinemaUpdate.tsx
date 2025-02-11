import { useReducer } from "react";
import { Button, Modal } from "react-bootstrap";
import { initialstateC, ReducerCinema } from "../../reducer/ReducerCinema";
import axios from "axios";
import Swal from "sweetalert2";

export function CinemaUpdate({showU,closeU,id,refresh}){

    const [state,dispatch]=useReducer(ReducerCinema,initialstateC)
    const {area, spotName} = state.cinema

    const onChange = (e) => {
        const {name, value} = e.target
        dispatch({
            type: 'ON_CHANGE',
            name,
            value
        })
    }
 const onUpdate = () => {
        if (area === '' || spotName === '') {
            Swal.fire({
                icon: 'error',
                title: '모두 입력해주세요'
            });
            return;
        }

        axios
            .post(`http://localhost:9000/api/cinema/update`,
                {area: area, spotName: spotName,id:id})
            .then((resp) => {
                const {data} = resp
                refresh()
                closeU()
                console.log(data)
            })

    }
    return(
        <>
        <Modal
            show={showU}
            onHide={closeU}
        >
            <Modal.Header closeButton>
                <Modal.Title>극장 등록</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <select name="area" onChange={onChange}>
                        <option >==선택==</option>
                        <option value='서울'>서울</option>
                        <option value='경기'>경기</option>
                        <option value='인천'>인천</option>
                        <option value='강원'>강원</option>
                        <option value='대전/충청'>대전/충청</option>
                        <option value='대구'>대구</option>
                        <option value='부산/울산'>부산/울산</option>
                        <option value='경상'>경상</option>
                        <option value='광주/전라/제주'>광주/전라/제주</option>
                    </select>
                    <br/>
                    극장 이름: <input name='spotName' onChange={onChange}/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeU}>
                    등록 취소
                </Button>
                <Button variant="primary" onClick={onUpdate}>등록</Button>
            </Modal.Footer>
        </Modal>
    </>
    )
}