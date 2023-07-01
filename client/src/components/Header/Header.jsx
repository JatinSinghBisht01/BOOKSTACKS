import React from 'react'
import Navbar from '../Navbar/Navbar'
import SearchForm from '../SearchForm/SearchForm'

export default function Header() {
  return (
    <>
    <div>
      <div>
        {/* <Navbar/> */}
        <div className='text-center min-h-[100px] w-full bg-img h-fit  bg-center bg-cover bg-no-repeat ' >
          <div className='bg-col h-fit  p-[10%]'>
              <h1 className='text-4xl md:text-5xl font-bold text-white'>Find Your Book Of Choice</h1>
              <p className='text-lg  my-5 md:mx-[10%] text-gray-300'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                Quaerat, a voluptates distinctio deleniti error itaque ipsa placeat ut dolore laudantium fuga, alias ipsam ex laboriosam vel et iste odit inventore!</p>
                <SearchForm/>
          </div>
        </div>
      </div>
      

    </div>
    </>
  )
}
