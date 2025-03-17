import { useEffect, useReducer, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { ShowInsert } from "../../modal/show/ShowInsert";
import axios from "axios";
import { initialstateS, ReducerShow } from "../../reducer/ReducerShow";
import { useParams } from "react-router-dom";
import { ShowDelete } from "../../modal/show/ShowDelete";
import { ShowUpdate } from "../../modal/show/ShowUpdate";
import { RoomsInsert } from "../../modal/rooms/RoomsInsert";

function Print({ show, refresh }) {
    const [imageSrc, setImageSrc] = useState(null);
    // 상영중 영화 수정 모달
    const [showU, setShowU] = useState(false);
    const closeU = () => { setShowU(false); };
    const openU = () => setShowU(true);

    // 상영중 영화 삭제 모달
    const [showD, setShowD] = useState(false);
    const closeD = () => { setShowD(false); };
    const openD = () => setShowD(true);
    // 상영정보
    const [showInfo, setShowInfo] = useState(false);
    const closeInfo = () => { setShowInfo(false); };
    const openInfo = () => { setShowInfo(true); };
    useEffect(() => {
        if (show.filePath && show.filePath !== '') {
            axios.get(`http://localhost:9000/api/movie/upload/${show.filePath}`, {
                responseType: 'blob',
            }).then((response) => {
                const blob = response.data;
                const imageUrl = URL.createObjectURL(blob);
                setImageSrc(imageUrl);
            }).catch((error) => {
                console.error('Image loading failed:', error);
            });
        }
    }, [show]);

    return (
        <tr key={show.id}>
            <td>
                {imageSrc ? (
                    <img width="150px" height="150px" src={imageSrc} alt="이미지 없음" />
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-image-alt" viewBox="0 0 16 16">
                        <path
                            d="M7 2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m4.225 4.053a.5.5 0 0 0-.577.093l-3.71 4.71-2.66-2.772a.5.5 0 0 0-.63.062L.002 13v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4.5z"/>
                    </svg>
                )}
            </td>
            <td>{show.title} {show.id}</td>
            <td>{show.showTime}</td>
            <td>{show.type}</td>
            <td>{show.age}</td>
            <td><Button variant="dark" onClick={openU}>수정</Button></td>
            <td><Button variant="dark" onClick={openD}>삭제</Button></td>
            <ShowDelete showD={showD} closeD={closeD} id={show.id} refresh={refresh} />
            <ShowUpdate showU={showU} closeU={closeU} id={show.id} refresh={refresh} />
            <td><Button variant="dark" onClick={openInfo}>상영 정보 추가</Button></td>
            <RoomsInsert showInfo={showInfo} closeInfo={closeInfo} item={show} refresh={refresh}/>
        </tr>
    );
}

export function CinemaOne() {
    const [state, dispatch] = useReducer(ReducerShow, initialstateS);
    const { spotName, id } = useParams();

    // 상영중 영화 추가 모달
    const [showI, setShowI] = useState(false);
    const closeI = () => { setShowI(false); };
    const openI = () => setShowI(true);




    const refresh = () => {
        axios
            .get(`http://localhost:9000/api/show/showAll/${id}`)
            .then((resp) => {
                const { data } = resp;
                dispatch({
                    type: 'ON_SHOWALL',
                    showList: data,
                });
            });
    };

    useEffect(() => {
        refresh();
    }, []);

    return (
        <>
            <h1>CINEMA {spotName}</h1>
            <Button variant="dark" onClick={openI}>상영 영화 추가</Button>
            <ShowInsert showI={showI} closeI={closeI} cinemaId={id} refresh={refresh} />
           

            <Table>
                <thead>
                    <tr>
                        <td>사진</td>
                        <td>영화 제목</td>
                        <td>상영 시간</td>
                        <td>상영 방식</td>
                        <td>영상물 등급</td>
                        <td>수정</td>
                        <td>삭제</td>
                        <td>상영 정보 추가</td>
                    </tr>
                </thead>
                <tbody>
                    {state.showList.map((show) => (
                        <Print show={show} key={show.id} refresh={refresh} />
                    ))}
                </tbody>
            </Table>
        </>
    );
}
