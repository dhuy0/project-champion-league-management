import React from "react";
import Nav from "../container/Nav";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const ResultRecord = () => {
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedMatchInfo, setSelectedMatchInfo] = useState({});
  const [matchInfo, setMatchInfo] = useState([
    //   {MaTranDau: "",
    //   VongDau: "",
    //   TenDoi1: "",
    //   TenDoi2: "",
    //   SanDau: "",
    //   Ngay: "",
    //   Gio: "",
    // }
  ]);
  const [sttList, setSttList] = useState([]);
  const [roundList, setRoundList] = useState([]);

  const gioMatch = new Date(selectedMatchInfo.Gio);
  const gioGiamMotGio = new Date(
    gioMatch.getTime() - 60 * 60 * 1000
  ); // Giảm một giờ

  // Thêm state để lưu trữ STT và vòng được chọn
  const [selectedStt, setSelectedStt] = useState("");
  const [selectedRound, setSelectedRound] = useState("");

  const [teamName, setTeamName] = useState([]);
  const [playerInfo, setPlayerInfo] = useState([]);
  const [selectedPlayerNumber, setSelectedPlayerNumber] = useState("");
  const [selectedPlayerName, setSelectedPlayerName] = useState("");
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
    id: "",
    player: "",
    team: "",
    goalType: "",
    time: "",
  });

  const [scorerList, setScorerList] = useState([]);

  // useEffect(() => {
  //   console.log('check player info: ', selectedPlayerName)
  // }, [selectedPlayerName])

  useEffect(() => {
    try {
      for (var i = 0; i < playerInfo.length; i++) {
        const key = "MaCauThu";
        if (playerInfo[i][key] == selectedPlayerNumber) {
          setSelectedPlayerName(playerInfo[i]["TenCauThu"]);
        }
      }
    } catch (error) {
      console.error("Error updating form data:", error);
    }
  }, [selectedPlayerNumber]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/get-player-by-team/${selectedTeam}`)
      .then((response) => {
        setPlayerInfo(response.data);
      })
      .catch((error) => {
        console.error("Loi khi lay data tu server", error);
      });
  }, [selectedTeam]);

  useEffect(() => {
    const fetchMatchInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/get-info-game/${selectedStt}/${selectedRound}`
        );
        setMatchInfo(response.data);
      } catch (error) {
        console.error("Loi khi lay data tran dau tu server:", error);
      }
    };
    if (selectedStt && selectedRound) {
      fetchMatchInfo();
    }
  }, [selectedStt, selectedRound]);

  useEffect(() => {
    const fetchSttList = async () => {
      try {
        const response = await axios.get("http://localhost:8080/get-info-game");
        setSttList(response.data);
      } catch (error) {
        console.error("Loi khi lay data STT tu server:", error);
      }
    };

    // Lấy danh sách các đội bóng có trong cơ sở dữ liệu
    const fetchTeamNames = async () => {
      try {
        await axios
          .get("http://localhost:8080/get-name-team")
          .then((response) => {
            console.log(">>> check data: ", response.data);
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
    console.log(">>> check team name: ", teamName);
    fetchTeamNames();
    fetchSttList();
  }, []);

  // Thêm useEffect để lấy danh sách vòng dựa trên STT khi STT thay đổi
  useEffect(() => {
    const fetchRoundList = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/get-round-from-game/${selectedStt}`
        );
        setRoundList(response.data);
      } catch (error) {
        console.error("Loi khi lay data vong tu server:", error);
      }
    };

    if (selectedStt) {
      fetchRoundList();
    }
  }, [selectedStt]);

  const handleMatchChange = (e) => {
    const { name, value } = e.target;
    setMatchData((prevData) => ({ ...prevData, [name]: value }));
    if (name === "MaTranDau") {
      setSelectedStt(value);
    }
  };

  const handleRoundChange = (e) => {
    const { name, value } = e.target;
    //setMatchData((prevData) => ({ ...prevData, [name]: value }));
    if (name === "VongDau") {
      setSelectedRound(value);
    }
  };

  //   useEffect(() => {
  //     console.log("Checking us", teamName);
  //   });
  useEffect(() => {
    const selectedMatchData = matchInfo.find(
      (match) => match.VongDau == selectedRound
    );
    console.log(selectedRound);
    console.log(matchInfo);
    setSelectedMatchInfo({
      TenDoi1: selectedMatchData?.TenDoi1 || "",
      TenDoi2: selectedMatchData?.TenDoi2 || "",
      MaTranDau: selectedStt,
      VongDau: selectedRound,
      // TySoDoi1: selectedMatchData?.TySoDoi1 || "",
      // TySoDoi2: selectedMatchData?.TySoDoi2 || "",
      SanDau: selectedMatchData?.SanDau || "",
      Ngay: selectedMatchData?.Ngay || "",
      Gio: selectedMatchData?.Gio || "",
    });
  }, [matchInfo]);

  const handleScoreChange = (e) => {
    const { name, value } = e.target;
    if(name == "MaCauThu") {
      setSelectedPlayerNumber(e.target.value)
      setScoreData({
        goalType: "",
        time: ""
      })
    }

    if(name == "TenDoi") {
      setSelectedTeam(e.target.value) 
      setScoreData({
        goalType: "",
        time: ""
      })
      setSelectedPlayerNumber("")
      setSelectedPlayerName("")
    }

    if(name == "player") {
      setSelectedPlayerName(e.target.value) 
      setScoreData({
        goalType: "",
        time: ""
      })
    }
    setScoreData((prevData) => ({ ...prevData, [name]: value }));
    setScoreData((prevScoreData) => ({
      id: selectedPlayerNumber,
      player: selectedPlayerName,
      team: selectedTeam,
      goalType: prevScoreData.goalType,
      time: prevScoreData.time,
    }));
    console.log("check score data", scoreData);
  };

  const validateMatchForm = () => {
    if (!selectedStt) {
      toast.error("So thu tu khong duoc de trong");
      return false;
    }
    if (!selectedMatchInfo.TenDoi1) {
      toast.error("Doi 1 khong duoc de trong");
      return false;
    }
    if (!selectedMatchInfo.TenDoi2) {
      toast.error("Doi 2 khong duoc de trong");
      return false;
    }

    if (
      !teamName.some((team) => team.TenDoiBong === selectedMatchInfo.TenDoi1)
    ) {
      toast.error("Team 1 is not in the database");
      return false;
    }

    if (
      !teamName.some((team) => team.TenDoiBong === selectedMatchInfo.TenDoi2)
    ) {
      toast.error("Team 2 is not in the database");
      return false;
    }

    if (selectedMatchInfo.TenDoi1 === selectedMatchInfo.TenDoi2) {
      toast.error("Hai doi khong duoc trung nhau");
      return false;
    }

    if (!selectedRound) {
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

    if (!selectedMatchInfo.SanDau) {
      toast.error("San dau khong duoc de trong");
      return false;
    }

    if (!selectedMatchInfo.Ngay) {
      toast.error("Ngay khong duoc de trong");
      return false;
    }

    if (!selectedMatchInfo.Gio) {
      toast.error("Thoi gian khong duoc de trong");
      return false;
    }
    return true;
  };

  //Khi ấn lưu thì kiểm tra điều kiện sau đó gửi data về cho server
  const handleMatchSave = async () => {
    const dataToSend = {
      ...selectedMatchInfo,
      TySoDoi1: matchData.score1,
      TySoDoi2: matchData.score2,
    };
    console.log(dataToSend);
    try {
      const isValid = validateMatchForm();
      if (isValid) {
        await axios.put("http://localhost:8080/update-record", dataToSend);
        // console.log('Section 1 data saved successfully');
        // console.log(matchData)
        toast.success("Them thanh cong!");
      }
    } catch (error) {
      console.error("Loi gui du lieu ve server:", error);
    }
  };

  const validateScorerForm = () => {
    if (!selectedPlayerNumber) {
      toast.error("So thu tu khong duoc de trong");
      return false;
    }
    if (!selectedPlayerName) {
      toast.error("Ten cau thu khong duoc de trong");
      return false;
    }
    if (!selectedTeam) {
      toast.error("Doi bong khong duoc de trong");
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

    return true;
  };

  // useEffect(() => {
  //   setScoreData((prevScoreData) => ({
  //     id: selectedPlayerNumber,
  //     player: selectedPlayerName,
  //     team: selectedTeam,
  //     goalType: prevScoreData.goalType,
  //     time: prevScoreData.time,
  //   }));

  // }, [scoreData])

  const handleScoreSave = () => {
    try {

      const isValid = validateScorerForm();
      if (isValid) {
        const dataToSend = {
          ...scoreData,
          round: selectedRound,
          matchId: selectedStt,
        }
        axios.post("http://localhost:8080/add-scorer", dataToSend);
        setScorerList((prevList) => [
          ...prevList,
          { ...scoreData, index: prevList.length + 1 },
        ]);
        console.log(">>> check data to send: ", dataToSend);
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
                <select
                  className="pl-4 bg-stone-200 flex-grow"
                  name="MaTranDau"
                  value={selectedStt}
                  onChange={(e) => setSelectedStt(e.target.value)}
                  //disabled={!selectedStt}
                >
                  <option value="" disabled>
                    Chọn STT
                  </option>
                  {sttList.map((stt) => (
                    <option key={stt.MaTranDau} value={stt.MaTranDau}>
                      {stt.MaTranDau}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-row gap-8 w-1/2 justify-between px-16">
                <p className="">Vòng</p>
                <select
                  name="VongDau"
                  className="pl-4 bg-stone-200 flex-grow"
                  value={matchData.VongDau}
                  onChange={handleRoundChange}
                  //disabled={!selectedStt} // Disable if STT is not selected
                >
                  <option value="">Chọn vòng</option>
                  {roundList.map((round) => (
                    <option key={round.VongDau} value={round.VongDau}>
                      {round.VongDau}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="text-xl flex flex-row justify-between">
              <div className="flex flex-row w-1/2">
                <p className="w-28">Đội 1</p>
                <input
                  type="text"
                  className="pl-4 bg-stone-200 flex-grow"
                  name="TenDoi1"
                  value={selectedMatchInfo.TenDoi1}
                  //onChange={handleMatchChange}
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
                  name="TenDoi2"
                  value={selectedMatchInfo.TenDoi2}
                  //onChange={handleMatchChange}
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
                name="SanDau"
                value={selectedMatchInfo.SanDau}
                //onChange={handleMatchChange}
              />
            </div>
            <div className="text-xl flex flex-row items-center justify-between pr-16">
              <div className="w-1/2">
                <p className="w-28">Ngày</p>
                <input
                  type="text"
                  className="pl-4 bg-stone-200 flex-grow"
                  name="Ngay"
                  value={new Date(selectedMatchInfo.Ngay).toLocaleDateString()}
                  //onChange={handleMatchChange}
                />
              </div>
              <div className="w-1/2">
                <p className="w-28">Giờ</p>
                <input
                  type="text"
                  className="pl-4 bg-stone-200 flex-grow"
                  name="Gio"
                  value={gioGiamMotGio.toLocaleTimeString()}
                  //onChange={handleMatchChange}
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
              <select
                className="pl-4 bg-stone-200 flex-grow"
                name="MaCauThu"
                value={selectedPlayerNumber}
                onChange={handleScoreChange}
              >
                <option value="" disabled>
                  Chọn STT
                </option>
                {playerInfo.map((player) => (
                  <option key={player.MaCauThu} value={player.MaCauThu}>
                    {player.MaCauThu}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-xl flex flex-row justify-between">
              <div className="flex flex-row w-1/2">
                <p className="w-28">Cầu thủ</p>
                <select
                  className="pl-4 bg-stone-200 flex-grow"
                  name="player"
                  value={scoreData.player}
                  onChange={handleScoreChange}
                >
                  <option value="" disabled>
                    Chọn Cầu thủ
                  </option>
                  <option key={selectedPlayerName} value={selectedPlayerName}>
                    {selectedPlayerName}
                  </option>
                </select>
              </div>
              <div className="flex flex-row gap-8 w-1/2 justify-between px-16">
                <p>Đội</p>
                <select
                  className="pl-4 bg-stone-200 flex-grow"
                  name="TenDoi"
                  value={selectedTeam}
                  onChange={handleScoreChange}
                >
                  <option value="" disable>
                    Chọn Đội
                  </option>
                  <option value={selectedMatchInfo.TenDoi1}>
                    {selectedMatchInfo.TenDoi1}
                  </option>
                  <option value={selectedMatchInfo.TenDoi2}>
                    {selectedMatchInfo.TenDoi2}
                  </option>
                </select>
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
                  <td>{scorer.id}</td>
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
