import './App.css'
import {BrowserRouter, Route, Routes, useLocation} from "react-router-dom";
import {MovieAll} from "./page/movie/MovieAll.tsx";
import axios from "axios";
import {MovieOne} from "./page/movie/MovieOne.tsx";
import Nav from "./page/Nav.tsx";
import {CinemaAll} from "./page/cinema/CinemaAll.tsx";
import {CinemaOne} from "./page/cinema/CinemaOne.tsx";
import { CinemaTest } from './page/cinema/CinemaTest.tsx';
import { Info } from './page/Info.tsx';

import { OAuthHandler } from './page/OAuthHandler.tsx';
import { Index } from './page/Index.tsx';
import { UserAll } from './page/UserAll.tsx';


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
                <Route path='/cinema/cinemaTest/:pageNo' element={<CinemaTest />}/>
                <Route path='/cinema/cinemaOne/:spotName/:id' element={<CinemaOne />}/>
                <Route path='/info' element={<Info />}/>
                <Route path='/user' element={<UserAll/>} />
                <Route path='/oauth' element={<OAuthHandler />} />
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