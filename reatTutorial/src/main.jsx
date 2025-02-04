import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import MyReducer from "./MyReducer.jsx";
import TestTodo from "./testTodo/TestTodo.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
    {/*  <TestTodo/>*/}
  </StrictMode>,
)
