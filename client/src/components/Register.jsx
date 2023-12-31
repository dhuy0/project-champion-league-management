import React from "react";
import Nav from "../container/Nav";
import { useEffect, useState } from "react";
import axios from "axios";
import Player from '../container/Player'
import {  toast } from 'react-toastify';

const Register = () => {
  
  const [players, setPlayers] = useState([]);  //Khai báo mảng các cầu thủ
  const [teamName, setTeamName] = useState(''); //Khai báo tên đội
  const [stadium, setStadium] = useState('');// Khai báo sân đấu
  const [maxPlayers, setMaxPlayers] = useState(4); //Số lượng cầu thủ tối đa


  const handlePlayerChange = (index, field, value) => {
    // Update cầu thủ khi có thay đổi
    const updatedPlayers = [...players];
    updatedPlayers[index] = { ...updatedPlayers[index], [field]: value };
    setPlayers(updatedPlayers);
  };

  const handleDeletePlayer = (index) => {
    // LXóa một cầu thủ ra khỏi mảng cầu thủ
    const updatedPlayers = [...players];
    updatedPlayers.splice(index, 1);
    setPlayers(updatedPlayers);
    console.log('>> check updated player: ', updatedPlayers)
  };

  //Thêm một cầu thủ
  const handleAddPlayer = () => {
    const newPlayer = {
      number: '',
      name: '',
      type: '',
      birthday: '',
      note: '',
    };
    //Kiểm tra số lượng cầu thủ không được vượt quá số lượng cầu thủ tối đa cho phép
    if(players.length + 1 <= maxPlayers) {
      setPlayers([...players, newPlayer]);
    }
    else toast.error("Da dat so luong cau thu doi da")
    
  };

  //Kiểm tra các dữ liệu được nhập vào có hợp lệ không
  const validateForm = () => {
    // Kiểm tra các trường input
    if (!teamName) {
      toast.error("Ten doi khong duoc de trong");
      return false;
    }
    
    if (!stadium) {
      toast.error("San dau khong duoc de trong");
      return false;
    }

    //Kiểm tra các cầu thủ có bị trùng nhau không
    const usedNumbers = new Set(); 
  
    // Kiểm tra từng cầu thủ
    for (let i = 0; i < players.length; i++) {
      const player = players[i];
  
      if (!player.number) {
        toast.error(`Cau thu so ${i + 1}: So thu tu khong duoc de trong`);
        return false;
      }

      if (usedNumbers.has(player.number)) {
        toast.error(`Cau thu so ${i + 1}: So thu tu cau thu bi trung`);
        return false;
      }

      usedNumbers.add(player.number);
  
      if (!player.name) {
        toast.error(`Cau thu so ${i + 1}: Ten cau thu khong duoc de trong`);
        return false;
      }
  
      if (!player.type) {
        toast.error(`Cau thu so ${i + 1}: Loai cau thu khong duoc de trong`);
        return false;
      }
  
      if (!player.birthday) {
        toast.error(`Cau thu so ${i + 1}: Ngay sinh khong duoc de trong`);
        return false;
      }
  
      if (!player.note) {
        toast.error(`Cau thu so ${i + 1}: Ghi chu khong duoc de trong`);
        return false;
      }
    }
  
    // Nếu không có lỗi, trả về true
    return true;
  };

  const handleSave = () => {
    //Khi ấn lưu, kiểm tra điều kiện và gửi dữ liệu về server
    const teamData = {
      teamName,
      stadium,
      players,
    };
    const isValid = validateForm()
    if (isValid) {
      axios.post("api", teamData).then((response) => {
        console.log(response)
      })
      console.log('Team data to be saved:', teamData);
      toast.success("Dang ky doi bong thanh cong")
    }
  };


  return (
    <div className='flex flex-row h-screen'>
      <div style={{ flex: '0 0 310px' }}>
        <Nav />
      </div>
      <div className='basis -4/5 min-w-[1500px] min-h-screen overflow-hidden'>
        {/* ============================ Header ============================ */}
        <header className='bg-gray-400 text-center py-4 font-bold text-white text-[3.175rem]'>
          Đăng ký hồ sơ đội bóng
        </header>
        {/* ============================ Form đăng ký ============================ */}
        <form className='flex flex-col gap-4 mx-32 my-8 h-4/5 pr-40'>
          {/* ============================ Tên đội bóng ============================ */}
          <div className='flex flex-row text-xl justify-between'>
            <p className='w-24'>Tên đội </p>
            <input type='text' value={teamName} onChange={(event) => setTeamName(event.target.value)} 
            className='bg-stone-200 w-5/6 pl-4' />
          </div>
          {/* ============================ Sân nhà ============================ */}
          <div className='flex flex-row text-xl justify-between'>
            <p className='w-24'>Sân nhà</p>
            <input type='text' value={stadium} onChange={(event) => setStadium(event.target.value)} 
            className='bg-stone-200 w-5/6 pl-4' />
          </div>
          <div className='text-xl bg-sky-200 text-center w-48 py-2 mt-2'>
            Danh sách cầu thủ
          </div>
          {/* ============================ Đăng ký danh sách cầu thủ ============================ */}
          {players.map((player, index) => (
            <Player
              key={index}
              player={player}
              index={index}
              handleDeletePlayer={handleDeletePlayer}
              handlePlayerChange={handlePlayerChange}
            />
          ))}
          <div>
            {/* ============================ Thêm cầu thủ ============================ */}
            <button type='button' className='mt-4 bg-white text-2xl rounded-full w-10 h-10 border-solid border-2 border-black'>
              <div onClick={handleAddPlayer} className="flex items-center justify-center">+</div>
            </button>
          </div>
          <div className='flex justify-center gap-32 pb-4'>
            {/* ============================ Lưu thông tin ============================ */}
            <button type='button' className=' text-xl bg-gray-400 text-gray-100 w-40 h-10 hover:bg-gray-500'>
              <div onClick={handleSave} className="flex items-center justify-center">
                Lưu
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
};

export default Register;
