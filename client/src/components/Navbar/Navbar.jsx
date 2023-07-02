import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineMenuAlt3} from 'react-icons/hi'
import l1 from '../../images/b1.png'
import {UserContext} from "../../App"

export default function Navbar() {
  const {state, dispatch} = useContext(UserContext)
  const [toggleMenu, setToggleMenu] = useState(false);
  //fetch for cookies
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchProtectedData = async () => {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage

      if (token) {
        const response = await fetch('/api/protected', {
          headers: {
            Authorization: `Bearer ${token}`, // Set the Authorization header with the token
          },
        });

        if (response.ok) {
          const { message } = await response.json();
          setData(message);
        }
      }
    };

    fetchProtectedData();
  }, []);

  const NavMenu = () =>{
    if(data || state){
      return(
        <>
        <Link to='book' className=' hover:text-pink-700'>HOME</Link>
            <Link to='about' className=' hover:text-pink-700'>ABOUT</Link>
            <Link to='/books/mostpreffered' className=' hover:text-pink-700'>BEST SELLER</Link>
            <Link to='/user/books-borrowed' className=' hover:text-pink-700'>DASHBOARD</Link>
            <Link to='/user/logout' className=' hover:text-pink-700'>LOGOUT</Link>
        </>
      )
    }
    else{
      return (
        <>
        <Link to='book' className=' hover:text-pink-700'>HOME</Link>
            <Link to='about' className=' hover:text-pink-700'>ABOUT</Link>
            <Link to='/books/mostpreffered' className=' hover:text-pink-700'>BEST SELLER</Link>
            <Link to='join' className=' hover:text-pink-700'>JOIN US</Link>
            </>
  
      )
    }
  }

  const SideMenu = ()=>{
    if(data || state){
      return (
        <>
         <li className='my-5'>
             <Link to="book" className='' >HOME</Link>
          </li>
         
          <li className='my-5'>
             <Link to="about"  >ABOUT</Link>
          </li>
          <li className='my-5'>
             <Link to="/books/mostpreffered" >BEST SELLER</Link>
          </li>
          <li className='my-5'>
             <Link to="/user/books-borrowed" >DASBOARD</Link>
          </li>
          <li className='my-5'>
             <Link to="/user/logout" >LOGOUT</Link>
          </li>
         </>

      )
    }
    else{
      return (
        <>
         <li className='my-5'>
             <Link to="book" className='' >HOME</Link>
          </li>
         
          <li className='my-5'>
             <Link to="about"  >ABOUT</Link>
          </li>
          <li className='my-5'>
             <Link to="/books/mostpreffered"  >BEST SELLER</Link>
          </li>
          <li className='my-5'>
             <Link to="join" >JOIN US</Link>
          </li>
         </>
      )
    }
  }

  

  return (
    <>
    <nav className='m-[2%]'>
      <div className='flex justify-between'>
        <Link to ='/' className='flex gap-[8%]'>
          <img className='w-16 md:w-24' src ={l1} alt="site logo" />
          <span className='font-bold text-xl md:text-2xl mt-[5%]'>BOOKSTACKS</span>
        </Link>
        <div className='hidden text-lg text-gray-600 font-semibold m-4 md:flex gap-10'>
           <NavMenu/>
        </div>
        <button type='button' className='md:hidden' onClick={()=>{setToggleMenu(!toggleMenu)}} >
          <HiOutlineMenuAlt3 size={35} className='text-black'/>
        </button>
      </div>

      {/* sidebar */}
    <div className={`duration-500 md:hidden fixed w-9/12 h-full bg-black text-xl font-semibold text-white gap-2 top-0 ${toggleMenu ? `right-[0]`: `right-[-100%]`} `}>
          <button type='button' className='md:hidden absolute right-5 top-5' onClick={()=>{setToggleMenu(!toggleMenu)}} >
               <HiOutlineMenuAlt3 size={35} className='text-white '/>
          </button>
        <ul className='my-10 p-10'>
         <SideMenu/>
        </ul>
      </div>
     
    </nav>
    </>
  )
}
