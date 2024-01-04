import React from 'react'
import Nav from '../container/Nav'
import { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

const ScorerList = () => {

    const [date, setDate] = useState('');
    const [scorers, setScorers] = useState([]);

    const validateForm = () => {
        if(!date) {
            toast.error("Không được để trống ngày") 
            return false
        }
        return true
    }


    const handleSearch = () => {
        // Kiểm tra nếu date không rỗng mới gửi yêu cầu
        console.log("getting data from ", date)
        const isValid = validateForm()
        if (isValid) {
            
            axios.get(`http://localhost:8080/get-scorer-by-date/${encodeURIComponent(date)}`)
                .then(response => {
                    setScorers(response.data);
                    console.log("get data successfully")
                })
                .catch(error => {
                    toast.error("Không tìm thấy dữ liệu")
                    setScorers([])
                    console.error('Loi khi lay data tu server', error);
                });
        } 
        console.log(scorers)
    };

    return (
        <div className='flex flex-row h-screen'>
            <div className='basis-1/5'>
                <Nav />
            </div>
            <div className='basis-4/5'>
                <header className='bg-[#5C8374] text-center py-[18px] font-bold text-white text-[3.175rem]'>
                    Tra cứu thông tin cầu thủ
                </header>
                <div className='flex flex-col gap-4 mx-32 my-8 h-4/5'>
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
                        <a
                            href='http://localhost:3000/report-ranking'
                            className='bg-teal-400 flex items-center justify-center w-1/2'>
                            Bảng xếp hạng
                        </a>
                        <button className='bg-teal-700 text-white w-1/2'>
                            Danh sách cầu thủ ghi bàn
                        </button>
                    </div>

                    <div className='h-3/4'>
                        <table className='w-full h-fit border-solid border-2 border-black'>
                            <thead className='bg-gray-300'>
                                <tr>
                                    <th className='font-bold'>STT</th>
                                    <th className='font-bold'>Cầu thủ</th>
                                    <th className='font-bold w-40'>Đội</th>
                                    <th className='font-bold'>Loại cầu thủ</th>
                                    <th className='font-bold'>Số bàn thắng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {scorers.map((scorer, index) => (
                                    <tr key={index}>
                                        <td>{scorer.MaCauThu}</td>
                                        <td>{scorer.TenCauThu}</td>
                                        <td>{scorer.TenDoiBong}</td>
                                        <td>{scorer.LoaiCauThu}</td>
                                        <td>{scorer.SoBanThang}</td>
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

export default ScorerList
