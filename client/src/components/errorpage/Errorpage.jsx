import React from 'react'
import error from "../../images/404.png"
export default function Errorpage() {
  return (
    <>
    <div className='text-center md:grid grid-cols-4 flex'>
        <div className='col-span-1' />
        <div className='col-span-2 m-2'><img src={error} className='w-full' alt='error-img' /></div>
        <div className='col-span-1' />
    </div>
    <div className='text-center'>
    <h4 className='text-3xl md:text-4xl font-bold text-slate-800 m-2'>WE ARE SORRY</h4>
    <p className='text-lg md:text-xl text-slate-500 mx-5'>
    The page you are looking for might have been removed 
            had its name changed or is temporarily unavailable.
    </p>
    </div>
    </>
  )
}
