import React from 'react'
import Nav from '../container/Nav'

const Search = () => {
  return (
    <div className='flex flex-row h-screen'>
      <div className='basis-1/5'>
        <Nav />
      </div>
      <div className='basis-4/5'>
        <header className='bg-gray-400 text-center py-4 font-bold text-white text-[3.175rem]'>
          Tra cứu thông tin cầu thủ
        </header>
        <div className='flex flex-col gap-4 mx-32 my-8 h-4/5 pr-'>
          <div className='flex flex-row text-xl justify-between'>
            <p className='w-1/5'>Tên cầu thủ </p>
            <input type='text' className='bg-stone-200 w-4/5' />
          </div>
          <div className='flex justify-center'>
            <button className='mt-4 text-xl bg-gray-400 text-gray-100 w-40 h-10 hover:bg-gray-500'>
              <div className="flex items-center justify-center">
                Tra cứu
              </div>
            </button>
          </div>
          <div className='h-3/4'>
            <table className='w-full h-fit border-solid border-2 border-black'>
              <tr className='bg-gray-300'>
                <th className='font-bold'>STT</th>
                <th  className='font-bold'>Cầu thủ</th>
                <th  className='font-bold'>Đội</th>
                <th  className='font-bold'>Loại cầu thủ</th>
                <th  className='font-bold'>Tổng số bàn thắng</th>
              </tr>
              <tr>
                <th>1</th>
                <th>Nguyễn Văn A</th>
                <th>DNA</th>
                <th>Nội binh</th>
                <th>4</th>
              </tr>
              <tr>
                <th>1</th>
                <th>Nguyễn Văn A</th>
                <th>DNA</th>
                <th>Nội binh</th>
                <th>4</th>
              </tr>
              <tr>
                <th>1</th>
                <th>Nguyễn Văn A</th>
                <th>DNA</th>
                <th>Nội binh</th>
                <th>4</th>
              </tr>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Search
