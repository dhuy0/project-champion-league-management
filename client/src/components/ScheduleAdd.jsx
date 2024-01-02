import React from "react";
import Nav from "../container/Nav";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ScheduleAdd = () => {
  const navigate = useNavigate();

  const { round } = useParams();
  const [teamName, setTeamName] = useState([]);
  const [arrTeamName, setArrTeamName] = useState([]);
  const [playedTeam, setPlayedTeam] = useState([]);
  const [formData, setFormData] = useState({
    no: "",
    team1: "",
    team2: "",
    pitch: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    console.log(">> check team name: ", teamName);
    // console.log(arrTeamName);
  }, [teamName]);

  useEffect(() => {
    // Lấy dữ liệu như danh sách các đội bóng và danh sách các đọi bóng đã thi đấu trong vòng này
    const fetchTeamNames = async () => {
      try {
        // const response = await axios.get('your-api-endpoint-for-team-names');
        //setTeamNames(response.data); // Assuming the response is an array of team names
        // const testData = ['team1', 'team2', 'team3', 'team4']
        // const testPLayedTeam = ['team1', 'team2']
        // setTeamName(testData)
        // setPlayedTeam(testPLayedTeam)
        // Lấy danh sách các đội bóng trong cơ sở dữ liệu
        await axios
          .get("http://localhost:8080/get-name-team")
          .then((response) => {
            setTeamName(response.data);
            // for (var i = 0; i < teamName.length; i++) {
            //   arrTeamName.push(teamName[i].TenDoiBong);
            // }
          });

        //Lấy danh sách teen các đội bóng đã thi đấu trong vòng này
        await axios
          .get(
            `http://localhost:8080/get-name-team/${encodeURIComponent(round)}`
          )
          .then((response) => {
            setPlayedTeam(response.data);
          });
      } catch (error) {
        console.error("Error fetching team names:", error);
      }
    };

    fetchTeamNames();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.no) {
      toast.error("So thu tu khong duoc de trong");
      return false;
    }
    if (!formData.team1) {
      toast.error("Doi 1 khong duoc de trong");
      return false;
    }
    if (!formData.team2) {
      toast.error("Doi 1 khong duoc de trong");
      return false;
    }

    if (!teamName.some((team) => team.TenDoiBong === formData.team1)) {
      toast.error("Doi 2 khong co trong cow so du lieu");
      return false;
    }

    if (!teamName.some((team) => team.TenDoiBong === formData.team2)) {
      toast.error("Doi 2 khong co trong cow so du lieu");
      return false;
    }

    if (formData.team1 === formData.team2) {
      toast.error("Ten hai doi bong khong duoc trung");
      return false;
    }

    if (playedTeam.some((team) => team.TenDoi1 == formData.team1 || team.TenDoi2 == formData.team1)) {
      toast.error("Doi 1 da thi dau trong vong nay");
      return false;
    }

    if (playedTeam.some((team) => team.TenDoi1 == formData.team2 || team.TenDoi2 == formData.team2)) {
      toast.error("Doi 2 da thi dau trong vong nay");
      return false;
    }

    if (!formData.pitch) {
      toast.error("San dau khong duoc trong");
      return false;
    }

    if (!formData.date) {
      toast.error("Ngay thi dau khong duoc trong");
      return false;
    }
    if (!formData.time) {
      toast.error("Thoi gian khong duoc trong");
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    try {
      //Thêm round vào data gửi về
      const dataToSend = {
        round,
        ...formData,
      };

      //Gửi data về cho server
      const isValid = validateForm();
      if (isValid) {
        // axios.post("http://localhost:8080/add-schedule", dataToSend);
        console.log("Data saved successfully");
        console.log(dataToSend);
        toast.success("Them moi thanh cong");
        // navigate(`/schedule-view/${round}`);
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
            <input
              type="text"
              name="no"
              className="pl-4 bg-stone-200 w-2/6"
              value={formData.no}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-row text-xl justify-between">
            <p className="w-36">Đội 1</p>
            <input
              type="text"
              className="pl-4 bg-stone-200 w-5/6"
              name="team1"
              value={formData.team1}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-row text-xl justify-between">
            <p className="w-36">Đội 2</p>
            <input
              type="text"
              className="pl-4 bg-stone-200 w-5/6"
              name="team2"
              value={formData.team2}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-row text-xl justify-between">
            <p className="w-36">Sân</p>
            <input
              type="text"
              className="pl-4 bg-stone-200 w-5/6"
              name="pitch"
              value={formData.pitch}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-row text-xl justify-between">
            <p className="w-36">Ngày</p>
            <input
              type="date"
              className="pl-4 bg-stone-200 w-5/6"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-row text-xl justify-between">
            <p className="w-36">Giờ</p>
            <input
              type="time"
              className="pl-4 bg-stone-200 w-5/6"
              name="time"
              value={formData.time}
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

export default ScheduleAdd;
