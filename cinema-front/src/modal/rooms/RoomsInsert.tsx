
import { useEffect, useReducer, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { initialstateS, ReducerShow } from "../../reducer/ReducerShow";
import axios from "axios";
import Swal from "sweetalert2";

export function RoomsInsert({showInfo,closeInfo,item,refresh}){
    const [state,dispatch]=useReducer(ReducerShow,initialstateS)
    const [name,setName]=useState('')
    const [test, setTest] = useState('');
    const [list, setList] = useState([]);
  
    const handleAdd = () => {
        setList([...list, test]);
        setTest(''); // 입력 필드 초기화
      };
      const onInsert = () => {
        if (list.size ===0 || name === '') {
            Swal.fire({
                icon: 'error',
                title: '모두 입력해주세요'
            });
            return;
        }

        const data = {
            cinemaId: item.cinemaId,
            movieId: item.movieId,
            name: name,
            time: list
          };
        axios
            .post(`http://localhost:9000/api/rooms/insert`,
               data)
            .then((resp) => {
                const {data} = resp
                if(data==='test'){
               Swal.fire({
                            icon: 'success',
                            title: '상영정보 추가'
                        });
                }
              
                setTest('')
                setList([])
              refresh()
              closeInfo()
              
            })

    }
    return(
        <>
            <Modal
                show={showInfo}
                onHide={closeInfo}
            >
                <Modal.Header closeButton>
                    <Modal.Title>!!!상영 영화관 정보 추가(${item.id})!!!!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {item.cinemaId}
                    <br />
                    {item.movieId}
                    <br />
                영화 : {item.title}
                    <br />
                <br/> 
                상영 시간:      <input
                            name='test'
                            value={test}
                            onChange={(e) => setTest(e.target.value)}
                        />
                <button onClick={handleAdd}>추가</button>
                <ul>
                    {list.map((item, index) => (
                    <li key={index}>{item}</li>
                    ))}
                </ul>
                <br />
                상영 관: <select name="name" onChange={(e) => setName(e.target.value)}>
                    <option value="">상영관 선택</option>
                    <option value="1관">1관</option>
                    <option value="2관">2관</option>
                    <option value="3관">3관</option>
                    <option value="4관">4관</option>
                    <option value="5관">5관</option>
                </select>

                <br />
               
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>{
                              dispatch({
                                type:'RESET_SHOW'
                            })
                            setTest('')
                            setList([])
                            closeInfo()
                    }}>
                        취소
                    </Button>
                    <Button variant="primary" onClick={onInsert}>완료</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}