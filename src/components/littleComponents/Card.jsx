import React from 'react';
import del from '../../assets/delete.svg';
import star from '../../assets/Lightning.svg'
import edit from '../../assets/edit.svg';


const Card = () => {
  return (
    <div className='w-[275px] h-[180px] rounded-2xl bg-[#D9D9D9] flex flex-col px-[10px] py-[8px]'>
        <div className='w-full flex items-center justify-end gap-2'>
            <img className='w-[20px]' src={edit} alt="" />
            <img className='w-[25px]' src={del} alt="" />
            <img className='w-[17px]' src={star} alt="" />
        </div>
        <div></div>
        
    </div>
  )
}

export default Card