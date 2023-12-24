import React from 'react'
import Nav from '../container/Nav'

const ScheduleView = () => {
    return (
        <div className='flex flex-row h-screen'>
            <div className='basis-1/5'>
                <Nav />
            </div>
            <div className='basis-4/5'>
                <header className='bg-gray-400 text-center py-4 font-bold text-white text-[3.175rem]'>
                    Tra cứu thông tin cầu thủ
                </header>
                <div className='flex flex-col gap-4 mx-32 my-8 h-4/5'>
                    <div className='flex flex-row text-xl justify-center'>
                        <p className='w-1/6'>Vòng</p>
                        <select name="playerType" className='bg-stone-200 w-1/3'>
                            <option value="domestic">Vòng 1</option>
                            <option value="foreign">Vòng 2</option>
                        </select>
                    </div>
                    <div className='flex justify-center text-xl mt-8'>
                        Lịch thi đấu đã lưu
                    </div>
                    <div className='h-3/5'>
                        <table className='w-full h-fit border-solid border-2 border-black'>
                            <tr className='bg-gray-300'>
                                <th className='font-bold'>STT</th>
                                <th className='font-bold'>Đội 1</th>
                                <th className='font-bold'>Đội 2</th>
                                <th className='font-bold'>Ngày - Giờ</th>
                                <th className='font-bold'>Sân</th>
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
                    <div className='flex justify-center gap-32'>
                        <button className='mt-4 text-xl bg-gray-400 text-gray-100 w-40 h-10 hover:bg-gray-500'>
                            <div className="flex items-center justify-center">
                                Chỉnh sửa
                            </div>
                        </button>
                        <button className='mt-4 text-xl bg-gray-400 text-gray-100 w-40 h-10 hover:bg-gray-500'>
                            <div className="flex items-center justify-center">
                                Thêm mới
                            </div>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ScheduleView
