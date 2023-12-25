import React from 'react'
import Nav from '../container/Nav'


const RuleEdit = () => {
    return (
        <div className='flex flex-row h-screen'>
            <div className='basis-1/5'>
                <Nav />
            </div>
            <div className='basis-4/5'>
                <header className='bg-gray-400 text-center py-4 font-bold text-white text-[3.175rem]'>
                    Đăng kí đội bóng
                </header>
                <form className='flex flex-col gap-8 mx-32 my-8 h-4/5 text-xl'>
                    <div className='flex flex-row justify-between'>
                        <div>
                            Độ tuổi cho phép của cầu thủ
                        </div>
                        <div className='flex flex-row gap-8 justify-end'>
                            <div className='flex flex-row justify-end'>
                                <p className='w-24'>Tối thiểu</p>
                                <input type='text' className='bg-stone-200 w-2/5' />
                            </div>
                            <div className='flex flex-row justify-end'>
                                <p className='w-24'>Tối đa</p>
                                <input type='text' className='bg-stone-200 w-2/5' />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-row justify-between'>
                        <div>
                            Số cầu thủ cho phép
                        </div>
                        <div className='flex flex-row gap-8 justify-end'>
                            <div className='flex flex-row justify-end'>
                                <p className='w-24'>Tối thiểu</p>
                                <input type='text' className='bg-stone-200 w-2/5' />
                            </div>
                            <div className='flex flex-row justify-end'>
                                <p className='w-24'>Tối đa</p>
                                <input type='text' className='bg-stone-200 w-2/5' />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-row'>
                        <div className='w-[474px]'>
                            Số ngoại binh tối đa của đội
                        </div>
                        <div className='flex flex-row gap-8 bg-pink-300'>
                            <input type='text' className='bg-stone-200 w-32' />
                        </div>
                    </div>
                    <div className='flex flex-row'>
                        <div className='w-[474px]'>
                            Các loại bàn thắng
                        </div>
                        <div className='flex flex-row gap-8 flex-grow'>
                            <input type='text' className='bg-stone-200 flex-grow' />
                        </div>
                    </div>
                    <div className='flex flex-row'>
                        <div className='w-[474px]'>
                            Thời điểm ghi bàn tối đa
                        </div>
                        <div className='flex flex-row gap-8 flex-grow'>
                            <input type='text' className='bg-stone-200 flex-grow' />
                        </div>
                    </div>
                    <div className='flex flex-row'>
                        <div className='w-[474px]'>
                            Quy tắc tính điểm
                        </div>
                    </div>
                    <div className='flex flex-row justify-between px-12 gap-4'>
                        <div className='flex flex-row gap-4 w-1/3'>
                            <p>Thắng</p>
                            <input type='text' className='bg-stone-200 w-3/5' />
                        </div>
                        <div className='flex flex-row gap-4 w-1/3'>
                            <p>Thua</p>
                            <input type='text' className='bg-stone-200 w-3/5' />
                        </div>
                        <div className='flex flex-row gap-4 w-1/3'>
                            <p>Hòa</p>
                            <input type='text' className='bg-stone-200 w-3/5' />
                        </div>
                    </div>
                    <div className='flex flex-row'>
                        <div className='w-[474px]'>
                            Quy tắc xếp hạng
                        </div>
                        <div className='flex flex-row gap-8 flex-grow'>
                            <input type='text' className='bg-stone-200 flex-grow' />
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <button className='mt-4 text-xl bg-gray-400 text-gray-100 w-40 h-10 hover:bg-gray-500'>
                            <div className="flex items-center justify-center">
                                Lưu
                            </div>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RuleEdit
