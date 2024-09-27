import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='w-full sticky bg-black   flex items-center justify-between  h-[70px] px-4'>
        <div>
            <h1 className='text-white text-2xl'>PratiFal</h1>
        </div>
        <div className='flex gap-5'>
        <Link className='bg-blue-600 py-3 px-5 rounded-lg text-[15px]' to='/ragister'>Get Started</Link>
        <Link className='bg-blue-600 py-3 px-5 rounded-lg text-[15px]' to='/ragister'>Login</Link>
        </div>
    </div>
  )
}

export default Navbar