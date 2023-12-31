import React from "react";
import Nav from "../container/Nav";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ScheduleEdit = () => {
  const navigate = useNavigate();

  // const mockNoList = ['1', '2', '3', '4'];
  // const mockMatchData = {
  //   '1': {
  //     team1: 'Team A',
  //     team2: 'Team B',
  //     pitch: 'Stadium X',
  //     date: '2023-01-01',
  //     time: '15:00',
  //   },
  //   '2': {
  //     team1: 'Team B',
  //     team2: 'Team C',
  //     pitch: 'Stadium Y',
  //     date: '2023-04-01',
  //     time: '10:00',
  //   },
  //   // Add more simulated data as needed
  // };

  const { round } = useParams();
  const [matchData, setMatchData] = useState([]);
  const [noList, setNoList] = useState([]);
  // const [noList, setNoList] = useState([]);
  const [teamName, setTeamName] = useState([]);
  const [formData, setFormData] = useState({
    MaTranDau: "",
    TenDoi1: "",
    TenDoi2: "",
    SanDau: "",
    Ngay: "",
    Gio: "",
  });

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  useEffect(() => {
    // Lây danh sách STT từ server với round gửi đi
    const fetchSttList = async () => {
      try {
        // const response = await axios.get(`/api/getSttList?round=${round}`);
        // setNoList(response.data.sttList);
        // Lấy danh sách các số thứ tự dựa trên round gửi về server
        axios
          .get(
            `http://localhost:8080/get-id-game-from-round/${encodeURIComponent(
              round
            )}`
          )
          .then((response) => {
            setNoList(response.data);
          });
        // const testData = ['team1', 'team2', 'team3', 'team4']
        // setTeamName(testData)
        //Lấy danh sách các đội bóng trong cơ sở dữ liệu
        axios.get(`http://localhost:8080/get-name-team`).then((response) => {
          setTeamName(response.data);
        });
        //Lấy thông tin về tất cả trận đấu trong vòng này như cái mockData ở trên
        axios
          .get(
            `http://localhost:8080/get-info-game/${encodeURIComponent(round)}`
          )
          .then((response) => {
            setMatchData(response.data);
          });
      } catch (error) {
        console.error("Error fetching STT list:", error);
      }
    };

    fetchSttList();
  }, [round]);

  const handleNoChange = (selectedNo) => {
    try {
      // Find the match data for the selected match number
      const selectedMatchData = matchData.find(
        (match) => match.MaTranDau === selectedNo
      );

      // Update the form data with the selected match data
      setFormData({
        MaTranDau: selectedNo,
        TenDoi1: selectedMatchData?.TenDoi1 || "",
        TenDoi2: selectedMatchData?.TenDoi2 || "",
        SanDau: selectedMatchData?.SanDau || "",
        Ngay: selectedMatchData?.Ngay || "",
        Gio: selectedMatchData?.Gio || "",
      });
    } catch (error) {
      console.error("Error updating form data:", error);
    }
  };

  // Dang Fix
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log("check Prevdata: ", formData);
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    // console.log("check Name, Value: ", name, value);
    // console.log("check After Data: ", formData);
  };

  const validateForm = () => {
    if (!formData.MaTranDau) {
      toast.error("So thu tu khong duoc de trong");
      return false;
    }
    if (!formData.TenDoi1) {
      toast.error("Doi 1 khong duoc de trong");
      return false;
    }
    if (!formData.TenDoi2) {
      toast.error("Doi 2 khong duoc de trong");
      return false;
    }

    if (!teamName.some((team) => team.TenDoiBong === formData.TenDoi1)) {
      toast.error("Team 1 is not in the database");
      return false;
    }

    if (!teamName.some((team) => team.TenDoiBong === formData.TenDoi2)) {
      toast.error("Team 2 is not in the database");
      return false;
    }

    if (formData.TenDoi1 === formData.TenDoi2) {
      toast.error("Hai doi khong duoc trung nhau");
      return false;
    }

    // if (playedTeam.includes(formData.team1)) {
    //     toast.error("Team 1 is already played in this round");
    //     return false
    // }

    // if (playedTeam.includes(formData.team2)) {
    //     toast.error("Team 2 is already played in this round");
    //     return false
    // }

    if (!formData.SanDau) {
      toast.error("San dau khong duoc trong");
      return false;
    }

    if (!formData.Ngay) {
      toast.error("Ngay khong duoc trong");
      return false;
    }
    if (!formData.Gio) {
      toast.error("Thoi gian khong duoc trong");
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    try {
      // Combine round information with form data
      const dataToSend = {
        round,
        ...formData,
      };

      // Use Axios to send data to the server
      //   await axios.post('your-api-endpoint', dataToSend);
      // console.log(formData);
      const isValid = validateForm();
      if (isValid) {
        axios.put("http://localhost:8080/update-schedule", dataToSend);
        console.log("Data saved successfully");
        console.log(dataToSend);
        toast.success("Chinh sua thanh cong");
        navigate(`/schedule-view/${round}`);
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <div className="flex flex-row h-screen">
      <div className="basis-1/5">
        <Nav />
      </div>
      <div className="basis-4/5">
        <header className="bg-gray-400 text-center py-4 font-bold text-white text-[3.175rem]">
          Đăng kí đội bóng
        </header>
        <form className="flex flex-col gap-4 px-8 py-12 mx-32 mt-24 h-1/2 mx-56 border-solid border-2 border-black">
          <div className="flex flex-row text-xl">
            <p className="w-[138px]">STT</p>
            <select
              name="MaTranDau"
              className="bg-stone-200 w-2/6"
              value={formData.MaTranDau}
              onChange={(e) => {
                handleInputChange(e);
                handleNoChange(e.target.value);
              }}
            >
              <option value="" disabled>
                Chọn STT
              </option>
              {noList.map((stt) => (
                <option key={stt.MaTranDau} value={stt.MaTranDau}>
                  {stt.MaTranDau}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-row text-xl justify-between">
            <p className="w-36">Đội 1</p>
            <input
              type="text"
              className="bg-stone-200 w-5/6"
              name="TenDoi1"
              value={formData.TenDoi1}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-row text-xl justify-between">
            <p className="w-36">Đội 2</p>
            <input
              type="text"
              className=" bg-stone-200 w-5/6"
              name="TenDoi2"
              value={formData.TenDoi2}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-row text-xl justify-between">
            <p className="w-36">Sân</p>
            <input
              type="text"
              className=" bg-stone-200 w-5/6"
              name="SanDau"
              value={formData.SanDau}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-row text-xl justify-between">
            <p className="w-36">Ngày</p>
            <input
              type="date"
              className=" bg-stone-200 w-5/6"
              name="Ngay"
              value={formData.Ngay}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-row text-xl justify-between">
            <p className="w-36">Giờ</p>
            <input
              type="time"
              className=" bg-stone-200 w-5/6"
              name="Gio"
              value={formData.Gio}
              onChange={handleInputChange}
            />
          </div>
          <div></div>
        </form>
        <div className="flex justify-center gap-12">
          <Link to={`/schedule-view/${round}`}>
            <button className="mt-16 text-xl bg-gray-400 text-gray-100 w-40 h-10 hover:bg-gray-500">
              <div className="flex items-center justify-center">Trở lại</div>
            </button>
          </Link>

          <button
            onClick={handleSave}
            className="mt-16 text-xl bg-gray-400 text-gray-100 w-40 h-10 hover:bg-gray-500"
          >
            <div className="flex items-center justify-center">Lưu</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleEdit;
