import React from 'react'
import plus from '../../assets/Plus.svg'
const IconButton = ({text , icon}) => {
  return (
    <button
    className={`bg-black py-2 px-4 rounded-3xl text-[13px] font-light flex items-center tracking-wider justify-center text-white font-headlandOne transition-all duration-500 ease-in-out  hover:bg-[#58B9ED] hover:text-black gap-1`}
  >
    <span className='w-[11px] h-[10px] '>
        <img className='stroke-zinc-900' src={plus} alt="" />
    </span>
    {text}
  </button>
  )
}

export default IconButton