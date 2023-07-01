import React from 'react'
import LoaderImg from '../../images/loader.svg'

export default function Loader() {
  return (
    <>
    <div className='flex py-10 justify-center my-40'>
      <img className='w-[120px]' src={LoaderImg} alt='loader'/>
    </div>
    </>
  )
}
