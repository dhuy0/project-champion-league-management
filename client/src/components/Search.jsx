import React from 'react'
import Nav from '../container/Nav'
import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-toastify';


const Search = () => {

  const [playerName, setPlayerName] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const validateForm = () => {
    if(!playerName) {
      toast.error("Ten cau thu khong duoc de trong")
      return false
    }
    return true
  }

  const handleSearch = () => {
    // Kiểm tra nếu playerName không rỗng mới gửi yêu cầu
    const isValid = validateForm()
    if (isValid) {
      axios.get(`http://localhost:8080/get-by-name/${encodeURIComponent(playerName)}`)
        .then(response => {
          setSearchResults(response.data);
        })
        .catch(error => {
          console.error('Error searching players', error);
        });
    } else {
      // Xử lý trường hợp playerName rỗng
      console.warn('Player name is empty');
    }
  };

  return (
    <div className='flex flex-row h-screen'>
      <div style={{ flex: '0 0 310px' }}>
        <Nav />
      </div>
      <div className='basis -4/5 min-w-[1500px] min-h-screen overflow-hidden'>
        <header className='bg-gray-400 text-center py-4 font-bold text-white text-[3.175rem]'>
          Tra cứu thông tin cầu thủ
        </header>
        <div className='flex flex-col gap-4 mx-32 my-8 h-4/5 pr-'>
          <div className='flex flex-row text-xl justify-between'>
            <p className='w-1/5'>Tên cầu thủ </p>
            <input
              type='text'
              className='bg-stone-200 w-4/5'
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)} />
          </div>
          <div className='flex justify-center'>
            <button
              className='mt-4 text-xl bg-gray-400 text-gray-100 w-40 h-10 hover:bg-gray-500'
              onClick={handleSearch}>
              <div className="flex items-center justify-center">
                Tra cứu
              </div>
            </button>
          </div>
          <div className='h-3/4'>
            <table className='w-full h-fit border-solid border-2 border-black'>
              <thead className='bg-gray-300'>
                <tr>
                  <th className='font-bold'>ID</th>
                  <th className='font-bold'>Tên cầu thủ</th>
                  <th className='font-bold'>Loại</th>
                  <th className='font-bold'>Ngày sinh</th>
                  <th className='font-bold'>Ghi chú</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map(player => (
                  <tr key={player.id}>
                    <td>{player.id}</td>
                    <td>{player.hoten}</td>
                    <td>{player.loai}</td>
                    <td>{player.ngaysinh}</td>
                    <td>{player.ghichu}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Search
