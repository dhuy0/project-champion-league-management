import React from 'react'
import Nav from '../container/Nav'

const ResultRecord = () => {
    return (
        <div className='flex flex-row h-screen'>
            <div className='basis-1/5'>
                <Nav />
            </div>
            <div className='basis-4/5'>
                <header className='bg-gray-400 text-center py-4 font-bold text-white text-[3.175rem]'>
                    Đăng kí đội bóng
                </header>
                <div className='h-3/4 mx-10 mt-4 flex flex-col gap-4'>
                    <div className=' border-solid border-black border-2 px-8 py-4 gap-4 flex flex-col'>
                        <div className='text-xl flex flex-row justify-between'>
                            <div className='flex flex-row w-1/2'>
                                <p className='w-28'>STT</p>
                                <input type='text' className='bg-stone-200 flex-grow' />
                            </div>
                            <div className='flex flex-row gap-8 w-1/2 justify-between px-16'>
                                <p className=''>Vòng</p>
                                <select name="round" className='bg-stone-200 flex-grow'>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                </select>
                            </div>

                        </div>
                        <div className='text-xl flex flex-row justify-between'>
                            <div className='flex flex-row w-1/2'>
                                <p className='w-28'>Đội 1</p>
                                <input type='text' className='bg-stone-200 flex-grow' />
                            </div>
                            <div className='flex flex-row gap-8 w-1/2 justify-between px-16'>
                                <p>Tỷ số</p>
                                <input type='text' className='bg-stone-200 flex-grow' />
                            </div>

                        </div>
                        <div className='text-xl flex flex-row justify-between'>
                            <div className='flex flex-row w-1/2'>
                                <p className='w-28'>Đội 2</p>
                                <input type='text' className='bg-stone-200 flex-grow' />
                            </div>
                            <div className='flex flex-row gap-8 w-1/2 justify-between px-16'>
                                <p>Tỷ số</p>
                                <input type='text' className='bg-stone-200 flex-grow' />
                            </div>

                        </div>
                        <div className='text-xl flex flex-row justify-between pr-16'>
                            <p className='w-28'>Sân</p>
                            <input type='text' className='bg-stone-200 flex-grow' />
                        </div>
                        <div className='text-xl flex flex-row items-center justify-between pr-16'>
                            <div className='flex flex-row w-1/2 pr-16'>
                                <p className='w-28'>Ngày - Giờ</p>
                                <input type='text' className='bg-stone-200 flex-grow' />
                            </div>

                            <button className='text-xl bg-gray-400 text-gray-100 w-40 h-10 hover:bg-gray-500'>
                                <div className="flex items-center justify-center">
                                    Lưu
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className=' border-solid border-black border-2 py-4 px-8 flex flex-col gap-4'>
                        <div className='text-xl flex flex-row justify-between'>
                            <div className='flex flex-row w-1/2'>
                                <p className='w-28'>Cầu thủ</p>
                                <input type='text' className='bg-stone-200 flex-grow' />
                            </div>
                            <div className='flex flex-row gap-8 w-1/2 justify-between px-16'>
                                <p>Đội</p>
                                <input type='text' className='bg-stone-200 flex-grow' />
                            </div>

                        </div>
                        <div className='text-xl flex flex-row justify-between'>
                            <div className='flex flex-row w-1/2'>
                                <p className='w-48'>Loại bàn thắng</p>
                                <input type='text' className='bg-stone-200 flex-grow' />
                            </div>
                            <div className='flex flex-row gap-8 w-1/2 justify-between px-16'>
                                <p>Thời điểm</p>
                                <input type='text' className='bg-stone-200 flex-grow' />
                            </div>
                        </div>
                        <div className='flex flex-row justify-center'>
                            <button className='text-xl bg-gray-400 text-gray-100 w-40 h-10 hover:bg-gray-500'>
                                <div className="flex items-center justify-center">
                                    Lưu
                                </div>
                            </button>
                        </div>
                    </div>
                    <table className='w-full h-fit border-solid border-2 border-black'>
              <tr className='bg-gray-300'>
                <th className='font-bold'>STT</th>
                <th  className='font-bold'>Cầu thủ</th>
                <th  className='font-bold'>Đội</th>
                <th  className='font-bold'>Loại bàn thắng</th>
                <th  className='font-bold'>Thời điểm</th>
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
    )
}

export default ResultRecord
