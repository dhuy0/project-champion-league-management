import React from 'react'
import Nav from '../container/Nav'
import { useState } from 'react';

const ResultRecord = () => {

    const [matchData, setMatchData] = useState({
        no: '',
        round: '',
        team1: '',
        score1: '',
        team2: '',
        score2: '',
        pitch: '',
        dateAndTime: '',
    });

    const [scoreData, setScoreData] = useState({
        player: '',
        team: '',
        goalType: '',
        time: '',
    });

    const [scorerList, setScorerList] = useState([]);

    const handleMatchChange = (e) => {
        const { name, value } = e.target;
        setMatchData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleScoreChange = (e) => {
        const { name, value } = e.target;
        setScoreData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleMatchSave = async () => {
        try {
            // Use Axios to send section1Data to the server
            //   await Axios.post('your-api-endpoint', matchData);
            console.log('Section 1 data saved successfully');
            console.log(matchData)
        } catch (error) {
            console.error('Error saving match data:', error);
        }
    };

    const handleScoreSave = async () => {
        try {
            // Use Axios to send section2Data to the server
            //   await Axios.post('your-api-endpoint', scoreData);
            console.log('Section 2 data saved successfully');
            console.log(scoreData)

            setScorerList((prevList) => [
                ...prevList,
                { ...scoreData, index: prevList.length + 1 },
            ]);
        } catch (error) {
            console.error('Error saving score data:', error);
        }
    };

    return (
        <div className='flex flex-row h-screen'>
            <div className='basis-1/5'>
                <Nav />
            </div>
            <div className='basis-4/5'>
                <header className='bg-gray-400 text-center py-4 font-bold text-white text-[3.175rem]'>
                    Ghi nhận kết quả
                </header>
                <div className='h-3/4 mx-10 mt-4 flex flex-col gap-4'>
                    <div className=' border-solid border-black border-2 px-8 py-4 gap-4 flex flex-col'>
                        <div className='text-xl flex flex-row justify-between'>
                            <div className='flex flex-row w-1/2'>
                                <p className='w-28'>STT</p>
                                <input
                                    type='text'
                                    className='pl-4 bg-stone-200 flex-grow'
                                    name='no'
                                    value={matchData.no}
                                    onChange={handleMatchChange}
                                />
                            </div>
                            <div className='flex flex-row gap-8 w-1/2 justify-between px-16'>
                                <p className=''>Vòng</p>
                                <input
                                    type='text'
                                    name="round"
                                    className='pl-4 bg-stone-200 flex-grow'
                                    value={matchData.round}
                                    onChange={handleMatchChange} />
                            </div>

                        </div>
                        <div className='text-xl flex flex-row justify-between'>
                            <div className='flex flex-row w-1/2'>
                                <p className='w-28'>Đội 1</p>
                                <input
                                    type='text'
                                    className='pl-4 bg-stone-200 flex-grow'
                                    name='team1'
                                    value={matchData.team1}
                                    onChange={handleMatchChange} />
                            </div>
                            <div className='flex flex-row gap-8 w-1/2 justify-between px-16'>
                                <p>Tỷ số</p>
                                <input
                                    type='text'
                                    className='pl-4 bg-stone-200 flex-grow'
                                    name='score1'
                                    value={matchData.score1}
                                    onChange={handleMatchChange} />
                            </div>

                        </div>
                        <div className='text-xl flex flex-row justify-between'>
                            <div className='flex flex-row w-1/2'>
                                <p className='w-28'>Đội 2</p>
                                <input
                                    type='text'
                                    className='pl-4 bg-stone-200 flex-grow'
                                    name='team2'
                                    value={matchData.team2}
                                    onChange={handleMatchChange} />
                            </div>
                            <div className='flex flex-row gap-8 w-1/2 justify-between px-16'>
                                <p>Tỷ số</p>
                                <input
                                    type='text'
                                    className='pl-4 bg-stone-200 flex-grow'
                                    name='score2'
                                    value={matchData.score2}
                                    onChange={handleMatchChange} />
                            </div>

                        </div>
                        <div className='text-xl flex flex-row justify-between pr-16'>
                            <p className='w-28'>Sân</p>
                            <input
                                type='text'
                                className='pl-4 bg-stone-200 flex-grow'
                                name='pitch'
                                value={matchData.pitch}
                                onChange={handleMatchChange} />
                        </div>
                        <div className='text-xl flex flex-row items-center justify-between pr-16'>
                            <div className='flex flex-row w-1/2 pr-16'>
                                <p className='w-28'>Ngày - Giờ</p>
                                <input
                                    type='text'
                                    className='pl-4 bg-stone-200 flex-grow'
                                    name='dateAndTime'
                                    value={matchData.dateAndTime}
                                    onChange={handleMatchChange} />
                            </div>

                            <button onClick={handleMatchSave} className='text-xl bg-gray-400 text-gray-100 w-40 h-10 hover:bg-gray-500'>
                                <div className="flex items-center justify-center">
                                    Lưu
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className=' border-solid border-black border-2 py-4 px-8 flex flex-col gap-4'>
                        <div className='text-xl flex flex-row justify-between'>
                            <div className='flex flex-row w-1/2'>
                                <p className='w-28'>Cầu thủ</p>
                                <input
                                    type='text'
                                    className='pl-4 bg-stone-200 flex-grow'
                                    name='player'
                                    value={scoreData.player}
                                    onChange={handleScoreChange} />
                            </div>
                            <div className='flex flex-row gap-8 w-1/2 justify-between px-16'>
                                <p>Đội</p>
                                <input
                                    type='text'
                                    className='pl-4 bg-stone-200 flex-grow'
                                    name='team'
                                    value={scoreData.team}
                                    onChange={handleScoreChange} />
                            </div>

                        </div>
                        <div className='text-xl flex flex-row justify-between'>
                            <div className='flex flex-row w-1/2'>
                                <p className='w-48'>Loại bàn thắng</p>
                                <input
                                    type='text'
                                    className='pl-4 bg-stone-200 flex-grow'
                                    name='goalType'
                                    value={scoreData.goalType}
                                    onChange={handleScoreChange} />
                            </div>
                            <div className='flex flex-row gap-8 w-1/2 justify-between px-16'>
                                <p>Thời điểm</p>
                                <input
                                    type='text'
                                    className='pl-4 bg-stone-200 flex-grow'
                                    name='time'
                                    value={scoreData.time}
                                    onChange={handleScoreChange} />
                            </div>
                        </div>
                        <div className='flex flex-row justify-center'>
                            <button onClick={handleScoreSave} className='text-xl bg-gray-400 text-gray-100 w-40 h-10 hover:bg-gray-500'>
                                <div className="flex items-center justify-center">
                                    Lưu
                                </div>
                            </button>
                        </div>
                    </div>
                    <table className='w-full h-fit border-solid border-2 border-black'>
                        <thead>
                            <tr className='bg-gray-300'>
                                <th className='font-bold'>STT</th>
                                <th className='font-bold'>Cầu thủ</th>
                                <th className='font-bold'>Đội</th>
                                <th className='font-bold'>Loại bàn thắng</th>
                                <th className='font-bold'>Thời điểm</th>
                            </tr>
                        </thead>
                        <tbody>
                            {scorerList.map((scorer) => (
                                <tr key={scorer.index}>
                                    <td>{scorer.index}</td>
                                    <td>{scorer.player}</td>
                                    <td>{scorer.team}</td>
                                    <td>{scorer.goalType}</td>
                                    <td>{scorer.time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ResultRecord
