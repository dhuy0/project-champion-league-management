import React from 'react'
import Nav from '../container/Nav'
import { useState, useEffect } from 'react';



const RuleEdit = () => {

    const [formData, setFormData] = useState({
        minAge: '',
        maxAge: '',
        minPlayers: '',
        maxPlayers: '',
        maxForeignPlayers: '',
        goalTypes: '',
        maxGoalTime: '',
        winPoints: '',
        losePoints: '',
        drawPoints: '',
        rankingRule: '',
    });

    useEffect(() => {
        // Fetch initial data from the backend when the component mounts
        const fetchData = async () => {
          try {
            // Use your API endpoint URL
            // const apiUrl = 'YOUR_API_ENDPOINT_URL'; // Replace with your actual API URL
            // const response = await axios.get(apiUrl);
            
            const fakeData = {
                minAge: '18',
                maxAge: '35',
                minPlayers: '11',
                maxPlayers: '15',
                maxForeignPlayers: '3',
                goalTypes: 'Goal A, Goal B',
                maxGoalTime: '90',
                winPoints: '3',
                losePoints: '0',
                drawPoints: '1',
                rankingRule: 'Some ranking rule',
              };

              setFormData(fakeData)

            // If data is received from the backend, update the form data
            // if (response.data) {
            //   setFormData(response.data);
            // }
          } catch (error) {
            // Handle error
            console.error('Error fetching initial data:', error);
          }
        };
    
        fetchData();
      }, []); // The empty dependency array ensures that this effect runs only once when the component mounts
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Use your API endpoint URL
            // const apiUrl = 'YOUR_API_ENDPOINT_URL';
            // await axios.post(apiUrl, formData);

            // Add any additional logic after successful submission
            console.log('Form data sent successfully!');
            console.log(formData)
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
                                    type='text'
                                    className='pl-4 bg-stone-200 w-2/5'
                                    name='minAge'
                                    value={formData.minAge}
                                    onChange={handleChange} />
                            </div>
                            <div className='flex flex-row justify-end'>
                                <p className='w-24'>Tối đa</p>
                                <input
                                    type='text'
                                    className='pl-4 bg-stone-200 w-2/5'
                                    name='maxAge'
                                    value={formData.maxAge}
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
                                    type='text'
                                    className='pl-4 bg-stone-200 w-2/5'
                                    name='minPlayers'
                                    value={formData.minPlayers}
                                    onChange={handleChange} />
                            </div>
                            <div className='flex flex-row justify-end'>
                                <p className='w-24'>Tối đa</p>
                                <input
                                    type='text'
                                    className='pl-4 bg-stone-200 w-2/5'
                                    name='maxPlayers'
                                    value={formData.maxPlayers}
                                    onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-row'>
                        <div className='w-[474px]'>
                            Số ngoại binh tối đa của đội
                        </div>
                        <div className='flex flex-row gap-8 bg-pink-300'>
                            <input
                                type='text'
                                className='pl-4 bg-stone-200 w-32'
                                name='maxForeignPlayers'
                                value={formData.maxForeignPlayers}
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
                                name='goalTypes'
                                value={formData.goalTypes}
                                onChange={handleChange} />
                        </div>
                    </div>
                    <div className='flex flex-row'>
                        <div className='w-[474px]'>
                            Thời điểm ghi bàn tối đa
                        </div>
                        <div className='flex flex-row gap-8 flex-grow'>
                            <input
                                type='text'
                                className='pl-4 bg-stone-200 flex-grow'
                                name='maxGoalTime'
                                value={formData.maxGoalTime}
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
                                type='text'
                                className='pl-4 bg-stone-200 w-3/5'
                                name='winPoints'
                                value={formData.winPoints}
                                onChange={handleChange} />
                        </div>
                        <div className='flex flex-row gap-4 w-1/3'>
                            <p>Thua</p>
                            <input
                                type='text'
                                className='pl-4 bg-stone-200 w-3/5'
                                name='losePoints'
                                value={formData.losePoints}
                                onChange={handleChange} />
                        </div>
                        <div className='flex flex-row gap-4 w-1/3'>
                            <p>Hòa</p>
                            <input
                                type='text'
                                className='pl-4 bg-stone-200 w-3/5'
                                name='drawPoints'
                                value={formData.drawPoints}
                                onChange={handleChange} />
                        </div>
                    </div>
                    <div className='flex flex-row'>
                        <div className='w-[474px]'>
                            Quy tắc xếp hạng
                        </div>
                        <div className='flex flex-row gap-8 flex-grow'>
                            <input
                                type='text'
                                className='pl-4 bg-stone-200 flex-grow'
                                name='rankingRule'
                                value={formData.rankingRule}
                                onChange={handleChange} />
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
