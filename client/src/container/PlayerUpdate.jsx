import React from 'react'

const PlayerUpdate = ({ player, index, handleDeletePlayer, handlePlayerChange, handleDateInputBlur, handleDateInputFocus }) => {
    return (
        <div className='flex flex-col gap-4 border-b-2'>
            <div className='flex flex-row text-xl items-center'>
                <p className='w-[222px]'>Số thứ tự cầu thủ</p>
                <input
                    type='text'
                    className=' bg-stone-200 w-1/3 pl-4'
                    value={player.MaCauThu}
                    onChange={(e) => handlePlayerChange(index, 'MaCauThu', e.target.value)} />
                <button type='button' onClick={() => handleDeletePlayer(index)}
                    className='ml-64 bg-white text-2xl rounded-full w-10 h-10 border-solid border-2 border-black'>
                    <div className="flex items-center justify-center">-</div>
                </button>
            </div>
            <div className='flex flex-row text-xl justify-between'>
                <p className='w-64'>Tên cầu thủ</p>
                <input
                    type='text'
                    className=' bg-stone-200 w-5/6 pl-4'
                    value={player.TenCauThu}
                    onChange={(e) => handlePlayerChange(index, 'TenCauThu', e.target.value)} />
            </div>
            <div className='flex flex-row text-xl'>
                <p className='w-[222px]'>Loại cầu thủ</p>
                <select
                    name="playerType"
                    className='bg-stone-200 w-64 pl-4'
                    value={player.LoaiCauThu}
                    onChange={(e) => handlePlayerChange(index, 'LoaiCauThu', e.target.value)}>
                    <option value="" disabled>
                        Chọn loại cầu thủ
                    </option>
                    <option value="Trong nước">Trong nước</option>
                    <option value="Nước ngoài">Nước ngoài</option>
                </select>
            </div>
            <div className='flex flex-row text-xl justify-between'>
                <p className='w-64'>Ngày sinh</p>
                {player.isDateInputFocused ? (
                    <input
                        type='date'
                        className='bg-stone-200 w-5/6 pl-4'
                        value={player.NgaySinh}
                        onChange={(e) => handlePlayerChange(index, 'NgaySinh', e.target.value)}
                        onBlur={() => handleDateInputBlur(index)}
                        onFocus={() => handleDateInputFocus(index)}
                    />
                ) : (
                    <input
                        type='text'
                        className='bg-stone-200 w-5/6 pl-4'
                        value={new Date(player.NgaySinh).toLocaleDateString()}
                        onChange={(e) => handlePlayerChange(index, 'NgaySinh', e.target.value)}
                        onBlur={() => handleDateInputBlur(index)}
                        onFocus={() => handleDateInputFocus(index)}
                    />
                )}
            </div>
            <div className=' flex flex-row text-xl justify-between'>
                <p className='w-64'>Tuổi</p>
                <input
                    type='text'
                    className=' bg-stone-200 w-5/6 pl-4'
                    value={player.age}
                    onChange={(e) => handlePlayerChange(index, 'age', e.target.value)} />
            </div>
            <div className='flex flex-row text-xl justify-between pb-8'>
                <p className='w-64'>Ghi chú</p>
                <input
                    type='text'
                    className=' bg-stone-200 w-5/6 pl-4'
                    value={player.GhiChu}
                    onChange={(e) => handlePlayerChange(index, 'GhiChu', e.target.value)} />
            </div>
        </div>
    )
}

export default PlayerUpdate
