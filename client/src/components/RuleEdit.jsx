import React from 'react'
import Nav from '../container/Nav'
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';


const RuleEdit = () => {

    const [formData, setFormData] = useState({});
    const [tempForm, setTempForm] = useState({});
    const [rankingOptions, setRankingOptions] = useState([
        'Diem',
        'HieuSo',
        'SoTranThang'
    ]);



    useEffect(() => {
        if (formData && formData.length > 0) {
            console.log('check form data: ', formData[0]["DiemSoThang"]);
            setTempForm({
                DiemSoHoa: formData[0]["DiemSoHoa"],
                DiemSoThang: formData[0]["DiemSoThang"],
                DiemSoThua: formData[0]["DiemSoThua"],
                DoTuoi_Max: formData[0]["DoTuoi_Max"],
                DoTuoi_Min: formData[0]["DoTuoi_Min"],
                SoCauThuNuocNgoai_Max: formData[0]["SoCauThuNuocNgoai_Max"],
                SoCauThu_Max: formData[0]["SoCauThu_Max"],
                SoCauThu_Min: formData[0]["SoCauThu_Min"],
                ThoiDiemGhiBan_Max: formData[0]["ThoiDiemGhiBan_Max"],
                CacLoaiBanThang: formData[0]["CacLoaiBanThang"],
                QuyTacXepHang: formData[0]["QuyTacXepHang"]
            })
            console.log(tempForm)
        }
    }, [formData])

    useEffect(() => {
        console.log(">>> check temp form: ", tempForm)
    }, [tempForm])

    const fetchData = async () => {
        try {
            // Use your API endpoint URL
            // const apiUrl = 'YOUR_API_ENDPOINT_URL'; // Replace with your actual API URL
            // const response = await axios.get(apiUrl);

            //Lấy dữ liệu từ server để xem các quy định đã được thiết lập chưa, nếu có thì hiển thị lên màn hình
            await axios.get('http://localhost:8080/get-rule').then(response => {
                setFormData(response.data)
            })

        } catch (error) {
            // Handle error
            console.error('Error fetching initial data:', error);
        }
    };

    useEffect(() => {
        // Fetch initial data from the backend when the component mounts
        fetchData();
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        var temp
        if (name == "CacLoaiBanThang" || name == "QuyTacXepHang") {
            setTempForm((prevData) => ({ ...prevData, [name]: value }));
        }
        else {
            temp = parseInt(value)
            setTempForm((prevData) => ({ ...prevData, [name]: temp }));
        }

    };

    const validateForm = () => {
        if (!tempForm.DoTuoi_Min || tempForm.DoTuoi_Min < 0) {
            console.log('form data: ', formData[0]["DoTuoi_Min"])
            toast.error("Do tuoi toi thieu khong hop le");
            return false
        }
        if (!tempForm.DoTuoi_Max || tempForm.DoTuoi_Max < 0) {
            toast.error("Do tuoi toi da khong hop le");
            return false
        }

        if (!tempForm.SoCauThu_Min || tempForm.SoCauThu_Min < 0) {
            console.log('check min players: ', tempForm.SoCauThu_Min)
            console.log('check min players: ', tempForm)
            toast.error("So cau thu toi thieu khong hop le");
            return false
        }
        if (!tempForm.SoCauThu_Max || tempForm.SoCauThu_Max < 0) {
            toast.error("So cau thu toi da khong hop le");
            return false
        }

        if (tempForm.DoTuoi_Min > tempForm.DoTuoi_Max || tempForm.SoCauThu_Min > tempForm.SoCauThu_Max) {
            console.log("check min max age: ", tempForm.DoTuoi_Min, " - ", tempForm.DoTuoi_Max)
            toast.error("Toi thieu phai nho hon toi da");
            return false
        }

        if (!tempForm.SoCauThuNuocNgoai_Max || tempForm.SoCauThuNuocNgoai_Max < 0) {
            toast.error("So cau thu nuoc ngoai toi da khong hop le");
            return false
        }
        // if (!formData.goalTypes) {
        //     toast.error("Loai ban thang bi trong");
        //     return false
        // }
        if (!tempForm.ThoiDiemGhiBan_Max || tempForm.ThoiDiemGhiBan_Max < 0) {
            toast.error("Thoi diem ghi ban toi da khong hop le");
            return false
        }
        if (!tempForm.DiemSoThang || tempForm.DiemSoThang < 0) {
            toast.error("Diem so khi thang khong hop le");
            return false
        }
        if (!tempForm.DiemSoHoa || tempForm.DiemSoHoa < 0) {
            toast.error("Diem so khi hoa khong hop le");
            return false
        }
        if (tempForm.DiemSoThua < 0) {
            console.log('>>> check lose point: ', tempForm.DiemSoThua)
            toast.error("Diem so khi thua khong hop le");
            return false
        }
        // if (!formData.rankingRule) {
        //     toast.error("Quy tac xep hang khong duoc de trong");
        //     return false
        // }
        //Điều kiện này phải để ở cuối
        if (tempForm.DiemSoThang > tempForm.DiemSoHoa && tempForm.DiemSoHoa > tempForm.DiemSoThua) {
            return true
        }
        else {
            toast.error("Quy tac tinh diem phai tuan thu: Diem thang > Diem hoa > Diem thua");
            return false
        }
        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Use your API endpoint URL
            // const apiUrl = 'YOUR_API_ENDPOINT_URL';
            // await axios.post(apiUrl, formData);
            const isValid = validateForm()

            if (isValid) {
                axios.put('http://localhost:8080/change-rule', tempForm)
                console.log('Form data sent successfully!');
                console.log(tempForm)
                toast.success("Them thanh cong!");
            }


        } catch (error) {
            // Handle error
            console.error('Error sending form data:', error);
        }
    };

    return (
        <div className='flex flex-row h-screen'>
            <div className='basis-1/5'>
                <Nav />
            </div>
            <div className='basis-4/5'>
                <header className='bg-gray-400 text-center py-4 font-bold text-white text-[3.175rem]'>
                    Chỉnh sửa quy định
                </header>
                <form className='flex flex-col gap-8 mx-32 my-8 h-4/5 text-xl' onSubmit={handleSubmit}>
                    <div className='flex flex-row justify-between'>
                        <div>
                            Độ tuổi cho phép của cầu thủ
                        </div>
                        <div className='flex flex-row gap-4 justify-end'>
                            <div className='flex flex-row justify-end'>
                                <p className='w-24'>Tối thiểu</p>
                                <input
                                    type='number'
                                    className='pl-4 bg-stone-200 w-2/5'
                                    name='DoTuoi_Min'
                                    value={tempForm.DoTuoi_Min}
                                    onChange={handleChange} />
                            </div>
                            <div className='flex flex-row justify-end'>
                                <p className='w-24'>Tối đa</p>
                                <input
                                    type='number'
                                    className='pl-4 bg-stone-200 w-2/5'
                                    name='DoTuoi_Max'
                                    value={tempForm.DoTuoi_Max}
                                    onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-row justify-between'>
                        <div>
                            Số cầu thủ cho phép
                        </div>
                        <div className='flex flex-row gap-4 justify-end'>
                            <div className='flex flex-row justify-end'>
                                <p className='w-24'>Tối thiểu</p>
                                <input
                                    type='number'
                                    className='pl-4 bg-stone-200 w-2/5'
                                    name='SoCauThu_Min'
                                    value={tempForm.SoCauThu_Min}
                                    onChange={handleChange} />
                            </div>
                            <div className='flex flex-row justify-end'>
                                <p className='w-24'>Tối đa</p>
                                <input
                                    type='number'
                                    className='pl-4 bg-stone-200 w-2/5'
                                    name='SoCauThu_Max'
                                    value={tempForm.SoCauThu_Max}
                                    onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-row'>
                        <div className='w-[474px]'>
                            Số cầu thủ nước ngoài tối đa của đội
                        </div>
                        <div className='flex flex-row gap-8 bg-pink-300'>
                            <input
                                type='number'
                                className='pl-4 bg-stone-200 w-32'
                                name='SoCauThuNuocNgoai_Max'
                                value={tempForm.SoCauThuNuocNgoai_Max}
                                onChange={handleChange} />
                        </div>
                    </div>
                    <div className='flex flex-row'>
                        <div className='w-[474px]'>
                            Các loại bàn thắng
                        </div>
                        <div className='flex flex-row gap-8 flex-grow'>
                            <input
                                type='text'
                                className='pl-4 bg-stone-200 flex-grow'
                                name='CacLoaiBanThang'
                                value={tempForm.CacLoaiBanThang}
                                onChange={handleChange} />
                        </div>
                    </div>
                    <div className='flex flex-row'>
                        <div className='w-[474px]'>
                            Thời điểm ghi bàn tối đa
                        </div>
                        <div className='flex flex-row gap-8 flex-grow'>
                            <input
                                type='number'
                                className='pl-4 bg-stone-200 flex-grow'
                                name='ThoiDiemGhiBan_Max'
                                value={tempForm.ThoiDiemGhiBan_Max}
                                onChange={handleChange} />
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
                            <input
                                type='number'
                                className='pl-4 bg-stone-200 w-3/5'
                                name='DiemSoThang'
                                value={tempForm.DiemSoThang}
                                onChange={handleChange} />
                        </div>
                        <div className='flex flex-row gap-4 w-1/3'>
                            <p>Thua</p>
                            <input
                                type='number'
                                className='pl-4 bg-stone-200 w-3/5'
                                name='DiemSoThua'
                                value={tempForm.DiemSoThua}
                                onChange={handleChange} />
                        </div>
                        <div className='flex flex-row gap-4 w-1/3'>
                            <p>Hòa</p>
                            <input
                                type='number'
                                className='pl-4 bg-stone-200 w-3/5'
                                name='DiemSoHoa'
                                value={tempForm.DiemSoHoa}
                                onChange={handleChange} />
                        </div>
                    </div>
                    <div className='flex flex-row'>
                        <div className='w-[474px]'>
                            Quy tắc xếp hạng
                        </div>
                        <div className='flex flex-row gap-8 flex-grow'>
                            <select
                                className='pl-4 bg-stone-200 flex-grow'
                                name='QuyTacXepHang'
                                value={tempForm.QuyTacXepHang}
                                onChange={handleChange}
                            >
                                {rankingOptions.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <button type='submit' className='mt-4 text-xl bg-gray-400 text-gray-100 w-40 h-10 hover:bg-gray-500'>
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
