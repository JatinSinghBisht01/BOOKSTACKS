import React from 'react'
import { Link } from 'react-router-dom'

export default function Book(book) {
  return (
   <>
   <div id='' className=' bg-white rounded-[4px] py-[3rem] px-[2rem]  hover:border-gray-900 mb-5 md:mb-0'>
    <div className=''>
      <img className='h-44 max-w-[180px] ml-auto mr-auto' src = {book.cover_img} alt='cover'/>
    </div>
    {/* book item info */}
    <div className='text-center mt-[2rem]'>
      <Link to = {`/book/${book.id}`} {... book} >
        <div className='font-bold text-lg'>
          <span>{book.title}</span>
        </div>
      </Link>

      <div className=''>
        <span className='font-bold'>
          Author:
        </span>
        <span>{book.author.join(",")}</span>
      </div>

      <div className=' '>
        <span className='font-bold'>
          Total Editions:
        </span>
        <span>{book.edition_count}</span>
      </div>

      <div className=' text-gray-500 italic'>
        <span className='font-semibold'>
          First Publish Year:
        </span>
        <span>{book.first_publish_year}</span>
      </div>

    </div>
   </div>
   </>
  )
}
