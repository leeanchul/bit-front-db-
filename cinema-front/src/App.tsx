import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {MovieAll} from "./page/movie/MovieAll.tsx";
import axios from "axios";
import {MovieOne} from "./page/movie/MovieOne.tsx";
import {Index} from "./page";
import {useEffect} from "react";


function App() {
    axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.token;
  return (
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<Index/>}/>
              <Route path='/movie/movieAll/:pageNo' element={<MovieAll/>}/>
              <Route path='/movie/movieOne/:id' element={<MovieOne/>}/>
          </Routes>
      </BrowserRouter>
  )
}

export default App
