import React from 'react'
import Nav from '../container/Nav'
import logo from '../assets/images/logo.jpg'

const Home = () => {
  return (
    <div className='flex flex-row h-screen'>
      <div style={{ flex: '0 0 310px' }}>
        <Nav/>
      </div>
      <div className="flex flex-1 relative flex-col justify-center min-w-[1400px] min-h-screen overflow-y-auto">
        <img className='w-full h-full blur-sm' src={logo}/>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-[120px] py-[70px] text-center italic bg-white font-sans font-bold rounded text-5xl shadow-dark border-solid border-black border-2'>
          Hệ thống quản lý giải <br></br> bóng đá vô địch quốc gia
        </div>
      </div>
    </div>
  )
}

export default Home
