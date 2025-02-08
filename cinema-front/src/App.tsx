import './App.css'
import {BrowserRouter, Route, Routes, useLocation} from "react-router-dom";
import {MovieAll} from "./page/movie/MovieAll.tsx";
import axios from "axios";
import {MovieOne} from "./page/movie/MovieOne.tsx";
import {Index} from "./page";
import Nav from "./page/Nav.tsx";
import {CinemaAll} from "./page/cinema/CinemaAll.tsx";
import {CinemaOne} from "./page/cinema/CinemaOne.tsx";

function Layout() {
    const location = useLocation();

    return (
        <>
            {/* 특정 경로가 아닌 경우에만 Nav 컴포넌트를 렌더링 */}
            {location.pathname !== '/' && <Nav />}
            <Routes>
                <Route path='/' element={<Index />}/>
                <Route path='/movie/movieAll/:pageNo' element={<MovieAll />}/>
                <Route path='/movie/movieOne/:id' element={<MovieOne />}/>
                <Route path='/cinema/cinemaAll/:pageNo' element={<CinemaAll />}/>
                <Route path='/cinema/cinemaOne/:id' element={<CinemaOne />}/>
            </Routes>
        </>
    );
}

function App() {
    axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.token;

    return (
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    )
}

export default App
