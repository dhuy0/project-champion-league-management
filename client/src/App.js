import './App.css';
import { useState, useEffect } from 'react'
import Axios from "axios"


const App=() => {
  const [data, setData]=useState("")

  const getData=async()=> {
    const response=await Axios.get("http://localhost:3001/getData")
    setData(response.data)
  }

  useEffect(()=> {
    getData()
  }, [])

  return (
    <div className="App">
      {data}
    </div>
  );
}

export default App;
