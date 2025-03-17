import {Button, Modal} from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";

export function CinemaInsert({showI, closeI,refresh,state, dispatch}) {
    const {area, spotName} = state.cinema

    const onChange = (e) => {
        const {name, value} = e.target
        dispatch({
            type: 'ON_CHANGE',
            name,
            value
        })
    }

    const onInsert = () => {
        if (area === '' || spotName === '') {
            Swal.fire({
                icon: 'error',
                title: '모두 입력해주세요'
            });
            return;
        }

        axios
            .post(`http://localhost:9000/api/cinema/insert`,
                {area: area, spotName: spotName})
            .then((resp) => {
                const {data} = resp
                refresh()
                closeI()
            
            })

    }
    return (
        <>
            <Modal
                show={showI}
                onHide={closeI}
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
                        <option value='대전충청'>대전/충청</option>
                        <option value='대구'>대구</option>
                        <option value='부산울산'>부산/울산</option>
                        <option value='경상'>경상</option>
                        <option value='광주전라제주'>광주/전라/제주</option>
                    </select>
                    <br/>
                    극장 이름: <input name='spotName' onChange={onChange}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeI}>
                        등록 취소
                    </Button>
                    <Button variant="primary" onClick={onInsert}>등록</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
