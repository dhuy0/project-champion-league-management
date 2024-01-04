import React, { useEffect } from "react";
import Nav from "../container/Nav";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const Search = () => {
  const [playerName, setPlayerName] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const validateForm = () => {
    if (!playerName) {
      toast.error("Tên cầu thủ không được để trống"); 
      return false;
    }
    return true;
  };

  useEffect(() => {
    console.log("check playerName: ", playerName)
  }, [playerName])

  const handleSearch = () => {
    // Kiểm tra nếu playerName không rỗng mới gửi yêu cầu
    const isValid = validateForm();
    console.log(searchResults);
    if (isValid) {
      
      axios
        .get(
          `http://localhost:8080/get-player-by-name/${encodeURIComponent(
            playerName
          )}`
        )
        .then((response) => {
          setSearchResults(response.data);
          
        })
        .catch((error) => {
          toast.error("Không tìm thấy cầu thủ này");
          setSearchResults([]);
          console.error("Error searching players", error);
        });
    } else {
      // Xử lý trường hợp playerName rỗng
      console.warn("Player name is empty");
    }
  };

  return (
    <div className="flex flex-row h-screen">
      <div className="basis-1/5">
        <Nav />
      </div>
      <div className="basis-4/5">
        <header className="bg-[#5C8374] text-center py-[18px] font-bold text-white text-[3.175rem]">
          Tra cứu thông tin cầu thủ
        </header>
        <div className="flex flex-col gap-4 mx-32 my-8 h-4/5 pr-">
          <div className="flex flex-row text-xl justify-between">
            <p className="w-1/5">Tên cầu thủ </p>
            <input
              type="text"
              className="bg-stone-200 w-4/5"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
            />
          </div>
          <div className="flex justify-center">
            <button
              className="mt-4 text-xl bg-gray-400 text-gray-100 w-40 h-10 hover:bg-gray-500"
              onClick={handleSearch}
            >
              <div className="flex items-center justify-center">Tra cứu</div>
            </button>
          </div>
          <div className="h-3/4">
            <table className="w-full h-fit border-solid border-2 border-black">
              <thead className="bg-gray-300">
                <tr>
                  <th className="font-bold">STT</th>
                  <th className="font-bold">Cầu thủ</th>
                  <th className="font-bold">Đội</th>
                  <th className="font-bold">Loại Cầu Thủ</th>
                  <th className="font-bold">Số Bàn Thắng</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((player) => (
                  <tr key={player.MaCauThu}>
                    <td>{player.MaCauThu}</td>
                    <td>{player.TenCauThu}</td>
                    <td>{player.TenDoiBong}</td>
                    <td>{player.LoaiCauThu}</td>
                    <td>{player.TongSoBanThang}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
