import {useState} from 'react'
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router";
import Index from "./Index.tsx";
import Register from "./user/Register.tsx";
import ShowAll from "./board/ShowAll.tsx";
import ShowOne from "./board/ShowOne.tsx";
import Insert from "./board/Insert.tsx";
import axios from "axios";
import Write from "./board/Write.tsx";

interface User {
    id: number,
    name: string,
    isTrue: boolean
}

// // 로컬 저장소에서 토큰 가져오기
// const token = sessionStorage.getItem('token');
//
// // Axios 기본 헤더 설정
// axios.defaults.headers.common["Authorization"] = "Bearer " + token;
function App() {
    const [count, setCount] = useState(0)

    let number: number;
    number = 4;

    let value: User

    value = {id: 3, name: '안철', isTrue: false}

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Index/>}/>
                <Route path='/user/register' element={<Register/>}/>
                <Route path='/board/showAll/:pageNo' element={<ShowAll/>}/>
                <Route path='/board/showOne/:id' element={<ShowOne/>}/>
                <Route path='/board/insert' element={<Insert/>}/>
                <Route path='/board/write' element={<Write/>}/>
            </Routes>

        </BrowserRouter>
    )
}

export default App
