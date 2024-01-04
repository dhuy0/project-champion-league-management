import React from 'react'
import axios from 'axios';
import Nav from '../container/Nav'
import { useState } from 'react';
import { toast } from 'react-toastify';

const RankingReport = () => {

    const [date, setDate] = useState('');
    const [rankingData, setRankingData] = useState([]);

    const validateForm = () => {
        if(!date) {
            toast.error("Ngày không được để trống")
            return false
        }
        return true
    }

    const handleSearch = () => {
        // Kiểm tra nếu date không rỗng mới gửi yêu cầu
        const isValid = validateForm()
        if (isValid) {
            axios.get(`http://localhost:8080/get-ranking-game-from-date/${encodeURIComponent(date)}`)
                .then(response => {
                    setRankingData(response.data);
                    toast.success("Tìm kiếm thành công")
                    console.log('>>> check ranking data: ', rankingData)
                })
                .catch(error => {
                    toast.error("Không tìm thấy dữ liệu")
                    setRankingData([])
                    console.error('Loi khi lay data tu server', error);
                });
        }
    };

    return (
        <div className='flex flex-row h-screen'>
            <div className='basis-1/5'>
                <Nav />
            </div>
            <div className='basis-4/5'>
                {/* ============================ Header ============================ */}
                <header className='bg-[#5C8374] text-center py-[18px] font-bold text-white text-[3.175rem]'>
                    Lập báo cáo giải
                </header>
                <div className='flex flex-col gap-4 mx-32 my-8 h-4/5'>
                    {/* ============================ Nhập ngày cần lập báo cáo ============================ */}
                    <div className='flex flex-row text-xl justify-center items-center gap-16'>
                        <p className=''>Ngày </p>
                        <input
                            type='date'
                            className='bg-stone-200'
                            value={date}
                            onChange={(e) => setDate(e.target.value)} />

                        <div className='flex justify-center'>
                            <button
                                className='text-xl bg-gray-400 text-gray-100 w-40 h-10 hover:bg-gray-500'
                                onClick={handleSearch}>
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
                        <a href='http://localhost:3000/report-scorer' className='bg-teal-700 flex items-center justify-center text-white w-1/2'>
                            Danh sách cầu thủ ghi bàn
                        </a>
                    </div>

                    <div className='h-3/4'>
                        <table className='w-full h-fit border-solid border-2 border-black'>
                            <thead className='bg-gray-300'>
                                <tr>
                                    <th className='font-bold'>STT</th>
                                    <th className='font-bold'>Đội</th>
                                    <th className='font-bold'>Thắng</th>
                                    <th className='font-bold'>Hòa</th>
                                    <th className='font-bold'>Thua</th>
                                    <th className='font-bold'>Hiệu số</th>
                                    <th className='font-bold'>Hạng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rankingData.map(team => (
                                    <tr key={team.MaDoiBong}>
                                        <td>{team.MaDoiBong}</td>
                                        <td>{team.TenDoiBong}</td>
                                        <td>{team.SoTranThang}</td>
                                        <td>{team.SoTranHoa}</td>
                                        <td>{team.SoTranThua}</td>
                                        <td>{team.HieuSo}</td>
                                        <td>{team.Hang}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default RankingReport
