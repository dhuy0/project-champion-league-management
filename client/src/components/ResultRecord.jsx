import React from "react";
import Nav from "../container/Nav";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const ResultRecord = () => {
  const [teamName, setTeamName] = useState([]);
  const [playerInfo, setPlayerInfo] = useState([]);
  const [matchData, setMatchData] = useState({
    no: "",
    round: "",
    team1: "",
    score1: "",
    team2: "",
    score2: "",
    pitch: "",
    date: "",
    time: "",
  });
  const [scoreData, setScoreData] = useState({
    stt: "",
    player: "",
    team: "",
    goalType: "",
    time: "",
  });

  const [scorerList, setScorerList] = useState([]);

  useEffect(() => {
    // Lấy danh sách các đội bóng có trong cơ sở dữ liệu
    const fetchTeamNames = async () => {
      try {
        axios
          .get("http://localhost:8080/get-all-team")
          .then((response) => {
            setTeamName(response.data);
            console.log(">>> check team name: ", teamName);
          })
          .catch((error) => {
            console.error("Loi khi lay data tu server", error);
          });
        // const response = await axios.get('your-api-endpoint-for-team-names');
        //setTeamNames(response.data); // Assuming the response is an array of team names
        // const testData = ['team1', 'team2', 'team3', 'team4']
      } catch (error) {
        console.error("Loi khi lay data tu server:", error);
      }
    };

    fetchTeamNames();
  }, []);

  const handleMatchChange = (e) => {
    const { name, value } = e.target;
    setMatchData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleScoreChange = (e) => {
    const { name, value } = e.target;
    setScoreData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateMatchForm = () => {
    if (!matchData.no) {
      toast.error("So thu tu khong duoc de trong");
      return false;
    }
    if (!matchData.team1) {
      toast.error("Doi 1 khong duoc de trong");
      return false;
    }
    if (!matchData.team2) {
      toast.error("Doi 2 khong duoc de trong");
      return false;
    }

    if (!teamName.includes(matchData.team1)) {
      toast.error("Doi 1 khong co trong database");
      return false;
    }

    if (!teamName.includes(matchData.team2)) {
      toast.error("Doi 2 khong co trong database");
      return false;
    }

    if (matchData.team1 === matchData.team2) {
      toast.error("Hai doi khong duoc trung nhau");
      return false;
    }

    if (!matchData.round) {
      toast.error("Vong thi dau khong duoc de trong");
      return false;
    }

    if (!matchData.score1) {
      toast.error("Ty so doi 1 khong duoc de trong");
      return false;
    }

    if (!matchData.score2) {
      toast.error("Ty so doi 2 khong duoc de trong");
      return false;
    }

    if (!matchData.pitch) {
      toast.error("San dau khong duoc de trong");
      return false;
    }

    if (!matchData.date) {
      toast.error("Ngay khong duoc de trong");
      return false;
    }

    if (!matchData.time) {
      toast.error("Thoi gian khong duoc de trong");
      return false;
    }
    return true;
  };

  //Khi ấn lưu thì kiểm tra điều kiện sau đó gửi data về cho server
  const handleMatchSave = async () => {
    console.log(matchData);
    try {
      const isValid = validateMatchForm();
      if (isValid) {
        await axios.post("api", matchData);
        // console.log('Section 1 data saved successfully');
        // console.log(matchData)
        toast.success("Them thanh cong!");
      }
    } catch (error) {
      console.error("Loi gui du lieu ve server:", error);
    }
  };

  const validateScorerForm = () => {
    if (!scoreData.stt) {
      toast.error("So thu tu khong duoc de trong");
      return false;
    }
    if (!scoreData.player) {
      toast.error("Ten cau thu khong duoc de trong");
      return false;
    }
    if (!scoreData.team) {
      toast.error("Doi bong khong duoc de trong");
      return false;
    }

    if (
      scoreData.team != matchData.team1 &&
      scoreData.team != matchData.team2
    ) {
      toast.error("Doi bong khong hop le");
      return false;
    }

    if (!scoreData.goalType) {
      toast.error("Loai ban thang khong duoc de trong");
      return false;
    }

    if (!scoreData.time) {
      toast.error("Thoi diem khong duoc de trong");
      return false;
    }

    const selectedPlayer = playerInfo.find(
      (player) => player.id === scoreData.stt
    );
    if (!selectedPlayer) {
      toast.error("Cau thu khong hop le");
      return false;
    }

    if (scoreData.player !== selectedPlayer.name) {
      toast.error("Ten cau thu khong hop le");
      return false;
    }

    return true;
  };

  const handleScoreSave = () => {
    try {
      // Use Axios to send section2Data to the server
      //   await Axios.post('your-api-endpoint', scoreData);
      // const testData =
      // [{ id: '1', name: 'playerA' },
      // { id: '2', name: 'playerB' },
      // { id: '4', name: 'playerD' },
      // { id: '3', name: 'playerC' }]

      // setPlayerInfo(testData)
      // Lấy dữ liệu về các các cầu thủ để kiểm tra các ID và tên cầu thủ khớp
      // với nhau trong cơ sở dữ liệu, nội dung lấy về từ server sẽ là id và name của các cầu thủ
      axios
        .get("http://localhost:8080/get-player-by-name")
        .then((response) => {
          setPlayerInfo(response.data);
        })
        .catch((error) => {
          console.error("Loi khi lay data tu server", error);
        });

      const isValid = validateScorerForm();
      if (isValid) {
        axios.post("api", scoreData);
        setScorerList((prevList) => [
          ...prevList,
          { ...scoreData, index: prevList.length + 1 },
        ]);
        console.log(">>> check scorer data: ", scoreData);
        toast.success("Them thanh cong!");
      }
    } catch (error) {
      console.error("Error saving score data:", error);
    }
  };

  return (
    <div className="flex flex-row h-screen">
      <div className="basis-1/5">
        <Nav />
      </div>
      <div className="basis-4/5">
        <header className="bg-gray-400 text-center py-4 font-bold text-white text-[3.175rem]">
          Ghi nhận kết quả
        </header>
        <div className="h-3/4 mx-10 mt-4 flex flex-col gap-4">
          <div className=" border-solid border-black border-2 px-8 py-4 gap-4 flex flex-col">
            <div className="text-xl flex flex-row justify-between">
              <div className="flex flex-row w-1/2">
                <p className="w-28">STT</p>
                <input
                  type="text"
                  className="pl-4 bg-stone-200 flex-grow"
                  name="no"
                  value={matchData.no}
                  onChange={handleMatchChange}
                />
              </div>
              <div className="flex flex-row gap-8 w-1/2 justify-between px-16">
                <p className="">Vòng</p>
                <input
                  type="text"
                  name="round"
                  className="pl-4 bg-stone-200 flex-grow"
                  value={matchData.round}
                  onChange={handleMatchChange}
                />
              </div>
            </div>
            <div className="text-xl flex flex-row justify-between">
              <div className="flex flex-row w-1/2">
                <p className="w-28">Đội 1</p>
                <input
                  type="text"
                  className="pl-4 bg-stone-200 flex-grow"
                  name="team1"
                  value={matchData.team1}
                  onChange={handleMatchChange}
                />
              </div>
              <div className="flex flex-row gap-8 w-1/2 justify-between px-16">
                <p>Tỷ số</p>
                <input
                  type="text"
                  className="pl-4 bg-stone-200 flex-grow"
                  name="score1"
                  value={matchData.score1}
                  onChange={handleMatchChange}
                />
              </div>
            </div>
            <div className="text-xl flex flex-row justify-between">
              <div className="flex flex-row w-1/2">
                <p className="w-28">Đội 2</p>
                <input
                  type="text"
                  className="pl-4 bg-stone-200 flex-grow"
                  name="team2"
                  value={matchData.team2}
                  onChange={handleMatchChange}
                />
              </div>
              <div className="flex flex-row gap-8 w-1/2 justify-between px-16">
                <p>Tỷ số</p>
                <input
                  type="text"
                  className="pl-4 bg-stone-200 flex-grow"
                  name="score2"
                  value={matchData.score2}
                  onChange={handleMatchChange}
                />
              </div>
            </div>
            <div className="text-xl flex flex-row justify-between pr-16">
              <p className="w-28">Sân</p>
              <input
                type="text"
                className="pl-4 bg-stone-200 flex-grow"
                name="pitch"
                value={matchData.pitch}
                onChange={handleMatchChange}
              />
            </div>
            <div className="text-xl flex flex-row items-center justify-between pr-16">
              <div className="w-1/2">
                <p className="w-28">Ngày</p>
                <input
                  type="text"
                  className="pl-4 bg-stone-200 flex-grow"
                  name="date"
                  value={matchData.date}
                  onChange={handleMatchChange}
                />
              </div>
              <div className="w-1/2">
                <p className="w-28">Giờ</p>
                <input
                  type="text"
                  className="pl-4 bg-stone-200 flex-grow"
                  name="time"
                  value={matchData.time}
                  onChange={handleMatchChange}
                />
              </div>

              <button
                onClick={handleMatchSave}
                className="text-xl bg-gray-400 text-gray-100 w-40 h-10 hover:bg-gray-500"
              >
                <div className="flex items-center justify-center">Lưu</div>
              </button>
            </div>
          </div>
          <div className=" border-solid border-black border-2 py-4 px-8 flex flex-col gap-4">
            <div className="text-xl flex flex-row w-1/2">
              <p className="w-28">STT</p>
              <input
                type="text"
                className="pl-4 bg-stone-200 flex-grow"
                name="stt"
                value={scoreData.stt}
                onChange={handleScoreChange}
              />
            </div>
            <div className="text-xl flex flex-row justify-between">
              <div className="flex flex-row w-1/2">
                <p className="w-28">Cầu thủ</p>
                <input
                  type="text"
                  className="pl-4 bg-stone-200 flex-grow"
                  name="player"
                  value={scoreData.player}
                  onChange={handleScoreChange}
                />
              </div>
              <div className="flex flex-row gap-8 w-1/2 justify-between px-16">
                <p>Đội</p>
                <input
                  type="text"
                  className="pl-4 bg-stone-200 flex-grow"
                  name="team"
                  value={scoreData.team}
                  onChange={handleScoreChange}
                />
              </div>
            </div>
            <div className="text-xl flex flex-row justify-between">
              <div className="flex flex-row w-1/2">
                <p className="w-48">Loại bàn thắng</p>
                <input
                  type="text"
                  className="pl-4 bg-stone-200 flex-grow"
                  name="goalType"
                  value={scoreData.goalType}
                  onChange={handleScoreChange}
                />
              </div>
              <div className="flex flex-row gap-8 w-1/2 justify-between px-16">
                <p>Thời điểm</p>
                <input
                  type="text"
                  className="pl-4 bg-stone-200 flex-grow"
                  name="time"
                  value={scoreData.time}
                  onChange={handleScoreChange}
                />
              </div>
            </div>
            <div className="flex flex-row justify-center">
              <button
                onClick={handleScoreSave}
                className="text-xl bg-gray-400 text-gray-100 w-40 h-10 hover:bg-gray-500"
              >
                <div className="flex items-center justify-center">Lưu</div>
              </button>
            </div>
          </div>
          <table className="w-full h-fit border-solid border-2 border-black">
            <thead>
              <tr className="bg-gray-300">
                <th className="font-bold">STT</th>
                <th className="font-bold">Cầu thủ</th>
                <th className="font-bold">Đội</th>
                <th className="font-bold">Loại bàn thắng</th>
                <th className="font-bold">Thời điểm</th>
              </tr>
            </thead>
            <tbody>
              {scorerList.map((scorer) => (
                <tr key={scorer.index}>
                  <td>{scorer.stt}</td>
                  <td>{scorer.player}</td>
                  <td>{scorer.team}</td>
                  <td>{scorer.goalType}</td>
                  <td>{scorer.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ResultRecord;
