import { useState, useEffect } from 'react'
import Axios from "axios"
import { Routes, Route, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/Home';
import NotFound from './container/NotFound';
import Register from './components/Register';
import SelectTeam from './components/SelectTeam'
import TeamEdit from './components/TeamEdit';
import Search from './components/Search';
import ScheduleEdit from './components/ScheduleEdit';
import ScheduleView from './components/ScheduleView';
import ResultRecord from './components/ResultRecord';
import RankingReport from './components/RankingReport';
import ScorerList from './components/ScorerList';
import RuleEdit from './components/RuleEdit';
import ScheduleAdd from './components/ScheduleAdd';

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
    <div>


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/team-select" element={<SelectTeam />} />
        <Route path="/team-edit/:teamId" element={<TeamEdit />} />
        <Route path="/player-search" element={<Search />} />
        <Route path="/schedule-view" element={<ScheduleView />} />
        <Route path="/schedule-view/:round" element={<ScheduleView />} />
        <Route path="/schedule-edit/:round" element={<ScheduleEdit />} />
        <Route path="/schedule-add/:round" element={<ScheduleAdd />} />
        <Route path="/result-record" element={<ResultRecord />} />
        <Route path="/report-ranking" element={<RankingReport />} />
        <Route path="/report-scorer" element={<ScorerList />} />
        <Route path="/rule-edit" element={<RuleEdit />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
