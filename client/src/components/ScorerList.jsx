import React from 'react'
import Nav from '../container/Nav'

const ScorerList = () => {
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
                    <div className='flex flex-row text-xl justify-center items-center gap-16'>
                        <p className=''>Ngày </p>
                        <input type='text' className='bg-stone-200' />
                        <div className='flex justify-center'>
                            <button className='text-xl bg-gray-400 text-gray-100 w-40 h-10 hover:bg-gray-500'>
                                <div className="flex items-center justify-center">
                                    Xác nhận
                                </div>
                            </button>
                        </div>
                    </div>

                    <div className='bg-blue-300 flex flex-row h-8 mx-16'>
                        <button className='bg-teal-400 w-1/2'>
                            Bảng xếp hạng
                        </button>
                        <button className='bg-teal-700 text-white w-1/2'>
                            Danh sách cầu thủ ghi bàn
                        </button>
                    </div>

                    <div className='h-3/4'>
                        <table className='w-full h-fit border-solid border-2 border-black'>
                            <tr className='bg-gray-300'>
                                <th className='font-bold'>STT</th>
                                <th className='font-bold'>Đội</th>
                                <th className='font-bold'>Loại cầu thủ</th>
                                <th className='font-bold'>Số bàn thắng</th>
                            </tr>
                            <tr>
                                <th>1</th>
                                <th>Nguyễn Văn A</th>
                                <th>DNA</th>
                                <th>Nội binh</th>
                            </tr>
                            <tr>
                                <th>1</th>
                                <th>Nguyễn Văn A</th>
                                <th>DNA</th>
                                <th>Nội binh</th>

                            </tr>
                            <tr>
                                <th>1</th>
                                <th>Nguyễn Văn A</th>
                                <th>DNA</th>
                                <th>Nội binh</th>

                            </tr>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ScorerList
