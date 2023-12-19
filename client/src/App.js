import { useState, useEffect } from 'react'
import Axios from "axios"
import {Routes, Route, useNavigate} from 'react-router-dom'
import Home from './components/Home';
import NotFound from './container/NotFound';
import Register from './components/Register';

const App = () => {
  // const [data, setData]=useState("")

  // const getData=async()=> {
  //   const response=await Axios.get("http://localhost:3001/getData")
  //   setData(response.data)
  // }

  // useEffect(()=> {
  //   getData()
  // }, [])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
