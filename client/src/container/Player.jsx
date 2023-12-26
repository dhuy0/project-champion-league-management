import React from 'react'

const Player = ({ player, index, handleDeletePlayer, handlePlayerChange }) => {
    return (
        <div className='flex flex-col gap-4 border-b-2'>
            <div className='flex flex-row text-xl items-center'>
                <p className='w-[222px]'>Số thứ tự cầu thủ</p>
                <input
                    type='text'
                    className=' bg-stone-200 w-1/3 pl-4'
                    value={player.number}
                    onChange={(e) => handlePlayerChange(index, 'number', e.target.value)} />
                <button onClick={() => handleDeletePlayer(index)}
                    className='ml-64 bg-white text-2xl rounded-full w-10 h-10 border-solid border-2 border-black'>
                    <div className="flex items-center justify-center">-</div>
                </button>
            </div>
            <div className='flex flex-row text-xl justify-between'>
                <p className='w-64'>Tên cầu thủ</p>
                <input
                    type='text'
                    className=' bg-stone-200 w-5/6 pl-4'
                    value={player.name}
                    onChange={(e) => handlePlayerChange(index, 'name', e.target.value)} />
            </div>
            <div className='flex flex-row text-xl'>
                <p className='w-[222px]'>Loại cầu thủ</p>
                <select
                    name="playerType"
                    className='bg-stone-200 w-64 pl-4'
                    value={player.type}
                    onChange={(e) => handlePlayerChange(index, 'type', e.target.value)}>
                    <option value="domestic">Trong nước</option>
                    <option value="foreign">Nước ngoài</option>
                </select>
            </div>
            <div className='flex flex-row text-xl justify-between'>
                <p className='w-64'>Ngày sinh</p>
                <input
                    type='text'
                    className=' bg-stone-200 w-5/6 pl-4'
                    value={player.birthday}
                    onChange={(e) => handlePlayerChange(index, 'birthday', e.target.value)} />
            </div>
            <div className='flex flex-row text-xl justify-between pb-8'>
                <p className='w-64'>Ghi chú</p>
                <input
                    type='text'
                    className=' bg-stone-200 w-5/6 pl-4'
                    value={player.note}
                    onChange={(e) => handlePlayerChange(index, 'note', e.target.value)} />
            </div>
        </div>
    )
}

export default Player
