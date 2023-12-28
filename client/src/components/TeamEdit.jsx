import React from 'react'
import Nav from '../container/Nav'
import { useEffect, useState } from 'react'
import Player from '../container/Player'
import { useParams } from 'react-router-dom'
import axios from 'axios'


const TeamEdit = () => {

  const { teamId } = useParams();

  const [players, setPlayers] = useState([]);
  const [teamName, setTeamName] = useState('');
  const [stadium, setStadium] = useState('');

  // const [players, setPlayers] = useState([
  //   { number: '1', name: 'Player 1', type: 'domestic', birthday: '01/01/1990', note: 'Note 1' },
  //   { number: '2', name: 'Player 2', type: 'foreign', birthday: '02/02/1991', note: 'Note 2' },
  //   // Add more players as needed
  // ]);

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
    setPlayers([...players, newPlayer]);
  };

  const handleSave = () => {
    // Logic to handle form submission
    const teamData = {
      teamId,
      teamName,
      stadium,
      players,
    };
    console.log('Team data to be saved:', teamData);
    // You can now send this data to your backend or perform other actions as needed.
  };

  const handleDelete = () => {
    console.log(teamId)
  }


  useEffect(() => {
    // Simulate fetching team data from the backend
    const fetchTeamData = async () => {
      try {
        // Hardcoded team data for testing (replace this with actual API call)
        const response = {
          teamName: 'Sample Team',
          stadium: 'Sample Stadium',
          players: [
            { number: '1', name: 'Player 1', type: 'domestic', birthday: '01/01/1990', note: 'Note 1' },
            { number: '2', name: 'Player 2', type: 'foreign', birthday: '02/02/1991', note: 'Note 2' },
            // Add more players as needed
          ],
        };

        setTeamName(response.teamName);
        setStadium(response.stadium);
        setPlayers(response.players);
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
            <input type='text' value={teamName} onChange={(event) => setTeamName(event.target.value)} 
            className='bg-stone-200 w-5/6 pl-4' />
          </div>
          <div className='flex flex-row text-xl justify-between'>
            <p className='w-24'>Sân nhà</p>
            <input type='text' value={stadium} onChange={(event) => setStadium(event.target.value)} 
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
