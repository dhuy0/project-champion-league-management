import React from 'react'
import Nav from '../container/Nav'
import logo from '../assets/images/logo.jpg'

const Home = () => {
  return (
    <div className='flex flex-row h-screen'>
      <div className='basis-1/5'>
        <Nav/>
      </div>
      <div className='basis-4/5 relative'>
        <img className='w-full h-full blur-sm' src={logo}/>
        <div className='absolute px-[120px] py-[70px] top-1/3 left-[160px] text-center italic bg-white font-sans font-bold rounded text-5xl shadow-dark border-solid border-black border-2'>
          Hệ thống quản lý giải <br></br> bóng đá vô địch quốc gia
        </div>
      </div>
    </div>
  )
}

export default Home
