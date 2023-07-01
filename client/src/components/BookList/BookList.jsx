import React from 'react'
import {useGlobalContext} from '../../context'
import Book from './Book'
import Loading from '../Loader/Loader'
import coverImg from '../../images/cover_not_found.jpg'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

export default function BookList() {
  const {books, loading, resultTitle} = useGlobalContext()
  const navigate = useNavigate()
  const booksWithCovers = books.map((singleBook) =>{
    return {
      ...singleBook,
      // removing /works/ to get only id
      id: (singleBook.id).replace("/works/", ""),
      cover_img: singleBook.cover_id ? `https://covers.openlibrary.org/b/id/${singleBook.cover_id}-L.jpg` : coverImg
    }
   
  })
  console.log(booksWithCovers);

  if(loading) return <Loading />
  return (
   <>
   <section id="" className='booklist'>
    <div className=' py-[3rem] px-0 bg-gray-100 w-full'>
      <div className='mx-10'>
        <button type='button' className='flex  mb-5 hover:text-purple-900' 
          onClick={() => navigate("/")}
          >
            <FaArrowLeft size = {22} />
            <span className='ml-2 font-semibold'>GO BACK</span>
          </button>
        <h2 className='font-semibold text-2xl'>{resultTitle}</h2>
      </div>
      <div className='md:grid grid-cols-4 flex-auto gap-[3rem] m-10 '>
        {
          booksWithCovers.slice(0, 20).map((item, index)=>{
            return (
              <Book className="grid-colspan-1" key = {index} {...item} />
            )
          })
        }
      </div>

    </div>
   </section>
   </>
  )
}
