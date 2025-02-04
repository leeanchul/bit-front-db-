import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Index} from "./Index.tsx";
import MovieAll from "./movie/MovieAll.tsx";
import MovieOne from "./movie/MovieOne.tsx";
import {Test} from "./movie/Test.tsx";
import axios from "axios";

axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.token;
function App() {

  return (
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Index/>}/>
            <Route path='/movie/movieAll/:pageNo' element={<MovieAll/>}/>
            <Route path='/movie/movieOne/:id' element={<MovieOne/>}/>
            <Route path='/test' element={<Test/>}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App
