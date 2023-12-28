import React from 'react'
import Nav from '../container/Nav'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ScheduleAdd = () => {
    const navigate = useNavigate();

    const { round } = useParams();
    const [teamName, setTeamName] = useState([]);
    const [playedTeam, setPlayedTeam] = useState([]);
    const [formData, setFormData] = useState({
        no: '',
        team1: '',
        team2: '',
        pitch: '',
        date: '',
        time: '',
    });

    useEffect(() => {
        // Fetch the array of team names from the server when the component mounts
        const fetchTeamNames = async () => {
            try {
                // const response = await axios.get('your-api-endpoint-for-team-names');
                //setTeamNames(response.data); // Assuming the response is an array of team names
                const testData = ['team1', 'team2', 'team3', 'team4']
                const testPLayedTeam = ['team1', 'team2']
                setTeamName(testData)
                setPlayedTeam(testPLayedTeam)
            } catch (error) {
                console.error('Error fetching team names:', error);
            }
        };

        fetchTeamNames();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const validateForm = () => {
        if (!formData.no) {
            toast.error("Number is required");
            return false
        }
        if (!formData.team1) {
            toast.error("Team 1 is required");
            return false
        }
        if (!formData.team2) {
            toast.error("Team 2 is required");
            return false
        }

        if (!teamName.includes(formData.team1)) {
            toast.error("Team 1 is not in the database");
            return false
        }

        if (!teamName.includes(formData.team2)) {
            toast.error("Team 2 is not in the database");
            return false
        }

        if(formData.team1 === formData.team2) {
            toast.error("Two team must be different");
            return false
        }

        if (playedTeam.includes(formData.team1)) {
            toast.error("Team 1 is already played in this round");
            return false
        }

        if (playedTeam.includes(formData.team2)) {
            toast.error("Team 2 is already played in this round");
            return false
        }

        if (!formData.pitch) {
            toast.error("Stadium is required");
            return false
        }

        if (!formData.date) {
            toast.error("Date is required");
            return false
        }
        if (!formData.time) {
            toast.error("Time is required");
            return false
        }
        return true
    }

    const handleSave = async () => {
        try {
            // Combine round information with form data
            const dataToSend = {
                round,
                ...formData,
            };

            // Use Axios to send data to the server
            //   await axios.post('your-api-endpoint', dataToSend);
            const isValid = validateForm()
            if (isValid) {
                console.log('Data saved successfully');
                console.log(dataToSend);
                toast.success("Them moi thanh cong")
                navigate(`/schedule-view/${round}`);
            }


        } catch (error) {
            console.error('Error saving data:', error);
        }
    };


    return (
        <div className='flex flex-row h-screen'>
            <div className='basis-1/5'>
                <Nav />
            </div>
            <div className='basis-4/5'>
                <header className='bg-gray-400 text-center py-4 font-bold text-white text-[3.175rem]'>
                    Đăng kí đội bóng
                </header>
                <form className='flex flex-col gap-4 px-8 py-12 mx-32 mt-24 h-1/2 mx-56 border-solid border-2 border-black'>
                    <div className='flex flex-row text-xl'>
                        <p className='w-[138px]'>STT</p>
                        <input
                            type='text'
                            name="no"
                            className='pl-4 bg-stone-200 w-2/6'
                            value={formData.no}
                            onChange={handleInputChange} />
                    </div>
                    <div className='flex flex-row text-xl justify-between'>
                        <p className='w-36'>Đội 1</p>
                        <input
                            type='text'
                            className='pl-4 bg-stone-200 w-5/6'
                            name='team1'
                            value={formData.team1}
                            onChange={handleInputChange} />
                    </div>
                    <div className='flex flex-row text-xl justify-between'>
                        <p className='w-36'>Đội 2</p>
                        <input
                            type='text'
                            className='pl-4 bg-stone-200 w-5/6'
                            name='team2'
                            value={formData.team2}
                            onChange={handleInputChange} />
                    </div>
                    <div className='flex flex-row text-xl justify-between'>
                        <p className='w-36'>Sân</p>
                        <input
                            type='text'
                            className='pl-4 bg-stone-200 w-5/6'
                            name='pitch'
                            value={formData.pitch}
                            onChange={handleInputChange} />
                    </div>
                    <div className='flex flex-row text-xl justify-between'>
                        <p className='w-36'>Ngày</p>
                        <input
                            type='text'
                            className='pl-4 bg-stone-200 w-5/6'
                            name='date'
                            value={formData.date}
                            onChange={handleInputChange} />
                    </div>
                    <div className='flex flex-row text-xl justify-between'>
                        <p className='w-36'>Giờ</p>
                        <input
                            type='text'
                            className='pl-4 bg-stone-200 w-5/6'
                            name='time'
                            value={formData.time}
                            onChange={handleInputChange} />
                    </div>
                    <div>
                    </div>
                </form>
                <div className='flex justify-center gap-12'>
                    <Link to={`/schedule-view/${round}`}>
                        <button className='mt-16 text-xl bg-gray-400 text-gray-100 w-40 h-10 hover:bg-gray-500'>
                            <div className="flex items-center justify-center">
                                Trở lại
                            </div>
                        </button>
                    </Link>

                    <button
                        onClick={handleSave}
                        className='mt-16 text-xl bg-gray-400 text-gray-100 w-40 h-10 hover:bg-gray-500'
                    >
                        <div className="flex items-center justify-center">
                            Lưu
                        </div>
                    </button>

                </div>
            </div>
        </div>
    )
}

export default ScheduleAdd
