import React from 'react'
import Nav from '../container/Nav'

const SelectTeam = () => {
  return (
<div className='flex flex-row h-screen'>
      <div className='basis-1/5'>
        <Nav />
      </div>
      <div className='basis-4/5'>
        <header className='bg-gray-400 text-center py-4 font-bold text-white text-[3.175rem]'>
          Đăng kí đội bóng
        </header>
        <div className='flex flex-col justify-center items-center gap-20 text-2xl h-4/5'>
            <div className='mt-20 flex flex-row justify-center items-center gap-4 text-2xl'>
                <div>
                    Đội bóng
                </div>
                <select name="team" className='bg-stone-200 w-64'>
                <option value="domestic">Sông Lam Nghệ An</option>
                <option value="foreign">Đội bóng B</option>
                </select>
            </div>
            <button className='text-xl bg-gray-400 text-gray-100 w-40 h-10 hover:bg-gray-500'>
                <div className="flex items-center justify-center">
                    Xác nhận
                </div>
            </button>
        </div>

      </div>
    </div>
  )
}

export default SelectTeam
