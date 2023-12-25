import React from 'react'
import Nav 
from '../container/Nav'
const TeamEdit = () => {
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
          <div className='flex flex-row text-xl items-center'>
            <p className='w-[222px]'>Số thứ tự cầu thủ</p>
            <input type='text' className=' bg-stone-200 w-1/3' />
            <button className='ml-64 bg-white text-2xl rounded-full w-10 h-10 border-solid border-2 border-black'>
              <div className="flex items-center justify-center">-</div>
            </button>
          </div>
          <div className='flex flex-row text-xl justify-between'>
            <p className='w-64'>Tên cầu thủ</p>
            <input type='text' className=' bg-stone-200 w-5/6' />
          </div>
          <div className='flex flex-row text-xl'>
            <p className='w-[222px]'>Loại cầu thủ</p>
            <select name="playerType" className='bg-stone-200 w-64 pl-4'>
              <option value="domestic">Trong nước</option>
              <option value="foreign">Nước ngoài</option>
            </select>
          </div>
          <div className='flex flex-row text-xl justify-between'>
            <p className='w-64'>Ngày sinh</p>
            <input type='text' className=' bg-stone-200 w-5/6' />
          </div>
          <div className='flex flex-row text-xl justify-between'>
            <p className='w-64'>Ghi chú</p>
            <input type='text' className=' bg-stone-200 w-5/6' />
          </div>
          <div>
            <button className='mt-4 bg-white text-2xl rounded-full w-10 h-10 border-solid border-2 border-black'>
              <div className="flex items-center justify-center">+</div>
            </button>
          </div>
          <div className='flex justify-center gap-32'>
            <button className='mt-4 text-xl bg-gray-400 text-gray-100 w-40 h-10 hover:bg-gray-500'>
              <div className="flex items-center justify-center">
                Lưu
              </div>
            </button>
            <button className='mt-4 text-xl bg-gray-400 text-gray-100 w-40 h-10 hover:bg-gray-500'>
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