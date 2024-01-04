import React from "react";
import Nav from "../container/Nav";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const SelectTeam = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");

  useEffect(() => {
    console.log(">>> check selected team: ", selectedTeam)
  }, [selectedTeam])

  useEffect(() => {
    console.log(">>> check team: ", teams)
  }, [teams])

  useEffect(() => {
    //Gửi về danh sách id, Tên đội bóng
    axios
      .get("http://localhost:8080/get-all-team")
      .then((response) => {
        setTeams(response.data);
        console.log(teams);
      })
      .catch((error) => {
        console.error("Error fetching data from API", error);
      });
  }, []);

  const handleTeamChange = (event) => {
    setSelectedTeam(event.target.value);
  };

  return (
    <div className="flex flex-row h-screen">
      {/* Thanh chức năng */}
      <div style={{ flex: '0 0 310px' }}>
        <Nav />
      </div>
      <div className='basis -4/5 min-w-[1500px] min-h-screen overflow-y-auto'>
        <header className='bg-gray-400 text-center py-4 font-bold text-white text-[3.175rem]'>
          Chỉnh sửa hồ sơ đội bóng
        </header>
        <div className="flex flex-col justify-center items-center gap-20 text-2xl h-4/5">
          <div className="mt-20 flex flex-row justify-center items-center gap-4 text-2xl">
            <div>Đội bóng</div>
            {/* Chọn đội bóng để chỉnh sửa */}
            <select
              name="team"
              className="bg-stone-200 w-64"
              onChange={handleTeamChange}
              value={selectedTeam}
            >
              <option value="" disabled>
                Chọn đội bóng
              </option>
              {teams.map((team) => (
                <option key={team.MaDoiBong} value={team.MaDoiBong}>
                  {team.TenDoiBong}
                </option>
              ))}
            </select>
          </div>
          <Link to={`/team-edit/${selectedTeam}`}>
            <button className="text-xl bg-gray-400 text-gray-100 w-40 h-10 hover:bg-gray-500">
              <div className="flex items-center justify-center">Xác nhận</div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SelectTeam;
