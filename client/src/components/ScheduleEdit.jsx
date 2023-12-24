import React from 'react'
import Nav from '../container/Nav'

const ScheduleEdit = () => {
  return (
    <div className='flex flex-row h-screen'>
      <div className='basis-1/5'>
        <Nav />
      </div>
      <div className='basis-4/5'>
        <header className='bg-gray-400 text-center py-4 font-bold text-white text-[3.175rem]'>
          Đăng kí đội bóng
        </header>
        <form className='flex flex-col gap-4 px-8 py-12 mx-32 mt-24 h-1/2 mx-56 border-solid border-2 border-black'>
        <div className='flex flex-row text-xl'>
            <p className='w-[138px]'>STT</p>
            <select name="playerType" className='bg-stone-200 w-2/6'>
              <option value="domestic">1</option>
              <option value="foreign">2</option>
            </select>
          </div>
          <div className='flex flex-row text-xl justify-between'>
            <p className='w-36'>Đội 1</p>
            <input type='text' className='bg-stone-200 w-5/6' />
          </div>
          <div className='flex flex-row text-xl justify-between'>
            <p className='w-36'>Đội 2</p>
            <input type='text' className=' bg-stone-200 w-5/6' />
          </div>
          <div className='flex flex-row text-xl justify-between'>
            <p className='w-36'>Sân</p>
            <input type='text' className=' bg-stone-200 w-5/6' />
          </div>
          <div className='flex flex-row text-xl justify-between'>
            <p className='w-36'>Ngày</p>
            <input type='text' className=' bg-stone-200 w-5/6' />
          </div>
          <div className='flex flex-row text-xl justify-between'>
            <p className='w-36'>Giờ</p>
            <input type='text' className=' bg-stone-200 w-5/6' />
          </div>
          <div>
          </div>
        </form>
        <div className='flex justify-center'>
            <button className='mt-16 text-xl bg-gray-400 text-gray-100 w-40 h-10 hover:bg-gray-500'>
              <div className="flex items-center justify-center">
                Lưu
              </div>
            </button>
          </div>
      </div>
    </div>
  )
}

export default ScheduleEdit
