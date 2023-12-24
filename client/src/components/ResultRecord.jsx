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
                    <div className='h-1/2 border-solid border-black border-2 px-8 py-4 gap-4 flex flex-col'>
                        <div className='text-xl flex flex-row '>
                            <div className='flex flex-row w-1/2 pr-16'>
                                <p className='w-28'>STT</p>
                                <input type='text' className='bg-stone-200 w-3/4' />
                            </div>
                            <div className='flex flex-row gap-8 w-1/2'>
                                <p className=''>Vòng</p>
                                <select name="round" className='bg-stone-200 w-3/4'>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                </select>
                            </div>

                        </div>
                        <div className='text-xl flex flex-row '>
                            <div className='flex flex-row w-2/3 pr-16'>
                                <p className='w-28'>Đội 1</p>
                                <input type='text' className='bg-stone-200 w-5/6' />
                            </div>
                            <div className='gap-8 ml-auto'>
                                <input type='text' className='bg-stone-200 w-3/4' />
                            </div>

                        </div>
                        <div className='text-xl flex flex-row'>
                            <div className='flex flex-row w-2/3 pr-16'>
                                <p className='w-28'>Đội 2</p>
                                <input type='text' className='bg-stone-200 w-5/6' />
                            </div>
                            <div className='gap-8 ml-auto'>
                                <input type='text' className='bg-stone-200 w-3/4' />
                            </div>

                        </div>
                        <div className='text-xl flex flex-row items-stretch mr-[55px]'>
                            <p className='w-28'>Sân</p>
                            <input type='text' className='bg-stone-200 w-3/4 flex-1' />
                        </div>
                        <div className='text-xl flex flex-row items-center'>
                            <div className='flex flex-row w-1/2 pr-16 '>
                                <p className='w-28'>Ngày - Giờ</p>
                                <input type='text' className='bg-stone-200 w-3/4' />
                            </div>
                            
                                <button className='mt-4 text-xl bg-gray-400 text-gray-100 w-40 h-10 hover:bg-gray-500'>
                                    <div className="flex items-center justify-center">
                                        Lưu
                                    </div>
                                </button>
                            


                        </div>
                    </div>
                    <div className='h-2/6 border-solid border-black border-2'>

                    </div>
                    <div className='h-2/6 border-solid border-black border-2'>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResultRecord
