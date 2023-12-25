import React from 'react'
import Nav from '../container/Nav'
import { useEffect, useState } from 'react'
import Player from '../container/Player'

const TeamEdit = () => {
  const [players, setPlayers] = useState([
    { number: '1', name: 'Player 1', type: 'domestic', birthday: '01/01/1990', note: 'Note 1' },
    { number: '2', name: 'Player 2', type: 'foreign', birthday: '02/02/1991', note: 'Note 2' },
    // Add more players as needed
  ]);

  const handleDeletePlayer = (index) => {
    // Logic to delete a player from the array
    const updatedPlayers = [...players];
    updatedPlayers.splice(index, 1);
    setPlayers(updatedPlayers);
  };

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
        <header className='bg-gray-400 text-center py-4 font-bold text-white text-[3.175rem]'>
          Đăng kí đội bóng
        </header>
        <form className='flex flex-col gap-4 mx-32 my-8 h-4/5 pr-40'>
          <div className='flex flex-row text-xl justify-between'>
            <p className='w-24'>Tên đội </p>
            <input type='text' className='bg-stone-200 w-5/6' />
          </div>
          <div className='flex flex-row text-xl justify-between'>
            <p className='w-24'>Sân nhà</p>
            <input type='text' className='bg-stone-200 w-5/6' />
          </div>
          <div className='text-xl bg-sky-200 text-center w-48 py-2 mt-2'>
            Danh sách cầu thủ
          </div>
          {players.map((player, index) => (
            <Player
              key={index}
              player={player}
              index={index}
              handleDeletePlayer={handleDeletePlayer}
            />
          ))}
          <div>
            <button className='mt-4 bg-white text-2xl rounded-full w-10 h-10 border-solid border-2 border-black'>
              <div className="flex items-center justify-center">+</div>
            </button>
          </div>
          <div className='flex justify-center gap-32 pb-4'>
            <button className=' text-xl bg-gray-400 text-gray-100 w-40 h-10 hover:bg-gray-500'>
              <div className="flex items-center justify-center">
                Lưu
              </div>
            </button>
            <button className='text-xl bg-gray-400 text-gray-100 w-40 h-10 hover:bg-gray-500'>
              <div className="flex items-center justify-center">
                Xóa
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TeamEdit
