import React from 'react'
import Nav from '../container/Nav'
import { useEffect, useState } from 'react'
import PlayerUpdate from '../container/PlayerUpdate'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios'


const TeamEdit = () => {

  const { teamId } = useParams();

  const [players, setPlayers] = useState([]);
  const [teamName, setTeamName] = useState('');
  const [stadium, setStadium] = useState('');
  let foreignPlayers = 0;
  const [teamData, setTeamData] = useState({})
  const [rules, setRules] = useState({
    // DoTuoi_Min: "",
    // DoTuoi_Max: "",
    // SoCauThu_Min: "",
    // SoCauThu_Max: "",
    // SoCauThuNuocNgoai_Max: "",
    // ThoiDiemGhiBan_Max: "",
    // DiemSoThang: "",
    // DiemSoThua: "",
  });



  const handlePlayerChange = (index, field, value) => {
    const updatedPlayers = [...players];

    if (field === 'NgaySinh') {
      const birthday = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - birthday.getFullYear();

      if (today.getMonth() < birthday.getMonth() || (today.getMonth() === birthday.getMonth() && today.getDate() < birthday.getDate())) {
        updatedPlayers[index] = { ...updatedPlayers[index], age: age - 1, [field]: value };
      } else {
        updatedPlayers[index] = { ...updatedPlayers[index], age, [field]: value };
      }
    } else {
      updatedPlayers[index] = { ...updatedPlayers[index], [field]: value };
    }

    setPlayers(updatedPlayers);
  };

  const handleDateInputBlur = (index) => {
    const updatedPlayers = [...players];
    updatedPlayers[index].isDateInputFocused = false;
    setPlayers(updatedPlayers);
  };

  const handleDateInputFocus = (index) => {
    const updatedPlayers = [...players];
    updatedPlayers[index].isDateInputFocused = true;
    setPlayers(updatedPlayers);
  };

  const handleDeletePlayer = (index) => {
    // Xử lý delete player
    const updatedPlayers = [...players];
    updatedPlayers.splice(index, 1);
    setPlayers(updatedPlayers);
    const idToDelete = players[index]["MaCauThu"]
    const dataToSend = {
      idToDelete,
      teamName
    }
    console.log(">>> check delete player: ", dataToSend)
    axios.post("http://localhost:8080/delete-player-team", {dataToSend})
    console.log('>> check updated player: ', updatedPlayers)
  };

  const handleAddPlayer = () => {
    const newPlayer = {
      CauThuMoi: 'true',
      MaCauThu: '',
      TenCauThu: '',
      LoaiCauThu: '',
      NgaySinh: '',
      GhiChu: '',
    };
    if (players.length + 1 <= rules[0]["SoCauThu_Max"]) {
      setPlayers([...players, newPlayer]);
    }
    else toast.error("Da dat so luong cau thu toi da")
  };

  const validateForm = () => {
    // Kiểm tra các trường input
    // if (!teamName) {
    //   toast.error("Ten doi bong khong duoc de trong");
    //   return false;
    // }

    // if (!stadium) {
    //   toast.error("San nha khong duoc de trong");
    //   return false;
    // }
    

    const usedNumbers = new Set();

    // Kiểm tra từng cầu thủ
    for (let i = 0; i < players.length; i++) {
      const player = players[i];

      if (!player.MaCauThu) {
        toast.error(`Cau thu so ${i + 1}: So thu tu bi trong`);
        return false;
      }

      if (usedNumbers.has(player.MaCauThu)) {
        toast.error(`Cau thu so ${i + 1}: So thu tu bi trung`);
        return false;
      }

      usedNumbers.add(player.MaCauThu);

      if (!player.TenCauThu) {
        toast.error(`Cau thu so ${i + 1}: Ten cau thu khong duoc de trong`);
        return false;
      }

      if (!player.LoaiCauThu) {
        toast.error(`Cau thu so ${i + 1}: Loai cau thu khong duoc de trong`);
        return false;
      }

      if (!player.NgaySinh) {
        toast.error(`Cau thu so ${i + 1}: Ngay sinh khong duoc de trong`);
        return false;
      }

      // if (!player.GhiChu) {
      //   toast.error(`Cau thu so ${i + 1}: Ghi chu khong duoc de trong`);
      //   return false;
      // }

      console.log(">>> check player foreign: ", player.LoaiCauThu)
      if (player.LoaiCauThu == "Nước ngoài") {
        foreignPlayers++;
        console.log("Check ", foreignPlayers)
      }

      if (foreignPlayers > rules[0]["SoCauThuNuocNgoai_Max"]) {
        toast.error(`So luong cau thu nuoc ngoai vuot qua quy dinh`);
        return false;
      }
    }

    // Nếu không có lỗi, trả về true
    
    return true;
  };

  const handleSave = async () => {
    // Logic to handle form submission
    const teamData = {
      teamId,
      teamName,
      stadium,
      players,
    };
    const isValid = validateForm()
    if (isValid) {
      const newPlayers = players.filter((player) => player.CauThuMoi);
      const updatedPlayers = players.filter((player) => !player.CauThuMoi);

      try {
        const dataToSend1 = {
          teamName,
          newPlayers
        }
        console.log(">>>> check new players: ", dataToSend1)
        await axios.post('http://localhost:8080/add-multi-player-to-team', {dataToSend1});
      } catch (error) {
        console.error('Error adding new players:', error);
        toast.error('Failed to add new players');
      }

      // Gửi dữ liệu lên API để cập nhật cầu thủ
      try {
        const dataToSend2 = {
          teamName,
          updatedPlayers
        }
        console.log(">>>> check updated players: ", dataToSend2)
        await axios.put('http://localhost:8080/update-multi-player-team', {dataToSend2});
        toast.success('Cap nhat cau thu thanh cong');
      } catch (error) {
        console.error('Error updating players:', error);
        toast.error('Failed to update players');
      }

    }
    // You can now send this data to your backend or perform other actions as needed.
  };

  // const handleDelete = () => {
  //   // axios.post('api', teamId)
  // }

  useEffect(() => {
    console.log(">>> check team data: ", teamData)
    if (teamData && teamData.length > 0) {
      setTeamName(teamData[0]["TenDoiBong"])
      setStadium(teamData[0]["SanNha"])
    }
  }, [teamData])

  useEffect(() => {
    console.log(">>>> check teamName: ", teamName)
  }, [teamName])

  useEffect(() => {
    console.log(">>>> check players: ", players)
  }, [players])


  useEffect(() => {
    // Simulate fetching team data from the backend
    const fetchTeamData = async () => {
      try {
        // Lấy các quy định
        const ruleResponse = await axios.get('http://localhost:8080/get-rule');
        setRules(ruleResponse.data);

        // Lấy tên đội bóng và sân đấu
        const teamResponse = await axios.get(`http://localhost:8080/get-team-by-id/${encodeURIComponent(teamId)}`);
        setTeamData(teamResponse.data);

        // Lấy danh sách các cầu thủ của đội bóng
        const playerResponse = await axios.get(`http://localhost:8080/get-player-by-team/${encodeURIComponent(teamResponse.data[0]["TenDoiBong"])}`);
        setPlayers(playerResponse.data);
      } catch (error) {
        console.error('Error fetching team data:', error);
      }
    };

    fetchTeamData();
  }, [teamId]);


  return (
    <div className='flex flex-row h-screen'>
      <div style={{ flex: '0 0 310px' }}>
        <Nav />
      </div>
      <div className='basis -4/5 min-w-[1500px] min-h-screen overflow-y-auto'>
        <header className='bg-gray-400 text-center py-4 font-bold text-white text-[3.175rem]'>
          Chỉnh sửa hồ sơ đội bóng
        </header>
        <form className='flex flex-col gap-4 mx-32 my-8 h-4/5 pr-40'>
          <div className='flex flex-row text-xl justify-between'>
            <p className='w-24'>Tên đội </p>
            <input type='text' value={teamName}
              className='bg-stone-200 w-5/6 pl-4' />
          </div>
          <div className='flex flex-row text-xl justify-between'>
            <p className='w-24'>Sân nhà</p>
            <input type='text' value={stadium}
              className='bg-stone-200 w-5/6 pl-4' />
          </div>
          <div className='text-xl bg-sky-200 text-center w-48 py-2 mt-2'>
            Danh sách cầu thủ
          </div>
          {players.map((player, index) => (
            <PlayerUpdate
              key={index}
              player={player}
              index={index}
              handleDeletePlayer={handleDeletePlayer}
              handlePlayerChange={handlePlayerChange}
              handleDateInputFocus={handleDateInputFocus}
              handleDateInputBlur={handleDateInputBlur}
            />
          ))}
          <div>
            <button type='button' className='mt-4 bg-white text-2xl rounded-full w-10 h-10 border-solid border-2 border-black'>
              <div onClick={handleAddPlayer} className="flex items-center justify-center">+</div>
            </button>
          </div>
          <div className='flex justify-center gap-32 pb-4'>
            <button type='button' className=' text-xl bg-gray-400 text-gray-100 w-40 h-10 hover:bg-gray-500'>
              <div onClick={handleSave} className="flex items-center justify-center">
                Lưu
              </div>
            </button>
            {/* <button onClick={handleDelete} type='button' className='text-xl bg-gray-400 text-gray-100 w-40 h-10 hover:bg-gray-500'>
              <div className="flex items-center justify-center">
                Xóa
              </div>
            </button> */}
          </div>
        </form>
      </div>
    </div>
  )
}

export default TeamEdit
