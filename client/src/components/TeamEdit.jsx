import React from 'react'
import Nav from '../container/Nav'
import { useEffect, useState } from 'react'
import Player from '../container/Player'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios'


const TeamEdit = () => {

  const { teamId } = useParams();

  const [players, setPlayers] = useState([]);
  const [teamName, setTeamName] = useState('');
  const [stadium, setStadium] = useState('');
  const [maxPlayers, setMaxPlayers] = useState(-1);



  const handlePlayerChange = (index, field, value) => {
    // Logic to update the player data in the array
    const updatedPlayers = [...players];
    updatedPlayers[index] = { ...updatedPlayers[index], [field]: value };
    setPlayers(updatedPlayers);
  };

  const handleDeletePlayer = (index) => {
    // Logic to delete a player from the array
    const updatedPlayers = [...players];
    updatedPlayers.splice(index, 1);
    setPlayers(updatedPlayers);
    console.log('>> check updated player: ', updatedPlayers)
  };

  const handleAddPlayer = () => {
    const newPlayer = {
      number: '',
      name: '',
      type: '',
      birthday: '',
      note: '',
    };
    if (players.length + 1 <= maxPlayers) {
      setPlayers([...players, newPlayer]);
    }
    else toast.error("Da dat so luong cau thu toi da")
  };

  const validateForm = () => {
    // Kiểm tra các trường input
    if (!teamName) {
      toast.error("Ten doi bong khong duoc de trong");
      return false;
    }

    if (!stadium) {
      toast.error("San nha khong duoc de trong");
      return false;
    }

    const usedNumbers = new Set();

    // Kiểm tra từng cầu thủ
    for (let i = 0; i < players.length; i++) {
      const player = players[i];

      if (!player.number) {
        toast.error(`Cau thu so ${i + 1}: So thu tu bi trung`);
        return false;
      }

      if (usedNumbers.has(player.number)) {
        toast.error(`Cau thu so ${i + 1}: ten cau thu bi trung`);
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
    // Logic to handle form submission
    const teamData = {
      teamId,
      teamName,
      stadium,
      players,
    };
    const isValid = validateForm()
    if (isValid) {
      console.log('Team data to be saved:', teamData);
    }
    // You can now send this data to your backend or perform other actions as needed.
  };

  const handleDelete = () => {
    axios.post('api', teamId)
  }


  useEffect(() => {
    // Simulate fetching team data from the backend
    const fetchTeamData = async () => {
      try {
        // Lấy danh sách các đội bóng có trong cơ sở dữ liệu
        axios.get('api').then(response => {
          setTeamName(response.data)
        })
        //Lấy maxPLayer
        axios.get('api').then(response => {
          setMaxPlayers(response.data)
        })

        //Lấy tên đội bóng và sân đấu
        axios.get(`api/${encodeURIComponent(teamId)}`).then(response => {
          setTeamName(response.teamName);
          setStadium(response.stadium);
        })
        //Lấy danh sách các cầu thủ của đội bóng
        axios.get(`api/${encodeURIComponent(teamId)}`).then(response => {
          setPlayers(response.players);
        })

      } catch (error) {
        console.error('Error fetching team data:', error);
      }
    };

    fetchTeamData();
  }, [teamId]); // Include teamId in the dependency array

  return (
    <div className='flex flex-row h-screen'>
      <div className='basis-1/5'>
        <Nav />
      </div>
      <div className='basis-4/5'>
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
            <Player
              key={index}
              player={player}
              index={index}
              handleDeletePlayer={handleDeletePlayer}
              handlePlayerChange={handlePlayerChange}
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
            <button onClick={handleDelete} type='button' className='text-xl bg-gray-400 text-gray-100 w-40 h-10 hover:bg-gray-500'>
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
