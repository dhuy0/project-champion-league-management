import React from 'react'
import { useState } from 'react'

const Nav = () => {
  const [selectedRow, setSelectedRow] = useState(null)

  const handleRowClick = (index) => {
    setSelectedRow(index)
  }

  const getRowClassName = (index) => {
    return `text-xl font-roboto text-center py-6 ${index === selectedRow ? 'bg-gray-400' : 'bg-gray-300'
      } pl-4 gap-4 flex flex-row border-b-2 border-black hover:bg-gray-400 cursor-pointer`;
  };

  return (
    <div className="grid grid-cols-1">
      <div className='flex flex-row items-center justify-center gap-4 text-2xl font-roboto text-center py-10 bg-gray-600 text-white font-bold'>
        <i class="ri-trophy-line"></i>
        <p>V - League</p>
      </div>

      <a href='http://localhost:3000/' className={getRowClassName(1)} onClick={() => handleRowClick(1)}>
        <i class="ri-home-2-line"></i>
        <p>Trang chủ</p>
      </a>

      <a href='http://localhost:3000/register' className={getRowClassName(2)} onClick={() => handleRowClick(2)}>
        <i class="ri-user-add-line"></i>
        <p>Đăng ký đội bóng</p>
      </a>

      <a href='http://localhost:3000/team-edit' className={getRowClassName(3)} onClick={() => handleRowClick(3)}>
        <p><i class="ri-edit-box-line"></i></p>
        Chỉnh sửa hồ sơ đội bóng
      </a>

      <a href='http://localhost:3000/player-search' className={getRowClassName(4)} onClick={() => handleRowClick(4)}>
        <i class="ri-menu-search-line"></i>
        <p>Tra cứu thông tin cầu thủ</p>
      </a>

      <a href='http://localhost:3000/schedule-edit' className={getRowClassName(5)} onClick={() => handleRowClick(5)}>
        <i class="ri-calendar-2-fill"></i>
        <p>Quản lý lịch thi đấu</p>
      </a>

      <a href='http://localhost:3000/result-record' className={getRowClassName(6)} onClick={() => handleRowClick(6)}>
        <i class="ri-flag-2-fill"></i>
        <p>Ghi nhận kết quả</p>
      </a>

      <div className={getRowClassName(7)} onClick={() => handleRowClick(7)}>
        <i class="ri-numbers-line"></i>
        <p>Lập báo cáo giải</p>
      </div>

      <div className={getRowClassName(8)} onClick={() => handleRowClick(8)}>
        <i class="ri-edit-2-line"></i>
        <p>Chỉnh sửa quy định</p>
      </div>
    </div>
  )
}

export default Nav
