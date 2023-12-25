import React from 'react'
import Nav from '../container/Nav'
import { useEffect, useState } from 'react'

const Register = () => {
  const handleRegister = (event) => {
    event.preventDefault();
    
    let teamData = [teamName, stadium, playerNumber, playerName, birthday, note]
    console.log(">>>>> check team data ", teamData)
  }

  const [teamName, setTeamName] = useState("");
  const [stadium, setStadium] = useState("");
  const [playerNumber, setPlayerNumber] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [playerType, setPlayerType] = useState("");
  const [birthday, setBirthday] = useState("")
  const [note, setNote] = useState("");

  return (
    <div className='flex flex-row h-screen'>
      <div className='basis-1/5'>
        <Nav />
      </div>
      <div className='basis-4/5'>
        <header
          className='bg-gray-400 text-center py-4 font-bold text-white text-[3.175rem]'>
          Đăng kí đội bóng
        </header>
        {/* Form đăng ký đội bóng */}
        <form className='flex flex-col gap-4 mx-32 my-8 h-4/5 pr-40'>
          {/* Nhập tên đội */}
          <div className='flex flex-row text-xl justify-between'>
            <p className='w-24'>Tên đội </p>
            <input type='text' value={teamName} onChange={(event) => setTeamName(event.target.value)}
              className='bg-stone-200 w-5/6' />
          </div>
          {/* Nhập sân nhà */}
          <div className='flex flex-row text-xl justify-between'>
            <p className='w-24'>Sân nhà</p>
            <input type='text' value={stadium} onChange={(event) => setStadium(event.target.value)} 
            className='bg-stone-200 w-5/6' />
          </div>
          {/* Nhập danh sách các cầu thủ */}
          <div className='text-xl bg-sky-200 text-center w-48 py-2 mt-2'>
            Danh sách cầu thủ
          </div>
          {/* Nhập số thứ tự cầu thủ */}
          <div className='flex flex-row text-xl justify-between'>
            <p className='w-64'>Số thứ tự cầu thủ</p>
            <input type='text' value={playerNumber} onChange={(event) => setPlayerNumber(event.target.value)} 
            className=' bg-stone-200 w-5/6' />
          </div>
          {/* Nhập tên cầu thủ */}
          <div className='flex flex-row text-xl justify-between'>
            <p className='w-64'>Tên cầu thủ</p>
            <input type='text' value={playerName} onChange={(event) => setPlayerName(event.target.value)} 
            className=' bg-stone-200 w-5/6' />
          </div>
          {/* Nhập loại cầu thủ */}
          <div className='flex flex-row text-xl'>
            <p className='w-[222px]'>Loại cầu thủ</p>
            <select name="playerType" className='bg-stone-200 w-2/6'>
              <option value="domestic">Trong nước</option>
              <option value="foreign">Nước ngoài</option>
            </select>
          </div>
          {/* Nhập ngày sinh cho cầu thủ */}
          <div className='flex flex-row text-xl justify-between'>
            <p className='w-64'>Ngày sinh</p>
            <input type='text' value={birthday} onChange={(event) => setBirthday(event.target.value)} 
            className=' bg-stone-200 w-5/6' />
          </div>
          {/* Nhập ghi chú */}
          <div className='flex flex-row text-xl justify-between'>
            <p className='w-64'>Ghi chú</p>
            <input type='text' value={note} onChange={(event) => setNote(event.target.value)} 
            className=' bg-stone-200 w-5/6' />
          </div>
          <div>
            <button className='mt-4 bg-white text-2xl rounded-full w-10 h-10 border-solid border-2 border-black'>
              <div className="flex items-center justify-center">+</div>
            </button>
          </div>
          <div className='flex justify-center'>
            <button onClick={(event) => handleRegister(event)} className='mt-4 text-xl bg-gray-400 text-gray-100 w-40 h-10 hover:bg-gray-500'>
              <div className="flex items-center justify-center">
                Lưu
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register