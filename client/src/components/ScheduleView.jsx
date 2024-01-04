import React from "react";
import Nav from "../container/Nav";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ScheduleView = () => {
  const { round } = useParams();

  const [rounds, setRounds] = useState([1, 2, 3, 4, 5, 6]);
  const [selectedRound, setSelectedRound] = useState("");
  const [matchData, setMatchData] = useState([]);

  const handleRoundChange = (e) => {
    setSelectedRound(e.target.value);
  };

  const handleEditClick = () => {
    if (selectedRound) {
      // Only navigate if a round is selected
      window.location.href = `/schedule-edit/${selectedRound}`;
    } else {
      // Display an error message if no round is selected
      toast.error("Vui lòng chọn vòng trước khi chỉnh sửa");
    }
  };

  const handleAddClick = () => {
    if (selectedRound) {
      // Only navigate if a round is selected
      window.location.href = `/schedule-add/${selectedRound}`;
    } else {
      // Display an error message if no round is selected
      toast.error("Vui lòng chọn vòng trước khi thêm mới");
    }
  };

  useEffect(() => {
    // Lấy tất cả cái vòng có trong cơ sở dữ liệu
    // axios.get("http://localhost:8080/get-round-from-game").then((response) => {
    //   setRounds(response.data);
    // });
  }, []);

  useEffect(() => {
    if (round) {
      setSelectedRound(round);
    }
  }, [round]);

  useEffect(() => {
    // Simulate fetching match data from the server based on the selected round
    const fetchMatchData = async () => {
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      await delay(500); // Simulating a delay of 500ms

      // Simulated match data for testing
      // const simulatedData = [
      //     { stt: 1, team1: 'Team A', team2: 'Team B', date: '2023-01-01', time: '15:00', pitch: 'Stadium X' },
      //     { stt: 2, team1: 'Team B', team2: 'Team C', date: '2023-04-01', time: '10:00', pitch: 'Stadium Y' },
      //     { stt: 3, team1: 'Team B', team2: 'Team C', date: '2023-04-01', time: '10:00', pitch: 'Stadium Y' },
      //     // Add more simulated data as needed
      // ];

      // setMatchData(simulatedData);
      //Lấy thông tin về tất cả trận đấu trong vòng này
      axios
        .get(
          `http://localhost:8080/get-info-game/${encodeURIComponent(
            selectedRound
          )}`
        )
        .then((response) => {
          setMatchData(response.data);
        });
    };

    if (selectedRound) {
      fetchMatchData();
    }
  }, [selectedRound]);

  return (
    <div className="flex flex-row h-screen">
      <div className="basis-1/5">
        <Nav />
      </div>
      <div className="basis-4/5">
        <header className="bg-[#5C8374] text-center py-[18px] font-bold text-white text-[3.175rem]">
          Quản lý lịch thi đấu
        </header>
        <div className="flex flex-col gap-4 mx-32 my-8 h-4/5">
          <div className="flex flex-row text-xl justify-center">
            <p className="w-1/6">Vòng</p>
            <select
              name="round"
              className="bg-stone-200 w-1/3"
              value={selectedRound}
              onChange={handleRoundChange}
            >
              <option disabled value="">
                Chọn vòng
              </option>
              {rounds.map((roundId) => (
                <option key={roundId} value={roundId}>
                  {roundId}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-center text-xl mt-8">
            Lịch thi đấu đã lưu
          </div>
          <div className="h-3/5">
            <table className="w-full h-fit border-solid border-2 border-black">
              <tr className="bg-gray-300">
                <th className="font-bold">STT</th>
                <th className="font-bold">Đội 1</th>
                <th className="font-bold">Đội 2</th>
                <th className="font-bold">Ngày - Giờ</th>
                <th className="font-bold">Sân</th>
              </tr>
              {matchData.map((match) => {
                // const gioMatch = new Date(match.Gio);
                // const gioGiamMotGio = new Date(
                //   gioMatch.getTime() - 60 * 60 * 1000
                // ); // Giảm một giờ

                return (
                  <tr key={match.MaTranDau}>
                    <td>{match.MaTranDau}</td>
                    <td>{match.TenDoi1}</td>
                    <td>{match.TenDoi2}</td>
                    <td>
                      {new Date(match.Ngay).toLocaleDateString()}{" "}
                      {new Date(match.Gio).toLocaleTimeString()}
                    </td>
                    <td>{match.SanDau}</td>
                  </tr>
                );
              })}
            </table>
          </div>
          <div className="flex justify-center gap-32">
          <button
              onClick={handleEditClick}
              className="mt-4 text-xl bg-gray-400 text-gray-100 w-40 h-10 hover:bg-gray-500"
            >
              <div className="flex items-center justify-center">
                Chỉnh sửa
              </div>
            </button>
            <button
              onClick={handleAddClick}
              className="mt-4 text-xl bg-gray-400 text-gray-100 w-40 h-10 hover:bg-gray-500"
            >
              <div className="flex items-center justify-center">Thêm mới</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleView;
