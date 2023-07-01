import React, { useEffect, useRef } from 'react'
import {FaSearch} from 'react-icons/fa'
import {useGlobalContext} from '../../context'
import { useNavigate } from 'react-router-dom';

export default function SearchForm() {
  const {setSearchTerm, setResultTitle} = useGlobalContext();
  const searchText = useRef('');
  const navigate = useNavigate();

  useEffect(() => searchText.current.focus(), []);
  const handleSubmit = (e) => {
    e.preventDefault();
    let tempSearchTerm = searchText.current.value.trim();
    if((tempSearchTerm.replace(/[^\w\s]/gi,"")).length === 0){
      setSearchTerm("the lost world");
      setResultTitle("PLEASE ENTER SOMETHING ...");
    } else {
      setSearchTerm(searchText.current.value);
    }

    navigate("/book");
  };

  return (
    <>
    <div className='md:grid grid-cols-5 gap-4 flex-auto h-12'>
      <div className='col-span-1' />
      <div className='col-span-3 bg-white rounded-full py-4 px-[5%]'>
        <form className='' onSubmit={handleSubmit}>
            <div className='flex space-x-[20%]'>
              <input type="text" ref={searchText} className='text-xl  focus:outline-none h-full w-[50%] ' placeholder='The Lost World ...' />
              <button type='submit' className='' onClick={handleSubmit}>
                <FaSearch size={32} className='text-pink-700 '/>
              </button>
            </div>
          </form>
      </div>
      <div className='col-span-1'/>
         
    </div>
    </>
  )
}
